import PropTypes from "prop-types";
import "./Product.css";

function Dish({ dish, currency = "ETB" }) {


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
        <p>Add to cart</p>
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
    spicy: PropTypes.bool, // optional
    image: PropTypes.string.isRequired,
  }).isRequired,
  currency: PropTypes.string, 
};

Dish.defaultProps = {
  currency: "ETB",
};

export default Dish;
