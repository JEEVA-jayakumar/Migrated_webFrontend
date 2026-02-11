import { boot } from 'quasar/wrappers'
import moment from 'moment'

export default boot(({ app }) => {
  app.config.globalProperties.$moment = moment
})
