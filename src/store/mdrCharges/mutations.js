export const SET_ALL_MDR_PLAN_DETAILS = (state, payload) => {
  state.AllMdrPlanDetails = payload;
};
// SET_ALL_DEACTIVATED_MDR_PLAN_DETAILS
// export const SET_ALL_DEACTIVATED_MDR_PLAN_DETAILS = (state, payload) => {
//   console.log("MUTATION MDR============>",JSON.stringify(payload))
//   state.AllMdrPlanDetails = payload;
//   console.log("MUTATION state MDR============>",JSON.stringify(state.AllMdrPlanDetails ))
// };

export const SET_ALL_MDR_PLAN_EDIT_DETAILS = (state, payload) => {
  state.AllMdrPlanEditDetails = payload;
};
