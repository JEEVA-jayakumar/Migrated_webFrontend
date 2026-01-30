import api from '../api.js';
export const FETCH_AGGREGATOR_LEAD_VALIDATION_DATAS= ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      "tpt-lead-validation-tracker-pagination-list-paged/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" +
      request.pagination.page +
      "&size=" +
      request.pagination.rowsPerPage +
      "&search=" +
      request.filter +
      "&sort=" +
      request.pagination.sortBy +
      "&" +
      request.pagination.sortBy +
      ".dir=" +
      sorting
    )
    .then(response => {
      // START=> COMMIT with data received'page=1&size=10&search=&sort=leadNumber&leadNumber.dir=desc
      commit('SET_AGGREGATOR_LEAD_VALIDATION_DATAS', response.data.data);
      // END=> COMMIT with data received'
    });
};
