import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../actions/ws";

const initialState = {
  isConected: false,
  ordersData: {},
  isError: false,
  error: null,
};

const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_FAILED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        ordersData: action.payload,
      };

    default:
      return state;
  }
};

export default wsReducer;
