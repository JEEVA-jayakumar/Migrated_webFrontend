import api from "../api.js";
export const DEVICE_RECOVERY_ASSIGNED_LIST = ({commit}, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  console.log("requested datas:----------------:assigned-----"+JSON.stringify(request))
  return api
    .get("device-recovery-tracker-list/assigned?page=" +
    request.pagination.page +
    "&size=" +
    request.pagination.rowsPerPage +
    "&searchterm=" +
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
      commit("SET_DEVICE_RECOVERY_ASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    })
}
export const DEVICE_RECOVERY_UNASSIGNED_LIST = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  let sortBy = request.pagination.sortBy == null ? "createdAt" : request.pagination.sortBy
  // console.log("requested datas:----------------:Unassigned-----"+JSON.stringify(request))
  return api
    .get("device-recovery-tracker-list/?page=" +
    request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&searchterm=" + request.filter + 
    "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting 
    )
    .then(response => {
      // console.log("Response:------------->:UnAssigned----->"+JSON.stringify(response));
      // START=> COMMIT with data received'
      commit("SET_DEVICE_RECOVERY_UNASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    })
}
export const DEVICE_RECOVERY_SUBMIT = ({
  commit
}, request) => {
  return api
    .put("device-recovery-assigned-to/" + request.userId, request)
}
