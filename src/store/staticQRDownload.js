import api from "./api.js";
import Vue from "vue";
function COMMON_FILE_DOWNLOAD(response) {
  return new Blob([response.data], {
    type: response.headers.get("content-type")
  });
}
const InventoryCentral = {
  namespaced: true,
  state: {
    allStatesData: [],
    apiStatusLog: {
      apiStatusCode: null,
      apiPending: false,
      apiSuccess: false,
      apiFailure: false,
      apiData: []
    },
    centralInventoryDashboardCount: [],
    AggregatorsCentralInventoryDashboardCount: [],
    allInventoryDevicesTypesData: [],
    allInventoryDevicesWihtCountData: [],
    allPhonepeInventoryDevicesWihtCountData: [],
    allInventoryDevicesData: [],
    allPhonepeInventoryDevicesData: [],
    regionsData: [],
    masterInventoryData: [],
    inventoryWithMerchant: [],
    AggregatorsinventoryWithMerchant: [],
    invenotryAsFaulty: [],
    regionBasedSo: [],
    regionBasedResellar: []
  },

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
  },

  actions: {

    async STATIC_QR_LEAD_VALIDATION_DOWNLOAD_FILE({ commit }, request) {
      return await Vue.http
        .get("download-file", {
          responseType: "arraybuffer"
        })
        .then(response => {
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "Axis_Merchant.zip";
          link.click();
        });
    },

    FEED_STATIC_QR_LEAD_UPLOAD_DATA({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.SAT_STATICQRFILEUPLOADURL,request.file, {
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

  getters: {

  }
};
export default InventoryCentral;
