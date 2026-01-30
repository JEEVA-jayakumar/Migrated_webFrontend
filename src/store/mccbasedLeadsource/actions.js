import api from "../api.js";
import Vue from "vue";
export const FECTCH_MCC_BASED_LEADSOURCE = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .post(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getMccLeadSourceBasedOnMccAndLeadSource", request)
};
