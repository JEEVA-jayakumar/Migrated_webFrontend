import api from '../api.js';
export const FETCH_ALL_SERVICE_REQUEST_GET_TYPES= ({
  commit
}, request) => {
    console.log(request)
  return api
    .get("service-req-type/getServiceRequestTypes")
    .then(response => {
      // START=> COMMIT with data received'
      console.log("-------------------/////",response)
      commit('SET_SERVICE_REQUEST_GET_TYPES', response.data.data);
      return response;
      console.log("----1234---------------/////",JSON.stringify(response.data.data))
      // END=> COMMIT with data received'
    });
}
export const FETCH_ACTIVE_ISSUE_MAPPING= ({
  commit
}, request) => {
    console.log(request)
  return api
    .get("internal/getIssue/1")
    .then(response => {
      // START=> COMMIT with data received'
      console.log("-------------------/////",response)
      commit('SET_ACTIVE_ISSUE_MAPPING', response.data.data);
      return response;
      console.log("SET_ACTIVE_ISSUE_MAPPING",JSON.stringify(response.data.data))
      // END=> COMMIT with data received'
    });
}

export const FETCH_DEACTIVE_ISSUE_MAPPING= ({
  commit
}, request) => {
    console.log(request)
  return api
    .get("internal/getIssue/0")
    .then(response => {
      // START=> COMMIT with data received'
      console.log("-------------------/////",response)
      commit('SET_DEACTIVE_ISSUE_MAPPING', response.data.data);
      return response;
      console.log("SET_DEACTIVE_ISSUE_MAPPING",JSON.stringify(response.data.data))
      // END=> COMMIT with data received'
    });
}
// export const FETCH_ALL_SERVICE_RESOLUTION_REMARKS= ({
//   commit
// }, request) => {
//     console.log(request)
//   return api
//     .get("service-req-type/getServiceRequestTypes")
//     .then(response => {
//       // START=> COMMIT with data received'
//       console.log("-------------------/////",response)
//       commit('SET_SERVICE_RESOLUTION_REMARKS', response.data.data);
//       return response;
//       console.log("----1234---------------/////",JSON.stringify(response.data.data))
//       // END=> COMMIT with data received'
//     });
// }
export const FETCH_ALL_CS_SUB_ISSUE= ({
  commit
}, request) => {
    console.log(request)
  return api
    .get("service-req-type/getServiceRequestTypes")
    .then(response => {
      // START=> COMMIT with data received'
      console.log("-------------------/////",response)
      commit('SET_CS_SUB_ISSUE', response.data.data);
      return response;
      console.log("----1234---------------/////",JSON.stringify(response.data.data))
      // END=> COMMIT with data received'
    });
}


