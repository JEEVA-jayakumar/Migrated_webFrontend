import api from '../api.js';
export const FETCH_SINGLE_POD_DETAILS = ({
    commit
  }, request) => {
   // console.log("API ACTION REQUEST DETAILS-------->",JSON.stringify(request))
    return api
      .get(
        "spare-pod/getSparePod/"+request.pod_number)
      .then(response => {
        return response

      });
  };

  /* PHONEPE API START */

  export const FETCH_PHONEPE_SINGLE_POD_DETAILS = ({
    commit
  }, request) => {
   // console.log("API ACTION REQUEST DETAILS-------->",JSON.stringify(request))
    return api
      .get(
        "aggregator-spare-parts/agg-getSparePod/"+request.pod_number+"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]))
      .then(response => {
        return response
      // console.log("ACTION APPROVE REGION DATA====+>>>",JSON.stringify(response))
        // START=> COMMIT with data received'
     
       // commit('SET_FETCH_SINGLE_POD_DETAILS', response.data.data);
        // END=> COMMIT with data received'
      });
  };

  /* PHONEPE API END */
