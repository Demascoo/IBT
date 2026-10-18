import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  // Fetch all and filter in memory (mock db)
  const all = await db.dish.findMany();

  const filtered = q
    ? all.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q),
      )
    : all;

  return Response.json(
    { status: "ok", count: filtered.length, data: filtered },
    { status: 200 },
  );
}
