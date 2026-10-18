"use client";

import Link from "next/link";
import { useCart } from "@/app/providers";

export default function CartPage() {
  const { items, clearCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <main>
      <h1>Your cart</h1>
      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link href="/menu">Browse the menu →</Link>
        </p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((i) => (
              <li
                key={i.id}
                style={{
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <strong>{i.name}</strong> × {i.qty} — {i.price * i.qty} ETB
              </li>
            ))}
          </ul>
          <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
            Total: {total} ETB
          </p>
          <button
            onClick={clearCart}
            className="btn"
            style={{ background: "#c00", marginTop: "1rem" }}
          >
            Clear cart
          </button>
        </>
      )}
    </main>
  );
}
