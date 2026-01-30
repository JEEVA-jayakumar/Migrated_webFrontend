import api from "./api.js";

/* START >> Store modules => Super Admin Users */
const SuperAdminusers = {
  namespaced: true,

  /* ===================================
  >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> State setup goes here */
  state: {
    toggleCommonLoader: false,
    allDashboardCountsData: [],
    editUserExistingItems: [],
    allStatesData: [],
    apiStatusLog: {
      apiStatusCode: null,
      apiPending: false,
      apiSuccess: false,
      apiFailure: false,
      apiData: [],
    },
    /*START >> Module>> USERS*/
    allUserData: [],
    allUserForUserCreationData: [],
    allRolesUserCreationData: [],
    allRolesData: [],
    allHierarchiesData: [],
    allHierarchiesAndRolesData: [],
    predecessorByRoleHierarchy: [],
    /*END >> Module>> USERS*/

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Roles and Permission*/
    rolesPermissionData: [],
    filterPermissionData: [],
    /*END >> Module>> Roles and Permission*/

    /*START >> Module>> all available permission*/
    allPermissionData: [],
    /*END >> Module>> all available permission*/

    /*START >> Module>> all available Regions*/
    regionsData: [],
    regionsData1: [],
    // regionsGroupData: [],
    soData: [],
    /*END >> Module>> all available Regions*/
  },
  /*END << State setup goes here */

  /* ===================================
  >>>>>>>>>>>>>>>>MUTATIONS<<<<<<<<<<<<<<<<<
  ====================================== */

  /*START >> Mutation actions goes here */
  mutations: {
    commonLoader(state, payload) {
      state.toggleCommonLoader = payload;
    },
    API_RESPONSE_LOG(state, payload) {
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
        apiData: payload.apiData,
      };
    },
    /*START >> Module>> USERS*/
    SET_ALL_DASHBOARD_COUNT(state, payload) {
      state.allDashboardCountsData = payload;
    },
    SET_ALL_USERS_DATA(state, payload) {
      state.allUserData = payload;
    },
    SET_ALL_USERS_BY_ROLE_USER_CREATION_DATA(state, payload) {
      state.allUserForUserCreationData = payload;
    },
    SET_ALL_STATES_DATA(state, payload) {
      state.allStatesData = payload;
    },
    SET_ALL_ROLES_DATA(state, payload) {
      state.allRolesData = payload;
    },
    SET_ALL_ROLES_USER_CREATION_DATA(state, payload) {
      state.allRolesUserCreationData = payload;
    },
    SET_ALL_HIERARCHIES_DATA(state, payload) {
      state.allHierarchiesData = payload;
    },
    SET_ALL_HIERARCHIES_ROLES_DATA(state, payload) {
      state.allHierarchiesAndRolesData = payload;
    },
    SET_PREDECESSOR_ON_ROLE(state, payload) {
      state.predecessorByRoleHierarchy = payload;
    },
    SET_ALL_USERS_BY_USER_ID_DATA(state, payload) {
      state.editUserExistingItems = payload;
    },
    SET_ALL_PERMISSIONS_DATA(state, payload) {
      state.allPermissionData = payload;
    },
    /*END >> Module>> USERS*/

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Roles and Permission*/
    SET_ALL_ROLES_PERMISSIONS_DATA(state, payload) {
      state.rolesPermissionData = payload;
    },
    SET_ALL_PERMISSIONS_FILTER_DATA(state, payload) {
      state.filterPermissionData = payload;
    },
    /*END >> Module>> Roles and Permission*/

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Regions*/
    SET_ALL_REGIONS_DATA(state, payload) {
      state.regionsData = payload;
    },
    // SET_REGION_GROUP_DATAS(state, payload) {
    //   console.log("SET_REGION_GROUP_DATAS--->",JSON.stringify(state.regionsGroupData))
    //   state.regionsGroupData = payload;
    // },
    SET_ALL_REGIONS_DATA1(state, payload) {
      state.regionsData1 = payload;
    },
    SET_ALL_SO_DATA(state, payload) {
      state.soData = payload;
    },
    /*END >> Module>> Regions*/
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
      return api.get("user/count").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_DASHBOARD_COUNT", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    FETCH_ALL_USERS_DATA({
      commit
    }, request) {
      if (request == undefined) {
        return api.get("user").then(response => {
          // START=> COMMIT with data received'
          commit("SET_ALL_USERS_DATA", response.data.data);
          // END=> COMMIT with data received'
        });
      } else {
        return api.get("user/deactivated-users").then(response => {
          // START=> COMMIT with data received'
          commit("SET_ALL_USERS_DATA", response.data.data);
          // END=> COMMIT with data received'
        });
      }
    },

    FETCH_ALL_ROLES_DATA({
      commit
    }, request) {
      return api.get("role").then(response => {
        // START=> Structuring response like 'label' => 'value'
        let filterRoles = [];
        response.data.data.map(function (value, key) {
          filterRoles.push({
            label: value.role,
            value: value.id,
            id: false,
            userInfo: [],
          });
        });
        // END=> Structuring response like 'label' => 'value'

        // START=> COMMIT with data received'
        commit("SET_ALL_ROLES_DATA", filterRoles);
        // END=> COMMIT with data received'
      });
    },

    FETCH_ALL_REGIONS_DATA({
      commit
    }, request) {
      return api.get("region").then(response => {
        // START=> Structuring response like 'label' => 'value'
        let filterRegions = [];
        response.data.data.map(function (value, key) {
          filterRegions.push({
            label: value.regionAreaName,
            value: value.id,

          });
        });
        // END=> Structuring response like 'label' => 'value'

        // START=> COMMIT with data received'
        commit("SET_ALL_REGIONS_DATA", filterRegions);
        // END=> COMMIT with data received'
      });
    },
    
    // FETCH_REGION_GROUP_DATAS({
    //   commit
    // }, request) {
    //   alert("INCOMING")
    //   return api.get("region-group").then(response => {
    //     console.log("response COMMITED VALUES---------->",JSON.stringify(response))
    //     // START=> Structuring response like 'label' => 'value'
    //     // let filterRegions = [];
    //     // response.data.data.map(function (value, key) {
    //     //   filterRegions.push({
    //     //     label: value.regionAreaName,
    //     //     value: value.id,

    //     //   });
    //     // });
    //     // END=> Structuring response like 'label' => 'value'

    //     // START=> COMMIT with data received'
    //     commit("SET_REGION_GROUP_DATAS",response.data.data);
    //     console.log("COMMITED VALUES---------->",JSON.stringify(response.data.data))
    //     // END=> COMMIT with data received'
    //   });
    // },


    FETCH_ALL_REGIONS_DATA1({
      commit
    }, request) {
      return api.get("region").then(response => {
        // START=> Structuring response like 'label' => 'value'
        // let filterRegions = [];
        // response.data.data.map(function (value, key) {
        //   filterRegions.push({
        //     label: value.regionAreaName,
        //     value: value.id,

        //   });
        // });
        // END=> Structuring response like 'label' => 'value'

        // START=> COMMIT with data received'
        commit("SET_ALL_REGIONS_DATA1", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    FETCH_ALL_SO_DATA({
      commit
    }, request) {
      return api.get("soassignedwithpod").then(response => {
        // START=> Structuring response like 'label' => 'value'
        let filterSo = [];
        response.data.data.map(function (value, key) {
          filterSo.push({
            label: value.name+ " | " + value.employeeID+ " | " + value.email,
            value: value.id,

          });
        });
        // END=> Structuring response like 'label' => 'value'

        // START=> COMMIT with data received'
        commit("SET_ALL_SO_DATA", filterSo);
        // END=> COMMIT with data received'
      });
    },

    FETCH_ALL_STATES_DATA({
      commit
    }, request) {
      return api.get("user/state-pincode").then(response => {
        // START=> Structuring response like 'label' => 'value'
        let globalState = [];
        response.data.data.map(function (value, key) {
          globalState.push({
            label: value.pincode.toString(),
            value: value,
          });
        });
        // END=> Structuring response like 'label' => 'value'

        // START=> COMMIT with data received'
        commit("SET_ALL_STATES_DATA", globalState);
        // END=> COMMIT with data received'
      });
    },
    FETCH_PINCODE_WITH_TERM({
      commit
    }, request) {
      return api.get("user/state-pincode/" + request).then(response => {
        // START=> Structuring response like 'label' => 'value'
        let globalState = [];
        response.data.data.map(function (value, key) {
          globalState.push({
            label: value.pincode.toString(),
            value: value,
          });
        });
        // END=> Structuring response like 'label' => 'value'

        // START=> COMMIT with data received'
        commit("SET_ALL_STATES_DATA", globalState);
        // END=> COMMIT with data received'
      });
    },

    FETCH_ALL_HIERARCHIES_DATA({
      commit
    }, request) {
      return api.get("hierarchy").then(response => {
        // START=> Structuring response like 'label' => 'value'
        let filterHierarchy = [];
        response.data.data.map(function (value, key) {
          console.log("HIERARCHY VALYUES-------->",JSON.stringify(value))
          filterHierarchy.push({
            active: value.active,
            value: value.id,
            label: value.hierarchy,
            shortCode: value.hierarchyCode,
            bgColorClass: false,
          });
        });
        // END=> Structuring response like 'label' => 'value'

        // START=> COMMIT with data received'
        commit("SET_ALL_HIERARCHIES_DATA", filterHierarchy);
        // END=> COMMIT with data received'
      });
    },
    FETCH_ALL_HIERARCHIES_ROLES_DATA({
      commit
    }, request) {
      return api.get("user/hierarchy/role").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_HIERARCHIES_ROLES_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    FETCH_ALL_USERS_BY_HIERARCHY_DATA({
      commit
    }, request) {
      return api.get("user/hierarchy/" + request).then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_USERS_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    FETCH_PREDECESSOR_ON_ROLE({
      commit
    }, request) {
      return api
        .get("user/" + request.role.id + "/" + request.region.id + "/role")
        .then(response => {
          commit("SET_PREDECESSOR_ON_ROLE", response.data.data);
        });
    },

    FETCH_ALL_USERS_BY_ROLE_DATA({
      commit
    }, request) {
      return api.get("user/" + request + "/role").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_USERS_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    FETCH_ALL_USERS_BY_ROLE_FOR_USER_CREATION_DATA({
      commit
    }, request) {
      return api
        .get("user/" + request.role.id + "/" + request.region.id + "/role")
        .then(response => {
          // START=> COMMIT with data received'
          commit(
            "SET_ALL_USERS_BY_ROLE_USER_CREATION_DATA",
            response.data.data
          );
          // END=> COMMIT with data received'
        });
    },

    FETCH_ALL_USERS_BY_USER_ID_DATA({
      commit
    }, request) {
      return api.get("user/" + request).then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_USERS_BY_USER_ID_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    FEED_USER_DATA({
      commit
    }, request) {
      return api.post("user", request);
    },

    FEED_UPDATE_USER_DATA({
      commit
    }, request) {
      return api.put("user/" + request.userId, request);
    },
    EDIT_POD_REGION({
      commit
    }, request) {
      return api.put("podregion/" + request.pod + "/" + request.region);
    },

    EDIT_AGGREGATOR_POD_REGION({
      commit
    }, request) {
      console.log("AGGREGATORS_POD_REGION -------->", JSON.stringify(request))
      return api.put("aggregator-inventory/agg-podregion/" + request.pod + "/" + request.region + "/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]));
    },

    EDIT_CMS({
      commit
    }, request) {
      return api.put("update-tid-data-information/" + request);
    },
    DELETE_SELECTED_USERS({
      commit
    }, request) {
      return api.delete("user/delete-selected-users-new", {
        items: request,
      });
    },
    ACTIVATE_SELECTED_USERS({
      commit
    }, request) {
      return api.put("user/reactivate-selected-users", {
        items: request,
      });
    },

    FETCH_ROLES_BASED_ON_HEIRARCHY_ID({
      commit
    }, request) {
      return api.get("role/" + request + "/hierarchy").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_ROLES_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    FETCH_ROLES_BASED_ON_HEIRARCHY_ID_FOR_USER_CREATION({
      commit
    }, request) {
      return api.get("role/" + request + "/hierarchy").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_ROLES_USER_CREATION_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },
    /*END >> Module>> USERS*/

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Roles and Permission*/
    FETCH_ALL_ROLES_PERMISSIONS_DATA({
      commit
    }, request) {
      return api.get("role").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_ROLES_PERMISSIONS_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    FETCH_ALL_PERMISSIONS_FILTER_DATA({
      commit
    }, request) {
      return api.get("permission").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_PERMISSIONS_FILTER_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    FEED_NEW_ROLE_WITH_PERMISSIONS({
      commit
    }, request) {
      return api
        .post("role", request)
        .then(response => { })
        .catch(error => {
          // START=> COMMIT failure API'
          commit("API_RESPONSE_LOG", error);
          // END=> COMMIT failure API'
        });
    },

    FEED_ROLE_ORIGINAL_DATA({
      commit
    }, request) {
      return api.post("role/" + request.roleId, request).then(response => { });
    },

    DELETE_ROLE_BY_ROLE_ID_DATA({
      commit
    }, request) {
      return api.delete("role/" + request.id).then(response => { });
    },
    
    ACTIVATE_ROLE_BY_ROLE_ID_DATA({
      commit
    }, request) {
      return api.post("role/" + request.id, request)
    },

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Hierarchy Data*/
    FEED_NEW_HIERARCHY_DATA({
      commit
    }, request) {
      return api.post("hierarchy", request).then(response => { });
    },

    FEED_EXISTING_HIERARCHY_DATA({
      commit
    }, request) {
      return api
        .put("hierarchy/" + request.hierarchyId, request)
        .then(response => { });
    },

    DELETE_HIERARCHY_BY_HIERARCHY_ID_DATA({
      commit
    }, request) {
      return api.delete("hierarchy/" + request, request).then(response => { });
    },
    /*END >> Module>> Hierarchy Data*/

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Permission Data*/
    FETCH_ALL_PERMISSIONS_DATA({
      commit
    }) {
      return api.get("permission/").then(response => {
        // START=> COMMIT with data received'
        commit("SET_ALL_PERMISSIONS_DATA", response.data.data);
        // END=> COMMIT with data received'
      });
    },

    FEED_PERMISSION_DATA({
      commit
    }, request) {
      return api.post("permission", request).then(response => { });
    },

    FEED_EXISTING_PERMISSION_DATA({
      commit
    }, request) {
      return api
        .put("permission/" + request.permissionId, request)
        .then(response => { });
    },

    DELETE_PERMISSION_BY_PERMISSION_ID_DATA({
      commit
    }, request) {
      return api.delete("permission/" + request).then(response => { });
    },
    /*END >> Module>> Permission Data*/

    /** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< **/

    /*START >> Module>> Regions Data*/
    FEED_REGION_DATA({
      commit
    }, request) {
      return api.post("region", request).then(response => { });
    },
    FEED_EXISTING_REGION_DATA({
      commit
    }, request) {
      return api.put("region/"+request.id, request).then(response => { });
    },
    DELETE_REGIONS_BY_REGIONS_ID_DATA({
      commit
    }, request) {
      return api.delete("region/" + request.id).then(response => { });
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
      console.log("GET ALL DASH BOARD DETAILS----------->",JSON.stringify(state.allDashboardCountsData))
      return state.allDashboardCountsData;
    },
    getAllUsers(state) {
      return state.allUserData;
    },
    getAllUsersForUserCreation(state) {
      return state.allUserForUserCreationData;
    },
    getAllRoles(state) {
      return state.allRolesData;
    },
    getAllRolesForUserCreation(state) {
      return state.allRolesUserCreationData;
    },
    getAllStatesData(state) {
      return state.allStatesData;
    },
    getAllHierarchiesData(state) {
      return state.allHierarchiesData;
    },
    getAllHierarchiesAndRolesData(state) {
      return state.allHierarchiesAndRolesData;
    },
    getAllUserByUserIdData(state) {
      return state.editUserExistingItems;
    },
    getPredecessorByRoleHierarchyData(state) {
      return state.predecessorByRoleHierarchy;
    },
    getAllRolesPermissions(state) {
      return state.rolesPermissionData;
    },
    getAllFilterPermissions(state) {
      return state.filterPermissionData;
    },
    getAllPermissionData(state) {
      return state.allPermissionData;
    },
    getAllRegionsData(state) {
      return state.regionsData;
    },
    // getAllRegionGroupData(state) {
    //   console.log("getAllRegionGroupData--->",JSON.stringify(state.regionsGroupData))
    //   return state.regionsGroupData;
    // },
    getAllRegionsData1(state) {
      return state.regionsData1;
    },
    getAllSOsData(state) {
      return state.soData;
    },
  },
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SuperAdminusers;
