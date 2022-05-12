import { v4 as uuidv4 } from "uuid";

export const ADD_ELEMENT_TO_CONSTRUCTOR = "ADD_ELEMENT_TO_CONSTRUCTOR";
export const DELETE_ELEMENT_FROM_CONSTRUCTOR =
  "DELETE_ELEMENT_FROM_CONSTRUCTOR";
export const CHANGE_ELEMENT_POSITION = "CHANGE_ELEMENT_POSITION";

export const changeElementPosition = (newCurrentIngredients) => ({
  type: CHANGE_ELEMENT_POSITION,
  newCurrentIngredients,
});

export const addElementToConstructor = (ingredient) => ({
  type: ADD_ELEMENT_TO_CONSTRUCTOR,
  ingredient,
  uuid: uuidv4(),
});

export const deleteElementFromConstructor = (uuid) => ({
  type: DELETE_ELEMENT_FROM_CONSTRUCTOR,
  uuid,
});
