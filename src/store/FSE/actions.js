import api from "../api.js";

export const DEVICE_WITH_FSE = ({
  commit
}, request) => {
  if(request.filter=='')
  {
  let sorting = request.pagination.descending ? "asc" : "desc";
  return api
  .get(
    "so-menu-list-search?page=" +
    request.pagination.page +
    "&size=" +
     request.pagination.rowsPerPage 
     )  
  .then(response => {
    // START=> COMMIT with data received'
    commit("SET_DEVICE_WITH_FSE", response.data.data);
    // END=> COMMIT with data received'
  });
}
else{
  
  return api
  .get(
    "so-menu-list-search?page=" +
    request.pagination.page +
    "&size=" +
     request.pagination.rowsPerPage +
      "&search=" +
      request.filter 
       )  
  .then(response => {
    // START=> COMMIT with data received'
    commit("SET_DEVICE_WITH_FSE", response.data.data);
    // END=> COMMIT with data received'
  });
}
}


