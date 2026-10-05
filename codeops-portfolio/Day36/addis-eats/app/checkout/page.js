import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const h = await headers();
  const userAgent = h.get("user-agent") ?? "unknown";

  return (
    <main>
      <h1>Checkout</h1>
      <p>Delivery details go here.</p>
      {/* <p style={{ fontSize: 12, color: "#777" }}>
        (Debug) Your user-agent: {userAgent}
      </p> */}
    </main>
  );
}
