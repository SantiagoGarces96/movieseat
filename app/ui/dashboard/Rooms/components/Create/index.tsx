import DashboardLayout from "../../../DashboardLayout";
import RoomCreateForm from "./components/CreateForm";

export default async function CreateRoom() {
  return (
    <DashboardLayout title="Crear sala">
      <RoomCreateForm />
    </DashboardLayout>
  );
}
