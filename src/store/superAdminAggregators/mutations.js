export const SET_GET_CREATED_AGGREGATORS_LIST = (state, payload) => {
    state.getAggregatorList = payload;
};

// SET_GET_ACTIVE_CREATED_AGGREGATORS_LIST

export const SET_GET_ACTIVE_CREATED_AGGREGATORS_LIST = (state, payload) => {
    state.getActiveAggregatorList = payload;
};
export const SET_AGGREGATOR_INVENTORY_WITH_SO_LIST = (state, payload) => {
    state.getInventoryWithSoList = payload;
};
