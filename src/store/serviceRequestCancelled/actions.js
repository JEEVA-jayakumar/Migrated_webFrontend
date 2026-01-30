import api from '../api.js'
export const FETCH_SERVICE_REQUEST_CANCELLED_DETAILS = ({ commit }, request) => {
  return api.get('service-cancel/getServiceCancelReason').then(response => {
    console.log(
      'SERVICE REQUEST TYPE===================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      JSON.stringify(response)
    )
    // START=> COMMIT with data received'

    commit('SET_SERVICE_REQUEST_CANCELLED_DETAILS', response.data.data)
    return response
    // END=> COMMIT with data received'
  })
}

export const POST_CANCEL_STATUS_TYPES = ({ commit }, request) => {
  console.log('POST_SERVICE_CANCEL_TYPES --->', JSON.stringify(request))
  return api.post('service-cancel/createServiceCancelReason', request)
}
export const EDIT_SERVICE_CANCEL_STATUS_TYPES = ({ commit }, request) => {
  console.log('SUBMIT SERVICE_STATUS_TYPES request', JSON.stringify(request))
  return api.put('service-cancel/updateServiceCancelReason/' + request.id, request.request)
}
export const DELETE_SERVICE_CANCEL_STATUS_TYPES = ({ commit }, request) => {
  console.log('SUBMIT SERVICE_STATUS_TYPES request', JSON.stringify(request))
  return api.delete('service-cancel/deleteServiceCancelReason/' + request.id)
}
export const EDIT_CANCEL_STATUS_TYPES = ({ commit }, request) => {
  console.log("SUBMIT SERVICE_STATUS_TYPES request", JSON.stringify(request));
  return api.put("service-cancel/updateServiceCancelReason/" + request.id,request.request);
};