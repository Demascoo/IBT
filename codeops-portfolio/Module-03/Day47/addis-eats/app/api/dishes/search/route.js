import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  const all = await db.dish.findMany();
  const filtered = q
    ? all.filter(
        (d) =>
          d.nameEn.toLowerCase().includes(q) ||
          d.nameAm.includes(q) ||
          d.description.toLowerCase().includes(q),
      )
    : all;

  return Response.json(
    { status: "ok", query: q, count: filtered.length, data: filtered },
    { status: 200 },
  );
}
