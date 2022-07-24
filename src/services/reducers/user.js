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
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
  SET_USER_DATA_REQUEST,
  SET_USER_DATA_SUCCESS,
  SET_USER_DATA_FAILED,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  SET_EMAIL,
  SET_NAME,
} from "../actions/user";

const initialState = {
  isError: false,
  isResetTokenSent: false,
  error: null,
  isLoading: false,
  name: null,
  email: null,
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
        isResetTokenSent: true,
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
        name: action.payload.name,
        email: action.payload.email,
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
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        email: action.payload.email,
        name: action.payload.name,
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    }
    case SET_USER_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SET_USER_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        ...action.payload,
      };
    }
    case SET_USER_DATA_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOG_OUT_SUCCESS: {
      console.log('logged out')
      return {
        ...state,
        isLoading: false,
        isError: false,
        email: null,
        name: null,
        isResetTokenSent: false,
        error: null,
      };
    }
    case LOG_OUT_FAILED: {
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
    case SET_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
