export const WS_CONNECTION_REQUEST = "WS_CONNECTION_REQUEST";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_FAILED = "WS_CONNECTION_FAILED";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS = "WS_GET_ORDERS";
export const WS_CLOSE = "WS_CLOSE";

export const wsStartConnection = (wsUrl) => {
  return {
    type: WS_CONNECTION_REQUEST,
    payload: wsUrl,
  };
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_FAILED,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetOrders = (orders) => {
  return {
    type: WS_GET_ORDERS,
    payload: orders,
  };
};

export const wsClose = (code, reason) => {
  return {
    type: WS_CLOSE,
    payload: { code, reason },
  };
};

export const wsActions = {
  wsInit: WS_CONNECTION_REQUEST,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_FAILED,
  onMessage: WS_GET_ORDERS,
  wsClose: WS_CLOSE,
};