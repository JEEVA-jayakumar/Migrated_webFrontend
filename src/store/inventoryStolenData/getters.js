export const getinventoryStolenData = (state) => {
    console.log("Getter--------------->"+JSON.stringify(state))
    return state.stolenInventory
  } 
  /*Aggregators API */

  export const getAggregatorsinventoryStolenData = (state) => {
    console.log("Getter--------------->"+JSON.stringify(state))
    return state.AggregatorsstolenInventory
  }
  /*Aggregators API */
