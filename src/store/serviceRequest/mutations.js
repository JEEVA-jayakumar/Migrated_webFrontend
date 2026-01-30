export const SET_SERVICE_REQUEST_GET_TYPES = (state, payload) => {
    console.log("Spare parts Mutations: ------------ : " +  JSON.stringify(payload))
    state.serviceRequestGetTypes = payload;
  } 
  export const SET_ACTIVE_ISSUE_MAPPING = (state, payload) => {
    console.log("ACTIVE_ISSUE_MAPPING ------------ : " +  JSON.stringify(payload))
    state.activeIssueMapping = payload;
  }
  export const SET_DEACTIVE_ISSUE_MAPPING = (state, payload) => {
    console.log("DEACTIVE_ISSUE_MAPPING ------------ : " +  JSON.stringify(payload))
    state.deactiveIssueMapping = payload;
  }
  export const SET_SERVICE_RESOLUTION_REMARKS = (state, payload) => {
    console.log("Spare parts Mutations: ------------ : " +  JSON.stringify(payload))
    state.serviceResolutionRemarks = payload;
  }

  export const SET_GET_SERVICE_ISSUE_TYPES = (state, payload) => {
    console.log("Spare parts Mutations: ------------ : " +  JSON.stringify(payload))
    state.serviceRequestIssueTypes = payload;
  }
  export const SET_CS_SUB_ISSUE = (state, payload) => {
    console.log("Spare parts Mutations: ------------ : " +  JSON.stringify(payload))
    state.csSubIssue = payload;
  }
  export const SET_SUB_TASK_DATAS = (state, payload) => {
    console.log("Spare parts Mutations subTaskDetails: ------------ : " +  JSON.stringify(payload))
    state.subTaskDetails = payload;
  } 

  export const SET_ACTIVE_SERVICE_RESOLUTION_DATAS = (state, payload) => {
    console.log("ACTIVE_SERVICE_RESOLUTION_DATAS: ------------ : " +  JSON.stringify(payload))
    state.serviceActiveResolutionDeatils = payload;
  }
  export const SET_DEACTIVE_SERVICE_RESOLUTION_DATAS = (state, payload) => {
    console.log("DEACTIVE_SERVICE_RESOLUTION_DATAS: ------------ : " +  JSON.stringify(payload))
    state.serviceDeactiveResolutionDeatils = payload;
  }
  export const SET_ACTIVE_CS_SUB_ISSUE_DATAS = (state, payload) => {
    console.log("SET_ACTIVE_CS_SUB_ISSUE_DATAS: ------------ : " +  JSON.stringify(payload))
    state.csActiveSubIssueDetails = payload;
  } 
  export const SET_DEACTIVE_CS_SUB_ISSUE_DATAS = (state, payload) => {
    console.log("SET_DEACTIVE_CS_SUB_ISSUE_DATAS: ------------ : " +  JSON.stringify(payload))
    state.csDeactiveSubIssueDetails = payload;
  } 
