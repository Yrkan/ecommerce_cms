import { SET_ACTIVE_CATEGORY } from "../types/userInterface";

export const setActiveCategory = (payload) => {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload,
  };
};
