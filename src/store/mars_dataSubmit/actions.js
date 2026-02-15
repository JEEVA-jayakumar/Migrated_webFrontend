import { url } from '@vuelidate/validators';
import api from "../api.js";
import moment from "moment";





function commonDateFormat(selectedDate) {
  if (
    selectedDate == "" ||
    selectedDate == null ||
    selectedDate == "Invalid date"
  ) {
    return null;
  } else {
    return moment(selectedDate).format("DD/MM/YYYY");
  }
}
export const MARS_DATA_SUBMIT_INTERNAL = ({
  commit
}, request) => {
  return api.post(
    "submit-to-mars-data-information/" +
    request.merchant.leadId +
    "/" +
    request.action,
    request.merchant
  );
};
export const MARS_DATA_SUBMIT_INTERNAL_CHANGEMANAGEMENT = ({
  commit
}, request) => {
  return api.post(
    "submit-to-mars-data-information/" +
    request.url.leadId +
    "/1",
    request.params.merchant
  );
};

export const MARS_DATA_SUBMIT_EXTERNAL = ({
  commit,
  rootState
}, request) => {

  console.log("Test" + localStorage.getItem("aa_t"));
  let variable = localStorage.getItem("aa_t")
  let v = variable.lastIndexOf('|')
  let res = variable.substring(v + 1)
  let headers = {
    'NII': res
  };
  //Date formatting for MARS
  request.params.merchant.salesInformation.applicationDate = commonDateFormat(
    request.params.merchant.salesInformation.applicationDate
  );

  request.params.merchant.salesInformation.aggreementDate = commonDateFormat(
    request.params.merchant.salesInformation.aggreementDate
  );

  request.params.merchant.salesInformation.loanDisbursementDate = commonDateFormat(
    request.params.merchant.salesInformation.loanDisbursementDate
  );

  request.params.merchant.salesInformation.tenureStartDate = commonDateFormat(
    request.params.merchant.salesInformation.tenureStartDate
  );

  request.params.merchant.companyInformation.establishYear = commonDateFormat(
    request.params.merchant.companyInformation.establishYear
  );

  request.params.merchant.bankInformation.collectionDetails.chequeDepositedDate = commonDateFormat(
    request.params.merchant.bankInformation.collectionDetails
      .chequeDepositedDate
  );

  request.params.merchant.bankInformation.collectionDetails.collectedDate = commonDateFormat(
    request.params.merchant.bankInformation.collectionDetails.collectedDate
  );

  request.params.merchant.bankInformation.collectionDetails.chequeDate = commonDateFormat(
    request.params.merchant.bankInformation.collectionDetails.chequeDate
  );
  request.params.merchant.additionalInfo.ownerDOB = commonDateFormat(
    request.params.merchant.additionalInfo.ownerDOB
  );

  request.params.merchant.businessInformation.memberSince = commonDateFormat(
    request.params.merchant.businessInformation.memberSince
  );
  if (request.params.merchant.businessInformation.gstId == "") {
    request.params.merchant.businessInformation.gstId = null;
  } else {
    request.params.merchant.businessInformation.gstId =
      request.params.merchant.businessInformation.gstId;
  }
  if (request.params.merchant.additionalInfo.installationBranchCode == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.installationBranchCode = null;
  } else {
    request.params.merchant.additionalInfo.installationBranchCode = request.params.merchant.additionalInfo.installationBranchCode

  }
  if (request.params.merchant.additionalInfo.iaLocation == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.iaLocation = null;
  } else {
    request.params.merchant.additionalInfo.iaLocation = request.params.merchant.additionalInfo.iaLocation

  }
  if (request.params.merchant.additionalInfo.iaDistrict == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.iaDistrict = null;
  } else {
    request.params.merchant.additionalInfo.iaDistrict = request.params.merchant.additionalInfo.iaDistrict

  }
  if (request.params.merchant.additionalInfo.branchZone == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.branchZone = null;
  } else {
    request.params.merchant.additionalInfo.branchZone = request.params.merchant.additionalInfo.branchZone

  }
  if (request.params.merchant.additionalInfo.raDistrict == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.raDistrict = null;
  } else {
    request.params.merchant.additionalInfo.raDistrict = request.params.merchant.additionalInfo.raDistrict

  }
  if (request.params.merchant.additionalInfo.od1District == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.od1District = null;
  } else {
    request.params.merchant.additionalInfo.od1District = request.params.merchant.additionalInfo.od1District

  }
  if (request.params.merchant.additionalInfo.od2District == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.od2District = null;
  } else {
    request.params.merchant.additionalInfo.od2District = request.params.merchant.additionalInfo.od2District

  }
  if (request.params.merchant.additionalInfo.lorState == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.lorState = null;
  } else {
    request.params.merchant.additionalInfo.lorState = request.params.merchant.additionalInfo.lorState

  }
  if (request.params.merchant.additionalInfo.iaSalutation == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.iaSalutation = null;
  } else {
    request.params.merchant.additionalInfo.iaSalutation = request.params.merchant.additionalInfo.iaSalutation

  }
  if (request.params.merchant.additionalInfo.iaGender == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.iaGender = null;
  } else {
    request.params.merchant.additionalInfo.iaGender = request.params.merchant.additionalInfo.iaGender

  }
  if (request.params.merchant.additionalInfo.od1Salutation == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.od1Salutation = null;
  } else {
    request.params.merchant.additionalInfo.od1Salutation = request.params.merchant.additionalInfo.od1Salutation

  }
  if (request.params.merchant.additionalInfo.od1Gender == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.od1Gender = null;
  } else {
    request.params.merchant.additionalInfo.od1Gender = request.params.merchant.additionalInfo.od1Gender

  }
  if (request.params.merchant.additionalInfo.od2Salutation == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.od2Salutation = null;
  } else {
    request.params.merchant.additionalInfo.od2Salutation = request.params.merchant.additionalInfo.od2Salutation

  }
  if (request.params.merchant.additionalInfo.od2Gender == "" || request.params.merchant.salesInformation.institutionCode != 104) {
    request.params.merchant.additionalInfo.od2Gender = null;
  } else {
    request.params.merchant.additionalInfo.od2Gender = request.params.merchant.additionalInfo.od2Gender

  }
  if (request.params.merchant.additionalInfo.states == "" || request.params.merchant.paymentDetails.terminalType != "MPOS") {
    request.params.merchant.additionalInfo.states = null;
  } else {
    request.params.merchant.additionalInfo.states = request.params.merchant.additionalInfo.states

  }

  // if (request.params.merchant.additionalInfo.city == "" || request.params.merchant.paymentDetails.terminalType != "MPOS" || request.params.merchant.salesInformation.institutionCode != 104) {
  //   request.params.merchant.additionalInfo.city = null;
  // } else {
  //   request.params.merchant.additionalInfo.city = request.params.merchant.additionalInfo.city

  // }
  if (request.params.merchant.additionalInfo.fillingTypes == "" || request.params.merchant.paymentDetails.terminalType != "MPOS") {
    request.params.merchant.additionalInfo.fillingTypes = null;
  } else {
    request.params.merchant.additionalInfo.fillingTypes = request.params.merchant.additionalInfo.fillingTypes

  }
  if (request.params.merchant.additionalInfo.category == "" || request.params.merchant.paymentDetails.terminalType != "MPOS") {
    request.params.merchant.additionalInfo.category = null;
  } else {
    request.params.merchant.additionalInfo.category = request.params.merchant.additionalInfo.category

  }
  if (request.params.merchant.additionalInfo.subCategory == "" || request.params.merchant.paymentDetails.terminalType != "MPOS") {
    request.params.merchant.additionalInfo.subCategory = null;
  } else {
    request.params.merchant.additionalInfo.subCategory = request.params.merchant.additionalInfo.subCategory

  }
  // if (request.params.merchant.companyInformation.mcc != "5541" || request.params.merchant.companyInformation.mcc != "5542") {
  //   request.params.merchant.mdrPlan.convenientFee.fixed = 0.0;
  //   request.params.merchant.mdrPlan.convenientFee.percentage = 0.0;
  //   request.params.merchant.mdrPlan.convenientFee.minimum = 0.0;
  //   request.params.merchant.SharingDiscountFee.convenientFee.fixed = 0.0;
  //   request.params.merchant.SharingDiscountFee.convenientFee.percentage = 0.0;
  //   request.params.merchant.SharingDiscountFee.convenientFee.minimum = 0.0;
  // } else {
  //   request.params.merchant.mdrPlan.convenientFee.fixed = request.params.merchant.mdrPlan.convenientFee.fixed;
  //   request.params.merchant.mdrPlan.convenientFee.percentage = request.params.merchant.mdrPlan.convenientFee.percentage;
  //   request.params.merchant.mdrPlan.convenientFee.minimum = request.params.merchant.mdrPlan.convenientFee.minimum;
  //   request.params.merchant.SharingDiscountFee.convenientFee.fixed = request.params.merchant.SharingDiscountFee.convenientFee.fixed;
  //   request.params.merchant.SharingDiscountFee.convenientFee.percentage = request.params.merchant.SharingDiscountFee.convenientFee.percentage;
  //   request.params.merchant.SharingDiscountFee.convenientFee.minimum = request.params.merchant.SharingDiscountFee.convenientFee.minimum;
  // }
  if (request.leadStatus == 102) {
    if(res == 104){
      return api.put(
        rootState.GlobalVariables.STATE_MARS_AXIS_ON_BOARD_API_URL +
        "merchant/" +
        request.refNumber,
        request.params, {
        headers: headers
      }
      );
    }else{
      return api.put(
        rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL +
        "merchant/" +
        request.refNumber,
        request.params, {
        headers: headers
      }
      );
    }
  

    
  } 
  
  else {
    if(res == 104){
      return api.post(
        rootState.GlobalVariables.STATE_MARS_AXIS_ON_BOARD_API_URL + "merchant",
        request.params, {
        headers: headers
      }
      );
    }else{
        return api.post(
      rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL + "merchant",
      request.params, {
      headers: headers
    }
    );
    
    }
  
  }



};

