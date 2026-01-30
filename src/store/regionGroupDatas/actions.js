import api from "../api.js";

export const FETCH_REGION_GROUP_DATAS = ({
  commit
}, request) => {

  return api
  .get(
    "region-group")  
  .then(response => {
    // START=> COMMIT with data received'
    commit("SET_REGION_GROUP_DATAS", response.data.data);
    return response;
    // END=> COMMIT with data received'
  });
};

export const CREATE_NEW_REGION_GROUP = (
  { commit },
  request
) => {
  console.log("ACTIVE request DATAS------------->",JSON.stringify(request)) 
  return api.post("region-group",request);
};

export const UPDATE_REGION_GROUP_DATAS = (
  { commit },
  request
) => {
  console.log("UPDATE_REGION_GROUP_DATAS ACTIVE request DATAS------------->",JSON.stringify(request)) 
  return api.put("region-group/"+request.request.id,request.request);
};

export const ACTIVE_REGION_GROUP_DATAS = (
  { commit },
  request
) => {
  console.log("ACTIVE request DATAS------------->",JSON.stringify(request)) 
  return api.put("region-group/"+request.id,request);
};

export const DELETE_REGION_GROUP_DATAS = (
  { commit },
  request
) => {
  console.log("Delete request DATAS------------->",JSON.stringify(request)) 
  return api.delete("region-group/"+request.id);
};


