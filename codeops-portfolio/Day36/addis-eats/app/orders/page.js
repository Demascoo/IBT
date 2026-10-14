import Link from "next/link";
import { listOrders } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await listOrders();

  return (
    <main>
      <h1>Your orders</h1>

      {orders.length === 0 ? (
        <p>
          No orders yet. <Link href="/checkout">Place one →</Link>
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((o) => (
            <li
              key={o.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: "0.75rem",
                marginBottom: "0.5rem",
                opacity: o.status === "CANCELLED" ? 0.6 : 1,
              }}
            >
              <strong>{o.id}</strong> — {o.name} ({o.phone})
              {o.dishId && <> · dish: {o.dishId}</>}
              {o.quantity && <> × {o.quantity}</>}
              <br />
              <small style={{ color: "#666" }}>
                Status: {o.status} · {new Date(o.createdAt).toLocaleString()}
              </small>
              {o.notes && (
                <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                  “{o.notes}”
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
