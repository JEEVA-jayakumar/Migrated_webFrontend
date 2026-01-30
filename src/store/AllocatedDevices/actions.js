import api from "../api.js";
export const ALLOCATED_MENU=({
    commit
  }, request) => {
    return api.get("getAllocatedDevicesRegion").then(response => {
      console.log(response)
      // START=> COMMIT with data received'
      commit("SET_ALLOCATED_MENU", response.data.data);
      // END=> COMMIT with data received'
    });
    
  };
