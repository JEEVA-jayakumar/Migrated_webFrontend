export const SET_BANK_LIST = (
  state, payload) => {
  state.getBankList = payload
}

export const SET_REGION_LIST = (state, payload) => {
  // console.log('REGION LIST', JSON.stringify(payload))
  state.getRegionList = payload
}

export const SET_BATCH_DETAILS = (state, payload) => {
  state.getBatchList = payload
}

export const SET_REGION_BASED_QR_ALLOCATED_LIST = (state, payload) => {
  state.regionBasedQrAllocatedList = payload
}
export const FETCH_REGION_BASED_QR_ALLOCATED_APPROVED_LIST = (state, payload) => {
  state.regionBasedQrAllocatedApproveList = payload
}
export const BATCH_DETAIL_FORM = (
  state, payload) => {
  state.getBatchForm = payload
}
export const SET_ACTIVE_BATCH_LIST = (state, payload) => {
  // console.log('REGION LIST', JSON.stringify(payload))
  state.getActiveBatchList = payload
}
