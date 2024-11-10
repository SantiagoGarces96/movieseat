import DashboardLayout from "../../../DashboardLayout";
import SessionEditForm from "./components/EditForm";
import { notFound } from "next/navigation";
import { getRoomById } from "@/services/rooms";

export default async function EditRoom({ id }: { id: string }) {
  const room = await getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <DashboardLayout title="Editar sala">
      <SessionEditForm room={room} />
    </DashboardLayout>
  );
}
