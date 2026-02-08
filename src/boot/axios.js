import { boot } from 'quasar/wrappers'
import axios from 'axios'
const api = axios.create({ baseURL: 'https://qaapp.bijlipay.co.in:8085/api/' })
export default boot(({ app, router }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.config.globalProperties.$http = api
  api.interceptors.response.use(r => r, e => {
    if (e.response && e.response.status === 401) {
      localStorage.removeItem("auth_token"); localStorage.removeItem("u_i");
      router.push({ name: "login" });
    }
    return Promise.reject(e);
  });
})
export { axios, api }