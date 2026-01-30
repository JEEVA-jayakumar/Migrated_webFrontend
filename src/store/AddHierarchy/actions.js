import api from "../api.js";
export const SAVE_HIERARCHY = ({ commit }, request) => {
    return api
   .post("hierarchy/", request)
   .then(response => {
    let data = {
        apiStatusCode: response.status,
        apiPending: false,
        apiSuccess: true,
        apiData: response.data.data
      };
      commit("API_RESPONSE_LOG", data);
      return response.data.data;
  })
  };

  export const DELETE_HIERARCHY = (
    { commit },
    request
  ) => {
    console.log("DISABLE request DATAS------------->",JSON.stringify(request)) 
    return api.delete("hierarchy/" + request.value);
  };

  export const ACTIVE_HIERARCHY = (
    { commit },
    request
  ) => {
    console.log("ACTIVE request DATAS------------->",JSON.stringify(request)) 
    return api.put("hierarchy/" + request.id ,request);
  };
