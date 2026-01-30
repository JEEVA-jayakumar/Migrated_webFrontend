export const SET_MARS_INSTITUTION_DETAILS = (state, payload) => {
    console.log("SET_ALL_HOST_DETAILS ----->",JSON.stringify(payload))
    state.MarsInstanceDetails = payload;
};
