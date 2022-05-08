import ApiUrl from "../api-url";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  fetch(ApiUrl("ingredients"))
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((data) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        payload: err,
      });
    });
};