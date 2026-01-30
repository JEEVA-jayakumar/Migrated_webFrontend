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
      apiData: payload.apiData
    };
   
  },
  /*START >> Module>> all devices data*/
  SET_FETCH_GLOBAL_SEARCH_DATAS = (state, payload) => {
    state.globalSearchSerialNumber = payload;
  },
  SET_FETCH_DOC_VIEW = (state, payload) => {
    state.getdocview = payload;
  },
  SET_FETCH_DOC_VIEW_TICKET = (state, payload) => {
    state.getdocticket = payload;
  },
  SET_DOC_DOWNLOAD = (state, payload) => {
    state.getdocdownload = payload;
  },
  SET_FETCH_PHONE_PE_GLOBAL_SEARCH_DATAS= (state, payload) => {
    state.AggregatorsglobalSearchSerialNumber = payload;
  }
