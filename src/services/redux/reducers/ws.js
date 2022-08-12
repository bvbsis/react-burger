import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_REQUEST,
} from "../actions/ws";

const initialState = {
  isConnected: false,
  isWsLoading: false,
  ordersData: {},
  isWsError: false,
  wsError: null,
};

const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_REQUEST:
      return {
        ...state,
        isConnected: false,
        isWsLoading: true,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        isConnected: true,
        isWsError: false,
      };

    case WS_CONNECTION_FAILED:
      console.log(action);
      return {
        ...state,
        isConnected: false,
        isWsLoading: false,
        isWsError: true,
        wsError: action.payload,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        isConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        ordersData: action.payload,
        isWsLoading: false,
      };

    default:
      return state;
  }
};

export default wsReducer;
