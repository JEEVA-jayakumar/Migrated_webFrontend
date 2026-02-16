import { url, and } from '@vuelidate/validators';
import {
  SessionStorage
} from "quasar";
/* START >> Store modules => Super Admin Users */
// const LOCAL_BASEURL_FOR_FILES = "http://192.168.10.197:8080/";

// const LOCAL_BASEURL_FOR_FILES = "http://192.168.10.180:8080/";
// const LOCAL_BASEURL_FOR_FILES = "http://192.168.10.163:8080/";
// const LOCAL_BASEURL_FOR_FILES = "http://192.168.10.180:8080/";
// const LOCAL_BASEURL_FOR_FILES = "https://api.bijlipay.co.in/";
// const LOCAL_BASEURL_FOR_FILES = "http://192.168.4.204:8080/"
// const LOCAL_BASEURL_FOR_FILES = "http://192.168.4.204:8080/";
// const LOCAL_BASEURL_FOR_FILES = "http://182.156.237.85:8080/";
// const LOCAL_BASEURL_FOR_FILES = "https://qaapp.bijlipay.co.in:8085/";
const LOCAL_BASEURL_FOR_FILES = "https://qaapp.bijlipay.co.in:8085/"
//const LOCAL_BASEURL_FOR_FILES = "https://qaapp.bijlipay.co.in:8085/"
// const LOCAL_BASEURL_FOR_FILES = "http://192.168.4.205:8080/";
// const MARS_API_URL = "http://10.20.20.49:8090/";
// const MARS_API_URL = "http://1.23.166.107:8090/";

//UAT
// const MARS_API_URL = "http://182.156.237.86:9090/";
// const MARS_API = "http://182.156.237.85:9081/"
const MARS_API = "https://qaapp.bijlipay.co.in:8085/"
//const MARS_API = "https://qaapp.bijlipay.co.in:8085/"
// const MARS_API = "http://192.168.4.204:8080/"
// const LOCAL_API = "http://182.156.237.85:9081/"
//const LOCAL_API = "https://qaapp.bijlipay.co.in:8085/"
const LOCAL_API = "https://qaapp.bijlipay.co.in:8085/"
//const APP_API = "https://qaapp.bijlipay.co.in:8085/"
const APP_API = "https://qaapp.bijlipay.co.in:8085/"
const AXIS_PINCODE = "https://smart.bijlipay.co.in:6091/"
const MERCHANT = "https://bportal.bijlipay.co.in:8081/"

//Production
// const MARS_API_URL = "http://182.156.237.81:9090/";
// const MARS_API_URL = "http://10.20.20.49:9090/";
// const MARS_API_URL = "http://182.156.237.86:9090/";
// const MARS_API_URL = " http://10.20.2.0.49:8096/";
// const MARS_API_URL = "https://test01.bijlipay.co.in:9090/";
// const MARS_AXIS_API_URL = "https://marsaxis.bijlipay.co.in:9090/";
 const MARS_AXIS_API_URL = "https://test01.bijlipay.co.in:9090/";
// const MARS_API_URL = " http://10.20.20.49:8096/"; 
const MARS_API_URL = "https://test01.bijlipay.co.in:9090/";
// const MARS_API_URL = "https://mars01.bijlipay.co.in:9090/";
const MARS_EDC_API_URL = "https://test01.bijlipay.co.in:9090";
//  const MARS_EDC_API_URL = "https://marspp.bijlipay.co.in:9090/";  /* EDC */
// const MARS_API_URL = "https://mars01.bijlipay.co.in:9090/";
// const MARS_API_URL = "https://mars01.bijlipay.co.in:9090/";

