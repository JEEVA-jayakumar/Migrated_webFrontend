import api from "../api.js";
// export const REJECT_STATUS_LIST = ({ commit }, request) => {
//   let sorting = request.pagination.descending ? "asc" : "desc";
//   return api.get("get-rejected-lead-details/81?page=" + request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&searchTerm=" + request.filter 
//   + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
//     ).then(response => {
//       // START=> COMMIT with data received'
//       commit("SET_REJECT_STATUS_LIST", response.data.data);
//       // END=> COMMIT with data received'
//     });
// };
export const LEAD_STATUS_LIST = ({ commit }, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api.get("implementation-queue-list?page=" + request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter 
  + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
  ).then(response => {
    commit("SET_LEAD_STATUS_LIST", response.data.data);
    // END=> COMMIT with data received'
  });
};
