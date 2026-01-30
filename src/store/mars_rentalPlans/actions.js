import api from "../api.js";
import Vue from "vue";
export const RENTAL_PLAN_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(rootState.GlobalVariables.STATE_MARS_API + 'rental-plan?institutionCode=' + request)
    .then(response => {
      // console.log(response)
      commit("SET_RENTAL_PLAN_FROM_MARS", response.data);
    })
}
