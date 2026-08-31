import PropTypes from "prop-types";
import { useState } from "react";
import "./Product.css";

function Dish({ dish, currency = "ETB", onAdd }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
    if (onAdd) {
      onAdd(dish.price);
    }
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
        <p>Count: {count}</p>
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
  onAdd: PropTypes.func,
};

Dish.defaultProps = {
  currency: "ETB",
  onAdd: () => {},
};

export default Dish;
