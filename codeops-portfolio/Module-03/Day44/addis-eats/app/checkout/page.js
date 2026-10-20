"use client";

import { useActionState, useEffect } from "react";
import { placeOrder } from "@/app/actions";
import { useCart } from "@/app/providers";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, null);

  // Clear cart on success
  useEffect(() => {
    if (state?.ok) {
      clearCart();
    }
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
          <p style={{ margin: "1rem 0" }}>
            Your order ID is <strong>{state.id}</strong>
          </p>
          <Link href="/dashboard" className="btn" style={{ marginTop: "1rem" }}>
            View Dashboard
          </Link>
        </div>
      ) : (
        <div className="form-card">
          {state?.error && (
            <div
              style={{
                padding: "0.75rem",
                marginBottom: "1.5rem",
                background: "#fee",
                color: "#c00",
                borderRadius: "6px",
                fontSize: "0.9rem",
              }}
            >
              {state.error}
            </div>
          )}

          <div
            style={{
              marginBottom: "2rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Order Summary</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {items.map((i) => (
                <li
                  key={i.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                    fontSize: "0.95rem",
                  }}
                >
                  <span>
                    {i.qty} × {i.name}
                  </span>
                  <span>{i.price * i.qty} ETB</span>
                </li>
              ))}
            </ul>
            <h3
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
                border: "none",
              }}
            >
              <span>Total:</span>
              <span style={{ color: "var(--brand)" }}>{total} ETB</span>
            </h3>
          </div>

          <form action={formAction}>
            {/* Hidden inputs to pass data to the server action */}
            <input
              type="hidden"
              name="cart_items"
              value={JSON.stringify(items)}
            />
            <input type="hidden" name="total" value={total} />

            <div className="form-group">
              <label className="form-label">Name</label>
              <input name="name" required className="form-input" />
              {state?.fieldErrors?.name && (
                <p className="form-error">{state.fieldErrors.name[0]}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                required
                placeholder="0912345678"
                className="form-input"
              />
              {state?.fieldErrors?.phone && (
                <p className="form-error">{state.fieldErrors.phone[0]}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Neighbourhood (Area)</label>
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
              {state?.fieldErrors?.area && (
                <p className="form-error">{state.fieldErrors.area[0]}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Notes (Optional)</label>
              <textarea
                name="notes"
                rows={2}
                className="form-input"
                placeholder="e.g., Ring the bell twice"
              />
            </div>

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
