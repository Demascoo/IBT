import { notFound } from "next/navigation";
import { getOrder } from "@/lib/db";
import OrderStatus from "./OrderStatus";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) notFound();

  return (
    <main>
      <h1>Order {order.id}</h1>

      {/* 
        This client component renders BOTH the map and the live status. 
        It receives the server-fetched data via the `initial` prop.
      */}
      <OrderStatus id={id} initial={order} />
    </main>
  );
}
