import api from "./api.js";


/* START >> Store modules => Super Admin Users */
const ExceptionQueue = {
  namespaced: true,

  /* ===================================
    >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> State setup goes here */
  state: {
    allStatesData: [],
    apiStatusLog: {
      apiStatusCode: null,
      apiPending: false,
      apiSuccess: false,
      apiFailure: false,
      apiData: []
    },
    /*START >> Module>> all exception queue data*/
    exceptionQueueData: {
      KYCExceptionQueue: [],
      BankExceptionCount: [],
      PricingExceptionQueue: [],
      KYCExceptionCount: 0,
      BankExceptionCount: 0,
      PricingExceptionCount: 0
    }
    /*END >> Module>> leads exception queue data*/
  },
  /*END << State setup goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>MUTATIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> Mutation actions goes here */
  mutations: {
    API_RESPONSE_LOG(state, payload) {
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
    /*START >> Module>> exception queue data*/
    SET_ALL_EXCEPTION_QUEUE_DATA(state, payload) {
      console.log("SET_ALL_EXCEPTION_QUEUE_DATA >>", payload);
      state.exceptionQueueData = payload;
    }
    /*END >> Module>> exception queue data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {

    FEED_USER_DATA({
      commit
    }, request) {
      return api
        .post("user-test", request)
    },

    /*START >> Module>> all exception queue*/
    FETCH_ALL_EXCEPTIONS_DATA({
      commit
    }, request) {
      return api
        .get("exceptionQueue")
        .then(response => {
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);
          console.log(
            "PASSED >> FETCH_ALL_EXCEPTIONS_DATA >>",
            response.data.data
          );
          // START=> COMMIT with data received'
          commit("SET_ALL_EXCEPTION_QUEUE_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
    },
    /*END >> Module>> all exception queue*/

    /*START >> Module>> exception kyc sat feedback*/
    FEED_SAT_EQ_KYC_FEEDBACK({
      commit
    }, request) {
      return api
        .post(
          "kyc-verification/" +
          request.leadId + '/' + request.defaultUrlValue, request.leadInformation
        )
    },
    /*END >> Module>> exception kyc sat feedback*/

    /*START >> Module>> exception kyc sat feedback*/
    FEED_SAT_EQ_BANK_FEEDBACK({
      commit
    }, request) {
      return api
        .post(
          "bank-verification/" +
          request.leadInformation.id + '/' + request.leadInformation.verifiedBanksubventionStatus,
          request
        )
        .then(response => {
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);
        })

    },
    /*END >> Module>> exception kyc sat feedback*/

    /*START >> Module>> exception kyc sat feedback*/
    UPLOAD_EXCEPTION_FILE({
      commit,
      rootState
    }, request) {
      return api
        .post(rootState.GlobalVariables.FILEUPLOADURL, request, {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem(
              "auth_token")
          }
        })
        .then(response => {
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);
          return response.data.data;
        })

    }
    /*END >> Module>> exception kyc sat feedback*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getExceptionQueueInfo(state) {
      return state.exceptionQueueData;
    }
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default ExceptionQueue;
