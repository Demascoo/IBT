import MapWrapper from "./MapWrapper";
import OrderList from "./OrderList";

export const metadata = {
  title: "Your Orders",
};

export default function OrdersPage() {
  return (
    <main>
      <h1>Your Orders</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0 }}>Latest Delivery Location</h3>
        {/* MapWrapper is a client component that safely loads the map */}
        <MapWrapper area="Bole" />
      </div>

      <OrderList />
    </main>
  );
}
