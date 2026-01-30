export const SET_SAT_DASHBOARD_COUNT = (state, payload) => {
  state.satDashboard = payload;
};
// SET_AGGREGATORS_DASHBOARD_COUNT
export const SET_AGGREGATORS_DASHBOARD_COUNT = (state, payload) => {
  state.AggregatorssatDashboard = payload;
};
export const SET_SAT_AGING_TRACKER_DATA = (state, payload) => {
  state.satAgingTrackerData = payload;
};
export const SET_SAT_AGING_TRACKER_LEADS_DATA = (state, payload) => {
  state.satAgingTrackerLeadsData = payload;
};
export const SET_SAT_DASHBOARD_CHART_DATA = (state, payload) => {
  state.satDashboardGraphData = payload;
};
export const SET_SAT_DASHBOARD_AGING_CHART_DATA = (state, payload) => {
  state.satDashboardAgingGraphData = payload;
};
