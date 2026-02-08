import os

def fix_core():
    # 1. src/store/index.js
    with open('src/store/index.js', 'r') as f:
        lines = f.readlines()

    new_lines = []
    new_lines.append("import { createStore } from 'vuex';\n")
    for line in lines:
        if 'import Vue from' in line or 'import Vuex from' in line: continue
        if 'Vue.use(Vuex)' in line: continue
        if 'const store = new Vuex.Store({' in line:
            new_lines.append("export default createStore({\n")
            continue
        if 'export default store;' in line: continue
        new_lines.append(line)

    with open('src/store/index.js', 'w') as f:
        f.writelines(new_lines)

    # 2. src/router/index.js
    router_idx = """import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'
const createHistory = process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory
const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(process.env.VUE_ROUTER_BASE)
})
Router.beforeEach((to, from, next) => {
  if (localStorage.getItem("auth_token") == undefined) {
    if (to.path === '/login' || to.name === 'primaryLogin' || to.path === '/') next();
    else next({ name: 'primaryLogin' });
  } else {
    const userInfo = localStorage.getItem("u_i");
    if (!userInfo) { next({ name: 'primaryLogin' }); return; }
    let roles = [];
    JSON.parse(userInfo).roles.map(oo => roles.push(oo.hierarchy.hierarchyCode));
    if (to.matched.length > 0 && roles.includes(to.matched[0].name)) next();
    else next();
  }
});
export default Router;"""
    with open('src/router/index.js', 'w') as f:
        f.write(router_idx)

    # 3. src/App.vue
    app_vue = """<template><router-view /></template>
<script>import { defineComponent } from 'vue'; export default defineComponent({ name: 'App' })</script>"""
    with open('src/App.vue', 'w') as f:
        f.write(app_vue)

    # 4. Boot files
    # I'll just rewrite the main ones
    # src/boot/axios.js
    axios_js = """import { boot } from 'quasar/wrappers'
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
export { axios, api }"""
    with open('src/boot/axios.js', 'w') as f:
        f.write(axios_js)

    # src/boot/i18n.js
    i18n_js = """import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
export default boot(({ app }) => {
  const i18n = createI18n({ locale: 'en', fallbackLocale: 'en', legacy: false, messages })
  app.use(i18n)
})"""
    with open('src/boot/i18n.js', 'w') as f:
        f.write(i18n_js)

if __name__ == "__main__":
    fix_core()
