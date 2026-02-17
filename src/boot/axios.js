import { url } from '@vuelidate/validators';
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

  api.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
  api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  api.defaults.headers.common["X-Frame-Options"] = "SAMEORIGIN";

  api.interceptors.request.use(config => {
    if (
      !config.url.includes("authorization/login") &&
      !config.url.includes("authorization/password")
    ) {
      config.headers["NII"] = localStorage.getItem("aa_t") || "";
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers["Authorization"] = "Token " + token;
      }
    } else {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
      delete config.headers["Authorization"];
      delete config.headers["NII"];
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
