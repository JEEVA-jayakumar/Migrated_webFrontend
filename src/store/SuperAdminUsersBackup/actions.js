import api from "../api.js";

/* 
() to fetch all user data
*/
const FETCH_ALL_USERS_DATA = ({ commit }, request) => {
  return api
    .get("user")
    .then(response => {
      console.log("All users data fetched", response.data.data);
      commit("SET_ALL_USERS_DATA", response.data.data);
    })
    .catch(
      error =>
        console.log("API_FAILURE", error) /* commit('API_FAILURE', error) */
    );
};

// /*
// () to fetch all roles
// */
const FETCH_ALL_ROLES_DATA = ({ commit }, request) => {
  return api
    .get("role")
    .then(response => {
      // commit("API_SUCCESS", true);

      // START=> Structuring response like 'label' => 'value'
      let filterRoles = [];
      response.data.data.map(function(value, key) {
        filterRoles.push({
          label: value.role,
          value: value.id
        });
      });
      console.log("Action >> SET_ALL_ROLES_DATA >>", filterRoles);
      // END=> Structuring response like 'label' => 'value'
      commit("SET_ALL_ROLES_DATA", filterRoles);
    })
    .catch(error => console.log("failure"));
};

export default {
  FETCH_ALL_USERS_DATA,
  FETCH_ALL_ROLES_DATA
};
