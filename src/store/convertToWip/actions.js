import api from "../api.js";
import Vue from "vue";
export const CONVERT_TO_WIP = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .put(rootState.GlobalVariables.STATE_APP_API + 'convert-wip-lead/' + request.url.id, request.data1)
    .then(response => {
      console.log(response);

    })
};
