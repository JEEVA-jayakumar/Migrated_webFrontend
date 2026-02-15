import api from "../api.js";

export const STATE_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return api
    .get(rootState.GlobalVariables.STATE_MARS_API + 'state')
    .then(response => {
      // console.log(response)
      commit("SET_STATE_FROM_MARS", response.data);
    })
}
