import api from "../api.js";
import Vue from "vue";
export const FETCH_ALL_MPOS_SUBCATEGORY = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(
      rootState.GlobalVariables.STATE_LOCAL_API +
      "getcategory/" + request)
    .then(response => {
      let mposSubCategory = [];
      response.data.map(function (value, key) {
        mposSubCategory.push({
          label: value.sub_category,
          value: value.subcategory_code
        });
      });
      commit("SET_ALL_MPOS_SUB_CATEGORY", mposSubCategory)
    })

};
