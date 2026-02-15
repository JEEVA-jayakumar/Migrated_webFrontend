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
    // fileDownload2: [],
  },
   mutations: {
    SET_ALL_FILE_(state, payload) {
      console.log("SET_ALL_FILE_DOWNLOAD_1 >>", payload);
      state.fileDownload1 = payload;
    },
    // SET_ALL_AGG_FILE_(state, payload) {
    //   console.log("SET_ALL_AGG_FILE_DOWNLOAD_2 >>", payload);
    //   state.fileDownload2 = payload;
    // },
  },
  actions: {
    async MASTER_TRACKER_LIST_ALL_DATAS({
      commit
    }, request) {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    if(request.fromDate && request.toDate){
        // console.log("==========", request)
        return await api
        .get("download-master-tracker-list/"+request.fromDate+"/"+request.toDate, {
          responseType: 'arraybuffer'
        })
        .then(response => {
            console.log("FIle name : -- : ", response)
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = (
            response.headers["Content-Disposition"] || ""
          ).split("filename=")[0];
          link.click();
        });
    }else {
        console.log("==========", request)
        return await  api
        .get("download-master-tracker-list", {
          responseType: 'arraybuffer'
        })
        .then(response => {
            console.log("FIle name : -- : ", response.headers["Content-Disposition"])
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = (
            response.headers["Content-Disposition"] || ""
          ).split("filename=")[0];
          link.click();
        });
      }
    },
    async AGGREGATOR_MASTER_TRACKER_LIST_ALL_DATAS({
      commit
    }, request) {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    if(request.fromDate && request.toDate){
        return await api
        .get("aggregator-inventory/agg-download-master-tracker-list/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1])+"/"+request.fromDate+"/"+request.toDate, {
          responseType: 'arraybuffer'
        })
        .then(response => {
            console.log("FIle name : -- : ", response)
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = (
            response.headers["Content-Disposition"] || ""
          ).split("filename=")[0];
          link.click();
        });
    }else {
        console.log("==========", request)
        return await  api
        .get("download-master-tracker-listaggregator-inventory/agg-download-master-tracker-list/"+JSON.parse(localStorage.getItem("selectedTab").split('|')[1]), {
          responseType: 'arraybuffer'
        })
        .then(response => {
            console.log("FIle name : -- : ", response.headers["Content-Disposition"])
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = (
            response.headers["Content-Disposition"] || ""
          ).split("filename=")[0];
          link.click();
        });
      }
    },


    async FINANCE_APPROVAL_TRACKER({
      commit
    }, request) {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    if(request.fromDate && request.toDate){
        // console.log("==========", request)
        return await api
        .get("finance-tracker-list-download-date-based?from="+request.fromDate+"&to="+request.toDate, {
          responseType: 'arraybuffer'
        })
        .then(response => {
            console.log("FIle name : -- : ", response)
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = (
            response.headers["Content-Disposition"] || ""
          ).split("filename=")[0];
          link.click();
        });
    }else {
        console.log("==========", request)
        return await  api
        .get("download-master-tracker-list", {
          responseType: 'arraybuffer'
        })
        .then(response => {
            console.log("FIle name : -- : ", response.headers["Content-Disposition"])
          let blob = COMMON_FILE_DOWNLOAD(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = (
            response.headers["Content-Disposition"] || ""
          ).split("filename=")[0];
          link.click();
        });
      }
     },
  },
  getters: {
    getFileDownload1(state) {
      return state.fileDownload1;
  
    },
  },
};
export default FileDownload1;




      // else if(request.mid && request.fromDate && request.toDate)
    //   {
    //   // console.log("==========", request)
    //   let response = await api.get("https://bportal.bijlipay.co.in:6060/api/download-settlement-report?mid="+request.mid+"&fromDate="+request.fromDate +"&toDate="+request.toDate, {
    //     responseType: 'arraybuffer'
    //   });
    //   let blob = new Blob([response.data], {
    //     type: response.headers.get('content-type')
    //   });
    //   let link = document.createElement('a');
    //   link.href = window.URL.createObjectURL(blob);
    //   link.download ="Settled Transactions.xlsx"
    //   link.click();
    // }
//     else if(request.tid && request.fromDate && request.toDate)
//     {
//     console.log("==========", request)
//     let response = await api.get("https://bportal.bijlipay.co.in:6060/api/download-settlement-report?tid="+request.tid+"&fromDate="+request.fromDate +"&toDate="+request.toDate, {
//       responseType: 'arraybuffer'
//     });
//     let blob = new Blob([response.data], {
//       type: response.headers.get('content-type')
//     });
//     let link = document.createElement('a');
//     link.href = window.URL.createObjectURL(blob);
//     link.download ="Settled Transactions.xlsx"
//     link.click();
//    }
//    else if(request.mname && request.fromDate && request.toDate)
//    {
//    console.log("==========", request)
//    let response = await api.get("https://bportal.bijlipay.co.in:6060/api/download-settlement-report?mName="+request.mname+"&fromDate="+request.fromDate +"&toDate="+request.toDate, {
//     responseType: 'arraybuffer'
//    });
//    let blob = new Blob([response.data], {
//     type: response.headers.get('content-type')
//    });
//    let link = document.createElement('a');
//    link.href = window.URL.createObjectURL(blob);
//    link.download ="Settled Transactions.xlsx"
//    link.click();
//    }
//    else if(request.fromDate && request.toDate){
//       console.log("==========", request)
//       let response = await api.get("https://bportal.bijlipay.co.in:6060/api/download-settlement-report?fromDate="+request.fromDate +"&toDate="+request.toDate, {
//         responseType: 'arraybuffer'
//       });
//       let blob = new Blob([response.data], {
//         type: response.headers.get('content-type')
//       });
//       let link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = "Settled Transactions.xlsx"
//       link.click();
//    }
//    else if(request.mid){
//     console.log("==========", request)
//     let response = await api.get("https://bportal.bijlipay.co.in:6060/api/download-settlement-report?mid="+request.mid, {
//       responseType: 'arraybuffer'
//     });
//     let blob = new Blob([response.data], {
//       type: response.headers.get('content-type')
//     });
//     let link = document.createElement('a');
//     link.href = window.URL.createObjectURL(blob);
//     link.download = "Settled Transactions.xlsx"
//     link.click();
//    }
//    else if(request.tid){
//    console.log("==========", request)
//    let response = await api.get("https://bportal.bijlipay.co.in:6060/api/download-settlement-report?tid="+request.tid, {
//     responseType: 'arraybuffer'
//    });
//    let blob = new Blob([response.data], {
//     type: response.headers.get('content-type')
//    });
//    let link = document.createElement('a');
//    link.href = window.URL.createObjectURL(blob);
//    link.download = "Settled Transactions.xlsx"
//    link.click();
//    }
//    else if(request.mname){
//    console.log("==========", request)
//    let response = await api.get("https://bportal.bijlipay.co.in:6060/api/download-settlement-report?mName="+request.mname, {
//     responseType: 'arraybuffer'
//    });
//    let blob = new Blob([response.data], {
//     type: response.headers.get('content-type')
//    });
//    let link = document.createElement('a');
//    link.href = window.URL.createObjectURL(blob);
//    link.download = "Settled Transactions.xlsx"
//    link.click();
//    }

 
