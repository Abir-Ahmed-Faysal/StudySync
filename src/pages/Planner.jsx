const tasks = [
  { task: "Finish Math homework", due: "Today" },
  { task: "Read 20 pages of History book", due: "Tomorrow" },
  { task: "Prepare Physics lab report", due: "This Week" },
];

export default function Planner() {
  return (
    <div className="grid gap-4">
      {tasks.map((t, idx) => (
        <div key={idx} className="card bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold">{t.task}</h2>
          <p className="text-sm text-gray-500">Due: {t.due}</p>
        </div>
      ))}
    </div>
  );
}
