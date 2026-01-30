import api from "../api.js";
import Vue from "vue";
export const CITY_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(rootState.GlobalVariables.STATE_MARS_API + 'city')
    .then(response => {
      // console.log(response)
      commit("SET_CITY_FROM_MARS", response.data);
    })
}
