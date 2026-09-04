import PropTypes from "prop-types";
import "./CategoryBar.css";

function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="category-bar">
      <label htmlFor="category-select" className="category-label">
      Category:
      </label>
      <select
        id="category-select"
        className="category-select"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryBar;
