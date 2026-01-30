import api from "../api.js";


export const APP_MERCHANT_DOCUMENT_TYPE = ({
  commit
}, request) => {
  return api.get("manage/data/merchant-types", request).then(response => {
    commit("SET_APP_MERCHANT_DOCUMENT_TYPE", response.data.data);
  });
};
export const SO_RENTAL_PLAN = ({
  commit
}, request) => {
  return api.get("parameters/rental-plan?institutionCode=101", request).then(response => {
    commit("SET_SO_RENTAL_PLAN", response.data.items);
  });
};
