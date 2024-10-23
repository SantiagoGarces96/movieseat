import SessionCreateForm from "@/app/ui/dashboard/Sessions/CreateForm";
import { getAllMovies } from "@/services/movies";
import { getAllRooms } from "@/services/rooms";

export default async function CreateSession({
  params,
}: {
  params: { section: string };
}) {
  const { section } = params;
  const movies = JSON.parse(JSON.stringify(await getAllMovies()));
  const rooms = JSON.parse(JSON.stringify(await getAllRooms()));
  return (
    <section className="h-[100vh] w-full divide-y">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-3xl font-bold">Crear sesión</h2>
      </div>
      <div className="flex h-full w-full items-start justify-center gap-3 p-8">
        <SessionCreateForm movies={movies} rooms={rooms} />
      </div>
    </section>
  );
}
