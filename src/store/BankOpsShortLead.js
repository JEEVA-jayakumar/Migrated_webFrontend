import api from "./api.js";
import Vue from 'vue'

/* START >> Store modules => Super Admin Users */
const BankOpsShortLead = {
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
    /*START >> Module>> all allMerchantTrackerData data*/
    allMerchantTrackerData: [],
    /*END >> Module>> leads allMerchantTrackerData data*/

    /*START >> Module>> all allShortLeadData data*/
    allShortLeadData: [],
    /*END >> Module>> leads allShortLeadData data*/

    /*START >> Module>> all payment tracker data*/
    paymentTrackerData: [],
    /*END >> Module>> leads payment tracker data*/

    /*START >> Module>> selectOptionsRSMdata data*/
    selectOptionsRSMdata: [],
    /*END >> Module>> selectOptionsRSMdata data*/

    /*START >> Module>> selectOptionsASMdata data*/
    selectOptionsASMdata: [],
    /*END >> Module>> selectOptionsASMdata data*/

    /*START >> Module>> selectOptionsLeadSource data*/
    selectOptionsLeadSource: [],
    /*END >> Module>> selectOptionsLeadSource data*/

    /*START >> Module>> selectOptionsLeadSourceBank data*/
    selectOptionsLeadSourceBank: [],
    /*END >> Module>> selectOptionsLeadSourceBank data*/

    /*START >> Module>> selectOptionsLeadSource data*/
    leadDetailsById: [],
    /*END >> Module>> selectOptionsLeadSource data*/
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
    },

    /*START >> Module>> SET_ALL_OPEN_MERCHANT_TRACKER_DATA data*/
    SET_ALL_OPEN_MERCHANT_TRACKER_DATA(state, payload) {
      state.allMerchantTrackerData = payload;
    },
    /*END >> Module>> SET_ALL_OPEN_MERCHANT_TRACKER_DATA data*/

    /*START >> Module>> payment tracker data*/
    SET_SHORT_LEAD_DATA(state, payload) {
      state.allShortLeadData = payload;
    },
    /*END >> Module>> payment tracker data*/

    /*START >> Module>> payment tracker data*/
    SET_LEAD_DETAILS_IN_DETAIL(state, payload) {
      state.leadDetailsById = payload;
    },
    /*END >> Module>> payment tracker data*/

    /*START >> Module>> payment tracker data*/
    SET_ALL_PAYMENT_VERIFICATION_DATA(state, payload) {
      state.paymentTrackerData = payload;
    },
    /*END >> Module>> payment tracker data*/

    /*START >> Module>> RSM data*/
    SET_RSM_DATA(state, payload) {
      state.selectOptionsRSMdata = payload;
    },
    /*END >> Module>> RSM data*/

    /*START >> Module>> ASM data*/
    SET_ASM_DATA(state, payload) {
      state.selectOptionsASMdata = payload;
    },
    /*END >> Module>> ASM data*/

    /*START >> Module>> lead source data*/
    SET_LEAD_SOURCE_DATA(state, payload) {
      state.selectOptionsLeadSource = payload;
    },
    /*END >> Module>> lead source data*/

    /*START >> Module>> lead source data*/
    SET_LEAD_SOURCE_BANK_DATA(state, payload) {
      state.selectOptionsLeadSourceBank = payload;
    },
    /*END >> Module>> lead source data*/

  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {

    /*START >> Module>> all operations head exception lists*/
    FETCH_ALL_OPEN_MERCHANT_TRACKER_DATA({
      commit
    }, request) {
      return api
        .get("bankops-merchant-tracker-list")
        .then(response => {
          // START=> COMMIT with data received'
          commit("SET_ALL_OPEN_MERCHANT_TRACKER_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
    },
    /*END >> Module>> all operations head exception lists*/

    /*START >> Module>> all payment tracker*/
    CREATE_SHORT_LEAD({
      commit
    }, request) {
      return api
        .post("create-short-lead-bankops", request)
    },
    /*END >> Module>> all payment tracker*/

    /*START >> Module>> all payment tracker*/
    FETCH_SHORT_LEAD_DATA({
      commit
    }, request) {
      return api
        .get("bankops-session-tracker-list")
        .then(response => {
          // START >> Commit response data
          commit("SET_SHORT_LEAD_DATA", response.data.data)
          // END >> Commit response data
        })
    },
    /*END >> Module>> all payment tracker*/

    /*START >> Module>> all payment tracker*/
    FETCH_LEAD_DETAILS_IN_DETAIL({
      commit
    }, request) {
      return api
        .get("assigned-lead-details/" + request)
        .then(response => {
          // START >> Commit response data
          commit("SET_LEAD_DETAILS_IN_DETAIL", response.data.data)
          // END >> Commit response data
        })
    },
    /*END >> Module>> all payment tracker*/

    /*START >> Module>> all payment tracker*/
    FETCH_RSM_DATA({
      commit
    }, request) {
      return api
        .get("asm-rsm-list-based-on-region")
        .then(response => {
          // START >> Commit response data
          commit("SET_RSM_DATA", response.data.data)
          // END >> Commit response data
        })
    },
    /*END >> Module>> all payment tracker*/

    /*START >> Module>> all payment tracker*/
    FETCH_ALL_LEAD_SOURCE_DATA({
      commit
    }, request) {
      return api
        .get("lead-source-list")
        .then(response => {
          // START >> Commit response data
          commit("SET_LEAD_SOURCE_DATA", response.data.data)
          // END >> Commit response data
        })
    },
    /*END >> Module>> all payment tracker*/

    /*START >> Module>> all payment tracker*/
    FETCH_ALL_LEAD_SOURCE_BANK_DATA({
      commit
    }, request) {
      return api
        .get("lead-source-bankuser")
        .then(response => {
          // START >> Commit response data
          commit("SET_LEAD_SOURCE_BANK_DATA", response.data.data)
          // END >> Commit response data
        })
    },
    /*END >> Module>> all payment tracker*/

    /*START >> Module>> all payment tracker*/
    FETCH_ASM_DATA({
      commit
    }, request) {
      return api
        .get("asm-rsm-list-based-on-region/" + request)
        .then(response => {
          // START >> Commit response data
          commit("SET_ASM_DATA", response.data.data)
          // END >> Commit response data
        })
    },
    /*END >> Module>> all payment tracker*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getAllShortLeadInfo(state) {
      return state.allShortLeadData;
    },
    getAllShortLeadInfoById(state) {
      return state.leadDetailsById;
    },
    getAllMerchantTrackerInfo(state) {
      return state.allMerchantTrackerData;
    },
    getPaymentTrackerInfo(state) {
      return state.paymentTrackerData;
    },
    getSelectOptionsRSMInfo(state) {
      return state.selectOptionsRSMdata;
    },
    getSelectOptionsASMInfo(state) {
      return state.selectOptionsASMdata;
    },
    getSelectOptionsLeadSourceInfo(state) {
      return state.selectOptionsLeadSource;
    },
    getSelectOptionsLeadSourceBankInfo(state) {
      return state.selectOptionsLeadSourceBank;
    },
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default BankOpsShortLead;
