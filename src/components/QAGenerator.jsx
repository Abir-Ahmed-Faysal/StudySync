import React, { useEffect, useState } from "react";
import { db } from "../pages/db/db";
import { checkAnswerOffline, syncResultsOnline } from "./offlineAI";

export default function QAGenerator() {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [selectedQ, setSelectedQ] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    loadQuestions();
    window.addEventListener("online", syncResultsOnline);
    return () => window.removeEventListener("online", syncResultsOnline);
  }, []);

  async function loadQuestions() {
    if ((await db.questions.count()) === 0) {
      await db.questions.bulkAdd([
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "Who developed the theory of relativity?", answer: "Albert Einstein" }
      ]);
    }
    setQuestions(await db.questions.toArray());
  }

  async function handleSubmit() {
    if (!selectedQ || !answer) return;
    const score = await checkAnswerOffline(selectedQ.id, answer, selectedQ.answer);
    setFeedback(`Offline Score: ${score}`);
    setAnswer("");
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Exam Q&A Practice</h2>

      <select
        className="border p-2 mb-3 w-full"
        onChange={e => setSelectedQ(questions.find(q => q.id == e.target.value))}
      >
        <option>Select a question</option>
        {questions.map(q => (
          <option key={q.id} value={q.id}>
            {q.question}
          </option>
        ))}
      </select>

      {selectedQ && (
        <div>
          <textarea
            className="border p-2 w-full mb-3"
            placeholder="Write your answer..."
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit Answer
          </button>
        </div>
      )}

      {feedback && <p className="mt-4 text-green-600">{feedback}</p>}
    </div>
  );
}
