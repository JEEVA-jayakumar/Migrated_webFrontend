import api from "../api.js";
import Vue from "vue";
// export const LEAD_BASED_RENTAL = ({
//     commit
// }, request) => {
//     console.log("ACTION LEAD_BASED_RENTAL -------->",JSON.stringify(request))
//     return Vue.http.get("https://qaapp.bijlipay.co.in:8085/staticApi/plan-and-deivce-list-based-on-lead-source/" + request).then(response => {
//         let rental = [];
//         response.data.data.plan.map(function (value, key) {
//             rental.push({
//                 label: value.planName,
//                 value: value,

//             });
//         });
//         commit("LEAD_SOURCE_BASED_RENTAL", rental);
//     });
// };
export const LEAD_AND_DEVICE_BASED_RENTAL1 = ({
    commit
}, request) => {
    console.log("ACTION LEAD_AND_DEVICE_BASED_RENTAL 124345 -------->",JSON.stringify(request))
    // let leadSource = JSON.parse(request.leadSource);
    // let device = JSON.parse(request.device);
    return Vue.http.get("https://qaapp.bijlipay.co.in:8085/staticApi/plan-and-deivce-list-based-on-lead-source/" + request.leadSource+"/"+request.device).then(response => {
        let rental = [];
        response.data.data.plan.map(function (value, key) {
            rental.push({
                label: value.planName,
                value: value,

            });
        });
        commit("LEAD_SOURCE_BASED_RENTAL", rental);
    });
};

export const LEAD_AND_DEVICE_BASED_RENTAL = ({
    commit
}, request) => {
    console.log("ACTION LEAD_AND_DEVICE_BASED_RENTAL 124345 -------->",JSON.stringify(request))
    // let leadSource = JSON.parse(request.leadSource);
    // let device = JSON.parse(request.device);
    return Vue.http.get("https://qaapp.bijlipay.co.in:8085/staticApi/plan-and-deivce-list-based-on-lead-source/" + request.leadSource.id+"/"+request.device.id).then(response => {
        let rental = [];
        response.data.data.plan.map(function (value, key) {
            rental.push({
                label: value.planName,
                value: value,

            });
        });
        commit("LEAD_SOURCE_BASED_RENTAL", rental);
    });
};

