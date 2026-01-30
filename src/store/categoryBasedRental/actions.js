import api from "../api.js";
import Vue from "vue";
export const CATEGORY_BASED_RENTAL_PLAN = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    // .get("http://182.156.237.85:8080/staticApi/rental-plan-details/" + request.leadSource + "/" + request.device + "/" + request.plan, request)
    .get("https://qaapp.bijlipay.co.in:8085/staticApi/rental-plan-details/" + request.leadSource + "/" + request.device + "/" + request.plan, request)
    .then(response => {
      commit("SET_CATEGORY_BASED_RENTAL", response.data.data);
      return response
    })
}
export const CATEGORY_BASED_RENTAL_PLAN1 = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    // .get("http://182.156.237.85:8080/staticApi/rental-plan-details/" + request.leadSource + "/" + request.device + "/" + request.plan, request)
    .get("https://qaapp.bijlipay.co.in:8085/staticApi/rental-plan-details/" + request.leadSource + "/" + request.device + "/" + request.plan, request)
    .then(response => {
      commit("SET_CATEGORY_BASED_RENTAL", response.data.data);
      return response
    })
}
export const EDIT_RENTAL_PLAN = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    // .put("http://182.156.237.85:8080/api/manage/data/rental-plan-details/" + request.id, request)
    .put("https://qaapp.bijlipay.co.in:8085/api/manage/data/rental-plan-details/" + request.id, request)
}

export const ENABLE_OR_DISABLE_RENTAL_PLAN = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    // .put("http://182.156.237.85:8080/api/manage/data/rental-plan-details/" + request.id, request)
    .put("https://qaapp.bijlipay.co.in:8085/api/manage/data/rental-plan-details/" + request.id, request)
}
