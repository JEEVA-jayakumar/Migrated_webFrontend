export const getAllHostDetails = state => {
    console.log("GETTER getAllHostDetails ----->",JSON.stringify(state.AllHostDetails))
    return state.AllHostDetails;
};
