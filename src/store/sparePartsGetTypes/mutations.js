export const SET_SPARE_PARTS_GET_TYPES = (state, payload) => {
  console.log("Spare parts Mutations: ------------ : " +  JSON.stringify(payload))
  state.sparePartsGetTypes = payload;
}

export const SET_ALL_SPARE_PARTS_INVENTORY_DATAS = (state, payload) => {
  console.log("allInventorySparePartsGetTypes Mutations: ------------ : " +  JSON.stringify(payload))
  state.allInventorySparePartsGetTypes = payload;
}

/*PHONEPE MUTATION */


export const SET_ALL_PHONEPE_SPARE_PARTS_INVENTORY_DATAS = (state, payload) => {
  console.log("allInventorySparePartsGetTypes Mutations: ------------ : " +  JSON.stringify(payload))
  state.allInventoryPhonepeSparePartsGetTypes = payload;
}
