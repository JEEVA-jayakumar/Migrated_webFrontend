import Vue from 'vue';
import api from "../api.js";
export const FETCH_POD_LIST = ({
    commit
  }, request) => {
     let sorting = request.pagination.descending ? 'asc' : 'desc';
    return api
      .get(
        'pod-list?page=' +
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
        commit('SET_ALL_POD_LIST', response.data.data);
        // END=> COMMIT with data received'
      });
  };

// export const FETCH_POD_LIST = ({
//     commit
// }, request) => {
//     return api.get("pod").then(response => {
//         commit("SET_ALL_POD_LIST", response.data.data);
//     });

// }