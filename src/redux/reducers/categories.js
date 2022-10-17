import { useDispatch, useSelector } from "react-redux";
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
} from "../constants";


let initialState = {
  data: [],
  success: false,
  messages: ''
};

const categoriesReducer = (state = initialState, action) => {
  const { success, messages, data, categoryId = null } = action?.payload || {};
  switch (action.type) {
    case GET_CATEGORIES:
      console.log("in GET_CATEGORIES: success, messages, data: ", success, messages, data)
      return {
        ...state,
        data: [
          ...data
        ],
        success: true,
        messages
      };
    case ADD_CATEGORY:
      console.log("data: ",data)
      const tempData = [...state.data, data]
      return {
        ...state,
        data: tempData,
        success,
        messages
      }
  case DELETE_CATEGORY:

    return {
      ...state,
      data: [
        ...data
      ],

      messages
    }
  default:
    return state;
}
};

export default categoriesReducer;
