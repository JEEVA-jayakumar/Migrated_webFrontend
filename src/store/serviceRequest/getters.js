 export const getserviceRequestGetTypes= (state) => {
    console.log("GETTER SPARE PARTS: ------------ : " +  JSON.stringify(state.sparePartsGetTypes))
    return state.serviceRequestGetTypes
  } 
  export const getactiveIssueMapping= (state) => {
    console.log("getactiveIssueMapping ------------ : " +  JSON.stringify(state.sparePartsGetTypes))
    return state.activeIssueMapping
  } 
  export const getdeactiveIssueMapping= (state) => {
    console.log("deactiveIssueMapping------------ : " +  JSON.stringify(state.sparePartsGetTypes))
    return state.deactiveIssueMapping
  } 
  export const getserviceResolutionRemarks= (state) => {
    console.log("GETTER SPARE PARTS: ------------ : " +  JSON.stringify(state.sparePartsGetTypes))
    return state.serviceResolutionRemarks
  }

  export const getserviceRequestIssueTypes= (state) => {
    console.log("GETTER SPARE PARTS: ------------ : " +  JSON.stringify(state.sparePartsGetTypes))
    return state.serviceRequestIssueTypes
  }
  export const getcsSubIssue= (state) => {
    console.log("GETTER SPARE PARTS: ------------ : " +  JSON.stringify(state.sparePartsGetTypes))
    return state.csSubIssue
  }
  export const getsubTaskDetails= (state) => {
    console.log("GETTER SPARE PARTS subTaskDetails: ------------ : " +  JSON.stringify(state.subTaskDetails))
    return state.subTaskDetails
  }

  export const getserviceActiveResolutionDeatils= (state) => {
    console.log("getserviceActiveResolutionDeatils: ------------ : " +  JSON.stringify(state.serviceActiveResolutionDeatils))
    return state.serviceActiveResolutionDeatils
  }
  export const getserviceDeactiveResolutionDeatils= (state) => {
    console.log("getserviceDeactiveResolutionDeatils: ------------ : " +  JSON.stringify(state.serviceDeactiveResolutionDeatils))
    return state.serviceDeactiveResolutionDeatils
  }
  export const getcsActiveSubIssueDetails= (state) => {
    console.log("getcsActiveSubIssueDetails: ------------ : " +  JSON.stringify(state.csActiveSubIssueDetails))
    return state.csActiveSubIssueDetails
  }
  export const getcsDeactiveSubIssueDetails= (state) => {
    console.log("GETTER getcsDeactiveSubIssueDetails: ------------ : " +  JSON.stringify(state.csDeactiveSubIssueDetails))
    return state.csDeactiveSubIssueDetails
  }
