import Vue from 'vue';
import api from "./api.js";
import _ from 'lodash';


/* START >> Store modules => Super Admin Users */
const SalesManagerException = {
  namespaced: true,

  /* ===================================
    >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> State setup goes here */
  state: {
    apiStatusLog: {
      apiStatusCode: null,
      apiPending: false,
      apiSuccess: false,
      apiFailure: false,
      apiData: []
    },
    /*START >> Module>> short lead data*/
    shortLeadData: [],
    /*END >> Module>> short lead data*/
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
    },

    /*START >> Module>> short lead data*/
    SET_SHORT_LEAD_DATA(state, payload) {
      state.shortLeadData = payload;
    },
    /*END >> Module>> short lead data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {

    /*START >> Module>> short lead data*/
    FETCH_SHORT_LEAD_DATA({
      commit
    }, request) {
      return api
        .get("lead-information-details/" + request)
        .then(response => {
          commit("API_RESPONSE_LOG", true);
          // START=> COMMIT with data received'
          commit("SET_SHORT_LEAD_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> short lead data*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getShortLeadInfo(state) {
      return state.shortLeadData;
    },
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SalesManagerException;
