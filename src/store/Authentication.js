import Vue from "vue";
import {
  LocalStorage,
  SessionStorage
} from "quasar";
import api from "./api.js";

// Create Base64 Object
var Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function (e) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = ((n & 3) << 4) | (r >> 4);
      u = ((r & 15) << 2) | (i >> 6);
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a);
    }
    return t;
  },
  decode: function (e) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = (s << 2) | (o >> 4);
      r = ((o & 15) << 4) | (u >> 2);
      i = ((u & 3) << 6) | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r);
      }
      if (a != 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  },
  _utf8_encode: function (e) {
    e = e.replace(/\r\n/g, "\n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  },
  _utf8_decode: function (e) {
    var t = "";
    var n = 0;
    var r = (c1 = c2 = 0);
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
        n += 2;
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode(
          ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        n += 3;
      }
    }
    return t;
  },
};

// // Decode the String
// var decodedString = Base64.decode(encodedString);
// console.log(decodedString); // Outputs: "Hello World!"

/* START >> Store modules => AUTHENTICATION */
const Authentication = {
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

    /*START >> Module>> all userAuthInfo data*/
    userAuthInfo: localStorage.getItem("userInfo"),
    /*END >> Module>> userAuthInfo data*/

    /*START >> Module>> all userSendMailInfo data*/
    userSendMailInfo: [],
    /*END >> Module>> userSendMailInfo data*/

    /*START >> Module>> all userAfterResetPassworsInfo data*/
    userAfterResetPassworsInfo: [],
    /*END >> Module>> userAfterResetPassworsInfo data*/
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

    /*START >> Module>> user info after login data*/
    SET_USER_AUTH_DATA(state, payload) {
      state.userAuthInfo = payload;
    },
    /*END >> Module>> user info after login data*/

    /*START >> Module>> user info SET_SEND_MAIL_DATA*/
    SET_SEND_MAIL_DATA(state, payload) {
      state.userSendMailInfo = payload;
    },
    /*END >> Module>> user info SET_SEND_MAIL_DATA*/

    /*START >> Module>> user SET_AFTER_RESET_PASSWORD_DATA*/
    SET_AFTER_RESET_PASSWORD_DATA(state, payload) {
      state.userAfterResetPassworsInfo = payload;
    },
    /*END >> Module>> user SET_AFTER_RESET_PASSWORD_DATA*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> user auth info after login*/
    FEED_LOGIN_DATA({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.LOGIN_URL, request.url)
        .then(response => {
          // console.log("Password is " + response.data.password);
          localStorage.setItem("auth_token", response.body.jwt);
          // START=> COMMIT with data received'
          commit("SET_USER_AUTH_DATA", response.data.data);
          // END=> COMMIT with data received'
          return response;
        })
        .then(beforeResponse => {
          return api.get("user/profile").then(response => {
            localStorage.setItem("u_i", JSON.stringify(response.data.data));
            return beforeResponse;
          });
        });
      // localStorage.setItem('auth_token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJhdXRob3JpdGllcy1rZXkiOiJST0xFX1NMX0FTTSIsImlhdCI6MTUzMjU4MTg4NX0.q8bMv-kQfYULHehZ-R8QYfGf6fA7y9q20KO31X3eaH0');
    },
    /*END >> Module>> user auth info after login*/

    /*START >> Module>> user auth info after login*/
    FETCH_LOGGEDIN_USER_DATA({
      commit,
      rootState
    }, request) {
      return api
        .get("user/profile")
        .then(response => {
          commit("API_RESPONSE_LOG", true);
          SessionStorage.set("u_i", response.data.data.roles);
          return response.data.data;
        })
        .catch(error => {
          return error;
        });

      // localStorage.setItem('auth_token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJhdXRob3JpdGllcy1rZXkiOiJST0xFX1NMX0FTTSIsImlhdCI6MTUzMjU4MTg4NX0.q8bMv-kQfYULHehZ-R8QYfGf6fA7y9q20KO31X3eaH0');
    },
    /*END >> Module>> user auth info after login*/

    /*START >> Module>> user auth info password send mail*/
    SEND_FORGOT_PASSWORD_LINK_MAIL({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(rootState.GlobalVariables.FORGOTPASSWORD_URL, request, {
          headers: {
            Authorization: "kjkj",
          },
        })
        .then(response => {
          commit("SET_SEND_MAIL_DATA", response.data.data);
        });
    },
    /*END >> Module>> user auth info password send mail*/

    /*START >> Module>> user auth info password update*/
    FEED_AFTER_RESET_PASSWORD_INFO({
      commit,
      rootState
    }, request) {
      return Vue.http
        .post(
          rootState.GlobalVariables.UPDATEPASSWORD_URL,
          request.requestParam, {
          headers: {
            "Content-Type": "application/json",
            token: request.token,
          },
        }
        )
        .then(response => {
          commit("SET_AFTER_RESET_PASSWORD_DATA", response.data.data);
        });
      /*END >> Module>> user auth info password update*/
    },
    /*START >> Module>> user change password from my account*/
    CHANGE_PASSWORD({
      commit
    }, request) {
      /* return api.post("user/change-password", {
        password: Base64.encode(request.password),
      }); */
      return api.post("user/change-password", request);
    },
    /*END >> Module>> user change password from my account*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getUserAuthInfo(state) {
      return state.userAuthInfo;
    },
  },
  /*END << getter actions goes here */
};
/* END >> Store modules => AUTHENTICATION*/

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default Authentication;
