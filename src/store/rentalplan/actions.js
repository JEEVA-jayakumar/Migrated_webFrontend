import { url } from '@vuelidate/validators';
import api from "../api.js";

export const RENTAL_PLAN = ({
  commit,
  rootState
}, request) => {
  return api
    .post('manage/data/rental-plan-details/' + request.url.leadSource + "/" + request.url.device + "/" + request.url.plan, request.params)
}
