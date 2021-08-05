import { SET_CATEGORIES, SET_PRODUCTS } from "../types/data";

const initialState = {
  categories: [],
  products: [],
};

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: payload };
    case SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export default reducer;
