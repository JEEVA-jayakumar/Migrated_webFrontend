// import something here
import polyfills from "@babel/polyfill";
// leave the export, even if you don't use it
export default ({
  app,
  router,
  Vue
}) => {
  // something to do
  Vue.use(polyfills)
}
