import api from "../api.js";

export const FETCH_INSTANCE = ({
  commit,
  rootState
}, request) => {
  return api
    .get( "vas-mapping/get-vas-instance-mapping/"+ request.code +"/"+request.device   
    ) 
    .then(response => {
      console.log(response);
      commit("SET_INSTANCE", response.data.data);
      return response
    })
}
