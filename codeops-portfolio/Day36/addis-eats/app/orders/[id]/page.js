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
      {/* Server fetches initial data, passes to client for polling */}
      <OrderStatus id={id} initial={order} />
    </main>
  );
}
