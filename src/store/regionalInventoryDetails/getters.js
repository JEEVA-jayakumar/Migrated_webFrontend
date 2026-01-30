export const getregionalInventoryPodDetails = (state) => {
    return state.regionalInventoryPodDetails
  }

  export const getsinglePodDetails = (state) => {
    console.log("GETTER====>>>",JSON.stringify(state))
    return state.singlePodData
  }
  export const getsparePartsSetsAndCounts = (state) => {
    return state.sparePartsSetsAndCounts
  }


  export const getregionalInventoryStocksPodDetails = (state) => {
    return state.regionalInventoryStocksPodDetails
  }

  export const getregionalInventoryAllocatedSoPodDetails = (state) => {
    return state.regionalInventoryAllocatedSoPodDetails
  }
  // PhonepeRegionalInventoryAllocatedSoPodDetails

  export const getphonepeRegionalInventoryAllocatedSoPodDetails = (state) => {
    return state.PhonepeRegionalInventoryAllocatedSoPodDetails
  }


  // PhonepeRegionalInventoryStocksPodDetails
   
  export const getPhonepeRegionalInventoryStocksPodDetails = (state) => {
    return state.PhonepeRegionalInventoryStocksPodDetails
  }

  // regionalInventoryPhonepeAllocatedSoPodDetails

  export const getPhonePeRegionalInventoryAllocatedSoPodDetails = (state) => {
    return state.regionalInventoryPhonepeAllocatedSoPodDetails
  }

  /*PHONEPE GETTER */

  export const getPhonepeSparePartsSetsAndCounts = (state) => {
    return state.PhonepeSparePartsSetsAndCounts
  }
