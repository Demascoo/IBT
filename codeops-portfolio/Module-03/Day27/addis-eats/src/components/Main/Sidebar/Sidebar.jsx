import PropTypes from "prop-types";
import "./sidebar.css";

function Sidebar({ onCategoryChange, activeCategory }) {
  const categories = ["All", "Main", "Vegetarian", "Breakfast", "Side"];

  return (
    <aside className="sidebar">
      <h2>Categories</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`category-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => onCategoryChange(category)}

              // disabled
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

Sidebar.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
};

export default Sidebar;
