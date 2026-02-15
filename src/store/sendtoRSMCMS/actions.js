import { url } from '@vuelidate/validators';
import api from "../api.js";

export const SEND_TO_RSM_CMS = ({
    commit,
    rootState
}, request) => {
    return api.put
        // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)
        ("pricing-exception-submit-to-cms-rsm/" + request.url.id + "/" + request.params.plan1, request.params)
}
