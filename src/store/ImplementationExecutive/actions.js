import api from "../api.js";
export const IMPLEMENTATION_EXECUTIVE_LIST = ({
  commit
}, request) => {
  return api
    .get("implementation-executive-list/" + JSON.parse(localStorage.getItem("u_i")).region.id)
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_IMPLEMENTATION_EXECUTIVE_LIST", response.data.data);
      // END=> COMMIT with data received'
    })

}
export const REGION_LIST = ({
  commit
}, request) => {
  return api
    .get("region")
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_REGION_LIST", response.data.data);
      // END=> COMMIT with data received'
    })

}
