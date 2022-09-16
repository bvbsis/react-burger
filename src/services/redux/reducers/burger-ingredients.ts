import { TIngredient } from "../../../utils/types/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  UNSET_INGREDIENTS_ERROR,
  TBurgerIngredientsActions,
} from "../actions/burger-ingredients";

type TBurgerIngredientsState = {
  items: Array<TIngredient>,
  isLoading: boolean,
  isIngredientsError: boolean,
  ingredientsError: null | string,
};

const initialState: TBurgerIngredientsState = {
  items: [],
  isLoading: false,
  isIngredientsError: false,
  ingredientsError: null,
};

const ingredientsReducer = (state = initialState, action: TBurgerIngredientsActions): TBurgerIngredientsState => {
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
