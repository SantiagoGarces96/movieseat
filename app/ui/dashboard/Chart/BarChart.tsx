"use client";
import { IMovieByGenre } from "@/interfaces/movie";
import { IAvailableSeatsByRoom } from "@/interfaces/session";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BarChartOverview({
  data,
  dataKey,
}: {
  data: IMovieByGenre[] | IAvailableSeatsByRoom[];
  dataKey: string;
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" tick={false} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill="#0072BB" />
      </BarChart>
    </ResponsiveContainer>
  );
}
