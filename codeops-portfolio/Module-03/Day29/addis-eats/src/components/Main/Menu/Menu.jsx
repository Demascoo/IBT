import { useState, useEffect, useRef } from "react";
import Dish from "../Products/Dish";
import Card from "../../Card/Card";
import CategoryBar from "../../CategoryBar/CategoryBar";
import OrderForm from "../../OrderForm/OrderForm";
import { loadDishes } from "../../../api";
import "./Menu.css";

function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);

  const categories = ["All", "Main", "Vegetarian", "Breakfast", "Side"];

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    async function fetchDishes() {
      setLoading(true);
      setError(null);

      try {
        const data = await loadDishes(abortController.signal);
        if (isMounted) {
          setDishes(data);
        }
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDishes();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [category]);

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = category === "All" || dish.category === category;
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function handleAddToOrder(price) {
    setTotal(total + price);
  }

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
              ref={searchRef}
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
              ref={searchRef}
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
            onClick={() => {
              setError(null);
              setLoading(true);
              setCategory(category);
            }}
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
              ref={searchRef}
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
            ref={searchRef}
            type="text"
            placeholder="Search dishes..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="order-total">
        <h3>Order Total: {total} ETB</h3>
      </div>

      <div className="dishes-grid">
        {filteredDishes.map((item) => {
          return (
            <Card key={item.id}>
              <Dish dish={item} onAdd={handleAddToOrder} />
            </Card>
          );
        })}
      </div>

      <OrderForm />
    </section>
  );
}

export default Menu;
