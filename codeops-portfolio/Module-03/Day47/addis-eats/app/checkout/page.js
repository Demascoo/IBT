"use client";

import { useActionState, useEffect } from "react";
import { placeOrder } from "@/app/actions";
import { useCart } from "@/app/providers";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, null);

  useEffect(() => {
    if (state?.ok) clearCart();
  }, [state?.ok, clearCart]);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items.length === 0 && !state?.ok) {
    return (
      <main>
        <h1>Checkout</h1>
        <p>
          Your cart is empty. <Link href="/menu">Browse the menu →</Link>
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Checkout</h1>

      {state?.ok ? (
        <div className="form-card" style={{ textAlign: "center" }}>
          <h2 style={{ color: "green", border: "none" }}>Order Placed!</h2>
          <Link href="/orders" className="btn">
            View Orders
          </Link>
        </div>
      ) : (
        <div className="form-card">
          {state?.error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>
              {state.error}
            </div>
          )}

          <div style={{ marginBottom: "2rem" }}>
            <h3>Order Summary</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {items.map((i) => (
                <li
                  key={i.id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    {i.qty} × {i.name}
                  </span>
                  <span>{i.price * i.qty} ETB</span>
                </li>
              ))}
            </ul>
            <h3 style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total:</span>
              <span style={{ color: "var(--brand)" }}>{total} ETB</span>
            </h3>
          </div>

          <form action={formAction}>
            <input
              type="hidden"
              name="cart_items"
              value={JSON.stringify(items)}
            />
            <input type="hidden" name="total" value={total} />

            <div className="form-group">
              <label className="form-label">Name</label>
              <input name="name" required className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              {/* type="tel" brings up the numeric keypad on phones */}
              <input
                name="phone"
                type="tel"
                required
                placeholder="0912345678"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Neighbourhood</label>
              <select
                name="area"
                required
                className="form-input"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your area...
                </option>
                <option value="Bole">Bole</option>
                <option value="Kazanchis">Kazanchis</option>
                <option value="Megenagna">Megenagna</option>
              </select>
            </div>

            {/* Disabled while pending prevents double submits */}
            <button
              type="submit"
              disabled={pending}
              className="btn"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              {pending ? "Placing Order…" : `Pay ${total} ETB`}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
