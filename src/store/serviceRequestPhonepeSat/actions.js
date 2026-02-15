import api from '../api.js'
//
export const FETCH_PHONEPE_UNASSIGNED_SERVICE_REQUEST_DATAS1 = ({
  commit
}, request) => {
  // console.log("FETCH_PHONEPE_UNASSIGNED_SERVICE_REQUEST_DATAS1-----------",JSON.stringify(request))
  // alert("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
    .get(
      'service-request/getTptRequest/5/1?page=' +
      request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&searchTerm=' +
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
      commit('SET_PHONEPE_UNASSIGNED_SERVICE_REQUEST_DATAS', response.data.data)
      return response
      // END=> COMMIT with data received'
    })
}

export const FETCH_PHONEPE_ASSIGNED_SERVICE_REQUEST_DATAS = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
    .get(
      'service-request/getTptRequest/2/1?page=' +
        request.pagination.page +
        '&size=' +
        request.pagination.rowsPerPage +
        '&searchTerm=' +
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

      commit('SET_PHONEPE_ASSIGNED_SERVICE_REQUEST_DATAS', response.data.data)
      // console.log("1234567 ASSIGNED_SERVICE_REQUEST_DATAS-----------",JSON.stringify(response.data.data))
      // END=> COMMIT with data received'
    })
}
// export const FETCH_PHONEPE_CLOSED_SERVICE_REQUEST_DATAS = ({
//   commit

// }, request) => {
//   let sorting = request.pagination.descending ? 'asc' : 'desc'
//   return api
//     .get(
//       'service-request/getTptRequest/3/1?page=' +
//         request.pagination.page +
//         '&size=' +
//         request.pagination.rowsPerPage +
//         '&searchTerm=' +
//         request.filter +
//         '&sort=' +
//         request.pagination.sortBy +
//         '&' +
//         request.pagination.sortBy +
//         '.dir=' +
//         sorting
//     )
//     .then(response => {
//       // START=> COMMIT with data received'
//       // console.log("CLOSED_SERVICE_REQUEST_DATAS-----------",JSON.stringify(response))
//       commit('SET_PHONEPE_CLOSED_SERVICE_REQUEST_DATAS', response.data.data)
//       return response
//       // END=> COMMIT with data received'
//     })
// }
export const FETCH_PHONEPE_CANCELLED_SERVICE_REQUEST_DATAS = ({
  commit

}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
    .get(
      'service-request/getTptRequest/4/1?page=' +
        request.pagination.page +
        '&size=' +
        request.pagination.rowsPerPage  +
        '&searchTerm=' +
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
      // console.log("CLOSED_SERVICE_REQUEST_DATAS-----------",JSON.stringify(response))
      commit('SET_PHONEPE_CANCELLED_SERVICE_REQUEST_DATAS', response.data.data)
      return response
      // END=> COMMIT with data received'
    })
}
export const PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE = ({ commit }, request) => {
  console.log('PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE-->', JSON.stringify(request))
  return api
    .post(
      'service-request/assignReqList/' + request.userId, request.request
    )
}
export const PHONEPE_SERVICE_REQUEST_TO_ASSIGNED_REGION = ({ commit }, request) => {
  return api
    .post(
      'crm-request/change-region',JSON.stringify(request)
    )
}
export const FETCH_PHONEPE_SERVICE_REQUEST_COUNT_DETAILS = ({ commit }, request) => {
  return api
    .get('service-request/getRequestCount').then(response => {
      console.log('FETCH_PHONEPE_SERVICE_REQUEST_COUNT_DETAILS', response)
      commit('SET_PHONEPE_SERVICE_REQUEST_COUNT_DETAILS', response.data.data)
    })
}
export const FETCH_PHONEPE_REOPEN_TICKET = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
    .get(
      'service-request/getTptRequest/6/1?page=' +
      request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&searchTerm=' +
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

      commit('SET_FETCH_PHONEPE_REOPEN_TICKET', response.data.data)
      // console.log("1234567 ASSIGNED_SERVICE_REQUEST_DATAS-----------",JSON.stringify(response.data.data))
      // END=> COMMIT with data received'
    })
}
export const FETCH_PHONEPE_REOPENED_ASSIGNED_TICKET = ({
  commit
}, request) => {
  console.log("Request",JSON.stringify(request))
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
    .get(
      'service-request/getTptRequest/7/1?page=' + 
        request.pagination.page +
        '&size=' +
        request.pagination.rowsPerPage +
        '&searchTerm=' +
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

      commit('SET_FETCH_PHONEPE_REOPENED_ASSIGNED_TICKET', response.data.data)
      // console.log("1234567 ASSIGNED_SERVICE_REQUEST_DATAS-----------",JSON.stringify(response.data.data))
      // END=> COMMIT with data received'
    })  
}

