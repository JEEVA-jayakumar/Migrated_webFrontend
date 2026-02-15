import api from "../api.js";

export const CREATE_LS_VAS_DEVICE_CONFIG = ({
    commit
  }, request) => {
    return api.post("ls-vas-mapping", request);
  };

  export const GET_LS_VAS_DEVICE_CONFIG_DETAILS = ({
    commit
  }, request) => {
    return api.get("ls-vas-mapping").then(response => {
        console.log("response GET_HOST_DETAILS -------->",JSON.stringify(response.data.data))
        commit("SET_LS_VAS_DEVICE_CONFIG_DETAILS", response.data.data);
        return response
       
      });
  };

  export const GET_LS_AND_DEVICE_BASED_VAS_DETAILS = ({
    commit
  }, request) => {
    return api.get("ls-vas-mapping/"+request.leadSource+"/"+request.device).then(response => {
        console.log("response GET_HOST_DETAILS -------->",JSON.stringify(response.data.data))
        commit("SET_LS_AND_DEVICE_BASED_VAS_DETAILS", response.data.data);
        return response
       
      });
  };

  export const UPDATE_LS_VAS_DEVICE_CONFIG_DETAILS = ({
    commit
  }, request) => {
    console.log("UPDATE_LS_VAS_DEVICE_CONFIG_DETAILS ------>",JSON.stringify(request))
    return api.put("ls-vas-mapping", request);
  };