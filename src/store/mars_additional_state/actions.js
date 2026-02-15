import api from "../api.js";

export const STATE_FROM_ADDITIONAL_TID = ({
  commit,
  rootState
}, request) => {
  return api
    .get(rootState.GlobalVariables.STATE_MARS_API + 'state/'+ request)
    .then(response => {
      // console.log(response)
      commit("SET_STATE_FROM_ADDITIONAL_TID", response.data);
    })
}

