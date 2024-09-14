import DefaultNavBar from "@/app/ui/dashboard/NavBar/DefaultNavBar";
import SideNav from "../ui/dashboard/NavBar/SideNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:overflow-hidden lg:flex-row">
      <div className="hidden lg:flex">
        <SideNav />
      </div>
      <div className="w-full">
        <DefaultNavBar />
        <div className="h-full grow">{children}</div>
      </div>
    </div>
  );
}
