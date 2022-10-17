import {
  GET_USERS,
  GET_USER,
  DELETE_USER,
  TOGGLE_ACTIVITY,
  GET_USERSDATES,
  SIGNUP_NEW_USER,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD

} from "../constants";

let initialState = {
  data: [],
  success: false,
  messages: ''
};

const usersReducer = (state = initialState, action) => {
  const { success, messages, data, userId = null } = action?.payload || {};
  switch (action.type) {
    
    case GET_USERS:
      return {
        ...state,
        data: [
          ...data
        ],
        success: true,
        messages
      };

    case GET_USER:
      return {
        ...state,
        data: data
        ,
        success: true,
        messages
      };

    case GET_USERSDATES:
      console.log("in GET_USERSDATES: success, messages, data: ", success, messages, data)
      return {
        ...state,
        dates: [
          ...data
        ],
        success: true,
        messages
      };

    case TOGGLE_ACTIVITY:
      console.log("in TOGGLE_ACTIVITY: success, messages, data: ", success, messages, data)
      return {
        ...state,
        success,
        messages
      };

    case DELETE_USER:
      return {
        ...state,
        data: [
          ...data
        ],
        messages
      };

    case SIGNUP_NEW_USER:
      return {
        success: action?.payload?.success,
        messages: action?.payload?.messages,
        isAuthenticated: false,
      };

    case UPDATE_USER_PROFILE:
      // ...state
      return {
        success: action?.payload?.success,
        data: [
          ...state.data,
          action?.payload?.data
        ]
      };

    case UPDATE_USER_PASSWORD:
      // ...state
      return {
        success: action?.payload?.success,
        data: [
          ...state.data,
          action?.payload?.data
        ]
      };

    default:
      return state;
  }
};

export default usersReducer;
