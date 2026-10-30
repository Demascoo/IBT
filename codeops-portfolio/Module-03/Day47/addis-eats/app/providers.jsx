"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}

export function Providers({ children }) {
  const [items, setItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Load cart from localStorage when the app starts
  useEffect(() => {
    const saved = localStorage.getItem("addis-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
    setIsMounted(true);
  }, []);

  // 2. Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("addis-cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addToCart = useCallback((dish) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.id === dish.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: dish.id,
          name: dish.nameEn,
          price: dish.priceETB,
          qty: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQty = i.qty + delta;
          return newQty > 0 ? { ...i, qty: newQty } : i;
        }
        return i;
      }),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) return null;

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
