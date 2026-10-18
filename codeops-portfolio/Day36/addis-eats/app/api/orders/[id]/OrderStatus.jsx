"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ id, initial }) {
  const { data, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial, // No spinner on first paint
    refreshInterval: 5000, // Poll every 5 seconds
    revalidateOnFocus: true, // Refresh when tab regains focus
  });

  if (error) {
    return <p style={{ color: "crimson" }}>Could not load the order status.</p>;
  }

  const order = data ?? initial;

  return (
    <div style={{ padding: "1rem", border: "1px solid #eee", borderRadius: 8 }}>
      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color: order.status === "CANCELLED" ? "crimson" : "green",
            fontWeight: "bold",
          }}
        >
          {order.status}
        </span>
      </p>
      <p>
        <strong>Name:</strong> {order.name}
      </p>
      <p>
        <strong>Phone:</strong> {order.phone}
      </p>
      {order.notes && (
        <p>
          <strong>Notes:</strong> {order.notes}
        </p>
      )}
      <p style={{ fontSize: 12, color: "#777", marginTop: "1rem" }}>
        Polling every 5 seconds…
      </p>
    </div>
  );
}
