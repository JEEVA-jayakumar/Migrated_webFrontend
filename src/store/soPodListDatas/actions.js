import api from '../api.js';
export const FETCHING_APPROVED_POD_LIST_DETAILS = ({
  commit
}, request) => {
  console.log("API ACTION REQUEST DETAILS-------->",request)
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      "spare-pod/getPod"+"/3"+"/5?page=" +
      request.pagination.page +
      "&size=" +
      request.pagination.rowsPerPage +
      "&searchTerm=" +
      request.filter +
      "&sort=" +
      request.pagination.sortBy +
      "&" +
      request.pagination.sortBy +
      ".dir=" +
      sorting
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_APPROVED_POD_LIST_DETAILS', response.data.data);
      // END=> COMMIT with data received'
    });
};

/* PHONEPE API START */

export const FETCHING_PHONEPE_APPROVED_POD_LIST_DETAILS = ({
  commit
}, request) => {
  console.log("API ACTION REQUEST DETAILS-------->",request)
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      "aggregator-spare-parts/agg-getPod"+"/3"+"/5"+"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" +
      request.pagination.page +
      "&size=" +
      request.pagination.rowsPerPage +
      "&searchTerm=" +
      request.filter +
      "&sort=" +
      request.pagination.sortBy +
      "&" +
      request.pagination.sortBy +
      ".dir=" +
      sorting
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_PHONEPE_APPROVED_POD_LIST_DETAILS', response.data.data);
      // END=> COMMIT with data received'
    });
};

/* PHONEPE API END */

export const FETCHING_REJECTED_POD_LIST_DETAILS = ({
    commit
  }, request) => {
    console.log("API ACTION REQUEST DETAILS-------->",request)
    let sorting = request.pagination.descending ? 'asc' : 'desc';
    return api
      .get(
        "spare-pod/getPod"+"/2"+"/6?page=" +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&searchTerm=" +
        request.filter +
        "&sort=" +
        request.pagination.sortBy +
        "&" +
        request.pagination.sortBy +
        ".dir=" +
        sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_REJECTED_POD_LIST_DETAILS', response.data.data);
        // END=> COMMIT with data received'
      });
  };

  /* PHONEPE API START */


  export const FETCHING_PHONEPE_REJECTED_POD_LIST_DETAILS = ({
    commit
  }, request) => {
    console.log("API ACTION REQUEST DETAILS-------->",request)
    let sorting = request.pagination.descending ? 'asc' : 'desc';
    return api
      .get(
        "aggregator-spare-parts/agg-getPod"+"/2"+"/6"+"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&searchTerm=" +
        request.filter +
        "&sort=" +
        request.pagination.sortBy +
        "&" +
        request.pagination.sortBy +
        ".dir=" +
        sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_PHONEPE_REJECTED_POD_LIST_DETAILS', response.data.data);
        // END=> COMMIT with data received'
      });
  };

  /* PHONEPE API END */

  export const UPDATE_SO_REJECTED_POD_DETAILS= ({
    commit,
    rootState
  }, request) => {
    console.log("SUBMIT request ----> Action",JSON.stringify(request))
    // let path = 2;
    // if(request.allocate_region != null && request.allocate_so ==null){
    //   path = 1;
    // }else if(request.allocate_region != null && request.allocate_so != null){
    //   path =2;
    // }
    return api.post("spare-pod/updatePod/"+request.pod_number+"/2", request)
  };