export const MARS_DATA_EXTERNAL_SUBMIT_RESPONSE = ({
  commit,
  rootState
},
  request
) => {
  return api.put(
    "submit-to-mars-response-data/" + request.leadId,
    request.request
  );
}; 

export const SAT_TO_MARS_LEADDETAILS_SHARING_TO_HITACHI = ({commit, rootState}, request) => {
  console.log("SAT_TO_MARS_LEADDETAILS_SHARING_TO_HITACHI datasss --------->", request)
  return api.post("update-lead_data-submit-to-mars/" + request.leadId, request.request);
};
//mars-device-details/submit-sub-tid-merchant-ref-code
export const SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS = ({commit, rootState}, request) => {
  return api.post("mars-device-details/submit-sub-tid-merchant-ref-code/" + request.marsDeviceId + "/" + request.merchantRefCode);
};
export const FETCH_SAVED_DATA_FROM_OWN_DB = ({
  commit,
  rootState
},
  request
) => {
  return api
    .get("get-mars-data-information/" + request.leadId)
    .then(response => {
      commit("SET_SAVED_DATA_FROM_OWN_DB", response.data.data);
      return response.data.data;
    });
};
// export const MARS_STATIC_QR_ONBOARDING = ({
//   commit,
//   rootState
// },
//   request) => {
//   return api.post(
//     rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL + "merchant",
//       request.params, {
//       headers: headers
//     }
//   );
// };

