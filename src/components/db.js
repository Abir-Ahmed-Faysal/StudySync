import Dexie from "dexie";

export const db = new Dexie("QADatabase");
db.version(1).stores({
  questions: "++id, question, answer, synced"
});
