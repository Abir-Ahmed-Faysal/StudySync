import Dexie from "dexie";

export const db = new Dexie("QADB");

db.version(1).stores({
  questions: "++id, question, answer",
  results: "++id, questionId, userAnswer, score, scoreType, synced, timestamp"
});
