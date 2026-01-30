// import something here
import "viewerjs/dist/viewer.css";
import customViewer from "v-viewer";
// leave the export, even if you don't use it
export default ({
  app,
  router,
  Vue
}) => {
  // something to do
  Vue.use(customViewer, {
    defaultOptions: {
      inline: true,
      toolbar: false,
      button: false,
    }
  });
}
