<template>
  <div>
    <div class="col-12 text-h6 q-my-lg text-weight-regular" align="center">
      KSN Enable
    </div>
    <form>
      <div class="row gutter-sm q-py-sm">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <q-input
            clearable
            v-model.trim="formData.tid"
            @blur="$v.formData.tid.$touch"
            :error="$v.formData.tid.$error"
            class="text-weight-regular text-grey-8"
            color="grey-9"
            float-label="*Enter TID"
            placeholder="Enter TID"
            maxlength="8"
            onkeypress="return (event.charCode > 47 && event.charCode < 59) || (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)"
          />
        </div>
      </div>
      <div class="full-width group" align="center">
        <q-btn  :disable="this.formData.tid.length != 8" size="md" type="button" color="purple-9" @click="fnSubmittid(formData)"
          >Submit</q-btn
        >
      </div>
    </form>
  </div>
</template>

<script>
import {
  required,
  email,
  requiredIf,
  branch_code,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric,
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "KsnEnable",
  components: {},
  data() {
    return {
      formData: {
        tid: "",
      },
    };
  },

  validations: {
    formData: {
      tid: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters("appDevice", ["getKsnData"]),
  },
  created() {},
  methods: {
    ...mapActions("appDevice", ["VERIFY_KSN"]),
    fnSubmittid(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review field again.");
        return;
      } else {
        this.$q.loading.show({
          delay: 100,
          spinnerColor: "purple-9",
          message: "Please wait..",
        });
        this.VERIFY_KSN(formData.tid)
          .then((response) => {
            this.ksnresponse = this.getKsnData;
            if (this.ksnresponse.status == 200) {
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: this.ksnresponse.body.message,
                icon: "thumb_up",
              });
              this.$router.push({ name: "KsnEnable" });
            } else {
              this.$q.loading.hide();
              this.$q.notify({
                type: "warning",
                color: "amber-9",
                position: "bottom",
                message: this.ksnresponse.body.message,
                icon: "thumb_up",
              });
            }
          })
          .catch((error) => {
            this.$q.loading.hide();
            this.$q.notify({
              type: "warning",
              color: "amber-9",
              position: "bottom",
              message: error.data.message,
            });
          });
      }
    },
  },
};
</script>
