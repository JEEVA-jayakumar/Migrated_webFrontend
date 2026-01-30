export const getAllVasDetails = state => {
    console.log("GETTER getAllVasDetails ----->",JSON.stringify(state.AllHostDetails))
    return state.AllVasDetails;
};
