import api from "../api.js";
import Vue from "vue";
export const STATE_FROM_ADDITIONAL_TID = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(rootState.GlobalVariables.STATE_MARS_API + 'state/'+ request)
    .then(response => {
      // console.log(response)
      commit("SET_STATE_FROM_ADDITIONAL_TID", response.data);
    })
}

