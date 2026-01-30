import api from "../api.js";
import Vue from "vue";
export const MDR_PLAN_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_MARS_API +
      "mdr?institutionCode=" +
      request +
      "&type=Other"
    )
    .then(response => {
      // console.log(response)
      commit("SET_MDR_PLAN_FROM_MARS", response.data);
    });
};
