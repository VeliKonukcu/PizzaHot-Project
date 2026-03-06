import { createContext, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function updateItem() {}

  function deleteItem(id) {
    dispatch({ type: "DELETE_ITEM", id });
  }
  function clearItems() {
    dispatch({ type: "CLEAR_CART" });
  }

  return (
    <CartContext.Provider
      value={{ items: cart.items, addItem, updateItem, deleteItem, clearItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
