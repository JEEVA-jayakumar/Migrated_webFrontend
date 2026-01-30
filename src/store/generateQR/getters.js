export function getAllBankList (state) {
  return state.getBankList
}
export function getAllRegionList (state) {
  // console.log('LISTED', JSON.stringify(state.getRegionList))
  return state.getRegionList
}
export const getAllBatchList = state => {
  return state.getBatchList
}
export function getAllBatchForm (state) {
  return state.getBatchForm
}
export function getAllActiveBatchList (state) {
  return state.getActiveBatchList
}
export function getAllRegionBasedQrAllocatedList (state) {
  console.log('CHECK getter', JSON.stringify(state.regionBasedQrAllocatedList))
  return state.regionBasedQrAllocatedList
}
export function getAllRegionBasedQrAllocatedApproveList (state) {
  console.log('CHECK getter', JSON.stringify(state.regionBasedQrAllocatedApproveList))
  return state.regionBasedQrAllocatedApproveList
}
