import api from "../api.js";
export const PHONEPE_IMPLEMENTATION_QUEUE = ({commit}, request) => {
    console.log("ACTION REQUEST------------>",JSON.stringify(request))
    return api.put("implementation-queue-assigned-to/" + request.userId + "/" + request.action,request);
};

export const PHONEPE_IMPLEMENTATION_QUEUE_UNASSIGNED_LIST = ({ commit }, request) => {
    console.log("request of Unassigned datas----------->",request)
    // console.log("Implementation Queue Unassigned Data : " + request);
    let sorting = request.pagination.descending ? "asc" : "desc";
    console.log("Implementation Queue Unassigned Data : " + request);
    return api.get("implementation-queue-list-PhonePe-lead/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/unassigned"+"?page="+ request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter 
    + "&sort=" + request.pagination.sortBy +"&" + request.pagination.sortBy + ".dir=" + sorting
    ).then(response => {
      console.log("response of Unassigned datas----------->",response)
      // return api.get("implementation-queue-list").then(response => {
      // START=> COMMIT with data received'
      commit("SET_PHONEPE_IMPLEMENTATION_QUEUE_UNASSIGNED_LIST", response.data.data);
      
    });
  };

  export const PHONEPE_IMPLEMENTATION_QUEUE_ASSIGNED_LIST = ({ commit }, request) => {
    // console.log("request of Unassigned datas----------->",request)
    // console.log("Implementation Queue Unassigned Data : " + request);
    let sorting = request.pagination.descending ? "asc" : "desc";
    return api.get("implementation-data-with-without-courier-device/0/0/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" + request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter 
    + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
    ).then(response => {
      console.log("response of Unassigned datas----------->",response)
      // return api.get("implementation-queue-list").then(response => {
      // START=> COMMIT with data received'
      commit("SET_PHONEPE_IMPLEMENTATION_QUEUE_ASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    });
  };
  export const PHONEPE_IMPLEMENTATION_QUEUE_COURIER_LIST = ({ commit }, request) => {
    let sorting = request.pagination.descending ? "asc" : "desc";
    return api.get("implementation-data-with-without-courier-device/0/1/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" + request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter 
    + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
    ).then(response => {
      console.log("response of Unassigned courier datas----------->",response)
      // return api.get("implementation-queue-list").then(response => {
      // START=> COMMIT with data received'
      commit("SET_PHONEPE_IMPLEMENTATION_QUEUE_COURIER_LIST", response.data.data);
      // END=> COMMIT with data received'
    });
  };

  export const PHONEPE_CANCELLED_MERCHANTS = ({ commit }, request) => {
    // console.log("request of CANCELLED MERCHANTS----------->",request)
    // console.log("Implementation Queue CANCELLED MERCHANTS : " + request);
    let sorting = request.pagination.descending ? "asc" : "desc";
    return api.get("get-cancel-onboard-phonepe-list/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" + request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter 
    + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
    ).then(response => {
      console.log("response of Cancelledmerchants----------->",response)
      // return api.get("get-cancel-onboard-phonepe-list").then(response => {
      // START=> COMMIT with data received'
      commit("SET_PHONEPE_CANCELLED_MERCHANTS", response.data.data);
      // END=> COMMIT with data received'
    });
  };
  /* PHONEPE API START */


export const PHONEPE_IMPLEMENTATION_QUEUE_SUBMIT = ({ commit }, request) => {
  return api.put(
    "Aggregator-implementation-queue-assigned-to/" + request.userId + "/" + request.action,
    request
  );
};
/* PHONEPE API END */

/* PHONEPE API START */
export const PHONEPE_CANCELLED_MERCHANT_SUBMIT = ({ commit }, request) => {
  // console.log("REQUEST------------------->"+JSON.stringify(request.leadInformation.id))
  return api.post(
    "cancelOnBoarding/"+ 1+ "/" + 1,
    request
  );
};
/* PHONEPE API END */
  export const CHANGE_REGION = ({
    commit
  }, request) => {
    return api
      .post("reassign-region", request)
  }
