import api from "../api.js";
export const PLAN_LIST = ({
  commit
}, request) => {
  return api.get("manage/data/plan").then(response => {
    commit("SET_PLAN_LIST", response.data.data);
  });
};
export const PLAN_ACTIVE_LIST = ({
  commit
}, request) => {
  return api.get("manage/data/plan/", request).then(response => {
    commit("SET_PLAN_ACTIVE_LIST", response.data.data);
  });
};
export const PLAN_DEACTIVED_LIST = ({
  commit
}, request) => {
  return api.get("manage/data/plan/0", request).then(response => {
    commit("SET_PLAN_DEACTIVED_LIST", response.data.data);
  });
};
export const ADD_NEW_PLAN = ({
  commit
}, request) => {
  return api.post("manage/data/plan", request);
};
export const UPDATE_PLAN = ({
  commit
}, request) => {
  return api.put("manage/data/plan/" + request.id, request);
};
export const UPDATE_PLAN_AND_SET_ACTIVE = ({
  commit
}, request) => {
  return api.put("manage/data/plan/" + request.id + "/1", request);
};
export const DELETE_PLAN_AND_SET_ACTIVE = ({
  commit
}, request) => {
  return api.delete("manage/data/plan/" + request);
};
