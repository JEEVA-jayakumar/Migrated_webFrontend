import api from "./api.js";

/* START >> Store modules => Super Admin Users */
const SuperAdminUsers = {
  namespaced: true,

  /* ===================================
  >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> State setup goes here */
  state: {
    allDashboardCountsData: [],
    editUserExistingItems: [],
    allStatesData: [],
    apiStatusLog: {
      apiStatusCode: null,
      apiPending: false,
      apiSuccess: false,
      apiFailure: false,
      apiData: []
    },
    /*START >> Module>> USERS*/
    allUserData: [],
    allRolesData: [],
    allHierarchiesData: [],
    /*END >> Module>> USERS*/

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Roles and Permission*/
    rolesPermissionData: [],
    filterPermissionData: []
    /*END >> Module>> Roles and Permission*/
  },
  /*END << State setup goes here */

  /* ===================================
  >>>>>>>>>>>>>>>>MUTATIONS<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> Mutation actions goes here */
  mutations: {
    API_RESPONSE_LOG(state, payload) {
      console.log("API_RESPONSE >>", payload);
      let statusMessage;
      if (payload.apiStatusCode == 200) {
        statusMessage = "Success";
      } else if (payload.apiStatusCode == 409) {
        statusMessage = "Data confict!";
      } else if (payload.apiStatusCode == 400) {
        statusMessage = "Bad Request! Please try again";
      } else {
        statusMessage = "Oops! Something went wrong, please again";
      }
      state.apiStatusLog = {
        apiStatusCode: payload.apiStatusCode,
        apiStatusMessage: statusMessage,
        apiPending: payload.apiPending,
        apiSuccess: payload.apiSuccess,
        apiFailure: payload.apiFailure,
        apiData: payload.apiData
      };
      console.log("state.apiPending >>", state.apiStatusLog.apiPending);
      console.log("state.apiSuccess >>", state.apiStatusLog.apiSuccess);
      console.log("state.apiFailure >>", state.apiStatusLog.apiFailure);
      console.log(
        "state.apiStatusMessage >>",
        state.apiStatusLog.apiStatusMessage
      );
    },
    /*START >> Module>> USERS*/
    SET_ALL_DASHBOARD_COUNT(state, payload) {
      console.log("SET_ALL_DASHBOARD_COUNT >>", payload);
      state.allDashboardCountsData = payload;
    },
    SET_ALL_USERS_DATA(state, payload) {
      console.log("SET_ALL_USERS_DATA >>", payload);
      state.allUserData = payload;
    },
    SET_ALL_STATES_DATA(state, payload) {
      console.log("SET_ALL_STATES_DATA >>", payload);
      state.allStatesData = payload;
    },
    SET_ALL_ROLES_DATA(state, payload) {
      console.log("SET_ALL_ROLES_DATA >>", payload);
      state.allRolesData = payload;
    },
    SET_ALL_HIERARCHIES_DATA(state, payload) {
      console.log("SET_ALL_HIERARCHIES_DATA >>", payload);
      state.allHierarchiesData = payload;
    },
    SET_ALL_USERS_BY_USER_ID_DATA(state, payload) {
      console.log("SET_ALL_USERS_BY_USER_ID_DATA >>", payload);
      state.editUserExistingItems = payload;
    },
    /*END >> Module>> USERS*/

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Roles and Permission*/
    SET_ALL_ROLES_PERMISSIONS_DATA(state, payload) {
      console.log("SET_ALL_ROLES_PERMISSIONS_DATA >>", payload);
      state.rolesPermissionData = payload;
    },
    SET_ALL_PERMISSIONS_FILTER_DATA(state, payload) {
      console.log("SET_ALL_PERMISSIONS_FILTER_DATA >>", payload);
      state.filterPermissionData = payload;
    }
    /*END >> Module>> Roles and Permission*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
  >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> USERS*/
    FETCH_ALL_DASHBOARD_COUNTS({
      commit
    }, request) {
      console.log(request);
      return api
        .get("user/count")
        .then(response => {
          // commit("API_SUCCESS", true);
          console.log(
            "PASSED >> FETCH_ALL_DASHBOARD_COUNTS >>",
            response.data.data
          );
          // START=> COMMIT with data received'
          commit("SET_ALL_DASHBOARD_COUNT", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_FAILURE", error));
    },

    FETCH_ALL_USERS_DATA({
      commit
    }, request) {
      console.log(request);
      return api
        .get("user")
        .then(response => {
          // commit("API_SUCCESS", true);

          // START=> COMMIT with data received'
          commit("SET_ALL_USERS_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_FAILURE", error));
    },

    FETCH_ALL_ROLES_DATA({
      commit
    }, request) {
      return api
        .get("role")
        .then(response => {
          console.log("PASSED >> Fetch Users");

          // START=> COMMIT success API'
          // commit("API_SUCCESS", true);
          // END=> COMMIT success API'

          // START=> Structuring response like 'label' => 'value'
          let filterRoles = [];
          response.data.data.map(function (value, key) {
            filterRoles.push({
              label: value.role,
              value: value.id
            });
          });
          // END=> Structuring response like 'label' => 'value'

          // START=> COMMIT with data received'
          commit("SET_ALL_ROLES_DATA", filterRoles);
          // END=> COMMIT with data received'
        })
        .catch(error => {
          console.log("FAILED >> Fetch Users");

          // START=> COMMIT success API'
          // commit("API_FAILURE", true);
          // END=> COMMIT success API'
        });
    },

    FETCH_ALL_STATES_DATA({
      commit
    }, request) {
      return api
        .get("state")
        .then(response => {
          console.log("PASSED >> Fetch States", response.data.data);

          // START=> COMMIT success API'
          // commit("API_SUCCESS", true);
          // END=> COMMIT success API'

          // START=> Structuring response like 'label' => 'value'
          let globalState = [];
          response.data.data.map(function (value, key) {
            globalState.push({
              label: value.state,
              value: value.id
            });
          });
          // END=> Structuring response like 'label' => 'value'

          // START=> COMMIT with data received'
          commit("SET_ALL_STATES_DATA", globalState);
          // END=> COMMIT with data received'
        })
        .catch(error => {
          console.log("FAILED >> Fetch Users");
          // START=> COMMIT success API'
          // commit("API_FAILURE", true);
          // END=> COMMIT success API'
        });
    },

    FETCH_ALL_HIERARCHIES_DATA({
      commit
    }, request) {
      return api
        .get("hierarchy")
        .then(response => {
          console.log("PASSED >> Fetch Hierarchies >>", response.data.data);

          // START=> COMMIT success API'
          // commit("API_SUCCESS", true);
          // END=> COMMIT success API'

          // START=> Structuring response like 'label' => 'value'
          let filterHierarchy = [];
          response.data.data.map(function (value, key) {
            filterHierarchy.push({
              value: value.id,
              label: value.hierarchy
            });
          });
          // END=> Structuring response like 'label' => 'value'

          // START=> COMMIT with data received'
          commit("SET_ALL_HIERARCHIES_DATA", filterHierarchy);
          // END=> COMMIT with data received'
        })
        .catch(error => {
          console.log("FAILED >> Fetch Hierarchies");

          // START=> COMMIT success API'
          // commit("API_FAILURE", true);
          // END=> COMMIT success API'
        });
    },

    FETCH_ALL_USERS_BY_HIERARCHY_DATA({
      commit
    }, request) {
      return api
        .get("user/hierarchy/" + request)
        .then(response => {
          // commit("API_SUCCESS", true);

          // START=> COMMIT with data received'
          commit("SET_ALL_USERS_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_FAILURE", error));
    },

    FETCH_ALL_USERS_BY_ROLE_DATA({
      commit
    }, request) {
      return api
        .get("user/role/" + request)
        .then(response => {
          // commit("API_SUCCESS", true);

          // START=> COMMIT with data received'
          commit("SET_ALL_USERS_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_FAILURE", error));
    },

    FETCH_ALL_USERS_BY_USER_ID_DATA({
      commit
    }, request) {
      return api
        .get("user/" + request)
        .then(response => {
          // commit("API_SUCCESS", true);

          // START=> COMMIT with data received'
          commit("SET_ALL_USERS_BY_USER_ID_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_FAILURE", error));
    },

    FEED_USER_DATA({
      commit
    }, request) {
      return api
        .post("user", request)
        .then(response => {
          console.log(response.data);
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);
        })
        .catch(error => {
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiFailure: true,
            apiData: null
          };
          commit("API_RESPONSE_LOG", data);
        });
    },

    FEED_UPDATE_USER_DATA({
      commit
    }, request) {
      return api
        .put("user/" + request.userId, request)
        .then(response => {
          // console.log("response >> Need status >> ", response.status);
          // console.log(response.data);
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);
        })
        .catch(error => {
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiFailure: true,
            apiData: null
          };
          commit("API_RESPONSE_LOG", data);
        });
    },

    DELETE_SELECTED_USERS({
      commit
    }, request) {
      return api
        .delete("delete-selected-users", request)
        .then(response => {
          console.log("response >> Need status >> ", response);
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiSuccess: true,
            apiData: response.data.data
          };
          commit("API_RESPONSE_LOG", data);
        })
        .catch(error => {
          let data = {
            apiStatusCode: response.status,
            apiPending: false,
            apiFailure: true,
            apiData: null
          };
          commit("API_RESPONSE_LOG", data);
        });
    },

    FETCH_ROLES_BASED_ON_HEIRARCHY_ID({
      commit
    }, request) {
      return api
        .get("hierarchy/" + request)
        .then(response => {
          // commit("API_SUCCESS", true);
          console.log(
            "FETCH_ROLES_BASED_ON_HEIRARCHY_ID >> ",
            response.data.data
          );
          // START=> Structuring response like 'label' => 'value'
          let filterRoles = [];
          response.data.data.roles.map(function (value, key) {
            filterRoles.push({
              label: value.role,
              value: value.id
            });
          });
          // END=> Structuring response like 'label' => 'value'

          // START=> COMMIT with data received'
          commit("SET_ALL_ROLES_DATA", filterRoles);
          // END=> COMMIT with data received'
        })
        .catch(error => console.log("API_FAILURE", error));
    },
    /*END >> Module>> USERS*/

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Roles and Permission*/
    FETCH_ALL_ROLES_PERMISSIONS_DATA({
      commit
    }, request) {
      return api
        .get("role")
        .then(response => {
          // START=> COMMIT success API'
          // commit("API_SUCCESS", true);
          // END=> COMMIT success API'

          // START=> COMMIT with data received'
          commit("SET_ALL_ROLES_PERMISSIONS_DATA", response.data.data);
          // END=> COMMIT with data received'
        })
        .catch(error => {
          console.log("FAILED >> Fetch Users");

          // START=> COMMIT success API'
          // commit("API_FAILURE", true);
          // END=> COMMIT success API'
        })
    },

  },
  /*END << All actions like vuex, goes here */

  /* ===================================
  >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getAPIStatusLog(state) {
      return state.apiStatusLog;
    },
    getAllDashboardCount(state) {
      return state.allDashboardCountsData;
    },
    getAllUsers(state) {
      return state.allUserData;
    },
    getAllRoles(state) {
      return state.allRolesData;
    },
    getAllStatesData(state) {
      return state.allStatesData;
    },
    getAllHierarchiesData(state) {
      return state.allHierarchiesData;
    },
    getAllUserByUserIdData(state) {
      return state.editUserExistingItems;
    },
    getAllRolesPermissions(state) {
      return state.rolesPermissionData;
    },
    getAllFilterPermissions(state) {
      return state.filterPermissionData;
    }
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SuperAdminUsers;
