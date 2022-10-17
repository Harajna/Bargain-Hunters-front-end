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
import API_URLS from "../../api";
import { requestApi } from "../../helpers/index.js";

export const getItemsAction = (itemData) => async (dispatch) => {
  let data = {
    url: API_URLS().ITEMS.GET_ITEMS,
  };
  console.log(data);
  await requestApi(data)
    .then((res) => {
      dispatch({ type: GET_ITEMS, payload: res?.data });
      return res?.data
    })
};

export const getItemAction = (id) => async (dispatch) => {
  let data = {
    url: API_URLS(id).ITEMS.GET_ITEM,
  };
  await requestApi(data)
    .then((res) => {
      dispatch({ type: GET_ITEM, payload: res?.data });
      return res?.data

    })
};

//GET_ITEMS_BY_USERID
export const getItemByUserIdAction = (userId) => async (dispatch) => {
  let data = {
    url: API_URLS(userId).ITEMS.GET_ITEMS_BY_USERID,
  };
  console.log("dataofitems", data);
  await requestApi(data)
    .then((res) => {
      dispatch({ type: GET_ITEMS_BY_USERID, payload: res?.data });
      return res?.data

    })
};
//GET_ITEMS_BY_CATEGORYID
export const getItemByCategoryIdAction = (categoryId) => async (dispatch) => {
  let data = {
    url: API_URLS(categoryId).ITEMS.GET_ITEMS_BY_CATEGORYID,
  };
  console.log("dataofitems", data);
  await requestApi(data)
    .then((res) => {
      dispatch({ type: GET_ITEMS_BY_CATEGORYID, payload: res?.data });
      return res?.data

    })
};

export const deleteItemsAction = (itemData) => async (dispatch) => {
  let data = {
    url: API_URLS(itemData).ITEMS.DELETE_ITEMS,
    method: "DELETE",
    // body: {
    //     ...itemData,
    // },
  };
  await requestApi(data)
    .then((res) => {
      dispatch({ type: DELETE_ITEMS, payload: res?.data });
    })
};

export const deleteItemsByUserAction = (itemData) => async (dispatch) => {
  let data = {
    url: API_URLS(itemData).ITEMS.DELETE_ITEMS_BYUSER,
    method: "DELETE",
    // body: {
    //     ...itemData,
    // },
  };
  await requestApi(data)
    .then((res) => {
      dispatch({ type: DELETE_ITEMS_BYUSER, payload: res?.data });
    })
};


export const addItemAction = (itemData) => {
  return async (dispatch) => {
    let data = {
      url: API_URLS().ITEMS.ADD_ITEM,
      method: "POST",
      body: {
        ...itemData,
      },
    };
    console.log("dataofitem", data)
    await requestApi(data)
      .then((res) => {
        dispatch({ type: ADD_ITEM, payload: res?.data });
      })
  };
};

export const addPictureAction = (itemPctureData) => {
  return async (dispatch) => {
    let data = {
      url: API_URLS().PICTURES.ADD_PICTURE,
      method: "POST",
      contentType: "multipart/form-data",
      body: itemPctureData

    };
    await requestApi(data)
      .then((res) => {
        dispatch({ type: ADD_PICTURE, payload: res?.data });
      })
  };
};
