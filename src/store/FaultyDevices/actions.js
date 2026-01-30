import api from "../api.js";
export const FAULTY_DEVICE_LIST =({
    commit
  }, request) => {
    return api.get("getFaultyDevicesRegion").then(response => {
      console.log(response)
      // START=> COMMIT with data received'
      commit("SET_FAULTY_DEVICE_LIST", response.data.data);
      // END=> COMMIT with data received'
    });
    
  };


