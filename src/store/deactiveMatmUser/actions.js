import Vue from 'vue';
import api from "../api.js";
export const DEACTIVATE_MATM_USER_DETAILS = ({
    commit
}, request) => {
    return api
        .delete("delete-m-atm-plan/"+ request)
        .then(response => {
            console.log(response)

        })
}