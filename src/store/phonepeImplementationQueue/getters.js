export const getPhonepeImplementationQueueUnassignedList = (state) => {
    // console.log("GETTER of unassigned datas----------->",JSON.stringify(state.getPhonepeImplementationQueueUnassignedList))
    return state.phonepeimplementationQueueUnassignedList
  }

  export const getPhonepeImplementationQueueassignedList = (state) => {
    // console.log("GETTER of unassigned datas----------->",JSON.stringify(state.implementationQueueUnassignedList))
    return state.phonepeimplementationQueueassignedList
  }

  export const getPhonepeImplementationQueueCourierList = (state) => {
    // console.log("GETTER of unassigned datas----------->",JSON.stringify(state.implementationQueueUnassignedList))
    return state.phonepeimplementationQueueCourierList
  }

  export const getPhonepeCancelledMerchants = (state) => {
    // console.log("GETTER of CancelledMerchants----------->",JSON.stringify(state.getPhonepeCancelledMerchants))
    return state.phonepecancelledMerchants
  }
