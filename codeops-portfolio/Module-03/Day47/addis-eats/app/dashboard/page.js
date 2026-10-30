"use client";

import { useEffect, useState } from "react";
import RevenueChart from "./RevenueChart";
import Link from "next/link";

export default function DashboardPage() {
  const [revenueData, setRevenueData] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    
    const ordersStr = localStorage.getItem("addis-orders");
    const orders = ordersStr ? JSON.parse(ordersStr) : [];

    const areas = ["Bole", "Kazanchis", "Megenagna"];

    // Aggregate revenue
    const data = areas.map((area) => {
      const areaOrders = orders.filter((o) => o.area === area);
      const revenue = areaOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      return { area, revenue };
    });

    setRevenueData(data);
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );

  return (
    <main>
      <h1>Dashboard</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
        Overview of your restaurant's performance based on your local order
        history.
      </p>

      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
      >
        <div
          style={{
            background: "var(--surface)",
            padding: "1.5rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Revenue by Neighbourhood</h3>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              marginBottom: "1rem",
            }}
          >
            Total revenue in ETB across all orders.
          </p>

          <RevenueChart data={revenueData} />

          {/* Accessible Data Table */}
          <table
            style={{
              width: "100%",
              marginTop: "1.5rem",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <caption
              style={{
                textAlign: "left",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Data table
            </caption>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--border)",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "0.5rem" }}>Neighbourhood</th>
                <th style={{ padding: "0.5rem", textAlign: "right" }}>
                  Revenue (ETB)
                </th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((row) => (
                <tr
                  key={row.area}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "0.5rem" }}>{row.area}</td>
                  <td style={{ padding: "0.5rem", textAlign: "right" }}>
                    {row.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div
            style={{
              background: "var(--surface)",
              padding: "1.5rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Order History</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              View and sort all orders placed on Addis Eats.
            </p>
            <Link href="/orders" className="btn" style={{ marginTop: "1rem" }}>
              Go to Orders Table
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
