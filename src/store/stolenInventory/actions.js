// import api from '../api.js';
// export const FETCH_STOLEN_INVENTORY_DATAS= ({ commit }, request) =>{
//     //  let sorting = request.pagination.descending ? 'asc' : 'desc';
   
//       return api
//         .get(
//           "central-inventory-get-device-by-status/5?page=" +
//                 request.pagination.page +
//                 "&size=" +
//                 request.pagination.rowsPerPage 
//         )
//         .then(response => {
//           // START=> COMMIT with data received'
//         //   response.data.data.content.map(function (value, index) {
//         //     Vue.set(value, "expand", false);
//         //   });
//           commit("SET_STOLEN_INVENTORY_DATAS", response.data.data);
//           console.log("Inventory DATAS---------------->"+JSON.stringify(response.data.data))
//           // END=> COMMIT with data received'
//         });
   
//   };
