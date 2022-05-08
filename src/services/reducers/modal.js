import {
  OPEN_INGREDIENT_MODAL,
  OPEN_ORDER_MODAL,
  CLOSE_MODAL,
} from "../actions/modal";

const initialState = {
  isOpen: false,
  ingredient: {},
  heading: null,
  currentModal: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        isOpen: true,
        ingredient: action.ingredient,
        heading: action.heading,
        currentModal: "ingredient-details",
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOpen: true,
        currentModal: "order-details",
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
        ingredient: null,
        heading: null,
        currentModal: null,
      };
    }
    default:
      return state;
  }
};

export default modalReducer;
