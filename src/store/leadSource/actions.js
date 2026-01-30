import api from "../api.js";
export const LEAD_SOURCE_ACTIVE_LIST = ({
  commit
}, request) => {
  return api.get("manage/data/leadsource/", request).then(response => {
    commit("SET_LEAD_SOURCE_ACTIVE_LIST", response.data.data);
  });
};
export const LEAD_SOURCE_DEACTIVED_LIST = ({
  commit
}, request) => {
  return api.get("manage/data/leadsource/0", request).then(response => {
    commit("SET_LEAD_SOURCE_DEACTIVED_LIST", response.data.data);
  });
};
export const ADD_NEW_LEAD_SOURCE = ({
  commit
}, request) => {
  return api.post("manage/data/leadsource", request);
};
export const UPDATE_LEAD_SOURCE = ({
  commit
}, request) => {
  return api.put("manage/data/leadsource/" + request.id, request);
};
export const UPDATE_LEAD_SOURCE_AND_SET_ACTIVE = ({
  commit
}, request) => {
  return api.put("manage/data/leadsource/" + request.id + "/1", request);
};
export const DELETE_LEAD_SOURCE_AND_SET_ACTIVE = ({
  commit
}, request) => {
  return api.delete("manage/data/leadsource/" + request);
};
