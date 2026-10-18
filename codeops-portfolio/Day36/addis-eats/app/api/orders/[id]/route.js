import { getOrder } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return Response.json({ error: "No such order", id }, { status: 404 });
  }

  return Response.json(order, { status: 200 });
}
