import { or, and } from '@vuelidate/validators';
import api from "./api.js";


/***********
Common function to convert response as BLOB and create a 
link to click and download 
*************/
function COMMON_FILE_DOWNLOAD(response) {
  return new Blob([response.data], {
    type: response.headers.get("content-type")
  });
}
/***********
Common function to convert response as BLOB and create a 
link to click and download 
*************/

/* START >> Store modules => Super Admin Users */
const InventoryCentral = {
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
    centralInventoryDashboardCount: [],
    AggregatorsCentralInventoryDashboardCount: [],
    allInventoryDevicesTypesData: [],
    /*END >> Module>> allInventoryDevicesTypesData data*/

    /*START >> Module>> all allInventoryDevicesData data*/
    allInventoryDevicesWihtCountData: [],
    /*END >> Module>> allInventoryDevicesData data*/
    allPhonepeInventoryDevicesWihtCountData: [],

    /*START >> Module>> all allInventoryDevicesData data*/
    allInventoryDevicesData: [],
    // allPhoneInventoryDevicesData: [],
    /*END >> Module>> allInventoryDevicesData data*/
    allPhonepeInventoryDevicesData: [],

    /*START >> Module>> all regionsData data*/
    regionsData: [],
    /*END >> Module>> regionsData data*/

    /*START >> Module>> all regionsData data*/
    masterInventoryData: [],

    /*END >> Module>> regionsData data*/
    /*START >> Module>> all inventoryWithMerchant*/
    inventoryWithMerchant: [],
    AggregatorsinventoryWithMerchant: [],
    /*END >> Module>> inventoryWithMerchant*/
    /*START >> Module>> all invenotryAsFaulty*/
    invenotryAsFaulty: [],
    regionBasedSo: [],
    regionBasedResellar: []

    /*END >> Module>> invenotryAsFaulty*/
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

    /*START >> Module>> device data*/
    SET_CENTRAL_INVENTORY_DASHBOARD_COUNT_LIST(state, payload) {
      state.centralInventoryDashboardCount = payload;
    },
    /* AGGREGATORS API */

    SET_AGGREGATORS_CENTRAL_INVENTORY_DASHBOARD_COUNT(state, payload) {
      state.AggregatorsCentralInventoryDashboardCount = payload;
    },

    /* AGGREGATORS API */
    SET_REGION_BASED_SO(state, payload) {
      state.regionBasedSo = payload;
    },
    SET_REGION_BASED_RESELLAR(state, payload) {
      state.regionBasedResellar = payload;
    },

    /*END >> Module>> device data*/

    /*START >> Module>> device data*/
    SET_ALL_INVENTORY_DEVICES_TYPES_DATA(state, payload) {
      state.allInventoryDevicesTypesData = payload;
    },
    /*END >> Module>> device data*/

    /*START >> Module>> device data*/
    SET_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA(state, payload) {
      state.allInventoryDevicesWihtCountData = payload;
    },
    /*END >> Module>> device data*/

    SET_ALL_PHONE_PE_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA(state, payload) {
      state.allPhonepeInventoryDevicesWihtCountData = payload;
    },

    /*START >> Module>> device data*/
    SET_ALL_INVENTORY_DEVICES_DATA(state, payload) {
      state.allInventoryDevicesData = payload;
    },
    /*END >> Module>> device data*/

    // /*PHONE PE */
    // SET_ALL_PHONE_PE_INVENTORY_DEVICES(state, payload) {
    //   state.allPhoneInventoryDevicesData = payload;
    // },

    /*PHONE PE */

    /*PHONEPE API */
    SET_ALL_PHOEPE_INVENTORY_DEVICES_BY_DEVICE_TYPE(state, payload) {
      state.allPhonepeInventoryDevicesData = payload;
    },
    /*PHONEPE API */
    /*START >> Module>> Regions*/
    SET_ALL_REGIONS_DATA(state, payload) {
      state.regionsData = payload;
    },
    /*END >> Module>> Regions*/

    /*START >> Module>> master inventory*/
    SET_MASTER_INVENTORY_DATA(state, payload) {
      state.masterInventoryData = payload;
    },
    /*END >> Module>> master inventory*/

    /*START >> Module>> inventory with merchant*/
    SET_INVENTORY_WITH_MERCHANT_DATA(state, payload) {
      state.inventoryWithMerchant = payload;
    },
    /*END >> Module>> inventory with merchant*/
    /* AGGREGATORS API */
    SET_AGGREGATORS_INVENTORY_WITH_MERCHANT_DATA(state, payload) {
      state.AggregatorsinventoryWithMerchant = payload;
    },

    /* AGGREGATORS API */

    /*START >> Module>> faulty inventory*/
    SET_FAULTY_INVENTORY_DEVICES(state, payload) {
      state.invenotryAsFaulty = payload;
    }
    /*END >> Module>> faulty inventory*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> all lead validations*/
    FETCH_CENTRAL_INVENTORY_DASHBOARD_COUNT({ commit }, request) {
      return api
        .get("central-inventory-dashboard-device-count-list")
        .then(response => {
          // START=> COMMIT with data received'
          commit(
            "SET_CENTRAL_INVENTORY_DASHBOARD_COUNT_LIST",
            response.data.data
          );
          // END=> COMMIT with data received'
        });
    },
    /*END >> Module>> all lead validations*/

    /* AGGREGATORS API */
    FETCH_AGGREGATORS_CENTRAL_INVENTORY_DASHBOARD_COUNT({ commit }, request) {
      console.log("ACTION FETCH_AGGREGATORS_CENTRAL_INVENTORY_DASHBOARD_COUNT ===>", JSON.stringify(request))
      return api
        .get("aggregator-inventory/agg-central-inventory-dashboard-device-count-list/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]))
        .then(response => {
          // START=> COMMIT with data received'
          commit(
            "SET_AGGREGATORS_CENTRAL_INVENTORY_DASHBOARD_COUNT",
            response.data.data
          );
          // END=> COMMIT with data received'
        });
    },

    /* AGGREGATORS API */

    /*START >> Module>> all lead validations*/
    FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA({ commit }, request) {
      return api.get("device").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_INVENTORY_DEVICES_TYPES_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    PHONEPE_FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA({ commit }, request) {
      return api.get("device").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_INVENTORY_DEVICES_TYPES_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    /*END >> Module>> all lead validations*/
    FETCH_REGION_BASED_SO({ commit }, request) {
      return api.get("so/" + request).then(response => {
        // START=> COMMIT with data received'
        commit("SET_REGION_BASED_SO", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    FETCH_REGION_BASED_RESELLAR({ commit }, request) {
      return api.get("reseller").then(response => {
        // START=> COMMIT with data received'
        commit("SET_REGION_BASED_RESELLAR", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    /*START >> Module>> all lead validations*/
    FETCH_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA({ commit }, request) {
      return api.get("central-inventory-device-count").then(response => {
        // START=> COMMIT with data received'
        commit(
          "SET_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA",
          response.data.data
        );
        // END=> COMMIT with data received'
      });
    },
    /*END >> Module>> all lead validations*/

    /* PHONE PE API*/

    /* START Aggregator Dynamic Code */
    // FETCH_ALL_PHONE_PE_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA({ commit }, request) {
    //   console.log("FETCH_ALL_PHONE_PE_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA------->", JSON.stringify(request))
    //   return api.get("aggregator-inventory/inventoryCountList/" + request.id).then(response => {
    //     // START=> COMMIT with data received'
    //     commit(
    //       "SET_ALL_PHONE_PE_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA",
    //       response.data.data
    //     );
    //     // END=> COMMIT with data received'
    //   });
    // },

    /* END Aggregator Dynamic Code */

    /* START Aggregator Static Code */

    FETCH_ALL_PHONE_PE_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA({ commit }, request) {
      console.log("FETCH_ALL_PHONE_PE_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA------->", JSON.stringify(request))
      return api.get("aggregator-inventory/inventoryCountList/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])).then(response => {
        // START=> COMMIT with data received'
        commit(
          "SET_ALL_PHONE_PE_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA",
          response.data.data
        );
        // END=> COMMIT with data received'
      });
    },

    /* END Aggregator Static Code */

    /* PHONE PE API*/

    /*START >> Module>> all lead validations*/
    FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE({ commit }, request) {
      if (request == undefined || request.device.id == undefined) {
        return api.get("list-device-to-central-inventory").then(response => {
          // START=> COMMIT with data received'
          commit("SET_ALL_INVENTORY_DEVICES_DATA", response.data.data);
          // END=> COMMIT with data received'
        });
      } else {
        return api
          .get("list-device-to-central-inventory/" + request.device.id)
          .then(response => {
            // START=> COMMIT with data received'
            commit("SET_ALL_INVENTORY_DEVICES_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      }
    },
    /*END >> Module>> all lead validations*/

    PHONEPE_FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE({ commit }, request) {
      if (request == undefined || request.device.id == undefined) {
        return api.get("list-device-to-central-inventory").then(response => {
          // START=> COMMIT with data received'
          commit("SET_ALL_INVENTORY_DEVICES_DATA", response.data.data);
          // END=> COMMIT with data received'
        });
      } else {
        return api
          .get("list-device-to-central-inventory/" + request.device.id)
          .then(response => {
            // START=> COMMIT with data received'
            commit("SET_ALL_INVENTORY_DEVICES_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      }
    },
    /*END >> Module>> all lead validations*/
    // agg-list-device-to-central-inventory
    /* PHONEPE API */
    FETCH_ALL_PHOEPE_INVENTORY_DEVICES_BY_DEVICE_TYPE({ commit }, request) {
      if (request == undefined || request.device.id == undefined) {
        return api.get("aggregator-inventory/agg-list-device-to-central-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])).then(response => {
          // START=> COMMIT with data received'
          commit("SET_ALL_PHOEPE_INVENTORY_DEVICES_BY_DEVICE_TYPE", response.data.data);
          // END=> COMMIT with data received'
        });
      } else {
        return api
          .get("aggregator-inventory/agg-list-device-to-central-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) + request.device.id)
          .then(response => {
            // START=> COMMIT with data received'
            commit("SET_ALL_PHOEPE_INVENTORY_DEVICES_BY_DEVICE_TYPE", response.data.data);
            // END=> COMMIT with data received'
          });
      }
    },
    /* PHONEPE API */
    /*START >> Module>> all lead validations*/
    FETCH_ALL_INVENTORY_DEVICES({ commit }, request) {
      return api.get("list-device-to-central-inventory/").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_INVENTORY_DEVICES_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/
    FETCH_ALL_REGIONS_DATA({ commit }, request) {
      return api.get("region").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_REGIONS_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/
    FEED_FAULTY_FINAL_SUBMIT({ commit }, request) {
      return api.put(
        "scan-add-central-fault-inventory/" + request.action,
        request.data
      );
    },
    /*END >> Module>> all lead validations*/
    /*Aggregators API */
    FEED_AGGREGATORS_FAULTY_FINAL_SUBMIT({ commit }, request) {
      console.log("FEED_AGGREGATORS_FAULTY_FINAL_SUBMIT ---->", request)
      return api.put(
        "aggregator-inventory/agg-scan-add-central-fault-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/"+ request.action,
        request.data
      );
    },


    /*Aggregators API */
    /*START >> Module>> all lead validations*/
    FEED_SAT_FAULTY_FINAL_SUBMIT({ commit }, request) {
      return api.put(
        "scan-add-regional-fault-inventory/" + request.action,
        request.data
      );
    },
    /*END >> Module>> all lead validations*/
    /*START >> Module>> all lead validations*/
    USEABLE_DEVICE({ commit }, request) {
      return api.post("device-useable-or-fault-submit/1", request);
    },

    /*END >> Module>> all lead validations*/
    /*START >> Module>> all lead validations*/
    FAULTY_DEVICE({ commit }, request) {
      return api.post("device-useable-or-fault-submit/2", request);
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/

    FEED_FAULTY_BULK_UPLOAD_FINAL_SUBMIT({ commit }, request) {
      return api.put(
        "add-bulk-fault-inventory/" + request.device + "/" + request.action,
        request.file
      );
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/
    FEED_ALLOCATE_TO_REGION({ commit }, request) {
      return api.post(
        "allocate-device-to-regional-inventory/" +
        request.region +
        "/" +
        request.podNumber,
        request.scannedDevices
      );
    },
    /*END >> Module>> all lead validations*/
    /*PHONE PE API */
    FEED_PHONE_PE_ALLOCATE_TO_REGION({ commit }, request) {
      console.log("FEED_PHONE_PE_ALLOCATE_TO_REGION --->", JSON.stringify(request))
      return api.post(
        "aggregator-inventory/agg-allocate-device-to-regional-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) +"/" +
        request.region +
        "/" +
        request.podNumber,
        request.scannedDevices
      );
    },
    /*PHONE PE API */

    /*START >> Module>> all lead validations*/
    FEED_ALLOCATE_TO_REGION_BASED_SO({ commit }, request) {
      return api.post(
        "allocate-device-to-regional-inventory/" +
        request.region +
        "/" +
        request.podNumber +
        "/" +
        request.so,
        request.scannedDevices
      );
    },


    FEED_ALLOCATE_SO_TO_SO({ commit }, request) {
      return api.post(
        "assign-sat-to-so/1",
        request,
      
      );
    },
    /* AGGREGATORS API */

    FEED_AGGREGATORS_ALLOCATE_TO_REGION_BASED_SO({ commit }, request) {
      return api.post(
        "aggregator-inventory/agg-allocate-device-to-regional-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) +"/" +
        request.region +
        "/" +
        request.podNumber +
        "/" +
        request.so,
        request.scannedDevices
      );
    },

    FEED_AGGREGATORS_ALLOCATE_SO_TO_SO({ commit }, request) {
      return api.post(
        "assign-sat-to-so/2",
        request,
      
      );
    },



    /* AGGREGATORS API */
    FEED_ALLOCATE_TO_REGION_BASED_RESELLAR({ commit }, request) {
      return api.post(
        "allocate-device-to-regional-inventory-reseller/" +
        request.region +
        "/" +
        request.podNumber +
        "/" +
        request.resellar,
        request.scannedDevices
      );
    },
    
    FETCH_ALL_SUBMITS({ commit }, request) {
      return api.post(
        "allocate-device-to-regional-inventory-reseller/" +
        request.region +
        "/" +
        request.device +
        "/" +
        request.scannedDevices
      );
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/
    FETCH_MASTER_INVENTORY_DATA({ commit }, request) {
      if (request == undefined) {
        return api.get("master-inventory-list").then(response => {
          commit("SET_MASTER_INVENTORY_DATA", response.data.data);
        });
      } else {
        return api.get("master-inventory-list/" + request).then(response => {
          commit("SET_MASTER_INVENTORY_DATA", response.data.data);
        });
      }
    },
    /*END >> Module>> all lead validations*/

    /* API call to fetch lead approval data */
    async REPORT_MASTER_INVENTORY({ commit }, request) {
      if (request == undefined) {
        return await api
          .get("download/master-inventory-report", {
            responseType: "arraybuffer"
          })
          .then(response => {
            let blob = COMMON_FILE_DOWNLOAD(response);
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = (
              response.headers["Content-Disposition"] || ""
            ).split("filename=")[0];
            link.click();
          });
      } else {
        return await api
          .get("download/master-inventory-report/" + request, {
            responseType: "arraybuffer"
          })
          .then(response => {
            let blob = COMMON_FILE_DOWNLOAD(response);
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = (
              response.headers["Content-Disposition"] || ""
            ).split("filename=")[0];
            link.click();
          });
      }
    },
    // async REPORT_MERCHANT_MENU({
    //   commit
    // }, request) {

    //     return await api
    //       .get("download-MerchantMenu", {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {

    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download ="download.xlsx"
    //         link.click();
    //       });

    // },
    // FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE({
    //   commit
    // }, request) {
    //   if (request == undefined || request.device.id == undefined) {
    //     return api.get("list-device-to-central-inventory").then(response => {
    //       // START=> COMMIT with data received'
    //       commit("SET_ALL_INVENTORY_DEVICES_DATA", response.data.data);
    //       // END=> COMMIT with data received'
    //     });
    //   } else {
    //     return api
    //       .get("list-device-to-central-inventory/" + request.device.id)
    //       .then(response => {
    //         // START=> COMMIT with data received'
    //         commit("SET_ALL_INVENTORY_DEVICES_DATA", response.data.data);
    //         // END=> COMMIT with data received'
    //       });
    //   }
    // },
    async REPORT_MERCHANT_MENU({ commit }, request) {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let response = await api.get(
        "download-MerchantMenu?from=" + request.from + "&to=" + request.to,
        {
          responseType: "arraybuffer"
        }
      );
      let blob = new Blob([response.data], {
        type: response.headers.get("content-type")
      });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Device With Merchant Report.xlsx";
      link.click();
    },
    async REPORT_INVENTORY_SUMMARY1({ commit }, request) {
      return await api
        .get("download-InventorySummaryInfoMenu/1", {
          responseType: "arraybuffer"
        })
        .then(response => {
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "AllocatedDevices.xlsx";
          link.click();
        });
    },
    async REPORT_INVENTORY_SUMMARY2({ commit }, request) {
      return await api
        .get("download-InventorySummaryInfoMenu/2", {
          responseType: "arraybuffer"
        })
        .then(response => {
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "UnallocatedDevices.xlsx";
          link.click();
        });
    },
    async REPORT_INVENTORY_SUMMARY3({ commit }, request) {
      return await api
        .get("download-InventorySummaryInfoMenu/3", {
          responseType: "arraybuffer"
        })
        .then(response => {
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "FaultyDevices.xlsx";
          link.click();
        });
    },
    async REPORT_HITACHI_ONBOARDING_MERCHANTS({ commit }, request) {
      return await api
        .get("download-InventorySummaryInfoMenu/1", {
          responseType: "arraybuffer"
        })
        .then(response => {
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "HitachiOnboardingMerchants.xlsx";
          link.click();
        });
    },

    // async REPORT_RECOVERY_REPLACEMENT_HIST({
    //   commit
    // }, request) {

    //     return await api
    //       .get("download-RecoveryReplacementHist", {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {
    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download ="download.xlsx"
    //         link.click();
    //       });

    // },

    async REPORT_RECOVERY_REPLACEMENT_HIST({ commit }, request) {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let response = await api.get(
        "download-RecoveryReplacementHist?from=" +
        request.from +
        "&to=" +
        request.to,
        {
          responseType: "arraybuffer"
        }
      );
      let blob = new Blob([response.data], {
        type: response.headers.get("content-type")
      });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Replacement Report.xlsx";
      link.click();
    },

    // async REPORT_BPREGION_MENU({
    //   commit
    // }, request) {

    //     return await api
    //       .get("download-BpRegionsMenu", {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {
    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download ="download.xlsx"
    //         link.click();
    //       });

    // },
    async REPORT_BPREGION_MENU({ commit }, request) {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let response = await api.get(
        "download-BpRegionsMenu?from=" + request.from + "&to=" + request.to,
        {
          responseType: "arraybuffer"
        }
      );
      let blob = new Blob([response.data], {
        type: response.headers.get("content-type")
      });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Device With Merchant Report.xlsx";
      link.click();
    },

    // async DOWNLOAD_lOST_OR_STOLEN_DATAS({
    //   commit
    // }, request) {
    //
    //     return await api
    //       .get("download-lost-or-stolen-device-sat", {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {
    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download ="download.xlsx"
    //         link.click();
    //       });

    // },
    async DOWNLOAD_lOST_OR_STOLEN_DATAS({ commit }, request) {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let response = await api.get(
        "download-lost-or-stolen-device-sat?fromDate=" +
        request.fromDate +
        "&toDate=" +
        request.toDate,
        {
          responseType: "arraybuffer"
        }
      );
      let blob = new Blob([response.data], {
        type: response.headers.get("content-type")
      });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "LostOrStolen.xlsx";
      link.click();
    },

    // async DOWNLOAD_SEND_TO_DATAS({
    //   commit
    // }, request) {

    //     return await api
    //       .get("download-lost-or-stolen-device-sat/" + request.filter, {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {
    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download ="download.xlsx"
    //         link.click();
    //       });

    // },

    // async DOWNLOAD_INVENTORY_DATAS({
    //   commit
    // }, request) {

    //     return await api
    //       .get("download-lost-or-stolen-device-sat", {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {
    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download ="download.xlsx"
    //         link.click();
    //       });

    // },

    async REPORT_MASTERTRACKER_MENU({ commit }, request) {
      return await api
        .get("download-master-tracker-list", {
          responseType: "arraybuffer"
        })
        .then(response => {
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "download.xlsx";
          link.click();
        });
    },
    // async REPORT_DEVICE_HISTORY_LIST({
    //   commit
    // }, request) {

    //     return await api
    //       .get("download-deviceHist", {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {
    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download ="download.xlsx"
    //         link.click();
    //       });

    // },
    async REPORT_DEVICE_HISTORY_LIST({ commit }, request) {
      var today = new Date();
      var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      let response = await api.get(
        "download-deviceHist?from=" + request.from + "&to=" + request.to,
        {
          responseType: "arraybuffer"
        }
      );
      let blob = new Blob([response.data], {
        type: response.headers.get("content-type")
      });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Device History Report.xlsx";
      link.click();
    },

    // async REPORT_FSE_MENU({
    //   commit
    // }, request) {

    //     return await api
    //       .get("download-SoMenu", {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {
    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download ="download.xlsx"
    //         link.click();
    //       });

    // },
    async REPORT_FSE_MENU({ commit }, request) {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let response = await api.get(
        "download-SoMenu?from=" + request.from + "&to=" + request.to,
        {
          responseType: "arraybuffer"
        }
      );
      let blob = new Blob([response.data], {
        type: response.headers.get("content-type")
      });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Device FSE Report.xlsx";
      link.click();
    },

  async PRINT_MERCHANT_DETAILS({ commit }, request) {
      let response = await api.get(
        "generate-sqr-pdf/"+request,
        {
          responseType: "blob"
        }
      );
      let blob = new Blob([response.data], {
        type: response.headers.get("content-type")
      });
      const objectURL = URL.createObjectURL(blob);
      const pdfData = objectURL;
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = pdfData;
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
      //  const printWindow = window.open(pdfData);
      //   printWindow.print();
      // let link = document.createElement("a");
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "Device FSE Report.xlsx";
      // link.click();
    },

    async PHONEPE_PAPER_ROLL_PDF({ commit }, request) {  
      let response = await api.get(
        "crm-request/generatePdf/"+request,
        {
          responseType: "blob"
        }
      );
      let blob = new Blob([response.data], {
        type: response.headers.get("content-type")
      });
      const objectURL = URL.createObjectURL(blob);
      const pdfData = objectURL;
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = pdfData;
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
      //  const printWindow = window.open(pdfData);
      //   printWindow.print();
      // let link = document.createElement("a");
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "Device FSE Report.xlsx";
      // link.click();
    },

    /* API call to fetch lead approval data */
    /*START >> Module>> all lead validations*/
    FETCH_INVENTORY_WITH_MERCHANT_DATA({ commit }, request) {
      let sorting = request.pagination.descending ? "asc" : "desc";
      return api
        .get(
          "inventory-with-merchant-list?page=" +
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
          commit("SET_INVENTORY_WITH_MERCHANT_DATA", response.data.data);
          // END=> COMMIT with data received'
        });
    },
    /*END >> Module>> all lead validations*/
    /*Aggregators API */

    /* START AGGREGATORS DYNAMIC CODE */

    // FETCH_AGGREGATORS_INVENTORY_WITH_MERCHANT_DATA({ commit }, request) {
    //   let sorting = request.pagination.descending ? "asc" : "desc";
    //   return api
    //     .get(
    //       "aggregator-inventory/agg-inventory-with-merchant-list/"+request.aggregators +"?page=" +
    //       request.pagination.page +
    //       "&size=" +
    //       request.pagination.rowsPerPage +
    //       "&search=" +
    //       request.filter +
    //       "&sort=" +
    //       request.pagination.sortBy +
    //       "&" +
    //       request.pagination.sortBy +
    //       ".dir=" +
    //       sorting
    //     )
    //     .then(response => {
    //       // START=> COMMIT with data received'
    //       commit("SET_AGGREGATORS_INVENTORY_WITH_MERCHANT_DATA", response.data.data);
    //       // END=> COMMIT with data received'
    //     });
    // },

    /* END AGGREGATORS DYNAMIC CODE */

    /* START AGGREGATORS STATIC CODE */

    FETCH_AGGREGATORS_INVENTORY_WITH_MERCHANT_DATA({ commit }, request) {
      let sorting = request.pagination.descending ? "asc" : "desc";
      return api
        .get(
          "aggregator-inventory/agg-inventory-with-merchant-list/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page=" +
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
          commit("SET_AGGREGATORS_INVENTORY_WITH_MERCHANT_DATA", response.data.data);
          // END=> COMMIT with data received'
        });
    },

    /* END AGGREGATORS STATIC CODE */


    /*Aggregators API */


    /*START >> Module>> all lead validations*/
    FEED_CENTRAL_INVENTORY_DAMAGED_DEVICE_SERIAL_NUMBER({ commit }, request) {
      return api.put(
        "add-damage-device-to-central/" + request.podNumber,
        request.scannedDevices
      );
    },
    /*END >> Module>> all lead validations*/

    /* API call to fetch lead approval data */
    // async REPORT_MASTER_INVENTORY({
    //   commit
    // }, request) {
    //   if (request == undefined) {
    //     return await api
    //       .get("download/master-inventory-report", {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {
    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download = (
    //           response.headers["Content-Disposition"] || ""
    //         ).split("filename=")[0];
    //         link.click();
    //       });
    //   } else {
    //     return await api
    //       .get("download/master-inventory-report/" + request, {
    //         responseType: "arraybuffer",
    //       })
    //       .then(response => {
    //         let blob = COMMON_FILE_DOWNLOAD(response);
    //         let link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download = (
    //           response.headers["Content-Disposition"] || ""
    //         ).split("filename=")[0];
    //         link.click();
    //       });
    //   }
    // },
    /* API call to fetch lead approval data */

    /*START >> Module>> all lead validations*/
    FETCH_FAULT_INVENTORY_DEVICES({ commit }, request) {
      if (request == undefined) {
        return api.get("central-fault-inventory-list").then(response => {
          commit("SET_FAULTY_INVENTORY_DEVICES", response.data.data);
        });
      } else {
        return api
          .get("central-fault-inventory-list/" + request)
          .then(response => {
            commit("SET_FAULTY_INVENTORY_DEVICES", response.data.data);
          });
      }
    },
    FETCH_FAULT_INVENTORY_DEVICES_FROM_REGIONAL({ commit }, request) {
      return api
        .get("find-faulty-inventory-from-pod-number/" + request)
        .then(response => {
          commit("SET_FAULTY_INVENTORY_DEVICES", response.data.data);
        });
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/
    FEED_FAULTY_DEVICES_INVENTORY({ commit }, request) {
      return api.put("add-fault-central-inventory/" + request.serialNumber);
    }
    /*END >> Module>> all lead validations*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getCentralInventoryDashboardCount(state) {
      return state.centralInventoryDashboardCount;
    },
    /* AGGREGATORS API */
    getAggregatorsCentralInventoryDashboardCount(state) {
      return state.AggregatorsCentralInventoryDashboardCount;
    },



    /* AGGREGATORS API */
    getAllInventoryDevicesTypesData(state) {
      return state.allInventoryDevicesTypesData;
    },
    getAllInventoryDevicesTypesWithCountData(state) {
      return state.allInventoryDevicesWihtCountData;
    },
    /*PHONEPE API */
    getAllPhonepeInventoryDevicesTypesWithCountData(state) {
      return state.allPhonepeInventoryDevicesWihtCountData;
    },
    // 
    getAllInventoryDevicesData(state) {
      return state.allInventoryDevicesData;
    },
    /*allPhoneInventoryDevicesData PHONEPE API */
    // getAllPhoneInventoryDevicesData(state) {
    //   return state.allPhoneInventoryDevicesData;
    // },
    /*PHONEPE API */
    getAllPhonepeInventoryDevicesData(state) {
      return state.allPhonepeInventoryDevicesData;
    },
    // allPhonepeInventoryDevicesData
    getAllRegionsData(state) {
      return state.regionsData;
    },
    getMasterInventoryData(state) {
      return state.masterInventoryData;
    },
    getInventoryWithMerchantData(state) {
      return state.inventoryWithMerchant;
    },
    /*Aggregators API */
    getAggregatorsInventoryWithMerchantData(state) {
      return state.AggregatorsinventoryWithMerchant;
    },

    /*Aggregators API */
    getInvenotryAsFaultyData(state) {
      return state.invenotryAsFaulty;
    },
    getRegionBasedSO(state) {
      return state.regionBasedSo;
    },
    getRegionBasedResellar(state) {
      return state.regionBasedResellar;
    }
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default InventoryCentral;
