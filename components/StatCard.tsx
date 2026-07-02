export function StatCard({ title, value, icon }: { title: string; value: string | number; icon: string }) {
  return <div className="card stat-card"><div><h3>{title}</h3><strong>{value}</strong></div><span className="icon">{icon}</span></div>;
}
