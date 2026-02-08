<template>
  <q-page>
    <!-- content -->
    <div class="row items-center justify-center window-height">
      <div class="col-md-6 q-px-xl">
        <div class="row justify-center gutter-md">
          <div class="col-md-8" align="center">
            <div class="q-display-1 text-grey-9 text-weight-medium q-py-lg">Password Setup</div>
          </div>
          <div class="col-md-8">
            <q-input
              @blur="$v.formData.requestParam.password.$touch"
              :error="$v.formData.requestParam.password.$error"
              v-model="formData.requestParam.password"
              type="password"
              float-label="Enter new password"
              color="grey-9"
            />
            <p
              class="error"
              v-if="!$v.formData.requestParam.password.required"
            >this field is required</p>
            <br />

            <p
              class="error"
              v-if="!$v.formData.requestParam.password.strongPassword"
            >Strong passwords need to have a letter, a number, a special character, and be more than 8 characters long.</p>
          </div>
          <div class="col-md-8">
            <q-input
              @blur="$v.formData.passwordRe.$touch"
              :error="$v.formData.passwordRe.$error"
              v-model="formData.passwordRe"
              type="password"
              float-label="Re-enter new password"
              color="grey-9"
            />
            <p class="error" v-if="!$v.formData.passwordRe.required">this field is required</p>
            <br />

            <p
              class="error"
              v-if="!$v.formData.passwordRe.strongPassword"
            >Strong passwords need to have a letter, a number, a special character, and be more than 8 characters long.</p>
          </div>
          <div class="col-md-8" align="center">
            <q-btn
              class="full-width text-weight-regular q-pa-md"
              no-caps
              color="purple-9"
              @click="fnSubmitForgetPassword(formData)"
              style="max-width:300px"
            >Submit</q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  required,
  email,
  password,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric,
  sameAs
} from "@vuelidate/validators";

export default {
  name: "passwordrecovery",
  data() {
    return {
      formData: {
        requestParam: {
          password: ""
        },
        passwordRe: "",
        token: this.$route.params.id
      }
    };
  },

  validations: {
    formData: {
      requestParam: {
        password: {
          required,
          strongPassword(password) {
            return (
              /[a-z]/.test(password) && // checks for a-z
              /[0-9]/.test(password) && // checks for 0-9
              /\W|_/.test(password) && // checks for special char
              password.length >= 8
            );
          }
        }
      },
      passwordRe: {
        required,
        strongPassword(password) {
          return (
            /[a-z]/.test(password) && // checks for a-z
            /[0-9]/.test(password) && // checks for 0-9
            /\W|_/.test(password) && // checks for special char
            password.length >= 8
          );
        }
      }
    }
  },

  computed: {
    ...mapGetters("Authentication", ["getResetPasswordConfirmation"]),
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },

  methods: {
    ...mapActions("Authentication", ["FEED_AFTER_RESET_PASSWORD_INFO"]),
    fnSubmitForgetPassword(values) {
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        if (values.requestParam.password == values.passwordRe) {
          this.FEED_AFTER_RESET_PASSWORD_INFO(values)
            .then(response => {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Password successfully updated",
                icon: "thumb_up"
              });
              this.$router.push({ name: "login" });
            })
            .catch(() => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Error .. Please try again!",
                icon: "thumb_down"
              });
            });
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Oops! Password mismatch",
            icon: "thumb_down"
          });
        }
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
  font-size: 12px;
  position: absolute;
  text-transform: lowercase;
}
</style>
