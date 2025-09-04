import { db } from "./db";


// লোকালি প্রশ্ন যোগ করা
export async function addQuestion(question, answer) {
  await db.questions.add({
    question,
    answer,
    synced: false
  });
}

// লোকাল প্রশ্ন পাওয়া
export async function getQuestions() {
  return await db.questions.toArray();
}

// সার্ভারে সিঙ্ক করার ফাংশন
export async function syncQuestions() {
  const unsynced = await db.questions.where("synced").equals(false).toArray();

  if (unsynced.length === 0) return;

  try {
    const res = await fetch("https://your-backend.com/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(unsynced),
    });

    if (res.ok) {
      
      await db.questions.bulkPut(
        unsynced.map(q => ({ ...q, synced: true }))
      );
    }
  } catch (error) {
    console.error("Sync failed:", error);
  }
}
