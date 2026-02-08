import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
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
export default Router;