"use client";

import { useCart } from "@/app/providers";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(dish)}
      style={{
        padding: "0.5rem 1rem",
        background: "#111",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
      }}
    >
      Add to cart
    </button>
  );
}
