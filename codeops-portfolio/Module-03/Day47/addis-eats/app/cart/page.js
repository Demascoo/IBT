"use client";

import Link from "next/link";
import { useCart } from "@/app/providers";

// FORCE STATIC RENDERING
export const dynamic = "force-static";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <main>
      <h1>Your cart</h1>

      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link href="/menu">Browse the menu →</Link>
        </p>
      ) : (
        <div className="form-card" style={{ maxWidth: "100%" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((i) => (
              <li
                key={i.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div>
                  <strong style={{ fontSize: "1.1rem" }}>{i.name}</strong>
                  <div
                    style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}
                  >
                    {i.price} ETB each
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "0.25rem",
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(i.id, -1)}
                      className="btn btn-secondary"
                      style={{ padding: "0.2rem 0.6rem", fontSize: "1rem" }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: "20px", textAlign: "center" }}>
                      {i.qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(i.id, 1)}
                      className="btn btn-secondary"
                      style={{ padding: "0.2rem 0.6rem", fontSize: "1rem" }}
                    >
                      +
                    </button>
                  </div>

                  {/* Total for this item */}
                  <strong style={{ minWidth: "80px", textAlign: "right" }}>
                    {i.price * i.qty} ETB
                  </strong>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(i.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--brand)",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0, border: "none" }}>Total: {total} ETB</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={clearCart} className="btn btn-secondary">
                Clear Cart
              </button>
              <Link href="/checkout" className="btn">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
