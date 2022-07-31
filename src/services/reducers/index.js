import ingredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import userReducer from "./user";
import { combineReducers } from "redux";

export default combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
});
