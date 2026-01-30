import api from "../api.js";
import Vue from "vue";
export const FETCH_IA_LOCATION = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(rootState.GlobalVariables.STATE_LOCAL_API + 'location-master/' + request)
    .then(response => {
      let iaLocation = [];
      response.data.data.map(function (value, key) {
        iaLocation.push({
          label: value.location,
          value: value.location,

        });
      });
      commit("SET_ALL_IA_LOCATION", iaLocation)
    })
}
