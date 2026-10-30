import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session || session.role !== "staff") {
    redirect("/");
  }


  return <DashboardClient session={session} />;
}
