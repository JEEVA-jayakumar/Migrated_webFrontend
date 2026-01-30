import api from '../api.js';
export const FETCH_SPARE_PARTS_POD_LIST_INVENTORY_DETAILS= ({
  commit
}, request) => {
  console.log("API ACTION REQUEST DETAILS-------->",request)
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      "spare-pod/podList?page=" +
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
      commit('SET_SPARE_PARTS_POD_LIST_INVENTORY_DETAILS', response.data.data);
      // END=> COMMIT with data received'
    });
};

/*PHONEPE API START */

export const FETCH_PHONEPE_SPARE_PARTS_POD_LIST_INVENTORY_DETAILS= ({
  commit
}, request) => {
  console.log("API ACTION REQUEST DETAILS-------->",request)
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      "aggregator-spare-parts/agg-podList/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" +
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
      commit('SET_PHONEPE_SPARE_PARTS_POD_LIST_INVENTORY_DETAILS', response.data.data);
      // END=> COMMIT with data received'
    });
};

/*PHONEPE API END */
