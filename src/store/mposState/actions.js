import api from "../api.js";

export const FETCH_ALL_MPOS_STATE = ({
  commit,
  rootState
}, request) => {
  return api
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getmarstates")
    .then(response => {
      let mposState = [];
      response.data.map(function (value, key) {
        mposState.push({
          label: value,
          value: value,
        });
      });
      commit("SET_ALL_MPOS_STATE", mposState)
    })
};
