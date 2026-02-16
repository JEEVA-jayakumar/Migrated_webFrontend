import { boot } from 'quasar/wrappers'
import { useVuelidate } from '@vuelidate/core'

export default boot(({ app }) => {
  app.mixin({
    setup() {
      const validations = this?.$options?.validations
      if (validations) {
        return { $v: useVuelidate() }
      }
    },
    beforeCreate() {
        // Fallback for options API code
        if (this.$options.validations) {
            this.$v = useVuelidate(this.$options.validations, this)
        }
    }
  })
})
