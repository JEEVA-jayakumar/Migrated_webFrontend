export const getLsVasDeviceDetails = state => {
    console.log("GETTER getLsVasDeviceDetails ----->",JSON.stringify(state.LsVasDeviceDetails))
    return state.LsVasDeviceDetails;
};
export const getLsDeviceBasedVasDetails = state => {
    console.log("GETTER LsDeviceBasedVasDetails ----->",JSON.stringify(state.LsDeviceBasedVasDetails))
    return state.LsDeviceBasedVasDetails;
};
