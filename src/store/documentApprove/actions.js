import Vue from 'vue';
import api from "../api.js";


export const DOCUMENT_APPROVE = ({ commit }, request) => {
    return api.put(
        "implementation-Validation/" + request + "/2"

    );
};
export const DOCUMENT_REJECT = ({ commit }, request) => {
    return api.put(
        "implementation-Validation/" + request.data.data + "/3/" + request.url.reason
    );
};


