import { boot } from 'quasar/wrappers'
import "viewerjs/dist/viewer.css";
import viewer from "v-viewer";

export default boot(({ app }) => {
  app.use(viewer, {
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
})
