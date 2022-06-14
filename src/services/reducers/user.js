import {
  UNSET_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
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
    case PASSWORD_CHANGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PASSWORD_CHANGE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
      };
    }
    case PASSWORD_CHANGE_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    }
    case UNSET_ERROR: {
      return {
        ...state,
        isError: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
