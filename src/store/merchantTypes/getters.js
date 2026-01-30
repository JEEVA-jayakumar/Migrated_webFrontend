export const getActiveMerchantTypes = state => {
  console.log("Merchant Type- GETTER-------------->"+JSON.stringify(state.activeMerchantTypes))
  return state.activeMerchantTypes;
};
export const getDeActivatedMerchantTypes = state => {
  return state.deActivatedMerchantTypes;
};