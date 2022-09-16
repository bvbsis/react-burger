import { AppDispatch, AppThunk, TIngredient } from "../../../utils/types/types";
import { apiUrl, checkResponse } from "../../api";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
export const UNSET_INGREDIENTS_ERROR: "UNSET_INGREDIENTS_ERROR" =
  "UNSET_INGREDIENTS_ERROR";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST,
});

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredient>;
}
export const getIngredientsSuccess = (
  data: Array<TIngredient>
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data,
});

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly payload: any;
}
export const getIngredientsFailed = (err: any): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
  payload: err,
});

export interface IUnsetIngredientsErrorAction {
  readonly type: typeof UNSET_INGREDIENTS_ERROR;
}
export const unsetIngredientsError = (): IUnsetIngredientsErrorAction => ({
  type: UNSET_INGREDIENTS_ERROR,
});

export type TBurgerIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IUnsetIngredientsErrorAction;

export const getIngredients: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());
  try {
    const res = await fetch(apiUrl("ingredients"));
    const data = await checkResponse(res);
    console.log("Ingredients request");
    dispatch(getIngredientsSuccess(data.data));
  } catch (err) {
    dispatch(getIngredientsFailed(err));
    console.error(err);
  }
};