// return api.post(
//   rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL + "merchant",
//   request.params, {
//   headers: headers
// }
// );
export const MARS_STATIC_QR_DATA_SUBMIT = ({
  commit,
  rootState
}, request) => {
  let variable = localStorage.getItem("bb_t")
  let v = variable.lastIndexOf('|')
  let res = variable.substring(v + 1)
  let headers = {
    'NII': res
  };
  // console.log("request API QR",JSON.stringify(request));
  if(request.qrLeadStatus == 9){
    console.log("REFFER BACK");
    return api.put(
      rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL + "merchant/"+ request.refNumber,
      request.params, {
      headers: headers 
    }
    );
  }else{  
    console.log("NEW LEAD");
    return api.post(
      rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL + "merchant",
      request.params, {
      headers: headers 
    }
    );
  }
}

export const MARS_CHECK_STATUS_API = ({
  commit,
  rootState
},
  request
) => {
  

  let variable = localStorage.getItem("aa_t")
  let v = variable.lastIndexOf('|')

  let res = variable.substring(v + 1)

  let headers = {
    'NII': res
  };

  let url = rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL+"parameters/merchantStatus?institutionCode=" + request.merchant.salesInformation.institutionCode +"&applicationNumber="+
  request.merchant.salesInformation.applicationNumber
  return api.get(url , {headers : headers}
    ).then(response => {
      console.log("RESPONSE VALUE",response);
      // commit("SET_MARS_CHECK_STATUS_API", response.data.data);
      return response;
    });
};
export const EQUITAS_FRM_DATA = ({
  commit
}, request) => {
  return api.post(
    "store-equitas-frm-details",request
 
  );
};
