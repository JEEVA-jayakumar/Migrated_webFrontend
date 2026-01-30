import api from "../api.js";
export const REGIONAL_SUMMARY = ({
    commit
  }, request) => {
   
    let sorting = request.pagination.descending ? "asc" : "desc";
    
       return api
         .get(
           "getDevicesMenu?page=" +
           request.pagination.page +
           "&size="  +
           request.pagination.rowsPerPage  +
           "&search=" +
           request.filter
         )
       .then(response => {
          // START=> COMMIT with data received'
         commit("SET_REGIONAL_SUMMARY",response.data.data);
           // END=> COMMIT with data received'
         });
     }
     

