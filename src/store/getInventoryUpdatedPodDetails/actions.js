import api from '../api.js';
export const FETCH_INVENTORY_UPDATED_POD_DETAILS= ({
  commit
}, request) => {
  console.log("API ACTION REQUEST DETAILS-------->",request)
  return api
    .get("spare-pod/getSparePod/" + request.podNumber)
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_INVENTORY_UPDATED_POD_DETAILS', response.data.data);
      // END=> COMMIT with data received'
    });
};

/* PHONEPE API START*/

export const FETCH_PHONEPE_INVENTORY_UPDATED_POD_DETAILS= ({
  commit
}, request) => {
  console.log("API ACTION REQUEST DETAILS-------->",request)
  return api
    .get("aggregator-spare-parts/agg-getSparePod/" + request.podNumber + "/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]))
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_PHONEPE_INVENTORY_UPDATED_POD_DETAILS', response.data.data);
      // END=> COMMIT with data received'
    });
};

/* PHONEPE API END*/
