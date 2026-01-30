import api from "../api.js";
import Vue from "vue";
export const DEVICE_WITH_MERCHANT = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api
  .get(
    "getMerchantMenu?page=" +
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
    // START=> COMMIT with data received'
    commit("SET_DEVICE_WITH_MERCHANT", response.data.data);
    // END=> COMMIT with data received'
  });
}


