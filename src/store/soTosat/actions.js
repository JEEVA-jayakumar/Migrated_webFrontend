import { url } from '@vuelidate/validators';
import api from "../api.js";

export const SO_TO_SAT = ({
  commit,
  rootState
}, request) => {
  return api
    .put(rootState.GlobalVariables.STATE_APP_API + 'store-full-lead-information/' + request.url.id + "/" + request.url.action, request.data1)
    // console.log("VALUES------>"+request.data1);
    .then(response => {
      console.log(response);
      // console.log("VALUES------>"+JSON.stringify(request.data1));
    })
};
