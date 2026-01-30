import api from "../api.js";
export const CMS_LIST = ({
    commit
}, request) => {
    let sorting = request.pagination.descending ? "asc" : "desc";
    // if (request == undefined) {
    //   return api
    //     .get("master-tracker-list")
    //     .then(response => {
    //       // START=> COMMIT with data received'
    //       commit("SET_MASTER_TRACKER_LIST", response.data.data);
    //       // END=> COMMIT with data received'
    //     })
    // }
    return api
        .get(
            "get-cms-mars-data-information?page=" +
            request.pagination.page +
            "&size=" +
            request.pagination.rowsPerPage
            +
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
            commit("SET_CMS_LIST", response.data.data);
            // END=> COMMIT with data received'
        });


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
