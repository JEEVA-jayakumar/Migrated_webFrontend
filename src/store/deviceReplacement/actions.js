import api from "../api.js";
export const DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST = ({ commit }, request) => {
  console.log("requested datas:----------------:Unassigned-----"+JSON.stringify(request.pagination))
  let sorting = request.pagination.descending ? "asc" : "desc";
  let sortBy = request.pagination.sortBy == null ? "createdAt" : request.pagination.sortBy
  return api
    .get(
       "DeviceReplacement-queue-list/assigned?page=" +
      request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&searchterm=" + request.filter
      + "&sort=" + sortBy + "&" + sortBy + ".dir=" + sorting
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    });


  // else {
  //   return api
  //     .get("master-tracker-list/" + request.startDate + '+' + request.endDate)
  //     .then(response => {
  //       // START=> COMMIT with data received'
  //       commit("SET_MASTER_TRACKER_LIST", response.data.data);
  //       // END=> COMMIT with data received'
  //     })
  // }
}

export const DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST = ({ commit }, request) => {
    // return api.get("DeviceReplacement-queue-list").then(response => {
    //     // START=> COMMIT with data received'
    //     commit("SET_DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST", response.data.data);
    //     // END=> COMMIT with data received'
    // });
    let sorting = request.pagination.descending ? "asc" : "desc";
  console.log("requested datas:----------------:Unassigned-----"+JSON.stringify(request))
    return api
    .get(
       "DeviceReplacement-queue-list?page=" +
      request.pagination.page +
      "&size=" +
      request.pagination.rowsPerPage +
      "&searchterm=" +
      request.filter
      +
    "&sort=" +
    request.pagination.sortBy +
    "&" +
    request.pagination.sortBy +
    ".dir=" +
    sorting
     
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    });
};
export const DEVICE_REPLACEMENT_QUEUE_SUBMIT = ({ commit }, request) => {
    return api.put(
        "DeviceReplacement-assigned-to/" + request.userId,
        request
    );
};

export const DEVICE_REPLACEMENT_QUEUE_REASSIGN = ({ commit }, request) => {
  return api.put(
    "DeviceReplacement-ReAssigned-to/" + request.userId,
    {
      marsDeviceIds: request.marsDeviceIds,
      userId: request.userId
    }
  );
};

export const DEVICE_REPLACEMENT_QUEUE_UNASSIGN = ({ commit }, request) => {
  return api.put(
    "DeviceReplacement-unassigned-to",
    {
      marsDeviceIds: request.marsDeviceIds,
      userId: request.userId
    }
  );
};



export const EQUITAS_ONBOARDING_QUEUE_ASSIGNED_LIST = ({ commit }, request) => {
  let sorting = request.pagination.descending ? "asc" : "desc";
  let sortBy = request.pagination.sortBy == null ? "createdAt" : request.pagination.sortBy
  return api
    .get(
       "getAssidn-list-equitas?page=" +
      request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter
      + "&sort=" + sortBy + "&" + sortBy + ".dir=" + sorting
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_EQUITAS_ONBOARDING_QUEUE_ASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    });
  }
 

  export const EQUITAS_ONBOARDING_QUEUE_UNASSIGNED_LIST = ({ commit }, request) => {
    let sorting = request.pagination.descending ? "asc" : "desc";
    let sortBy = request.pagination.sortBy == null ? "createdAt" : request.pagination.sortBy
    return api
      .get(
         "getUnAssignSatEquitasImplementationLeads?page=" +
        request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter
        + "&sort=" + sortBy + "&" + sortBy + ".dir=" + sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit("SET_EQUITAS_ONBOARDING_QUEUE_UNASSIGNED_LIST", response.data.data);
        // END=> COMMIT with data received'
      });
    }

    export const EQUITAS_SOUNDBOX_REQUEST_UNASSIGED_TO_ASSIGNED_STATE = ({ commit }, request) => {
      return api.put(
          "equitasSoAssign/1/" + request.userId,
          request.marsDeviceIds
      );
  };
  export const EQUITAS_SOUNDBOX_REASSIGNED_REASON_TYPE_DETAILS = ({ commit }, request) => {
    return api.put(
        "equitasSoAssign/3/" + request.userId,
        request.marsDeviceIds
    );
};

  export const EQUITAS_ONBOARDING_REQUEST_TO_ASSIGNED_REGION = ({ commit }, request) => {
    return api
      .put(
        'region-reasign-equitas/'+request.regionCode,JSON.stringify(request.marsDeviceIds)
      )
  }
  export const EQUITAS_ONBOARDING_QUEUE_COMPLETED_LIST = ({ commit }, request) => {
    let sorting = request.pagination.descending ? "asc" : "desc";
    let sortBy = request.pagination.sortBy == null ? "createdAt" : request.pagination.sortBy
    return api
      .get(
         "getEquitasCompletedLead/1?page=" +
        request.pagination.page + "&size=" + request.pagination.rowsPerPage + "&search=" + request.filter
        + "&sort=" + sortBy + "&" + sortBy + ".dir=" + sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit("SET_EQUITAS_ONBOARDING_QUEUE_COMPLETED_LIST", response.data.data);
        // END=> COMMIT with data received'
      });
    }
