import api from "../api.js";
import Vue from "vue";
export const FECTCH_ALL_BRANCH = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getbranch/" + request)
    .then(response => {
      let allBranchName = [];
      response.data.branch.map(function (value, key) {
        allBranchName.push({
          label: value.branchName,
          value: value.branchCode,

        });
      });
      commit("SET_ALL_BRANCHNAME", allBranchName)
    })
};
