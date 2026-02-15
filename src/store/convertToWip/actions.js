import { url } from '@vuelidate/validators';
import api from "../api.js";

export const CONVERT_TO_WIP = ({
  commit,
  rootState
}, request) => {
  return api
    .put(rootState.GlobalVariables.STATE_APP_API + 'convert-wip-lead/' + request.url.id, request.data1)
    .then(response => {
      console.log(response);

    })
};
