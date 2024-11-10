import { getAllMovies } from "@/services/movies";
import { getAllRooms } from "@/services/rooms";
import DashboardLayout from "../../../DashboardLayout";
import SessionCreateForm from "./components/CreateForm";

export default async function CreateRoom() {
  const movies = JSON.parse(JSON.stringify(await getAllMovies()));
  const rooms = JSON.parse(JSON.stringify(await getAllRooms()));
  return (
    <DashboardLayout title="Crear sesión">
      <SessionCreateForm movies={movies} rooms={rooms} />
    </DashboardLayout>
  );
}
