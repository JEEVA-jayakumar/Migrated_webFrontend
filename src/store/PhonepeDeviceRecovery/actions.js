
import api from "../api.js";

// export const FETCH_PHONEPE_DEVICE_RECOVERY_DATAS = ({
//   commit
// }, request) => {
//   // return api.get("aggregator-inventory/agg-device-recovery-data-list").then(response => {
//   //     commit("SET_PHONEPE_DEVICE_RECOVERY_DATAS", response.data.data);
//   // });
//   let sorting = request.pagination.descending ? 'asc' : 'desc';
//   return api
//     .get(
//       "aggregator-inventory/agg-device-recovery-data-list/?page=" +
//       request.pagination.page +
//       "&size=" +
//       request.pagination.rowsPerPage +
//       "&searchTerm=" +
//       request.filter +
//       "&sort=" +
//       request.pagination.sortBy +
//       "&" +
//       request.pagination.sortBy +
//       ".dir=" +
//       sorting
//     )
//     .then(response => {
//       // START=> COMMIT with data received'
//       commit('SET_PHONEPE_DEVICE_RECOVERY_DATAS', response.data.data);
//       // END=> COMMIT with data received'
//     });
// };
export const FETCH_PHONEPE_DEVICE_RECOVERY_DATAS = ({
  commit
}, request) => {
  if (JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) == '3') {
    let sorting = request.pagination.descending ? 'asc' : 'desc';
    return api
      .get(
        "aggregator-inventory/agg-device-recovery-data-list/?page=" +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&searchTerm=" +
        request.filter +
        "&sort=" +
        request.pagination.sortBy +
        "&" +
        request.pagination.sortBy +
        ".dir=" +
        sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_PHONEPE_DEVICE_RECOVERY_DATAS', response.data.data);
        // END=> COMMIT with data received'
      });
  }
  else {
    let sorting = request.pagination.descending ? 'asc' : 'desc';
    return api
      .get(
        "aggregator-inventory/agg-device-recovery-data-lst/?page=" +
        request.pagination.page +
        "&size=" +
        request.pagination.rowsPerPage +
        "&searchTerm=" +
        request.filter +
        "&sort=" +
        request.pagination.sortBy +
        "&" +
        request.pagination.sortBy +
        ".dir=" +
        sorting
      )
      .then(response => {
        // START=> COMMIT with data received'
        commit('SET_PHONEPE_DEVICE_RECOVERY_DATAS', response.data.data);
        // END=> COMMIT with data received'
      });
  }
};
function COMMON_FILE_DOWNLOAD(response) {
  return new Blob([response.data], {
    type: response.headers.get("content-type"),
  });
}

// export const DOWNLOAD_PHONEPE_DEVICE_RECOVERY_DATAS = async ({ commit }, request) => {
//     return await api
//       .get("aggregator-inventory/agg-download-device-recovery-data-list", {
//         responseType: "arraybuffer",
//       })
//       .then(response => {
//         let blob = COMMON_FILE_DOWNLOAD(response);
//         let link = document.createElement("a");
//         link.href = window.URL.createObjectURL(blob);
//         link.download = "inventorywithsolist.xls"
//         link.click();
//       });
//   };
export const DOWNLOAD_PHONEPE_DEVICE_RECOVERY_DATAS = async ({ commit }, request) => {
  if (JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) == '3') {
    return await api
      .get("aggregator-inventory/agg-download-device-recovery-data-list", {
        responseType: "arraybuffer",
      })
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "inventorywithsolist.xls"
        link.click();
      })
  }
  else {
    return await api
      .get("aggregator-inventory/agg-download-device-recovery-list", {
        responseType: "arraybuffer",
      })
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "inventorywithsolist.xls"
        link.click();
      })
  }
};

export const PHONEPE_VERIFY_DEVICE_AFTER_RECOVERY = (
  { commit },
  request
) => {
  return api.get(
    "aggregator-inventory/agg-device-recovery-scan-pick/" + JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) +
    "/" +
    request.device +
    "/" +
    request.barcode
  );
};

export const FEED_PHONEPE_DEVICE_AFTER_SCANNED_TO_SUBMIT = ({ commit }, request) => {
  return api
    .put("aggregator-inventory/agg-device-recovery-scan-pick-submit/" + JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) + "/" + request.deviceId + "/" + request.action, request.request)
    .then(response => {
      commit("API_RESPONSE_LOG", true);
      // START=> COMMIT with data received'
      commit("SET_PHONEPE_DEVICE_AFTER_SCANNED_TO_SUBMIT", []);
      // END=> COMMIT with data received'
    });
};

export const FEED_PHONEPE_RECOVERY_DEVICE_BULK_UPLOAD_DATA = ({
  commit,
  rootState
}, request) => {
  return api
    // .post("aggregator-inventory/agg-add-bulk-recovery-device-inventory/"+ request.device_type +'/' + request.action, request.file,
    .put("aggregator-inventory/agg-add-bulk-recovery-device-to-inventory/" + JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) + "/" + request.action, request.file, {
      headers: {
        "Content-Type": 'multipart/form-data',
        "Authorization": "Token " + localStorage.getItem(
          "auth_token")
      }
    })
    .then(response => {
      commit("API_RESPONSE_LOG", true);
    })
};
