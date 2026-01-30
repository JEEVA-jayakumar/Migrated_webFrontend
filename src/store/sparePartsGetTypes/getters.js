export const getsparePartsGetTypes= (state) => {
    console.log("GETTER SPARE PARTS: ------------ : " +  JSON.stringify(state.sparePartsGetTypes))
    return state.sparePartsGetTypes
  }

  export const getallInventorySparePartsGetTypes= (state) => {
    console.log("GETTER allInventorySparePartsGetTypes: ------------ : " +  JSON.stringify(state.allInventorySparePartsGetTypes))
    return state.allInventorySparePartsGetTypes
  }

  /*PHONEPE GETTER */

  export const getallPhonepeInventorySparePartsGetTypes= (state) => {
    console.log("GETTER allInventorySparePartsGetTypes: ------------ : " +  JSON.stringify(state.allInventoryPhonepeSparePartsGetTypes))
    return state.allInventoryPhonepeSparePartsGetTypes
  }
