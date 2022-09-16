import { AppDispatch, AppThunk } from "../../../utils/types/types";
import {
  confirmPasswordReset,
  getUser,
  logIn,
  logOut,
  register,
  sendPasswordResetEmail,
  setUser,
} from "../../useAuth";

export const UNSET_USER_ERROR: "UNSET_USER_ERROR" = "UNSET_USER_ERROR";

export const PASSWORD_RESET_REQUEST: "PASSWORD_RESET_REQUEST" =
  "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_SUCCESS: "PASSWORD_RESET_SUCCESS" =
  "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILED: "PASSWORD_RESET_FAILED" =
  "PASSWORD_RESET_FAILED";

export const PASSWORD_CHANGE_REQUEST: "PASSWORD_CHANGE_REQUEST" =
  "PASSWORD_CHANGE_REQUEST";
export const PASSWORD_CHANGE_SUCCESS: "PASSWORD_CHANGE_SUCCESS" =
  "PASSWORD_CHANGE_SUCCESS";
export const PASSWORD_CHANGE_FAILED: "PASSWORD_CHANGE_FAILED" =
  "PASSWORD_CHANGE_FAILED";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";

export const GET_USER_DATA_REQUEST: "GET_USER_DATA_REQUEST" =
  "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS: "GET_USER_DATA_SUCCESS" =
  "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILED: "GET_USER_DATA_FAILED" =
  "GET_USER_DATA_FAILED";

export const SET_USER_DATA_REQUEST: "SET_USER_DATA_REQUEST" =
  "SET_USER_DATA_REQUEST";
export const SET_USER_DATA_SUCCESS: "SET_USER_DATA_SUCCESS" =
  "SET_USER_DATA_SUCCESS";
export const SET_USER_DATA_FAILED: "SET_USER_DATA_FAILED" =
  "SET_USER_DATA_FAILED";

export const LOG_OUT_REQUEST: "LOG_OUT_REQUEST" = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS: "LOG_OUT_SUCCESS" = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED: "LOG_OUT_FAILED" = "LOG_OUT_FAILED";

export interface IUnsetUserErrorAction {
  readonly type: typeof UNSET_USER_ERROR;
}
export const unsetUserError = (): IUnsetUserErrorAction => ({
  type: UNSET_USER_ERROR,
});

export interface IResetPasswordRequestAction {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}
export const resetPasswordRequest = (): IResetPasswordRequestAction => ({
  type: PASSWORD_RESET_REQUEST,
});

export interface IResetPasswordSuccessAction {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}
export const resetPasswordSuccess = (): IResetPasswordSuccessAction => ({
  type: PASSWORD_RESET_SUCCESS,
});

export interface IResetPasswordFailedAction {
  readonly type: typeof PASSWORD_RESET_FAILED;
  readonly payload: any;
}
export const resetPasswordFailed = (err: any): IResetPasswordFailedAction => ({
  type: PASSWORD_RESET_FAILED,
  payload: err,
});

export interface IChangePasswordRequestAction {
  readonly type: typeof PASSWORD_CHANGE_REQUEST;
}
export const changePasswordRequest = (): IChangePasswordRequestAction => ({
  type: PASSWORD_CHANGE_REQUEST,
});

export interface IChangePasswordSuccessAction {
  readonly type: typeof PASSWORD_CHANGE_SUCCESS;
}
export const changePasswordSuccess = (): IChangePasswordSuccessAction => ({
  type: PASSWORD_CHANGE_SUCCESS,
});

export interface IChangePasswordFailedAction {
  readonly type: typeof PASSWORD_CHANGE_FAILED;
  readonly payload: any;
}
export const changePasswordFailed = (err: any): IChangePasswordFailedAction => ({
  type: PASSWORD_CHANGE_FAILED,
  payload: err,
});

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}
export const loginRequest = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: {
    name: string;
    email: string;
  };
}
export const loginSuccess = (
  name: string,
  email: string
): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { name, email },
});

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
  readonly payload: any;
}
export const loginFailed = (err: any): ILoginFailedAction => ({
  type: LOGIN_FAILED,
  payload: err,
});

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}
export const registerRequest = (): IRegisterRequestAction => ({
  type: REGISTER_REQUEST,
});

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
}
export const registerSuccess = (): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
});

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
  readonly payload: any;
}
export const registerFailed = (err: any): IRegisterFailedAction => ({
  type: REGISTER_FAILED,
  payload: err,
});

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_DATA_REQUEST;
}
export const getUserRequest = (): IGetUserRequestAction => ({
  type: GET_USER_DATA_REQUEST,
});

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly payload: {
    name: string;
    email: string;
  };
}
export const getUserSuccess = (
  name: string,
  email: string
): IGetUserSuccessAction => ({
  type: GET_USER_DATA_SUCCESS,
  payload: { name, email },
});

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_DATA_FAILED;
  readonly payload: any;
}
export const getUserFailed = (err: any): IGetUserFailedAction => ({
  type: GET_USER_DATA_FAILED,
  payload: err,
});

