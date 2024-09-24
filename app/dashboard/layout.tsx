import DefaultNavBar from "@/app/ui/dashboard/NavBar/DefaultNavBar";
import SideNav from "../ui/dashboard/NavBar/SideNavBar";
import DashboardFooter from "../ui/dashboard/Footer";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden lg:flex-row">
      <div className="hidden lg:flex">
        <Suspense fallback={<div>Loading...</div>}>
          {" "}
          <SideNav />
        </Suspense>
      </div>
      <div className="flex w-full flex-col items-center overflow-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <DefaultNavBar />
        </Suspense>
        {children}
        <DashboardFooter />
      </div>
    </div>
  );
}
