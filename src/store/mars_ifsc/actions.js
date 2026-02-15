import api from "../api.js";

export const IFSC_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return api
    .get(rootState.GlobalVariables.STATE_MARS_API_URL + 'ifsc?ifsc=' + request)
    .then(response => {
      commit("SET_IFSC_FROM_MARS", response.data);
      return response
    })
}
