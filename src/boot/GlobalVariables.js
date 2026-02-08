// import something here
import _ from "lodash";
// leave the export, even if you don't use it
export default ({
  app,
  router,
  Vue
}) => {
  //** START =>> Global functions <<= */

  // () to find key within object in an array
  Vue.prototype.$FUNCTION_FIND_OBJECT_VALUE_USING_OBJECT_KEY = (obj, key) =>
    Object.keys(obj).includes(key);

  //** END =>> Global functions <<= */
 
  Vue.prototype.$API_SUCCESS = 200;
  Vue.prototype.$API_CONFLICT = 409;
  Vue.prototype.$API_BAD_REQUEST = 400;
  Vue.prototype.$API_INTERNAL_SERVER_ERROR = 500;

  Vue.prototype.$USER_INFO_NAME = JSON.parse(localStorage.getItem("u_i"));

  if (localStorage.getItem("u_i") != undefined) {
    Vue.prototype.$USER_INFO_HIERARCHY = _.filter(
      JSON.parse(localStorage.getItem("u_i")).roles,
      function (o) {
        return o.hierarchy.hierarchyCode == "SL";
      }
    );
  }

  //** START =>> Global variables declaration <<= */
  Vue.prototype.$DEFAULT_FIRST_SELECTION_VALUE = 0;

  //Finance verification payment tracker
  Vue.prototype.$FINANCE_PAYMENT_TYPE_NEFT = 1;
  Vue.prototype.$FINANCE_PAYMENT_TYPE_SWIPE = 2;
  Vue.prototype.$FINANCE_PAYMENT_TYPE_CHEQUE = 3;

  //Exception KYC lead verification by SAT
  Vue.prototype.$EXCEPTION_QUEUE_KYC_SAT_REJECT_URL_PARAM = 1;
  Vue.prototype.$EXCEPTION_QUEUE_KYC_SAT_APPROVE_URL_PARAM = 2;

  //Exception KYC lead verification by OPS HEAD
  Vue.prototype.$EXCEPTION_QUEUE_KYC_OPS_HEAD_REJECT_URL_PARAM = 3;
  Vue.prototype.$EXCEPTION_QUEUE_KYC_OPS_HEAD_APPROVE_URL_PARAM = 4;

  //SAT lead verification status
  Vue.prototype.$SAT_LEAD_VALIDATION_REJECT = 1;
  Vue.prototype.$SAT_LEAD_VALIDATION_APPROVE = 2;
  Vue.prototype.$SAT_LEAD_VALIDATION_PROCEED_TO_DATA_ENTRY_WITH_REFERBACK = 3;

  //Reference values
  Vue.prototype.$REJECTED_LEAD_STATUS = 3;
  Vue.prototype.$REJECTED_STATUS = 3;
  Vue.prototype.$CONSTANT_VALUE_ONE = 1;
  Vue.prototype.$CONSTANT_VALUE_TWO = 2;
  Vue.prototype.$CONSTANT_VALUE_THREE = 3;
  Vue.prototype.$CONSTANT_VALUE_TOUR = 4;
  Vue.prototype.$CONSTANT_VALUE_FIVE = 5;
  Vue.prototype.$CONSTANT_VALUE_SIX = 6;

  //Rejected screen type status
  Vue.prototype.$VERIFICATION_TYPE_DEVICE = 1;
  Vue.prototype.$VERIFICATION_TYPE_DOCUMENT = 2;
  Vue.prototype.$VERIFICATION_TYPE_KYC = 3;
  Vue.prototype.$VERIFICATION_TYPE_PRICING = 4;
  Vue.prototype.$VERIFICATION_TYPE_BANKSUBVENTION = 5;
  Vue.prototype.$VERIFICATION_TYPE_FINANCE = 6;
  Vue.prototype.$VERIFICATION_TYPE_COMMON_REJECT = 7;

  //lead Status
  // Vue.prototype.$LEAD_STATUS_SHORT_LEAD = 1;
  // Vue.prototype.$LEAD_STATUS_WIP_LEAD = 2;
  // Vue.prototype.$LEAD_STATUS_SAT_LEAD = 4;
  // Vue.prototype.$LEAD_STATUS_SAT_DATA_ENTRY_PENDING = 5;
  // Vue.prototype.$LEAD_STATUS_MARS_PENDING = 6;
  // Vue.prototype.$LEAD_STATUS_MARS_REJECTED = 7;
  // Vue.prototype.$LEAD_STATUS_MARS_APPROVED = 8;
  // Vue.prototype.$LEAD_STATUS_IMPLEMENTED = 9;
  Vue.prototype.$LEAD_STATUS_CLOSED = 0;
  Vue.prototype.$LEAD_STATUS_SHORT_LEAD = 1;
  Vue.prototype.$LEAD_STATUS_WIP_LEAD = 2;
  Vue.prototype.$LEAD_STATUS_RSM_PENDING = 3;
  Vue.prototype.$LEAD_STATUS_RSM_REJECT = 4;
  Vue.prototype.$LEAD_STATUS_NH_PENDING = 5;
  Vue.prototype.$LEAD_STATUS_NH_REJECT = 6;
  Vue.prototype.$LEAD_STATUS_SUBMIT_TO_SAT_LEAD = 7;
  Vue.prototype.$LEAD_STATUS_DATA_ENTRY_PENDING = 8;
  Vue.prototype.$LEAD_STATUS_SUBMITED_TO_MARS = 9;
  Vue.prototype.$LEAD_STATUS_MARS_REJECTED = 10;
  Vue.prototype.$LEAD_STATUS_MARS_APPROVED = 11;
  Vue.prototype.$LEAD_STATUS_IMPLEMENT_PENDING = 12;
  Vue.prototype.$LEAD_STATUS_IMPLEMENT_APPROVED = 13;
  Vue.prototype.$LEAD_STATUS_COMPLETED = 14;
  Vue.prototype.$LEAD_STATUS_REFER_BACK = 101;
  Vue.prototype.$LEAD_STATUS_BASE_TID_PENDING = 103;
  Vue.prototype.$LEAD_STATUS_MARS_SUB_TID_PENDING = 104;
  Vue.prototype.$LEAD_STATUS_MARS_REFERRAL_BACK_DATA_ENTRY_PENDING = 102;

  //Constants for SALES MANAGER lead status screen only
  Vue.prototype.$SALES_MANAGER_STATUS_SHORT_LEADS = 1;
  Vue.prototype.$SALES_MANAGER_STATUS_WIP_LEADS = 2;
  Vue.prototype.$SALES_MANAGER_STATUS_REJECTED_LEADS = 3;
  Vue.prototype.$SALES_MANAGER_STATUS_SUBMIT_TO_SAT_LEADS = 4;
  Vue.prototype.$SALES_MANAGER_STATUS_RSM_PENDING_LEADS = 5;
  Vue.prototype.$SALES_MANAGER_STATUS_IMPLEMENTATION_LEADS = 6;
  Vue.prototype.$SALES_MANAGER_STATUS_PRICING_LEADS = 7;
  Vue.prototype.$SALES_MANAGER_STATUS_KYC_LEADS = 8;
  Vue.prototype.$SALES_MANAGER_STATUS_BANKSUBVENTION_LEADS = 9;
  Vue.prototype.$SALES_MANAGER_STATUS_MERCHANT_TRACKER_PENDING = 10;
  Vue.prototype.$SALES_MANAGER_STATUS_MERCHANT_TRACKER_IMPLEMENTED = 11;

  //lead is status
  Vue.prototype.$LEAD_IS_STATUS_NEW = 1;
  Vue.prototype.$LEAD_IS_STATUS_PENDING = 2;
  Vue.prototype.$LEAD_IS_STATUS_COMPLETE = 3;
  Vue.prototype.$LEAD_IS_STATUS_INCOMPLETE = 4;
  Vue.prototype.$LEAD_IS_STATUS_CLOSELEAD = 5;

  //VERIFIED DOCUMENT STATUS
  Vue.prototype.$VERIFIED_DOCUMENT_STATUS_SUCCESS = 1;
  Vue.prototype.$VERIFIED_DOCUMENT_STATUS_PENDING = 2;
  Vue.prototype.$VERIFIED_DOCUMENT_STATUS_REJECT = 3;

  //VERIFIED FINANCE STATUS
  Vue.prototype.$VERIFIED_FINANCE_STATUS_SUCCESS = 1;
  Vue.prototype.$VERIFIED_FINANCE_STATUS_PENDING = 2;
  Vue.prototype.$VERIFIED_FINANCE_STATUS_REJECT = 3;

  //VERIFIED KYC STATUS
  Vue.prototype.$VERIFIED_KYC_STATUS_SUCCESS = 1;
  Vue.prototype.$VERIFIED_KYC_STATUS_SAT_PENDING = 2;
  Vue.prototype.$VERIFIED_KYC_STATUS_SAT_REJECT = 3;
  Vue.prototype.$VERIFIED_KYC_STATUS_OP_PENDING = 4;
  Vue.prototype.$VERIFIED_KYC_STATUS_OP_REJECT = 5;
  Vue.prototype.$VERIFIED_KYC_STATUS_FINANCE_PENDING = 6;
  Vue.prototype.$VERIFIED_KYC_STATUS_FINANCE_REJECT = 7;

  //VERIFIED PRICING STATUS
  Vue.prototype.$VERIFIED_PRICING_STATUS_SUCCESS = 1;
  Vue.prototype.$VERIFIED_PRICING_STATUS_RSM_PENDING = 2;
  Vue.prototype.$VERIFIED_PRICING_STATUS_RSM_REJECT = 3;
  Vue.prototype.$VERIFIED_PRICING_STATUS_FINANCE_PENDING = 4;
  Vue.prototype.$VERIFIED_PRICING_STATUS_FINANCE_REJECT = 5;

  //VERIFIED BANKSUBVENTION STATUS
  Vue.prototype.$VERIFIED_BANKSUBVENTION_STATUS_SUCCESS = 1;
  Vue.prototype.$VERIFIED_BANKSUBVENTION_STATUS_ATTACH_FILE_PENDING = 2;
  Vue.prototype.$VERIFIED_BANKSUBVENTION_STATUS_FINANCE_PENDING = 3;
  Vue.prototype.$VERIFIED_BANKSUBVENTION_STATUS_FINANCE_REJECT = 4;

  Vue.prototype.$HIERARCHY_SALES = "SH";
  Vue.prototype.$HIERARCHY_OPERATIONS = "OH";
  Vue.prototype.$HIERARCHY_INVENTORY = "INH";
  Vue.prototype.$ROLE_BIJLIPAY_MANAGER = "BM";
  Vue.prototype.$HIERARCHY_BANKS_OPS = "BOH";
  Vue.prototype.$HIERARCHY_SERVICE_CLIENTS = "SC";
  Vue.prototype.$HIERARCHY_FINANCE = "FH";
  // Vue.prototype.$HIERARCHY_CRM = "CU_0";
  Vue.prototype.$HIERARCHY_CRM = "CU";
  Vue.prototype.$HIERARCHY_CRM1 = "CU_0";
  

  // Implementation unassinged ans assigned
  Vue.prototype.$SEND_ZERO_FOR_UNASSIGING = 0;
  Vue.prototype.$MARS_DEVICE_STATUS_TID_GENERATED = 1;
  Vue.prototype.$MARS_DEVICE_STATUS_SAT_ASSIGNED = 4;

  //USER ROLE FOR MENU NAVIGATION
  Vue.prototype.$ROLE_BIJLIPAY_MANAGER = "BM_1";

  Vue.prototype.$ROLE_HIERARCHY_SALES_NATIONAL_HEAD = "SH_2";
  Vue.prototype.$ROLE_HIERARCHY_SALES_RSM = "SH_3";
  Vue.prototype.$ROLE_HIERARCHY_SALES_ASM = "SH_4";
  Vue.prototype.$ROLE_HIERARCHY_SALES_TL = "SH_5";
  Vue.prototype.$ROLE_HIERARCHY_SALES_SO = "SH_6";

  Vue.prototype.$ROLE_HIERARCHY_OPERATIONS_HEAD = "OH_2";
  // Vue.prototype.$ROLE_HIERARCHY_OPERATION_SENIOR_MANAGER = "OH_3";
  Vue.prototype.$ROLE_HIERARCHY_OPERATION_SAT = "OH_3";
  Vue.prototype.$ROLE_HIERARCHY_IMPLEMENTATION_MANAGER = "OH_4";
  Vue.prototype.$ROLE_HIERARCHY_IMPLEMENTATION_EXECUTIVE = "OH_5";

  Vue.prototype.$ROLE_HIERARCHY_FINANCE_HEAD = "FH_2";
  Vue.prototype.$ROLE_HIERARCHY_FINANCE_MANAGER = "FH_3";
  Vue.prototype.$ROLE_HIERARCHY_FINANCE_EXECUTIVE = "FH_4";

  Vue.prototype.$ROLE_HIERARCHY_INVENTORY_OFFICER = "INH_2";
  Vue.prototype.$ROLE_HIERARCHY_KSN = "INH_0";
  Vue.prototype.$ROLE_HIERARCHY_BANK_OPS = "BOH_2";

  //VERIFIED FINAL(COMMON) STATUS
  Vue.prototype.$VERIFIED_FINAL_STATUS_SUCCESS = 1;
  Vue.prototype.$VERIFIED_FINAL_STATUS_PENDING = 2;
  Vue.prototype.$VERIFIED_FINAL_STATUS_REJECT = 3;

  //LEAD CATEGORY
  Vue.prototype.$LEAD_CATEGORY_NORMAL = 1;
  Vue.prototype.$LEAD_CATEGORY_EXCEPTION = 2;

  //EXCEPTION
  Vue.prototype.$EXCEPTION_KYC_IS_CHECKED = true;
  Vue.prototype.$EXCEPTION_PRICING_IS_CHECKED = true;
  Vue.prototype.$EXCEPTION_BANKSUBVENTION_IS_CHECKED = true;

  //DOUCMENT VERIFIED STATUS
  Vue.prototype.$DOCUMENT_VERIFIED_STATUS_SUCCESS = 1;
  Vue.prototype.$DOCUMENT_VERIFIED_STATUS_PENDING = 2;
  Vue.prototype.$DOCUMENT_VERIFIED_STATUS_REJECT = 3;

  //DOCUMENT UPLOADED TYPE
  Vue.prototype.$DOCUMENT_UPLOAEDED_TYPE_HANDOVER_SAT = 1;
  Vue.prototype.$DOCUMENT_UPLOAEDED_TYPE_FULL_DOCUMENT_UPLOAD = 2;

  //LEAD SOURCE
  Vue.prototype.$LEAD_SOURCE_OPEN_MARCKET = 1;
  Vue.prototype.$LEAD_SOURCE_BANK = 2;

  //PAYMENT OPTION
  Vue.prototype.$PAYMENT_OPTION_NEFT = 1;
  Vue.prototype.$PAYMENT_OPTION_CHEQUE = 2;
  Vue.prototype.$PAYMENT_OPTION_SWIPE = 3;

  //ACTION STATUS
  Vue.prototype.$ACTION_STATUS_SAVE = 1;
  Vue.prototype.$ACTION_STATUS_SUBMIT_SAT = 2;
  //** END =>> Global variables declaration <<= */

  //REGIONAL INVENTROY COUNT LIST FILTER ACTION
  Vue.prototype.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE = 1;
  Vue.prototype.$REGIONAL_INVENTORY_FILTER_ACTION_DAMAGED = 2;
  Vue.prototype.$REGIONAL_INVENTORY_FILTER_ACTION_PENDING_ALLOCATION = 3;
  Vue.prototype.$REGIONAL_INVENTORY_FILTER_ACTION_INBOUND_DEVICE = 4;
  Vue.prototype.$REGIONAL_INVENTORY_FILTER_ACTION_ALLOCATED_DEVICE = -5;

  Vue.prototype.$REGIONAL_INVENTORY_ALL_DEVICES = -1;
  Vue.prototype.$REGIONAL_INVENTORY_DAMAGED_DEVICE = -2;
  Vue.prototype.$REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE = -3;
  Vue.prototype.$REGIONAL_INVENTORY_INBOUND_DEVICE = -4;
  Vue.prototype.$REGIONAL_INVENTORY_INVENTORY_SO = -5;
  Vue.prototype.$REGIONAL_INVENTORY_ALLOCATED_DEVICE = -5;
  Vue.prototype.$REGIONAL_INVENTORY_FAULTY_DEVICE = -6;



  //Central inventory dashboard to fetchj count for regional device count
  Vue.prototype.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE = 1;

  //Partners tab visibility for the below values only
  Vue.prototype.$PARTNERS_TAB_ENABLED_ITEMS = ["PL", "PB", "TR", "SO", "OT"];
  Vue.prototype.$AXIS_TAB_ENABLED_ITEMS = "OPEN MARKET"

  //Fetch Active/Inactive flag for list
  Vue.prototype.$ACTIVE_FLAG_FOR_LIST = 1;
  Vue.prototype.$INACTIVE_FLAG_FOR_LIST = 0;
};
