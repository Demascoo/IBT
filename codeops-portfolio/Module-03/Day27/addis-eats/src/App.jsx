import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/footer/Footer";
import Card from "./components/Card/Card";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Card>
        <Header />
      </Card>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
