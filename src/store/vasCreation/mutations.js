export const SET_ALL_VAS_DETAILS = (state, payload) => {
    console.log("SET_ALL_VAS_DETAILS ----->",JSON.stringify(payload))
    state.AllVasDetails = payload;
};
