import api from "../api.js";
export const SO_USERS_LIST = ({
  commit
}, request) => {
  return api
    .get("so-user-list/" + JSON.parse(localStorage.getItem("u_i")).roles[0].hierarchy.id + "/" + JSON.parse(localStorage.getItem("u_i")).region.id)
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_DEVICE_RECOVERY_SO_LIST", response.data.data);
      // END=> COMMIT with data received'
    })
}
