import api from "../api.js";
import Vue from "vue";
export const FETCH_ALL_FILLING_TYPES = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getfillingtypes")
    .then(response => {
      let fillingTypes = [];
      response.data.map(function (value, key) {
        fillingTypes.push({
          label: value,
          value: value,
        });
      });
      commit("SET_ALL_FILLING_TYPES", fillingTypes)
    })
};
