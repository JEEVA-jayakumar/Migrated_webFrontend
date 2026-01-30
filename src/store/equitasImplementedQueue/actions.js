import api from "../api.js";
export const EQUITAS_TRACKER_LIST = ({
    commit
}, request) => {
     if (request.pagination.sortBy == null) {
            return api
              .get(
               "merchant-tracker-implemented-list/sat?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter
              )
              .then(response => {
                commit("SET_EQUITAS_REPORT", response.data.data);
              });
          } else {
    let sorting = request.pagination.descending ? "asc" : "desc";
    if (request.formData.fromDate == "" || request.formData.toDate == "") {
        return api.get(
            "merchant-tracker-implemented-list/sat?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
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
            commit("SET_EQUITAS_REPORT", response.data.data);
            // END=> COMMIT with data received'
        });}
    else {
        return api
            .get(
                "merchant-tracker-implemented-list/sat?page=" +
                request.pagination.page +
                "&size=" +
                request.pagination.rowsPerPage +
                "&search=" +
                request.filter +
                "&sort=" +
                request.pagination.sortBy +
                "&" +
                request.pagination.sortBy +
                ".dir=" +
                sorting +
                "&fromDate=" + request.formData.fromDate + "&toDate=" + request.formData.toDate
            )
            .then(response => {
                // START=> COMMIT with data received'
                commit("SET_EQUITAS_REPORT", response.data.data);
                // END=> COMMIT with data received'
            });
    }
          }
    // else {
    //   return api
    //     .get("master-tracker-list/" + request.startDate + '+' + request.endDate)
    //     .then(response => {
    //       // START=> COMMIT with data received'
    //       commit("SET_MASTER_TRACKER_LIST", response.data.data);
    //       // END=> COMMIT with data received'
    //     })
    // }
}
export const BIJLIPAY_DEACTIVE_LIST = ({
    commit
}, request) => {
    if (request.pagination.sortBy == null) {
        return api
          .get(
            "merchant-De-ActivationList/sat?" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter
          )
          .then(response => {
            commit("SET_BIJLIPAY_DEACTIVE_LIST", response.data.data);
          });
      } else {
    let sorting = request.pagination.descending ? "asc" : "desc";
    if (request.formData.fromDate == "" || request.formData.toDate == "") {
        return api.get(
            "merchant-De-ActivationList/sat?" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
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
                commit("SET_BIJLIPAY_DEACTIVE_LIST", response.data.data);
                // END=> COMMIT with data received'
            });
    }
    else {
        return api
            .get(
                "merchant-De-ActivationList/sat?" +
                request.pagination.page +
                "&size=" +
                request.pagination.rowsPerPage +
                "&search=" +
                request.filter +
                "&sort=" +
                request.pagination.sortBy +
                "&" +
                request.pagination.sortBy +
                ".dir=" +
                ".dir=" +
                sorting +
                "&FromDate=" + request.formData.fromDate + "&ToDate=" + request.formData.toDate
            )
            .then(response => {
                // START=> COMMIT with data received'
                commit("SET_BIJLIPAY_DEACTIVE_LIST", response.data.data);
                // END=> COMMIT with data received'
            });
    }
}
}
export const AGGREGATOR_IMPLEMENTED_VERIFICATION_QUEUE = ({
    commit
}, request) => {
    if (request.pagination.sortBy == null) {
        return api
          .get(
            "aggregator-inventory/agg-merchant-tracker-implemented-list/sat/" + JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) + "?page=" +
                request.pagination.page +
                "&size=" +
                request.pagination.rowsPerPage +
                "&search=" +
                request.filter
          )
          .then(response => {
            commit("SET_AGGREGATOR_IMPLEMENTED_VERIFICATION_QUEUE", response.data.data);
          });
      } else {
    let sorting = request.pagination.descending ? "asc" : "desc";
    if (request.formData.fromDate == "" || request.formData.toDate == "") {
        return api
            .get(
                "aggregator-inventory/agg-merchant-tracker-implemented-list/sat/" + JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) + "?page=" +
                request.pagination.page +
                "&size=" +
                request.pagination.rowsPerPage +
                "&search=" +
                request.filter +
                "&sort=" +
                request.pagination.sortBy +
                "&" +
                request.pagination.sortBy +
                ".dir=" +
                sorting
            )
            .then(response => {
                console.log("API Response : ", response.body.data);
                commit("SET_AGGREGATOR_IMPLEMENTED_VERIFICATION_QUEUE", response.data.data);
                console.log("SET_AGGREGATOR_IMPLEMENTED_VERIFICATION_QUEUE : ", response.data.data);

            });
    }
    else {
        return api
            .get(
                "aggregator-inventory/agg-merchant-tracker-implemented-list/sat/" + JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) + "?page=" +
                request.pagination.page +
                "&size=" +
                request.pagination.rowsPerPage +
                "&search=" +
                request.filter +
                "&sort=" +
                request.pagination.sortBy +
                "&" +
                request.pagination.sortBy +
                ".dir=" +
                sorting +
                "&FromDate=" + request.formData.fromDate + "&ToDate=" + request.formData.toDate
            )
            .then(response => {
                commit("SET_AGGREGATOR_IMPLEMENTED_VERIFICATION_QUEUE", response.data.data);
            });
    }
}


}
export const AGGREGATOR_DEACTIVE_LIST = ({
    commit
}, request) => {
    if (request.pagination.sortBy == null) {
        return api
          .get(
            "aggregator-inventory/agg-merchant-tracker-DE-Activation-list/sat/" + JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) + "?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage +
            "&search=" +
            request.filter
          )
          .then(response => {
            commit("SET_AGGREGATOR_DEACTIVE_LIST", response.data.data);
          });
      } else {
    let sorting = request.pagination.descending ? "asc" : "desc";
    if (request.formData.fromDate == "" || request.formData.toDate == "") {
        return api
            .get(
                "aggregator-inventory/agg-merchant-tracker-DE-Activation-list/sat/" + JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) + "?page=" +
                request.pagination.page +
                "&size=" +
                request.pagination.rowsPerPage +
                "&search=" +
                request.filter +
                "&sort=" +
                request.pagination.sortBy +
                "&" +
                request.pagination.sortBy +
                ".dir=" +
                sorting
            )
            .then(response => {
                commit("SET_AGGREGATOR_DEACTIVE_LIST", response.data.data);

            });
    }
    else {
        return api
            .get(
                "aggregator-inventory/agg-merchant-tracker-DE-Activation-list/sat/" + JSON.parse(localStorage.getItem("selectedTab").split('|')[1]) + "?page=" +
                request.pagination.page +
                "&size=" +
                request.pagination.rowsPerPage +
                "&search=" +
                request.filter +
                "&sort=" +
                request.pagination.sortBy +
                "&" +
                request.pagination.sortBy +
                ".dir=" +
                sorting +
                "&FromDate=" + request.formData.fromDate + "&ToDate=" + request.formData.toDate
            )
            .then(response => {
                commit("SET_AGGREGATOR_DEACTIVE_LIST", response.data.data);

            });
    }
}
}

export const SERVICE_TICKET_LIST = ({
    commit
}, request) => {
    console.log("request.pagination", request.pagination)
    let sorting = request.pagination.descending ? "asc" : "desc";
    return api
        .get(
            "service-request/sat-verification-pending-list"
            + "?page=" +
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

            commit("SET_SERVICE_TICKET_LIST", response.data.data);
        });
}
export const SERVICE_TICKET_APPROVE = ({
    commit
}, request) => {
    return api.put("service-request/approve-service-ticket/" + request.id + "/1", {})
        .then(response => {
            commit("SET_SERVICE_TICKET_APPROVE", response);
        });
};
export const SERVICE_TICKET_REJECT = ({
    commit
}, request) => {
    console.log(request)
    return api.put("service-request/approve-service-ticket/" + request.id + "/2", request.reason, {})
        .then(response => {
            commit("SET_SERVICE_TICKET_REJECT", response);
        });
};
