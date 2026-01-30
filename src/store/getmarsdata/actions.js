import Vue from 'vue';
import api from "../api.js";

export const FETCH_MARS_DATA = ({
    commit
}, request) => {
    return api.get("get-mars-data-information/" + request).then(response => {
        commit("SET_ALL_MARS_DATA", response.data.data);
    });

}
export const IMPLEMENTED_QUEUE = ({
    commit
}, request) => {
    return api.get("merchant-tracker-implemented-list/sat/" + request).then(response => {
        commit("SET_IMPLEMENTED_QUEUE", response.data.data);
    });

}

export const MIDBASEDLIST = ({
    commit
}, request) => {
    return api.get("get-tid-listbyMid?mid=" + request).then(response => {
        commit("SET_MID_QUEUE", response.data.data);
    });

}

MIDBASEDLIST