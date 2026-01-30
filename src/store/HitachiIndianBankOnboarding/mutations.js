export const SET_ONBOARDING_MERCHANT_ASSIGNED_LIST = (state, payload) => {
    // console.log("Mutations assigned:--------------->"+JSON.stringify(payload))
    state.OnboardingMerchantAssignedList = payload
  }
  export const SET_HITACHI_INDIAN_ONBOARDING_LIST = (state, payload) => {
    // console.log("Mutations Unassigned:--------------->"+JSON.stringify(payload))
    state.HitachiIndianOnboarding = payload
  }
  