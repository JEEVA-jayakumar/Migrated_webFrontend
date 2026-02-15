
import VueResource from 'vue-resource';
import api from "../api.js";
;
export const DEVICE_MODEL_MARS = ({
    commit,rootState
}, request) => {
    console.log("DEVICE_MODEL_MARS-----------", request)
    let headers = {
        'Authorization': request
    };
    console.log("HEADERS_TOKEN_DETAILS-----------", {headers: headers})
    return api.get("https://qaapp.bijlipay.co.in:8085/api/deviceModel?NII=101", {headers: headers})
        .then(response => {
            console.log("SEND DEVICE MODEL MARS-----------",JSON.stringify(response))
            // commit('SET_DEVICE_MODEL_MARS', response.data);
            return response
          });
}
export const CITY_MARS = ({
    commit,rootState
}, request) => {
    console.log("CITY_MARS-----------", request)
    let headers = {
        'Authorization': request
    };
    console.log("HEADERS_TOKEN_DETAILS-----------", {headers: headers})
    return api.get("https://qaapp.bijlipay.co.in:8085/api/city", {headers: headers})
        .then(response => {
            console.log("SEND CITY MARS-----------",JSON.stringify(response))
            // commit('SET_CITY_MARS', response.data);
            return response
          });
}

export const REGION_MARS = ({ 
    commit,rootState 
}, request) => {
    console.log("REGION_MARS-----------", request)
    let headers = {
        'Authorization': request
    };
    console.log("HEADERS_TOKEN_DETAILS-----------", {headers: headers})
    return api.get("https://qaapp.bijlipay.co.in:8085/api/marsregion", {headers: headers})
        .then(response => {
            console.log("SEND REGION MARS-----------",JSON.stringify(response))
            // commit('SET_REGION_MARS', response.data);
            return response
          });
}

export const RENTAL_PLAN_MARS = ({
    commit,rootState
}, request) => {
    console.log("RENTAL_PLAN_MARS_REQUEST-----------", request)
    let headers = {
        'NII': '101'
    };
    console.log("HEADERS_TOKEN_DETAILS-----------", {headers: headers})
    return api.get("https://mars01.bijlipay.co.in:9090/v1/parameters/rental-plan?institutionCode=101", {headers: headers})
        .then(response => {
            console.log("SEND RENTAL PLAN MARS-----------",JSON.stringify(response))
            // commit('SET_RENTAL_PLAN_MARS', response.data);
            return response
          });
}

export const LEAD_FORM_MARS = ({
    commit,rootState
}, request) => {
    console.log("LEAD_FORM_MARS-----------", request)
    let headers = {
        'Authorization': request
    };
    console.log("HEADERS_TOKEN_DETAILS-----------", {headers: headers})
    return api.get("https://qaapp.bijlipay.co.in:8085/api/leadFrom", {headers: headers})
        .then(response => {
            console.log("SEND LEAD FORM MARS-----------",JSON.stringify(response))
            // commit('SET_LEAD_FORM_MARS', response.data);
            return response
          });
}
export const STATE_MARS = ({
    commit,rootState
}, request) => {
    console.log("STATE_MARS-----------", request)
    let headers = {
        'Authorization': request
    };
    console.log("HEADERS_TOKEN_DETAILS-----------", {headers: headers})
    return api.get("https://qaapp.bijlipay.co.in:8085/api/state", {headers: headers})
        .then(response => {
            console.log("SEND STATE MARS-----------",JSON.stringify(response))
            // commit('SET_STATE_MARS', response.data);
            return response
          });
        }
