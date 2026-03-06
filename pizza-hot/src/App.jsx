import { useContext } from "react";
import Header from "./components/Header";
import PizzaList from "./components/PizzaList";
import { ThemeContext } from "./contexts/ThemeContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

export default function App() {
  const { mode } = useContext(ThemeContext);
  return (
    <div className={`bg-${mode}`}>
      <Header />
      <div className="container my-2">
        <PizzaList />
        <Cart />
        <Checkout />
      </div>
    </div>
  );
}
