export const API_RESPONSE_LOG = (state, payload) => {
  let statusMessage;
  if (payload.apiStatusCode == 200) {
    statusMessage = "Success";
  } else if (payload.apiStatusCode == 409) {
    statusMessage = "Data confict!";
  } else if (payload.apiStatusCode == 400) {
    statusMessage = "Bad Request! Please try again";
  } else {
    statusMessage = "Oops! Something went wrong, please again";
  }
  state.apiStatusLog = {
    apiStatusCode: payload.apiStatusCode,
    apiStatusMessage: statusMessage,
    apiPending: payload.apiPending,
    apiSuccess: payload.apiSuccess,
    apiFailure: payload.apiFailure,
    apiData: payload.apiData,
  };
};
export const SET_LEAD_STATUS_USER_DETAILS = (state, payload) => {
  state.leadStatusUserDetails = payload;
};
export const SET_LEAD_STATUS_USER_DETAILS_SO = (state, payload) => {
  state.leadStatusUserDetails_ShortLeads = payload;
};
export const SET_LEAD_STATUS_USER_DETAILS_WIP = (state, payload) => {
  state.leadStatusUserDetails_WIP = payload;
};
export const SET_LEAD_STATUS_USER_DETAILS_REJECTED = (state, payload) => {
  state.leadStatusUserDetails_Rejected = payload;
};
export const SET_LEAD_STATUS_USER_DETAILS_IMPLEMENTATION = (state, payload) => {
  state.leadStatusUserDetails_Implementation = payload;
};
export const SET_SALES_MANAGER_LEAD_STATUS_USER_DETAILS = (state, payload) => {
  state.userBasedLeadsData = payload;
};
