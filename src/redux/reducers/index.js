import { combineReducers } from "redux";
import notificationsReducer from "./notifications";
import usersReducer from "./users";
import authReducer from "./auth";
import adminsReducer from "./admins";
import categoriesReducer from "./categories";
import reportsReducer from "./reports";
import itemsReducer from "./items";


const reducers = combineReducers({
  auth: authReducer,
  notification: notificationsReducer,
  users: usersReducer,
  admins: adminsReducer,
  categories: categoriesReducer,
  reports: reportsReducer,
  items: itemsReducer


});

export default reducers;
