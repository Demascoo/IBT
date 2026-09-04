import { useCart } from "../cart/CartContext";
import "./CartPanel.css";

function CartPanel() {
  const { items, total, dispatch } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-panel">
        <h3>Your Cart</h3>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <h3>Your Cart</h3>
      <ul className="cart-items">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>
              {item.quantity} × {item.price} ETB
            </span>
            <button
              onClick={() => dispatch({ type: "remove", id: item.id })}
              className="remove-btn"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Total: {total} ETB</strong>
      </div>
      <button onClick={() => dispatch({ type: "clear" })} className="clear-btn">
        Clear Cart
      </button>
    </div>
  );
}

export default CartPanel;
