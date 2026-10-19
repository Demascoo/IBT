import menuData from "@/data/menu.json";


const mockDishes = menuData.data;


const mockOrders = [];


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
    findMany: async () => [...mockOrders],
  },
  user: {
    findMany: async () => [...mockUsers],
  },
};

// Fetch a single dish by SLUG
export async function getDish(slug) {
  return mockDishes.find((d) => d.slug === slug) || null;
}

export async function createOrder(data) {
  const newOrder = {
    id: `ord_${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };
  mockOrders.push(newOrder);
  return newOrder;
}

export async function getOrder(id) {
  return mockOrders.find((o) => o.id === id) || null;
}

export async function markCancelled(id) {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) throw new Error("Order not found");
  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();
  return order;
}
