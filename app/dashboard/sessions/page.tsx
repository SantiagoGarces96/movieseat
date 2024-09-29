import Table from "@/app/ui/dashboard/Table";
import { sessionsHeaders } from "@/constants/dashboard/headers";
import { getSessions } from "@/services/sessions";
import React from "react";

export default async function SessionsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    tableQuery?: string;
    sortBy?: string;
    order?: string;
  };
}) {
  const page = searchParams?.page || " 1";
  const limit = searchParams?.limit || "5";
  const query = searchParams?.tableQuery || "";
  const sortBy = searchParams?.sortBy || "createdAt";
  const order = searchParams?.order || "";
  const sessions = await getSessions(page, limit, query, sortBy, order);

  return (
    <section className="h-[100vh] w-full divide-y">
      <div className="p-5">
        <h2 className="text-3xl font-bold">Sesiones</h2>
      </div>
      <div className="p-5">
        <Table
          headers={sessionsHeaders}
          body={sessions.results}
          limit={limit}
          totalResults={sessions.totalResults}
          page={sessions.page || 1}
          totalPages={sessions.totalPages}
        />
      </div>
    </section>
  );
}
