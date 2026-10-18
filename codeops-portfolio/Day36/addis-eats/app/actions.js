"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schema";
import { createOrder, markCancelled, getOrder, db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function placeOrder(prevState, formData) {
  const user = await getSession();
  if (!user)
    return { ok: false, error: "You must be signed in to place an order." };

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
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  // Pass the session user ID to the database
  const order = await createOrder({ ...parsed.data, userId: user.id });
  revalidatePath("/orders");
  return { ok: true, id: order.id };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) throw new Error("Not signed in"); // 401

  const order = await getOrder(orderId);
  if (!order) throw new Error("No such order"); // 404

  // The crucial check: Does the order belong to the person asking?
  if (order.userId !== user.id) throw new Error("Not yours"); // 403

  await markCancelled(orderId);
  revalidatePath("/orders");
  return { ok: true };
}

export async function listOrders() {
  const user = await getSession();
  if (!user) return [];

  const orders = await db.order.findMany();
  // Only return orders that belong to this user
  return orders.filter((o) => o.userId === user.id);
}
