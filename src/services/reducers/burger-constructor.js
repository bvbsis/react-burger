import {
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
    case ADD_ELEMENT_TO_CONSTRUCTOR: {
      if (action.ingredient.type === "bun") {
        const newArray = [...state.currentIngredients].filter(
          (ingredient) => ingredient.type !== "bun"
        );
        return {
          ...state,
          currentIngredients: [
            ...newArray,
            {
              ...action.ingredient,
              uuid: action.uuid,
            },
          ],
        };
      } else {
        return {
          ...state,
          currentIngredients: [
            ...state.currentIngredients,
            {
              ...action.ingredient,
              uuid: action.uuid,
            },
          ],
        };
      }
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