export interface ISetUserRequestAction {
  readonly type: typeof SET_USER_DATA_REQUEST;
}
export const setUserRequest = (): ISetUserRequestAction => ({
  type: SET_USER_DATA_REQUEST,
});

export interface ISetUserSuccessAction {
  readonly type: typeof SET_USER_DATA_SUCCESS;
  readonly payload: {
    name: string;
    email: string;
  };
}
export const setUserSuccess = (user: {
  name: string;
  email: string;
}): ISetUserSuccessAction => ({
  type: SET_USER_DATA_SUCCESS,
  payload: user,
});

export interface ISetUserFailedAction {
  readonly type: typeof SET_USER_DATA_FAILED;
  readonly payload: any;
}
export const setUserFailed = (err: any): ISetUserFailedAction => ({
  type: SET_USER_DATA_FAILED,
  payload: err,
});

export interface ILogOutRequestAction {
  readonly type: typeof LOG_OUT_REQUEST;
}
export const logOutRequest = (): ILogOutRequestAction => ({
  type: LOG_OUT_REQUEST,
});

export interface ILogOutSuccessAction {
  readonly type: typeof LOG_OUT_SUCCESS;
}
export const logOutSuccess = (): ILogOutSuccessAction => ({
  type: LOG_OUT_SUCCESS,
});

export interface ILogOutFailedAction {
  readonly type: typeof LOG_OUT_FAILED;
  readonly payload: any;
}
export const logOutFailed = (err: any): ILogOutFailedAction => ({
  type: LOG_OUT_FAILED,
  payload: err,
});

export type TUserActions =
  | IUnsetUserErrorAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IChangePasswordRequestAction
  | IChangePasswordSuccessAction
  | IChangePasswordFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | ISetUserRequestAction
  | ISetUserSuccessAction
  | ISetUserFailedAction
  | ILogOutRequestAction
  | ILogOutSuccessAction
  | ILogOutFailedAction;

export const getUserData: AppThunk = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const data = await getUser();
    const { email, name } = data.user;
    dispatch(getUserSuccess(name, email));
    console.log("getUserData");
  } catch (err) {
    dispatch(getUserFailed(err));
    console.log(err);
  }
};

export const setUserData: AppThunk =
  (setDisabledInputs, disabledInputs, setForm, form) => async (dispatch) => {
    dispatch(setUserRequest());
    try {
      const data = await setUser(form);
      dispatch(setUserSuccess(data.user));

      dispatch(getUserRequest());
      console.log("setUserData");
      try {
        const data = await getUser();
        const { name, email } = data.user;
        dispatch(getUserSuccess(name, email));
        console.log("getUserData");
        setDisabledInputs({
          ...disabledInputs,
          name: { isDisabled: true, icon: "EditIcon" },
          email: { isDisabled: true, icon: "EditIcon" },
          password: { isDisabled: true, icon: "EditIcon" },
        });
        setForm({
          ...form,
          name: name,
          email: email,
          password: "",
        });
      } catch (err) {
        dispatch(getUserFailed(err));
        console.log(err);
      }
    } catch (err) {
      dispatch(setUserFailed(err));
      console.log(err);
    }
  };

export const logUserOut: AppThunk =
  (navigate) => async (dispatch: AppDispatch) => {
    dispatch(logOutRequest());
    try {
      await logOut();
      dispatch(logOutSuccess());
      console.log("logUserOut");
      navigate("/login");
    } catch (err) {
      dispatch(logOutFailed(err));
      console.log(err);
    }
  };

export const sendResetToken: AppThunk =
  (email, navigate) => async (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequest());
    try {
      await sendPasswordResetEmail(email);
      dispatch(resetPasswordSuccess());
      console.log("sendResetToken");
      navigate("/reset-password");
    } catch (err) {
      dispatch(resetPasswordFailed(err));
      console.error(err);
    }
  };

export const changePasswordWithToken: AppThunk =
  (form, navigate) => async (dispatch: AppDispatch) => {
    dispatch(changePasswordRequest());
    try {
      await confirmPasswordReset(form);
      dispatch(changePasswordSuccess());
      console.log("changePasswordWithToken");
      navigate("/login");
    } catch (err) {
      dispatch(changePasswordFailed(err));
      console.error(err);
    }
  };

export const logInUser: AppThunk = (form) => async (dispatch: AppDispatch) => {
  dispatch(loginRequest());
  try {
    const data = await logIn(form);
    const { name, email } = data.user;
    console.log("logInUser");
    dispatch(loginSuccess(name, email));
  } catch (err) {
    dispatch(loginFailed(err));
    console.error(err);
  }
};

export const registerUser: AppThunk =
  (form, navigate) => async (dispatch: AppDispatch) => {
    dispatch(registerRequest());
    try {
      await register(form);
      dispatch(registerSuccess());
      console.log("registerUser");
      navigate("/login");
    } catch (err) {
      dispatch(registerFailed(err));
      console.error(err);
    }
  };
