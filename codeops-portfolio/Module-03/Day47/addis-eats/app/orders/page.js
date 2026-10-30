import { Suspense } from "react";
import MapWrapper from "./MapWrapper";
import OrdersTable from "./OrdersTable";

export const metadata = {
  title: "Your Orders",
};

export default function OrdersPage() {
  return (
    <main>
      <h1>Your Orders</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0 }}>Delivery Location</h3>
        <MapWrapper />
      </div>

      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Loading orders...
          </div>
        }
      >
        <OrdersTable />
      </Suspense>
    </main>
  );
}
