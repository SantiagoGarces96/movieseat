import DashboardLayout from "../../../DashboardLayout";
import { notFound } from "next/navigation";
import { getRoomById } from "@/services/rooms";
import RoomEditForm from "./components/EditForm";

export default async function EditRoom({ id }: { id: string }) {
  const room = await getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <DashboardLayout title="Editar sala">
      <RoomEditForm room={room} />
    </DashboardLayout>
  );
}
