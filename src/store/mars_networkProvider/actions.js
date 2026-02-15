import api from "../api.js";

export const NETWORK_PROVIDER = ({
  commit,
  rootState
}, request) => {
  return api
    .get(
      rootState.GlobalVariables.STATE_MARS_API +
      "networkProviders?institutionCode=" +
      request
    )
    .then(response => {
      // console.log(response)
      commit("SET_NETWORK_PROVIDER", response.data);
    });
};
