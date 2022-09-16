import { v4 as uuidv4 } from "uuid";
import { AppDispatch, AppThunk, TConstructorElement, TIngredient } from "../../../utils/types/types";
import { apiUrl, checkResponse, getCookie } from "../../api";

export const UNSET_CONSTRUCTOR_ERROR: "UNSET_CONSTRUCTOR_ERROR" =
  "UNSET_CONSTRUCTOR_ERROR";
export const ADD_ELEMENT_TO_CONSTRUCTOR: "ADD_ELEMENT_TO_CONSTRUCTOR" =
  "ADD_ELEMENT_TO_CONSTRUCTOR";
export const DELETE_ELEMENT_FROM_CONSTRUCTOR: "DELETE_ELEMENT_FROM_CONSTRUCTOR" =
  "DELETE_ELEMENT_FROM_CONSTRUCTOR";
export const CHANGE_ELEMENT_POSITION: "CHANGE_ELEMENT_POSITION" =
  "CHANGE_ELEMENT_POSITION";

export const GET_ORDER_DETAILS_REQUEST: "GET_ORDER_DETAILS" =
  "GET_ORDER_DETAILS";
export const GET_ORDER_DETAILS_SUCCESS: "GET_ORDER_DETAILS_SUCCESS" =
  "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED: "GET_ORDER_DETAILS_FAILED" =
  "GET_ORDER_DETAILS_FAILED";

export interface IUnsetConstructorErrorAction {
  readonly type: typeof UNSET_CONSTRUCTOR_ERROR;
}
export const unsetConstructorError = (): IUnsetConstructorErrorAction => ({
  type: UNSET_CONSTRUCTOR_ERROR,
});

export interface IChangeElementPositionAction {
  readonly type: typeof CHANGE_ELEMENT_POSITION;
  readonly newFillings: Array<TConstructorElement>;
}
export const changeElementPosition = (
  newFillings: Array<TConstructorElement>
): IChangeElementPositionAction => ({
  type: CHANGE_ELEMENT_POSITION,
  newFillings,
});

export interface IAddElementToConstructorAction {
  readonly type: typeof ADD_ELEMENT_TO_CONSTRUCTOR;
  readonly element: TConstructorElement;
}
export const addElementToConstructor = (ingredient: TIngredient) => ({
  type: ADD_ELEMENT_TO_CONSTRUCTOR,
  element: { ...ingredient, uuid: uuidv4() },
});

export interface IDeleteElementFromConstructorAction {
  readonly type: typeof DELETE_ELEMENT_FROM_CONSTRUCTOR;
  readonly uuid: string;
}
export const deleteElementFromConstructor = (
  uuid: string
): IDeleteElementFromConstructorAction => ({
  type: DELETE_ELEMENT_FROM_CONSTRUCTOR,
  uuid,
});

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}
export const getOrderRequest = (): IGetOrderRequestAction => ({
  type: GET_ORDER_DETAILS_REQUEST,
});

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  readonly payload: number;
}
export const getOrderSuccess = (number: number): IGetOrderSuccessAction => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: number,
});

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
  readonly payload: any;
}
export const getOrderFailed = (err: any) => ({
  type: GET_ORDER_DETAILS_FAILED,
  payload: err,
});

export type TBurgerConstructorActions =
  | IUnsetConstructorErrorAction
  | IChangeElementPositionAction
  | IAddElementToConstructorAction
  | IDeleteElementFromConstructorAction
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

export const getOrderDetails: AppThunk =
  (navigate, location, ingredients) => async (dispatch: AppDispatch) => {
    dispatch(getOrderRequest());
    try {
      const res = await fetch(apiUrl("orders"), {
        method: "POST",
        headers: {
          authorization: `Bearer ${getCookie("accessToken")}`,
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
        }),
      });
      const data = await checkResponse(res);
      dispatch(getOrderSuccess(data.order.number));
      console.log("getOrderDetails");
      navigate(`/neworder/${data.order.number}`, {
        state: { backgroundLocation: location },
      });
    } catch (err) {
      console.error(err);
      dispatch(getOrderFailed(err));
    }
  };
