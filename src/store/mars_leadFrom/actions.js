import api from "../api.js";

export const LEAD_FROM_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return api
    .get(rootState.GlobalVariables.STATE_MARS_API + 'lead-from?institutionCode=' + request)
    .then(response => {
      // console.log("terminal code 12345 : --- : ", response)
      commit("SET_LEAD_FROM_FROM_MARS", response.data);
      return response
    })
}

// .get("https://qaapp.bijlipay.co.in:8085/staticApi/rental-plan-details/" + request.leadSource + "/" + request.device + "/" + request.plan, request)
//     .then(response => {  
//       commit("SET_DEVICE_MODEL_FROM_MARS", response.body.data.marsDeviceModel);
//       return response
//     })