export const UPDATE_SERVICE_REQUEST_TYPES= ({
    commit,
    rootState
  }, request) => {
     console.log("SUBMIT request",JSON.stringify(request))
    return api.post("service-req-type/createServiceRequestType",request)
  //     .then(response => {
  //         console.log("data",response)
  //         // console.log(response)
  
  
  //   })
  }
  export const UPDATE_ISSUE_MAPPING= ({
    commit,
    rootState
  }, request) => {
     console.log("SUBMIT request",JSON.stringify(request))
    return api.post("internal/createIssue",request)
  //     .then(response => {
  //         console.log("data",response)
  //         // console.log(response)
  
  
  //   })
  }
  export const EDIT_SERVICE_REQUEST_TYPES = ({
    commit
  }, request) => {
    console.log("SUBMIT EDIT_SERVICE_REQUEST_TYPES",JSON.stringify(request))
    return api
      .put("service-req-type/updateServiceRequestType/" + request.id, request.request)
  }
  export const EDIT_ISSUE_MAPPING = ({
    commit
  }, request) => {
    console.log("SUBMIT EDIT_ISSUE_MAPPING",JSON.stringify(request))
    return api
      .put("internal/updateIssue/" + request.id, request.request)
  }
  export const ACTIVE_SERVICE_ISSUE_TYPES = ({
    commit
  }, request) => {
    console.log("SUBMIT ACTIVE_SERVICE_ISSUE_TYPES",JSON.stringify(request))
    return api
      .put("service-req-type/updateServiceRequestIssueType/" + request.id, request.request)
  }
  export const ACTIVE_SERVICE_RESOLUTION_REMARKS = ({
    commit
  }, request) => {
    console.log("SUBMIT ACTIVE_SERVICE_RESOLUTION_REMARKS",JSON.stringify(request))
    return api
      .put("internal/updateServiceResolution/" + request.id, request.request)
  }
  export const ACTIVE_CS_SUB_ISSUE = ({
    commit
  }, request) => {
    console.log("SUBMIT ACTIVE_CS_SUB_ISSUE",JSON.stringify(request))
    return api
      .put("internal/updateSubIssue/" + request.id, request.request)
  }
  export const ACTIVE_ISSUE_MAPPING = ({
    commit
  }, request) => {
    console.log("SUBMIT ACTIVE_CS_SUB_ISSUE",JSON.stringify(request))
    return api
      .put("internal/updateIssue/" + request.id, request.request)
  }

  export const DELETE_SERVICE_REQUEST_TYPES = ({
    commit
  }, request) => {
    console.log("SUBMIT DELETE_SERVICE_REQUEST_TYPES",JSON.stringify(request))
    return api.delete("service-req-type/deleteServiceRequestType/" +request.serviceReqType.id);
  }

  export const DELETE_ISSUE_MAPPING = ({
    commit
  }, request) => {
    console.log("SUBMIT DELETE_ISSUE_MAPPING",JSON.stringify(request))
    return api.delete("internal/deleteIssue/" +request.id);
  }

  export const FETCH_SUB_TASK_DATAS= ({
    commit
  }, request) => {
      console.log(request)
    return api
      .get("service-req-type/getServiceRequestIssueTypes")
      .then(response => {
        // START=> COMMIT with data received'
        console.log("-------------------/////",response)
        commit('SET_SUB_TASK_DATAS', response.data.data);
        return response;
        console.log("----1234---------------/////",JSON.stringify(response.data.data))
        // END=> COMMIT with data received'
      });
  }

  export const FETCH_ACTIVE_SERVICE_RESOLUTION_DATAS= ({
    commit
  }, request) => {
      console.log(request)
    return api
      .get("internal/getServiceResolution/1")
      .then(response => {
        // START=> COMMIT with data received'
        console.log("-------------------/////",response)
        commit('SET_ACTIVE_SERVICE_RESOLUTION_DATAS', response.data.data);
        return response;
        console.log("SET_ACTIVE_SERVICE_RESOLUTION_DATAS",JSON.stringify(response.data.data))
        // END=> COMMIT with data received'
      });
  }
  export const FETCH_DEACTIVE_SERVICE_RESOLUTION_DATAS= ({
    commit
  }, request) => {
      console.log(request)
    return api
      .get("internal/getServiceResolution/0")
      .then(response => {
        // START=> COMMIT with data received'
        console.log("-------------------/////",response)
        commit('SET_DEACTIVE_SERVICE_RESOLUTION_DATAS', response.data.data);
        return response;
        console.log("SET_DEACTIVE_SERVICE_RESOLUTION_DATAS",JSON.stringify(response.data.data))
        // END=> COMMIT with data received'
      });
  }
  export const FETCH_ACTIVE_CS_SUB_ISSUE_DATAS= ({
    commit
  }, request) => {
      console.log(request)
    return api
      .get("internal/getSubIssue/1")
      .then(response => {
        // START=> COMMIT with data received'
        console.log("-------------------/////",response)
        commit('SET_ACTIVE_CS_SUB_ISSUE_DATAS', response.data.data);
        return response;
        console.log("SET_ACTIVE_CS_SUB_ISSUE_DATAS",JSON.stringify(response.data.data))
        // END=> COMMIT with data received'
      });
  }
  export const FETCH_DEACTIVE_CS_SUB_ISSUE_DATAS= ({
    commit
  }, request) => {
      console.log(request)
    return api
      .get("internal/getSubIssue/0")
      .then(response => {
        // START=> COMMIT with data received'
        console.log("-------------------/////",response)
        commit('SET_DEACTIVE_CS_SUB_ISSUE_DATAS', response.data.data);
        return response;
        console.log("SET_DEACTIVE_CS_SUB_ISSUE_DATAS",JSON.stringify(response.data.data))
        // END=> COMMIT with data received'
      });
  }
  export const GET_SERVICE_ISSUE_TYPES= ({
    commit
  }, request) => {
      console.log(request)
    return api
      .get("service-req-type/getServiceRequestIssueTypes")
      .then(response => {
        // START=> COMMIT with data received'
        console.log("-------------------/////",response)
        commit('SET_GET_SERVICE_ISSUE_TYPES', response.data.data);
        return response;
        console.log("----1234---------------/////",JSON.stringify(response.data.data))
        // END=> COMMIT with data received'
      });
  }

  export const POST_SUB_TASK_TYPES= ({
    commit,
    rootState
  }, request) => {
    // console.log("SUBMIT request",JSON.stringify(request))
    return api.post("service-req-type/createServiceRequestIssueType",request)
  //     .then(response => {
  //         console.log("data",response)
  //         // console.log(response)
  
  
  //   })
  }
  export const POST_SERVICE_RESOLUTION_REMARKS= ({
    commit,
    rootState
  }, request) => {
    // console.log("SUBMIT request",JSON.stringify(request))
    return api.post("internal/createServiceResolution",request)
  //     .then(response => {
  //         console.log("data",response)
  //         // console.log(response)
  
  
  //   })
  }

  export const POST_CS_SUB_ISSUE= ({
    commit,
    rootState
  }, request) => {
    // console.log("SUBMIT request",JSON.stringify(request))
    return api.post("internal/createSubIssue",request)
  //     .then(response => {
  //         console.log("data",response)
  //         // console.log(response)
  
  
  //   })
  }

  export const EDIT_SUB_TASK_TYPES = ({
    commit
  }, request) => {
    console.log("SUBMIT EDIT_SPARE_PARTS_TYPES request",JSON.stringify(request))
    return api
      .put("service-req-type/updateServiceRequestIssueType/" + request.id, request.request)
  }
  export const EDIT_SERVICE_RESOLUTION_REMARKS = ({
    commit
  }, request) => {
    console.log("SUBMIT EDIT_SPARE_PARTS_TYPES request",JSON.stringify(request))
    return api
      .put("internal/updateServiceResolution/"+ request.id, request.request)
  }

  export const EDIT_CS_SUB_ISSUE = ({
    commit
  }, request) => {
    console.log("SUBMIT EDIT_SPARE_PARTS_TYPES request",JSON.stringify(request))
    return api
      .put("internal/updateSubIssue/" + request.id, request.request)
  }
  export const DELETE_SUB_TASK_TYPES = ({
    commit
  }, request) => {
    console.log("SUBMIT DELETE_SPARE_PARTS_TYPES request",JSON.stringify(request))
    return api.delete("service-req-type/deleteServiceRequestIssueType/" +request.id);
  }

  export const DELETE_SERVICE_RESOLUTION_REMARKS = ({
    commit
  }, request) => {
    console.log("SUBMIT DELETE_SPARE_PARTS_TYPES request",JSON.stringify(request))
    return api.delete("internal/deleteServiceResolution/" +request.id);
  }

  export const DELETE_CS_SUB_ISSUE = ({
    commit
  }, request) => {
    console.log("SUBMIT DELETE_SPARE_PARTS_TYPES request",JSON.stringify(request))
    return api.delete("internal/deleteSubIssue/" +request.id);
  }
