import { db } from "./db";

export async function authenticateUser(email, password) {
  const normalizedEmail = String(email ?? "")
    .trim()
    .toLowerCase();

  const users = await db.user.findMany();
  const user = users.find((u) => u.email === normalizedEmail);

  if (!user || user.password !== password) {
    return null; // Authentication failed
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
