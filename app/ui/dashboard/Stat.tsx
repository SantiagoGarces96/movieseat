import { IMovieByStatus } from "@/interfaces/movie";

function Stat({ _id, count }: { _id: string; count: number }) {
  return (
    <div className="stat">
      <div className="stat-title capitalize">{_id}</div>
      <div className="stat-value text-accent">{count}</div>
    </div>
  );
}
export default function StatOverview({ data }: { data: IMovieByStatus[] }) {
  return (
    <div className="stats w-full shadow">
      {data.map((stat, index) => (
        <Stat key={stat.count + index} {...stat} />
      ))}
    </div>
  );
}
