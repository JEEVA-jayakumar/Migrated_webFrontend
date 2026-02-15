import api from "../api.js";

export const BANK_LIST_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return api
    .get(
      rootState.GlobalVariables.STATE_MARS_API +
      "bankName?institutionCode=" +
      request
    )
    .then(response => {
      // console.log(response)
      commit("SET_BANK_LIST_FROM_MARS", response.data);
    });
};
