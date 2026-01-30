import api from "../api.js";
export const FETCH_POS_FINANCE_SUBMIT = ({
  commit
}, request) => {
    // console.log("ACTION REQUEST------------>",JSON.stringify(request))
  return api.put("device-finance-accept/" +request.id+ "/" +request.devicePurchaseCost+ "/" +request.deviceLife+ "/" +request.invoiceNumbers, request.file);
};

export const FETCH_FINANCE_DOCUMENT_LIST= ({
    commit
  }, request) => {
      console.log(request)
    return api
      .get("getInvoiceData/" +request)
      .then(response => {
        // console.log("-------------------/////",response)
        commit('SET_FINANCE_DOCUMENT_LIST', response.data);
        return response.data;
      });
  }

  export const FETCH_DOCUMENT_LIST= ({
    commit
  }, request) => {
      console.log(request)
    return api
      .get("download-invoice-data/" +request)
      .then(response => {
        // console.log("-------------------/////",response)
        // commit('SET_FETCH_DOCUMENT_LIST', response.data);
        return response.data;
      });
  }