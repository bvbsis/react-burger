import { v4 as uuidv4 } from "uuid";

import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  ADD_ELEMENT_TO_CONSTRUCTOR,
  DELETE_ELEMENT_FROM_CONSTRUCTOR,
  CHANGE_ELEMENT_POSITION,
} from "../actions/burger-constructor";

const initialState = {
  currentIngredients: [],
  isLoading: false,
  isError: false,
  orderNumber: null,
  error: null,
};

const burgerConstructorDispatcher = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        orderNumber: action.orderNumber,
      };
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    }
    case ADD_ELEMENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        currentIngredients: [
          ...state.currentIngredients,
          {
            ...action.ingredient,
            uuid: uuidv4(),
            index: state.currentIngredients.length,
          },
        ],
      };
    }
    case DELETE_ELEMENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        currentIngredients: [
          ...state.currentIngredients.filter(
            (ingredient) => ingredient.uuid !== action.uuid
          ),
        ],
      };
    }
    case CHANGE_ELEMENT_POSITION: {
      console.log(action.index, action.ingredient.index);
      const newCurrentIngredients = [...state.currentIngredients];
      newCurrentIngredients.splice(action.ingredient.index, 1);
      newCurrentIngredients.splice(action.index + 1, 0, action.ingredient);
      newCurrentIngredients[action.index + 1].index = action.index + 1;
      return {
        ...state,
        currentIngredients: [
          ...newCurrentIngredients
        ],
      };
    }
    default:
      return state;
  }
};

export default burgerConstructorDispatcher;