const STATUS_VARIABLES = {
  //============================================
  // LEAD STATUS
  LEAD_STATUS: {
    "0": "Lead Closed", // indianred
    "1": "Short Lead", // pink
    "2": "WIP Lead", // purple
    "3": "RSM Pending", // indigo
    "4": "RSM Reject", // blue
    "5": "National Head Pending", // lightblue
    "6": "National Head Rejected", // lightsalmon
    "7": "Submit To SAT Lead", // teal
    "8": "Data Entry Pending", // wheat
    "9": "Submited To MARS", // lightgreen
    "10": "Mars Rejected", // lightcoral
    "11": "Mars Approved", // springgreen
    "101": "Mars Referral Back", // tomato
    "102": "Mars Referral Back Data Entry Pending",
    "12": "Implemention Pending",
    "13": "Implemention APPROVED",
    "14": "All Devices Implemented"
  },
  // REGIONAL INVENTORY DEVICE STATUS
  REGIONAL_INVENTORY_DEVICE_STATUS: {
    "1": "Active", // lightgreen
    "2": "Damaged Fault", // orange
    "6": "Damaged Fault From App", // wheat 
    "7": "Lost Or Stolen Marked By SO", // lightsalmon
    "8": "Lost Or Stolen Marked By SAT", // Waiting for finance Approval // lightcoral
    "9": "Lost Or Stolen Finance Approved", // Finance Approved // springgreen
    "10": "Lost Or Stolen Finance Rejected" // Finance Rejected // tomato
  },
  // REGIONAL INVENTORY DEVICE STATUS
  QR_LEAD_STATUS: {
    "0": "Existing merchant QR",
    "1": "Pending With Bank Details", // pink
    "2": "Pending With Document Upload", // purple
    "3": "Pending With QR Scan", // indigo
    "4": "Pending With Manual Verification", // blue
    "5": "Pending With MDR and Rental Details", // lightblue
    "6": "Submitted to MARS", // lightsalmon
    "7": "Approved", // teal
    "8": "Reffer Back", // wheat
    "9": "Reffer Back Resubmit", // lightgreen
    "10": "QR Activated", // lightcoral
    "11": "Mars Rejected", // springgreen
    "12": "Waiting For Response File", // tomato
    "13": "Pending With Personal Info",
    "14": "Pending With Risk Info",
    "20": "Pending With Inventory",
    },
  // CENTRAL INVENTORY TABLE
  CENTRAL_INVENTORY_DEVICE_STATUS: {
    "1": "Active", // springgreen
    "2": "Damaged Or Fault", // tomato
    "3": "Sent To Repair", // lightsalmon
    "4": "Moved To Scrap", // lightcoral
    "5": "Lost Or Stolen" // amber
  },
  // MARS DEVICE DETAILS TABLE
  TID_STATUS: {
    "1": "Tid Generated", // lightgreen
    "2": "Mars Inactive", // orange
    "3": "Mars Terminated", // red
    "4": "Sat Assigned", // lightblue
    "5": "Scan Picked", // blue
    "6": "Implemented", // springgreen
    "8": "Verification Failed", // tomato
    "7": "Implemented Sat Pending", // lightcoral
    "9":  "Implementation InProgress"
  },
  TID_RECOVERY_STATUS: {
    // MARS RECOVERY DEVICE STATUS
    "1": "Unpicked", // lightcoral
    "2": "Picked Yet Tt Submit", // lightsalmon
    "3": "Picked Submited", // springgreen
    "4": "Moved To Inventory" // lightgreen
  },
  TID_REPLACEMENT_STATUS: {        
    // MARS REPLACEMENT DEVICE STATUS
    "1": "Unpicked", // lightcoral
    "2": "Picked", // lightgreen
    "3": "Submitted" // springgreen
  }
};

