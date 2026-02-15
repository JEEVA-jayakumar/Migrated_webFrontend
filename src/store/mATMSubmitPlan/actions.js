import { url } from '@vuelidate/validators';
import api from "../api.js";

export const MATM_SUBMIT_PLAN_DETAILS = ({
  commit,
  rootState
}, request) => {
  return api
  .post('m-atm-plan-details/' + request.url.leadSource + "/" + request.url.device , request.params)
}
