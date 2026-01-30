import api from "../api.js";

export const DEVICE_WITH_BPREGION = ({
  commit
}, request) => {
  if(request.filter=='')
  {
 
  return api
  .get(
    "getAllBpRegionsMenu?page=" +
    request.pagination.page +
    "&size=" +
    request.pagination.rowsPerPage 
    //  "&sort=" +
    //  request.pagination.sortBy +
    //  "&" +
    //  request.pagination.sortBy +
    //  ".dir=" +
    //  sorting
     )  
  .then(response => {
    // START=> COMMIT with data received'
    commit("SET_DEVICE_WITH_BPREGION", response.data.data);
    // END=> COMMIT with data received'
  });
}
else{
   let sorting = request.pagination.descending ? "asc" : "desc";
  return api
  .get(
    "getAllBpRegionsMenu?page=" +
    request.pagination.page +
    "&size=" +
     request.pagination.rowsPerPage +
      "&search=" +
    request.filter
    // +
    //   "&sort=" +
    // request.pagination.sortBy
    // +
    //         "&" +
    //         request.pagination.sortBy +
    //         ".dir=" +
    //         sorting
    )  
  .then(response => {
    // START=> COMMIT with data received'
    commit("SET_DEVICE_WITH_BPREGION", response.data.data);
    // END=> COMMIT with data received'
  });
}
}




