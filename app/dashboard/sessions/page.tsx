import Alert from "@/app/ui/dashboard/Alert";
import { CreateSession } from "@/app/ui/dashboard/sessions/buttons";
import Table from "@/app/ui/dashboard/Table";
import { editSessionData } from "@/constants/dashboard/formData";
import { sessionsHeaders } from "@/constants/dashboard/headers";
import { getAllMovies } from "@/services/movies";
import { getAllRooms } from "@/services/rooms";
import {
  deleteSession,
  getSessionById,
  getSessions,
  updateSession,
} from "@/services/sessions";

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
    sessionId?: string;
  };
}) {
  const page = searchParams?.page || " 1";
  const limit = searchParams?.limit || "5";
  const query = searchParams?.tableQuery || "";
  const sortBy = searchParams?.sortBy || "createdAt";
  const order = searchParams?.order || "";
  const roomId = searchParams?.roomId || "";
  const sessionId = searchParams?.sessionId || "";
  const sessions = await getSessions(page, limit, query, sortBy, order);
  const session = await getSessionById(sessionId);
  const movies = await getAllMovies();
  const rooms = await getAllRooms();
  const editInputData = editSessionData(movies, rooms, session, roomId);

  return (
    <section className="h-[100vh] w-full divide-y">
      <Alert />
      <div className="flex items-center justify-between p-5">
        <h2 className="text-3xl font-bold">Sesiones</h2>
        <CreateSession />
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
          editInputData={editInputData}
          updateAction={updateSession}
        />
      </div>
    </section>
  );
}
