import api from "../api.js";
export const FETCH_ALL_RENTAL_PLAN_DETAILS = ({
  commit
}, request) => {
  let sorting = request.pagination.sortBy == null ? "" : request.pagination.descending ? "asc" : "desc"
  let reqParams = request.filter.length > 0 ?
   request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
   :
   request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
   console.log("The Request Params : -- : ", reqParams)
  return api
    .get("manage/data/rental-plan-details/1?page=" + reqParams)
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_ALL_RENTAL_PLAN_DETAILS", response.data.data);
      // END=> COMMIT with data received'
    });
}

export const FETCH_DEACTIVATED_RENTAL_PLAN_DETAILS = ({
  commit
}, request) => {
  let sorting = request.pagination.sortBy == null ? "" : request.pagination.descending ? "asc" : "desc"
  let reqParams = request.filter.length > 0 ?
   request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
   :
   request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&sort=" + request.pagination.sortBy + "&" + request.pagination.sortBy + ".dir=" + sorting
   console.log("The Request Params : -- : ", reqParams)
  return api
    .get("manage/data/rental-plan-details/0?page=" + reqParams)
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_DEACTIVATED_RENTAL_PLAN_DETAILS", response.data.data);
      // END=> COMMIT with data received'
    });
};

export const  FETCH_ALL_RENTAl_PLAN_EDIT_DETAILS = ({
    commit
  }, request) => {
    return api.get("manage/data/rental-plan-details/1", request).then(response => {
      commit("SET_ALL_RENTAl_PLAN_EDIT_DETAILS", response.data.data);
    });

  };

  // ENABLE_OR_DISABLE_MDR_PLAN

  export const  ENABLE_OR_DISABLE_RENTAL_PLAN = ({
    commit
  }, request) => {
    return api.get("manage/data/rental-plan-details/1", request).then(response => {
      commit("SET_ALL_RENTAl_PLAN_EDIT_DETAILS", response.data.data);
    });

  };

