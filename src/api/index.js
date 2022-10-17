const API_ROOT = process.env.REACT_APP_API_URL;
console.log("API_URL = ", API_ROOT);

const API_URLS = (extraData) => ({
  // the extraData can be used to send url params and request query data if needed to api.
  ROOT: API_ROOT,
  AUTH: {
    SIGNIN: API_ROOT + "/users/login/",
    LOGOUT: API_ROOT + "/users/logout/",
    SIGNUP: API_ROOT + "/users/signup/",

  },
  
  USERS: {
    GET_USERS: API_ROOT + "/users/admin/users",
    GET_USERSDATES: API_ROOT + "/users/admin/users", 
    GET_USER: API_ROOT + "/users/profile/" + extraData,
    CHANGE_ROLE: API_ROOT + "/users/role/" + extraData,
    DELETE_USER: API_ROOT + "/users/blockuser/",
    UPDATE_USER_PROFILE: API_ROOT + "/users/profile/updatefb",
    UPDATE_USER_PASSWORD: API_ROOT + "/users/profile/changepassword",
  },


  CATEGORIES: {
    GET_CATEGORIES: API_ROOT + "/items/categories/",
    ADD_CATEGORY: API_ROOT + "/items/addcategory/",
    DELETE_CATEGORY: API_ROOT + "/items/categories/" + extraData,
  },
  ITEMS: {
    GET_ITEMS: API_ROOT + "/items/",
    GET_ITEM: API_ROOT + "/items/item/" + extraData,
    GET_ITEMS_BY_USERID: API_ROOT + "/items/item/user/"+ extraData,
    GET_ITEMS_BY_CATEGORYID: API_ROOT + "/items/item/category/" + extraData,
    ADD_ITEM: API_ROOT + "/items/additem",
    DELETE_ITEMS: API_ROOT + "/items/item/admin/" + extraData,
    DELETE_ITEMS_BYUSER: API_ROOT + "/items/item/" + extraData,

  },

  PICTURES: {
    ADD_PICTURE: API_ROOT + "/picture/add2",
  },


  REPORTS: {
    GET_REPORTS: API_ROOT + "/report/reporteditems/",
    DELETE_REPORT: API_ROOT + "/report/delete/" + extraData,
    ADD_REPORT: API_ROOT + "/report/reportitem/",

  },

});

export default API_URLS;
