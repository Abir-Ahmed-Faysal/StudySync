const exams = [
  { subject: "Math", date: "Sept 12", time: "10:00 AM" },
  { subject: "History", date: "Sept 14", time: "1:00 PM" },
  { subject: "Physics", date: "Sept 16", time: "9:00 AM" },
];

export default function Exam() {
  return (
    <div className="grid gap-4">
      {exams.map((exam, idx) => (
        <div key={idx} className="card bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold">{exam.subject}</h2>
          <p className="text-sm text-gray-600">{exam.date}</p>
          <p className="text-sm text-gray-500">{exam.time}</p>
        </div>
      ))}
    </div>
  );
}
