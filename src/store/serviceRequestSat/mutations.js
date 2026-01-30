export const API_RESPONSE_LOG = (state, payload) => {
    console.log("API_RESPONSE >>", payload);
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
      apiData: payload.apiData
    };
    console.log("state.apiPending >>", state.apiStatusLog.apiPending);
    console.log("state.apiSuccess >>", state.apiStatusLog.apiSuccess);
    console.log("state.apiFailure >>", state.apiStatusLog.apiFailure);
    console.log(
      "state.apiStatusMessage >>",
      state.apiStatusLog.apiStatusMessage
    );
  },
  SET_UNASSIGNED_SERVICE_REQUEST_DATAS = (state, payload) => {
  // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
  state.serviceRequestUnassignedDatas = payload;
},
SET_ASSIGNED_SERVICE_REQUEST_DATAS = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.serviceRequestassignedDatas = payload;
  },
  SET_CLOSED_SERVICE_REQUEST_DATAS = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.serviceRequestClosedDatas = payload;
  },
  SET_CANCELLED_SERVICE_REQUEST_DATAS = (state, payload) => {
     console.log("SET_CANCELLED_SERVICE_REQUEST_DATAS: ------------ : " +  JSON.stringify(payload))
    state.serviceRequestCancelledDatas = payload;
  },
  SET_SERVICE_REQUEST_COUNT_DETAILS = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.serviceRequestCountDatas = payload;
  }