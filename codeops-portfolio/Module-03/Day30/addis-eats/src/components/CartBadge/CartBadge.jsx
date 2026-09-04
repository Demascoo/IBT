import { useCart } from "../cart/CartContext";
import "./CartBadge.css";

function CartBadge() {
  const { count } = useCart();

  return (
    <div className="cart-badge">
      <span className="cart-icon">🛒</span>
      {count > 0 && <span className="badge-count">{count}</span>}
    </div>
  );
}

export default CartBadge;
