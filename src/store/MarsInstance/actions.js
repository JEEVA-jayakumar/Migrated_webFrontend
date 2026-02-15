import api from "../api.js";

export const GET_MARS_INSTITUTION_DETAILS = ({
    commit
  }, request) => {
    return api.get("mars-institution").then(response => {
        console.log("response GET_HOST_DETAILS -------->",JSON.stringify(response.data.data))
        commit("SET_MARS_INSTITUTION_DETAILS", response.data.data);
       
      });
  };

  export const ADD_NEW_INSTANCE = ({
    commit
  }, request) => {
    return api.post("mars-institution", request);
  };

  export const UPDATE_INSTANCE = ({
    commit
  }, request) => {
    
    return api.put("mars-institution/"+ request.id, request);
  };
  export const DELETE_INSTANCE = ({
    commit
  }, request) => {
      
    return api.delete("mars-institution/" + request);
  };