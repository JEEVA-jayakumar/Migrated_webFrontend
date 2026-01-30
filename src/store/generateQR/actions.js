import Vue from 'vue'
import api from '../api.js'

export const FETCH_BANK_LIST = ({
  commit
}, request) => {
  return api.get('static-qr/bankList').then(response => {
  //  console.log('BANKLISTGETTER', JSON.stringify(response))
    commit('SET_BANK_LIST', response.data.data)
     return response
  })
}

export const FETCH_REGION_LIST = ({
  commit
}, request) => {
  return api.get('region').then(response => {
    commit('SET_REGION_LIST', response.data.data)
    return response
  })
}

export const FETCH_BATCH_DETAILS = ({
  commit
}, request) => {
  // console.log("DAGA2 : ==== : ", JSON.stringify(request))
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  if (request.filter == undefined) {
    return api
      .get('qr-gen/listOfBatch?page=' +
         request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&sort=' +
      request.pagination.sortBy +
      '&' +
      request.pagination.sortBy +
      '.dir=' +
    sorting).then(response => {
        commit('SET_BATCH_DETAILS', response.data.data)
      })
  } else {
    return api
      .get('qr-gen/listOfBatch?page=' +
         request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&sort=' +
      request.pagination.sortBy +
      '&' +
      request.pagination.sortBy +
      '.dir=' +
    sorting +
      '&searchTerm=' +
      request.filter)
      .then(response => {
        commit('SET_BATCH_DETAILS', response.data.data)
      })
  }
}

export const FETCH_REGION_BASED_QR_ALLOCATED_LIST = ({
  commit
}, request) => {
 
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  if (request.filter == undefined) {
    return api
      .get('qr-gen/podList/0?page=' +
         request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&sort=' +
      request.pagination.sortBy +
      '&' +
      request.pagination.sortBy +
      '.dir=' +
    sorting).then(response => {
        commit('SET_REGION_BASED_QR_ALLOCATED_LIST', response.data.data)
        return response.data.data
      })
  } else {
    return api
      .get('qr-gen/podList/0?page=' +
         request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&sort=' +
      request.pagination.sortBy +
      '&' +
      request.pagination.sortBy +
      '.dir=' +
    sorting +
      '&searchTerm=' +
      request.filter)
      .then(response => {
        commit('SET_REGION_BASED_QR_ALLOCATED_LIST', response)
        return response.data.data
      })
  }
}

export const FETCH_REGION_BASED_QR_ALLOCATED_APPROVED_LIST = ({
  commit
}, request) => {
  // console.log("DAGA2 : ==== : ", JSON.stringify(request))
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  if (request.filter == undefined) {
    return api
      .get('qr-gen/podList/1?page=' +
         request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&sort=' +
      request.pagination.sortBy +
      '&' +
      request.pagination.sortBy +
      '.dir=' +
    sorting).then(response => {
        commit('SET_REGION_BASED_QR_ALLOCATED_APPROVED_LIST', response.data.data)
        return response.data.data
      })
  } else {
    return api
      .get('qr-gen/podList/1?page=' +
         request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&sort=' +
      request.pagination.sortBy +
      '&' +
      request.pagination.sortBy +
      '.dir=' +
    sorting +
      '&searchTerm=' +
      request.filter)
      .then(response => {
        commit('SET_REGION_BASED_QR_ALLOCATED_APPROVED_LIST', response)
        return response.data.data
      })
  }
}

export const GENERATE_QR = ({
  commit
}, request) => {
  return api.post('qr-gen/generateQr', request)
}

export const APPROVE_RECIEVED_STICKER = ({
  commit
}, request) => {
  return api.post('qr-gen/addQrCentralInventory/'+request.batchId, request)
}
export const UPDATE_QR_COUNT = ({
  commit
}, request) => {
  console.log('TEST CHECK', JSON.stringify(request))
  return api.put('qr-gen/podUpdate/' + request.id +'/'+request.action, request.request)
}
export const SUBMIT_QR_COUNT = ({
  commit
}, request) => {
  console.log('TEST CHECK', JSON.stringify(request))
  return api.post('qr-gen/allocationApproval',request)
}
export const ASSIGN_REGION = ({
  commit
}, request) => {
  return api.post('qr-gen/regionAllocation', request)
}
export const ASSIGN_SO = ({
  commit
}, request) => {
  return api.post('qr-gen/allocateToSo', request)
}
export const FETCH_ACTIVE_BATCH_LIST = ({
  commit
}, request) => {
  return api.get('qr-gen/batchList').then(response => {
    commit('SET_ACTIVE_BATCH_LIST', response.data.data)
    return response
  })
}
// export const ASSIGN_QR_TO_REGION = ({
//   commit
// }, request) => {
//   return api.post('qr-gen/regionAllocation', request)
// }
// export const FETCH_BATCH_DETAIL_FORM = ({
//   commit
// }, request) => {
//   return api.get('get-batch-details').then(response => {
//     commit('BATCH_DETAIL_FORM', response.data.data)
//   })
// }
