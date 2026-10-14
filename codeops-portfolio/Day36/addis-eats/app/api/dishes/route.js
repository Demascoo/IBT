import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let dishes = await db.dish.findMany();

  if (category) {
    dishes = dishes.filter((d) => d.category === category);
  }

  return Response.json(
    { status: "ok", count: dishes.length, data: dishes },
    { status: 200 },
  );
}
