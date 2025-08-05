import { useEffect, useState } from "react";
import Pizza from "./Pizza";

export default function PizzaList() {
  const [pizzaValues, setPizzaValues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const response = await fetch("http://localhost:3000/pizzas");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const pizzas = await response.json();
        setPizzaValues(pizzas);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch pizzas:", error);
      }
    }
    fetchPizzas();
  }, []);

  return (
    <div className="pizza-list">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {pizzaValues.map((pizza) => (
          <Pizza
            key={pizza.id}
            imgSrc={pizza.image}
            title={pizza.title}
            description={pizza.description}
            price={pizza.price}
          />
        ))}
      </div>
    </div>
  );
}
