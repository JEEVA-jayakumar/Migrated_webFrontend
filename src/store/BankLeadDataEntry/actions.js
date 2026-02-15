import api from "../api.js";

export const FETCH_ALL_MERCHANTTID = ({
  commit,
  rootState
}, request) => {
  return api
    .get(rootState.GlobalVariables.STATE_MERCHANT + "tids?searchTerm=" + request)

    .then(response => {
      // console.log(response)
      let merchant = [];
      response.data.data.map(function (value, key) {
        merchant.push({
          label: value.tid,
          value: value.tid,
        });
      });
      // END=> Structuring response like 'label' => 'value'

      // START=> COMMIT with data received'
      commit("SET_MERCHANT", merchant);
    })

}

export const SAVE_MERCHANT = ({
  commit,
  rootState
}, request) => {

  return api.post(rootState.GlobalVariables.STATE_MERCHANT + "send-notification", request)


  // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

}