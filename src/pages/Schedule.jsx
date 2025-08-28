const schedule = [
  { time: "9:00 AM", subject: "Math", room: "Room 101" },
  { time: "11:00 AM", subject: "History", room: "Room 202" },
  { time: "2:00 PM", subject: "Physics Lab", room: "Lab 3" },
];

export default function Schedule() {
  return (
    <div className="grid gap-4">
      {schedule.map((cls, idx) => (
        <div key={idx} className="card bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold">{cls.subject}</h2>
          <p className="text-sm text-gray-600">{cls.time}</p>
          <p className="text-sm text-gray-500">{cls.room}</p>
        </div>
      ))}
    </div>
  );
}
