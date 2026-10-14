import { orderSchema } from "@/lib/schema";
import { createOrder, db } from "@/lib/db";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed JSON" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  if (parsed.data.dishId) {
    const dish = await db.dish.findUnique({
      where: { id: parsed.data.dishId },
    });
    if (!dish) {
      return Response.json(
        { error: "No such dish", fieldErrors: { dishId: ["Dish not found"] } },
        { status: 422 },
      );
    }
  }

  const order = await createOrder(parsed.data);
  return Response.json(order, { status: 201 });
}

export async function GET() {
  const orders = await db.order.findMany();
  return Response.json({ status: "ok", data: orders });
}
