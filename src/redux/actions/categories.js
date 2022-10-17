import {

    GET_CATEGORIES,
    ADD_CATEGORY,
    DELETE_CATEGORY,

    // GET_ADMINS,
    // CREATE_ADMIN,
    // DELETE_ADMIN,
    // DELETE_USER
} from "../constants";
import API_URLS from "../../api";
import { requestApi } from "../../helpers/index.js";


export const getCategoriesAction = (categoryData) => async (dispatch) => {
    let data = {
        url: API_URLS().CATEGORIES.GET_CATEGORIES,
    };
    console.log(data);
    await requestApi(data)
        .then((res) => {
            dispatch({ type: GET_CATEGORIES, payload: res?.data });
            return res?.data

        })
};

// export const deleteCategoriesAction = (categoryData) => async (dispatch) => {
//     let data = {
//         url: API_URLS(categoryData.id).CATEGORIES.DELETE_CATEGORY,
//         method: "DELETE",
//         body: {
//             ...categoryData,
//         },
//     };
//     console.log("00000000", categoryData)
//     await requestApi(data)
//         .then((res) => {
//             dispatch({ type: DELETE_CATEGORY, payload: { categoryId: categoryData.id } });
//         })
// };
export const deleteCategoriesAction = (categoryData) => async (dispatch) => {
    let data = {
        url: API_URLS(categoryData).CATEGORIES.DELETE_CATEGORY,
        method: "DELETE",
    };
    await requestApi(data)
        .then((res) => {
            dispatch({ type: DELETE_CATEGORY, payload: res.data });
        })
};


// export const changeRoleAction = (categoryData) => async (dispatch) => {
//     console.log("IN CHANGE ROLE ACTION, categoryData: ", categoryData)
//     let data = {
//         url: API_URLS(categoryData.user.id).ADMINS.CHANGE_ROLE,
//         method: "PATCH",
//         body: {
//             role: categoryData.role
//         },
//     };
//     await requestApi(data)
//         .then((res) => {
//             if (categoryData.role == "user")
//                 dispatch({ type: DELETE_ADMIN, payload: { adminId: categoryData.user.id } });
//             else {
//                 dispatch({ type: DELETE_USER, payload: { userId: categoryData.user.id } });
//             }
//         })
//         .catch(e => {
//             console.log("CHANGE ROLE ERROR: ", e)
//         })
// };

export const addCategoryAction = (categoryData) => async (dispatch) => {
    let data = {
        url: API_URLS().CATEGORIES.ADD_CATEGORY,
        method: "POST",
        body: {
           ... categoryData
        },
    };
    await requestApi(data)
        .then((res) => {
            dispatch({
                type: ADD_CATEGORY, payload: res?.data
                    // {...res?.data, username: categoryData.username, email: categoryData.email, roleId: 2, isActive: true}
                   
            });
        })
};