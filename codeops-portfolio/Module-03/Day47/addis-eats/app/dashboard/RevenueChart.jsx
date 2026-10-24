"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const etb = (v) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(v);

export default function RevenueChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
        >
          <XAxis dataKey="area" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, "auto"]}
            tickFormatter={etb}
            width={80}
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(value) => [etb(value), "Revenue"]} />
          <Bar dataKey="revenue" fill="var(--brand)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
