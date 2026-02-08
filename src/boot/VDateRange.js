// import something here
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import VDateRange from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

// leave the export, even if you don't use it
export default ({
  app,
  router,
  Vue
}) => {
  // something to do
  Vue.use(Vuetify);
  Vue.use(VDateRange);
}
