import api from "../api.js";
export const DELETE_ASSIGN_USER = ({
  commit
}, request) => {
  return api
    .put("user/reassign-existing-lead-toSo", request)
    .then(response => {
      // START=> COMMIT with data received'
      //   commit("SET_DEVICE_RECOVERY_ASSIGNED_LIST", response.data.data);
      // END=> COMMIT with data received'
    })
}
