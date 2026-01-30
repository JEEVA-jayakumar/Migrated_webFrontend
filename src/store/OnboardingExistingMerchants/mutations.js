export const SET_ONBOARDING_MERCHANT_ASSIGNED_LIST = (state, payload) => {
    // console.log("Mutations assigned:--------------->"+JSON.stringify(payload))
    state.OnboardingMerchantAssignedList = payload
  }
  export const SET_ONBOARDING_MERCHANT_UNASSIGNED_LIST = (state, payload) => {
    // console.log("Mutations Unassigned:--------------->"+JSON.stringify(payload))
    state.OnboardingMerchantUnassignedList = payload
  }
  