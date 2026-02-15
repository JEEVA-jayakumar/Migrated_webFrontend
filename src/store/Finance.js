import api from "./api.js";


/* START >> Store modules => Super Admin Users */
const Finance = {
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
      apiData: [],
    },
    /*START >> Module>> all payment tracker data*/
    paymentTrackerData: [],
    /*END >> Module>> leads payment tracker data*/

    /*START >> Module>> all payment tracker data*/
    financeApprovedData: [],
    /*END >> Module>> leads payment tracker data*/
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
        apiData: payload.apiData,
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
    SET_ALL_PAYMENT_VERIFICATION_DATA(state, payload) {
      console.log("SET_ALL_PAYMENT_VERIFICATION_DATA >>", payload);
      state.paymentTrackerData = payload;
    },
    /*END >> Module>> payment tracker data*/

    /*START >> Module>> payment tracker data*/
    SET_ALL_APPROVED_FINANCE_DATA(state, payload) {
      console.log("SET_ALL_APPROVED_FINANCE_DATA >>", payload);
      state.financeApprovedData = payload;
    },
    /*END >> Module>> payment tracker data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> all payment tracker*/
    FETCH_ALL_PAYMENT_TRACKER_DATA({ commit }, request) {
      if (request.pagination.sortBy == null) {
        return api
          .get(
            "finance-verification-tracker-list-paged?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter
          )
          .then(response => {
            // START=> COMMIT with data received'
            response.data.data.content.map(function (value, index) {
              Vue.set(value, "expand", false);
            });
            commit("SET_ALL_PAYMENT_VERIFICATION_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      } else {
        let sorting = request.pagination.descending ? "asc" : "desc";
        return api
          .get(
            "finance-verification-tracker-list-paged?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter +
            "&sort=" +
            request.pagination.sortBy +
            "&" +
            request.pagination.sortBy +
            ".dir=" +
            sorting
          )
          .then(response => {
            // START=> COMMIT with data received'
            response.data.data.content.map(function (value, index) {
              Vue.set(value, "expand", false);
            });
            commit("SET_ALL_PAYMENT_VERIFICATION_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      }
    },
    /*END >> Module>> all payment tracker*/

    /*START >> Module>> exception approval*/
    APPROVE_FINANCE_EXCEPTION({ commit }, request) {
      return api
        .post("verify-finance-exception/" + request.leadId, request)
        .then(response => {
          console.log(response);
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data,
          };
          commit("API_RESPONSE_LOG", data);
        });
    },
    /*END >> Module>> exception approval*/

    /*START >> Module>> exception approval*/
    REJECT_FINANCE_EXCEPTION({ commit }, request) {
      return api
        .post("verify-finance-exception/" + request.leadId, request)
        .then(response => {
          console.log(response);
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data,
          };
          commit("API_RESPONSE_LOG", data);
        });
    },
    /*END >> Module>> exception approval*/

    /*START >> Module>> Lead Rejection Datas*/
    REJECT_LEAD_EXCEPTION({ commit }, request) {
      return api
        .post("device-verification/" + request.leadId + "/0" ,request)
        .then(response => {
          console.log(response);
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data,
          };
          commit("API_RESPONSE_LOG", data);
        });
    },
    /*END >> Module>> Lead Rejection Datas*/

    /*START >> Module>> all FINANCE APPROVED tracker*/
    FETCH_ALL_APPROVED_FINANCE_DATA({ commit }, request) {
      if (request.pagination.sortBy == null) {
        return api
          .get(
            "finance-tracker-list-paged?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter
          )
          .then(response => {
            // START=> COMMIT with data received'
            commit("SET_ALL_APPROVED_FINANCE_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      } else {
        let sorting = request.pagination.descending ? "asc" : "desc";
        return api
          .get(
            "finance-tracker-list-paged?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter +
            "&sort=" +
            request.pagination.sortBy +
            "&" +
            request.pagination.sortBy +
            ".dir=" +
            sorting
          )
          .then(response => {
            // START=> COMMIT with data received'
            commit("SET_ALL_APPROVED_FINANCE_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      }
    },
    /*END >> Module>> all FINANCE APPROVED tracker*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getPaymentTrackerInfo(state) {
      return state.paymentTrackerData;
    },
    getAllApprovedFinaceData(state) {
      return state.financeApprovedData;
    },
  },
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default Finance;
