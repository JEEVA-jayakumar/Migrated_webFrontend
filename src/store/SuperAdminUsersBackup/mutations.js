import { and } from '@vuelidate/validators';
/* 
START
Common mutation functions for API 
request and response 
*/
// const API_PENDING = (state, payload) => {
//   state.apiPending = payload;
// };

// const API_SUCCESS = (state, payload) => {
//   state.apiSuccess = payload;
// };

// const API_FAILURE = (state, payload) => {
//   state.apiFailure = payload;
// };
/* 
END
Common mutation functions for API 
request and response 
*/

/* 
===================================Other primary functions=================================
*/

/* 
() to fetch all users data
*/
const SET_ALL_USERS_DATA = (state, payload) => {
  state.allUserData = payload;
};

// /*
// () to fetch all roles
// */
const SET_ALL_ROLES_DATA = (state, payload) => {
  console.log(
    "Mutation >> SET_ALL_ROLES_DATA >> Before >>",
    state.allRolesData
  );
  state.allRolesData = payload;
  console.log("Mutation >> SET_ALL_ROLES_DATA >> After >>", state.allRolesData);
};

export default {
  // API_PENDING,
  // API_SUCCESS,
  // API_FAILURE,
  SET_ALL_USERS_DATA,
  SET_ALL_ROLES_DATA
};
