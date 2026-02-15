import api from "../api.js";

export const CITY_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return api
    .get(rootState.GlobalVariables.STATE_MARS_API + 'city')
    .then(response => {
      // console.log(response)
      commit("SET_CITY_FROM_MARS", response.data);
    })
}
