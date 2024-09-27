import Table from "@/app/ui/dashboard/Table";
import { sessionsHeaders } from "@/constants/dashboard/headers";
import { getSessions } from "@/services/sessions";
import { parseBodySessions } from "@/utils/parseSessions";
import React from "react";

export default async function SessionsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    tableQuery?: string;
  };
}) {
  const page = searchParams?.page || " 1";
  const limit = searchParams?.limit || "5";
  const query = searchParams?.tableQuery || "";
  const sessions = await getSessions(page, limit, query);

  return (
    <section className="h-[100vh] w-full divide-y">
      <div className="p-5">
        <h2 className="text-3xl font-bold">Sesiones</h2>
      </div>
      <div className="p-5">
        <Table
          headers={sessionsHeaders}
          body={parseBodySessions(sessions.results)}
          limit={limit}
          totalResults={sessions.total_results}
          page={sessions.page || 1}
          totalPages={sessions.total_pages}
        />
      </div>
    </section>
  );
}
