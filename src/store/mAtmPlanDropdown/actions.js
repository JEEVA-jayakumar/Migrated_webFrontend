import api from "../api.js";
export const MATM_PLAN_DROPDOWN_DETAILS = ({ commit }, request) => {
    return api.get("getMAtmPlanName", request).then(response => {
        // console.log("RESPONSE OF THE MATM ACTION1234------------------->"+JSON.stringify(response))
      commit("SET_MATM_PLAN_DROPDOWN_DETAILS", response.data.data);
      // console.log(" MUTATION BEFORE RESPONSE 1234------------------->"+JSON.stringify(response.data))
    });
  };

  export const FETCH_ALL_PLAN_DETAILS = ({ commit }, request) => {
    return api.get("getMAtmPlanByLeadSourceDeviceIdPlanId/"+ request.leadSource + "/" + request.device + "/" + request.plan, request)
    .then(response => {
         console.log("Response of  FETCHING DATAS------------------->"+JSON.stringify(response))
      commit("SET_FETCH_ALL_PLAN_DETAILS", response.data.data);
      console.log(" MUTATION BEFORE RESPONSE of FETCHING DATAS------------------->"+JSON.stringify(response.data))
      return response
       
    });
  };

 