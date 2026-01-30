import api from "../api.js";
import Vue from "vue";
export const CREATE_QR_CODE = ({
    commit,
    rootState
}, request) => {
    return api.get
        // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)
        ("qr-implementatiion/" + request.url.leadSource + "/" + request.url.count)
}
