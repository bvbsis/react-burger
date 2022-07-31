import { v4 as uuidv4 } from "uuid";
import { apiUrl, checkResponse } from "../api";

export const UNSET_CONSTRUCTOR_ERROR = "UNSET_CONSTRUCTOR_ERROR";
export const ADD_ELEMENT_TO_CONSTRUCTOR = "ADD_ELEMENT_TO_CONSTRUCTOR";
export const DELETE_ELEMENT_FROM_CONSTRUCTOR =
  "DELETE_ELEMENT_FROM_CONSTRUCTOR";
export const CHANGE_ELEMENT_POSITION = "CHANGE_ELEMENT_POSITION";

export const GET_ORDER_DETAILS_REQUEST = "GET_ORDER_DETAILS";
export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED = "GET_ORDER_DETAILS_FAILED";

export const unsetConstructorError = () => ({
  type: UNSET_CONSTRUCTOR_ERROR,
});

export const changeElementPosition = (newFillings) => ({
  type: CHANGE_ELEMENT_POSITION,
  newFillings,
});

export const addElementToConstructor = (element) => ({
  type: ADD_ELEMENT_TO_CONSTRUCTOR,
  element: { ...element, uuid: uuidv4() },
});

export const deleteElementFromConstructor = (uuid) => ({
  type: DELETE_ELEMENT_FROM_CONSTRUCTOR,
  uuid,
});

export const getOrderRequest = () => ({
  type: GET_ORDER_DETAILS_REQUEST,
})

export const getOrderSuccess = (number) => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: number
})

export const getOrderFailed = (err) => ({
  type: GET_ORDER_DETAILS_FAILED,
  payload: err
})

export const getOrderDetails =
  (navigate, location, ingredients) => async (dispatch) => {
    dispatch(getOrderRequest());
    try {
      const res = await fetch(apiUrl("orders"), {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
        }),
      });
      const data = await checkResponse(res);
      dispatch(getOrderSuccess(data.order.number));
      console.log('getOrderDetails')
      navigate(`/order/${data.order.number}`, {
        state: { backgroundLocation: location },
      });
    } catch (err) {
      console.error(err);
      dispatch(getOrderFailed(err));
    }
  };
