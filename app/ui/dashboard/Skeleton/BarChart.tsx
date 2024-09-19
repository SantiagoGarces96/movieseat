export default function BarChartOverviewSkeleton() {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center gap-10 p-5">
      <div className="flex h-full w-full items-end justify-around gap-10 border-b border-l px-4">
        <div className="skeleton h-full w-full rounded-none" />
        <div className="skeleton h-[90%] w-full rounded-none" />
        <div className="skeleton h-[80%] w-full rounded-none" />
        <div className="skeleton h-[70%] w-full rounded-none" />
        <div className="skeleton h-[60%] w-full rounded-none" />
        <div className="skeleton h-[50%] w-full rounded-none" />
        <div className="skeleton h-[40%] w-full rounded-none" />
        <div className="skeleton h-[30%] w-full rounded-none" />
        <div className="skeleton h-[20%] w-full rounded-none" />
        <div className="skeleton h-[10%] w-full rounded-none" />
      </div>
      <div className="skeleton h-4 w-28 rounded-none" />
    </div>
  );
}
