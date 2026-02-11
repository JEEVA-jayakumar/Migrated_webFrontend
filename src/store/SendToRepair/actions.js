import { or } from '@vuelidate/validators';
import api from '../api.js';
// export const FETCH_SEND_TO_REPAIR_DETAILS = ({
//   commit
// }, request) => {
// //   let sorting = request.pagination.descending ? 'asc' : 'desc';  https://qaapp.bijlipay.co.in:8085/api/central-devices-sent-for-repair
  
//      return api
//        .get(
//          'central-devices-sent-for-repair')
//      .then(response => {
//         // START=> COMMIT with data received'
//        commit('SET_SEND_TO_REPAIR_DATA', response.data.data);
//          // END=> COMMIT with data received'
//        })
//    };
export const FETCH_SEND_TO_REPAIR_DETAILS = ({
  commit
}, request) => {
  if (request.pagination.sortBy == null) {
    return api
      .get(
        "central-devices-sent-for-repair?page=" +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&searchTerm=" +
        request.filter
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit("SET_SEND_TO_REPAIR_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
  }else{
    let sorting = request.pagination.descending ? 'asc' : 'desc';
    return api
      .get(
        'central-devices-sent-for-repair?page=' +
        request.pagination.page +
        '&size=' +
        request.pagination.rowsPerPage +
        "&searchTerm=" +
        request.filter +
        "&sort=" +
        request.pagination.sortBy +
        "&" +
        request.pagination.sortBy +
        ".dir=" +
        sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_SEND_TO_REPAIR_DATA', response.data.data);
        // END=> COMMIT with data received'
      });
  }
  
};
/*AGGREGATORS API */

/*START AGGREGATORS DYNAMIC CODE */

// export const FETCH_AGGREGATORS_SEND_TO_REPAIR_DETAILS = ({
//   commit
// }, request) => {
//   if (request.pagination.sortBy == null) {
//     return api
//       .get(
//         "aggregator-inventory/agg-central-devices-sent-for-repair/"+request.aggregators+"?page=" +
//         request.pagination.page +
//         "&size=" +
//         request.pagination.rowsPerPage +
//         "&search=" +
//         request.filter
//       )
//       .then(response => {
//         // START=> COMMIT with data received'
//         commit("SET_AGGREGATORS_SEND_TO_REPAIR_DETAILS", response.data.data);
//         // END=> COMMIT with data received'
//       });
//   }else{
//     let sorting = request.pagination.descending ? 'asc' : 'desc';
//     return api
//       .get(
//         'aggregator-inventory/agg-central-devices-sent-for-repair/'+request.aggregators+"?page=" +
//         request.pagination.page +
//         '&size=' +
//         request.pagination.rowsPerPage +
//         "&search=" +
//         request.filter +
//         "&sort=" +
//         request.pagination.sortBy +
//         "&" +
//         request.pagination.sortBy +
//         ".dir=" +
//         sorting
//       )
//       .then(response => {
//         // START=> COMMIT with data received'
//         commit('SET_AGGREGATORS_SEND_TO_REPAIR_DETAILS', response.data.data);
//         // END=> COMMIT with data received'
//       });
//   }
  
// };

/*END AGGREGATORS DYNAMIC CODE */

/*START AGGREGATORS STATIC CODE */

export const FETCH_AGGREGATORS_SEND_TO_REPAIR_DETAILS = ({
  commit
}, request) => {
  if (request.pagination.sortBy == null) {
    return api
      .get(
        "aggregator-inventory/agg-central-devices-sent-for-repair/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?page="+
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&searchTerm=" +
        request.filter
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit("SET_AGGREGATORS_SEND_TO_REPAIR_DETAILS", response.data.data);
        // END=> COMMIT with data received'
      });
  }else{
    let sorting = request.pagination.descending ? 'asc' : 'desc';
    return api
      .get(
        'aggregator-inventory/agg-central-devices-sent-for-repair/'+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+'?page='+
        request.pagination.page +
        '&size=' +
        request.pagination.rowsPerPage +
        "&searchTerm=" +
        request.filter +
        "&sort=" +
        request.pagination.sortBy +
        "&" +
        request.pagination.sortBy +
        ".dir=" +
        sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_AGGREGATORS_SEND_TO_REPAIR_DETAILS', response.data.data);
        // END=> COMMIT with data received'
      });
  }
  
};

/*END AGGREGATORS STATIC CODE */

/*AGGREGATORS API */

