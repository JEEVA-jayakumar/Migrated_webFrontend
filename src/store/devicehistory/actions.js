import api from "../api.js";

export const DEVICE_WITH_HISTORY = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api
    .get(
      "getDeviceHistory?page=" +
      request.pagination.page +
      "&size=" +
      request.pagination.rowsPerPage +
      "&search=" +
      request.filter
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_DEVICE_WITH_HISTORY", response.data.data);
      // END=> COMMIT with data received'
    });
};

// export const AGGREGATORS_DEVICE_WITH_HISTORY = ({
//   commit
// }, request) => {
//   console.log("AGGREGATORS_DEVICE_WITH_HISTORY -------->",JSON.stringify(request))
//   let sorting = request.pagination.descending ? "asc" : "desc";
//   return api
//   .get(
//     "getDeviceHistory?page=" +
//     request.pagination.page +
//     "&size=" +
//     request.pagination.rowsPerPage +
//     "&search=" +
//     request.filter
//   )
//   .then(response => {
//     // START=> COMMIT with data received'
//     commit("SET_AGGREGATORS_DEVICE_WITH_HISTORY", response.data.data);
//     // END=> COMMIT with data received'
//   });
// }

export const AGGREGATORS_DEVICE_WITH_HISTORY = ({
  commit
}, request) => {
  console.log("AGGREGATORS_DEVICE_WITH_HISTORY -------->", JSON.stringify(request))
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api
    .get(
      "aggregator-inventory/agg-getDeviceHistory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" +
      request.pagination.page +
      "&size=" +
      request.pagination.rowsPerPage +
      "&search=" +
      request.filter
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_AGGREGATORS_DEVICE_WITH_HISTORY", response.data.data);
      // END=> COMMIT with data received'
    });
}



