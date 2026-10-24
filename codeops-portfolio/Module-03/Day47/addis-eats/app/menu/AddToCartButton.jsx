"use client";

import { useState } from "react";
import { useCart } from "@/app/providers";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(dish);
    setAdded(true);
    // Reset the button text after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className="btn"
      style={{
        width: "100%",
        maxWidth: "300px",
        background: added ? "green" : "var(--brand)",
      }}
    >
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
}
