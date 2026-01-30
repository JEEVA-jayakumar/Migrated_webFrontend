import api from '../api.js';
export const AGG_MASTER_TRACKER_LIST_ALL_DATAS = ({
  commit
}, request) => {
  let sorting = request.pagination.descending ? 'asc' : 'desc';
  return api
  //uatapp.bijlipay.co.in:8085/api/aggregator-inventory/agg-master-tracker-list/{aggId}/{fromDate}/{toDate}
    .get(
      'aggregator-inventory/agg-master-tracker-list' +
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
      commit('SET_AGG_MASTER_TRACKER_LIST_ALL_DATAS', response.data.data);
    });
};

