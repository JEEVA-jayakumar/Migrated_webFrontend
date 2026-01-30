export const getBijlipayMerchantDetails = state => {
    return state.bijlipayMerchantDetails;
  };
  export const getBijlipayCompletedData = state => {
    return state.bijlipayCompletedDetails;
  };
  export const getBijlipayDate = state => {
    // console.log("CRM DATE GETTER",JSON.stringify(state.bijlipayDate))
    return state.bijlipayDate;
  };
  export function getupdateRemarks(state) {
    return state.updateRemarks
}