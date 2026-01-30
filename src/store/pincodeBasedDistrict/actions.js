import api from "../api.js";
import Vue from "vue";
export const FETCH_AXIS_BANK_PINCODE_BASED_DISTRICT = ({
    commit,
    rootState
}, request) => {
    return Vue.http
        .get(rootState.GlobalVariables.STATE_AXIS_API + 'axisPincode/' + request)
        .then(response => {
            console.log("hellow" + response)
            let axisBank = [];
            response.data.data.map(function (value, key) {
                axisBank.push({
                    label: value,
                    value: value,
                });
            });
            commit("SET_ALL_AXIS_BANK_PINCODE_BASED_DISTRICT", axisBank)
        })
}
