// const __API_pending = (state) => {
//   return state.apiPending;
// };

// const __API_success = (state) => {
//   return state.apiSuccess;
// };

// const __API_failure = (state) => {
//   return state.apiFailure;
// };

// All Users
const getAllUsers = state => {
  return state.allUserData;
};

// All Roles
const getAllRoles = (state) => {
  console.log("Getters >> allRolesData >>", state.allRolesData);
  return state.allRolesData;
};

// All Roles
const testData = state => {
  return state.testtt;
};

export default {
  getAllUsers,
  getAllRoles,
  testData
};
