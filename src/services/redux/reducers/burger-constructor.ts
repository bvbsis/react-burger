import { TConstructorElement } from "../../../utils/types/types";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import {
  ADD_ELEMENT_TO_CONSTRUCTOR,
  DELETE_ELEMENT_FROM_CONSTRUCTOR,
  CHANGE_ELEMENT_POSITION,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  UNSET_CONSTRUCTOR_ERROR,
} from "../actions/burger-constructor";

type TBurgerConstructorState = {
  currentIngredients: {
    fillings: ReadonlyArray<TConstructorElement>;
    bun: TConstructorElement | null;
  };
  isLoading: boolean;
  isConstructorError: boolean;
  orderNumber: null | number;
  constructorError: null | string;
};

const initialState: TBurgerConstructorState = {
  currentIngredients: {
    fillings: [],
    bun: null,
  },
  isLoading: false,
  isConstructorError: false,
  orderNumber: null,
  constructorError: null,
};

const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_ELEMENT_TO_CONSTRUCTOR: {
      if (action.element.type === "bun") {
        return {
          ...state,
          currentIngredients: {
            fillings: [...state.currentIngredients.fillings],
            bun: action.element,
          },
        };
      } else {
        return {
          ...state,
          currentIngredients: {
            bun: state.currentIngredients.bun,
            fillings: [action.element, ...state.currentIngredients.fillings],
          },
        };
      }
    }
    case DELETE_ELEMENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        currentIngredients: {
          fillings: [
            ...state.currentIngredients.fillings.filter(
              (ingredient) => ingredient.uuid !== action.uuid
            ),
          ],
          bun: state.currentIngredients.bun,
        },
      };
    }
    case CHANGE_ELEMENT_POSITION: {
      return {
        ...state,
        currentIngredients: {
          bun: state.currentIngredients.bun,
          fillings: action.newFillings,
        },
      };
    }
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        currentIngredients: {
          fillings: [],
          bun: null,
        },
        isLoading: false,
        isConstructorError: false,
        constructorError: null,
      };
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isConstructorError: true,
        constructorError: action.payload,
      };
    }
    case UNSET_CONSTRUCTOR_ERROR: {
      return {
        ...state,
        isConstructorError: false,
        constructorError: null,
      };
    }

    default:
      return state;
  }
};

export default burgerConstructorReducer;
