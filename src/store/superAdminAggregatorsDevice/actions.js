import api from "../api.js";
export const CREATE_AGGREGATORS_DEVICE = ({
    commit,
    rootState
}, request) => {
    return api.post(
        "aggregator/createAggregatorDevice", request)
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

};

export const GET_CREATED_AGGREGATORS_DEVICE_LIST = ({
    commit
}, request) => {
    return api.get("aggregator/aggregatorDeviceList", request).then(response => {
        commit("SET_CREATED_AGGREGATORS_DEVICE_LIST", response.data.data);
    });
};


//Active Device List GET_ACTIVE_CREATED_DEVICE_LIST

/* START Aggregators Dynamic Code */

// export const GET_ACTIVE_CREATED_DEVICE_LIST = ({
//     commit
// }, request) => {
//     return api.get("aggregator/deviceList/"+ request).then(response => {
//         commit("SET_GET_ACTIVE_CREATED_DEVICE_LIST", response.data.data);
//     });
// };

/* END Aggregators Dynamic Code */

/* START Aggregators STATIC Code */

export const GET_ACTIVE_CREATED_DEVICE_LIST = ({
    commit
}, request) => {
    return api.get("aggregator/deviceList/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])).then(response => {
        commit("SET_GET_ACTIVE_CREATED_DEVICE_LIST", response.data.data);
    });
};

/* END Aggregators STATIC Code */


export const EDIT_CREATED_AGGREGATORS_DEVICE_LIST = ({
    commit,
    rootState
}, request) => {
    return api.put(
        "aggregator/updateAggregatorDevice/" + request.id, request)
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

};

export const DELETE_CREATED_AGGREGATORS_DEVICE_LIST = ({
    commit,
    rootState
}, request) => {
    return api.delete(
        "aggregator/deleteAggregatorDevice/" + request.id)
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

}
