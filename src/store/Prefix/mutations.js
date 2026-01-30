export const SET_PREFIX_DETAILS = (state, payload) => {
    console.log("SET_ALL_HOST_DETAILS ----->",JSON.stringify(payload))
    state.AllPrefixDetails = payload;
};
