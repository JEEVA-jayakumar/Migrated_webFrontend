export const SET_SERVICE_REQUEST_STATUS_DETAILS = (state, payload) => {
    console.log("Service Status Mutations: ------------ : " +  JSON.stringify(payload))
    state.serviceStatusRequest = payload;
  }
  
