import Sidebar from "./Sidebar/Sidebar";
import Menu from "./Menu/Menu";
import "./main.css";

function Main() {
  const activeCategory = "All";

  const handleCategoryChange = (category) => {
    console.log("Category changed to:", category);
  };

  return (
    <div className="main">
      <Sidebar
        onCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
      />
      <Menu category={activeCategory} />
    </div>
  );
}

export default Main;
