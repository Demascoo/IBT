"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schema";
import { createOrder, markCancelled, getOrder, db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { cookies } from "next/headers";

// ───────────────────────────────────────────────────────────
// AUTHENTICATION
// ───────────────────────────────────────────────────────────
export async function authenticateUser(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) return { error: "Missing fields" };

  const users = await db.user.findMany();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) return { error: "Invalid email or password" };

  // Use the standard Next.js 15 cookie API
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  cookieStore.set("session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // TRUE on Vercel
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true };
}

// ───────────────────────────────────────────────────────────
// ORDERS
// ───────────────────────────────────────────────────────────

export async function placeOrder(prevState, formData) {
  const user = await getSession();
  if (!user)
    return { ok: false, error: "You must be signed in to place an order." };

  const itemsString = formData.get("cart_items");
  const items = itemsString ? JSON.parse(itemsString) : [];

  if (items.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }

  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    area: formData.get("area"),
    total: Number(formData.get("total")),
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
  revalidatePath("/dashboard");

  return { ok: true, id: order.id, orderData: order };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) throw new Error("Not signed in");

  const order = await getOrder(orderId);
  if (!order) throw new Error("No such order");
  if (order.userId !== user.id) throw new Error("Not yours");

  await markCancelled(orderId);
  revalidatePath("/orders");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function listOrders() {
  const user = await getSession();
  if (!user) return [];

  const orders = await db.order.findMany();
  return orders.filter((o) => o.userId === user.id);
}
