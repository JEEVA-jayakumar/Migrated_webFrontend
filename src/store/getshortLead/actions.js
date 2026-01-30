import Vue from 'vue';
import api from "../api.js";

export const FETCH_SHORT_LEAD = ({
  commit,
  rootState
}, request) => {
  return Vue.http.get(rootState.GlobalVariables.STATE_APP_API + 'create-or-assign-short-lead-from-sat').then(response => {
    commit("SET_SHORT_LEAD", response.data.data.soLeads);
  });

}
