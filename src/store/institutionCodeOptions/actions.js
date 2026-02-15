import api from "../api.js";

export const INSTITUTIONCODE_FROM_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return api
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getAllInstitutions")
    .then(response => {
      let institutionCode = [];
      response.data.data.map(function (value, key) {
        institutionCode.push({
          label: value.institutionName,
          value: value.institutionCode,
        });
      });
      commit("SET_INSTITUTION_CODE", institutionCode)
    })
}
