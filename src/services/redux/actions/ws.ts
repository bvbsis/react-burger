import { TOrdersData } from "../../../utils/types/types";

export const WS_CONNECTION_REQUEST: "WS_CONNECTION_REQUEST" =
  "WS_CONNECTION_REQUEST";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_FAILED: "WS_CONNECTION_FAILED" =
  "WS_CONNECTION_FAILED";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";
export const WS_CLOSE: "WS_CLOSE" = "WS_CLOSE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export interface IWsStartConnectionAction {
  readonly type: typeof WS_CONNECTION_REQUEST;
  readonly payload: string;
}

export const wsStartConnection = (wsUrl: string): IWsStartConnectionAction => {
  return {
    type: WS_CONNECTION_REQUEST,
    payload: wsUrl,
  };
};

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_FAILED;
  readonly payload: any;
}

export const wsConnectionError = (err: any): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_FAILED,
    payload: err,
  };
};

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export interface IWsGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: TOrdersData;
}

export const wsGetOrders = (orders: TOrdersData): IWsGetOrdersAction => {
  return {
    type: WS_GET_ORDERS,
    payload: orders,
  };
};

export interface IWsCloseAction {
  readonly type: typeof WS_CLOSE;
  readonly payload: {
    code: number;
    reason: string;
  };
}

export const wsClose = (code: number, reason: string): IWsCloseAction => {
  return {
    type: WS_CLOSE,
    payload: { code, reason },
  };
};

export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any;
}

export const wsSendMessage = (message: any): IWsSendMessageAction => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};

export type TWsActions =
  | IWsStartConnectionAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetOrdersAction
  | IWsCloseAction
  | IWsSendMessageAction;

export interface IWsAction {
  wsInit: typeof WS_CONNECTION_REQUEST;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_FAILED;
  onMessage: typeof WS_GET_ORDERS;
  wsClose: typeof WS_CLOSE;
  wsSendMessage: typeof WS_SEND_MESSAGE;
}

export const wsActions = {
  wsInit: WS_CONNECTION_REQUEST,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_FAILED,
  onMessage: WS_GET_ORDERS,
  wsClose: WS_CLOSE,
  wsSendMessage: WS_SEND_MESSAGE,
};
