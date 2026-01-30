import Vue from "vue";
import VueRouter from "vue-router";
import { Loading } from "quasar";

import routes from "./routes";

Vue.use(VueRouter);

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_Router_MODE,
  base: process.env.VUE_Router_BASE,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes,
});
Router.beforeEach((to, from, next) => {
  if (localStorage.getItem("auth_token") == undefined) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("u_i");
    next();
  } else {
    let roles = [];
    JSON.parse(localStorage.getItem("u_i")).roles.map(function(oo) {
      roles.push(oo.hierarchy.hierarchyCode);
    });
    if (roles.includes(to.matched[0].name)) {
      next();
    } else {
      if (to.matched[0].name == "primaryLogin") {
        next();
      } else {
        next(false);
      }
    }
  }
});
export default Router;
