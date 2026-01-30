export const getserviceRequestPhonepeUnassignedDatas = (state) => {
    //  console.log("getserviceRequestPhonepeUnassignedDatas--------->",JSON.stringify(state.serviceRequestPhonepeUnassignedDatas))
      return state.serviceRequestPhonepeUnassignedDatas
    }
    export const getPhonepeAssignRegion = (state) => {
        return state.PhonepeAssignToRegion
      }  
  
    export const getserviceRequestPhonepeAssignedDatas = (state) => {
      // console.log("getserviceRequestPhonepeAssignedDatas--------->",JSON.stringify(state.serviceRequestPhonepeAssignedDatas))
      return state.serviceRequestPhonepeAssignedDatas
    }
    export const getserviceRequestPhonepeClosedDatas = (state) => {
      console.log("getserviceRequestPhonepeClosedDatas=========>>>>>>>>",JSON.stringify(state.serviceRequestPhonepeClosedDatas))
      return state.serviceRequestPhonepeClosedDatas
    } 
    export const getserviceRequestPhonepeCancelledDatas = (state) => {
      console.log("serviceRequestPhonepeCancelledDatas=========>>>>>>>>",JSON.stringify(state.serviceRequestPhonepeCancelledDatas))
      return state.serviceRequestPhonepeCancelledDatas
    }
    export const getserviceRequestPhonepeCountDatas = (state) => {
        // console.log("getserviceRequestPhonepeCountDatas--------->",JSON.stringify(state.serviceRequestPhonepeCountDatas))
      return state.serviceRequestPhonepeCountDatas
    }
    
     export const getserviceRequestReopenTicket = (state) => {
        // console.log("getserviceRequestPhonepeCountDatas--------->",JSON.stringify(state.serviceRequestPhonepeCountDatas))
      return state.serviceRequestReopenTicket
    }
    
    export const getphonepeAssignedReopenTicket = (state) => {
      // console.log("getserviceRequestPhonepeCountDatas--------->",JSON.stringify(state.serviceRequestPhonepeCountDatas))
    return state.phonepeAssignedReopenTicket
  }

  export const getphonepeOpenedTickets = (state) => {
    // console.log("getserviceRequestPhonepeCountDatas--------->",JSON.stringify(state.serviceRequestPhonepeCountDatas))
  return state.phonepeOpenedTickets
}

 export const getphonepeResolvedTickets = (state) => {
    // console.log("getserviceRequestPhonepeCountDatas--------->",JSON.stringify(state.serviceRequestPhonepeCountDatas))
  return state.phonepeResolvedTickets
}
export const getcrmLogsLists = (state) => {
  // console.log("getserviceRequestPhonepeCountDatas--------->",JSON.stringify(state.serviceRequestPhonepeCountDatas))
return state.crmLogsLists
}
export const getassignHistoryLists = (state) => {
  // console.log("getserviceRequestPhonepeCountDatas--------->",JSON.stringify(state.serviceRequestPhonepeCountDatas))
return state.assignHistoryLists
}
