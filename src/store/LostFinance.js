import { or } from '@vuelidate/validators';
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
    lostDatas: [],
    posInventoryDatas: [],
    PhonepeLostDatas: []
    /*END >> Module>> leads payment tracker data*/

    /*START >> Module>> all payment tracker data*/
    // financeApprovedData: [],
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
    SET_LOST_FINANCE_DATAS(state, payload) {
      console.log("SET_LOST_FINANCE_DATAS >>", payload);
      state.lostDatas = payload;
    },
    /*END >> Module>> payment tracker data*/

    /*START >> Module>> payment tracker data*/
    SET_POS_INVENTORY_FINANCE(state, payload) {
      console.log("SET_POS_INVENTORY_FINANCE >>", payload);
      state.posInventoryDatas = payload;
    },
    /*END >> Module>> payment tracker data*/

    /*PHONEPE MUTATION START */
    SET_PHONEPE_LOST_FINANCE_DATAS(state, payload) {
      console.log("SET_PHONEPE_LOST_FINANCE_DATAS >>", payload);
      state.PhonepeLostDatas = payload;
    },


    /*PHONEPE MUTATION END */

    /*START >> Module>> payment tracker data*/
    // SET_ALL_APPROVED_FINANCE_DATA(state, payload) {
    //   console.log("SET_ALL_APPROVED_FINANCE_DATA >>", payload);
    //   state.financeApprovedData = payload;
    // },
    /*END >> Module>> payment tracker data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> all payment tracker*/
    FETCH_LOST_FINANCE_DATAS({ commit }, request) {
      if (request.pagination.sortBy == null) {
        return api
          .get(
            "search-device-by-status/8?page=" +
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
            commit("SET_LOST_FINANCE_DATAS", response.data.data);
            console.log("FInance DATAS---------------->" + JSON.stringify(response.data.data))
            // END=> COMMIT with data received'
          });
      } else {
        let sorting = request.pagination.descending ? "asc" : "desc";
        return api
          .get(
            "search-device-by-status/8?page=" +
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
            commit("SET_LOST_FINANCE_DATAS", response.data.data);
            console.log("FInance DATAS---------------->" + JSON.stringify(response.data.data))
            // END=> COMMIT with data received'
          });
      }
    },
/*START >> Module>> all payment tracker*/
    FETCH_POS_INVENTORY_FINANCE({ commit }, request) {
      if (request.pagination.sortBy == null) {
        return api
          .get(
            "device-finance-data?page=" +
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
            commit("SET_POS_INVENTORY_FINANCE", response.data.data);
            console.log("FInance DATAS---------------->" + JSON.stringify(response.data.data))
            // END=> COMMIT with data received'
          });
      } else {
        let sorting = request.pagination.descending ? "asc" : "desc";
        return api
          .get(
            "device-finance-data?page=" +
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
            commit("SET_POS_INVENTORY_FINANCE", response.data.data);
            console.log("FInance DATAS---------------->" + JSON.stringify(response.data.data))
            // END=> COMMIT with data received'
          });
      }
    },

    /* START PHONEPE FINANCE LOST OR STOLEN */

    FETCH_PHONEPE_LOST_FINANCE_DATAS({ commit }, request) {
      if (request.pagination.sortBy == null) {
        return api
          .get(
            "search-device-by-status/8?page=" +
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
            commit("SET_PHONEPE_LOST_FINANCE_DATAS", response.data.data);
            console.log("FInance DATAS---------------->" + JSON.stringify(response.data.data))
            // END=> COMMIT with data received'
          });
      } else {
        let sorting = request.pagination.descending ? "asc" : "desc";
        return api
          .get(
            "search-device-by-status/8?page=" +
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
            commit("SET_PHONEPE_LOST_FINANCE_DATAS", response.data.data);
            console.log("FInance DATAS---------------->" + JSON.stringify(response.data.data))
            // END=> COMMIT with data received'
          });
      }
    },


    /* END PHONEPE FINANCE LOST OR STOLEN */
    /*START >> Module>> exception approval*/
    APPROVE_LOST_STOLEN_EXCEPTION({ commit }, request) {
      return api
        .post("submit-lost-or-stolen/9", request)
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

    /*PHONEPE LOST OR STOLEN START */
     
    APPROVE_PHONEPE_LOST_STOLEN_EXCEPTION({ commit }, request) {
      return api
        .post("submit-lost-or-stolen/9", request)
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

    

    /*PHONEPE LOST OR STOLEN END */

    /*START >> Module>> exception approval*/
    REJECT_LOST_STOLEN_EXCEPTION({ commit }, request) {
      console.log("Request----------->" + JSON.stringify(request))
      return api
        .post("submit-lost-or-stolen/10", request)
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
/*PHONEPE LOST OR STOLEN START */

    REJECT_PHONEPE_LOST_STOLEN_EXCEPTION({ commit }, request) {
      console.log("Request----------->" + JSON.stringify(request))
      return api
        .post("submit-lost-or-stolen/10", request)
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


    /*PHONEPE LOST OR STOLEN END */
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  //   /*START >> getter actions goes here*/
  getters: {
    getlostDatas(state) {
      return state.lostDatas;
    },  
/* PHONEPE GETTERS START */

//   /*START >> getter actions goes here*/
  getPosInventoryDatas(state) {
    return state.posInventoryDatas;
  },  


/* PHONEPE GETTERS START */
    getPhonepeLostDatas(state) {
      return state.PhonepeLostDatas;
    },

    /* PHONEPE GETTERS END */
    // getAllApprovedFinaceData(state) {
    //   return state.financeApprovedData;
    // },
  },
  //   /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default Finance;
