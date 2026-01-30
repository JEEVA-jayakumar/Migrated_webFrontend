import api from "./api.js";

/* START >> Store modules => Super Admin Users */
const SuperAdminUsersCRUD = {
  namespaced: true,

  /* ===================================
  >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> State setup goes here */
  state: {},
  /*END << State setup goes here */

  /* ===================================
  >>>>>>>>>>>>>>>>MUTATIONS<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> Mutation actions goes here */
  mutations: {},
  /*END << Mutation actions goes here */

  /* ===================================
  >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> USERS*/
    FEED_USER_DATA({
      commit
    }, request) {
      return api
        .post("user", request)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    },
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
  >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> getter actions goes here*/
  getters: {}
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SuperAdminUsersCRUD;
