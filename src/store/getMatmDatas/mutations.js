export const SET_ALL_MATM_DATAS = (state, payload) => {
    console.log("MATM DATAS FROM PAYLOAD-------------->"+JSON.stringify(payload))
    state.MatmDatas = payload;
},

SET_ALL_MATM_PLAN_DETAILS = (state, payload) => {
    console.log("MATM Plan Details-------------->"+JSON.stringify(payload))
    state.MatmPlanDetails = payload;
};
