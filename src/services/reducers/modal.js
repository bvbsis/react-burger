import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  OPEN_INGREDIENT_DETAILS_MODAL,
  OPEN_ORDER_DETAILS_MODAL,
  CLOSE_MODAL,
} from "../actions/modal";

const initialState = {
  isLoading: false,
  currentModal: null,
  isError: false,
  orderNumber: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS_MODAL: {
      return {
        ...state,
        isLoading: false,
        currentModal: "ingredient",
      };
    }
    case OPEN_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        isOpen: true,
        isLoading: false,
        currentModal: "order",
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isLoading: false,
        currentModal: null,
        isError: false,
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
    default:
      return state;
  }
};

export default modalReducer;
