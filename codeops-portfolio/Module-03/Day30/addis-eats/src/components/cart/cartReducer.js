export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existingItem = state.items.find(
        (item) => item.id === action.dish.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.dish, quantity: 1 }],
      };
    }

    case "remove": {
      const existingItem = state.items.find((item) => item.id === action.id);

      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    }

    case "clear":
      return { items: [] };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function getTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getItemCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
