import React from "react";
import TableSearchInput from "./components/Input/Search";
import TableSelectInput from "./components/Input/Select";
import Pagination from "./components/Pagination";
import Count from "./components/Count";
import Header from "./components/Header";
import Body from "./components/Body";

function Table({
  headers,
  body,
  limit,
  totalResults,
  page,
  totalPages,
  handleDelete,
}: {
  headers: { [key: string]: string }[];
  body: { [key: string]: string }[];
  limit: string;
  totalResults: number;
  page: number;
  totalPages: number;
  handleDelete: (id: string) => Promise<{ message: string }>;
}) {
  return (
    <div className="h-full overflow-x-auto">
      <div className="flex w-full items-center justify-between px-1 py-5">
        <TableSelectInput />
        <TableSearchInput />
      </div>
      <table className="table table-xs">
        <Header headers={headers} />
        <Body
          body={body}
          currentPage={page}
          limit={parseInt(limit)}
          handle={handleDelete}
        />
      </table>
      <div className="flex items-center justify-between px-1 py-5">
        <Count
          limit={parseInt(limit)}
          totalResults={totalResults}
          currentPage={page}
        />
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Table;
