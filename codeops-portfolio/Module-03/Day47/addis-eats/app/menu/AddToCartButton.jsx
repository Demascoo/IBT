"use client";

import { useState } from "react";
import { useCart } from "@/app/providers";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className="btn"
      style={{
        width: "100%",
        background: added ? "green" : "var(--brand)",
        padding: "0.75rem 1.5rem",
      }}
    >
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
}
