import { createContext, useContext, useReducer, useMemo } from "react";
import { cartReducer, getTotal, getItemCount } from "./cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo(() => {
    return {
      items: state.items,
      total: getTotal(state.items),
      count: getItemCount(state.items),
      dispatch,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
