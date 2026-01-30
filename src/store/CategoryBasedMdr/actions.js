import api from "../api.js";
import Vue from "vue";
export const CATEGORY_BASED_MDR_PLAN = ({
  commit,
  rootState
}, request) => {
  console.log("REQUEST DATAS 1234---------------->"+JSON.stringify(request))
  return Vue.http
    // .get("http://182.156.237.85:8080/staticApi/mdr-details/" + request.leadSource + "/" + request.device + "/" + request.merchantType, request)
    .get("https://qaapp.bijlipay.co.in:8085/staticApi/mdr-details/" + request.leadSource+ "/" + request.device + "/" + request.merchantType, request)
    .then(response => {
      commit("SET_CATEGORY_BASED_MDR", response.data.data);
      return response
    })
}
export const EDIT_MDR_PLAN = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)
    .put("https://qaapp.bijlipay.co.in:8085/api/manage/data/mdr-details/" + request.id, request)
}
export const ENABLE_OR_DISABLE_MDR_PLAN = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .put("https://qaapp.bijlipay.co.in:8085/api/manage/data/mdr-details/" + request.id, request)
    .then(response => {
      return response
    })
}
