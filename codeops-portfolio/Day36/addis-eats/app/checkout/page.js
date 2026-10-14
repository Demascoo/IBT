"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions";

export default function CheckoutPage() {
  const [state, formAction, pending] = useActionState(placeOrder, null);

  return (
    <main>
      <h1>Checkout</h1>

      {state?.ok ? (
        <div>
          <p style={{ color: "green" }}>
            Order placed — id <strong>{state.id}</strong>
          </p>
          <p>
            Check the <a href="/orders">orders page</a> to see it.
          </p>
        </div>
      ) : (
        <form action={formAction}>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              Name
              <br />
              <input name="name" required style={{ padding: 6, width: 260 }} />
            </label>
            {state?.fieldErrors?.name && (
              <p style={{ color: "crimson", margin: "4px 0" }}>
                {state.fieldErrors.name[0]}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              Phone
              <br />
              <input
                name="phone"
                required
                placeholder="0912345678 or +251912345678"
                style={{ padding: 6, width: 260 }}
              />
            </label>
            {state?.fieldErrors?.phone && (
              <p style={{ color: "crimson", margin: "4px 0" }}>
                {state.fieldErrors.phone[0]}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              Dish ID (optional — e.g. dish_1)
              <br />
              <input name="dishId" style={{ padding: 6, width: 260 }} />
            </label>
            {state?.fieldErrors?.dishId && (
              <p style={{ color: "crimson", margin: "4px 0" }}>
                {state.fieldErrors.dishId[0]}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              Quantity
              <br />
              <input
                name="quantity"
                type="number"
                min="1"
                defaultValue="1"
                style={{ padding: 6, width: 80 }}
              />
            </label>
            {state?.fieldErrors?.quantity && (
              <p style={{ color: "crimson", margin: "4px 0" }}>
                {state.fieldErrors.quantity[0]}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              Notes (max 200 chars)
              <br />
              <textarea
                name="notes"
                rows={3}
                style={{ padding: 6, width: 260 }}
              />
            </label>
            {state?.fieldErrors?.notes && (
              <p style={{ color: "crimson", margin: "4px 0" }}>
                {state.fieldErrors.notes[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            style={{
              padding: "0.6rem 1.2rem",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: pending ? "wait" : "pointer",
            }}
          >
            {pending ? "Sending…" : "Place order"}
          </button>
        </form>
      )}
    </main>
  );
}
