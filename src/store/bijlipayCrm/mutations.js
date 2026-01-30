export const SET_BIJLIPAY_PENDING_CRM = (state, payload) => {
    state.bijlipayMerchantDetails = payload;
  };
  export const SET_BIJLIPAY_COMPLETED_DATA = (state, payload) => {
    // console.log("MUTATION BIJLIPAY_COMPLETED====>>>",JSON.stringify(payload));
    state.bijlipayCompletedDetails = payload;
  };
  export const SET_BIJLIPAY_CRM_DATE = (state, payload) => {
    // console.log("MUTATION PHONEPE====>>>",JSON.stringify(payload));
    state.bijlipayDate = payload;
  };
  export const SET_CRM_REMARKS = (
    state, payload) => {
    state.updateRemarks = payload
}