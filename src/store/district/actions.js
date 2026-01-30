import api from "../api.js";
import Vue from "vue";
export const FETCH_ALL_DISTRICT = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getdistrict/" + request)
    // .then(response => {
    //   // START >> Commit response data
    //   commit("SET_ALL_DISTRICT", response.data.data)
    //   // END >> Commit response data
    // })
    .then(response => {
      let allDistick = [];
      response.data.district.map(function (value, key) {
        allDistick.push({
          label: value.district,
          value: value.district,

        });
      });
      commit("SET_ALL_DISTRICT", allDistick)
    })
};
