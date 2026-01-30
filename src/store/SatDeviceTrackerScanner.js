/* START >> Store modules => Super Admin Users */
const SatDeviceTrackerScanner = {
  namespaced: true,

  /* ===================================
    >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> State setup goes here */
  state: {
    /*START >> Module>> all inventory device scanned data*/
    deviceInventoryTrackerScannedItems: [],
    /*END >> Module>> all inventory device scanned data*/

    /*START >> Module>> all inventory faulty device scanned data*/
    deviceInventoryTrackerFaultyScannedItems: []
    /*END >> Module>> all inventory faulty device scanned data*/
  },
  /*END << State setup goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>MUTATIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> Mutation actions goes here */
  mutations: {
    /*START >> Module>> device faulty tracker inventory scanned data*/
    SET_REACTIVE_SCANNED_DEVICE_DATA(state, payload) {
      state.deviceInventoryTrackerScannedItems = payload;
    },
    SET_REACTIVE_FAULTY_SCANNED_DEVICE_DATA(state, payload) {
      state.deviceInventoryTrackerFaultyScannedItems = payload;
    }
    /*END >> Module>> device faulty tracker inventory scanned data*/
  },
  /*END << Mutation actions goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> All actions like vuex, goes here*/
  actions: {
    /*START >> Module>> device tracker inventory scanned data*/
    REACTIVE_SCANNED_DEVICE_DATA({
      commit
    }, request) {
      // START=> COMMIT with data received'
      commit("SET_REACTIVE_SCANNED_DEVICE_DATA", request);
      // END=> COMMIT with data received'
    },
    /*END >> Module>> short lead data*/

    /*START >> Module>> device faulty tracker inventory scanned data*/
    REACTIVE_FAULTY_SCANNED_DEVICE_DATA({
      commit
    }, request) {
      // START=> COMMIT with data received'
      commit("SET_REACTIVE_FAULTY_SCANNED_DEVICE_DATA", request);
      // END=> COMMIT with data received'
    }
    /*END >> Module>> device faulty tracker inventory scanned data*/
  },
  /*END << All actions like vuex, goes here */

  /* ===================================
    >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
    ====================================== */

  /*START >> getter actions goes here*/
  getters: {
    getDeviceScannedItems(state) {
      return state.deviceInventoryTrackerScannedItems;
    },
    getDeviceFaultyScannedItems(state) {
      return state.deviceInventoryTrackerFaultyScannedItems;
    }
  }
  /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default SatDeviceTrackerScanner;
