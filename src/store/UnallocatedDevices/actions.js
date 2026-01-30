import api from "../api.js";
export const UNALLOCATED_DEVICE_LIST =({
    commit
  }, request) => {
    return api.get("getUnAllocatedDevicesRegion").then(response => {
      console.log(response)
      // START=> COMMIT with data received'
      commit("SET_UNALLOCATED_DEVICE_LIST", response.data.data);
      // END=> COMMIT with data received'
    });
    
  };

