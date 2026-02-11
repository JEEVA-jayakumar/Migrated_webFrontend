import { not, or } from '@vuelidate/validators';
import api from "../api.js";
export const LEAD_SOURCE_ACTIVE_DEACTIVE_LIST = ({
    commit
}, request) => {
    return api.get("getAllInstance", request).then(response => {
        commit("SET_LEAD_SOURCE_ACTIVE_DEACTIVE_LIST", response.data.data);
    });
};
export const LEAD_SOURCE_ACTIVE_DEACTIVE_LIST1 = ({
    commit
}, request) => {
    return api.get("lead-source-basedon-active-or-not/1", request).then(response => {
        commit("SET_LEAD_SOURCE_ACTIVE_DEACTIVE_LIST", response.data.data);
    });
};
export const LEAD_SOURCE_DEACTIVE_LIST = ({
    commit
}, request) => {
    return api.get("lead-source-basedon-active-or-not/0", request).then(response => {
        commit("DEACTIVE_LIST", response.data.data);
    });
};
export const EDIT_LEAD_SOURCE = ({
    commit,
    rootState
}, request) => {
    return api.put(
        "lead-source-update/" + request.lead.leadId + "/1")
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

};
export const DELETE_LEAD_SOURCE = ({
    commit,
    rootState
}, request) => {
    return api.put(
        "lead-source-update/" + request + "/0")
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

}
