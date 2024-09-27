import DefaultNavBar from "@/app/ui/dashboard/NavBar/DefaultNavBar";
import SideNav from "../ui/dashboard/NavBar/SideNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden lg:flex-row">
      <div className="hidden lg:flex">
        <SideNav />
      </div>
      <div className="flex w-full flex-col items-center overflow-auto">
        <DefaultNavBar />
        {children}
      </div>
    </div>
  );
}
