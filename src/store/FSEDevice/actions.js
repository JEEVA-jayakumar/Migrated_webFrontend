import api from "../api.js";
export const FSE_MENU =({
    commit
  }, request) => {
    return api.get("soMenulist").then(response => {
     console.log(response)
      // START=> COMMIT with data received'
      commit("SET_FSE_MENU", response.data.data);
      // END=> COMMIT with data received'
    });
  };



