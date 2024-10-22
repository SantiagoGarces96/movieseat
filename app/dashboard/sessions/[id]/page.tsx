import SessionEditForm from "@/app/ui/dashboard/sessions/edit-form";
import { getMovieById } from "@/services/movies";
import { getAllRooms } from "@/services/rooms";
import { getAvailableSessionTimes, getSessionById } from "@/services/sessions";
import { notFound } from "next/navigation";

export default async function CreateSession({
  params,
}: {
  params: { id: string };
}) {
  const sessionId = params.id;
  const session = await getSessionById(sessionId);

  if (!session) {
    notFound();
  }
  const rooms = await getAllRooms();
  const movie = await getMovieById(session?.movieId.toString());
  const [date, time] = new Date(session.dateTime).toISOString().split("T");
  const parseTime = time.split(".")[0];
  const availableSessions = await getAvailableSessionTimes(
    date,
    session.roomId.toString(),
  );

  return (
    <section className="h-[100vh] w-full divide-y">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-3xl font-bold">Editar sesión</h2>
      </div>
      <div className="flex h-full w-full items-start justify-center gap-3 p-8">
        <SessionEditForm
          session={JSON.parse(JSON.stringify(session))}
          rooms={JSON.parse(JSON.stringify(rooms))}
          movie={JSON.parse(JSON.stringify(movie))}
          availableSessions={[parseTime, ...availableSessions]}
        />
      </div>
    </section>
  );
}
