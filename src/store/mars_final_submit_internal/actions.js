import api from "../api.js";

export const MARS_FINAL_SUBMIT_INTERNAL = ({
    commit
  }, request) => {
    console.log("REQUEST---------------------->"+request.merchant.leadInformation)
    return api.post(
      "submit-to-mars-data-information/" +
      request.merchant.leadInformation.id +
      "/" +
      request.action,
      request.merchant
    );
  };