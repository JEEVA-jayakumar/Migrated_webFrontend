
import api from "../api.js";

export const FETCH_INVENTORY_WITH_RESELLAR = ({
    commit
}, request) => {
    return api.get("allresellerinventorydetails").then(response => {
        commit("SET_ALL_INVENTORY_WITH_RESELLAR_LIST", response.data.data);
    });

}