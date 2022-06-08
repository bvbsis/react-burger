import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
} from "../actions/user";

const initialState = {
  isError: false,
  error: null,
  isLoading: false,
  name: null,
  email: null,
  password: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
      };
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
