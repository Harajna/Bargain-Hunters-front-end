import {
  TOGGLE_ACTIVITY,
  GET_USERS,
  GET_USERSDATES,
  GET_USER,
  DELETE_USER,
  SIGNUP_NEW_USER,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,

} from "../constants";
import API_URLS from "../../api";
import { requestApi } from "../../helpers/index.js";



export const signupAction = (userData) => {
  return async (dispatch) => {
    let data = {
      url: API_URLS().AUTH.SIGNUP,
      method: "POST",
      body: {
        ...userData,
      },
    };
    await requestApi(data);
    dispatch({ type: SIGNUP_NEW_USER });
  };
};

export const getUsersAction = () => async (dispatch) => {
  let data = {
    url: API_URLS().USERS.GET_USERS,
  };
  await requestApi(data).then((res) => {
    dispatch({ type: GET_USERS, payload: res?.data });
    return res?.data
  })
};

export const getUsersDatesAction = () => async (dispatch) => {
  let data = {
    url: API_URLS().USERS.GET_USERSDATES,
  };
  await requestApi(data).then((res) => {
    dispatch({ type: GET_USERSDATES, payload: res?.data });
    return res?.data
  })
};

export const getUserAction = (id) => async (dispatch) => {

  let data = {
    url: API_URLS(id).USERS.GET_USER,
  };
  await requestApi(data).then((res) => {
    dispatch({ type: GET_USER, payload: res?.data });
    return res?.data
  })
};

export const updateProfileAction = (profileData) => {
  return async (dispatch) => {
    let data = {
      url: API_URLS().USERS.UPDATE_USER_PROFILE,
      method: "PUT",
      contentType: "multipart/form-data",
      body: profileData,
  
    };
    console.log("dataofProfile", data)
    await requestApi(data)
    .then((res) => {
    dispatch({ type: UPDATE_USER_PROFILE , payload: res?.data  });
    })
  };
};


export const updatePasswordAction = (passwordData) => {
  return async (dispatch) => {
    let data = {
      url: API_URLS().USERS.UPDATE_USER_PASSWORD,
      method: "PUT",
      body: passwordData,
  
    };
    console.log("dataofPassword", data)
    await requestApi(data)
    .then((res) => {
    dispatch({ type: UPDATE_USER_PASSWORD , payload: res?.data  });
    })
  };
};



export const toggleActivityAction = (userData) => async (dispatch) => {
  let data = {
    url: API_URLS(userData?.id).USERS.TOGGLE_ACTIVITY,
    method: "PATCH",
    body: {
      ...userData,
    },
  };
  await requestApi(data)
    .then((res) => {
      dispatch({ type: TOGGLE_ACTIVITY, payload: res?.data });
    })
};


export const deleteUserAction = (userData) => async (dispatch) => {
  let data = {
    url: API_URLS().USERS.DELETE_USER,
    method: "PUT",
    body: {
      userId: userData,
    },
  };
  await requestApi(data)
    .then((res) => {
      dispatch({ type: DELETE_USER, payload: res?.data});
    })
};


export const changeRoleAction = (userData) => async (dispatch) => {
  console.log("IN CHANGE ROLE ACTION, USERDATA: ", userData)
  let data = {
      url: API_URLS(userData.user.id).USERS.CHANGE_ROLE,
      method: "PUT",
      body: {
          role: userData.role
      },
  };
  await requestApi(data)
      .then((res) => {
          if (userData.role == "user")
              dispatch({ type: DELETE_USER, payload: { adminId: userData.user.id } });
          else {
              dispatch({ type: DELETE_USER, payload: { userId: userData.user.id } });
          }
      })
      .catch(e => {
          console.log("CHANGE ROLE ERROR: ", e)
      })
};