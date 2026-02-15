import api from "../api.js";

export const CREATE_VAS_DETAILS = ({
    commit
  }, request) => {
    return api.post("vas-list/create-vas",request);
  };

//   vas-list/get-all-vas-lists

export const GET_ALL_VAS_DETAILS = ({
    commit
  }, request) => {
    return api.get("vas-list/get-all-vas-lists").then(response => {
        console.log("response GET_VAS_DETAILS -------->",JSON.stringify(response.data.data))
        commit("SET_ALL_VAS_DETAILS", response.data.data);
       
      });
  };

  export const UPDATE_ALL_VAS_DETAILS = ({
    commit
  }, request) => {
    
    return api.put("vas-list/update-vas", request);
  };