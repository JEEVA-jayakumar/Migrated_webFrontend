
import api from "../api.js";

export const FETCH_AGGREGATOR_INVENTORY_WITH_SO = ({
    commit
}, request) => {
    return api.get("aggregator-inventory/agg-all-so-inventory-details/" + request.aggregator.id +"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])).then(response => {
        commit("SET_AGGREGATOR_ALL_INVENTORY_WITH_SO_LIST", response.data.data);
    });
}
export const FETCH_INVENTORY_WITH_SO_BASED_ON_REGION = ({
    commit
}, request) => {
    console.log("RESPONSE DATAS--------------->"+request)
    return api.get("allsoinventorydetails/" + request).then(response => {
        commit("SET_ALL_INVENTORY_WITH_SO_LIST_BASED_REGION", response.data.data);
    });

}
