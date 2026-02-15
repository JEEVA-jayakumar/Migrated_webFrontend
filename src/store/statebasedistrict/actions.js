import api from "../api.js";

export const FETCH_AXIS_BANK_PINCODE_DISTRICT = ({
    commit,
    rootState
}, request) => {
    return api
        .get(rootState.GlobalVariables.STATE_AXIS_API + 'axisPincodeWithStateName/' + request)
        .then(response => {
            console.log("hellow" + response)
            let axisBank = [];
            response.data.data.map(function (value, key) {
                axisBank.push({
                    label: value.cityName,
                    value: value.cityName,

                });
            });
            commit("SET_ALL_AXIS_BANK_PINCODE_DISTRICT", axisBank)
        })
}