export const APPROVE_SEND_TO_REPAIR = ({ commit }, request) => {
  console.log("|REQUEST : " +JSON.stringify(request))

    return api
      .post("central-faulty-device-accept-or-move-to-scrap/1", request)
      .then(response => {
        console.log(response);
        let data = {
          apiStatusCode: response.status,
          apiPending: false,
          apiSuccess: true,
          apiData: response.data.data,
        };
        commit("API_RESPONSE_LOG", data);
      });
  };

  /*AGGREGATORS API */
  export const APPROVE_AGGREGATORS_SEND_TO_REPAIR = ({ commit }, request) => {
    console.log("|REQUEST : " +JSON.stringify(request))
  
      return api
        .post("aggregator-inventory/agg-central-faulty-device-accept-or-move-to-scrap/1", request)
        .then(response => {
          console.log(response);
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data,
          };
          commit("API_RESPONSE_LOG", data);
        });
    };
  /*AGGREGATORS API */

  export const MOVED_TO_SCRAP_DATAS = ({ commit }, request) => {
    console.log("|REQUEST : " + request)
    return api
      .post("central-faulty-device-accept-or-move-to-scrap/2",request)
      .then(response => {
        console.log(response);
        let data = {
          apiStatusCode: response.status,
          apiPending: false,
          apiSuccess: true,
          apiData: response.data.data
        };
        commit("API_RESPONSE_LOG", data);
      });
  };

   /*AGGREGATORS API */
   export const AGGREGATORS_MOVED_TO_SCRAP_DATAS = ({ commit }, request) => {
    console.log("|REQUEST : " + request)
    return api
      .post("aggregator-inventory/agg-central-faulty-device-accept-or-move-to-scrap/2",request)
      .then(response => {
        console.log(response);
        let data = {
          apiStatusCode: response.status,
          apiPending: false,
          apiSuccess: true,
          apiData: response.data.data
        };
        commit("API_RESPONSE_LOG", data);
      });
  };

    /*AGGREGATORS API */

    export const FETCH_ALL_MOVED_TO_SCRAP_DATA = ({
      commit
    }, request) => {
       let sorting = request.pagination.descending ? 'desc' : 'asc';
      return api
        .get(
          'central-inventory-get-device-by-status/4?page='+
          request.pagination.page +
          '&size=' +
          request.pagination.rowsPerPage +
          "&search=" +
          request.filter +
          "&sort=" +
          request.pagination.sortBy +
          "&" +
          request.pagination.sortBy +
          ".dir=" +
          sorting
        )
        .then(response => {
          // START=> COMMIT with data received'
          commit('SET_ALL_MOVED_TO_SCRAP_DATA', response.data.data);
          // END=> COMMIT with data received'
        });
    };
      /*Aggregators API */

      /* START AGGREGATORS DYNAMIC CODE */

    // export const FETCH_AGGREGATORS_ALL_MOVED_TO_SCRAP_DATA = ({
    //   commit
    // }, request) => {
    //    let sorting = request.pagination.descending ? 'desc' : 'asc';
    //   return api
    //     .get(
    //       'aggregator-inventory/agg-central-inventory-get-device-by-status/4/'+request.aggregator +'?page='+
    //         request.pagination.page +
    //         '&size=' +
    //         request.pagination.rowsPerPage +
    //         "&search=" +
    //         request.filter +
    //         "&sort=" +
    //         request.pagination.sortBy +
    //         "&" +
    //         request.pagination.sortBy +
    //         ".dir=" +
    //         sorting
    //     )
    //     .then(response => {
    //       // START=> COMMIT with data received'
    //       commit('SET_AGGREGATORS_ALL_MOVED_TO_SCRAP_DATA', response.data.data);
    //       // END=> COMMIT with data received'
    //     });
    // };

    /* END AGGREGATORS DYNAMIC CODE */


    /* START AGGREGATORS STATIC CODE */
      
    export const FETCH_AGGREGATORS_ALL_MOVED_TO_SCRAP_DATA = ({
      commit
    }, request) => {
       let sorting = request.pagination.descending ? 'desc' : 'asc';
      return api
      // repair/'+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"?
        .get( 
          'aggregator-inventory/agg-central-inventory-get-device-by-status/4/'+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+'?page='+
            request.pagination.page +
            '&size=' +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter +
            "&sort=" +
            request.pagination.sortBy +
            "&" +
            request.pagination.sortBy +
            ".dir=" +
            sorting
        )
        .then(response => {
          // START=> COMMIT with data received'
          commit('SET_AGGREGATORS_ALL_MOVED_TO_SCRAP_DATA', response.data.data);
          // END=> COMMIT with data received'
        });
    };

      /* END AGGREGATORS STATIC CODE */

      /*Aggregators API */
  

    
  // /*START >> Module>> all FINANCE APPROVED tracker*/https://qaapp.bijlipay.co.in:8085/api/central-inventory-get-device-by-status/3
  // export const FETCH_ALL_MOVED_TO_SCRAP_DATA = ({ commit }, request) => {
  //   console.log("|REQUEST : " + request)
  //   // if (request.pagination.sortBy == null) {
  //     return api
  //      .get(
  //        'central-inventory-get-device-by-status/4', request)
  //       //  ?page=' +
  //       //  request.pagination.page +
  //       //  '&size=' +
  //       //  request.pagination.rowsPerPage 
  //        // +
  //        //  "&search=" +
  //        //  request.filter 
       
  //    .then(response => {
  //       // START=> COMMIT with data received'
  //      commit('SET_ALL_MOVED_TO_SCRAP_DATA', response.data.data);
  //        // END=> COMMIT with data received'
  //      })
  // };


