export const getserviceRequestCancelReasonDetails= (state) => {
    console.log("GETTER SERVICE STATUS: ------------ : " +  JSON.stringify(state.sparePartsGetTypes))
    return state.serviceCancelReasonRequest
  }
