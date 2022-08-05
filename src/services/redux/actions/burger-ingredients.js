import { apiUrl, checkResponse } from "../../api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const UNSET_INGREDIENTS_ERROR = "UNSET_INGREDIENTS_ERROR";

export const getIngredientsRequest = () => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (data) => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data,
});
export const getIngredientsFailed = (err) => ({
  type: GET_INGREDIENTS_FAILED,
  payload: err,
});

export const unsetIngredientsError = () => ({
  type: UNSET_INGREDIENTS_ERROR,
});

export const getIngredients = () => async (dispatch) => {
  dispatch(getIngredientsRequest());
  try {
    const res = await fetch(apiUrl("ingredients"));
    const data = await checkResponse(res);
    console.log("Ingredients request");
    dispatch(getIngredientsSuccess(data.data));
  } catch (err) {
    dispatch(getIngredientsFailed());
    console.error(err);
  }
};