const GlobalVariables = {
  namespaced: true,

  /* ===================================
    >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
    ====================================== */
  /* START >> State setup goes here */
  state: {
    /* START >> Module>> view uploaded assets url */
    FILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + "api/form-submit-with-file/",
    /* END >> Module>> view uploaded assets url */

    /* START >> Module>> view uploaded assets url */
    SAT_FILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + "api/upload-lead-document",
    SAT_QR_FILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + "api/upload-qr-lead-document",
    SAT_FORMS_QR_FILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + "api/form-submit-with-file",
    SAT_APPLICATION_FORM_FILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + "api/update-front-page-application",
    INVENTORY_BULKFILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + "api/add-bulk-device-to-central-inventory",
    // http://localhost:8083/mars//upload-hitachi-brand-emi-details
    HITACHI_BRAND_EMI_UPLOAD_ACTION: LOCAL_BASEURL_FOR_FILES + "api/upload-hitachi-brand-emi-details",
    TICKET_CREATION_UPLOAD: LOCAL_BASEURL_FOR_FILES + "api/crm-request/upload-excel-based-tid",
    TICKET_CLOSE_UPLOAD: LOCAL_BASEURL_FOR_FILES + "api/crm-request/close-ticket",
    TICKET_ASSIGN_UPLOAD: LOCAL_BASEURL_FOR_FILES + "api/crm-request/service-ticket-assigned",
    PHONEPE_INVENTORY_BULKFILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + "api/aggregator-inventory/add-bulk-device-to-agg-central-inventory",
    AGGREGATOR_REFURBISH_INVENTORY_BULKFILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + "api/aggregator-inventory/upload-refurbishment-file",
    INVENTORY_BULKFILEUPLOADURL_SENDTOREPAIR: LOCAL_BASEURL_FOR_FILES + "api/add-bulk-sent-to-repair-inventory/3",
    INVENTORY_BULKFILEUPLOADURL_MOVEDTOSCRAP: LOCAL_BASEURL_FOR_FILES + "api/add-bulk-sent-to-repair-inventory/4",
    SAT_HITACHIONBOARINGFILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + 'api/uploadFileToOnboardIndianBank',
    SAT_STATICQRFILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + 'api/upload',
    /*Aggregators APi */
    INVENTORY_BULKFILEUPLOADURL_AGGREGATORSSENDTOREPAIR: LOCAL_BASEURL_FOR_FILES + "api/aggregator-inventory/agg-add-bulk-sent-to-repair-inventory/3",
    INVENTORY_BULKFILEUPLOADURL_AGGREGATORSMOVEDTOSCRAP: LOCAL_BASEURL_FOR_FILES + "api/aggregator-inventory/agg-add-bulk-sent-to-repair-inventory/4",
    SAT_ONBOARINGFILEUPLOADURL: LOCAL_BASEURL_FOR_FILES + 'api/existing-merchant',
    SIM_ACTIVATION_UPLOAD:LOCAL_BASEURL_FOR_FILES + 'api/sim/activateSim',
    SIM_DEACTIVATION_UPLOAD:LOCAL_BASEURL_FOR_FILES + 'api/sim/deactivateSim',
    SIM_ACTIVATION_UPLOAD_CENTRAL_INVENTORY:LOCAL_BASEURL_FOR_FILES + 'api/sim/central-inventory-activated',
    SIM_DEACTIVATION_UPLOAD_CENTRAL_INVENTORY:LOCAL_BASEURL_FOR_FILES + 'api/sim/central-inventory-deactivate',
    /*Aggregators APi */

    /* END >> Module>> view uploaded assets url */

    /* START >> Module>> all file upload url */
    ASSETSURL: LOCAL_BASEURL_FOR_FILES + "file/downloadFile",
    /* END >> Module>> all file upload url */



    /* START >> Module>> all file upload url */
    ASSETSURLFINANCE: LOCAL_BASEURL_FOR_FILES + "file/downloadFile",
    /* END >> Module>> all file upload url */


    /* START >> Module>> LOGIN url */
    LOGIN_URL: LOCAL_BASEURL_FOR_FILES + "authorization/login",
    // LOGIN_URL: LOCAL_BASEURL_FOR_FILES + 'authorization/login',

    STATE_MARS_API_URL: MARS_API_URL + "v1/parameters/",
    STATE_MARS_EDC_ON_BOARD_API_URL: MARS_EDC_API_URL + "v1/parameters/",
    STATE_MARS_API: MARS_API + "api/parameters/",
    STATE_LOCAL_API: LOCAL_API + "api/",
    STATE_APP_API: APP_API + "api/",
    STATE_AXIS_API: AXIS_PINCODE + "api/",
    STATE_MERCHANT: MERCHANT + "admin/",

    STATE_MARS_ON_BOARD_API_URL: MARS_API_URL + "v1/",
    STATE_MARS_AXIS_ON_BOARD_API_URL : MARS_AXIS_API_URL  + "v1/",
    STATE_MARS_EDC_ON_BOARD_API_URL: MARS_EDC_API_URL + "v1/",
    /* END >> Module>> LOGIN url */

    /* START >> Module>> FORGOTPASSWORD_URL */
    FORGOTPASSWORD_URL: LOCAL_BASEURL_FOR_FILES + "authorization/forgot/password",
    /* END >> Module>> FORGOTPASSWORD_URL */

    /* START >> Module>> UPDATEPASSWORD_URL */
    UPDATEPASSWORD_URL: LOCAL_BASEURL_FOR_FILES + "authorization/password",
    /* END >> Module>> FORGOTPASSWORD_URL */

    // // USER_PERSONAL_INFO: SessionStorage.getItem("role"),

    /* Lead, TID, Serial Number Status */
    STATE_STATUS_VARIABLES: STATUS_VARIABLES
  },
  /* END << State setup goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>MUTATIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /* START >> Mutation actions goes here */
  mutations: {},
  /* END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /* START >> All actions like vuex, goes here */
  actions: {},
  /* END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /* START >> getter actions goes here */
  getters: {
    GLOBAL_USER_INFO_COLLECTION(state) {
      return SessionStorage.getItem("role");
    },
    GLOBAL_FILE_UPLOAD_URL(state) {
      return state.FILEUPLOADURL;
    },
    GLOBAL_FILE_FETCH_URL(state) {
      return state.ASSETSURL;
    }, 
    GLOBAL_FILE_FETCH_FINANCE_URL(state) {
      return state.ASSETSURLFINANCE;
    }, 
    GLOBAL_STATUS_FETCH(state) {
      return state.STATE_STATUS_VARIABLES;
    }
  },
  /* END << getter actions goes here */

};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default GlobalVariables;
