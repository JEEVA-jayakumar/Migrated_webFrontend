import api from "../api.js";

export const SALES_PERSON_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return api
    // .get(rootState.GlobalVariables.STATE_MARS_API + 'sales-person?institutionCode=' + request)
    .get(rootState.GlobalVariables.STATE_MARS_API_URL + 'sales-person?institutionCode=' + request)
    .then(response => {
      console.log('Salesperson', response)
      commit("SET_SALES_PERSON_FROM_MARS", response.data);
    })
}

export const QR_SALES_PERSON_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  return api
    // .get(rootState.GlobalVariables.STATE_MARS_API + 'sales-person?institutionCode=' + request)
    .get(rootState.GlobalVariables.STATE_MARS_API_URL + 'sales-person?institutionCode=' + request)
    .then(response => {
      console.log('Salesperson', response)
      commit("SET_QR_SALES_PERSON_FROM_MARS", response.data.items);
    })
}
