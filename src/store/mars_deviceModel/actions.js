import api from "../api.js";
import Vue from "vue";
export const DEVICE_MODEL_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    // .get("http://182.156.237.85:8080/staticApi/rental-plan-details/" + request.leadSource + "/" + request.device + "/" + request.plan, request)
    .get("https://qaapp.bijlipay.co.in:8085/staticApi/rental-plan-details/" + request.leadSource + "/" + request.device + "/" + request.plan, request)
    .then(response => {  
      commit("SET_DEVICE_MODEL_FROM_MARS", response.body.data.marsDeviceModel);
      return response
    })
}
