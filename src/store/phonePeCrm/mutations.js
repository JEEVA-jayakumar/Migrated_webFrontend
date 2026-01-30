export const SET_PHONEPE_CLIENT_CRM = (state, payload) => {
  
    state.phonepeMerchantDetails = payload;
  };
  export const SET_PHONEPE_COMPLETED_DATA = (state, payload) => {
    console.log("MUTATION PHONEPE COMPLETED====>>>",JSON.stringify(payload));
    state.phonepeCompletedDetails = payload;
  };
  export const SET_PHONEPE_CRM_DATE = (state, payload) => {
    // console.log("MUTATION PHONEPE====>>>",JSON.stringify(payload));
    state.phonepeDate = payload;
  };
  export const SET_CRM_REMARKS = (
    state, payload) => {
    state.updateRemarks = payload
};
// export const SET_PHONEPE_PAPER_ROLL_PENDING = (state, payload) => {
//   // console.log("MUTATION PHONEPE====>>>",JSON.stringify(payload));
//   state.phonepePaperRoll = payload;
// };

export const SET_STATIC_QR_NEW_REQUESTS = (state, payload) => {
  // console.log("MUTATION staticNewRequestsLead PHONEPE====>>>",JSON.stringify(payload));
  state.staticNewRequestsLead = payload;
};
export const SET_STATIC_QR_REFER_BACK_REQUESTS = (state, payload) => {
  // console.log("MUTATION staticNewRequestsLead PHONEPE====>>>",JSON.stringify(payload));
  state.staticReferBackLead = payload;
};
export const SET_STATIC_QR_COURIER_REQUESTS = (state, payload) => {
  // console.log("MUTATION staticNewRequestsLead PHONEPE====>>>",JSON.stringify(payload));
  state.staticCourierLead = payload;
};
export const SET_UPDATE_SCAN_QR_NUMBER = (state, payload) => {
  state.updateSacnQRNumber = payload
};
export const SET_UPDATE_SCAN_SOUNDBOX_NUMBER = (state, payload) => {
  state.updateSacnSoundBoxNumber = payload
};
export const SET_PHONEPE_PAPER_ROLL_PDF = (
  state, payload) => {
  state.paperPdf = payload
};
export const SET_PHONEPE_PAPER_ROLL_COMPLETED_DATA = (state, payload) => {
  // console.log("MUTATION PHONEPE====>>>",JSON.stringify(payload));
  state.phonepeCompletedPaperRoll = payload;
};
export const SET_PHONEPE_RTO_TICKET = (state, payload) => {
  // console.log("MUTATION PHONEPE====>>>",JSON.stringify(payload));
  state.phonepeRtoTicket = payload;
};

export const SET_PHONEPE_PAPER_ROLL_PENDING = (state, payload) => {
  // console.log("MUTATION PHONEPE====>>>",JSON.stringify(payload));
  state.phonepePaperRoll = payload;
};
export const SET_UPDATE_PHONEPE_PAPERROLL_PODNUMBER = (
  state, payload) => {
  state.updatePodNumber = payload
};


export const SET_PHONEPE_CRM_CALL_LOG_ATTEMPTS = (
  state, payload) => {
  state.attemptLog = payload
};

export const SET_PHONEPE_CRM_OPTION_LIST_DETAILS = (
  state, payload) => {
  state.optionsList = payload
};

export const SET_PHONEPE_CRM_RESOLUTION_STATUS = (
  state, payload) => {
  state.resolutionList = payload
};

export const SET_PHONEPE_CRM_FETCH_ISSUE_STATUS = (
  state, payload) => {
  state.fetchIssueList = payload
};



export const SET_PHONEPE_CRM_ISSUE_ACTION_STATUS = (
  state, payload) => {
  state.fetchActionList = payload
};

export const SET_PHONE_PE_VIEW_CALL_LOGS = (
  state, payload) => {
  state.viewlogs = payload
};
