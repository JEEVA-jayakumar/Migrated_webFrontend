import Vue from "vue";
import { date } from "quasar";
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

/* API call to fetch lead approval data */
export const REPORT_LEAD_APPROVAL_TRACKER = async ({ commit }, request) => {
  if (request == undefined) {
    return await Vue.http
      .get("download/lead-approval-tracker", {
        responseType: "arraybuffer",
      })
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  } else {
    return await Vue.http
      .get(
        "download/lead-approval-tracker/" +
        date.formatDate(request.from, "x") +
        "/" +
        date.formatDate(request.to, "x"),
        {
          responseType: "arraybuffer",
        }
      )
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  }
};
/* API call to fetch lead approval data */

/* API call to fetch sorucewise lead data */
export const REPORT_SOURCEWISE_LEAD_TRACKER = async ({ commit }, request) => {
  if (request == undefined) {
    return await Vue.http
      .get("download/sourcewise-lead-tracker", {
        responseType: "arraybuffer",
      })
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  } else {
    return await Vue.http
      .get(
        "download/sourcewise-lead-tracker?from=" +
        date.formatDate(request.from, "x") +
        "&to=" +
        date.formatDate(request.to, "x"),
        {
          responseType: "arraybuffer",
        }
      )
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  }
};
/* API call to fetch sorucewise lead data */

/* API call to fetch source/region/device lead data */
export const REPORT_SOURCE_REGION_DEVICE = async ({ commit }, request) => {
  if (request == undefined) {
    return await Vue.http
      .get("download/source-region-device", {
        responseType: "arraybuffer",
      })
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  } else {
    return await Vue.http
      .get(
        "download/source-region-device?/" +
        date.formatDate(request.from, "x") +
        "/" +
        date.formatDate(request.to, "x"),
        {
          responseType: "arraybuffer",
        }
      )
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  }
};
/* API call to fetch source/region/device lead data */

/* API call to fetch in active lead data */
export const REPORT_INACTIVE_MERCHANT = async ({ commit }, request) => {
  if (request == undefined) {
    return await Vue.http
      .get("download/inactive-merchant", {
        responseType: "arraybuffer",
      })
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  } else {
    return await Vue.http
      .get(
        "download/inactive-merchant/" +
        date.formatDate(request.from, "x") +
        "/" +
        date.formatDate(request.to, "x"),
        {
          responseType: "arraybuffer",
        }
      )
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  }
};
/* API call to fetch in active lead data */

/* API call to fetch proxy lead misselling data */
export const REPORT_PROXY_LEAD_MISSELLING = async ({ commit }, request) => {
  if (request == undefined) {
    return await Vue.http
      .get("download/proxy-lead-misselling", {
        responseType: "arraybuffer",
      })
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  } else {
    return await Vue.http
      .get(
        "download/proxy-lead-misselling/" +
        date.formatDate(request.from, "x") +
        "/" +
        date.formatDate(request.to, "x"),
        {
          responseType: "arraybuffer",
        }
      )
      .then(response => {
        let blob = COMMON_FILE_DOWNLOAD(response);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = (response.headers["Content-Disposition"] || "").split(
          "filename="
        )[0];
        link.click();
      });
  }
};
/* API call to fetch proxy lead misselling data */

/* API call to fetch fianance verified tracker data */
export const REPORT_FINANCE_APPROVED = async ({ commit }, request) => {
  return await Vue.http
    .get("finance-tracker-list-download", {
      responseType: "arraybuffer",
    })
    .then(response => {
      let blob = COMMON_FILE_DOWNLOAD(response);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = (response.headers["Content-Disposition"] || "").split(
        "filename="
      )[0];
      link.click();
    });
};
export const REPORT_QR_FINANCE_APPROVED = async ({ commit }, request) => {
  return await Vue.http
    .get("finance-qr-tracker-list-download", {
      responseType: "arraybuffer",
    })
    .then(response => {
      let blob = COMMON_FILE_DOWNLOAD(response);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = (response.headers["Content-Disposition"] || "").split(
        "filename="
      )[0];
      link.click();
    });
};
export const POD_LIST_DOWNLOAD = async ({ commit }, request) => {
  return await Vue.http
    .get("download/pod-list", {
      responseType: "arraybuffer",
    })
    .then(response => {
      let blob = COMMON_FILE_DOWNLOAD(response);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "podlist.xls"
      link.click();
    });
};

export const AGGREGATOR_POD_LIST_DOWNLOAD = async ({ commit }, request) => {
  return await Vue.http
    .get("download/pod-list", {
      responseType: "arraybuffer",
    })
    .then(response => {
      let blob = COMMON_FILE_DOWNLOAD(response);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "podlist.xls"
      link.click();
    });
};

export const INVENTORY_WITH_SO_LIST_DOWNLOAD = async ({ commit }, request) => {
  return await Vue.http
    .get("download/so-list", {
      responseType: "arraybuffer",
    })
    .then(response => {
      let blob = COMMON_FILE_DOWNLOAD(response);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "inventorywithsolist.xls"
      link.click();
    });
};

export const AGGREGATOR_INVENTORY_WITH_SO_LIST_DOWNLOAD = async ({ commit }, request) => {
  return await Vue.http
    .get("download/so-list", {
      responseType: "arraybuffer",
    })
    .then(response => {
      let blob = COMMON_FILE_DOWNLOAD(response);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "aggregatorinventorywithsolist.xls"
      link.click();
    });
};

export const QR_LIST_DOWNLOAD = async ({ commit }, request) => {
  return await Vue.http
    .post("download/qr-implementation-report", request.params, {
      responseType: "arraybuffer",
    })
    .then(response => {
      let blob = COMMON_FILE_DOWNLOAD(response);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "QRLIST.xlsx"
      link.click();
    });
};
export const INVENTORY_WITH_RESELLER_LIST_ = async ({ commit }, request) => {
  return await Vue.http
    .get("download/reseller-list", {
      responseType: "arraybuffer",
    })
    .then(response => {
      let blob = COMMON_FILE_DOWNLOAD(response);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "inventorywithresellerlist.xls"
      link.click();
    });
};
export const INVENTORY_WITH_CENTRAL = async ({ commit }, request) => {
  return await Vue.http
    .get("download/inventory-central", {
      responseType: "arraybuffer",
    })
    .then(response => {
      let blob = COMMON_FILE_DOWNLOAD(response);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "inventorycentral.xls"
      link.click();
    });
};
/* API call to fetch fianance verified tracker data */
