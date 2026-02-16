import { boot } from 'quasar/wrappers'
import "viewerjs/dist/viewer.css";
import Vuer from "v-viewer";

export default boot(({ app }) => {
  app.use(Vuer);
});
