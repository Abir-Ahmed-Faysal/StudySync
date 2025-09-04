// QAGenerator.jsx
import React, { useEffect, useState } from "react";
import { addQuestion, getQuestions, syncQuestions } from "../../components/qaService";


export default function QAGenerator() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  useEffect(() => {
    loadQuestions();
 
    window.addEventListener("online", handleSync);
    return () => window.removeEventListener("online", handleSync);
  }, []);

  async function loadQuestions() {
    setList(await getQuestions());
  }

  async function handleAdd() {
    if (!q || !a) return;
    await addQuestion(q, a);
    setQ(""); setA("");
    loadQuestions();
  }

  async function handleSync() {
    await syncQuestions();
    loadQuestions();
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Q&A Generator</h2>
      <input
        className="border p-2 mr-2"
        placeholder="Question"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        placeholder="Answer"
        value={a}
        onChange={e => setA(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAdd}>
        Add
      </button>

      <ul className="mt-4">
        {list.map(item => (
          <li key={item.id} className="border p-2 my-1">
            <strong>{item.question}</strong> → {item.answer} 
            {!item.synced && <span className="text-red-500 ml-2">(Offline)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
