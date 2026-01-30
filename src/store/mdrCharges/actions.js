import api from "../api.js";
export const FETCH_ALL_MDR_PLAN_DETAILS = ({
  commit
}, request) => {
  let sorting = request.pagination.sortBy == null ? "" : request.pagination.descending ? "asc" : "desc"
  let reqParams = request.filter.length > 0 ?
   request.pagination.page + "&size=" + request.pagination.rowsPerPage 
   + "&search=" + request.filter + "&sort=" + request.pagination.sortBy 
   + "&" + request.pagination.sortBy + ".dir=" + sorting:
   request.pagination.page + "&size=" + request.pagination.rowsPerPage 
   + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
   console.log("The Request Params : -- : ", reqParams)
  return api.get("manage/data/mdr-details/1?page=" + reqParams).then(response => {
    commit("SET_ALL_MDR_PLAN_DETAILS", response.data.data);
  });
},

FETCH_ALL_MDR_PLAN_EDIT_DETAILS = ({
  commit
}, request) => {
  return api.get("manage/data/mdr-details/1", request).then(response => {
    commit("SET_ALL_MDR_PLAN_EDIT_DETAILS", response.data.data);
  });
};

