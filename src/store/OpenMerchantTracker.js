import api from "./api.js";

/* START >> Store modules => Super Admin Users */
const OpenMerchantTracker = {
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
    openMerchantTrackerData: [],
    openAggMerchantTrackerData: [],
  },
  /*END << State setup goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>MUTATIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> Mutation actions goes here */
  mutations: {
    API_RESPONSE_LOG(state, payload) {
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
    /*START >> Module>> payment tracker data*/
    SET_ALL_OPEN_MERCHANT_TRACKER_DATA(state, payload) {
      console.log("SET_ALL_OPEN_MERCHANT_TRACKER_DATA >>", payload);
      state.openMerchantTrackerData = payload;
    },
    SET_ALL_AGG_OPEN_MERCHANT_TRACKER_DATA(state, payload) {
      console.log("SET_ALL_AGG_OPEN_MERCHANT_TRACKER_DATA >>", payload);
      state.openAggMerchantTrackerData = payload;
    }
    /*END >> Module>> payment tracker data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {

    FETCH_ALL_AGG_OPEN_MERCHANT_TRACKER_DATA({
      commit
    }, request) {
      return api
        .get("open-merchant-tracker-list")
        .then(response => {
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);

          // START=> COMMIT with data received'
          commit("SET_ALL_AGG_OPEN_MERCHANT_TRACKER_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => {
          let data = {
            apiStatusCode: error.status,
            apiPending: false,
            apiFailure: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);
          console.log("API_RESPONSE_LOG", error);
        });
    },
    /*END >> Module>> all operations head exception lists*/

     /*START >> Module>> all operations head exception lists*/
     FETCH_ALL_OPEN_MERCHANT_TRACKER_DATA({
      commit
    }, request) {
      return api
        .get("aggregator-inventory/agg-open-merchant-tracker-list/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]))
        .then(response => {
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);

          // START=> COMMIT with data received'
          commit("SET_ALL_OPEN_MERCHANT_TRACKER_DATA", response.data.data);
          console.log("TABLE DATA",JSON.stringify(response.data.data));
          // END=> COMMIT with data received'
        })
        .catch(error => {
          let data = {
            apiStatusCode: error.status,
            apiPending: false,
            apiFailure: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);
          console.log("API_RESPONSE_LOG", error);
        });
    },
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getOpenMerchantTracker(state) {
      return state.openMerchantTrackerData;
    },
    getAggOpenMerchantTracker(state) {
      return state.openAggMerchantTrackerData;
    }
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default OpenMerchantTracker;
