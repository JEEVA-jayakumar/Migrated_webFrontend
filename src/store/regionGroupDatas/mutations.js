export const SET_REGION_GROUP_DATAS = (state, payload) => {
    console.log("SET_REGION_GROUP_DATAS--->",JSON.stringify(state.regionsGroupData))
    state.regionsGroupData = payload
  }
