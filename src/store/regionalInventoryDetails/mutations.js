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
  SET_INCOMING_POD_LIST_DETAILS = (state, payload) => {
 // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
  state.regionalInventoryPodDetails = payload;
},
SET_FETCH_SINGLE_POD_DETAILS= (state, payload) => {
  console.log("state ADDITIONAL TIDPayload MISMATCh: ------------ : " +  JSON.stringify(state))
  console.log("ADDITIONAL TIDPayload MISMATCh: ------------ : " +  JSON.stringify(payload))
  state.singlePodData = payload;
  
  console.log("state.singlePodData ADDITIONAL TIDPayload MISMATCh: ------------ : " +  JSON.stringify(state.singlePodData))
},
  SET_INCOMING_STOCKS_POD_LIST_DETAILS= (state, payload) => {
    console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.regionalInventoryStocksPodDetails = payload;
  },
  SET_SPARE_PARTS_SETS_AND_COUNTS= (state, payload) => {
   // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.sparePartsSetsAndCounts = payload;
  },
  SET_INCOMING_ALLOCATED_SO_POD_LIST_DETAILS= (state, payload) => {
   // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.regionalInventoryAllocatedSoPodDetails = payload;
  },
  SET_PHONEPE_INCOMING_POD_LIST_DETAILS = (state, payload) => {
    // console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
     state.PhonepeRegionalInventoryAllocatedSoPodDetails = payload;
   },
   SET_PHONEPE_INCOMING_STOCKS_POD_LIST_DETAILS= (state, payload) => {
    console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.PhonepeRegionalInventoryStocksPodDetails = payload;
  },

  SET_PHONEPE_INCOMING_ALLOCATED_SO_POD_LIST_DETAILS = (state, payload) => {
   console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.regionalInventoryPhonepeAllocatedSoPodDetails = payload;
  },

  SET_PHONEPE_SPARE_PARTS_SETS_AND_COUNTS = (state, payload) => {
   console.log("ADDITIONAL TIDPayload : ------------ : " +  JSON.stringify(payload))
    state.PhonepeSparePartsSetsAndCounts = payload;
  }

  
