import { TOrder } from "../../../utils/types/types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_REQUEST,
  TWsActions,
} from "../actions/ws";

type TWsState = {
  isConnected: boolean,
  isWsLoading: boolean,
  ordersData: {
    orders: ReadonlyArray<TOrder>;
    total: number;
    totalToday: number;
  },
  isWsError: boolean,
  wsError: null | string,
};

const initialState: TWsState = {
  isConnected: false,
  isWsLoading: false,
  ordersData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isWsError: false,
  wsError: null,
};

const wsReducer = (state = initialState, action: TWsActions): TWsState => {
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
