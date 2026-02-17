import { boot } from 'quasar/wrappers'
import _ from "lodash";

export default boot(({ app }) => {
  //** START =>> Global functions <<= */

  // () to find key within object in an array
  app.config.globalProperties.$FUNCTION_FIND_OBJECT_VALUE_USING_OBJECT_KEY = (obj, key) =>
    Object.keys(obj).includes(key);

  //** END =>> Global functions <<= */
 
  app.config.globalProperties.$API_SUCCESS = 200;
  app.config.globalProperties.$API_CONFLICT = 409;
  app.config.globalProperties.$API_BAD_REQUEST = 400;
  app.config.globalProperties.$API_INTERNAL_SERVER_ERROR = 500;

  const storedUser = localStorage.getItem("u_i");
  const parsedUser = (storedUser && storedUser !== "undefined" && storedUser !== "null") ? JSON.parse(storedUser) : null;
  app.config.globalProperties.$USER_INFO_NAME = parsedUser;

  if (parsedUser && parsedUser.roles) {
    app.config.globalProperties.$USER_INFO_HIERARCHY = _.filter(
      parsedUser.roles,
      function (o) {
        return o.hierarchy && o.hierarchy.hierarchyCode == "SL";
      }
    );
  } else {
    app.config.globalProperties.$USER_INFO_HIERARCHY = [];
  }

  //** START =>> Global variables declaration <<= */
  app.config.globalProperties.$DEFAULT_FIRST_SELECTION_VALUE = 0;

  //Finance verification payment tracker
  app.config.globalProperties.$FINANCE_PAYMENT_TYPE_NEFT = 1;
  app.config.globalProperties.$FINANCE_PAYMENT_TYPE_SWIPE = 2;
  app.config.globalProperties.$FINANCE_PAYMENT_TYPE_CHEQUE = 3;

  //Exception KYC lead verification by SAT
  app.config.globalProperties.$EXCEPTION_QUEUE_KYC_SAT_REJECT_URL_PARAM = 1;
  app.config.globalProperties.$EXCEPTION_QUEUE_KYC_SAT_APPROVE_URL_PARAM = 2;

  //Exception KYC lead verification by OPS HEAD
  app.config.globalProperties.$EXCEPTION_QUEUE_KYC_OPS_HEAD_REJECT_URL_PARAM = 3;
  app.config.globalProperties.$EXCEPTION_QUEUE_KYC_OPS_HEAD_APPROVE_URL_PARAM = 4;

  //SAT lead verification status
  app.config.globalProperties.$SAT_LEAD_VALIDATION_REJECT = 1;
  app.config.globalProperties.$SAT_LEAD_VALIDATION_APPROVE = 2;
  app.config.globalProperties.$SAT_LEAD_VALIDATION_PROCEED_TO_DATA_ENTRY_WITH_REFERBACK = 3;

  //Reference values
  app.config.globalProperties.$REJECTED_LEAD_STATUS = 3;
  app.config.globalProperties.$REJECTED_STATUS = 3;
  app.config.globalProperties.$CONSTANT_VALUE_ONE = 1;
  app.config.globalProperties.$CONSTANT_VALUE_TWO = 2;
  app.config.globalProperties.$CONSTANT_VALUE_THREE = 3;
  app.config.globalProperties.$CONSTANT_VALUE_TOUR = 4;
  app.config.globalProperties.$CONSTANT_VALUE_FIVE = 5;
  app.config.globalProperties.$CONSTANT_VALUE_SIX = 6;

  //Rejected screen type status
  app.config.globalProperties.$VERIFICATION_TYPE_DEVICE = 1;
  app.config.globalProperties.$VERIFICATION_TYPE_DOCUMENT = 2;
  app.config.globalProperties.$VERIFICATION_TYPE_KYC = 3;
  app.config.globalProperties.$VERIFICATION_TYPE_PRICING = 4;
  app.config.globalProperties.$VERIFICATION_TYPE_BANKSUBVENTION = 5;
  app.config.globalProperties.$VERIFICATION_TYPE_FINANCE = 6;
  app.config.globalProperties.$VERIFICATION_TYPE_COMMON_REJECT = 7;

  //lead Status
  // app.config.globalProperties.$LEAD_STATUS_SHORT_LEAD = 1;
  // app.config.globalProperties.$LEAD_STATUS_WIP_LEAD = 2;
  // app.config.globalProperties.$LEAD_STATUS_SAT_LEAD = 4;
  // app.config.globalProperties.$LEAD_STATUS_SAT_DATA_ENTRY_PENDING = 5;
  // app.config.globalProperties.$LEAD_STATUS_MARS_PENDING = 6;
  // app.config.globalProperties.$LEAD_STATUS_MARS_REJECTED = 7;
  // app.config.globalProperties.$LEAD_STATUS_MARS_APPROVED = 8;
  // app.config.globalProperties.$LEAD_STATUS_IMPLEMENTED = 9;
  app.config.globalProperties.$LEAD_STATUS_CLOSED = 0;
  app.config.globalProperties.$LEAD_STATUS_SHORT_LEAD = 1;
  app.config.globalProperties.$LEAD_STATUS_WIP_LEAD = 2;
  app.config.globalProperties.$LEAD_STATUS_RSM_PENDING = 3;
  app.config.globalProperties.$LEAD_STATUS_RSM_REJECT = 4;
  app.config.globalProperties.$LEAD_STATUS_NH_PENDING = 5;
  app.config.globalProperties.$LEAD_STATUS_NH_REJECT = 6;
  app.config.globalProperties.$LEAD_STATUS_SUBMIT_TO_SAT_LEAD = 7;
  app.config.globalProperties.$LEAD_STATUS_DATA_ENTRY_PENDING = 8;
  app.config.globalProperties.$LEAD_STATUS_SUBMITED_TO_MARS = 9;
  app.config.globalProperties.$LEAD_STATUS_MARS_REJECTED = 10;
  app.config.globalProperties.$LEAD_STATUS_MARS_APPROVED = 11;
  app.config.globalProperties.$LEAD_STATUS_IMPLEMENT_PENDING = 12;
  app.config.globalProperties.$LEAD_STATUS_IMPLEMENT_APPROVED = 13;
  app.config.globalProperties.$LEAD_STATUS_COMPLETED = 14;
  app.config.globalProperties.$LEAD_STATUS_REFER_BACK = 101;
  app.config.globalProperties.$LEAD_STATUS_BASE_TID_PENDING = 103;
  app.config.globalProperties.$LEAD_STATUS_MARS_SUB_TID_PENDING = 104;
  app.config.globalProperties.$LEAD_STATUS_MARS_REFERRAL_BACK_DATA_ENTRY_PENDING = 102;

  //Constants for SALES MANAGER lead status screen only
  app.config.globalProperties.$SALES_MANAGER_STATUS_SHORT_LEADS = 1;
  app.config.globalProperties.$SALES_MANAGER_STATUS_WIP_LEADS = 2;
  app.config.globalProperties.$SALES_MANAGER_STATUS_REJECTED_LEADS = 3;
  app.config.globalProperties.$SALES_MANAGER_STATUS_SUBMIT_TO_SAT_LEADS = 4;
  app.config.globalProperties.$SALES_MANAGER_STATUS_RSM_PENDING_LEADS = 5;
  app.config.globalProperties.$SALES_MANAGER_STATUS_IMPLEMENTATION_LEADS = 6;
  app.config.globalProperties.$SALES_MANAGER_STATUS_PRICING_LEADS = 7;
  app.config.globalProperties.$SALES_MANAGER_STATUS_KYC_LEADS = 8;
  app.config.globalProperties.$SALES_MANAGER_STATUS_BANKSUBVENTION_LEADS = 9;
  app.config.globalProperties.$SALES_MANAGER_STATUS_MERCHANT_TRACKER_PENDING = 10;
  app.config.globalProperties.$SALES_MANAGER_STATUS_MERCHANT_TRACKER_IMPLEMENTED = 11;

  //lead is status
  app.config.globalProperties.$LEAD_IS_STATUS_NEW = 1;
  app.config.globalProperties.$LEAD_IS_STATUS_PENDING = 2;
  app.config.globalProperties.$LEAD_IS_STATUS_COMPLETE = 3;
  app.config.globalProperties.$LEAD_IS_STATUS_INCOMPLETE = 4;
  app.config.globalProperties.$LEAD_IS_STATUS_CLOSELEAD = 5;

  //VERIFIED DOCUMENT STATUS
  app.config.globalProperties.$VERIFIED_DOCUMENT_STATUS_SUCCESS = 1;
  app.config.globalProperties.$VERIFIED_DOCUMENT_STATUS_PENDING = 2;
  app.config.globalProperties.$VERIFIED_DOCUMENT_STATUS_REJECT = 3;

  //VERIFIED FINANCE STATUS
  app.config.globalProperties.$VERIFIED_FINANCE_STATUS_SUCCESS = 1;
  app.config.globalProperties.$VERIFIED_FINANCE_STATUS_PENDING = 2;
  app.config.globalProperties.$VERIFIED_FINANCE_STATUS_REJECT = 3;

  //VERIFIED KYC STATUS
  app.config.globalProperties.$VERIFIED_KYC_STATUS_SUCCESS = 1;
  app.config.globalProperties.$VERIFIED_KYC_STATUS_SAT_PENDING = 2;
  app.config.globalProperties.$VERIFIED_KYC_STATUS_SAT_REJECT = 3;
  app.config.globalProperties.$VERIFIED_KYC_STATUS_OP_PENDING = 4;
  app.config.globalProperties.$VERIFIED_KYC_STATUS_OP_REJECT = 5;
  app.config.globalProperties.$VERIFIED_KYC_STATUS_FINANCE_PENDING = 6;
  app.config.globalProperties.$VERIFIED_KYC_STATUS_FINANCE_REJECT = 7;

  //VERIFIED PRICING STATUS
  app.config.globalProperties.$VERIFIED_PRICING_STATUS_SUCCESS = 1;
  app.config.globalProperties.$VERIFIED_PRICING_STATUS_RSM_PENDING = 2;
  app.config.globalProperties.$VERIFIED_PRICING_STATUS_RSM_REJECT = 3;
  app.config.globalProperties.$VERIFIED_PRICING_STATUS_FINANCE_PENDING = 4;
  app.config.globalProperties.$VERIFIED_PRICING_STATUS_FINANCE_REJECT = 5;

  //VERIFIED BANKSUBVENTION STATUS
  app.config.globalProperties.$VERIFIED_BANKSUBVENTION_STATUS_SUCCESS = 1;
  app.config.globalProperties.$VERIFIED_BANKSUBVENTION_STATUS_ATTACH_FILE_PENDING = 2;
  app.config.globalProperties.$VERIFIED_BANKSUBVENTION_STATUS_FINANCE_PENDING = 3;
  app.config.globalProperties.$VERIFIED_BANKSUBVENTION_STATUS_FINANCE_REJECT = 4;

  app.config.globalProperties.$HIERARCHY_SALES = "SH";
  app.config.globalProperties.$HIERARCHY_OPERATIONS = "OH";
  app.config.globalProperties.$HIERARCHY_INVENTORY = "INH";
  app.config.globalProperties.$ROLE_BIJLIPAY_MANAGER = "BM";
  app.config.globalProperties.$HIERARCHY_BANKS_OPS = "BOH";
  app.config.globalProperties.$HIERARCHY_SERVICE_CLIENTS = "SC";
  app.config.globalProperties.$HIERARCHY_FINANCE = "FH";
  // app.config.globalProperties.$HIERARCHY_CRM = "CU_0";
  app.config.globalProperties.$HIERARCHY_CRM = "CU";
  app.config.globalProperties.$HIERARCHY_CRM1 = "CU_0";
  

  // Implementation unassinged ans assigned
  app.config.globalProperties.$SEND_ZERO_FOR_UNASSIGING = 0;
  app.config.globalProperties.$MARS_DEVICE_STATUS_TID_GENERATED = 1;
  app.config.globalProperties.$MARS_DEVICE_STATUS_SAT_ASSIGNED = 4;

  //USER ROLE FOR MENU NAVIGATION
  app.config.globalProperties.$ROLE_BIJLIPAY_MANAGER = "BM_1";

  app.config.globalProperties.$ROLE_HIERARCHY_SALES_NATIONAL_HEAD = "SH_2";
  app.config.globalProperties.$ROLE_HIERARCHY_SALES_RSM = "SH_3";
  app.config.globalProperties.$ROLE_HIERARCHY_SALES_ASM = "SH_4";
  app.config.globalProperties.$ROLE_HIERARCHY_SALES_TL = "SH_5";
  app.config.globalProperties.$ROLE_HIERARCHY_SALES_SO = "SH_6";

  app.config.globalProperties.$ROLE_HIERARCHY_OPERATIONS_HEAD = "OH_2";
  // app.config.globalProperties.$ROLE_HIERARCHY_OPERATION_SENIOR_MANAGER = "OH_3";
  app.config.globalProperties.$ROLE_HIERARCHY_OPERATION_SAT = "OH_3";
  app.config.globalProperties.$ROLE_HIERARCHY_IMPLEMENTATION_MANAGER = "OH_4";
  app.config.globalProperties.$ROLE_HIERARCHY_IMPLEMENTATION_EXECUTIVE = "OH_5";

  app.config.globalProperties.$ROLE_HIERARCHY_FINANCE_HEAD = "FH_2";
  app.config.globalProperties.$ROLE_HIERARCHY_FINANCE_MANAGER = "FH_3";
  app.config.globalProperties.$ROLE_HIERARCHY_FINANCE_EXECUTIVE = "FH_4";

  app.config.globalProperties.$ROLE_HIERARCHY_INVENTORY_OFFICER = "INH_2";
  app.config.globalProperties.$ROLE_HIERARCHY_KSN = "INH_0";
  app.config.globalProperties.$ROLE_HIERARCHY_BANK_OPS = "BOH_2";

  //VERIFIED FINAL(COMMON) STATUS
  app.config.globalProperties.$VERIFIED_FINAL_STATUS_SUCCESS = 1;
  app.config.globalProperties.$VERIFIED_FINAL_STATUS_PENDING = 2;
  app.config.globalProperties.$VERIFIED_FINAL_STATUS_REJECT = 3;

  //LEAD CATEGORY
  app.config.globalProperties.$LEAD_CATEGORY_NORMAL = 1;
  app.config.globalProperties.$LEAD_CATEGORY_EXCEPTION = 2;

  //EXCEPTION
  app.config.globalProperties.$EXCEPTION_KYC_IS_CHECKED = true;
  app.config.globalProperties.$EXCEPTION_PRICING_IS_CHECKED = true;
  app.config.globalProperties.$EXCEPTION_BANKSUBVENTION_IS_CHECKED = true;

  //DOUCMENT VERIFIED STATUS
  app.config.globalProperties.$DOCUMENT_VERIFIED_STATUS_SUCCESS = 1;
  app.config.globalProperties.$DOCUMENT_VERIFIED_STATUS_PENDING = 2;
  app.config.globalProperties.$DOCUMENT_VERIFIED_STATUS_REJECT = 3;

  //DOCUMENT UPLOADED TYPE
  app.config.globalProperties.$DOCUMENT_UPLOAEDED_TYPE_HANDOVER_SAT = 1;
  app.config.globalProperties.$DOCUMENT_UPLOAEDED_TYPE_FULL_DOCUMENT_UPLOAD = 2;

  //LEAD SOURCE
  app.config.globalProperties.$LEAD_SOURCE_OPEN_MARCKET = 1;
  app.config.globalProperties.$LEAD_SOURCE_BANK = 2;

  //PAYMENT OPTION
  app.config.globalProperties.$PAYMENT_OPTION_NEFT = 1;
  app.config.globalProperties.$PAYMENT_OPTION_CHEQUE = 2;
  app.config.globalProperties.$PAYMENT_OPTION_SWIPE = 3;

  //ACTION STATUS
  app.config.globalProperties.$ACTION_STATUS_SAVE = 1;
  app.config.globalProperties.$ACTION_STATUS_SUBMIT_SAT = 2;
  //** END =>> Global variables declaration <<= */

  //REGIONAL INVENTROY COUNT LIST FILTER ACTION
  app.config.globalProperties.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE = 1;
  app.config.globalProperties.$REGIONAL_INVENTORY_FILTER_ACTION_DAMAGED = 2;
  app.config.globalProperties.$REGIONAL_INVENTORY_FILTER_ACTION_PENDING_ALLOCATION = 3;
  app.config.globalProperties.$REGIONAL_INVENTORY_FILTER_ACTION_INBOUND_DEVICE = 4;
  app.config.globalProperties.$REGIONAL_INVENTORY_FILTER_ACTION_ALLOCATED_DEVICE = -5;

  app.config.globalProperties.$REGIONAL_INVENTORY_ALL_DEVICES = -1;
  app.config.globalProperties.$REGIONAL_INVENTORY_DAMAGED_DEVICE = -2;
  app.config.globalProperties.$REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE = -3;
  app.config.globalProperties.$REGIONAL_INVENTORY_INBOUND_DEVICE = -4;
  app.config.globalProperties.$REGIONAL_INVENTORY_INVENTORY_SO = -5;
  app.config.globalProperties.$REGIONAL_INVENTORY_ALLOCATED_DEVICE = -5;
  app.config.globalProperties.$REGIONAL_INVENTORY_FAULTY_DEVICE = -6;



  //Central inventory dashboard to fetchj count for regional device count
  app.config.globalProperties.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE = 1;

  //Partners tab visibility for the below values only
  app.config.globalProperties.$PARTNERS_TAB_ENABLED_ITEMS = ["PL", "PB", "TR", "SO", "OT"];
  app.config.globalProperties.$AXIS_TAB_ENABLED_ITEMS = "OPEN MARKET"

  //Fetch Active/Inactive flag for list
  app.config.globalProperties.$ACTIVE_FLAG_FOR_LIST = 1;
  app.config.globalProperties.$INACTIVE_FLAG_FOR_LIST = 0;
});
