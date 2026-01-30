import api from '../api.js';
export const FETCH_INVENTORY_WITH_REGION_DATAS= ({
  commit
}, request) => {
  return api
    .get("device-list-based-on-regional-device" + "/"+request.regionId + "/4")
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_INVENTORY_WITH_REGION_DATAS', response.data.data);
      // END=> COMMIT with data received'
    });
};

/* AGGREGATOR API */
 
export const FETCH_AGGREGATORS_INVENTORY_WITH_REGION_DATAS= ({
  commit
}, request) => {
  console.log("FETCH_AGGREGATORS_INVENTORY_WITH_REGION_DATAS ---->",JSON.stringify(request))
  return api
    .get("aggregator-inventory/agg-device-list-based-on-regional-device" + "/"+request.regionId + "/4" +"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]))
    .then(response => {
      // START=> COMMIT with data received'
      commit('SET_AGGREGATORS_INVENTORY_WITH_REGION_DATAS', response.data.data);
      // END=> COMMIT with data received'
    });
};

/* AGGREGATOR API */

export const EDIT_INVENTORY_WITH_REGION_DETAILS = ({
}, request) => {
  return api.put
      // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)https://qaapp.bijlipay.co.in:8085/swagger-ui.html#/operations/sat-dashboard-controller/updateRiUsingPUT
      ("update-regional-inventory/4",request.request)
};

/*AGGREGATORS API */
export const EDIT_AGGREGATORS_INVENTORY_WITH_REGION_DETAILS = ({
}, request) => {
  return api.put
      // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)https://qaapp.bijlipay.co.in:8085/swagger-ui.html#/operations/sat-dashboard-controller/updateRiUsingPUT
      ("aggregator-inventory/agg-update-regional-inventory/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/4",request.request)
}
/*AGGREGATORS API */
