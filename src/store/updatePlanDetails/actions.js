import api from "../api.js";

export const  UPDATE_PLAN_DETAILS_DATAS= ({ commit,
    rootState},request) => {
    return api
   .put("update-m-atm-plan-details/"+request.params.id,request)
   .then(response => {
    commit("SET_UPDATE_PLAN_DETAILS_DATAS", response.data);
    return response
  })
  };