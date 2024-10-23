interface DashboardLayoutProps {
  title?: string;
  button?: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardLayout({
  title,
  button,
  children,
}: DashboardLayoutProps) {
  return (
    <section className="h-[100vh] w-full divide-y">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-3xl font-bold">{title}</h2>
        {button}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
