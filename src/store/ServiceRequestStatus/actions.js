import api from "../api.js";
export const FETCH_SERVICE_REQUEST_STATUS_DETAILS = ({ commit }, request) => {
  return api.get("status/getServiceRequestStatus").then(response => {
    console.log(
      "SERVICE REQUEST TYPE===================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      JSON.stringify(response)
    );
    // START=> COMMIT with data received'

    commit("SET_SERVICE_REQUEST_STATUS_DETAILS", response.data.data);
    return response;
    // END=> COMMIT with data received'
  });
};

export const POST_SERVICE_STATUS_TYPES = ({ commit}, request) => {
  console.log("POST_SERVICE_STATUS_TYPES --->", JSON.stringify(request));
  return api.post("status/createServiceRequestStatus", request)
};

export const ACTIVE_SERVICE_STATUS_TYPES = ({
  commit
}, request) => {
  console.log("SUBMIT EDIT_SPARE_PARTS_TYPES request",JSON.stringify(request))
  return api
    .put("status/updateServiceRequestStatus/" + request.id, request.request)
}

export const EDIT_SERVICE_STATUS_TYPES = ({ commit }, request) => {
  console.log("SUBMIT SERVICE_STATUS_TYPES request", JSON.stringify(request));
  return api.put("status/updateServiceRequestStatus/" + request.id,request.request);
};

export const DELETE_SERVICE_STATUS_TYPES = ({ commit }, request) => {
  console.log("SUBMIT SERVICE_STATUS_TYPES request", JSON.stringify(request));
  return api.delete("status/deleteServiceRequestStatus/" + request.id);
};
