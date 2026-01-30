export const SET_ALL_HOST_DETAILS = (state, payload) => {
    console.log("SET_ALL_HOST_DETAILS ----->",JSON.stringify(payload))
    state.AllHostDetails = payload;
};
