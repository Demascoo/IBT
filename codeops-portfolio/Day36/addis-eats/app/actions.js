"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schema";
import { createOrder, markCancelled, getOrder, getSession, db } from "@/lib/db";

export async function placeOrder(prevState, formData) {
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId") || undefined,
    quantity: formData.get("quantity")
      ? Number(formData.get("quantity"))
      : undefined,
    notes: formData.get("notes") || undefined,
  };

  const parsed = orderSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const order = await createOrder(parsed.data);
  revalidatePath("/orders");
  return { ok: true, id: order.id };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) throw new Error("Not signed in");

  const order = await getOrder(orderId);
  if (!order) throw new Error("No such order");
  if (order.userId !== user.id) throw new Error("Not yours");

  await markCancelled(orderId);
  revalidatePath("/orders");
  return { ok: true };
}

export async function listOrders() {
  const user = await getSession();
  const orders = await db.order.findMany();
  return orders.filter((o) => o.userId === user.id);
}
