
import {
  GET_REPORTS,
  ADD_REPORT,
  DELETE_REPORT,
} from "../constants";


let initialState = {
  data: [],
  success: false,
  messages: ''
};

const reportsReducer = (state = initialState, action) => {
  const { success, messages, data, reportId = null } = action?.payload || {};
  switch (action.type) {

    case GET_REPORTS:
      console.log("in GET_REPORTS: success, messages, data: ", success, messages, data)
      return {
        ...state,
        data: [
          ...data
        ],
        success: true,
        messages
      };

      case ADD_REPORT:
        console.log("data: ",data)
        return {
          ...state,
          success,
          messages
        }
        
    case DELETE_REPORT:
      return {
        ...state,
        data:[
          ...data
        ],
        messages
      }
    default:
      return state;
  }
};

export default reportsReducer;
