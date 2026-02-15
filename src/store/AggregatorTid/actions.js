import { url } from '@vuelidate/validators';
import api from "../api.js";

export const FETCH_AGGREGATOR_TID = ({
    commit,
    rootState
  }, request) => {
    return api.get("getTid/" + request)
    .then(response => {
        console.log("data",response)
        // console.log(response)
        let tid = [];
        response.data.data.map(function (value, key) {
          tid.push({
            label: value.tid,
            value: value.tid,
          });
        });
        // END=> Structuring response like 'label' => 'value'
  
        // START=> COMMIT with data received'
        commit("SET_AGGREGATOR_TID", tid);
      })
  
  }
  export const FETCH_AGGREGATOR_TID_SERIAL_NUMBER = ({
    commit,
    rootState
  }, request) => {
    return api.get("aggregator-inventory/get-aggregator-serialNo/" + request.url.tid)
//     .then(response => {
//         console.log("data",response)
//         // console.log(response)

  
//   })
}
export const UPDATE_AGGREGATOR_SERIAL_NUMBER = ({
  commit,
  rootState
}, request) => {
  return api.post("aggregator-inventory/agg-update-device-serialNo/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/" + request.url.tid +"/" +request.url.newSerialNumber)
//     .then(response => {
//         console.log("data",response)
//         // console.log(response)


//   })
}
