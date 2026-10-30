"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MapWrapper from "../MapWrapper";

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id;
  const [order, setOrder] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("addis-orders");
    if (data) {
      const orders = JSON.parse(data);
      const found = orders.find((o) => o.id === id);
      setOrder(found || null);
    }
    setMounted(true);
  }, [id]);

  if (!mounted)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );

  if (!order) {
    return (
      <main>
        <h1>Order Not Found</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          Order <strong>{id}</strong> doesn't exist in your browser.
        </p>
        <Link href="/orders" className="btn">
          Back to Orders
        </Link>
      </main>
    );
  }

  return (
    <main>
      <Link href="/orders" style={{ fontSize: "0.9rem" }}>
        ← Back to Orders
      </Link>

      <h1 style={{ marginTop: "0.5rem" }}>Order {order.id}</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
        Placed on {new Date(order.createdAt).toLocaleString()}
      </p>

      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}
      >
        {/* Map Side */}
        <div>
          <h3 style={{ marginTop: 0 }}>Delivery Location</h3>
          <MapWrapper area={order.area} />
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              marginTop: "0.5rem",
            }}
          >
            <strong>Address:</strong> {order.area}, Addis Ababa
          </p>
        </div>

        {/* Status Side */}
        <div
          style={{
            padding: "1.5rem",
            background: "var(--surface)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Order Details</h3>

          <p>
            <strong>Name:</strong> {order.name}
          </p>
          <p>
            <strong>Phone:</strong> {order.phone}
          </p>
          <p>
            <strong>Area:</strong> {order.area}
          </p>
          <p>
            <strong>Total:</strong> {order.total} ETB
          </p>

          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "var(--bg-color)",
              borderRadius: "8px",
              border: "1px solid var(--border)",
            }}
          >
            <strong style={{ fontSize: "1.25rem", color: "var(--brand)" }}>
              {order.status}
            </strong>
          </div>

          {order.notes && (
            <p
              style={{
                marginTop: "1rem",
                color: "var(--text-muted)",
                fontSize: "0.9rem",
              }}
            >
              <strong>Notes:</strong> {order.notes}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
