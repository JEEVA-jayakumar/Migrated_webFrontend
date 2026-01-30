import api from "../api.js";
export const FETCH_DASHBOARD_COUNT = ({ commit }, request) => {
  return api.get("sat-dashboard/" + request).then(response => {
    commit("SET_SAT_DASHBOARD_COUNT", response.data.data);
  });
};
 /*AGGREGATORS API */

 /* START AGGREGATORS DYNAMIC CODE */

// export const FETCH_AGGREGATORS_DASHBOARD_COUNT = ({ commit }, request) => {
//   console.log("FETCH_AGGREGATORS_DASHBOARD_COUNT ----->",JSON.stringify(request))
//   return api.get("aggregator-inventory/agg-sat-dashboard/" + request.region +"/"+request.aggregator.id).then(response => {
//     commit("SET_AGGREGATORS_DASHBOARD_COUNT", response.data.data);
//   });
// };

 /* END AGGREGATORS DYNAMIC CODE */

  /* START AGGREGATORS STATIC CODE */
  export const FETCH_AGGREGATORS_DASHBOARD_COUNT = ({ commit }, request) => {
    console.log("FETCH_AGGREGATORS_DASHBOARD_COUNT ----->",JSON.stringify(request))
    return api.get("aggregator-inventory/agg-sat-dashboard/" + request.region +"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])).then(response => {
      commit("SET_AGGREGATORS_DASHBOARD_COUNT", response.data.data);
    });
  };

   /* END AGGREGATORS STATIC CODE */

 /*AGGREGATORS API */
export const FETCH_SAT_AGING_TRACKER_DATA = ({ commit }, request) => {
  return api.get("aging-tracker/" + request).then(response => {
    commit("SET_SAT_AGING_TRACKER_DATA", response.data.data);
  });
};
export const FETCH_SAT_AGING_TRACKER_LEADS_DATA = ({ commit }, request) => {
  return api
    .put(
      "aging-tracker-lead-list?page=" +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&search=" +
        request.filter,
      request.leadIdList
    )
    .then(response => {
      commit("SET_SAT_AGING_TRACKER_LEADS_DATA", response.data.data);
    });
};
export const FETCH_DASHBOARD_CHART_DATA = ({ commit }, request) => {
  return api
    .get(
      "sat-dashboard/lead-graph-data/" + request.region + "/" + request.action
    )
    .then(response => {
      commit("SET_SAT_DASHBOARD_CHART_DATA", response.data.data);
    });
};
export const FETCH_DASHBOARD_AGING_CHART_DATA = ({ commit }, request) => {
  return api
    .get("sat-dashboard/lead-aging-graph-data/" + request.region)
    .then(response => {
      commit("SET_SAT_DASHBOARD_AGING_CHART_DATA", response.data.data);
    });
};
