import api from "../api.js";
import Vue from "vue";
export const MCC_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(rootState.GlobalVariables.STATE_MARS_API + 'mcc')
    .then(response => {
      commit("SET_MCC_FROM_MARS", response.data);
    })
}

export const QR_MCC_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(rootState.GlobalVariables.STATE_MARS_API + 'mcc')
    .then(response => {
      // console.log("SET_QR_MCC_FROM_MARS---------->>>>",response.data.items)
      commit("SET_QR_MCC_FROM_MARS", response.data);
      return response.data;
    })
}
