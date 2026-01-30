import api from "../api.js";
import Vue from "vue";
export const FETCH_ALL_MPOS_CATEGORY = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getcategory")
    .then(response => {
      let mposCategory = [];
      response.data.map(function (value, key) {
        mposCategory.push({
          label: value.category,
          value: value.category_code
        });
      });
      commit("SET_ALL_MPOS_CATEGORY", mposCategory)
    })

};
