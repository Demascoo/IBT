import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/footer/Footer";
import { CartProvider } from "./components/cart/CartContext";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
