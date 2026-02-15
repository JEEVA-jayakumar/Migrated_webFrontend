import { or } from '@vuelidate/validators';

import api from "../api.js";

export const FETCH_SHORT_LEAD = ({
  commit,
  rootState
}, request) => {
  return api.get(rootState.GlobalVariables.STATE_APP_API + 'create-or-assign-short-lead-from-sat').then(response => {
    commit("SET_SHORT_LEAD", response.data.data.soLeads);
  });

}
