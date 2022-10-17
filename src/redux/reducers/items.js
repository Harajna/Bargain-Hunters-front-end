import { Identity } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import {

  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEMS,
  DELETE_ITEMS_BYUSER,
  GET_ITEMS_BY_USERID,
  GET_ITEMS_BY_CATEGORYID,
  ADD_PICTURE


} from "../constants";


let initialState = {
  data: [],
  success: false,
  messages: ''
};

const itemsReducer = (state = initialState, action) => {
  const { success, messages, data, id  } = action?.payload || {};
  switch (action.type) {
    case GET_ITEMS:
      console.log("in GET_ITEMS: success, messages, data: ", success, messages, data)
      return {
        ...state,
        data: [
          ...data
        ],
        success: true,
        messages
      };
      case GET_ITEM:
        console.log("in GET_ITEM: success, messages, data: ", success, messages, data)
        //const tempIndex = state.data.map(user => user.userId == data.id)
        const tempIndex = state.data.map(item => item.id == data.id)
        let tempArray = [...state.data];
        if (tempIndex == -1) {
          tempArray.push(data)
        }
        return {
          ...state,
          data: tempArray,
          success: true,
          messages
        };
        case GET_ITEMS_BY_USERID:
          return {
            ...state,
            // data: tempArray1,
            data:[
              action.payload.data
            ],
            success: true,
            messages
          };
          case GET_ITEMS_BY_CATEGORYID:
            console.log("action paylod",action.payload.data)
            return {
              ...state,
              // data: tempArray1,
              data:[
                ...action.payload.data
              ],
              success: true,
              messages
            };

            
      case ADD_ITEM:
        
        return {
          success: action?.payload?.success,
          messages: action?.payload?.messages,
          isAuthenticated: false,
          data: [
            ...state.data, 
            action?.payload?.data
          ]
        };

        case ADD_PICTURE:
          return {
            ...state
          };
          

case "DELETE_ITEMS":
  //let id = action.payload
  //console.log(id, "removed id ")
      const temp = [state]

  const newArray = state.data.filter(item => item.id != id);
  console.log(newArray, "1111111")
  console.log(temp, "1111111state")

  return {
    ...state,
    data: [
      ...data
    ],
     // newArray,
      messages
  }

  case "DELETE_ITEMS_BYUSER":
  //let id = action.payload
  //console.log(id, "removed id ")

  return {
    ...state,
    data: [
      ...data
    ],
     // newArray,
      messages
  }
  

    default:
      return state;
  }
};

export default itemsReducer;
