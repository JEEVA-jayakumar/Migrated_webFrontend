import api from "../api.js";
import Vue from "vue";
export const FETCH_REGION_WISE_LIST = ({
  commit,
  rootState
}, request) => {
  return api.
  get("user/regionwise-user-list", {
    items: request,
  }).then(response => {
    // console.log(response)
    commit("SET_REGION_WISE_LIST", response.data.data);
  });
};
