import api from "../api.js";
import Vue from "vue";
export const ADDITIONAL_TID_FROM_MARS = ({
  commit,
  rootState
}, request) => {
  let variable = localStorage.getItem("a_t")
    let v = variable.lastIndexOf('|')
    let res = variable.substring(v + 1)
  let headers = {
    'NII': res
};

if(res == 104){
  return Vue.http
  .post(rootState.GlobalVariables.STATE_MARS_AXIS_ON_BOARD_API_URL + 'additionalTerminals',request,
  { 
    headers: headers
  })
  .then(response => {
    commit("SET_ADDITIONAL_TID_FROM_MARS", response.data.data);
      console.log("Action Datas------------------>"+JSON.stringify(response.data.data))
    return response
  })
}else{
  return Vue.http
  .post(rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL + 'additionalTerminals',request,
  { 
    headers: headers
  })
  .then(response => {
    commit("SET_ADDITIONAL_TID_FROM_MARS", response.data.data);
      console.log("Action Datas------------------>"+JSON.stringify(response.data.data))
    return response
  })
}
};

export const  ADDITIONAL_TID_FROM_BACK_END= ({ commit,
  rootState},request) => {
console.log("ACTION LEAD ID------------->"+JSON.stringify(request.params.Id.leadId))
console.log("ACTION COUNT-------------->"+JSON.stringify(request.params.Count.count))
  return api
 .post("add-on-tid/"+request.params.Id.leadId+"/"+request.params.Count.count)
 .then(response => {
  commit("SET_ADDITIONAL_TID_FROM_BACK_END", response.data);
  return response
})
};
//.leadId+"/"+request.params.count

