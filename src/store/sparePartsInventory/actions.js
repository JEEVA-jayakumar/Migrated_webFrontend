import api from '../api.js';
export const UPDATE_SPARE_PARTS_INVENTORY_DATAS= ({
    commit,
    rootState
  }, request) => {
    console.log("SUBMIT request",JSON.stringify(request))
    // let pathVar = 0;
    // if(request.allocate_region != null && request.allocate_so == null){
    //   pathVar = 1
    // }else if (request.allocate_region != null && request.allocate_so !=null){
    //   pathVar = 2
    // }else if (request.allocate_reseller != null){
    //   pathVar = 3
    // }else {
    //   pathVar = 4
    // }
    return api.post("pod-region/createSoPod",request)
  }

  /* PHONEPE API START */

  export const UPDATE_PHONEPE_SPARE_PARTS_INVENTORY_DATAS= ({
    commit,
    rootState
  }, request) => {
    console.log("SUBMIT request",JSON.stringify(request))
    return api.post("aggregator-spare-parts/agg-createSoPod/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]),request)
  }

   /* PHONEPE API END */

  export const CREATE_SPARE_POD_LIST_INVENTORY= ({
    commit,
    rootState
  }, request) => {
    console.log("SUBMIT request",JSON.stringify(request))
    let pathVar = 0;
    if(request.allocate_region != null && request.allocate_so == null){
      pathVar = 1
    }else if (request.allocate_region != null && request.allocate_so !=null){
      pathVar = 2
    }else if (request.allocate_reseller != null){
      pathVar = 3
    }else {
      pathVar = 4
    }
    return api.post("spare-pod/createPod/"+pathVar,request)
  }

  /*PHONEPE API START */

  export const CREATE_PHONEPE_SPARE_POD_LIST_INVENTORY= ({
    commit,
    rootState
  }, request) => {
    console.log("SUBMIT request",JSON.stringify(request))
    let pathVar = 0;
    if(request.allocate_region != null && request.allocate_so == null){
      pathVar = 1
    }else if (request.allocate_region != null && request.allocate_so !=null){
      pathVar = 2
    }else if (request.allocate_reseller != null){
      pathVar = 3
    }else {
      pathVar = 4
    }
    return api.post("aggregator-spare-parts/agg-createPod/"+pathVar +"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]),request)
  }


   /*PHONEPE API END */
