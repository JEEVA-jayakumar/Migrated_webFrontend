
import Vue from "vue"

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
  async FETCH_IMPLEMENTATION_REPORT_FILE({
    commit
  }, request) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  if(request.from && request.to){
      // console.log("==========", request)
      return await Vue.http
      .get( "download-indian-implementation-report?from=" + request.from + "&to=" + request.to, {
        responseType: 'arraybuffer'
      })
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        // link.download = (
        //   response.headers["Content-Disposition"] || ""
        // ).split("filename=")[0];
        // DOWNLOAD_STATIC_QR_DATA
        link.download = "IndianBank_Implementation_Report.xls";
        link.click();
      });
  }else {
      console.log("==========", request)
      return await  Vue.http
      .get("download-indian-implementation-report", {
        responseType: 'arraybuffer'
      })
      .then(response => {
          console.log("FIle name : -- : ", response.headers["Content-Disposition"])
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        // link.download = (
        //   response.headers["Content-Disposition"] || ""
        // ).split("filename=")[0];
        link.download = "IndianBank_Implementation_Report.xls";
        link.click();
      });
    }
},
  },
  getters: {
    getFileDownload1(state) {
      return state.fileDownload1;
    },
  }
};
export default FileDownload1;
