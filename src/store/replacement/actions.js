import api from "../api.js";
export const REPLACEMENT_RECOVERY_LIST = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  
     return api
       .get(
         "getRecoveryReplacementHist?page=" +
         request.pagination.page +
         "&size=" +
         request.pagination.rowsPerPage +
         "&search=" +
         request.filter 
       )
     .then(response => {
        // START=> COMMIT with data received'
       commit("SET_REPLACEMENT_RECOVERY_LIST", response.data.data);
         // END=> COMMIT with data received'
       })
   }
 

