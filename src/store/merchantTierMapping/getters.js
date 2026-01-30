export const getMerchantTierMappingStateDetails = state => {
    return state.MerchantTierMappingStateDetails;
  };

  export const getMerchantTierMappingDistrictDetails = state => {
    return state.MerchantTierMappingDistrictDetails;
  };

  export const getMerchantTierMappingSubDistrictDetails = state => {
    // console.log("getMerchantTierMappingDistrictDetails ---------->",JSON.stringify(state.MerchantTierMappingDistrictDetails))
  return state.MerchantTierMappingSubDistrictDetails;
};

export const getMerchantTierMappingTownOrVillageDetails = state => {
    // console.log("getMerchantTierMappingTownOrVillageDetails ---------->",JSON.stringify(state.MerchantTierMappingTownOrVillageDetails))
  return state.MerchantTierMappingTownOrVillageDetails;
};

// MERCHANT_TIER_MAPPING_VILLAGE_TIER_DETAILS

export const getMerchantTierMappingVillageTierDetails = state => {
     console.log("getMerchantTierMappingVillageTierDetails ---------->",JSON.stringify(state.MerchantTierMappingVillageTierDetails))
  return state.MerchantTierMappingVillageTierDetails;
};

  export const getMerchantTierMappingVillageBasedTierAndLocationDetails = state => {
    return state.MerchantTierMappingVillageBasedTierAndLocationDetails;
  };
