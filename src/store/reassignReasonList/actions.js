import api from "../api.js";
export const REASSIGN_REASON_LIST = ({
  commit
}, request) => {
  return api
    .get("service-request/reAssignReasonList")
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_REASSIGN_REASON_LIST", response.data.data);
      // END=> COMMIT with data received'
    })

}

export const REASSIGNED_REASON_TYPE_DETAILS = ({ commit }, request) => {
  // console.log('PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE-->', JSON.stringify(request))
   return api
     .post(
       'service-request/assignTicket/' + request.userId + "/2", request.request
     )
 }