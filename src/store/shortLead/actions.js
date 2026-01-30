import api from "../api.js";
import Vue from "vue";
export const STATE_SHORT_LEAD = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .post(rootState.GlobalVariables.STATE_APP_API + 'create-or-assign-short-lead-from-sat', request)
    .then(response => {
      console.log(response);
       // commit("SET_STATE_SHORT_LEAD", response.data);

    })
}
