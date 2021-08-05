import { ADD_CART_ITEM, CLEAR_CART, REMOVE_CART_ITEM } from "../types/cart";

const initialState = [];

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_CART_ITEM:
      return [...state, payload];
    case REMOVE_CART_ITEM:
      return state.filter((item) => item.id !== payload);
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
