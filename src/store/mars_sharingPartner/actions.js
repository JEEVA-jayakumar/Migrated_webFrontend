import api from "../api.js";

export const SHARING_PARTNER_FROM_MARS = ({
  commit,
  rootState
}, request) => {

  return api
    // .get(rootState.GlobalVariables.STATE_MARS_API_URL + 'sharing-partner?institutionCode=' + request)
    .get(rootState.GlobalVariables.STATE_MARS_API + 'sharing-partner?institutionCode=' + request)
    .then(response => {
      // console.log(response)
      commit("SET_SHARING_PARTNER_FROM_MARS", response.data);
    })
}
