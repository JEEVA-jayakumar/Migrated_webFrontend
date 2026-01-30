import Vue from 'vue'
import api from '../api.js'

export const FETCH_ALL_STATIC_QR_LEAD_VALIDATIONS_DATA = ({
  commit
}, request) => {
  // return api.get("lead-validation-traker-list").then(response => {
  if (request.pagination.sortBy == null) {
    return api
    // https://qaapp.bijlipay.co.in:8085/api/qr-leads-list?page=1&size=10&search=&sort=qrLeadNumber&leadNumber.dir=desc
      .get(
        'qr-leads-list?page=' +
            request.pagination.page +
            '&size=' +
            request.pagination.rowsPerPage +
            '&search=' +
            request.filter
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_ALL_STATIC_QR_LEAD_VALIDATIONS_DATA', response.data.data)
        // END=> COMMIT with data received'
      })
  } else {
    let sorting = request.pagination.descending ? 'asc' : 'desc'
    return api
      .get(
        'qr-leads-list?page=' +
            request.pagination.page +
            '&size=' +
            request.pagination.rowsPerPage +
            '&search=' +
            request.filter +
            '&sort=' +
            request.pagination.sortBy +
            '&' +
            request.pagination.sortBy +
            '.dir=' +
            sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_ALL_STATIC_QR_LEAD_VALIDATIONS_DATA', response.data.data)
        // END=> COMMIT with data received'
      })
  }
}

export const FETCH_STATIC_QR_SHORT_LEAD_DATA = ({
  commit
}, request) => {
  return api.get('qr-lead-details/' + request).then(response => {
    commit('SET_STATIC_QR_SHORT_LEAD_DATA', response.data.data)
    return response
  })
}

export const PROCEED_TO_MARS = ({ commit }, request) => {
  console.log("REQUEST",request);
  return api.put(
    "submit-to-mars-qr-response-data/"+ request.leadId,request.request
  );
}
export const UPDATE_QR_DETAILS = ({
  commit
}, request) => {
  console.log("SUBMIT_REQUEST_Details",JSON.stringify(request))
  return api
    .put("update-qr-lead-details/"+ request.id, request.request)
}

export const REFERBACK_SAT_TO_SO_QR_DETAILS = ({
  commit
}, request) => {
  console.log("SUBMIT_REQUEST_Details",JSON.stringify(request))
  return api
    .put("sat-to-so-referback/"+ request.id, request.request)
}

export const FORMS_UPLOADED_DOCUMENT_QR_DETAILS = ({
  commit
}, request) => {
  console.log("FORMS_UPLOADED_DOCUMENT_QR_DETAILS",JSON.stringify(request))
  return api
    .put("update-qr-file/"+ request.data1.id, request.formsList)
}

export const FETCH_STATIC_QR_INVENTORY_COUNT = ({
  commit
}, request) => {
  return api.get('qr-gen/qrInventory').then(response => {
    console.log("COUNTING",JSON.stringify(response));
    commit('SET_STATIC_QR_INVENTORY_COUNT', response.data.data)
    return response.data.data
    // END=> COMMIT with data received'
  })
}

export const FETCH_MARS_ID_DATA = ({
  commit
}, request) => {
  return api.get('mars-details-fetch/' + request).then(response => {
    commit('SET_MARS_ID_DATA', response.data.data)
  })
} 
