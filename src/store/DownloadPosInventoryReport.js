import { and } from '@vuelidate/validators';
import { api } from '../boot/axios';



/***********
Common function to convert response as BLOB and create a 
link to click and download 
*************/
function COMMON_FILE_DOWNLOAD(response) {
  return new Blob([response.data], {
    type: response.headers.get("content-type"),
  });
}
/***********
Common function to convert response as BLOB and create a 
link to click and download 
*************/
const FileDownload1 = {
  namespaced: true,
  state: {
    fileDownload1: [],
  },
  mutations: {
    SET_ALL_FILE_(state, payload) {
      console.log("SET_ALL_FILE_DOWNLOAD_1 >>", payload);
      state.fileDownload1 = payload;
    },
  },
  actions: {
    async FETCH_POS_INVENTORY_REPORTS({
      commit
    }, request) {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      // if (request.from && request.to) {
      //   return await api
      //     .get("download-depreciation-report" + "/" + request.from + "/" + request.to, {
      //       responseType: 'arraybuffer'
      //     })
      //     .then(response => {
      //       console.log("FIle name : -- : ", response)
      //       let blob = COMMON_FILE_DOWNLOAD(response);
      //       let link = document.createElement("a");
      //       link.href = window.URL.createObjectURL(blob);
      //       link.download = "POSInventoryReport.xlsx";
      //       link.click();
      //     });
      // }
      if (request.from) {
        return await api
          .get("download-depreciation-report" + "/" + request.from, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            console.log("FIle name : -- : ", response)
            let blob = COMMON_FILE_DOWNLOAD(response);
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "POSInventoryReport.xlsx";
            link.click();
          });
      }
    },
    /*AGGREGATOR API */
  },
  getters: {
    getFileDownload1(state) {
      return state.fileDownload1;
    },
  }
};
export default FileDownload1;
