import api from "../api.js";


export const ADD_NEW_PREFIX = ({
    commit
  }, request) => {
    return api.post("lead-source-prefix-conf", request);
  };
  export const GET_PREFIX_DETAILS = ({
    commit
  }, request) => {
    return api.get("lead-source-prefix-conf").then(response => {
        console.log("response GET_HOST_DETAILS -------->",JSON.stringify(response.data.data))
        commit("SET_PREFIX_DETAILS", response.data.data);
       
      });
  };