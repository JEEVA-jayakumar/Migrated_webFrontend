// import something here
import Vue from "vue";
import "viewerjs/dist/viewer.css";
import Vuer from "v-viewer";

// leave the export, even if you don't use it
export default ({
  Vue
}) => {
  // something to do
  Vue.use(Vuer);
};
