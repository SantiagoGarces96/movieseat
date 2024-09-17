import SideNavBarModal from "../ui/dashboard/NavBar/Modals/SideNavBarModal";
import SearchModal from "../ui/dashboard/NavBar/Modals/SearchModal";

export default async function DashBoard() {
  return (
    <div>
      <SearchModal />
      <SideNavBarModal />
    </div>
  );
}
