export const SET_FETCH_ISSUE_DATAS = (state, payload) => {
    // console.log("SET_FETCH_ISSUE_DATAS: ------------ : " +  JSON.stringify(payload))
    state.issueDatasDetails = payload;
  } 
  export const SET_FETCH_SUB_ISSUE_DATAS = (state, payload) => {
    // console.log("SET_FETCH_SUB_ISSUE_DATAS: ------------ : " +  JSON.stringify(payload))
    state.subIssueDatasDetails = payload;
  } 

  export const SET_FETCH_REMARKS_ISSUE_DATAS = (state, payload) => {
    // console.log("SET_FETCH_REMARKS_ISSUE_DATAS: ------------ : " +  JSON.stringify(payload))
    state.remarksDatasDetails = payload;
  } 