export const PHONEPE_REOPENED_UNASSIGED_TO_ASSIGNED_STATE = ({ commit }, request) => {
 // console.log('PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE-->', JSON.stringify(request))
  return api
    .post(
      'service-request/assignTicket/' + request.userId + "/1", request.request
    )
}

export const FETCH_PHONEPE_OPENED_TICKETS = ({
  commit

}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
    .get(
      'service-request/v1/getTptRequest/1?page=' +
        request.pagination.page +
        '&size=' +
        request.pagination.rowsPerPage  +
        '&searchTerm=' +
        request.filter +
        '&sort=' +
        request.pagination.sortBy +
        '&' +
        request.pagination.sortBy +
        '.dir=' +
        sorting
    )
    .then(response => {
      commit('SET_PHONEPE_OPENED_TICKETS', response.data.data)
      return response
    })
}

export const FETCH_PHONEPE_RESOLVED_TICKET = ({
  commit

}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
  .get(
          'service-request/getTptRequest/3/1?page=' +
            request.pagination.page +
            '&size=' +
            request.pagination.rowsPerPage +
            '&searchTerm=' +
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
      // console.log("CLOSED_SERVICE_REQUEST_DATAS-----------",JSON.stringify(response))
      commit('SET_PHONEPE_RESOLVED_TICKET', response.data.data)
      return response
      // END=> COMMIT with data received'
    })
}


export const PHONEPE_PICKUP_TICKET_ASSIGNED = ({ commit }, request) => {
  console.log('PHONEPE_PICKUP_TICKET_ASSIGNED-->', JSON.stringify(request))
  return api
    .post(
      'service-request/assignReqList/' + request.userId, request.request
    )
}
export const PHONEPE_REASSIGNED_MERCHANT_TICKETS = ({
  commit
}, request) => {
  console.log("PHONEPE_REASSIGNED_MERCHANT_TICKETS",JSON.stringify(request))
  return api
  .post(
    'service-request/assignTicket/' + request.userId + "/2", request.request
  )
}

export const CRM_LOGS_LISTS = ({
  commit
}, request) => {
  return api
    .get("call-log/fetch-data/"+ request.subTicketsId)
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_CRM_LOGS_LISTS", response.data.data);
      // END=> COMMIT with data received'
    })

}
export const ASSIGN_HISTORY_REMARKS_LIST = ({
  commit
}, request) => {
  return api
    .get("assign-history/"+ request.Id)
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_ASSIGN_HISTORY_REMARKS_LIST", response.data.data);
      // END=> COMMIT with data received'
    })

}
// export const PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE = ({ commit }, request) => {
//   console.log('PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE-->', JSON.stringify(request))
//   return api
//     .post(
//       'service-request/assignReqList/' + request.userId, request.request
//     )
// }
// export const PHONEPE_SERVICE_REQUEST_TO_ASSIGNED_REGION = ({ commit }, request) => {
//   return api
//     .post(
//       'crm-request/change-region',JSON.stringify(request)
//     )
// }
