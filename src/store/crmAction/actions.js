import api from '../api.js';
  export const FETCH_ISSUE_DATAS= ({
    commit
  }, request) => {
      console.log(request)
    return api
      .get("internal/getIssue/1")
      .then(response => {
        // START=> COMMIT with data received'
        console.log("-------------------/////",response)
        commit('SET_FETCH_ISSUE_DATAS', response.data.data);
        return response;
        // console.log("SET_ACTIVE_CS_SUB_ISSUE_DATAS",JSON.stringify(response.data.data))
        // END=> COMMIT with data received'
      });
  }

  export const FETCH_SUB_ISSUE_DATAS= ({
    commit
  }, request) => {
      console.log("FETCH_SUB_ISSUE_DATAS------------>>>>",request)
    return api
      .get("internal/subIssuesData/"+ request)
      .then(response => {
        // START=> COMMIT with data received'
        console.log("Internal_sub_Issues_Data-------------------/////",response)
        commit('SET_FETCH_SUB_ISSUE_DATAS', response.data.data);
        return response;
      });
  }
  export const FETCH_REMARKS_ISSUE_DATAS= ({
    commit
  }, request) => {
      console.log("FETCH_REMARKS_ISSUE_DATAS------------>>>>",request)
    return api
      .get("internal/resolutionRemark/1/2")
      .then(response => {
        // START=> COMMIT with data received'
        console.log("Internal_sub_Issues_Data-------------------/////",response)
        commit('SET_FETCH_REMARKS_ISSUE_DATAS', response.data.data);
        return response;
      });
  }
  