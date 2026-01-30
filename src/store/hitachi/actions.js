import api from '../api.js';
export const FETCH_HITACHI_EMI_DATAS= ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      "get-hitachi-leads?page=" +
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
      sorting
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_HITACHI_EMI_DATAS', response.data.data);
      // END=> COMMIT with data received'
    });
};


// export const ADDITIONAL_TID_VERIFY_DATA = ({ commit }, request) => {
//   console.log("REQUEST------------------->"+JSON.stringify(request.leadInformation.id))
//   return api
//  .get("get-add-on-tid-info-by-lead-id/" + request.leadInformation.id)
//  .then(response => {
//   // START=> COMMIT with data received'
//   commit('SET_ADDITIONAL_TID_VERIFY_DATA', response.data.data);
//   // END=> COMMIT with data received'
// });
// };
