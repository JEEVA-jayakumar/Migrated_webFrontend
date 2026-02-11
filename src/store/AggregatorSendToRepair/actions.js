import { or } from '@vuelidate/validators';
import api from '../api.js';
export const FETCH_PHONEPE_SEND_TO_REPAIR_DETAILS = ({
  commit
}, request) => {
  if (request.pagination.sortBy == null) {
    return api
      .get(
        "central-devices-sent-for-repair?page=" +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&search=" +
        request.filter
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit("SET_PHONEPE_SEND_TO_REPAIR_DATA", response.data.data);
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
        commit('SET_PHONEPE_SEND_TO_REPAIR_DATA', response.data.data);
        // END=> COMMIT with data received'
      });
  }
  
};

export const APPROVE_PHONEPE_SEND_TO_REPAIR = ({ commit }, request) => {
  console.log("|REQUEST : " +JSON.stringify(request))

    return api
      .post("aggregator-inventory/agg-central-faulty-device-accept-or-move-to-scrap/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/1", request)
      .then(response => {
        console.log(response);
        let data = {
          apiStatusCode: response.status,
          apiPending: false,
          apiSuccess: true,
          apiData: response.data.data,
        };
        commit("API_PHONEPE_RESPONSE_LOG", data);
      });
  };

  export const PHONEPE_MOVED_TO_SCRAP_DATAS = ({ commit }, request) => {
    console.log("|REQUEST : " + request)
    return api
      .post("aggregator-inventory/agg-central-faulty-device-accept-or-move-to-scrap/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/2",request)
      .then(response => {
        console.log(response);
        let data = {
          apiStatusCode: response.status,
          apiPending: false,
          apiSuccess: true,
          apiData: response.data.data
        };
        commit("API_PHONEPE_RESPONSE_LOG", data);
      });
  };

    export const FETCH_ALL_MOVED_TO_SCRAP_DATA = ({
      commit
    }, request) => {
       let sorting = request.pagination.descending ? 'desc' : 'asc';
      return api
        .get(
          'central-inventory-get-device-by-status/4?page=' +
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
          commit('SET_PHONEPE_ALL_MOVED_TO_SCRAP_DATA', response.data.data);
          // END=> COMMIT with data received'
        });
    };
  

