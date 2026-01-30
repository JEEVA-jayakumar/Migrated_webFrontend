
import api from "../api.js";
export const BPREGION_MENU =({
    commit
  }, request) => {
    return api.get("getBpRegionsMenu").then(response => {
      console.log(response)
      // START=> COMMIT with data received'
      commit("SET_BPREGION_MENU", response.data.data);
      // END=> COMMIT with data received'
    });
    
  };

