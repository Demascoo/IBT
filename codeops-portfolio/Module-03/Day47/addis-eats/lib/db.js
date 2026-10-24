import menuData from "@/data/menu.json";
import fs from "fs";
import path from "path";

const mockDishes = menuData.data;


const ordersFilePath = path.join(process.cwd(), "orders-db.json");

// Helper to read from the file
function readOrders() {
  try {
    const data = fs.readFileSync(ordersFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper to write to the file
function writeOrders(orders) {
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
    // Read from the JSON file instead of memory
    findMany: async () => readOrders(),
  },
  user: {
    findMany: async () => [...mockUsers],
  },
};

export async function getDish(slug) {
  return mockDishes.find((d) => d.slug === slug) || null;
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

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  return mockUsers.find((u) => u.id === token) || null;
}
