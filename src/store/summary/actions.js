import api from "../api.js";
export const ALLOCATED_DEVICE = ({
    commit
  }, request) => {
    if(request.filter=='')
    {
    let sorting = request.pagination.descending ? "asc" : "desc";
    
       return api
         .get(
           "getAllocatedDevicesMenu?page=" +
           request.pagination.page +
           "&size="  +
           request.pagination.rowsPerPage 
         )
       .then(response => {
          // START=> COMMIT with data received'
         commit("SET_ALLOCATED_DEVICE", response.data.data);
           // END=> COMMIT with data received'
         });
     }
     else{
      return api
      .get(
        "getAllocatedDevices-RegionMenu?page=" +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&search=" +
        request.filter
      )
    .then(response => {
       // START=> COMMIT with data received'
      commit("SET_ALLOCATED_DEVICE", response.data.data);
        // END=> COMMIT with data received'
      });
     }
    }
