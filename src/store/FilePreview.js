import api from "./api.js";


/* START >> Store modules => Super Admin Users */
const FilePreview = {
    namespaced: true,

    /* ===================================
      >>>>>>>>>>>>>>>>STATE<<<<<<<<<<<<<<<<<
      ====================================== */

    /*START >> State setup goes here */
    state: {
        allStatesData: [],
        apiStatusLog: {
            apiStatusCode: null,
            apiPending: false,
            apiSuccess: false,
            apiFailure: false,
            apiData: []
        },
        /*START >> Module>> view media data*/
        fileDetails: []
        /*END >> Module>> view media data*/
    },
    /*END << State setup goes here */

    /* ===================================
      >>>>>>>>>>>>>>>>MUTATIONS<<<<<<<<<<<<<<<<<
      ====================================== */

    /*START >> Mutation actions goes here */
    mutations: {
        API_RESPONSE_LOG(state, payload) {
            console.log("API_RESPONSE >>", payload);
            let statusMessage;
            if (payload.apiStatusCode == 200) {
                statusMessage = "Success";
            } else if (payload.apiStatusCode == 409) {
                statusMessage = "Data confict!";
            } else if (payload.apiStatusCode == 400) {
                statusMessage = "Bad Request! Please try again";
            } else {
                statusMessage = "Oops! Something went wrong, please again";
            }
            state.apiStatusLog = {
                apiStatusCode: payload.apiStatusCode,
                apiStatusMessage: statusMessage,
                apiPending: payload.apiPending,
                apiSuccess: payload.apiSuccess,
                apiFailure: payload.apiFailure,
                apiData: payload.apiData
            };
            console.log("state.apiPending >>", state.apiStatusLog.apiPending);
            console.log("state.apiSuccess >>", state.apiStatusLog.apiSuccess);
            console.log("state.apiFailure >>", state.apiStatusLog.apiFailure);
            console.log(
                "state.apiStatusMessage >>",
                state.apiStatusLog.apiStatusMessage
            );
        },
        /*START >> Module>> view media data*/
        SET_MEDIA_RECEIVED_DATA(state, payload) {
            console.log("SET_MEDIA_RECEIVED_DATA >>", payload);
            state.fileDetails = payload;
        }
        /*END >> Module>> view media data*/
    },
    /*END << Mutation actions goes here */

    /* ===================================
      >>>>>>>>>>>>>>>>ACTIONS<<<<<<<<<<<<<<<<<
      ====================================== */

    /*START >> All actions like vuex, goes here*/
    actions: {
        /*START >> Module>> view media tracker*/
        FETCH_MEDIA_USING_FILE_NAME({ commit, rootState }, request) {
            return api
                .post(rootState.ASSETSURL + '/' + request)
                .then(response => {
                    console.log("FETCH_MEDIA_USING_FILE_NAME >> ", response.data.data)
                    let data = {
                        apiStatusCode: response.status,
                        apiPending: false,
                        apiSuccess: true,
                        apiData: response.data.data
                    };
                    commit("API_RESPONSE_LOG", data);

                    // START=> COMMIT with media received received'
                    commit("SET_MEDIA_RECEIVED_DATA", response.data.data);
                    // END=> COMMIT with media received received'
                })
                .catch(error => {
                    let data = {
                        apiStatusCode: error.status,
                        apiPending: false,
                        apiFailure: true,
                        apiData: []
                    };
                    commit("API_RESPONSE_LOG", data);
                    console.log("API_RESPONSE_LOG", error);
                });
        },
        /*END >> Module>> view media tracker*/
    },
    /*END << All actions like vuex, goes here */

    /* ===================================
      >>>>>>>>>>>>>>>>GETTERS<<<<<<<<<<<<<<<<<
      ====================================== */

    /*START >> getter actions goes here*/
    getters: {
        getMediaData(state) {
            return state.fileDetails;
        }
    }
    /*END << getter actions goes here */
};
/* END >> Store modules => Super Admin Users */

/* ============================================
  >>>>>>>>>>>>>>>>FINAL EXPORT<<<<<<<<<<<<<<<<<
  ========================================== */
export default FilePreview;
