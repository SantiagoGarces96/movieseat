"use client";
import { IFoodSells } from "@/interfaces/transaction";
import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function PieChartOverview({ data }: { data: IFoodSells[] }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#0072BB"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
