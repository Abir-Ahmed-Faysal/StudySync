import React from "react";
const safeToLocale = (d) => {
  if (!d) return "";
  const n = Number(d);
  const date = Number.isFinite(n) ? new Date(n) : new Date(d);
  return isNaN(date.getTime()) ? "" : date.toLocaleString();
};

const LessonsList = ({
lessons = [],
subject,
onSelect,
onBack,
newLessonTopic,
setNewLessonTopic,
onAdd,
}) => {
return (
<div>
<button onClick={onBack} className="mt-4 mb-4 text-blue-600 hover:underline">
⬅ Back to Subjects
</button>
<h2 className="text-2xl font-semibold mb-3 text-gray-700">{subject} Lessons</h2>


{lessons.length === 0 ? (
<p className="text-gray-500">No lessons yet. Add one below.</p>
) : (
<ul className="space-y-2">
{lessons.map((lesson) => (
<li
key={lesson._id}
className="p-4 flex justify-between items-center bg-gray-100 rounded shadow hover:bg-gray-200 cursor-pointer"
onClick={() => onSelect(lesson)}
>
<span>
Lesson {lesson.lesson ?? "?"}: {lesson.topic || "Untitled"}
</span>
<span className="text-sm text-gray-500">{safeToLocale(lesson.createdAt)}</span>
</li>
))}
</ul>
)}


<div className="flex gap-2 mt-4">
<input
type="text"
placeholder="New Lesson Topic"
value={newLessonTopic}
onChange={(e) => setNewLessonTopic(e.target.value)}
className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-green-400"
/>
<button
onClick={onAdd}
className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
>
➕ Add Lesson
</button>
</div>
</div>
);
};


export default LessonsList;

