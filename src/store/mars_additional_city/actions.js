import api from "../api.js";

export const CITY_FORM_ADDITIONAL_TID = ({
  commit,
  rootState
}, request) => {
  return api
    .get(rootState.GlobalVariables.STATE_MARS_API + 
      'city/'+ request)
    .then(response => {
      // console.log(response)
      commit("SET_CITY_FORM_ADDITIONAL_TID", response.data);
    })
}