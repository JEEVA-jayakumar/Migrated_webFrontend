import Vue from "vue"
import api from "./api.js";

/* START >> Store modules => Super Admin Users */
function COMMON_FILE_DOWNLOAD(response) {
  return new Blob([response.data], {
    type: response.headers.get("content-type"),
  });
}

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
    /*END >> Module>> DEVICES_TYPES_DATA*/

    /*START >> Module>> device tracker inventory scanned data*/
    // FEED_DEVICE_BULK_UPLOAD_DATA
     /*START >> Module>> device tracker inventory scanned data*/
      /*START >> Module>> device tracker inventory scanned data*/
      // FEED_DEVICE_BULK_UPLOAD_DATA({
      //   commit,
      //   rootState
      // }, request) {
      //   return Vue.http
      //     .post(rootState.GlobalVariables.INVENTORY_BULKFILEUPLOADURL, request.file, {
      //       headers: {
      //         "Content-Type": 'multipart/form-data',
      //         "Authorization": "Token " + localStorage.getItem(
      //           "auth_token")
      //       }
      //     })
      //     .then(response => {
      //       commit("API_RESPONSE_LOG", true);
      //     })
      // },
       /*START >> Module>> device tracker inventory scanned data*/
    FEED_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.INVENTORY_BULKFILEUPLOADURL + '/' + request.device_type + '?invoiceNumber='+ request.invoiceNumber, request.file, {
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

    UPLOAD_EMI_DATAS({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.HITACHI_BRAND_EMI_UPLOAD_ACTION, request.file, {
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

  /* START AGGREGATORS DYNAMIC CODE*/
    // FEED_PHONEPE_DEVICE_BULK_UPLOAD_DATA({
    //   commit,
    //   rootState
    // }, request) {
    //   return Vue.http
    //     .post(rootState.GlobalVariables.PHONEPE_INVENTORY_BULKFILEUPLOADURL + '/' + request.device_type +'/' + request.aggregator, request.file, {
    //       headers: {
    //         "Content-Type": 'multipart/form-data',
    //         "Authorization": "Token " + localStorage.getItem(
    //           "auth_token")
    //       }
    //     })
    //     .then(response => {
    //       commit("API_RESPONSE_LOG", true);
    //     })
    // },
    /* END AGGREGATORS DYNAMIC CODE*/

    /* START AGGREGATORS STATIC CODE*/
    FEED_PHONEPE_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.PHONEPE_INVENTORY_BULKFILEUPLOADURL + '/' + request.device_type +'/'+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]), request.file, {
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


    AGGREGATOR_REFURBISH_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.AGGREGATOR_REFURBISH_INVENTORY_BULKFILEUPLOADURL + '/'+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]), request.file, {
          // headers: {
          //   "Content-Type": 'multipart/form-data',
          //   "Authorization": "Token " + localStorage.getItem(
          //     "auth_token")
          // }
          responseType: "arraybuffer",
        })
        .then(response => {
          commit("API_RESPONSE_LOG", true);
          // let blob = COMMON_FILE_DOWNLOAD(response);
          console.log("Response",response.headers.map['content-type'][0]);
          var contentType = response.headers.map['content-type'][0]
          let blob = new Blob([response.data], { type:  contentType });
          // const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "DeviceRefurbishmentRemarks.xlsx";  
          link.click();
        })
    },


    /* END AGGREGATORS STATIC CODE*/


    /* PHONEPE API END*/
    /*END >> Module>> inventory scan data*/
     FEED_SEND_TO_REPAIR_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return Vue.http
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

    /*AGGREGATORS API */

    FEED_AGGREGATORS_SEND_TO_REPAIR_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return Vue.http
        .put("aggregator-inventory/agg-add-bulk-sent-to-repair-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/3", request.file, {
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

    /*AGGREGATORS API */
    FEED_MOVIE_TO_SCRAP_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return Vue.http
        .put(rootState.GlobalVariables.INVENTORY_BULKFILEUPLOADURL_AGGREGATORSSENDTOREPAIR, request.file, {
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

     /*AGGREGATORS API */
     FEED_AGGREGATORS_MOVIE_TO_SCRAP_DEVICE_BULK_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return Vue.http
        .put("aggregator-inventory/agg-add-bulk-sent-to-repair-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/4", request.file, {
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

      /*AGGREGATORS API */

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
