import { getAllMovies } from "@/services/movies";
import { getAllRooms } from "@/services/rooms";
import DashboardLayout from "../../../DashboardLayout";
import SessionCreateForm from "./components/CreateForm";

export default async function CreateSession() {
  const movies = await getAllMovies();
  const rooms = await getAllRooms();
  return (
    <DashboardLayout title="Crear sesión">
      <SessionCreateForm movies={movies} rooms={rooms} />
    </DashboardLayout>
  );
}
