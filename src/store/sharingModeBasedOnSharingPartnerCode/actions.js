import api from "../api.js";
import Vue from "vue";
export const FETCH_SHARING_MODEL_BASED_SHARING_PARTNER_CODE = ({
  commit,
  rootState
}, request) => {
  return Vue.http
    .get(rootState.GlobalVariables.STATE_MARS_API + "sharing-partner/" + request)
    .then(response => {
      let sharingModeBasedSharingPartner = [];
      if (JSON.stringify(response.body) != JSON.stringify({})) {
        response.data.items.map(function (value, key) {
          console.log("FETCH_SHARING_MODEL_BASED_SHARING_PARTNER_CODE response.data.items ----->",JSON.stringify(value))
          sharingModeBasedSharingPartner.push({
            label: value.name,
            value: value.code,
  
          });
        });
      }
      commit("SET_ALL_SHARINGMODE_BASED_SHARINGPARTNER", sharingModeBasedSharingPartner)
    })
};
