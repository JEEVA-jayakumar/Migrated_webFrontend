import api from "./api.js";


/* START >> Store modules => Super Admin Users */
const BankUploadFile = {
  namespaced: true,
  actions: {
    UPLOAD_BANKLIST_FILE({
      commit,
      rootState
    }, request) {
      return api
        .post("http://13.232.119.156:8080/apibanks/uploadbankso", request, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })
      // .then(response => {
      //   let data = {
      //     apiStatusCode: response.status,
      //     apiPending: false,
      //     apiSuccess: true,
      //     apiData: response.data.data
      //   };
      //   commit("API_RESPONSE_LOG", data);
      //   return response.data.data;
      // })
    }
  },

};

export default BankUploadFile;
