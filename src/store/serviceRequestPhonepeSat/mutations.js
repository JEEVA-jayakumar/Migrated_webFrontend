export const API_RESPONSE_LOG = (state, payload) => {
    console.log('API_RESPONSE >>', payload)
    let statusMessage
    if (payload.apiStatusCode == 200) {
      statusMessage = 'Success'
    } else if (payload.apiStatusCode == 409) {
      statusMessage = 'Data confict!'
    } else if (payload.apiStatusCode == 400) {
      statusMessage = 'Bad Request! Please try again'
    } else {
      statusMessage = 'Oops! Something went wrong, please again'
    }
    state.apiStatusLog = {
      apiStatusCode: payload.apiStatusCode,
      apiStatusMessage: statusMessage,
      apiPending: payload.apiPending,
      apiSuccess: payload.apiSuccess,
      apiFailure: payload.apiFailure,
      apiData: payload.apiData
    }
    // console.log("state.apiPending >>", state.apiStatusLog.apiPending);
    // console.log("state.apiSuccess >>", state.apiStatusLog.apiSuccess);
    // console.log("state.apiFailure >>", state.apiStatusLog.apiFailure);
    // console.log(
    //   "state.apiStatusMessage >>",
    //   state.apiStatusLog.apiStatusMessage
    // );
  },
  SET_PHONEPE_UNASSIGNED_SERVICE_REQUEST_DATAS = (state, payload) => {
  // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.serviceRequestPhonepeUnassignedDatas = payload
  },
  SET_PHONEPE_ASSIGNED_TO_REGION = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
      state.PhonepeAssignToRegion = payload
    },
  SET_PHONEPE_ASSIGNED_SERVICE_REQUEST_DATAS = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.serviceRequestPhonepeAssignedDatas = payload
  },
  SET_PHONEPE_CLOSED_SERVICE_REQUEST_DATAS = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.serviceRequestPhonepeClosedDatas = payload
  },
  SET_PHONEPE_CANCELLED_SERVICE_REQUEST_DATAS = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.serviceRequestPhonepeCancelledDatas = payload
  },
  SET_PHONEPE_SERVICE_REQUEST_COUNT_DETAILS = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.serviceRequestPhonepeCountDatas = payload
  },
  SET_FETCH_PHONEPE_REOPEN_TICKET = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.serviceRequestReopenTicket = payload
  },
  
  SET_FETCH_PHONEPE_REOPENED_ASSIGNED_TICKET = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.phonepeAssignedReopenTicket = payload;
  },

SET_PHONEPE_OPENED_TICKETS = (state, payload) => {
  // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
  state.phonepeOpenedTickets = payload
},

  SET_PHONEPE_RESOLVED_TICKET = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.phonepeResolvedTickets = payload;
  },

  SET_CRM_LOGS_LISTS = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.crmLogsLists = payload;
  },

  SET_ASSIGN_HISTORY_REMARKS_LIST = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.assignHistoryLists = payload;
  };
