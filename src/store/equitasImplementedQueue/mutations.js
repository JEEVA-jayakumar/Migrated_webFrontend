export const SET_EQUITAS_REPORT = (state, payload) => {
    state.equitasImplementedQueue = payload
}
export const SET_BIJLIPAY_DEACTIVE_LIST = (state, payload) => {
    state.bijdeactivelist = payload
}
export const SET_AGGREGATOR_IMPLEMENTED_VERIFICATION_QUEUE = (state, payload) => {
    state.aggImplementedverificationqueue = payload
}
export const SET_AGGREGATOR_DEACTIVE_LIST = (state, payload) => {
    state.aggdeactivelist = payload
}
export const SET_SERVICE_TICKET_LIST = (state, payload) => {
    state.serviceticketlist = payload
}
export const SET_SERVICE_TICKET_APPROVE = ( state, payload) => {
    state.serviceapprove = payload
}
export const SET_SERVICE_TICKET_REJECT = ( state, payload) => {
    state.servicereject = payload
}
