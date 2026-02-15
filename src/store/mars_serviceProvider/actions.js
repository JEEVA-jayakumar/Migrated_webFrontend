import api from "../api.js";

export const SERVICE_PROVIDER = ({
  commit,
  rootState
}, request) => {
  return api
    .get(
      rootState.GlobalVariables.STATE_MARS_API +
      "serviceProviders?institutionCode=" +
      request
    )
    .then(response => {
      commit("SET_SERVICE_PROVIDER", response.data);
    });
};
