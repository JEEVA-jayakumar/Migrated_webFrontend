import { boot } from 'quasar/wrappers'
import { VuelidatePlugin } from '@vuelidate/core'

export default boot(({ app }) => {
  app.use(VuelidatePlugin)
})
