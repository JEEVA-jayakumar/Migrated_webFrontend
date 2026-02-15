
import api from "./api.js";
import _ from "lodash";

/* START >> Store modules => Super Admin Users */
const OPSHead = {
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
    /*START >> Module>> all payment tracker data*/
    kycExceptionsData: [],
    /*END >> Module>> all payment tracker data*/
    /*START >> Module>> kycExceptionByIdData data*/
    kycExceptionByIdData: [],
    /*END >> Module>> kycExceptionByIdDatar data*/
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
    /*START >> Module>> payment tracker data*/
    SET_ALL_EXCEPTION_KYC_DATA(state, payload) {
      state.kycExceptionsData = payload;
    },
    /*END >> Module>> payment tracker data*/
    /*START >> Module>> payment tracker data*/
    SET_ALL_EXCEPTION_KYC_BY_ID_DATA(state, payload) {
      state.kycExceptionByIdData = payload;
    },
    /*END >> Module>> payment tracker data*/

    /*START >> Module>> all lead validations device verification data*/
    SET_VERIFY_DOCUMENT_FULL_LEAD(state, payload) {
      state.setDocumentVerification = payload;
    },
    /*END >> Module>> all lead validations device verification data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> all operations head exception lists*/
    FETCH_ALL_EXCEPTION_KYC_DATA({
      commit
    }, request) {
      if (request.pagination.sortBy == null) {
        return api
          .get(
            "exception-queue-oph?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter
          )
          .then(response => {
            // START=> COMMIT with data received'
            commit("SET_ALL_EXCEPTION_KYC_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      } else {
        let sorting = request.pagination.descending ? "asc" : "desc";
        return api
          .get(
            "exception-queue-oph?page=" +
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
            // console.log("TABLE DATA VALUES---------->",JSON.stringify(this. response.data.data))

            // START=> COMMIT with data received'
            commit("SET_ALL_EXCEPTION_KYC_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      }
    },
    /*END >> Module>> all operations head exception lists*/

    /*START >> Module>> all operations head exception lists*/
    FETCH_ALL_EXCEPTION_KYC_BY_ID_DATA({
      commit
    }, request) {
      return api.get("lead-information-details/" + request).then(response => {
        let data = {
          apiStatusCode: response.status,
          apiPending: false,
          apiSuccess: true,
          apiData: response.data.data,
        };
        commit("API_RESPONSE_LOG", data);
        // START=> Making documents array'
        var groupDocuments = _.groupBy(
          response.data.data.leadDocuments,
          function (document) {
            return document.documentType;
          }
        );
        Vue.set(response.data.data, "leadDocuments", groupDocuments);

        // START=> COMMIT with data received'
        commit("SET_ALL_EXCEPTION_KYC_BY_ID_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    /*END >> Module>> all operations head exception lists*/

    /*START >> Module>> exception kyc sat feedback*/
    FEED_EQ_KYC_FEEDBACK({
      commit
    }, request) {
      return api
        .post(
          "kyc-verification/" + request.leadId + "/" + request.defaultUrlValue,
          request.leadInformation
        )
        .then(response => {
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response,
          };
          commit("API_RESPONSE_LOG", data);
        });
    },
    /*END >> Module>> exception kyc sat feedback*/

    /*START >> Module>> short lead data*/
    VERIFY_DOCUMENT_FULL_LEAD({
      commit
    }, request) {
      // return false
      return api
        .post(
          "verify-document-full-lead-information/" +
          request.lead.id +
          "/" +
          request.lead.documentId,
          request.leadDetails
        )
        .then(response => {
          commit("API_RESPONSE_LOG", true);

          // START=> COMMIT with data received'
          commit("SET_VERIFY_DOCUMENT_FULL_LEAD", response.data.data);
          // END=> COMMIT with data received'
        });
      // .catch(error => console.log("API_RESPONSE_LOG", error));
    },
    /*END >> Module>> short lead data*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getKycExceptionInfo(state) {
      return state.kycExceptionsData;
    },
    getKycExceptionInfoById(state) {
      return state.kycExceptionByIdData;
    },
  },
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default OPSHead;
