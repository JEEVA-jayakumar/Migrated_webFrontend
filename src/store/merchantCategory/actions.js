import api from "../api.js";
export const MERCHANT_CATEGORY_LIST = ({ commit }, request) => {
  return api.get("manage/data/merchant-category").then(response => {
    commit("SET_MERCHANT_CATEGORY_LIST", response.data.data);
  });
};
export const MERCHANT_CATEGORY_ACTIVE_LIST = ({ commit }, request) => {
  return api.get("manage/data/merchant-category/", request).then(response => {
    commit("SET_MERCHANT_CATEGORY_ACTIVE_LIST", response.data.data);
  });
};
export const MERCHANT_CATEGORY_DEACTIVED_LIST = ({ commit }, request) => {
  return api.get("manage/data/merchant-category/0", request).then(response => {
    commit("SET_MERCHANT_CATEGORY_DEACTIVED_LIST", response.data.data);
  });
};
export const ADD_NEW_MERCHANT_CATEGORY = ({ commit }, request) => {
  return api.post("manage/data/merchant-category/", request);
};
export const UPDATE_MERCHANT_CATEGORY = ({ commit }, request) => {
  return api.put("manage/data/merchant-category/" + request.id, request);
};
export const UPDATE_MERCHANT_CATEGORY_AND_SET_ACTIVE = (
  { commit },
  request
) => {
  return api.put("manage/data/merchant-category/" + request.id + "/1", request);
};
export const DELETE_MERCHANT_CATEGORY_AND_SET_ACTIVE = (
  { commit },
  request
) => {
  return api.delete("manage/data/merchant-category/" + request);
};
