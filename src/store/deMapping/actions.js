import api from '../api.js';
export const DEMAPPING_STATUS_LIST = ({
  commit
}, request) => {
  // let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      'get-aggrator-mapped-device/'+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+'?page=' +
      request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&search=' +
      request.filter 
      //  +
      // '&sort=' +
      // request.pagination.sortBy +
      // '&' +
      // request.pagination.sortBy +
      // '.dir=' +
      // sorting
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_DEMAPPING_STATUS_LIST', response.data.data);
      // END=> COMMIT with data received'
    });
}

export const REMARKS_REASON_DETAILS = ({ commit }, request) => {
  console.log("REQUEST",JSON.stringify(request));
     return api
       .post(
         'demap-lead-device' ,request
       )
   }
