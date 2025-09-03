import React, { useMemo } from "react";

const hardcodedTransactions = [
  {
    id: "1",
    type: "income",
    amount: 200,
    category: "Allowance",
    date: "2025-09-01",
  },
  {
    id: "2",
    type: "expense",
    amount: 50,
    category: "Food",
    date: "2025-09-02",
  },
  {
    id: "3",
    type: "expense",
    amount: 30,
    category: "Transport",
    date: "2025-09-03",
  },
  {
    id: "4",
    type: "income",
    amount: 150,
    category: "Part-time Job",
    date: "2025-09-05",
  },
  {
    id: "5",
    type: "expense",
    amount: 70,
    category: "Books",
    date: "2025-09-06",
  },
  {
    id: "6",
    type: "expense",
    amount: 40,
    category: "Entertainment",
    date: "2025-09-07",
  },
];

const categoryColors = {
  Food: "#f87171",
  Transport: "#fb923c",
  Books: "#fbbf24",
  Entertainment: "#34d399",
  Allowance: "#60a5fa",
  "Part-time Job": "#a78bfa",
  Other: "#f472b6",
};

export default function Budget() {
  const transactions = hardcodedTransactions;

  // Calculate totals
  const totals = useMemo(() => {
    let income = 0,
      expense = 0;
    transactions.forEach((t) =>
      t.type === "income" ? (income += t.amount) : (expense += t.amount)
    );
    return { income, expense, balance: income - expense };
  }, [transactions]);

  // Expense breakdown by category
  const expenseBreakdown = useMemo(() => {
    const breakdown = {};
    transactions.forEach((t) => {
      if (t.type === "expense")
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
    });
    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const maxValue = Math.max(totals.income, totals.expense) * 1.2; // scaling for bar heights

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Budget Tracker</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-lg p-6 text-center">
          <div className="stat-title text-lg">Total Income</div>
          <div className="stat-value text-2xl text-green-600 font-bold">
            ${totals.income}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-6 text-center">
          <div className="stat-title text-lg">Total Expense</div>
          <div className="stat-value text-2xl text-red-600 font-bold">
            ${totals.expense}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-6 text-center">
          <div className="stat-title text-lg">Balance</div>
          <div className="stat-value text-2xl font-bold">${totals.balance}</div>
        </div>
      </div>

      {/* Income vs Expense Bar Graph */}
      <div className="card bg-base-100 shadow p-6">
        <h3 className="font-semibold mb-4 text-xl text-center">
          Income vs Expense
        </h3>
        <div className="flex items-end gap-8 h-64 justify-center border-t border-gray-200 pt-4">
          {/* Income Bar */}
          <div className="flex flex-col items-center">
            <div
              className="bg-green-500 w-16 rounded-t transition-all duration-300"
              style={{ height: `${(totals.income / maxValue) * 100}%` }}
            ></div>
            <div className="mt-2 text-lg font-medium">Income</div>
            <div className="text-sm text-gray-600">${totals.income}</div>
          </div>
          {/* Expense Bar */}
          <div className="flex flex-col items-center">
            <div
              className="bg-red-500 w-16 rounded-t transition-all duration-300"
              style={{ height: `${(totals.expense / maxValue) * 100}%` }}
            ></div>
            <div className="mt-2 text-lg font-medium">Expense</div>
            <div className="text-sm text-gray-600">${totals.expense}</div>
          </div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="card bg-base-100 shadow p-6">
        <h3 className="font-semibold mb-4 text-xl text-center">
          Expense Breakdown
        </h3>
        <div className="flex flex-col gap-3">
          {expenseBreakdown.map((e) => (
            <div key={e.name} className="flex flex-col">
              <div className="flex justify-between text-lg font-medium mb-1">
                <span>{e.name}</span>
                <span>
                  ${e.value} ({Math.round((e.value / totals.expense) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 h-6 rounded">
                <div
                  className="h-6 rounded transition-all duration-300"
                  style={{
                    width: `${(e.value / totals.expense) * 100}%`,
                    backgroundColor: categoryColors[e.name],
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card bg-base-100 shadow p-6">
        <h3 className="font-semibold mb-4 text-xl text-center">
          Recent Transactions
        </h3>
        <ul className="space-y-3 text-lg">
          {transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>
                  <div className="font-medium">{t.category}</div>
                  <div className="text-gray-500 text-sm">
                    {new Date(t.date).toLocaleDateString()}
                  </div>
                </div>
                <span
                  className={
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }
                >
                  {t.type === "income" ? "+" : "-"}${t.amount}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
