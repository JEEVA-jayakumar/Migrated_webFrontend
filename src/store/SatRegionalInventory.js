import api from "./api.js";
import Vue from "vue"

/* START >> Store modules => Super Admin Users */

 function COMMON_FILE_DOWNLOAD(response) {
  return new Blob([response.data], {
    type: response.headers.get("content-type"),
  });
}

const SatRegionalInventory = {
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

    /*START >> Module>> all allInventoryDevicesData data*/
    allInventoryDevicesWihtCountData: [],
    /*END >> Module>> allInventoryDevicesData data*/

    /*START >> Module>> all allInventoryDevicesData data*/
    allInventoryDevicesData: [],
    /*END >> Module>> allInventoryDevicesData data*/

    /*START >> Module>> all regionsData data*/
    regionsData: []
    /*END >> Module>> regionsData data*/
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
    SET_ALL_INVENTORY_DEVICES_TYPES_DATA(state, payload) {
      state.allInventoryDevicesTypesData = payload;
    },
    /*END >> Module>> device data*/

    /*START >> Module>> device data*/
    SET_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA(state, payload) {
      state.allInventoryDevicesWihtCountData = payload;
    },
    /*END >> Module>> device data*/

    /*START >> Module>> device data*/
    SET_ALL_INVENTORY_DEVICES_DATA(state, payload) {
      state.allInventoryDevicesData = payload;
    },
    /*END >> Module>> device data*/

    /*START >> Module>> Regions*/
    SET_ALL_REGIONS_DATA(state, payload) {
      state.regionsData = payload;
    },
    /*END >> Module>> Regions*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> all lead validations*/
    FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA({
      commit
    }, request) {
      return api
        .get("device")
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          // START=> COMMIT with data received'
          commit("SET_ALL_INVENTORY_DEVICES_TYPES_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> all lead validations*/ 


    SIM_ACTIVE_UPLOAD_REGIONAL_INVENTORY({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.SIM_ACTIVATION_UPLOAD+"/"+request.simData,request.file, {
          // headers: {
          //   "Content-Type": 'multipart/form-data',
          //   "Authorization": "Token " + localStorage.getItem(
          //     "auth_token")
          // }
          responseType: "arraybuffer",
        });
        // .then(response => {
        //   commit("API_RESPONSE_LOG", true);

        //   var contentType = response.headers.map['content-type'][0]
        //   let blob = new Blob([response.data], { type:  contentType });
        //   // const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
        //   let link = document.createElement("a");
        //   link.href = window.URL.createObjectURL(blob);
        //   link.download = "Sim_upload_Remarks.xlsx";  
        //   link.click();
        
        // })
    },

    SIM_DEACTIVE_UPLOAD_REGIONAL_INVENTORY({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.SIM_DEACTIVATION_UPLOAD +"/"+request.simData,request.file, {
          
          responseType: "arraybuffer",
        })
        // .then(response => {
        //   commit("API_RESPONSE_LOG", true);
        //   var contentType = response.headers.map['content-type'][0]
        //   let blob = new Blob([response.data], { type:  contentType });
        //   // const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
        //   let link = document.createElement("a");
        //   link.href = window.URL.createObjectURL(blob);
        //   link.download = "Sim_upload_Remarks.xlsx";  
        //   link.click();
        // })
    },


    SIM_ACTIVE_UPLOAD_CENTRAL_INVENTORY({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.SIM_ACTIVATION_UPLOAD_CENTRAL_INVENTORY ,request.file, {
          responseType: "arraybuffer",
        });
   
    },


    SIM_DEACTIVE_UPLOAD_CENTRAL_INVENTORY({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.SIM_DEACTIVATION_UPLOAD_CENTRAL_INVENTORY,request.file, {
          // headers: {
          //   "Content-Type": 'multipart/form-data',
          //   "Authorization": "Token " + localStorage.getItem(
          //     "auth_token")
          // }
          responseType: "arraybuffer",
        })

    },



    /*START >> Module>> all lead validations*/
    FETCH_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA({
      commit
    }, request) {
      return api
        .get("central-inventory-device-count")
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          // START=> COMMIT with data received'
          commit("SET_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/
    FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE({
      commit
    }, request) {
      return api
        .get("list-device-to-central-inventory/" + request.device.id)
        .then(response => {
          commit("API_RESPONSE_LOG", response);

          // START=> COMMIT with data received'
          commit("SET_ALL_INVENTORY_DEVICES_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/
    FETCH_ALL_INVENTORY_DEVICES({
      commit
    }, request) {
      return api
        .get("list-device-to-central-inventory/")
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          // START=> COMMIT with data received'
          commit("SET_ALL_INVENTORY_DEVICES_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/
    FETCH_ALL_REGIONS_DATA({
      commit
    }, request) {
      return api
        .get("region")
        .then(response => {
          console.log("region", response.data.data)
          // START=> COMMIT success API'
          commit("API_RESPONSE_LOG", response);
          // END=> COMMIT success API'

          // START=> COMMIT with data received'
          commit("SET_ALL_REGIONS_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => {
          // START=> COMMIT failure API'
          // commit("API_RESPONSE_LOG", __FAILURE(error));
          // END=> COMMIT failure API'
        });
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> all lead validations*/
    FEED_ALLOCATE_TO_REGION({
      commit
    }, request) {
      return api
        .post("allocate-device-to-regional-inventory/" + request.region + '/' + request.podNumber, request.scannedDevices)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
        })
        .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> all lead validations*/

    TICKET_CREATION_BULK_UPLOAD({ commit, rootState }, request) {
      return Vue.http.post(rootState.GlobalVariables.TICKET_CREATION_UPLOAD, request.file,
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem(
              "auth_token")
          },
          responseType: "arraybuffer",
        });
    },
    TICKET_CLOSE_BULK_UPLOAD({
      commit,
      rootState
    }, request) {
      return Vue.http.post(rootState.GlobalVariables.TICKET_CLOSE_UPLOAD, request.file,
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem(
              "auth_token")
          },
          responseType: "arraybuffer",
        });
    },
    TICKET_ASSIGN_BULK_UPLOAD({
      commit,
      rootState
    }, request) {
      return Vue.http.post(rootState.GlobalVariables.TICKET_ASSIGN_UPLOAD, request.file,
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem(
              "auth_token")
          },
          responseType: "arraybuffer",
        });
    },
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
    getAllInventoryDevicesTypesWithCountData(state) {
      return state.allInventoryDevicesWihtCountData;
    },
    getAllInventoryDevicesData(state) {
      return state.allInventoryDevicesData;
    },
    getAllRegionsData(state) {
      return state.regionsData;
    }
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SatRegionalInventory;
