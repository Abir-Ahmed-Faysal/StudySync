const expenses = [
  { category: "Food", amount: "$50" },
  { category: "Books", amount: "$30" },
  { category: "Transport", amount: "$20" },
];

export default function Budget() {
  return (
    <div className="grid gap-4">
      {expenses.map((exp, idx) => (
        <div key={idx} className="card bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold">{exp.category}</h2>
          <p className="text-lg font-bold">{exp.amount}</p>
        </div>
      ))}
    </div>
  );
}
