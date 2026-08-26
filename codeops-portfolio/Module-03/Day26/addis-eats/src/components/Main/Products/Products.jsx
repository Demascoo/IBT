import dishes from "../../data/menu.json";
import "./Product.css";

function Products() {
 return (
    <div className="products">
      <h2> Menu</h2>
      <div className="dishes-grid">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish">
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <div className="dish-content">
              <h3>{dish.name}</h3>
              <p className="category">{dish.category}</p>
              <p className="spicy">
                {dish.spicy ? "🌶️ Spicy" : "😋 Not Spicy"}
              </p>
              <p className="price">{dish.price} ETB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Products;
