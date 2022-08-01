import {
  confirmPasswordReset,
  getUser,
  logIn,
  logOut,
  register,
  sendPasswordResetEmail,
  setUser,
} from "../useAuth";

export const UNSET_USER_ERROR = "UNSET_USER_ERROR";

export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED";

export const PASSWORD_CHANGE_REQUEST = "PASSWORD_CHANGE_REQUEST";
export const PASSWORD_CHANGE_SUCCESS = "PASSWORD_CHANGE_SUCCESS";
export const PASSWORD_CHANGE_FAILED = "PASSWORD_CHANGE_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED";

export const SET_USER_DATA_REQUEST = "SET_USER_DATA_REQUEST";
export const SET_USER_DATA_SUCCESS = "SET_USER_DATA_SUCCESS";
export const SET_USER_DATA_FAILED = "SET_USER_DATA_FAILED";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED = "LOG_OUT_FAILED";

export const unsetUserError = () => ({
  type: UNSET_USER_ERROR,
});

export const resetPasswordRequest = () => ({
  type: PASSWORD_RESET_REQUEST,
});

export const resetPasswordSuccess = () => ({
  type: PASSWORD_RESET_SUCCESS,
});

export const resetPasswordFailed = (err) => ({
  type: PASSWORD_RESET_FAILED,
  payload: err,
});

export const changePasswordRequest = () => ({
  type: PASSWORD_CHANGE_REQUEST,
});

export const changePasswordSuccess = () => ({
  type: PASSWORD_CHANGE_SUCCESS,
});

export const changePasswordFailed = (err) => ({
  type: PASSWORD_CHANGE_FAILED,
  payload: err,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (name, email) => ({
  type: LOGIN_SUCCESS,
  payload: { name, email },
});

export const loginFailed = (err) => ({
  type: LOGIN_FAILED,
  payload: err,
});

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (name, email) => ({
  type: REGISTER_SUCCESS,
  payload: { name, email },
});

export const registerFailed = (err) => ({
  type: REGISTER_FAILED,
  payload: err,
});

export const getUserRequest = () => ({
  type: GET_USER_DATA_REQUEST,
});

export const getUserSuccess = (name, email) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: { name, email },
});

export const getUserFailed = (err) => ({
  type: GET_USER_DATA_FAILED,
  payload: err,
});

export const setUserRequest = () => ({
  type: SET_USER_DATA_REQUEST,
});

export const setUserSuccess = (user) => ({
  type: SET_USER_DATA_SUCCESS,
  payload: user,
});

export const setUserFailed = (err) => ({
  type: SET_USER_DATA_FAILED,
  payload: err,
});

export const logOutRequest = () => ({
  type: LOG_OUT_REQUEST,
});

export const logOutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
});

export const logOutFailed = (err) => ({
  type: LOG_OUT_FAILED,
  payload: err,
});

export const getUserData = () => async (dispatch) => {
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

export const setUserData =
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

export const logUserOut = (navigate) => async (dispatch) => {
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

export const sendResetToken = (email, navigate) => async (dispatch) => {
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

export const changePasswordWithToken = (form, navigate) => async (dispatch) => {
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

export const logInUser = (form) => async (dispatch) => {
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

export const registerUser = (form, navigate) => async (dispatch) => {
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
