import api from "../api.js";
export const DEVICE_LIST_BASED_ON_LEAD_SOURCE = ({ commit }, request) => {
    return api
        .get("device-list-based-on-lead-source/" + request)
        .then(response => {
            let data = {
                apiStatusCode: response.status,
                apiPending: false,
                apiSuccess: true,
                apiData: response.data.data
            };
            commit("API_RESPONSE_LOG", data);
            // START=> COMMIT with data received'
            commit("SET_DEVICE_LIST_BASED_ON_LEAD_SOURCE", response.data.data);
            // END=> COMMIT with data received'
        })
}

