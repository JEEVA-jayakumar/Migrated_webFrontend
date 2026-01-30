import api from "../api.js";
import Vue from "vue";
export const FETCH_ALL_ZONE = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getallzone")
    .then(response => {
      console.log(response)
      let zone = [];
      response.data.data.map(function (value, key) {
        zone.push({
          label: value.zone,
          value: value.zone,
        });
      });
      commit("SET_ALL_ZONE", zone)
    })
};
