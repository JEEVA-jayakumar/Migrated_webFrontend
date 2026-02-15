import api from "../api.js";

export const FETCH_ALL_MPOS_CITY = ({
  commit,
  rootState
}, request) => {
  return api
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getmarstates/" + request)
    .then(response => {
      let mposCity = [];
      response.data.map(function (value, key) {
        mposCity.push({
          label: value,
          value: value,
        });
      });
      commit("SET_ALL_MPOS_CITY", mposCity)
    })

};
