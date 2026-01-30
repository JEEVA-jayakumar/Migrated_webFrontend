export const SET_VAS_DATAS = (state, payload) => {
  console.log("payload" + JSON.stringify(payload.data));
  state.VasDeviceMapping  = payload.data;
  
};
