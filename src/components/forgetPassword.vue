<template>
  <div>
    <q-dialog
      v-model="toggleModal"
      @hide="emitForgotPasswordToggle(toggleModal)"
      @escape-key="emitForgotPasswordToggle(toggleModal)"
      :content-css="{padding:'30px',minWidth:'35vw'}"
    >
      <div>
        <div class="text-h6 q-py-md">Forgot Password</div>
        <q-input
          v-model.trim="formData.email"
          class="text-weight-regular text-grey-8 q-py-md"
          color="grey-9"
          @blur="$v.formData.email.$touch"
          :error="$v.formData.email.$error"
          placeholder="Enter your email"
        />
        <q-btn
          color="negative"
          class="q-ma-sm float-right"
          @click="fnSendforgetPasswordSubmit(formData)"
          align="right"
          label="Send Email"
        />
        <q-btn
          align="right"
          color="grey-9"
          class="float-right q-ma-sm"
          @click="emitForgotPasswordToggle(toggleModal)"
        >Cancel</q-btn>
      </div>
    </q-dialog>
  </div>
</template>
<script>
import { required, email } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowForgetPassword"],

  data() {
    return {
      toggleModal: this.propShowForgetPassword,
      //Reject reason checkbox
      formData: {
        email: ""
      }
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    ...mapActions("Authentication", ["SEND_FORGOT_PASSWORD_LINK_MAIL"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    // Function to close modal
    emitForgotPasswordToggle() {
      this.$emit("emitfnShowForgetPasswordModal");
    },

    // function to send email to user a link
    fnSendforgetPasswordSubmit(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        this.TOGGLE_COMMON_LOADER(true);
        this.SEND_FORGOT_PASSWORD_LINK_MAIL(formData)
          .then(() => {
            this.$q.loading.hide();
            this.$emit("emitfnShowForgetPasswordModal");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "An email has been sent to you!",
              icon: "thumb_up"
            });
            this.$router.push({ name: "login" });
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
        this.TOGGLE_COMMON_LOADER(false);
      }
    }
  }
};
</script>
