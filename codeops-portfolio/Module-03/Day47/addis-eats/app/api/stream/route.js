import { getOrder } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  // We get the ID from the URL query string instead of the path
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("orderId");

  if (!id) {
    return new Response("Missing orderId", { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      let lastStatus = null;
      let intervalId;

      const send = (order) => {
        controller.enqueue(`data: ${JSON.stringify(order)}\n\n`);
      };

      const initial = await getOrder(id);
      if (initial) {
        send(initial);
        lastStatus = initial.status;
      }

      intervalId = setInterval(async () => {
        const current = await getOrder(id);
        if (current && current.status !== lastStatus) {
          send(current);
          lastStatus = current.status;
        }
      }, 3000);

      request.signal.addEventListener("abort", () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
