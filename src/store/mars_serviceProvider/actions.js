import api from "../api.js";
import Vue from "vue";
export const SERVICE_PROVIDER = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_MARS_API +
      "serviceProviders?institutionCode=" +
      request
    )
    .then(response => {
      commit("SET_SERVICE_PROVIDER", response.data);
    });
};
