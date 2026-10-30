import menuData from "@/data/menu.json";
import fs from "fs";
import path from "path";

const mockDishes = menuData.data;

// Local file path
const ordersFilePath = path.join(process.cwd(), "orders-db.json");

// In-memory fallback for Vercel
let memoryOrders = [];

function readOrders() {
  // If we are on Vercel (production), use memory
  if (process.env.NODE_ENV === "production") {
    return [...memoryOrders];
  }

  // Otherwise, use the local file
  try {
    const data = fs.readFileSync(ordersFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  // If we are on Vercel, save to memory
  if (process.env.NODE_ENV === "production") {
    memoryOrders = orders;
    return;
  }

  // Otherwise, write to the file
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
}

const mockUsers = [
  {
    id: "user_addis_101",
    name: "Abebe Bikila",
    email: "customer@addis.com",
    password: "password123",
    role: "customer",
  },
  {
    id: "user_staff_1",
    name: "Kitchen Staff",
    email: "staff@addis.com",
    password: "staff123",
    role: "staff",
  },
];

export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((d) => d.slug === where.slug || d.id === where.id) ||
      null,
  },
  order: {
    findMany: async () => readOrders(),
  },
  user: {
    findMany: async () => [...mockUsers],
  },
};

export async function getDish(slug) {
  return mockDishes.find((d) => d.slug === slug) || null;
}

export function getAllSlugs() {
  return mockDishes.map((d) => d.slug);
}

export async function createOrder(data) {
  const orders = readOrders();

  const newOrder = {
    id: `ord_${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  writeOrders(orders);

  return newOrder;
}

export async function getOrder(id) {
  const orders = readOrders();
  return orders.find((o) => o.id === id) || null;
}

export async function markCancelled(id) {
  const orders = readOrders();
  const order = orders.find((o) => o.id === id);

  if (!order) throw new Error("Order not found");

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();

  writeOrders(orders);
  return order;
}
