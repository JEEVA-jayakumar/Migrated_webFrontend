import api from "../api.js";
export const VERIFY_DEVICE_ON_REQUEST = ({ commit }, request) => {
  return api.get(
    "check-device-recovery-status/" +
    request.device +
    "/" +
    request.serialNumber
  );
};

export const DEVICE_INVENTORY_UPLOAD = ({ commit }, request) => {
  return api.put("device-recovery-update-inventory/" + request.action, request);
};

export const DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID = (
  { commit },
  request
) => {
  return api.get(
    "verify-fault-central-inventory/" + request.device + "/" + request.barcode
  );
};
 export const AGGREGATOR_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID = (
  { commit },
  request
) => {
  return api.get(
    "aggregator-inventory/agg-verify-fault-central-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/"+ request.device + "/" + request.barcode
  );
};
 export const DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION = (
  { commit },
  request
) => {
  return api.get(
    "verify-central-to-regional-inventory/" +
    request.device +
    "/" +
    request.barcode
  );
};
/*PHONE PE API */
export const PHONE_PE_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION = (
  { commit },
  request
) => {
  console.log("PHONE_PE_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION ---->",JSON.stringify(request))
  return api.get(
    "aggregator-inventory/agg-verify-central-to-regional-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/" +
    request.device +
    "/" +
    request.barcode
  );
};
/*PHONE PE API */
export const DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_SO_ALLOCATION = (
  { commit },
  request
) => {
  return api.get(
    "verify-regional-To-so-reseller-inventory/" +
    request.device +
    "/" +
    request.barcode
  );
};

export const BIJLIPAY_SELF_ASSIGNMENT_TRACKER = (
  { commit },
  request
) => {
  return api.get(
    "self-assignment-tracker-list/1?page="+
    request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&search=' +
      request.filter
      //  +
      // '&sort='
      //  +
      // request.pagination.sortBy +
      // '&' +
      // request.pagination.sortBy +
      // '.dir=' +
      // sorting
  );
};


export const AGGREGATOR_SELF_ASSIGNMENT_TRACKER = (
  { commit },
  request
) => {
  return api.get(
    "self-assignment-tracker-list/2?page="+
    request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&search=' +
      request.filter
      //  +
      // '&sort='
      //  +
      // request.pagination.sortBy +
      // '&' +
      // request.pagination.sortBy +
      // '.dir=' +
      // sorting
  );
};

export const DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_SO_TO_SO_ALLOCATION = (
  { commit },
  request
) => {
  return api.post(
    "scan-sat-so-device/" +
   1 +
    "/" +
    request.barcode
  );
};

export const APPROVE_BIJLIPAY_SELF_ASSIGNMENT = (
  { commit },
  request
) => {
  return api.post(
    "sat-accept/1",request
  );
};

export const APPROVE_AGGREGATOR_SELF_ASSIGNMENT = (
  { commit },
  request
) => {
  return api.post(
    "sat-accept/2",request
  );
};

export const REJECT_SELF_ASSIGNMENT = (
  { commit },
  request
) => {
  return api.post(
    "sat-reject",request
  );
};
export const AGGREGATOR_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_SO_TO_SO_ALLOCATION = (
  { commit },
  request
) => {
  return api.post(
    "scan-sat-so-device/" +
   2 +
    "/" +
    request.barcode
  );
};
/* AGGREGATOR API */

export const AGGREGATORS_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_SO_ALLOCATION = (
  { commit },
  request
) => {
  return api.get(
    "aggregator-inventory/agg-verify-regional-To-so-reseller-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/"+
    request.device +
    "/" +
    request.barcode
  );
};
// aggregator-inventory/allocate-device-to-aggregator-regional-inventory
/* AGGREGATOR API */
export const DEVICE_VERIFICATION_IN_CENTRAL_FOR_ACTIVE = (
  { commit },
  request
) => {
  return api.get(
    "verify-device-active-in-central/" + request.device + "/" + request.barcode
  );
};
 /* Aggregators API */
export const AGGREAGATORS_DEVICE_VERIFICATION_IN_CENTRAL_FOR_ACTIVE = (
  { commit },
  request
) => {
  return api.get(
    "aggregator-inventory/agg-verify-device-active-in-central/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+ "/" + request.device + "/" + request.barcode
  );
};

/* Aggregators API */
export const VERIFY_DEVICE_BEFORE_ADDING_CENTRAL_INVENTORY = (
  { commit },
  request
) => {
  return api.get(
    "verify-device-in-central-inventory/" +
    request.device +
    "/" +
    request.barcode
  );
};
/* Aggregators API */

export const AGGREGATORS_VERIFY_DEVICE_BEFORE_ADDING_CENTRAL_INVENTORY = (
  { commit },
  request
) => {
  return api.get(
    "aggregator-inventory/agg-verify-device-in-central-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/"+
    request.device +
    "/" +
    request.barcode
  );
};
/* Aggregators API */
export const GET_INVOICE_NUMBER_FROM_INVENTORY = (
  { commit },
  request
) => {
  return api.get(
    "invoice/" + request
  );
};
export const VERIFY_DEVICE_ON_REGIONAL_TO_CENTRAL_FOR_FAULTY = (
  { commit },
  request
) => {
  return api.get(
    "verify-regional-to-central/" + request.device + "/" + request.barcode
  );
};
 /*Aggregator API */

export const VERIFY_AGGREGATORS_DEVICE_ON_REGIONAL_TO_CENTRAL_FOR_FAULTY = (
  { commit },
  request
) => {
  return api.get(
    "aggregator-inventory/agg-verify-regional-to-central/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+ "/" + request.device + "/" + request.barcode
  )
}


/*Aggregator API */
