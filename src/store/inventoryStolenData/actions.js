import api from '../api.js';
// export const FETCH_INVENTORY_STOLEN_DATA= ({ commit }, request) =>{
//     //  let sorting = request.pagination.descending ? 'asc' : 'desc';

//       return api
//         .get(
//           "central-inventory-get-device-by-status/5"
//         )
//         .then(response => {
//           // START=> COMMIT with data received'
//         //   response.data.data.content.map(function (value, index) {
//         //     Vue.set(value, "expand", false);
//         //   });
//           commit("SET_INVENTORY_STOLEN_DATA", response.data.data);
//           console.log("Inventory DATAS---------------->"+JSON.stringify(response.data.data))
//           // END=> COMMIT with data received'
//         });

//   };
export const FETCH_INVENTORY_STOLEN_DATA = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      'central-inventory-get-device-by-status/5?page=' +
      request.pagination.page +
      '&size=' +
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
      commit('SET_INVENTORY_STOLEN_DATA', response.data.data);
      // END=> COMMIT with data received'
    });
};

/* AGgregators API */

/* START AGGREGATORS DYNAMIC CODE */

// export const FETCH_AGGREGATORS_INVENTORY_STOLEN_DATA = ({
//   commit
// }, request) => {
//    let sorting = request.pagination.descending ? 'asc' : 'desc';
//   return api
//     .get(
//       'aggregator-inventory/agg-central-inventory-get-device-by-status/5/'+request.aggregator+'?page=' +
//       request.pagination.page +
//       '&size=' +
//       request.pagination.rowsPerPage +
//       "&search=" +
//       request.filter +
//       "&sort=" +
//       request.pagination.sortBy +
//       "&" +
//       request.pagination.sortBy +
//       ".dir=" +
//       sorting
//     )
//     .then(response => {
//       // START=> COMMIT with data received'
//       commit('SET_AGGREGATORS_INVENTORY_STOLEN_DATA', response.data.data);
//       // END=> COMMIT with data received'
//     });
// };

/* START AGGREGATORS DYNAMIC CODE */

/* START AGGREGATORS STATIC CODE */

export const FETCH_AGGREGATORS_INVENTORY_STOLEN_DATA = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      'aggregator-inventory/agg-central-inventory-get-device-by-status/5/'+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+'?page=' +
      request.pagination.page +
      '&size=' +
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
      commit('SET_AGGREGATORS_INVENTORY_STOLEN_DATA', response.data.data);
      // END=> COMMIT with data received'
    });
};

/* END AGGREGATORS STATIC CODE */


/* AGgregators API */

