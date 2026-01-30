export const getPhonepeMerchantDetails = state => {
    return state.phonepeMerchantDetails;
  };
  export const getPhonepeCompletedData = state => {
    return state.phonepeCompletedDetails;
  };
  export const getphonepeDate = state => {
    console.log("CRM DATE GETTER",JSON.stringify(state.phonepeDate))
    return state.phonepeDate;
  };
  export function getupdateRemarks(state) {
    return state.updateRemarks
}
export const getstaticNewRequestsLead = state => {
  console.log("GetterstaticNewRequestsLead",JSON.stringify(state.staticNewRequestsLead))
  return state.staticNewRequestsLead;
};
export const getstaticReferBackLead = state => {
  console.log("GetterstaticReferBackLead",JSON.stringify(state.staticNewRequestsLead))
  return state.staticReferBackLead;
};
export const getstaticCourierLead = state => {
  console.log("GetterstaticCourierLeadLead",JSON.stringify(state.staticNewRequestsLead))
  return state.staticCourierLead;
};
export function getupdateSacnQRNumber(state) {
  return state.updateSacnQRNumber
};
export function getupdateSacnSoundBoxNumber(state) {
  return state.updateSacnSoundBoxNumber
};
export function getpaperPdf(state) {
  return state.paperPdf
};
export function getphonepeCompletedPaperRoll(state) {
  return state.phonepeCompletedPaperRoll
};
export function getphonepeRtoTicket(state) {
  return state.phonepeRtoTicket
};

export const getphonepePaperRoll = state => {
  console.log("phonepePaperRoll",JSON.stringify(state.phonepeDate))
  return state.phonepePaperRoll;
};
export function getupdatePodNumber(state) {
  return state.updatePodNumber
};


export function getattemptLog(state) {
  return state.attemptLog
};

export function getoptionsList(state) {
  return state.optionsList
};

export function getResolutionStatus(state) {
  return state.resolutionList
};

export function getFetchIssueList(state) {
  return state.fetchIssueList
};



export function getIssueAction(state) {
  return state.fetchActionList
};

export function getviewlogs(state) {
  return state.viewlogs
};
