import React, { useState } from "react";
import axios from "axios";

export default function CreateQuestionForm() {
  const [form, setForm] = useState({
    subject: "",
    lesson: "",
    topic: "",
    type: "mcq",
    text: "",
    answer: "",
    difficulty: "easy",
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/questions", form);
      alert("✅ Question saved successfully!");
      setForm({ subject: "", lesson: "", topic: "", type: "mcq", text: "", answer: "", difficulty: "easy" });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save question");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-bold mb-4">➕ Add New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="lesson" type="number" placeholder="Lesson" value={form.lesson} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="topic" placeholder="Topic" value={form.topic} onChange={handleChange} required className="w-full border p-2 rounded" />
        <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="mcq">MCQ</option>
          <option value="truefalse">True/False</option>
          <option value="fillblank">Fill in the Blank</option>
          <option value="shortanswer">Short Answer</option>
        </select>
        <textarea name="text" placeholder="Question text" value={form.text} onChange={handleChange} required className="w-full border p-2 rounded" />
        <textarea name="answer" placeholder="Correct answer" value={form.answer} onChange={handleChange} required className="w-full border p-2 rounded" />
        <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Save Question</button>
      </form>
    </div>
  );
}
