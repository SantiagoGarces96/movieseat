import { cn } from "@/utils/cn";

interface DashboardLayoutProps {
  title?: string;
  button?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function DashboardLayout({
  title,
  button,
  fullWidth = false,
  children,
}: DashboardLayoutProps) {
  return (
    <section className="h-full w-full divide-y overflow-auto">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-3xl font-bold">{title}</h2>
        {button}
      </div>
      <div
        className={cn("p-5", {
          "flex h-full w-full items-start justify-center gap-3 p-8":
            !button && !fullWidth,
        })}
      >
        {children}
      </div>
    </section>
  );
}
