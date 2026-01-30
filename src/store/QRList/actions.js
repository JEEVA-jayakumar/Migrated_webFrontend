import Vue from 'vue';
import api from "../api.js";

export const FETCH_QR_LIST = ({
    commit
}, request) => {
    return api.get("qr-information").then(response => {
        commit("SET_ALL_QR_LIST", response.data.data.qrTrackers);
    });

}
export const FETCH_QR_LIST1 = ({
    commit
}, request) => {
    return api.get("qr-information").then(response => {
        commit("SET_ALL_QR_LIST1", response.data.data);
    });

}