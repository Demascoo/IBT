import { useState, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch"; // Go up 2 levels
import Dish from "../Products/Dish";
import Card from "../../Card/Card";
import CategoryBar from "../../CategoryBar/CategoryBar";
import OrderForm from "../../OrderForm/OrderForm";
import CartPanel from "../../CartPanel/CartPanel";
import "./Menu.css";

function Menu() {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Main", "Vegetarian", "Breakfast", "Side"];

  const { data: dishes, loading, error } = useFetch("/dishes.json");

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];

    return dishes.filter((dish) => {
      const matchesCategory = category === "All" || dish.category === category;
      const matchesSearch = dish.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dishes, category, searchTerm]);

  if (loading) {
    return (
      <section className="menu-section">
        <div className="controls-container">
          <CategoryBar
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
          <div className="search-container">
            <input
              type="text"
              placeholder="Search dishes..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading the menu...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu-section">
        <div className="controls-container">
          <CategoryBar
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
          <div className="search-container">
            <input
              type="text"
              placeholder="Search dishes..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="error-state">
          <p className="error-message">⚠️ {error}</p>
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (filteredDishes.length === 0) {
    return (
      <section className="menu-section">
        <div className="controls-container">
          <CategoryBar
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
          <div className="search-container">
            <input
              type="text"
              placeholder="Search dishes..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Card>
          <p className="empty-message">
            {searchTerm
              ? `No dishes found matching "${searchTerm}"`
              : `No ${category} dishes available.`}
          </p>
        </Card>
        <CartPanel />
        <OrderForm />
      </section>
    );
  }

  return (
    <section className="menu-section">
      <div className="controls-container">
        <CategoryBar
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search dishes..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <CartPanel />

      <div className="dishes-grid">
        {filteredDishes.map((item) => {
          return (
            <Card key={item.id}>
              <Dish dish={item} />
            </Card>
          );
        })}
      </div>

      <OrderForm />
    </section>
  );
}

export default Menu;
