import api from "../api.js";
import Vue from "vue";
export const FETCH_ALL_MPOS_CITY = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getmarstates/" + request)
    .then(response => {
      let mposCity = [];
      response.data.map(function (value, key) {
        mposCity.push({
          label: value,
          value: value,
        });
      });
      commit("SET_ALL_MPOS_CITY", mposCity)
    })

};
