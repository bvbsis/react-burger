import ingredientsReducer from "./burger-ingredients";
import burgerConstructorDispatcher from "./burger-constructor";
import modalReducer from "./modal";
import { combineReducers } from "redux";

export default combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  burgerConstructor: burgerConstructorDispatcher,
});
