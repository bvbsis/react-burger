export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsInit,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsClose,
      } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsClose) {
          socket.close(payload.code, payload.reason);
        }

        if (type === wsSendMessage) {
          socket.send(payload);
        }
      }

      next(action);
    };
  };
};
