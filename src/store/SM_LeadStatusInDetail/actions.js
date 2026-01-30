import api from "../api.js";
export const LEAD_STATUS_IN_DETAIL = ({ commit }, request) => {
  return api
    .get(
      "list-of-user-with-lead-status-count-based-on-role/" +
        request.heirarchyId +
        "/" +
        request.userId
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_LEAD_STATUS_USER_DETAILS", response.data.data);
      // END=> COMMIT with data received'
      return response;
    });
};
export const FETCH_ALL_SALES_MANAGER_LEAD_VALIDATIONS_DATA = (
  { commit },
  request
) => {
  return api
    .get(
      "list-of-leads-fetch-based-on-role/" +
        request.userId +
        "/" +
        request.action
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_SALES_MANAGER_LEAD_STATUS_USER_DETAILS", response.data.data);
      // END=> COMMIT with data received'
      return response;
    });
};

export const LEAD_STATUS_IN_DETAIL_SO = ({ commit }, request) => {
  let action;
  let custom_commit;
  if (request.tabsModel == "xtab-1") {
    //Short leads
    action = 1;
    custom_commit = "SET_LEAD_STATUS_USER_DETAILS_SO";
  } else if (request.tabsModel == "xtab-2") {
    //WIP leads
    action = 2;
    custom_commit = "SET_LEAD_STATUS_USER_DETAILS_WIP";
  } else if (request.tabsModel == "xtab-3") {
    //Rejected
    action = 3;
    custom_commit = "SET_LEAD_STATUS_USER_DETAILS_REJECTED";
  } else {
    //Implemented
    action = 4;
    custom_commit = "SET_LEAD_STATUS_USER_DETAILS_IMPLEMENTATION";
  }

  return api
    .get(
      "list-of-lead-details-based-on-role-so/" + request.userId + "/" + action
    )
    .then(response => {
      let data = {
        apiStatusCode: response.status,
        apiPending: false,
        apiSuccess: true,
        apiData: response.data.data,
      };

      // START=> COMMIT with data received'
      commit(custom_commit, response.data.data);
      // END=> COMMIT with data received'
    });
};
