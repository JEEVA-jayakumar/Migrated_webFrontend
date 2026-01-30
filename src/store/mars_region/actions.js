import api from "../api.js";
import Vue from "vue";
export const REGION_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(rootState.GlobalVariables.STATE_MARS_API + 'regions?institutionCode=' + request)
    .then(response => {
      commit("SET_REGION_FROM_MARS", response.data);
    })
}
