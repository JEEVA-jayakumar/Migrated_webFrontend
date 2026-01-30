
export const API_RESPONSE_LOG = (state, payload) => {
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
}
export const SET_DEVICE_LIST_BASED_ON_LEAD_SOURCE = (state, payload) => {
    state.deviceBasedOnLeadSource = payload
}

