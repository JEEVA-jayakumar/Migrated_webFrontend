import api from "../api.js";
export const FETCH_APP_LEADSOURCE_DATA = ({
  commit
}, request) => {
  return api.get("manage/data/leadsource/", request).then(response => {
    commit("SET_APP_LEAD_SOURCE", response.data.data);
  });
};
// export  const FETCH_APP_DEVICES_DATAS_CHECK = ({ commit }, request) => {
//   return api
//   .get("vas-mapping/get-vas-device-mapping "+ "/" +request)
//   .then(response => {
//     commit("SET_FETCH_APP_DEVICES_DATAS_CHECK", response.data);
//     return response
//   })
//     .catch(
//       error =>
//         console.log("API_FAILURE", error) /* commit('API_FAILURE', error) */
//     );
// };
