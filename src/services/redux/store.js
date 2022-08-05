import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsActions } from "./actions/ws.js";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsUrl = "wss://norma.nomoreparties.space/orders/all";

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
);

const store = createStore(rootReducer, enhancer);

export default store;
