"use client";
import { formatPrice } from "@/utils/format";
import { IMonthlyRevenue } from "@/interfaces/transaction";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LineChartOverview({
  data,
}: {
  data: IMonthlyRevenue[];
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
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis
          width={90}
          tickFormatter={(value: number) => formatPrice(value)}
        />
        <Tooltip formatter={(value) => formatPrice(Number(value))} />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalAmount"
          name="Ingresos"
          stroke="#0072BB"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
