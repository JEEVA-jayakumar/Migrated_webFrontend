
import api from "../api.js";

export const GET_HOST_DETAILS = ({
    commit
  }, request) => {
    return api.get("master-hosts").then(response => {
        console.log("response GET_HOST_DETAILS -------->",JSON.stringify(response.data.data))
        commit("SET_ALL_HOST_DETAILS", response.data.data);
       
      });
  };

export const ADD_NEW_HOST = ({
    commit
  }, request) => {
    return api.post("master-hosts", request);
  };

export const UPDATE_HOST = ({
    commit
  }, request) => {
    console.log("DELETE_HOST ------>",JSON.stringify(request))
    return api.put("master-hosts/"+request.id, request);
  };
  export const DELETE_HOST = ({
    commit
  }, request) => {
      console.log("DELETE_HOST ------>",JSON.stringify(request))
    return api.delete("master-hosts/" + request);
  };
