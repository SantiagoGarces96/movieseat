import DefaultNavBar from "@/app/ui/dashboard/NavBar/DefaultNavBar";
import SideNav from "../ui/dashboard/NavBar/SideNavBar";
import SearchModal from "../ui/dashboard/NavBar/Modals/SearchModal";
import SideNavBarModal from "../ui/dashboard/NavBar/Modals/SideNavBarModal";

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
      <div className="flex h-screen w-full flex-col items-center overflow-hidden">
        <DefaultNavBar />
        <SearchModal />
        <SideNavBarModal />
        {children}
      </div>
    </div>
  );
}
