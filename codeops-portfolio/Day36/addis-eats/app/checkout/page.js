"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions";
import Link from "next/link";

export default function CheckoutPage() {
  const [state, formAction, pending] = useActionState(placeOrder, null);

  return (
    <main>
      <h1>Checkout</h1>

      {state?.ok ? (
        <div className="form-card" style={{ textAlign: "center" }}>
          <h2 style={{ color: "green", border: "none" }}>Order Placed!</h2>
          <p style={{ margin: "1rem 0" }}>
            Your order ID is <strong>{state.id}</strong>
          </p>
          <Link href="/orders" className="btn">
            View Orders
          </Link>
        </div>
      ) : (
        <div className="form-card">
          <form action={formAction}>
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
              <label className="form-label">Dish ID (optional)</label>
              <input
                name="dishId"
                placeholder="dish_1"
                className="form-input"
              />
              {state?.fieldErrors?.dishId && (
                <p className="form-error">{state.fieldErrors.dishId[0]}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                name="quantity"
                type="number"
                min="1"
                defaultValue="1"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea name="notes" rows={3} className="form-input" />
              {state?.fieldErrors?.notes && (
                <p className="form-error">{state.fieldErrors.notes[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="btn"
              style={{ width: "100%" }}
            >
              {pending ? "Sending…" : "Place Order"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
