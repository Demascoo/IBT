"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schema";
import { createOrder, markCancelled, getOrder, db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function placeOrder(prevState, formData) {
  const user = await getSession();
  if (!user)
    return { ok: false, error: "You must be signed in to place an order." };

  // Retrieve the items from the form data
  const itemsString = formData.get("cart_items");
  const items = itemsString ? JSON.parse(itemsString) : [];

  if (items.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }

  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    notes: formData.get("notes") || undefined,
  };

  const parsed = orderSchema.safeParse(raw);

  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const order = await createOrder({
    ...parsed.data,
    items,
    userId: user.id,
  });

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
  if (!user) return [];

  const orders = await db.order.findMany();
  return orders.filter((o) => o.userId === user.id);
}
