import api from "../api.js";
export const IMPLEMENTATION_QUEUE_ASSIGNED_LIST = ({ commit }, request) => {
  console.log("request of assigned datas----------->",request)
  console.log("Implementation Queue Data : " + request);
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api.get("implementation-data-with-without-courier-device/1/0?page=" + request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter 
  + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
    ).then(response => {
      // START=> COMMIT with data received'
      console.log("response of assigned datas----------->",response)
      commit("SET_IMPLEMENTATION_QUEUE_ASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    });
};
export const IMPLEMENTATION_QUEUE_UNASSIGNED_LIST = ({ commit }, request) => {
  console.log("request of Unassigned datas----------->",request)
  console.log("Implementation Queue Unassigned Data : " + request);
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api.get("implementation-queue-list?page=" + request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter 
  + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
  ).then(response => {
    console.log("response of Unassigned datas----------->",response)
    // return api.get("implementation-queue-list").then(response => {
    // START=> COMMIT with data received'
    commit("SET_IMPLEMENTATION_QUEUE_UNASSIGNED_LIST", response.data.data);
    // END=> COMMIT with data received'
  });
};
export const IMPLEMENTATION_QUEUE_COURIER_LIST = ({ commit }, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api.get("implementation-data-with-without-courier-device/1/1?page=" + request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter 
  + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
  ).then(response => {
    // console.log("response of Unassigned datas----------->",response)
    // return api.get("implementation-queue-list").then(response => {
    // START=> COMMIT with data received'
    commit("SET_IMPLEMENTATION_QUEUE_COURIER_LIST", response.data.data);
    // END=> COMMIT with data received'
  });
};
export const IMPLEMENTATION_QUEUE_SUBMIT = ({ commit }, request) => {
  return api.put(
    "implementation-assigned-to/" + request.userId + "/" + request.action,
    request
  );
};

export const IMPLEMENTATION_CANCELLED_MERCHANTS = ({ commit }, request) => {
  // console.log("request of CANCELLED MERCHANTS----------->",request)
  // console.log("Implementation Queue CANCELLED MERCHANTS : " + request);
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api.get("get-cancel-onboard-phonepe-list/1?page=" + request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter 
  + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
  ).then(response => {
    console.log("response of Cancelledmerchants----------->",response)
    // return api.get("get-cancel-onboard-phonepe-list").then(response => {
    // START=> COMMIT with data received'
    commit("SET_IMPLEMENTATION_CANCELLED_MERCHANTS", response.data.data);
    // END=> COMMIT with data received'
  });
};
export const IMPLEMENTATION_CANCELLED_MERCHANT_SUBMIT = ({ commit }, request) => {
  // console.log("REQUEST------------------->"+JSON.stringify(request.leadInformation.id))
  return api.post(
    "cancelOnBoarding/"+ 1+ "/" + 1,
    request
  );
};
