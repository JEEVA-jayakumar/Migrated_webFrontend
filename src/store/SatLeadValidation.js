
import api from "./api.js";
import _ from "lodash";

/* START >> Store modules => Super Admin Users */
const SatLeadValidation = {
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
      apiData: [],
    },
    setDeviceVerification: null,
    /*START >> Module>> short lead data*/
    shortLeadData: [],
    /*END >> Module>> short lead data*/
    /*START >> Module>> all leads validation data*/
    leadsValidationData: [],
    /*END >> Module>> leads validation data*/
    /*START >> Module>> all leads validation data*/
    setDocumentVerification: [],
    /*END >> Module>> leads validation data*/
    /*START >> Module>> all shortLeadDocumentTypeData data*/
    shortLeadDocumentTypeData: [],

    shortLeadDocumentTypeDataQr:[]
    /*END >> Module>> shortLeadDocumentTypeDataQr data*/
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
    /*START >> Module>> short lead data*/
    SET_SHORT_LEAD_DATA(state, payload) {
      state.shortLeadData = payload;
    },
    /*END >> Module>> short lead data*/

    /*START >> Module>> short lead data document type*/
    SET_SHORT_LEAD_DOCUMENT_TYPE_DATA(state, payload) {
      state.shortLeadDocumentTypeData = payload;
    },

    SET_SHORT_LEAD_DOCUMENT_TYPE_DATA_QR(state, payload) {
      state.shortLeadDocumentTypeDataQr = payload;
    },
    /*END >> Module>> short lead data document type*/

    /*START >> Module>> all lead validations data*/
    SET_ALL_VALIDATIONS_DATA(state, payload) {
      state.leadsValidationData = payload;
    },
    /*END >> Module>> all lead validations data*/

    /*START >> Module>> all lead validations device verification data*/
    SET_VERIFY_DEVICE_FULL_LEAD(state, payload) {
      state.setDeviceVerification = payload;
    },
    /*END >> Module>> all lead validations device verification data*/

    /*START >> Module>> all lead validations device verification data*/
    SET_VERIFY_DOCUMENT_FULL_LEAD(state, payload) {
      state.setDocumentVerification = payload;
    },
    /* END >> Module>> all lead validations device verification data */
    SET_APPROVE_QR_DOCUMENT (state, payload) {
      state.staticQrApprove = payload
    }
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> all lead validations*/
    FETCH_ALL_LEAD_VALIDATIONS_DATA({
      commit
    }, request) {
      // return api.get("lead-validation-traker-list").then(response => {
      if (request.pagination.sortBy == null) {
        return api
          .get(
            "lead-validation-tracker-pagination-list-paged?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter
          )
          .then(response => {
            // START=> COMMIT with data received'
            commit("SET_ALL_VALIDATIONS_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      } else {
        let sorting = request.pagination.descending ? "asc" : "desc";
        return api
          .get(
            "lead-validation-tracker-pagination-list-paged?page=" +
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
            commit("SET_ALL_VALIDATIONS_DATA", response.data.data);
            // END=> COMMIT with data received'
          });
      }
    },
    /*END >> Module>> all lead validations*/

    /*START >> Module>> short lead data*/
    FETCH_SHORT_LEAD_DATA({
      commit
    }, request) {
      return api.get("lead-information-details/" + request).then(response => {
        // START=> Making documents array'
        var groupDocuments = _.groupBy(
          response.data.data.leadDocuments,
          function (document) {
            return document.documentType;
          }
        );

        Vue.set(response.data.data, "leadDocuments", groupDocuments);
   
        // END=> making documents array'

        // START=> COMMIT with data received'
        commit("SET_SHORT_LEAD_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    /*END >> Module>> short lead data*/

    /*START >> Module>> short lead data*/
    MOVE_BACK_DOCUMENT_VERIFICATION_STAGE({
      commit
    }, request) {
      return api
        .post(
          "back-to-document-validation/" +
          request.leadId +
          "/" +
          request.defaultUrlValue, {}
        )
        .then(response => {
          // START=> COMMIT with data received'
          commit("SET_VERIFY_DOCUMENT_FULL_LEAD", response.data.data);
          // END=> COMMIT with data received'
        });
    },
    /*END >> Module>> short lead data*/

    /*START >> Module>> short lead data*/
    FETCH_LEAD_DOCUMENT_TYPE_DATA({
      commit
    }, request) {
      return api.get("merchant-document-list").then(response => {
        commit("API_RESPONSE_LOG", true);

        // START=> COMMIT with data received'
        commit("SET_SHORT_LEAD_DOCUMENT_TYPE_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    

    FETCH_LEAD_DOCUMENT_TYPE_DATA_QR({
      commit
    }, request) {
      return api.get("merchant-document-list/1").then(response => {
        commit("API_RESPONSE_LOG", true);

        // START=> COMMIT with data received'
        commit("SET_SHORT_LEAD_DOCUMENT_TYPE_DATA_QR", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    
    /*END >> Module>> short lead data*/

    /*START >> Module>> short lead data*/
    VERIFY_DOCUMENT_FULL_LEAD({
      commit
    }, request) {
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
    },
    APPROVE_QR_DOCUMENT ({
      commit
    }, request) {
      return api
        .post(
          'verify-document-qr-lead-information/' +
          request.lead.id +
          '/' +
          request.lead.documentId,
          request.leadDetails
        )
        .then(response => {
          commit('API_RESPONSE_LOG', true)
          // START=> COMMIT with data received'
          commit('SET_APPROVE_QR_DOCUMENT', response.data.data)
          // END=> COMMIT with data received'
        })
    },
    /* END >> Module>> short lead data */

    /*START >> Module>> short lead data*/
    VERIFY_LEAD_DATA({
      commit
    }, request) {
      return api.post(
        "verify-full-lead-information/" +
        request.leadId +
        "/" +
        request.defaultUrlValue,
        request.leadInformation
      );
    },

    VERIFY_QR_LEAD_DATA ({
      commit
    }, request) {
      return api.post(
        'verify-full-qr-lead-information/' +
        request.leadId +
        '/' +
        1,
        request.leadInformation
      )
    },
    /*END >> Module>> short lead data*/

    /*START >> Module>> document verification*/
    VERIFY_LEAD_DOCUMENTS({
      commit
    }, request) {
      return api.put("documentvalidation/" + request.id, request.params);
    },
    /*END >> Module>> document verificatio*/

    VERIFY_QR_LEAD_DOCUMENTS({
      commit
    }, request) {
      return api.put("qrdocumentvalidation/" + request.id, request.params);
    },

    /*START >> Module>> document verification*/
    VERIFY_REJECT_LEAD_DOCUMENTS({
      commit
    }, request) {
      return api.get("reject-lead/" + request.id);
    },
    /* END >> Module>> document verificatio */
    VERIFY_QR_REJECT_LEAD_DOCUMENTS ({
      commit
    }, request) {
      console.log("REJECT",request);
      return api.get('qr-reject-lead/' + request)
    },
    /* START >> Module>> short lead data */
    FEED_HAND_OVER_TO_SAT_DOCUMENT ({
      commit,
      rootState
    }, request) {
      return api
        .post(
          rootState.GlobalVariables.SAT_FILEUPLOADURL +
          "/" +
          request.leadId +
          "/" +
          1 +
          "/" +
          request.documentId,
          request.files, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + localStorage.getItem("auth_token"),
          },
        }
        )
        .then(response => {
          return response.data.data;
        });
    },


    FEED_HAND_OVER_TO_SAT_QR_DOCUMENT ({
      commit,
      rootState
    }, request) {
      return api
        .post(
          rootState.GlobalVariables.SAT_QR_FILEUPLOADURL +
          "/" +
          request.leadId +
          "/" +
          request.documentId   +
          "/" + 1
          ,
          request.files, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + localStorage.getItem("auth_token"),
          },
        }
        )
        .then(response => {
          return response.data.data;
        });
    },

    FEED_HAND_OVER_TO_SAT_FORMS_QR_DOCUMENT ({
      commit,
      rootState
    }, requestParams) {
      console.log("FEED_HAND_OVER_TO_SAT_FORMS_QR_DOCUMENT",requestParams);
      let formData = requestParams.files;
      // formData.append("fileNameOriginal", requestParams.fileNameOriginal);
      return api
        .post(
          rootState.GlobalVariables.SAT_FORMS_QR_FILEUPLOADURL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + localStorage.getItem("auth_token"),
          },
        }
        )
        .then(response => {
          return response.data.data;
        });
    },
    /*END >> Module>> short lead data*/

    /*START >> Module>> short lead data*/
    // 1 => BEACUSE HANDED OVER TO SAT
    FEED_FULL_APPLICATION_FORM({
      commit,
      rootState
    }, request) {
      return api
        .put(
          rootState.GlobalVariables.SAT_APPLICATION_FORM_FILEUPLOADURL +
          "/" +
          request.leadId,
          request.files, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + localStorage.getItem("auth_token"),
          },
        }
        )
        .then(response => {
          return response.data.data;
        })
        .catch(error => {
          return error;
        });
    },
    /*END >> Module>> short lead data*/
    /*START >> Module>> short lead data*/
    // 1 => BEACUSE HANDED OVER TO SAT
    FEED_CHEQUE_FORM({
      commit,
      rootState
    }, request) {
      return api
        .post("https://qaapp.bijlipay.co.in:8085/api/form-submit-with-file",
          request.files, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + localStorage.getItem("auth_token"),
          },
        }
        )
        .then(response => {
          return response.data.data;
        })
        .catch(error => {
          return error;
        });
    },
    /*END >> Module>> short lead data*/

    /*START >> Module>> delete sat uploaded document data*/
    DELETE_DOCUMENT_FROM_BY_SAT({
      commit
    }, request) {
      return api.delete("delete-uploaded-document/" + request.id);
    },
    /*END >> Module>> delete sat uploaded document data*/

    /*START >> Module>> delete sat uploaded document data*/
    UPDATE_DEVICE_ADDRESS({
      commit
    }, request) {
      return api.put(
        "update-tid-implementation-address/" + request.action,
        request
      );
    },
    /*END >> Module>> delete sat uploaded document data*/
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    // test
    /*START >> Module>> delete sat uploaded document data*/
    // SAMPLE({
    //   commit
    // }, request) {
    //   return api
    //     .get("download/submited-sat-pending-days/1538332200000/1540284863560")
    // },

    async SAMPLE() {
      let response = await api.get(
        "download/lead-approval-tracker/1538332200000/1540284863560", {
        responseType: "arraybuffer",
      }
      );
      let blob = new Blob([response.data], {
        type: response.headers.get("content-type"),
      });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", response);
      link.download = (response.headers["Content-Disposition"] || "").split(
        "filename="
      )[0];
      link.click();
    },

    /*END >> Module>> delete sat uploaded document data*/

    /*START >> Module>> delete sat uploaded document data*/
    UPDATE_DEVICE_ADDRESS({
      commit
    }, request) {
      return api.put(
        "update-tid-implementation-address/" + request.action,
        request
      );
    },
    /*END >> Module>> delete sat uploaded document data*/

    /*START >> Module>> delete sat uploaded document data*/
    SAVE_REMARKS({
      commit
    }, request) {
      return api.post("save-banksubvention-remarks/" + request.id, request);
    },
    /*END >> Module>> delete sat uploaded document data*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getShortLeadInfo(state) {
      return state.shortLeadData;
    },
    getShortLeadInfoDocumentTypes(state) {
      return state.shortLeadDocumentTypeData;
    },
    getQrShortLeadInfoDocumentTypes(state) {
      return state.shortLeadDocumentTypeDataQr;
    },
    
    getAllLeadsValidationInfo(state) {
      return state.leadsValidationData;
    },
    getDeviceVerificationStatus(state) {
      return state.setDeviceVerification;
    },
  },
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SatLeadValidation;
