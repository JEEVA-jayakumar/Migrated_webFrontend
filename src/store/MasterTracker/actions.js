import api from '../api.js';
export const MASTER_TRACKER_LIST = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      'master-tracker-list?page=' +
      request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&search=' +
      request.filter +
      '&sort=' +
      request.pagination.sortBy +
      '&' +
      request.pagination.sortBy +
      '.dir=' +
      sorting
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_MASTER_TRACKER_LIST', response.data.data);
      // END=> COMMIT with data received'
    });
};

/*Aggregators API */

/*START AGGREGATORS DYNAMIC CODE */
  
// export const AGGREGATORS_MASTER_TRACKER_LIST = ({
//   commit
// }, request) => {
//   console.log("AGGREGATORS_MASTER_TRACKER_LIST ----->",JSON.stringify(request))
//   let sorting = request.pagination.descending ? 'asc' : 'desc';
//   return api
//     .get(
//       'aggregator-inventory/agg-master-tracker-list/'+request.aggregator+"?page= "+
//       request.pagination.page +
//       '&size=' +
//       request.pagination.rowsPerPage +
//       '&search=' +
//       request.filter +
//       '&sort=' +
//       request.pagination.sortBy +
//       '&' +
//       request.pagination.sortBy +
//       '.dir=' +
//       sorting
//     )
//     .then(response => {
//       // START=> COMMIT with data received'
//       commit('SET_AGGREGATORS_MASTER_TRACKER_LIST', response.data.data);
//       // END=> COMMIT with data received'
//     });
// };

/*END AGGREGATORS DYNAMIC CODE */

/*START AGGREGATORS STATIC CODE */

export const AGGREGATORS_MASTER_TRACKER_LIST = ({
  commit
}, request) => {
  console.log("AGGREGATORS_MASTER_TRACKER_LIST ----->",JSON.stringify(request))
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
    .get(
      'aggregator-inventory/agg-master-tracker-list/'+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+'?page=' +
      request.pagination.page +
      '&size=' +
      request.pagination.rowsPerPage +
      '&search=' +
      request.filter +
      '&sort=' +
      request.pagination.sortBy +
      '&' +
      request.pagination.sortBy +
      '.dir=' +
      sorting
    )
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_AGGREGATORS_MASTER_TRACKER_LIST', response.data.data);
      // END=> COMMIT with data received'
    });
};


/*END AGGREGATORS STATIC CODE */

/*Aggregators API */


// export const APPROVE_LOST_STOLEN_DEVICE = ({ commit }, request) => {
//   console.log('|REQUEST : ' + JSON.stringify(request))
//   return api
//     .post('aggregator-inventory/agg-submit-lost-or-stolen/8', request)
//     .then(response => {
//       commit('SET_APPROVE_LOST_STOLEN_DEVICE',response.data.data);
//       console.log("TESTING RESPONSE------>"+response);
//       let data = {
//         apiStatusCode: response.status,
//         apiPending: false,
//         apiSuccess: true,
//         apiData: response.data.data,
//       };
//       commit('API_RESPONSE_LOG', data);
//     });
// };
 /* START AGGREGATORS STATIC CODE  */


export const APPROVE_PHONEPE_LOST_STOLEN_DEVICE = ({ commit }, request) => {
  console.log('|REQUEST : ' + JSON.stringify(request))
  return api
    .post('aggregator-inventory/agg-submit-lost-or-stolen/'+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]), request)
    .then(response => {
      console.log("TESTING RESPONSE------>"+response);
      let data = {
        apiStatusCode: response.status,
        apiPending: false,
        apiSuccess: true,
        apiData: response.data.data,
      };
      commit('API_RESPONSE_LOG', data);
    });
};

 /* END AGGREGATORS STATIC CODE  */
export const APPROVE_LOST_STOLEN_DEVICE = ({ commit }, request) => {
  console.log('|REQUEST : ' + JSON.stringify(request.regionalInventory))
  return api
    .post('submit-lost-or-stolen/8', request)
    .then(response => {
      commit('SET_APPROVE_LOST_STOLEN_DEVICE',response.data.data);
    });
};



