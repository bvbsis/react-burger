import {
  ADD_ELEMENT_TO_CONSTRUCTOR,
  DELETE_ELEMENT_FROM_CONSTRUCTOR,
  CHANGE_ELEMENT_POSITION,
} from "../actions/burger-constructor";

const initialState = {
  currentIngredients: {
    fillings: [],
    bun: {},
  },
  isLoading: false,
  isError: false,
  orderNumber: null,
  error: null,
};

const burgerConstructorDispatcher = (state = initialState, action) => {
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
            bun: { ...state.currentIngredients.bun },
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
          bun: { ...state.currentIngredients.bun },
        },
      };
    }
    case CHANGE_ELEMENT_POSITION: {
      return {
        ...state,
        currentIngredients: {
          bun: { ...state.currentIngredients.bun },
          fillings: action.newFillings,
        },
      };
    }
    default:
      return state;
  }
};

export default burgerConstructorDispatcher;
