import { cookies } from "next/headers";
import { db } from "./db";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  const users = await db.user.findMany();
  const user = users.find((u) => u.id === token);

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
