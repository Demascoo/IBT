import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;


  return {
    id: token,
    name: token === "user_addis_101" ? "Abebe Bikila" : "Guest",
    role: "customer",
  };
}
