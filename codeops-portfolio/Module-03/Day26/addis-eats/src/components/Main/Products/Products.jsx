import { useState } from "react";
import "./Product.css";

function Dish({ dish }) {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="dish">
      <div className="img-cont">
        <img src={dish.image} alt={dish.name} />
      </div>
      <p>{dish.name}</p>
      <p>{dish.price}</p>
      <div className="state">
        <button onClick={handleClick}>Add</button>
        <p>{count}</p>
      </div>
    </div>
  );
}

export default Dish;
