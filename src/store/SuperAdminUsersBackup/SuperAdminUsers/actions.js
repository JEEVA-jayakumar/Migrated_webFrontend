import api from "../api.js";

/* 
() to fetch all user data
*/
export  const FETCH_ALL_USERS_DATA = ({ commit }, request) => {
  return api
    .get("user")
    .then(response => {
      commit("SET_ALL_USERS_DATA", response.data.data);
    })
    .catch(
      error =>
        console.log("API_FAILURE", error) /* commit('API_FAILURE', error) */
    );
};

// export default {
//   FETCH_ALL_USERS_DATA
// };
