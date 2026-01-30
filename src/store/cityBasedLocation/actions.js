import api from "../api.js";
import Vue from "vue";
export const FETCH_AXIS_BANK_CITY_LOCATION = ({
    commit,
    rootState
}, request) => {
    return Vue.http
        .get(rootState.GlobalVariables.STATE_AXIS_API + 'axisCityName/' + request)
        .then(response => {
            console.log("hellow" + response)
            let axisBank = [];
            response.data.data.map(function (value, key) {
                axisBank.push({
                    label: value.locationName,
                    value: value.locationName,

                });
            });
            commit("SET_ALL_AXIS_BANK_CITY_BASED_DISTRICT", axisBank)
        })
}