import api from "../api.js";
export const FETCH_ALL_MATM_DATAS = ({
    commit
}, request) => {
    return api.get("get-m-atm-plan", request).then(response => {
        commit("SET_ALL_MATM_DATAS", response.data.data);
    });
},

FETCH_ALL_MATM_PLAN_DETAILS = ({
    commit
}, request) => {
    return api.get("get-m-atm-plan", request).then(response => {
        commit("SET_ALL_MATM_PLAN_DETAILS", response.data.data);
    });
};