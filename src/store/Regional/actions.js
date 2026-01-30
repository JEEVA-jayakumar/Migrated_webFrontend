import api from "../api.js";
export const REGIONAL_SUMMARY_LIST =({
    commit
  }, request) => {
    return api.get("getDevicesRegion").then(response => {

      // START=> COMMIT with data received'
      commit("SET_REGIONAL_SUMMARY_LIST", response.data.data);
      // END=> COMMIT with data received'
    });
    
  }; 


  // export const FETCH_ALL_SIM_STATUS_BY_REGION =({
  //   commit
  // }, request) => {
  //   return api.get("sim/getSimStatusByRegion").then(response => {
    
  //     // START=> COMMIT with data received'
  //     commit("SET_FETCH_ALL_SIM_STATUS_BY_REGION", response.body.data);
  //     // END=> COMMIT with data received'
  //   });
    
  // };


  export const FETCH_ALL_SIM_STATUS_BY_REGION = ({
    commit
  }, request) => {
    let sorting = request.pagination.descending ? "asc" : "desc";
    console.log("FILTER",request.filter);
    
    if(request.filter =='')
    {
   
    return api
    .get(
      "sim/getSimStatusByRegion?page=" +
      request.pagination.page 
      +
      "&size=" +
      request.pagination.rowsPerPage  +
      
         "&sort=" +
         request.pagination.sortBy 
       +
       "&" +
       request.pagination.sortBy
        +
       ".dir=" +
       sorting
       )  
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_FETCH_ALL_SIM_STATUS_BY_REGION", response.data.data);
      // END=> COMMIT with data received'
    });
  }
  else{
     let sorting = request.pagination.descending ? "asc" : "desc";
    return api
    .get(
      "sim/getSimStatusByRegion?page=" +
      request.pagination.page +
      "&size=" +
       request.pagination.rowsPerPage +
        "&search=" +
      request.filter
      +
        "&sort=" +
      request.pagination.sortBy
      +
              "&" +
              request.pagination.sortBy
               +
              ".dir=" +
              sorting
      )  
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_FETCH_ALL_SIM_STATUS_BY_REGION", response.data.data);
      // END=> COMMIT with data received'
    });
  }
  }
  

  export const FETCH_ALL_SIM_STATUS = ({
    commit
  }, request) => {
    
    console.log("FILTER",request.filter)
    let sorting = request.pagination.descending ? "asc" : "desc";
    if(request.filter == '')
    {
    return api
    .get(
      "sim/getTotalSim?page=" 
      +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +

        "&search=" +
        request.filter
        +
       "&sort=" +
      
       request.pagination.sortBy +
       "&" +
       request.pagination.sortBy +
       ".dir=" +
       sorting
       )  
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_FETCH_ALL_SIM_STATUS", response.data.data);
      // END=> COMMIT with data received'
    });
  }
  else{
     let sorting = request.pagination.descending ? "asc" : "desc";
    return api
    .get(
      "sim/getTotalSim?page=" +
      request.pagination.page +
      "&size=" +
       request.pagination.rowsPerPage +
        "&search=" +
      request.filter
      +
        "&sort=" +
      request.pagination.sortBy
      +
              "&" +
              request.pagination.sortBy +
              ".dir=" +
              sorting
      )  
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_FETCH_ALL_SIM_STATUS", response.data.data);
      // END=> COMMIT with data received'
    });
  }
  }
