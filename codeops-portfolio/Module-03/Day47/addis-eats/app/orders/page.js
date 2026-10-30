import dynamic from "next/dynamic";
import OrderList from "./OrderList";

const MapWrapper = dynamic(() => import("./MapWrapper"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "320px", background: "#eee", borderRadius: "8px" }} />
  ),
});

export const metadata = {
  title: "Your Orders",
};

export default function OrdersPage() {
  return (
    <main>
      <h1>Your Orders</h1>

      {/* The map wrapper needs a fake area for the demo */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0 }}>Latest Delivery Location</h3>
        <MapWrapper area="Bole" />
      </div>

      <OrderList />
    </main>
  );
}
