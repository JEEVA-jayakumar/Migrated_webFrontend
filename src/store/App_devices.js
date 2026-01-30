import Vue from 'vue';
import api from "./api.js";
import _ from 'lodash';


/* START >> Store modules => Super Admin Users */
const APP_Devices = {
  namespaced: true,

  /* ===================================
    >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> State setup goes here */
  state: {
    allappDevicesInfo: null,
    mobilenum: null,
    otpValue: null,
    otpresponse: null,
    ksnvalue: null,
    // VasDeviceMapping: [],
    
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
    SET_APP_DEVICES_DATA(state, payload) {
      state.allappDevicesInfo = payload;
    },
    /*END >> Module>> all devices data*/
    SET_MOBILE_NUM(state, payload) {
      state.mobilenum = payload;
    },
    SET_SEND_OTP(state, payload) {
      state.otpValue = payload;
    }, 
    SET_VERIFY_OTP_DATA(state, payload) {
      state.otpresponse = payload;
    },
    SET_KSN(state, payload) {
      state.ksnvalue = payload;
    },
  //  SET_FETCH_APP_DEVICES_DATAS_CHECK (state, payload)  {
  //     state.VasDeviceMapping = payload;
  //   },
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> get all devices data*/
    FETCH_APP_DEVICES_DATA({
      commit
    }, request) {
      return Vue.http
        .get("https://qaapp.bijlipay.co.in:8085/staticApi/plan-and-deivce-list-based-on-lead-source/"+ request)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          // START >> Commit response data
          commit("SET_APP_DEVICES_DATA", response.data.data.device)
          // END >> Commit response data
        })
    },
    VERIFY_MOB_NUM({
      commit
    }, request) {
      return Vue.http
      .post("https://smart.bijlipay.co.in:9000/otp/getmbl" , request)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          commit("SET_MOBILE_NUM", response)
        })
    },
    SEND_OTP({
      commit
    }, request) {
      return Vue.http
      .get("https://smart.bijlipay.co.in:9000/otp/otpinput?mblNo=" + JSON.parse(localStorage.getItem("u_i")).user.contactNumber + '&cmd=generate%20otp')
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          commit("SET_SEND_OTP", response)
        })
    },
    VERIFY_OTP_DATA({
      commit
    }, request) {
      return Vue.http
      .get("https://smart.bijlipay.co.in:9000/otp/otpsms/" + JSON.parse(localStorage.getItem("u_i")).user.contactNumber + '/' + request)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          commit("SET_VERIFY_OTP_DATA", response)
        })
    },
    VERIFY_KSN({
      commit
    }, request) {
      return Vue.http.get("https://qaapp.bijlipay.co.in:8085/api/switch-enable-ksn/" + request)
        .then(response => {
          commit("API_RESPONSE_LOG", response);
          commit("SET_KSN", response)
        })
    },

  },
  getters: {
    getAllAppDevicesInfo(state) {
      return state.allappDevicesInfo;
    },
    getMobileNum(state) {
      return state.mobilenum;
    },
    getOtpValue(state) {
      return state.otpValue;
    },
    getOtpData(state) {
      return state.otpresponse;
    },
    getKsnData(state) {
      return state.ksnvalue;
    },
    
    // getVasDeviceMapping (state) {
    //   return state.VasDeviceMapping
    // }
  },
  /*END << getter actions goes here */
  

};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default APP_Devices;








