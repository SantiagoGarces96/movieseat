import SideNavBarModal from "../ui/dashboard/NavBar/Modals/ModalSideNavBarModal";
import SearchModal from "../ui/dashboard/NavBar/Modals/SearchModal";

export default async function DashBoard() {
  return (
    <div>
      <SearchModal />
      <SideNavBarModal />
    </div>
  );
}
