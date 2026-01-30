import api from '../api.js'
export const FETCH_UNAPPROVED_QR_LIST = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'

  return api
    .get('qr-gen/allocationList/0?page=' +
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
      // console.log("PHONEPE ACTION", JSON.stringify(response));

      commit('SET_UNAPPROVED_QR_LIST', response.data.data)
    })
}
export const FETCH_APPROVED_QR_LIST = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'

  return api
    .get('qr-gen/allocationList/1?page=' +
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
      // console.log("PHONEPE ACTION", JSON.stringify(response));

      commit('SET_APPROVED_QR_LIST', response.data.data)
    })
}
export const FETCH_UNAPPROVED_QR_LIST_OF_SO = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
    .get('qr-gen/podListOfSo/2?page=' +
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
      // console.log("PHONEPE ACTION", JSON.stringify(response));

      commit('SET_UNAPPROVED_QR_LIST_OF_SO', response.data.data)
    })
}
export const FETCH_APPROVED_QR_LIST_OF_SO = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
    .get('qr-gen/podListOfSo/3?page=' +
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
      // console.log("PHONEPE ACTION", JSON.stringify(response));

      commit('SET_APPROVED_QR_LIST_OF_SO', response.data.data)
    })
}

export const FETCH_REJECTED_QR_LIST_OF_SO = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc'
  return api
    .get('qr-gen/podListOfSo/4?page=' +
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
      // console.log("PHONEPE ACTION", JSON.stringify(response));

      commit('SET_REJECTED_QR_LIST_OF_SO', response.data.data)
    })
}
export const FETCH_STATIC_QR_REGIONAL_INVENTORY_COUNT = ({
  commit
}, request) => {
  return api.get('qr-gen/qrRegionInventory').then(response => {
    commit('SET_STATIC_QR_REGIONAL_INVENTORY_COUNT', response.data.data)
    return response.data.data
    // END=> COMMIT with data received'
  })
}