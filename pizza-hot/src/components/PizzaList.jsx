import Pizza from "./Pizza";
import useFetch from "../hooks/useFetch";

const config = {
  method: "GET",
};

export default function PizzaList() {
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/pizzas",
    config,
    []
  );

  if (isLoading) {
    return <div className="alert alert-warning">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // const [pizzaValues, setPizzaValues] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchPizzas() {
  //     try {
  //       const response = await fetch("http://localhost:3000/pizzas");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const pizzas = await response.json();
  //       setPizzaValues(pizzas);
  //     } catch (error) {
  //       setError(error.message);
  //       console.error("Failed to fetch pizzas:", error);
  //     }
  //   }
  //   fetchPizzas();
  // }, []);

  return (
    <div className="pizza-list">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {data.map((pizza) => (
          <Pizza key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}
