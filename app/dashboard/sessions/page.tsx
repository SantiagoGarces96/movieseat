import Alert from "@/app/ui/dashboard/Alert";
import Form from "@/app/ui/dashboard/Form";
import Table from "@/app/ui/dashboard/Table";
import { createSessionData } from "@/constants/dashboard/formData";
import { sessionsHeaders } from "@/constants/dashboard/headers";
import { getAllMovies } from "@/services/movies";
import { getAllRooms } from "@/services/rooms";
import { createSession, deleteSession, getSessions } from "@/services/sessions";

export default async function SessionsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    tableQuery?: string;
    sortBy?: string;
    order?: string;
    roomId?: string;
  };
}) {
  const page = searchParams?.page || " 1";
  const limit = searchParams?.limit || "5";
  const query = searchParams?.tableQuery || "";
  const sortBy = searchParams?.sortBy || "createdAt";
  const order = searchParams?.order || "";
  const roomId = searchParams?.roomId || "";
  const sessions = await getSessions(page, limit, query, sortBy, order);
  const movies = await getAllMovies();
  const rooms = await getAllRooms();

  return (
    <section className="h-[100vh] w-full divide-y">
      <Alert />
      <div className="flex items-center justify-between p-5">
        <h2 className="text-3xl font-bold">Sesiones</h2>
        <Form
          label="Crear sesion"
          title="Crear nueva sesion"
          inputData={createSessionData(movies, rooms, roomId)}
          handle={createSession}
        />
      </div>
      <div className="p-5">
        <Table
          headers={sessionsHeaders}
          body={sessions.results}
          limit={limit}
          totalResults={sessions.totalResults}
          page={sessions.page || 1}
          totalPages={sessions.totalPages}
          handleDelete={deleteSession}
        />
      </div>
    </section>
  );
}
