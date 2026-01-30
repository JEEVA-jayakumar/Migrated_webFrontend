import api from "../api.js";
export const SAVE_BANK_SO = ({
  commit
}, request) => {
  return api.post("http://182.156.237.85:8080/apibanks/bank-SoList", request);
};
