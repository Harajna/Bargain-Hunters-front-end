import {
    FETCH_TOKEN,
    FETCH_TOKEN_FAILED,
    TOKEN_REMOVE,
  } from "../constants";
  
  let initialState = {
    success: false,
    data: {
      token: window.localStorage.getItem("token") || null,
      user: JSON.parse(window.localStorage.getItem("user") || null ) || null
    },
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    const { success, messages, data } = action?.payload || {};
    switch (action.type) {
      case FETCH_TOKEN:
        window.localStorage.setItem("token", data?.token);
        window.localStorage.setItem("user", JSON.stringify(data?.user));
        return {
          success,
          messages,
          data,
          isAuthenticated: true,
        };
      case FETCH_TOKEN_FAILED:
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        return {
          ...state,
          data: {
            user: null,
            token: null
          },
          success: false,
          isAuthenticated: false,
        };
      case TOKEN_REMOVE:
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        return {
          ...state,
          data: {
            token: null,
            user: null,
          },
          success: true,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  