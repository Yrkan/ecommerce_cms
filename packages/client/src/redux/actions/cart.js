import { ADD_CART_ITEM, CLEAR_CART, REMOVE_CART_ITEM } from "../types/cart";

export const addCartItem = (payload) => ({
  type: ADD_CART_ITEM,
  payload,
});

export const removeCartItem = (payload) => ({
  type: REMOVE_CART_ITEM,
  payload,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
