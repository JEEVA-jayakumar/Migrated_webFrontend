// import something here
import "viewerjs/dist/viewer.css";
import viewer from "v-viewer";
// leave the export, even if you don't use it
export default ({
  app,
  router,
  Vue
}) => {
  // something to do
  Vue.use(viewer, {
    defaultOptions: {
      toolbar: false,
      button: false,
      navbar: false,
      zoomRatio: 0.5,
      minZoomRatio: 0.2,
      maxZoomRatio: 2,
      movable: false,
      initialViewIndex: 0
    }
  });
}
