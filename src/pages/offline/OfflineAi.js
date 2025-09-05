import { pipeline } from "@xenova/transformers";
import { db } from "../pages/db/db";

// lightweight embeddings
const similarity = await pipeline("feature-extraction", "sentence-transformers/all-MiniLM-L6-v2");

const cosine = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val*val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val*val, 0));
  return dot / (magA * magB);
};

export async function checkAnswerOffline(questionId, userAnswer, correctAnswer) {
  const embCorrect = await similarity(correctAnswer);
  const embUser = await similarity(userAnswer);

  const scoreVal = cosine(embCorrect[0], embUser[0]);
  const score = scoreVal >= 0.8 ? 2 : scoreVal >= 0.5 ? 1 : 0;

  await db.results.add({
    questionId,
    userAnswer,
    score,
    scoreType: "offline",
    synced: false,
    timestamp: Date.now()
  });

  return score;
}

export async function syncResultsOnline() {
  if (!navigator.onLine) return;

  const unsynced = await db.results.where("synced").equals(false).toArray();
  if (!unsynced.length) return;

  for (const r of unsynced) {
    try {
      const res = await fetch("http://localhost:5000/api/saveResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(r)
      });
      if (res.ok) {
        await db.results.update(r.id, { synced: true });
      }
    } catch (err) {
      console.error("Sync failed:", err);
    }
  }
}
