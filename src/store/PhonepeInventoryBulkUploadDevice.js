
import api from "./api.js";

/* START >> Store modules => Super Admin Users */
const InventoryBulkUploadDevice = {
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

    /*START >> Module>> all allInventoryDevicesTypesData data*/
    allInventoryDevicesTypesData: [],
    /*END >> Module>> allInventoryDevicesTypesData data*/

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

    /*START >> Module>> device types data*/
    SET_ALL_INVENTORY_DEVICES_TYPES_DATA(state, payload) {
      console.log("SET_ALL_INVENTORY_DEVICES_TYPES_DATA >>", payload);
      state.allInventoryDevicesTypesData = payload;
    },
    /*END >> Module>> device types data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {

    /*START >> Module>> DEVICES_TYPES_DATA*/
    FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA({
      commit
    }, request) {
      return api
        .get("device")
        .then(response => {
          console.log(
            "RESPONSE >> PASSED >> FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
            response
          );
          commit("API_RESPONSE_LOG", true);
          console.log(
            "PASSED >> FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA >>",
            response.data.data
          );
          // START=> COMMIT with data received'
          commit("SET_ALL_INVENTORY_DEVICES_TYPES_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
    },
       /*START >> Module>> device tracker inventory scanned data*/
    FEED_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return api
        .post(rootState.GlobalVariables.INVENTORY_BULKFILEUPLOADURL + '/' + request.device_type, request.file, {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem(
              "auth_token")
          }
        })
        .then(response => {
          commit("API_RESPONSE_LOG", true);
        })
    },
  /* PHONEPE API START*/
    FEED_PHONEPE_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return api
        .post(rootState.GlobalVariables.PHONEPE_INVENTORY_BULKFILEUPLOADURL + '/' + request.device_type +'/' + request.aggregator, request.file, {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem(
              "auth_token")
          }
        })
        .then(response => {
          commit("API_RESPONSE_LOG", true);
        })
    },
    // aggregator-inventory/add-bulk-device-to-agg-central-inventory
    /* PHONEPE API END*/
    /*END >> Module>> inventory scan data*/
     FEED_PHONEPE_SEND_TO_REPAIR_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return api
        .put(rootState.GlobalVariables.INVENTORY_BULKFILEUPLOADURL_SENDTOREPAIR, request.file, {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem(
              "auth_token")
          }
        })
        .then(response => {
          commit("API_RESPONSE_LOG", true);
        })
    },
    FEED_PHONEPE_MOVIE_TO_SCRAP_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return api
        .put(rootState.GlobalVariables.INVENTORY_BULKFILEUPLOADURL_MOVEDTOSCRAP, request.file, {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem(
              "auth_token")
          }
        })
        .then(response => {
          commit("API_RESPONSE_LOG", true);
        })
    },

  },
  /*END << All actions like vuex, goes here */

 
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getAllInventoryDevicesTypesData(state) {
      return state.allInventoryDevicesTypesData;
    },
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default InventoryBulkUploadDevice;
