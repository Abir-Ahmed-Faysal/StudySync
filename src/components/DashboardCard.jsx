// components/DashboardCard.jsx
export default function DashboardCard({ title, value, icon, accent }) {
  return (
    <div className={`card card-compact p-4 shadow ${accent}`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
