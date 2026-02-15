import api from "../api.js";

export const FETCH_IOR_STATE = ({
  commit,
  rootState
}, request) => {
  return api
    .get(rootState.GlobalVariables.STATE_LOCAL_API + 'state/' + request)
    .then(response => {
      let iorState = [];
      response.data.data.state.map(function (value, key) {
        iorState.push({
          label: value.state,
          value: value.state,

        });
      });
      commit("SET_ALL_IOR_STATE", iorState)
    })
}
