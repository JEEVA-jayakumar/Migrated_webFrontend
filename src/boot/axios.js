import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://qaapp.bijlipay.co.in:8085/api/',
  withCredentials: true
})

export default boot(({ app, router }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.config.globalProperties.$http = api

  api.interceptors.request.use(config => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers["Accept"] = "application/json, text/plain, */*";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["X-Frame-Options"] = "SAMEORIGIN";
    config.headers["X-Requested-With"] = "XMLHttpRequest";

    if (
      !config.url.includes("authorization/login") &&
      !config.url.includes("authorization/password")
    ) {
      config.headers["nii"] = localStorage.getItem("aa_t") || "";
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers["Authorization"] = "Token " + token;
      }
    } else {
      delete config.headers["Authorization"];
      delete config.headers["nii"];
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  api.interceptors.response.use(r => r, e => {
    if (e.response && e.response.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("u_i");
      router.push({ name: "login" });
    }
    return Promise.reject(e);
  });
})

export { axios, api }
