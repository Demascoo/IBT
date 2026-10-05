"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}

export function Providers({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (dish) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.id === dish.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [
        ...prev,
        { id: dish.id, name: dish.nameEn, price: dish.priceETB, qty: 1 },
      ];
    });
  };

  const clearCart = () => setItems([]);

  const value = { items, addToCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
