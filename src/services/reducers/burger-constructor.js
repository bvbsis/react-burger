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
      return {
        ...state,
        currentIngredients: [...action.newCurrentIngredients],
      };
    }
    default:
      return state;
  }
};

export default burgerConstructorDispatcher;
