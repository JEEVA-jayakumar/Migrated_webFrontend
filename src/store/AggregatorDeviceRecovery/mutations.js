export const SET_AGGREGATOR_DEVICE_RECOVERY_ASSIGNED_LIST = (state, payload) => {
    // console.log("Mutations assigned:--------------->"+JSON.stringify(payload))
    state.AggregatorDeviceRecoveryAssignedList = payload
  }
  export const SET_AGGREGATOR_DEVICE_RECOVERY_UNASSIGNED_LIST = (state, payload) => {
    // console.log("Mutations Unassigned:--------------->"+JSON.stringify(payload))
    state.AggregatorDeviceRecoveryUnassignedList = payload
  }
  