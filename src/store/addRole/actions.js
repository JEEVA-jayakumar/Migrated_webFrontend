import api from "../api.js";
export const UPDATE_ROLE_DATA = ({ commit }, request) => {
        return api
            .post("role", request)
            .then(response => {
                console.log(response)
        })
    }

