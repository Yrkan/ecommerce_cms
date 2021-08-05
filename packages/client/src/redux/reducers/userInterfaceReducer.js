import { SET_ACTIVE_CATEGORY } from "../types/userInterface";

const initialState = {
  activeCategory: "0",
};

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: payload };
    default:
      return state;
  }
};

export default reducer;
