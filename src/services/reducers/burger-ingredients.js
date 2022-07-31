import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  UNSET_INGREDIENTS_ERROR,
} from "../actions/burger-ingredients";

const initialState = {
  items: [],
  isLoading: false,
  isIngredientsError: false,
  ingredientsError: null,
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: [...action.payload],
        isLoading: false,
        isIngredientsError: false,
        ingredientsError: null,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isIngredientsError: true,
        ingredientsError: action.payload,
      };
    }
    case UNSET_INGREDIENTS_ERROR: {
      return {
        ...state,
        isIngredientsError: false,
      };
    }
    default:
      return state;
  }
};

export default ingredientsReducer;
