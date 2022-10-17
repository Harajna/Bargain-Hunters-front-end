import { TOGGLE_NOTIFICATION, TOGGLE_NOTIFICATION_OFF } from "../constants";

const initialState = {
  message: "",
  open: false,
  variant: null,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION:
      return {
        ...state,
        message: action.payload?.messages,
        variant: action.payload?.success ? "success" : "error",
        open: true,
      };
    case TOGGLE_NOTIFICATION_OFF:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default notificationsReducer;
