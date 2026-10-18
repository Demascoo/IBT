import Link from "next/link";
import { listOrders } from "@/app/actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your Orders",
};

export default async function OrdersPage() {
  const orders = await listOrders();

  return (
    <main>
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <p>
          No orders yet. <Link href="/menu">Browse the menu →</Link>
        </p>
      ) : (
        <div>
          {orders.map((o) => (
            <div key={o.id} className="order-card">
              <div className="order-header">
                <Link href={`/orders/${o.id}`}>
                  <strong>Order {o.id}</strong>
                </Link>
                <span className="order-status">{o.status}</span>
              </div>
              <p>
                {o.name} — {o.phone}
              </p>
              {o.notes && (
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                  }}
                >
                  “{o.notes}”
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
