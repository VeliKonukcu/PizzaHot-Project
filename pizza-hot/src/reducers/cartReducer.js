export default function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const allItems = [...state.items];

      const itemId = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      if (itemId > -1) {
        const existingItem = state.items[itemId];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };

        allItems[itemId] = updatedItem;
      } else {
        allItems.push({ ...action.item, quantity: 1 });
      }

      return {
        ...state,
        items: allItems,
      };
    case "DELETE_ITEM":
      const itemsAll = [...state.items];
      const index = state.items.findIndex((item) => item.id === action.id);
      const existingItem = state.items[index];

      if (existingItem.quantity === 1) {
        itemsAll.splice(index, 1);
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        itemsAll[index] = updatedItem;
      }

      return {
        ...state,
        items: itemsAll,
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}
