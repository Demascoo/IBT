"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { when } from "@/lib/format";

// Load the map ONLY on the client side (ssr: false)
const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "320px", background: "#eee", borderRadius: "8px" }} />
  ),
});

export default function OrderStatus({ id, initial }) {
  const [status, setStatus] = useState(initial.status);
  const [connection, setConnection] = useState("connecting");

  useEffect(() => {
    
    const es = new EventSource(`/api/stream?orderId=${id}`);

    es.onopen = () => setConnection("live");

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setStatus(data.status);
    };

    es.onerror = () => {
      es.close();
      setConnection("disconnected");
    };

    return () => es.close();
  }, [id]);

  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      }}
    >
      {/* Left Side: Map */}
      <div>
        <h3 style={{ marginTop: 0 }}>Delivery Location</h3>
        <DeliveryMap />
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            marginTop: "0.5rem",
          }}
        >
          <strong>Address:</strong> The courier is currently in Bole, heading to
          your address.
        </p>
      </div>

      {/* Right Side: Status Details */}
      <div
        style={{
          padding: "1.5rem",
          background: "var(--surface)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Order Status</h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background:
                connection === "live"
                  ? "green"
                  : connection === "connecting"
                    ? "orange"
                    : "red",
            }}
          />
          <span
            style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              textTransform: "capitalize",
            }}
          >
            {connection}
          </span>
        </div>

        <div
          style={{
            padding: "1rem",
            background: "var(--bg-color)",
            borderRadius: "8px",
            border: "1px solid var(--border)",
          }}
        >
          <strong style={{ fontSize: "1.25rem", color: "var(--brand)" }}>
            {status}
          </strong>
        </div>

        <p
          style={{
            color: "var(--text-muted)",
            marginTop: "1rem",
            fontSize: "0.9rem",
          }}
        >
          Last updated: {when.format(new Date())}
        </p>
      </div>
    </div>
  );
}
