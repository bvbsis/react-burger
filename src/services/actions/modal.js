import ApiUrl from "../api-url";

export const OPEN_INGREDIENT_DETAILS_MODAL = "OPEN_INGREDIENT_DETAILS_MODAL";
export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const GET_ORDER_DETAILS_REQUEST = "GET_ORDER_DETAILS";
export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED = "GET_ORDER_DETAILS_FAILED";

export const openIngredientModal = (ingredient, heading) => ({
  type: OPEN_INGREDIENT_DETAILS_MODAL,
  ingredient,
  heading,
});

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
      dispatch({
        type: OPEN_ORDER_DETAILS_MODAL,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: GET_ORDER_DETAILS_FAILED, payload: error });
    });
};
