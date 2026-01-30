// import api from "../api.js";
// import Vue from "vue";
// export const FETCH_ALL_SERIAL_NUMBER = ({
//   commit,
//   rootState
// }, request) => {
//   return Vue.http
//     .get("search-device-by-mid-tid-mobile?serialNumber=" + request)
//     // https://qaapp.bijlipay.co.in:8085/api/search-device-by-mid-tid-mobile/7239505
//     .then(response => {
//       // console.log(response)
//       let merchant = [];
//       response.data.data.map(function (value, key) {
//         merchant.push({
//           label: value.data,
//           value: value.data,
//         });
//       });
//       // END=> Structuring response like 'label' => 'value'

//       // START=> COMMIT with data received'
//       commit("SET_SERIAL_NUMBER", merchant);
//     })

// }
