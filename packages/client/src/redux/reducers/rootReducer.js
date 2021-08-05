import { combineReducers } from "redux";
import userInterfaceReducer from "../reducers/userInterfaceReducer";
import dataReducer from "../reducers/dataReducer";
import cartReducer from "../reducers/cartReducer";

const rootReducer = combineReducers({
  userInterface: userInterfaceReducer,
  data: dataReducer,
  cart: cartReducer,
});

export default rootReducer;
