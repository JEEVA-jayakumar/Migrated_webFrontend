import api from "../api.js";

export const FETCH_ALL_FILLING_TYPES = ({
  commit,
  rootState
}, request) => {
  return api
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getfillingtypes")
    .then(response => {
      let fillingTypes = [];
      response.data.map(function (value, key) {
        fillingTypes.push({
          label: value,
          value: value,
        });
      });
      commit("SET_ALL_FILLING_TYPES", fillingTypes)
    })
};
