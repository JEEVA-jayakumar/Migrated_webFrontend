import api from '../api.js';
export const SPARE_PARTS_POD_UPDATE_DETAILS= ({
    commit,
    rootState
  }, request) => {
    console.log("SUBMIT request ----> Action",JSON.stringify(request))
    // let path = 2;
    // if(request.allocate_region != null && request.allocate_so ==null){
    //   path = 1;
    // }else if(request.allocate_region != null && request.allocate_so != null){
    //   path =2;
    // }
    return api.post("spare-pod/updatePod/"+request.pod_number+"/2", request)
  };

  /*PHONEPE API START */
   
  export const PHONEPE_SPARE_PARTS_POD_UPDATE_DETAILS= ({
    commit,
    rootState
  }, request) => {
    console.log("SUBMIT request ----> Action",JSON.stringify(request))
    // let path = 2;
    // if(request.allocate_region != null && request.allocate_so ==null){
    //   path = 1;
    // }else if(request.allocate_region != null && request.allocate_so != null){
    //   path =2;
    // }
    return api.post("aggregator-spare-parts/agg-updatePod/"+request.pod_number+"/2"+"/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]), request)
  };

  /*PHONEPE API END */

  // export const SPARE_PARTS_POD_REJECT_DETAILS= ({
  //   commit,
  //   rootState
  // }, request) => {
  //   console.log("SUBMIT request",JSON.stringify(request))
  //   return api.post("spare-pod/updatePod/"+request.podNumber+"/0", request)
  // };

  // export const SPARE_PARTS_POD_APPROVE_DETAILS= ({
  //   commit,
  //   rootState
  // }, request) => {
  //   console.log("SUBMIT request",JSON.stringify(request))
  //   return api.post("spare-pod/updatePod/"+request.podNumber+"/1", request)
  // };
