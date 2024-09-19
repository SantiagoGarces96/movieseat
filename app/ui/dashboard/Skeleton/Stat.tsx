function Stat() {
  return (
    <div className="stat">
      <div className="stat-title capitalize">-</div>
      <div className="stat-value text-accent">-</div>
    </div>
  );
}
export default function StatOverviewSkeleton() {
  const data = ["stat1", "stat2", "stat3"];
  return (
    <div className="stats w-full shadow">
      {data.map((stat, index) => (
        <Stat key={stat + index} />
      ))}
    </div>
  );
}
