import api from "../api.js";


export const LEAD_INFORMATION_VAS_MAPPING_DERTAILS = ({ commit }, request) => {
  return api.post("lead-info-vas-map", request);
};

export const GET_LEAD_INFORMATION_VAS_MAPPING_DERTAILS = ({ commit }, request) => {
  return api.get("lead-info-vas-map/" + request.id);
};

export const CREATE_BASE_TID = ({ commit }, request) => {
  console.log("CREATE_BASE_TID -------------->",JSON.stringify(request))
  return api.post("mars-device-details/create-base-tid/" + request.leadId + "/" + request.salesInformation.institutionCode);
};

export const GET_BASE_TID_LIST = ({ commit }, request) => {
  console.log("GET_BASE_TID_LIST -------->",JSON.stringify(request))
  return api.get("mars-device-details/base-tid-conf-list/" + request.leadId + "/" + request.salesInformation.institutionCode);
};

//new
export const GET_SUB_TID_LIST = ({ commit }, request) => {
  return api.get("mars-device-details/sub-tid-list/" + request.leadId);
};
//end
export const LOAD_GET_SUB_TID_LIST = ({ commit }, request) => {
  return api.get("mars-device-details/sub-tid-list/" + request.leadId);
};

export const CREATE_SUB_TIDS_LIST = ({ commit }, request) => {
  return api.post("mars-device-details/create-sub-tid-list/" + request.leadId + "/" + request.salesInformation.institutionCode);
};

export const SAVEING_THE_LEAD_STATUS_DETAILS = ({ commit }, request) => {
  // console.log("SAVEING_THE_LEAD_STATUS_DETAILS -------->",JSON.stringify(request))
  return api.post("mars-device-details/update-lead-status/" + request.leadId + "/" + request.status);
};

