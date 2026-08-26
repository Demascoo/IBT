import Sidebar from "./Sidebar/sidebar";
import Menu from "./Menu/menu";
import "./main.css";

function Main() {
  return (
    <div className="main">
      <Sidebar />
      <Menu />
    </div>
  );
}

export default Main;
