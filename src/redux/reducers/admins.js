import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_ROLE,
  DELETE_ADMIN,
  GET_ADMINS,
  CREATE_ADMIN,
  SIGNUP_NEW_USER,
  DELETE_USER
} from "../constants";


let initialState = {
  data: [],
  success: false,
  messages: ''
};

const adminsReducer = (state = initialState, action) => {
  const { success, messages, data, adminId = null } = action?.payload || {};
  switch (action.type) {
    case GET_ADMINS:
      console.log("in GET_ADMINS: success, messages, data: ", success, messages, data)
      return {
        ...state,
        data: [
          ...data
        ],
        success: true,
        messages
      };
    case CREATE_ADMIN:
      console.log("data: ",data)
      const tempData = [...state.data, data]
      return {
        ...state,
        data: tempData,
        success,
        messages
      }
    case DELETE_ADMIN:
      const temp = [...state.data]
      const index = temp.findIndex(admin => admin.id == adminId)
      index && temp.splice(index, 1)
      return {
        ...state,
        data: temp,
        success,
        messages
      }
    default:
      return state;
  }
};

export default adminsReducer;
