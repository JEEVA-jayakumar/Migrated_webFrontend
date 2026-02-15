import api from "../api.js";

export const RENTAL_PLAN_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return api
    .get(rootState.GlobalVariables.STATE_MARS_API + 'rental-plan?institutionCode=' + request)
    .then(response => {
      // console.log(response)
      commit("SET_RENTAL_PLAN_FROM_MARS", response.data);
    })
}
