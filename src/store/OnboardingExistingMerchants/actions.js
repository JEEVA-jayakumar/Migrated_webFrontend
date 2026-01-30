import api from "../api.js";
export const ONBOARDING_MERCHANT_ASSIGNED_LIST = ({commit}, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  console.log("requested datas:----------------:assigned-----"+JSON.stringify(request))
  return api
    .get("activeMerchantAssignList?page=" +
    request.pagination.page +
    "&size=" +
    request.pagination.rowsPerPage +
    "&search=" +
    request.filter
    +
    "&sort=" +
    request.pagination.sortBy +
    "&" +
    request.pagination.sortBy +
    ".dir=" +
    sorting
    )
    .then(response => {
      console.log("Response:------------->:Assigned----->"+JSON.stringify(response));
      // START=> COMMIT with data received'
      commit("SET_ONBOARDING_MERCHANT_ASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    })
}
export const ONBOARDING_MERCHANT_UNASSIGNED_LIST = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  let sortBy = request.pagination.sortBy == null ? "createdAt" : request.pagination.sortBy
  // console.log("requested datas:----------------:Unassigned-----"+JSON.stringify(request))
  return api
    .get("activeMerchantList?page=" +
    request.pagination.page + 
    "&size=" + 
    request.pagination.rowsPerPage + 
    "&search=" + 
    request.filter 
    +
    "&sort=" +
    request.pagination.sortBy +
    "&" +
    request.pagination.sortBy +
    ".dir=" +
    sorting
    )
    .then(response => {
      // console.log("Response:------------->:UnAssigned----->"+JSON.stringify(response));
      // START=> COMMIT with data received'
      commit("SET_ONBOARDING_MERCHANT_UNASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    })
}
export const ONBOARDING_MERCHANT_SUBMIT = ({
  commit
}, request) => {
  return api
    .put("qr-implementation-assigned-to/" +request.userId+"/4",request)
}

export const ONBOARDING_MERCHANT_SUBMIT_UNASSIGN = ({
  commit
}, request) => {
  return api
    .put("qr-implementation-assigned-to/" +request.userId+"/1",request)
}
