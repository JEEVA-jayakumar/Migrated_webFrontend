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

  api.interceptors.request.use(config => {
    // Robust check for auth-related URLs to avoid sending custom headers
    const isAuthUrl = config.url && (
      config.url.includes("authorization/login") ||
      config.url.includes("authorization/password")
    );

    if (!isAuthUrl) {
      const token = localStorage.getItem("auth_token");
      if (token && token !== "null" && token !== "undefined") {
        config.headers["Authorization"] = "Token " + token;
      }
      const aa_t = localStorage.getItem("aa_t");
      if (aa_t && aa_t !== "null" && aa_t !== "undefined") {
        config.headers["NII"] = aa_t;
      }
    } else {
      // Explicitly ensure headers are NOT present for auth URLs
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
