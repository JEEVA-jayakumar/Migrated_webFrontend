export const SET_LS_VAS_HOST_INSTANCE_DETAILS = (state, payload) => {
    console.log("SET_LS_VAS_HOST_INSTANCE_DETAILS ----->",JSON.stringify(payload))
    state.lsVasHostInstanceDetails = payload;
};
