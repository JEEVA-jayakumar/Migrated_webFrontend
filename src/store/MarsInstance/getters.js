export const getMarsInstanceDetails = state => {
    console.log("GETTER getAllHostDetails ----->",JSON.stringify(state.AllHostDetails))
    return state.MarsInstanceDetails;
};