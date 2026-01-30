import api from "../api.js";

export const FAULTY_DEVICE = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api
  .get(
    "getFaultyDevices-RegionMenu?page=" +
    request.pagination.page +
    "&size=" +
    request.pagination.rowsPerPage +
    "&search=" +
    request.filter
  )
  .then(response => {
    // START=> COMMIT with data received'
    commit("SET_FAULTY_DEVICE", response.data.data);
    // END=> COMMIT with data received'
  });
}


