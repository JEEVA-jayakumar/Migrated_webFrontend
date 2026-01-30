import api from "../api.js";
import Vue from "vue";
export const INSTITUTIONCODE_FROM_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return Vue.http
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
