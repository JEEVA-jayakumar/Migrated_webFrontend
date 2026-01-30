import api from '../api.js';
export const FETCH_SPARE_PARTS_REGIONAL_INVENTORY_DETAILS= ({
  commit
}, request) => {
  console.log("API ACTION REQUEST DETAILS-------->",JSON.stringify(request))
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      "spare-pod/podRegionList/"+request.param.userId+ "?page=" +
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
      commit('SET_SPARE_PARTS_REGIONAL_INVENTORY_DETAILS', response.data.data);
      // END=> COMMIT with data received'
    });
};
