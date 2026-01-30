import api from "../api.js";

export const UNALLOCATED_DEVICE = ({
    commit
  }, request) => {
    if(request.filter=='')
    {
    let sorting = request.pagination.descending ? "asc" : "desc";
    
       return api
         .get(
           "getUnallocatedDevicesMenu?page=" +
           request.pagination.page +
           "&size="   +
           request.pagination.rowsPerPage
         )
       .then(response => {
          // START=> COMMIT with data received'
         commit("SET_UNALLOCATED_DEVICE", response.data.data);
           // END=> COMMIT with data received'
         });
     }
     else{
      return api
      .get(
        "getUnAllocatedDevices-RegionMenu?page=" +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&search=" +
        request.filter
      )
    .then(response => {
       // START=> COMMIT with data received'
      commit("SET_UNALLOCATED_DEVICE", response.data.data);
        // END=> COMMIT with data received'
      });
     }
    }


