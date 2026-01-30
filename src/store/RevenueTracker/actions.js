import api from "../api.js";
export const REVENUE_TRACKER = ({
  commit
}, request) => {
  return api
    .get("revenue-tracker/" + request.heirarchyId + '/' + request.userId)
    .then(response => {
      // START=> COMMIT with data received'
      commit("SET_REVENUE_TRACKER_LIST", response.data.data);
      // END=> COMMIT with data received'
    })
}
