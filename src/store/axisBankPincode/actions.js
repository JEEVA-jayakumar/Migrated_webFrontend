import api from "../api.js";

export const FETCH_AXIS_BANK_PINCODE_LOCATION = ({
    commit,
    rootState
}, request) => {
    return api
        .get(rootState.GlobalVariables.STATE_AXIS_API + 'Pincode/' + request)
        .then(response => {
            let axisBankPincode = [];
            response.data.data.map(function (value, key) {
                axisBankPincode.push({
                    label: value,
                    value: value,

                });
            });
            commit("SET_ALL_AXIS_BANK_PINCODE_LOCATION", axisBankPincode)
        })
}


