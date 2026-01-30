import api from "./api.js";

/* START >> Store modules => Super Admin Users */
const InventoryScanAddDevice = {
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

    /*START >> Module>> all allInventoryDevicesTypesData data*/
    allInventoryDevicesTypesData: [],
    /*END >> Module>> allInventoryDevicesTypesData data*/

    allPhonepeInventoryDevicesTypesData: [],

    /*START >> Module>> all inventory device scanned data*/
    deviceAddInventoryTrackerScannedItems: [],
    /*END >> Module>> all inventory device scanned data*/
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
        apiData: payload.apiData,
      };
    },

    /*START >> Module>> device types data*/
    SET_ALL_INVENTORY_DEVICES_TYPES_DATA(state, payload) {
      state.allInventoryDevicesTypesData = payload;
    },
    /*END >> Module>> device types data*/

    /* PHONE PE API */
    SET_FEED_PHONE_PE_DEVICE_SCAN_BY_ID_DATA(state, payload) {
      state.allPhonepeInventoryDevicesTypesData = payload;
    },

    /* PHONE PE API */




    /*START >> Module>> device faulty tracker inventory scanned data*/
    SET_ADD_REACTIVE_SCANNED_DEVICE_DATA(state, payload) {
      state.deviceAddInventoryTrackerScannedItems = payload;
    },
    /*END >> Module>> device faulty tracker inventory scanned data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> DEVICES_TYPES_DATA*/
    FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA({ commit }, request) {
      return api.get("device").then(response => {
        commit("API_RESPONSE_LOG", true);
        // START=> COMMIT with data received'
        commit("SET_ALL_INVENTORY_DEVICES_TYPES_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    /*END >> Module>> DEVICES_TYPES_DATA*/

    /*START >> Module>> device tracker inventory scanned data*/
    REACTIVE_ADD_SCANNED_DEVICE_DATA({ commit }, request) {
      // START=> COMMIT with data receiADD_ved'
      commit("SET_ADD_REACTIVE_SCANNED_DEVICE_DATA", request);
      // END=> COMMIT with data received'
    },
    /*END >> Module>> inventory scan data*/

    /*START >> Module>> device tracker inventory scanned data*/
    FEED_DEVICE_SCAN_BY_ID_DATA({ commit }, request) {
      return api
        .post("add-device-to-central-inventory/" + request.request.device.id + "?invoiceNumber=" + request.invoiceNumber, request.request)
        .then(response => {
          commit("API_RESPONSE_LOG", true);
          // START=> COMMIT with data received'
          commit("SET_ALL_INVENTORY_DEVICES_TYPES_DATA", []);
          // END=> COMMIT with data received'
        });
    },
    /*END >> Module>> inventory scan data*/
    /* PHONE PE API */

    /* START AGGREGATORS DYNAMIC CODE */

    // FEED_PHONE_PE_DEVICE_SCAN_BY_ID_DATA({ commit }, request) {
    //   console.log("FEED_PHONE_PE_DEVICE_SCAN_BY_ID_DATA ---->",JSON.stringify(request))
    //   return api
    //     .post("aggregator-inventory/agg-add-device-to-central-inventory/" + request.deviceId + "/"+request.aggregatorId, request.request)
    //     .then(response => {
    //       commit("API_RESPONSE_LOG", true);
    //       // START=> COMMIT with data received'
    //       commit("SET_FEED_PHONE_PE_DEVICE_SCAN_BY_ID_DATA", []);
    //       // END=> COMMIT with data received'
    //     });
    // },

    /* END AGGREGATORS DYNAMIC CODE */

    /* START AGGREGATORS STATIC CODE */

    FEED_PHONE_PE_DEVICE_SCAN_BY_ID_DATA({ commit }, request) {
      console.log("FEED_PHONE_PE_DEVICE_SCAN_BY_ID_DATA ---->", JSON.stringify(request))
      return api
        .post("aggregator-inventory/agg-add-device-to-central-inventory/" + request.deviceId + "/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]), request.request)
        .then(response => {
          commit("API_RESPONSE_LOG", true);
          // START=> COMMIT with data received'
          commit("SET_FEED_PHONE_PE_DEVICE_SCAN_BY_ID_DATA", []);
          // END=> COMMIT with data received'
        });
    },
    /* END AGGREGATORS STATIC CODE */

    /* PHONE PE API */
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getAllInventoryDevicesTypesData(state) {
      return state.allInventoryDevicesTypesData;
    },
    /*Phonepe api */

    getAllPhonepeInventoryDevicesTypesData(state) {
      return state.allPhonepeInventoryDevicesTypesData;
    },
    /*Phonepe api */
    getAddDeviceScannedItems(state) {
      return state.deviceAddInventoryTrackerScannedItems;
    },
  },
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default InventoryScanAddDevice;
