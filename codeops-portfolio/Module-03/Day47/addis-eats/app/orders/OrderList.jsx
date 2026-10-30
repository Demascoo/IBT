"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("addis-orders");
    if (data) {
      setOrders(JSON.parse(data));
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (orders.length === 0) {
    return (
      <div
        className="form-card"
        style={{ textAlign: "center", padding: "3rem" }}
      >
        <h3>You have no orders yet</h3>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          When you place an order, it will appear here.
        </p>
        <Link href="/menu" className="btn">
          Browse the Menu
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          fontSize: "0.95rem",
        }}
      >
        <caption
          style={{
            padding: "1rem",
            textAlign: "left",
            fontWeight: "bold",
            borderBottom: "1px solid var(--border)",
          }}
        >
          Your order history
        </caption>
        <thead style={{ background: "var(--bg-color)" }}>
          <tr>
            <th style={{ padding: "1rem" }}>Order ID</th>
            <th style={{ padding: "1rem" }}>Customer</th>
            <th style={{ padding: "1rem", textAlign: "right" }}>Total (ETB)</th>
            <th style={{ padding: "1rem" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "1rem", fontWeight: "bold" }}>
                <Link
                  href={`/orders/${o.id}`}
                  style={{ textDecoration: "underline" }}
                >
                  {o.id}
                </Link>
              </td>
              <td style={{ padding: "1rem" }}>{o.name}</td>
              <td
                style={{
                  padding: "1rem",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {o.total?.toLocaleString() || 0}
              </td>
              <td style={{ padding: "1rem" }}>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--bg-color)",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
