import api from '../api.js';
export const FETCH_BIJLIPAY_PENDING_CRM = ({
  commit
}, request) => {
 
  let sorting = request.pagination.descending ? 'asc' : 'desc';
 
  return api
    .get("crm-request/getClientData/1/1?page=" +
      request.pagination.page +
      "&size=" +
      request.pagination.rowsPerPage 
      +
      "&searchTerm=" +
      request.filter 
      + 
      "&sort=" +
      request.pagination.sortBy +
      "&" +
      request.pagination.sortBy +
      ".dir=" +
      sorting)
    .then(response => {
      // console.log("PHONEPE ACTION", JSON.stringify(response));

      commit('SET_BIJLIPAY_PENDING_CRM', response.data.data);
    });
};

export const FETCH_BIJLIPAY_COMPLETED_DATA = ({
  commit
}, request) => {
   console.log("DAGA2 : ==== : ", JSON.stringify(request))
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get("crm-request/getClientData/1/0?page=" +
      request.pagination.page +
      "&size=" +
      request.pagination.rowsPerPage +
      "&searchTerm=" +
      request.filter +
      "&sort=" +
      request.pagination.sortBy +
      "&" +
      request.pagination.sortBy +
      ".dir=" +
      sorting)
    .then(response => {
      // console.log("PHONEPE ACTION", JSON.stringify(response));
      commit('SET_BIJLIPAY_COMPLETED_DATA', response.data.data);
    });
};

export const BIJLIPAY_CRM_DATE = ({
  commit
}, request) => {  
  console.log("ESCALATE=ES===>>>>",JSON.stringify(request))
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get("crm-request/agingTracker/1/"+request.date+"?page="+
     request.pagination.page +
    "&size=" +  
    request.pagination.rowsPerPage +
    "&searchTerm=" +
    request.filter +
    "&sort=" +
    request.pagination.sortBy +
    "&" +
    request.pagination.sortBy +
    ".dir=" +
    sorting)
    .then(response => {
      commit('SET_BIJLIPAY_CRM_DATE', response.data.data);
    });
};
export const UPDATE_CRM_REMARKS = ({
  commit
}, request) => {
  // console.log("DAGA : ==== : ", JSON.stringify(request))
  return api.put("crm-request/updateCrmRemark/" + request.serviceRequest, request)
    .then(response => {
      commit("SET_CRM_REMARKS", response);
    });
};
export const ASSIGN_TO_COMPLETE = ({
  commit
}, request) => {
  console.log("ESCALATE_1====111>>>>",JSON.stringify(request))
  return api.put("crm-request/assignTicket/1" , request)
};
export const ESCALATE_TO_SAT = ({
  commit
}, request) => {
  console.log("ESCALATE_2====>>>>",JSON.stringify(request))
  return api.put("crm-request/assignTicket/2" , request)
};