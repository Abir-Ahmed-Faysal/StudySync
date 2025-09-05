import React from "react";

const SubjectsList = ({ subjects = [], onSelect, onAdd, newSubject, setNewSubject }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3 text-gray-700">Subjects</h2>

      {subjects.length === 0 ? (
        <p className="text-gray-500">No subjects yet. Add one below.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjects.map((subj) => (
            <li
              key={subj}
              className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 cursor-pointer"
              onClick={() => onSelect(subj)}
            >
              {subj}
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="New Subject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={onAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          ➕ Add Subject
        </button>
      </div>
    </div>
  );
};

export default SubjectsList;
