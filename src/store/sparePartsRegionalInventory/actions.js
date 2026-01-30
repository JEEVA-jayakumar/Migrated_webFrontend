import api from "../api.js";
export const FETCH_ALL_SPARE_PARTS_REGIONAL_INVENTORY_DATAS= ({ commit }, request) => {
    console.log("ACTION REQUEST DATAS------->",request)
    return api.post(
        "spare-pod/allocateSo/"+request.regionId +"/"+request.userId,
        request.request
    );
};