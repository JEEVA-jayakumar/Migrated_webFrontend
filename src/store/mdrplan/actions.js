import { url } from '@vuelidate/validators';
import api from "../api.js";

export const MDR_PLAN = ({
  commit,
  rootState
}, request) => {
  return api
    .post('manage/data/mdr-details/' + request.url.leadSource + "/" + request.url.device + "/" + request.url.merchantType, request.params)
}
