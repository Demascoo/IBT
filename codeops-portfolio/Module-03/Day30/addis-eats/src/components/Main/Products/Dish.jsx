import PropTypes from "prop-types";
import { useState } from "react";
import { useCart } from "../../cart/CartContext"; 
import "./Product.css";

function Dish({ dish, currency = "ETB" }) {
  const [count, setCount] = useState(0);
  const { dispatch } = useCart();

  function handleAdd() {
    setCount(count + 1);
    dispatch({ type: "add", dish });
  }

  return (
    <div className="dish">
      <div className="img-cont">
        <img src={dish.image} alt={dish.name} />
      </div>
      <p>{dish.name}</p>
      <p>
        {dish.price} {currency}
      </p>
      {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}

      <div className="state">
        <button onClick={handleAdd}>Add</button>
        <p>Added: {count}</p>
      </div>
    </div>
  );
}

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
    image: PropTypes.string.isRequired,
  }).isRequired,
  currency: PropTypes.string,
};

Dish.defaultProps = {
  currency: "ETB",
};

export default Dish;
