import {
    GET_REPORTS,
    ADD_REPORT,
    DELETE_REPORT,
} from "../constants";
import API_URLS from "../../api";
import { requestApi } from "../../helpers/index.js";


export const getReportsAction = (reportData) => async (dispatch) => {
    let data = {
        url: API_URLS().REPORTS.GET_REPORTS,
    };
    console.log(data);
    await requestApi(data)
        .then((res) => {
            dispatch({ type: GET_REPORTS, payload: res?.data });
            return res?.data

        })
};

export const deleteReportsAction = (reportData) => async (dispatch) => {
    let data = {
        url: API_URLS(reportData).REPORTS.DELETE_REPORT,
        method: "DELETE",
    };
    await requestApi(data)
        .then((res) => {
            dispatch({ type: DELETE_REPORT, payload: res.data });
            return res?.data
        })
};

export const reportItemAction = (reportData) => async (dispatch) => {
    let data = {
        url: API_URLS().REPORTS.ADD_REPORT,
        method: "POST",
        body: {
           ... reportData
        },
        
    };console.log("data from add report action",reportData)
    await requestApi(data)
        .then((res) => {
            dispatch({
                type: ADD_REPORT, payload: res?.data

                   
            });
        })
};