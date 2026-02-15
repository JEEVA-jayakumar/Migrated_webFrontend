
import api from "./api.js";
import _ from 'lodash';


/* START >> Store modules => Super Admin Users */
const SA_Devices = {
  namespaced: true,

  /* ===================================
    >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> State setup goes here */
  state: {
    allDashboardCountsData: [],
    editUserExistingItems: [],
    allStatesData: [],
    apiStatusLog: {
      apiStatusCode: null,
      apiPending: false,
      apiSuccess: false,
      apiFailure: false,
      apiData: []
    },
    allDevicesInfo: null,
    marsDeviceModelData:[],
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
    /*START >> Module>> all devices data*/
    SET_DEVICES_DATA(state, payload) {
      state.allDevicesInfo = payload;
    },
    SET_MARS_DEVICE_MODEL_DATAS(state,payload){
      state.marsDeviceModelData = payload;
    },
    /*END >> Module>> all devices data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> get all devices data*/
    FETCH_DEVICES_DATA({
      commit
    }, request) {
      return api
        .get("device", request)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          // START >> Commit response data
          commit("SET_DEVICES_DATA", response.data.data)
          // END >> Commit response data
        })
    },
    /*END >> Module>>  get all devices data*/
     /*START >> Module>> get all Mars devices data*/
    FETCH_MARS_DEVICE_MODEL ({
      commit,
      rootState
    }, request) {
      let req = request == null ? "" : JSON.parse(request).name
      return api
        .get(rootState.GlobalVariables.STATE_MARS_API + 'device-model/' + req)
        .then(response => {
          commit("SET_MARS_DEVICE_MODEL_DATAS", response.data);
        })
    },
     /*END >> Module>>  get all mars devices data*/

    /*START >> Module>> post device data*/
    FEED_DEVICE_TYPE_DATA({
      commit
    }, request) {
      return api
        .post("device", request)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
        })
    },
    /*END >> Module>> post device data*/

    /*START >> Module>> delete device data*/
    UPDATE_DEVICE_DATA({
      commit
    }, request) {
      return api
        .put("device/" + request.id, request)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
        })
    },
    /*END >> Module>> delete device data*/

    /*START >> Module>> delete device data*/
    DELETE_DEVICE_DATA({
      commit
    }, request) {
      return api
        .delete("device/" + request)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
        })
    },
    /*END >> Module>> delete device data*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getAllDevicesInfo(state) {
      return state.allDevicesInfo;
    },
    getMarsDeviceModel(state){
      return state.marsDeviceModelData;
    },
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SA_Devices;
