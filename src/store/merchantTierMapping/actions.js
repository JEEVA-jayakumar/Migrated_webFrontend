import api from "../api.js";
export const MERCHANT_TIER_MAPPING_GET_STATE_DETAILS = ({
  commit
}, request) => {
  return api.get("getStateList").then(response => {
    commit("SET_MERCHANT_TIER_MAPPING_GET_STATE_DETAILS", response.data.data);
    // console.log("SET_MERCHANT_TIER_MAPPING_GET_STATE_DETAILS",JSON.stringify(response.data))
  });
};

export const MERCHANT_TIER_MAPPING_SEARCH_DISTRICT = ({
    commit
  }, request) => {
    return api.get("getDistrictList",request).then(response => {
        //  console.log("MERCHANT_TIER_MAPPING_SEARCH_DISTRICT",JSON.stringify(response.data.data))
        // let globalState = [];
        // response.data.data.map(function (value, key) {
        //   globalState.push({
        //     label: value.districtName,
        //     value: value.districtName,
        //   });
        // });
        // console.log("SET_MERCHANT_TIER_MAPPING_GET_STATE_DETAILS",JSON.stringify(globalState))
      commit("SET_MERCHANT_TIER_MAPPING_SEARCH_DISTRICT",response.data.data);
      //  return response
      // console.log("SET_MERCHANT_TIER_MAPPING_GET_STATE_DETAILS",JSON.stringify(response.data))
    });
  };

  export const MERCHANT_TIER_MAPPING_SUB_DISTRICT_DETAILS = ({
    commit
  }, request) => {
    console.log("MERCHANT_TIER_MAPPING_SUB_DISTRICT_DETAILS",request)
    return api.get("getSubDistrictList",request).then(response => {
        // console.log("MERCHANT_TIER_MAPPING_SEARCH_DISTRICT",JSON.stringify(response.data.data))
        // let globalSubDistrict = [];
        // response.data.data.map(function (value, key) {
        //     globalSubDistrict.push({
        //     label: value,
        //     value: value,
        //   });
        // });
      commit("SET_MERCHANT_TIER_MAPPING_SUB_DISTRICT_DETAILS", response.data.data);
    //   return response
      // console.log("SET_MERCHANT_TIER_MAPPING_GET_STATE_DETAILS",JSON.stringify(response.data))
    });
  };
//   MERCHANT_TIER_MAPPING_TOWN_OR_VILLAGE_DETAILS

export const MERCHANT_TIER_MAPPING_TOWN_OR_VILLAGE_DETAILS = ({
    commit
  }, request) => {
    return api.get("getVillagenameList", request).then(response => {
        // console.log("MERCHANT_TIER_MAPPING_SEARCH_DISTRICT",JSON.stringify(response.data.data))
        // let globalTownOrVillage = [];
        // response.data.data.map(function (value, key) {
        //     globalTownOrVillage.push({
        //     label: value,
        //     value: value,
        //   });
        // });
      commit("SET_MERCHANT_TIER_MAPPING_TOWN_OR_VILLAGE_DETAILS", response.data.data);
    //   return response
      // console.log("SET_MERCHANT_TIER_MAPPING_GET_STATE_DETAILS",JSON.stringify(response.data))
    });
  };
//   MERCHANT_TIER_MAPPING_VILLAGE_TIER_DETAILS

export const MERCHANT_TIER_MAPPING_VILLAGE_TIER_DETAILS = ({
    commit
  }, request) => {
    return api.get("getTierName",request).then(response => {
        //  console.log("MERCHANT_TIER_MAPPING_SEARCH_DISTRICT",JSON.stringify(response.data.data))
        // let globalVillageTier = [];
        // response.data.data.map(function (value, key) {
        //     globalVillageTier.push({
        //     label: value,
        //     value: value,
        //   });
        // });
      commit("SET_MERCHANT_TIER_MAPPING_VILLAGE_TIER_DETAILS", response.data.data);
    //   return response
      // console.log("SET_MERCHANT_TIER_MAPPING_GET_STATE_DETAILS",JSON.stringify(response.data))
    });
  };
  
  export const MERCHANT_TIER_MAPPING_VILLAGE_BASED_TIER_AND_LOCATION_DETAILS = ({
    commit
  }, request) => {
    return api.get("getTierName/"+request).then(response => {
        console.log("MERCHANT_TIER_MAPPING_VILLAGE_BASED_TIER_AND_LOCATION_DETAILS",JSON.stringify(response.data.data))
        let globalState = [];
        response.data.data.map(function (value, key) {
          globalState.push({
            label: value,
            value: value,
          });
        });
      commit("SET_MERCHANT_TIER_MAPPING_VILLAGE_BASED_TIER_AND_LOCATION_DETAILS", response.data.data);
    //   return response
      // console.log("SET_MERCHANT_TIER_MAPPING_GET_STATE_DETAILS",JSON.stringify(response.data))
    });
  };
