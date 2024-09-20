export default function OverviewCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-lg border">
      {title && (
        <div className="border-b px-5 py-3 text-base font-medium">
          <h6>{title}</h6>
        </div>
      )}
      <div className="flex flex-col gap-4 p-5">{children}</div>
    </div>
  );
}
