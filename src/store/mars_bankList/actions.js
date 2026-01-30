import api from "../api.js";
import Vue from "vue";
export const BANK_LIST_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_MARS_API +
      "bankName?institutionCode=" +
      request
    )
    .then(response => {
      // console.log(response)
      commit("SET_BANK_LIST_FROM_MARS", response.data);
    });
};
