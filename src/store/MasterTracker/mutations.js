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
SET_MASTER_TRACKER_LIST = (state, payload) => {
console.log("MASTER TRACKER Payload : ------------ : " +  JSON.stringify(payload))
state.masterTrackerList = payload;
},

/*AGGREGATORS API */
SET_AGGREGATORS_MASTER_TRACKER_LIST = (state, payload) => {
  console.log("AGGREGATORS MASTER TRACKER Payload : ------------ : " +  JSON.stringify(payload))
  state.AggregatorsMasterTrackerList = payload;
  }

/*AGGREGATORS API */

export const SET_APPROVE_LOST_STOLEN_DEVICE= (state, payload) => {
console.log("LOST OR STOLEN Payload : ------------ : " +  JSON.stringify(payload))
state.ApproveLostOrStolenData = payload;
}
