import api from "../api.js";

export const FECTCH_MCC_BASED_LEADSOURCE = ({
  commit,
  rootState
}, request) => {
  return api
    .post(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getMccLeadSourceBasedOnMccAndLeadSource", request)
};
