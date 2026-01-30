import Vue from "vue"
function COMMON_FILE_DOWNLOAD(response) {
    return new Blob([response.data], {
      type: response.headers.get("content-type"),
    });
  }
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
        async DOWNLOAD_STATIC_QR_DATA({
          commit
        }, request) {
            console.log("==========", request)
            return await  Vue.http
            .get("qr-gen/downloadString/"+request,{
              responseType: 'arraybuffer'
            })
            .then(response => {
               // console.log("FIle name : -- : ", response.headers["Content-Disposition"])
                const contentDisposition = response.headers.get('Content-Disposition');
                const filenameIndex = contentDisposition.indexOf('filename=');
                const filename = contentDisposition.substring(filenameIndex + 10);
                var filenames = filename.substring(0, filename.length - 1);
                console.log("FIle name : -- : ", JSON.stringify(filenames))
                let blob = COMMON_FILE_DOWNLOAD(response);
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = filenames
                link.click();
            });
          },
          
          
          async DOWNLOAD_COMPLETED_DATA({
            commit
          }, request) {
              console.log("==========", request)
              return await  Vue.http
              .get("equitas-completedLeads",{
                responseType: 'arraybuffer'
              })
              .then(response => {
                 // console.log("FIle name : -- : ", response.headers["Content-Disposition"])
                  const contentDisposition = response.headers.get('Content-Disposition');
                  const filenameIndex = contentDisposition.indexOf('filename=');
                  const filename = contentDisposition.substring(filenameIndex + 9);
                  var filenames = filename.substring(0, filename.length);
                  console.log("FIle name : -- : ", JSON.stringify(filenames))
                  let blob = COMMON_FILE_DOWNLOAD(response);
                  let link = document.createElement("a");
                  link.href = window.URL.createObjectURL(blob);
                  link.download = filenames
                  link.click();
              });
            },
          async DOWNLOAD_ERROR_DATA({
            commit
          }, request) {
              console.log("==========", request)
              return await  Vue.http
              .get("download-equitas-errorLeads",{
                responseType: 'arraybuffer'
              })
              .then(response => {
                 // console.log("FIle name : -- : ", response.headers["Content-Disposition"])
                  const contentDisposition = response.headers.get('Content-Disposition');
                  const filenameIndex = contentDisposition.indexOf('filename=');
                  const filename = contentDisposition.substring(filenameIndex + 9);
                  var filenames = filename.substring(0, filename.length);
                  console.log("FIle name : -- : ", JSON.stringify(filenames))
                  let blob = COMMON_FILE_DOWNLOAD(response);
                  let link = document.createElement("a");
                  link.href = window.URL.createObjectURL(blob);
                  link.download = filenames
                  link.click();
              });
            },
        },
    getters: {
        getFileDownload1(state) {
          return state.fileDownload1;
        },
      }

};
export default FileDownload1;
