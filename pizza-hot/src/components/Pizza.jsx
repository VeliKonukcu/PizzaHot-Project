import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";

export default function Pizza({ pizza }) {
  const { theme } = useContext(ThemeContext);
  const { addItem } = useContext(CartContext);

  return (
    <div className="col">
      <div className="card item h-100">
        <img
          src={`http://localhost:3000/images/${pizza.image}`}
          alt={pizza.title}
          className="card-img-top p-2 p-md-3 border-bottom"
        />
        <div className="card-body">
          <h3 className="card-title">{pizza.title}</h3>
          <p className="card-text">{pizza.description}</p>
          <div className="item-price">
            <b>{pizza.price} ₺</b>
            <button
              onClick={() => addItem(pizza)}
              className={`btn btn-sm btn-${theme}`}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
