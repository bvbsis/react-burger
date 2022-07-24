import { apiUrl, checkResponse } from "../api";

export const OPEN_INGREDIENT_DETAILS_MODAL = "OPEN_INGREDIENT_DETAILS_MODAL";
export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const GET_ORDER_DETAILS_REQUEST = "GET_ORDER_DETAILS";
export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED = "GET_ORDER_DETAILS_FAILED";


export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const getOrderDetails = (dispatch, ingredients) => {
  dispatch({
    type: GET_ORDER_DETAILS_REQUEST,
  });
  fetch(apiUrl("orders"), {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        orderNumber: data.order.number,
      });
      dispatch({
        type: OPEN_ORDER_DETAILS_MODAL,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: GET_ORDER_DETAILS_FAILED, payload: err });
    });
};
