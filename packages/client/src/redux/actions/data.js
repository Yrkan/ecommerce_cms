import { SET_CATEGORIES, SET_PRODUCTS } from "../types/data";

export const setProducts = (payload) => {
  return {
    type: SET_PRODUCTS,
    payload,
  };
};

export const setCategories = (payload) => {
  return {
    type: SET_CATEGORIES,
    payload,
  };
};
