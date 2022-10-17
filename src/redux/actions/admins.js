import {
    GET_ADMINS,
    CREATE_ADMIN,
    DELETE_ADMIN,
    DELETE_USER
} from "../constants";
import API_URLS from "../../api";
import { requestApi } from "../../helpers/index.js";


export const getAdminsAction = (userData) => async (dispatch) => {
    let data = {
        url: API_URLS().ADMINS.GET_ADMINS
    };
    await requestApi(data)
        .then((res) => {
            dispatch({ type: GET_ADMINS, payload: res?.data });
        })
};

export const deleteAdminAction = (userData) => async (dispatch) => {
    let data = {
        url: API_URLS(userData.id).ADMINS.DELETE_ADMIN,
        method: "DELETE",
        body: {
            ...userData,
        },
    };
    await requestApi(data)
        .then((res) => {
            dispatch({ type: DELETE_ADMIN, payload: { adminId: userData.id } });
        })
};

export const changeRoleAction = (userData) => async (dispatch) => {
    console.log("IN CHANGE ROLE ACTION, USERDATA: ", userData)
    let data = {
        url: API_URLS(userData.user.id).ADMINS.CHANGE_ROLE,
        method: "PATCH",
        body: {
            role: userData.role
        },
    };
    await requestApi(data)
        .then((res) => {
            if (userData.role == "user")
                dispatch({ type: DELETE_ADMIN, payload: { adminId: userData.user.id } });
            else {
                dispatch({ type: DELETE_USER, payload: { userId: userData.user.id } });
            }
        })
        .catch(e => {
            console.log("CHANGE ROLE ERROR: ", e)
        })
};

export const createAdminAction = (userData) => async (dispatch) => {
    let data = {
        url: API_URLS().ADMINS.CREATE_ADMIN,
        method: "POST",
        body: {
            ...userData,
        },
    };
    await requestApi(data)
        .then((res) => {
            dispatch({
                type: CREATE_ADMIN, payload:
                    // {...res?.data, username: userData.username, email: userData.email, roleId: 2, isActive: true}
                    res?.data
            });
        })
};