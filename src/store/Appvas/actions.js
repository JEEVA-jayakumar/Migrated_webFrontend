import { api } from '../../boot/axios';

export  const FETCH_VAS_DATAS = ({ commit }, request) => {
  return api
  .get("vas-mapping/get-vas-device-mapping"+"/"+request)
  .then(response => {
    console.log(response);
    commit("SET_VAS_DATAS", response.data);
    return response
  })
    .catch(
      error =>
        console.log("API_FAILURE", error) /* commit('API_FAILURE', error) */
    );
};

  