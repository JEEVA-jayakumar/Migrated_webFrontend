import api from "./api.js";

/* START >> Store modules => Super Admin Users */
const SAT_RegionalInventoryAllocation = {
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
    currentPODnumber: null,
    currentDeviceId: null,
    /*START >> Module>> all allRegionalInventoryDevicesWithCount data*/
    allRegionalInventoryDevicesWithCount: [],
    allPhonePeRegionalInventoryDevicesWithCount:[],
    allInventorywithsoDevicesWithCount: [],
    allSoInventoryDevicesWithCount: [],
    /*END >> Module>> allRegionalInventoryDevicesWithCount data*/

    /*START >> Module>> all allRegionalInventorySerialNumberByDevice data*/
    allRegionalInventorySerialNumberByDevice: [],
   allAggregatorsRegionalInventorySerialNumberByDevice: [],
    /*END >> Module>> allRegionalInventorySerialNumberByDevice data*/

    /*START >> Module>> all allRegionalInventoryPODBasedDeviceDetailsWithCount data*/
    allRegionalInventoryPODBasedDeviceDetailsWithCount: [],
    /*END >> Module>> allRegionalInventoryPODBasedDeviceDetailsWithCount data*/
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

    /*START >> Module>> device data*/
    LOCAL_ACTION_SET_CURRENT_POD_DETAILS(state, payload) {
      state.currentPODnumber = payload.podNumber;
      state.currentDeviceId = payload.device;
    },
    /*END >> Module>> device data*/

    /*START >> Module>> device data*/
    SET_REGIONAL_INVENTORY_DEVICE_DETAILS_WITH_COUNT(state, payload) {
      state.allRegionalInventoryDevicesWithCount = payload;
    },
    /*PHONE PE API */
    SET_FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(state, payload) {
      state.allPhonePeRegionalInventoryDevicesWithCount = payload;
    },


    /*PHONE PE API */
    SET_INVENTORY_WITH_SO_DEVICE_DETAILS_WITH_COUNT(state, payload) {
      state.allInventorywithsoDevicesWithCount = payload;
    },

    SET_SO_INVENTORY_DEVICE_DETAILS_WITH_COUNT(state, payload) {
      state.allSoInventoryDevicesWithCount = payload;
    },
    /*END >> Module>> device data*/

    /*START >> Module>> serial number by device data*/
    SET_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(state, payload) {
      state.allRegionalInventorySerialNumberByDevice = payload;
    },
    /*END >> Module>> serial number by  device data*/
 /* Aggregators Api */

    
    SET_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(state, payload) {
      state.allAggregatorsRegionalInventorySerialNumberByDevice = payload;
    },
      /* Aggregators Api */

    /*START >> Module>> POD based device data*/
    SET_REGIONAL_INVENTORY_POD_BASED_DEVICE_DETAILS_WITH_COUNT(state, payload) {
      state.allRegionalInventoryPODBasedDeviceDetailsWithCount = payload;
    },
    /*END >> Module>> POD based device data*/
 /* PHONE PE MUTATION */
    SET_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT(state, payload) {
      state.allPhonePeRegionalInventoryPODBasedDeviceDetailsWithCount = payload;
    },
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////==============Regional inventory count============//////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> all regional inventory*/
    FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT({ commit }, request) {
      console.log("REGION ----->",JSON.stringify(request))
      return api
        .get("device-count-list-based-on-regional/" + request)
        .then(response => {
          // START=> COMMIT with data received'
          commit(
            "SET_REGIONAL_INVENTORY_DEVICE_DETAILS_WITH_COUNT",
            response.data.data
          );
          // END=> COMMIT with data received'
        });
      // .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> all regional inventory*/
  /* Phone PE API */

  /*START AGGREGATORS DYNAMIC CODE */
    /*  .get("agg-device-count-list-based-on-regional/"+request.region+"/"+request.aggregator.id) */
    // FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT({ commit }, request) {
    //   console.log("FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT ACTION--->",JSON.stringify(request))
    //   return api
    //   .get("aggregator-inventory/agg-device-count-list-based-on-regional/"+request.region+"/"+request.aggregator.id)
    //     .then(response => {
    //       // START=> COMMIT with data received'
    //       commit(
    //         "SET_FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
    //         response.data.data
    //       );
    //       // END=> COMMIT with data received'
    //     });
    //   // .catch(error => console.log("API_RESPONSE_LOG", error));
    // },

    /*END AGGREGATORS DYNAMIC CODE */

    /*START AGGREGATORS STATIC CODE */
     
    FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT({ commit }, request) {
      console.log("FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT ACTION--->",JSON.stringify(request))
      return api
      .get("aggregator-inventory/agg-device-count-list-based-on-regional/"+request.region+"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]))
        .then(response => {
          // START=> COMMIT with data received'
          commit(
            "SET_FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
            response.data.data
          );
          // END=> COMMIT with data received'
        });
      // .catch(error => console.log("API_RESPONSE_LOG", error));
    },

    /*END AGGREGATORS STATIC CODE */

    /* Phone PE API */
    /*START >> Module>> all regional inventory*/
    FETCH_INVENTORY_WITH_SO_DEVICE_DETAIL_WITH_COUNT({ commit }, request) {
      return api
        .get("device-count-list-based-on-billpartner/" + request)
        .then(response => {
          // START=> COMMIT with data received'
          commit(
            "SET_INVENTORY_WITH_SO_DEVICE_DETAILS_WITH_COUNT",
            response.data.data
          );
          // END=> COMMIT with data received'
        });
      // .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> all regional inventory*/
    /*START >> Module>> all regional inventory*/




    FETCH_SO_INVENTORY_DEVICE_DETAIL_WITH_COUNT({ commit }, request) {
      return api
        .get("device-count-list-based-on-billpartner/" + request)
        .then(response => {
          // START=> COMMIT with data received'
          commit(
            "SET_SO_INVENTORY_DEVICE_DETAILS_WITH_COUNT",
            response.data.data
          );
          // END=> COMMIT with data received'
        });
      // .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> all regional inventory*/
    /*START >> Module>> all regional inventory*/
    FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT_BY_ACTION(
      { commit },
      request
    ) {
      return api
        .get(
          "device-count-list-based-on-regional/" +
          request.regionId +
          "/" +
          request.action
        )
        .then(response => {
          // START=> COMMIT with data received'
          commit(
            "SET_REGIONAL_INVENTORY_DEVICE_DETAILS_WITH_COUNT",
            response.data.data
          );
          // END=> COMMIT with data received'
        });
      // .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> all regional inventory*/

    /*START >> Module>> serial number by device data*/
    FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE({ commit }, request) {
      if (request.device == undefined) {
        return api
          .get(
            "device-list-based-on-regional-device/" +
            request.region +
            "/" +
            request.action
          )
          .then(response => {
            console.log("_-_-_-_-_-/", response);
            commit("API_RESPONSE_LOG", response);
            // START=> COMMIT with data received'
            commit(
              "SET_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
              response.data.data
            );
            // END=> COMMIT with data received'
          })
          .catch(error => console.log("API_RESPONSE_LOG", error));
      } else {
        return api
          .get(
            "device-list-based-on-regional-device/" +
            request.region +
            "/" +
            request.action +
            "/" +
            request.device
          )
          .then(response => {
            commit("API_RESPONSE_LOG", response);
            // START=> COMMIT with data received'
            commit(
              "SET_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
              response.data.data
            );
            // END=> COMMIT with data received'
          });
        // .catch(error => console.log("API_RESPONSE_LOG", error));
      }
    },
    /*END >> Module>> serial number by device data*/
    /* AGGREGATORS API DETAILS */

    /* START AGGREGATORS DYNAMIC CODE */
      
    // FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE({ commit }, request) {
     
    //   console.log("ACTION DATAS FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE ---->",JSON.stringify(request))
    //   if (request.device == undefined) {
     
    //     return api
    //       .get(
    //         "aggregator-inventory/agg-device-list-based-on-regional-device/" +
    //         request.region.id +
    //         "/" +
    //         request.action +"/"+request.aggregator.id
    //       )
    //       .then(response => {
    //         console.log("_-_-_-_-_-/", response);
    //         commit("API_RESPONSE_LOG", response);
    //         // START=> COMMIT with data received'
    //         commit(
    //           "SET_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
    //           response.data.data
    //         );
    //         // END=> COMMIT with data received'
    //       })
    //       .catch(error => console.log("API_RESPONSE_LOG", error));
    //   } else {
      
    //     return api
    //       .get(
    //         "aggregator-inventory/agg-device-list-based-on-regional-device/" +
    //         request.region.id +
    //         "/" +
    //         request.action +
    //         "/" +
    //         request.device + "/"+ request.aggregator.id
    //       )
    //       .then(response => {
    //         commit("API_RESPONSE_LOG", response);
    //         // START=> COMMIT with data received'
    //         commit(
    //           "SET_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
    //           response.data.data
    //         );
    //         // END=> COMMIT with data received'
    //       });
    //     // .catch(error => console.log("API_RESPONSE_LOG", error));
    //   }
    // },

    /* END AGGREGATORS DYNAMIC CODE */

    /* START AGGREGATORS STATIC CODE */
     
    FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE({ commit }, request) {
     
      console.log("ACTION DATAS FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE ---->",JSON.stringify(request))
      if (request.device == undefined) {
     
        return api
          .get(
            "aggregator-inventory/agg-device-list-based-on-regional-device/" +
            request.region.id +
            "/" +
            request.action +"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])
          )
          .then(response => {
            console.log("_-_-_-_-_-/", response);
            commit("API_RESPONSE_LOG", response);
            // START=> COMMIT with data received'
            commit(
              "SET_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
              response.data.data
            );
            // END=> COMMIT with data received'
          })
          .catch(error => console.log("API_RESPONSE_LOG", error));
      } else {
      
        return api
          .get(
            "aggregator-inventory/agg-device-list-based-on-regional-device/" +
            request.region.id +
            "/" +
            request.action +
            "/" +
            request.device + "/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])
          )
          .then(response => {
            commit("API_RESPONSE_LOG", response);
            // START=> COMMIT with data received'
            commit(
              "SET_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
              response.data.data
            );
            // END=> COMMIT with data received'
          });
        // .catch(error => console.log("API_RESPONSE_LOG", error));
      }
    },

    /* END AGGREGATORS STATIC CODE */

      /* AGGREGATORS API DETAILS */

    /*START >> Module>> serial number by device data*/
    FEED_REGIONAL_INVENTORY_DAMAGED_DEVICE_SERIAL_NUMBER({ commit }, request) {
      return api.post(
        "add-damage-device-from-regional/" +
        request.region +
        "/" +
        request.podNumber,
        request.scannedDevices
      );
    },

    PHONEPE_FEED_REGIONAL_INVENTORY_DAMAGED_DEVICE_SERIAL_NUMBER({ commit }, request) {
      return api.post(
        "aggregator-inventory/agg-add-damage-device-from-regional/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/"+
        request.region +
        "/" +
        request.podNumber,
        request.scannedDevices
      );
    },
    /*END >> Module>> serial number by device data*/

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////==============Regional inventory Dispatch============//////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*START >> Module>> serial number by device data*/
    FETCH_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT(
      { commit },
      request
    ) {
      if (request.device == undefined) {
        return api
          .get("regional-dispatched-inventory-list/" + request.podNumber)
          .then(response => {
            // START=> COMMIT with data received'
            commit(
              "SET_REGIONAL_INVENTORY_POD_BASED_DEVICE_DETAILS_WITH_COUNT",
              response.data.data
            );
            // END=> COMMIT with data received'
          });
      } else {
        commit("LOCAL_ACTION_SET_CURRENT_POD_DETAILS", request);
        return api
          .get(
            "regional-dispatched-inventory-list/" +
            request.podNumber +
            "/" +
            request.device
          )
          .then(response => {
            // START=> COMMIT with data received'
            commit(
              "SET_REGIONAL_INVENTORY_POD_BASED_DEVICE_DETAILS_WITH_COUNT",
              response.data.data
            );
            // END=> COMMIT with data received'
          });
      }
    },
    /*END >> Module>> serial number by device data*/
    /* PHONE PE API START*/

    /* PHONE PE API END */
    /* PHONE PE API */
    FETCH_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT(
      { commit },
      request
    ) {
      console.log("FETCH_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT",JSON.stringify(request))
      if (request.device == undefined) {
        return api
          .get("aggregator-inventory/agg-regional-dispatched-inventory-list/" + request.request.podNumber +"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]))
          .then(response => {
            // START=> COMMIT with data received'
            commit(
              "SET_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT",
              response.data.data
            );
            return response;
            // END=> COMMIT with data received'
          });
      } else {
        commit("LOCAL_ACTION_SET_CURRENT_POD_DETAILS", request);
        return api
          .get(
            "aggregator-inventory/agg-regional-dispatched-inventory-list/" +
            request.podNumber +
            "/" +
            request.device + "/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])
          )
          .then(response => {
            // START=> COMMIT with data received'
            commit(
              "SET_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT",
              response.data.data
            );
            // END=> COMMIT with data received'
          });
      }
    },

     /* PHONE PE API */
    /*START >> Module>> serial number by device data*/
    VERIFY_DEVICE_WITH_POD_AND_DEVICE_ID({ commit }, request) {
      return api
        .put(
          "regional-verify-inbound-device/" +
          request.podNumber +
          "/" +
          request.device +
          "/" +
          request.serialNumber,
          request
        )
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          // START=> COMMIT with data received'
          commit(
            "SET_REGIONAL_INVENTORY_POD_BASED_DEVICE_DETAILS_WITH_COUNT",
            response.data.data
          );
          // END=> COMMIT with data received'
        });
    },
    /*END >> Module>> serial number by device data*/
 /* PHONE PE API START */
    
    AGGREGATORS_VERIFY_DEVICE_WITH_POD_AND_DEVICE_ID({ commit }, request) {
      return api
        .put(
          "aggregator-inventory/agg-regional-verify-inbound-device/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/" +
          request.podNumber +
          "/" +
          request.device +
          "/" +
          request.serialNumber,
          request
        )
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          // START=> COMMIT with data received'
          // commit(
          //   "SET_REGIONAL_INVENTORY_POD_BASED_DEVICE_DETAILS_WITH_COUNT",
          //   response.data.data
          // );
          // END=> COMMIT with data received'
        });
    },
    /* PHONE PE API END */

    /*START >> Module>> CONVERT device from inbound to active using pod nmber data*/
    CONVERT_INBOUND_TO_ACTIVE_DEVICE({ commit }, request) {
      return api
        .put("regional-convert-inbount-to-active-device/" + request.podNumber)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
        });
    },
    /*END >> Module>> CONVERT device from inbound to active using pod nmber data*/
  /* Phone Pe Api */
       
    AGGREGATORS_CONVERT_INBOUND_TO_ACTIVE_DEVICE({ commit }, request) {
      return api
        .put("aggregator-inventory/agg-regional-convert-inbount-to-active-device/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/" + request.podNumber)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
        });
    },
     /* Phone Pe Api */
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getAllRegionalInventoryDeviceDetailsWithCount(state) {
      console.log("getAllRegionalInventoryDeviceDetailsWithCount------------->>>>",JSON.stringify(state.allRegionalInventoryDevicesWithCount))
      return state.allRegionalInventoryDevicesWithCount;
    },
  /*PHONE PE API */
    
    getAllPhonePeRegionalInventoryDeviceDetailsWithCount(state) {
      console.log("PHONEPE GETTER VALUE------------->>>>",JSON.stringify(state.allPhonePeRegionalInventoryDevicesWithCount))
      return state.allPhonePeRegionalInventoryDevicesWithCount;
    },

     /*PHONE PE API */
    getAllInventorywithsoDeviceDetailsWithCount(state) {
      return state.allInventorywithsoDevicesWithCount;
    },
    getAllSoInventoryDeviceDetailsWithCount(state) {
      return state.allSoInventoryDevicesWithCount;
    },


    getCurrentPODNumber(state) {
      return state.currentPODnumber;
    },
    getCurrentDeviceId(state) {
      return state.currentDeviceId;
    },
    getAllRegionalInventorySerialNumbersByDevice(state) {
      return state.allRegionalInventorySerialNumberByDevice;
    },
  /* AGGREGATORS API */
    

    getAllAggregatorsRegionalInventorySerialNumbersByDevice(state) {
      return state.allAggregatorsRegionalInventorySerialNumberByDevice;
    },

    /* AGGREGATORS API */
    getAllRegionalInventoryPDOBasedDevicesWithCount(state) {
      return state.allRegionalInventoryPODBasedDeviceDetailsWithCount;
    },
  /* Phone Pe API Getter */

    getAllPhonePeRegionalInventoryPDOBasedDevicesWithCount(state) {
      return state.allPhonePeRegionalInventoryPODBasedDeviceDetailsWithCount;
    },
    /* Phone Pe API Getter */
  },
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SAT_RegionalInventoryAllocation;
