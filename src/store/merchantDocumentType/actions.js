import api from "../api.js";

export const MERCHANT_DOCUMENT_TYPE_ACTIVE_LIST = ({ commit }, request) => {
  return api
    .get(
      "manage/data/merchant-document-types/?merchantTypeId=" +
        request.merchantTypeId +
        "&parentId=" +
        request.parentId,
      request
    )
    .then(response => {
      commit("SET_MERCHANT_DOCUMENT_TYPE_ACTIVE_LIST", response.data.data);
    });
};
export const MERCHANT_DOCUMENT_TYPE_DEACTIVED_LIST = ({ commit }, request) => {
  return api
    .get(
      "manage/data/merchant-document-types/0?merchantTypeId=" +
        request.merchantTypeId +
        "&parentId=" +
        request.parentId,
      request
    )
    .then(response => {
      commit("SET_MERCHANT_DOCUMENT_TYPE_DEACTIVED_LIST", response.data.data);
    });
};
export const ADD_NEW_MERCHANT_DOCUMENT_TYPE = ({ commit }, request) => {
  return api.post(
    "manage/data/merchant-document-types/?merchantTypeId=" +
      request.url.merchantType +
      "&hasSubDoc=" +
      request.url.hasSubDoc,
    request.params
  );
};
export const UPDATE_MERCHANT_DOCUMENT_TYPE = ({ commit }, request) => {
  return api.put(
    "manage/data/merchant-document-types/" +
      request.url.id +
      "?merchantTypeId=" +
      request.url.merchantType +
      "&parentId=" +
      request.params.parentId +
      "&hasSubDoc=" +
      request.url.hasSubDoc,
    request.params
  );
};
//1 => value to enable
export const UPDATE_MERCHANT_DOCUMENT_TYPE_AND_SET_ACTIVE = (
  { commit },
  request
) => {
  return api.put(
    "manage/data/merchant-document-types/" +
      request.id +
      "/1?merchantTypeId=" +
      request.merchantType +
      "&parentId=" +
      request.parentId +
      "&hasSubDoc=" +
      request.hasSubDoc,
    request.params
  );
};
export const DELETE_MERCHANT_DOCUMENT_TYPE_AND_SET_ACTIVE = (
  { commit },
  request
) => {
  return api.delete("manage/data/merchant-document-types/" + request);
};
