import {
    FETCH_TOKEN,
    FETCH_TOKEN_FAILED,
    TOKEN_REMOVE
} from "../constants";
import API_URLS from "../../api";
import { requestApi } from "../../helpers/index.js";


export const signinAction = (userData) => async (dispatch) => {
    let data = {
        url: API_URLS().AUTH.SIGNIN,
        method: "POST",
        body: {
            ...userData,
        },
    };
    await requestApi(data)
        .then((res) => {
            dispatch({ type: FETCH_TOKEN, payload: res?.data });
        })
        .catch((e) => {
            console.error(e);
            dispatch({ type: FETCH_TOKEN_FAILED });
        });
};

export const logoutAction = () => async (dispatch) => {
    let data = {
        url: API_URLS().AUTH.LOGOUT,
        method: "POST",
    };
    await requestApi(data).then(() => dispatch({ type: TOKEN_REMOVE }))
};