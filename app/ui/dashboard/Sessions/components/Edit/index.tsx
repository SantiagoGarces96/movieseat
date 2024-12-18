import { getAvailableSessionTimes, getSessionById } from "@/services/sessions";
import DashboardLayout from "../../../DashboardLayout";
import SessionEditForm from "./components/EditForm";
import { notFound } from "next/navigation";
import { getAllRooms } from "@/services/rooms";
import { getMovieById } from "@/services/movies";

export default async function EditSession({ id }: { id: string }) {
  const session = await getSessionById(id);

  if (!session) {
    notFound();
  }

  const rooms = await getAllRooms();
  const movie = await getMovieById(session.movieId.toString());
  const [date, time] = new Date(session.dateTime).toISOString().split("T");
  const parseTime = time.split(".")[0];
  const availableSessions = await getAvailableSessionTimes(
    date,
    session.roomId.toString(),
  );

  return (
    <DashboardLayout title="Editar sesión">
      <SessionEditForm
        session={session}
        rooms={rooms}
        movie={movie}
        availableSessions={[parseTime, ...availableSessions]}
      />
    </DashboardLayout>
  );
}
