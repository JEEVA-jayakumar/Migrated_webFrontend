import api from "../api.js";

export const FECTCH_ALL_BRANCH = ({
  commit,
  rootState
}, request) => {
  return api
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
