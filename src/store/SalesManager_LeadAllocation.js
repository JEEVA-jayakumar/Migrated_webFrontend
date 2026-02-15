import { or } from '@vuelidate/validators';
import api from "./api.js";


/* START >> Store modules => Super Admin Users */
const SalesManager_LeadAllocation = {
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
    /*START >> Module>> all lead allocation data*/
    leadAllocationData: [],
    /*END >> Module>> all lead allocation data*/

    /*START >> Module>> userDetailsOnUIDandHID data*/
    userDetailsOnUIDandHID: [],
    /*END >> Module>> userDetailsOnUIDandHID data*/
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

    /*START >> Module>> payment tracker data*/
    SET_ALL_LEAD_ALLOCATION_DATA(state, payload) {
      state.leadAllocationData = payload;
    },
    /*END >> Module>> payment tracker data*/

    /*START >> Module>> SET_USERS_BY_HID_UID data*/
    SET_USERS_BY_HID_UID(state, payload) {
      state.userDetailsOnUIDandHID = payload;
    },
    /*END >> Module>> SET_USERS_BY_HID_UID data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> LEAD ALLOCATION tracker*/
    FETCH_ALL_LEAD_ALLOCATION_DATA({
      commit
    }, request) {
      return api
        .get("assigned-leads-from-bankops-portal-list")
        .then(response => {
          // START=> COMMIT with data received'
          commit("SET_ALL_LEAD_ALLOCATION_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
    },
    /*END >> Module>> all payment tracker*/

    /*START >> Module>> USER LIST BASED ON HIERARCHY USER*/
    FETCH_USERS_BY_USER_ID({
      commit
    }, request) {
      return api
        .get("user-list-under-based-on-user/" + request.hierarchy.id + "/" + request.user.id)
        .then(response => {
          // Start >> Commit response
          commit("SET_USERS_BY_HID_UID", response.data.data)
          // End >> Commit response
        })
    },
    /*END >> Module>> USER LIST BASED ON HIERARCHY USER*/

    /*START >> Module>> CREATE/ASSING SHORT LEAD INFO*/
    UPDATE_SHORT_LEAD_SALES_INFO({
      commit
    }, request) {
      if (request.leadId == undefined) {
        // Function to create short lead info
        return api
          .post("create-or-assign-short-lead-from-sales-portal/", request)
      } else {
        // Function to assign short lead info
        return api
          .post("create-or-assign-short-lead-from-sales-portal/" + request.leadId, request)
      }
    },
    /*END >> Module>> CREATE/ASSING SHORT LEAD INFO*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getAllLeadAllocationData(state) {
      return state.leadAllocationData;
    },
    getAllUserByIdAndHierarchyIdData(state) {
      return state.userDetailsOnUIDandHID;
    },
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SalesManager_LeadAllocation;
