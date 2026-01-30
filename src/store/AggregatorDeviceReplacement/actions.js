import api from "../api.js";
export const AGGREGATOR_DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST = ({ commit }, request) => {
  if(JSON.parse(localStorage.getItem("selectedTab").split('|')[1])=='3')
  {
  console.log("requested datas:----------------:Unassigned-----"+JSON.stringify(request.pagination))
  let sorting = request.pagination.descending ? "asc" : "desc";
  let sortBy = request.pagination.sortBy == null ? "createdAt" : request.pagination.sortBy 
  return api
    .get( 
       "aggregator-inventory/agg-DeviceReplacement-queue-lst/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/assigned"+"?page=" +
      request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&searchterm=" + request.filter 
      + "&sort=" + sortBy + "&" + sortBy + ".dir=" + sorting
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_AGGREGATOR_DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    });
  }
  else{
    console.log("requested datas:----------------:Unassigned-----"+JSON.stringify(request.pagination))
    let sorting = request.pagination.descending ? "asc" : "desc";
    let sortBy = request.pagination.sortBy == null ? "createdAt" : request.pagination.sortBy 
    return api
      .get( 
         "aggregator-inventory/agg-DeviceReplacement-queue-list/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/assigned"+"?page=" +
        request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&searchterm=" + request.filter 
        + "&sort=" + sortBy + "&" + sortBy + ".dir=" + sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit("SET_AGGREGATOR_DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST", response.data.data);
        // END=> COMMIT with data received'
      });
    }
}

export const AGGREGATOR_DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST = ({ commit }, request) => {

      if(JSON.parse(localStorage.getItem("selectedTab").split('|')[1])=='3')
      {
        let sorting = request.pagination.descending ? "asc" : "desc";
        console.log("requested datas:----------------:Unassigned-----"+JSON.stringify(request))
          return api
          .get(
             "aggregator-inventory/agg-DeviceReplacement-queue-lst/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&searchterm=" +
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
            commit("SET_AGGREGATOR_DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST", response.data.data);
            // END=> COMMIT with data received'
          });
    }
    else{
      let sorting = request.pagination.descending ? "asc" : "desc";
        console.log("requested datas:----------------:Unassigned-----"+JSON.stringify(request))
      return api
          .get(
             "aggregator-inventory/agg-DeviceReplacement-queue-list/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&searchterm=" +
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
            commit("SET_AGGREGATOR_DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST", response.data.data);
            // END=> COMMIT with data received'
          });
    }
};

export const AGGREGATOR_DEVICE_REPLACEMENT_QUEUE_SUBMIT = ({ commit }, request) => {
    return api.put(
        "DeviceReplacement-assigned-to/" + request.userId,
        request
    );
};
