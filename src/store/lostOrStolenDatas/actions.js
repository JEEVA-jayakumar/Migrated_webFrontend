import api from '../api.js';

export const FETCH_ALL_LOST_DEVICES_DATAS = ({
    commit
  }, request) => {
    let sorting = request.pagination.descending ? 'asc' : 'desc';
    return api
      .get(
        'get-lost-or-stolen-device/'+ request.filter +'?page=' +
        request.pagination.page +
        '&size=' +
        request.pagination.rowsPerPage +
        '&sort=' +
        request.pagination.sortBy +
        '&' +
        request.pagination.sortBy +
        '.dir=' +
        sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_ALL_LOST_DEVICES_DATAS', response.data.data);
        // END=> COMMIT with data received'
      });
  };

  /*Aggregators API*/

  /*START AGGREGATOS DYNAMIC CODE */

  // export const FETCH_AGGREGATORS_ALL_LOST_DEVICES_DATAS = ({
  //   commit
  // }, request) => {
  //   console.log("FETCH_AGGREGATORS_ALL_LOST_DEVICES_DATAS ----->",JSON.stringify(request))
  //   let sorting = request.pagination.descending ? 'asc' : 'desc';
  //   return api
  //     .get(
  //       'aggregator-inventory/agg-get-lost-or-stolen-device/' + request.filter +"/"+request.aggregator+'/?page=' +
  //       request.pagination.page +
  //       '&size=' +
  //       request.pagination.rowsPerPage +
  //       '&sort=' +
  //       request.pagination.sortBy +
  //       '&' +
  //       request.pagination.sortBy +
  //       '.dir=' +
  //       sorting
  //     )
  //     .then(response => {
  //       // START=> COMMIT with data received'
  //       commit('SET_ALL_AGGREGATORS_LOST_DEVICES_DATAS', response.data.data);
  //       // END=> COMMIT with data received'
  //     });
  // };

  /*END AGGREGATOS DYNAMIC CODE */

  /*START AGGREGATOS STATIC CODE */
  export const FETCH_AGGREGATORS_ALL_LOST_DEVICES_DATAS = ({
    commit
  }, request) => {
    console.log("FETCH_AGGREGATORS_ALL_LOST_DEVICES_DATAS ----->",JSON.stringify(request))
    let sorting = request.pagination.descending ? 'asc' : 'desc';
    return api
      .get(
        'aggregator-inventory/agg-get-lost-or-stolen-device/' + request.filter+"/" +JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+'?page=' +
        request.pagination.page +
        '&size=' +
        request.pagination.rowsPerPage +
        '&sort=' +
        request.pagination.sortBy +
        '&' +
        request.pagination.sortBy +
        '.dir=' +
        sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_ALL_AGGREGATORS_LOST_DEVICES_DATAS', response.data.data);
        // END=> COMMIT with data received'
      });
  };

  /*END AGGREGATOS STATIC CODE */

   /*Aggregators API*/
