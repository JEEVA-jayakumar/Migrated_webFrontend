import api from "../api.js";

export const PRICING_EXCEPTION_LIST = ({ commit }, request) => {
  return api.get("get-pricing-exceptions").then(response => {
    commit("SET_PRICING_EXCEPTION_LIST", response.data.data.leadInformation);
  });
};
export const PRICING_RSM_LIST = ({ commit }, request) => {
  return api.get("national-head-pricing-exceptions").then(response => {
    commit("SET_PRICING_RSM_LIST", response.data.data.userList);
  });
};
export const PRICING_EXCEPTION_LIST_WHERE_RSMID = ({ commit }, request) => {
  return api.get("get-pricing-exceptions/" + request.id).then(response => {
    commit(
      "SET_PRICING_EXCEPTION_BY_RSMID_LIST",
      response.data.data.leadInformation
    );
  });
};
export const PRICING_EXCEPTION_VERIFICATION = ({ commit }, request) => {
  return api.post(
    "rsm/pricing-verification/" + request.leadId + "/" + request.action,
    request.remarks
  );
};
