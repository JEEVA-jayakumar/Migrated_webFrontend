export const SET_REGION_MARS = (state, payload) => {
    console.log("Region Mars Status Details ------------->>> " +  JSON.stringify(payload))
    state.regionMars = payload;
  }