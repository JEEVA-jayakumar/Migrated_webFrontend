
import api from "../api.js";

export const GET_LS_VAS_HOST_INSTANCE_DETAILS = ({
    commit
  }, request) => {
    return api.get("ls-host-instance-mapping").then(response => {
        console.log("response GET_HOST_DETAILS -------->",JSON.stringify(response.data.data))
        commit("SET_LS_VAS_HOST_INSTANCE_DETAILS", response.data.data);
       
      });
  };
  export const CREATE_LS_VAS_HOST_INSTANCE_DETAILS = ({
    commit
  }, request) => {
    return api.post("ls-host-instance-mapping",request);
  };