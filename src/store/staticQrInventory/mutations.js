export const SET_UNAPPROVED_QR_LIST = (state, payload) => {
  state.pendingQrList = payload
}

export const SET_APPROVED_QR_LIST = (state, payload) => {
  state.approvedQrList = payload
}
export const SET_UNAPPROVED_QR_LIST_OF_SO = (state, payload) => {
  state.pendingQrListOfSo = payload
}
export const SET_APPROVED_QR_LIST_OF_SO = (state, payload) => {
  state.approvedQrListOfSo = payload
}
export const SET_REJECTED_QR_LIST_OF_SO = (state, payload) => {
  state.rejectedQrListOfSo = payload
}
export const SET_STATIC_QR_REGIONAL_INVENTORY_COUNT = (state, payload) => {
  state.staticQrReginolInventory = payload
}