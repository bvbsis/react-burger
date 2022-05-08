import ApiUrl from "../api-url";
import { OPEN_ORDER_MODAL } from "./modal";

export const GET_ORDER_DETAILS_REQUEST = "GET_ORDER_DETAILS";
export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED = "GET_ORDER_DETAILS_FAILED";

export const getOrderDetails = (dispatch, ingredients) => {
  dispatch({
    type: GET_ORDER_DETAILS_REQUEST,
  });
  fetch(ApiUrl("orders"), {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((data) => {
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        orderNumber: data.order.number,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: GET_ORDER_DETAILS_FAILED, payload: error });
    });
};
