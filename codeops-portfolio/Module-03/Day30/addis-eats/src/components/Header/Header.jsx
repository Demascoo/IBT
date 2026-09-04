import CartBadge from "../CartBadge/CartBadge";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Addis Eats</h1>
        <CartBadge />
      </div>
    </header>
  );
}

export default Header;
