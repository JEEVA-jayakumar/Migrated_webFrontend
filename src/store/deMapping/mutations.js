export const SET_DEMAPPING_STATUS_LIST = (state, payload) => {
    console.log("DEMAPPING_STATUS_LIST : ------------ : " +  JSON.stringify(payload))
    state.demappingStatusList = payload;
    }