<template>
  <div>
    <q-modal
      minimized
      no-backdrop-dismiss
      no-esc-dismiss
      v-model="toggleModal"
      :content-css="{padding:'20px',minWidth:'40vw'}"
    >
      <div class="col-12 q-title q-py-md">
        <q-icon name="security" />Change password
      </div>
      <div class="column group" v-show="!currentPasswordMatched">
        <div class="col-12">
          <q-input
            type="password"
            color="grey-9"
            v-model="formData.currentPassword"
            @blur="$v.formData.currentPassword.$touch"
            :error="$v.formData.currentPassword.$error"
            float-label="Current Password*"
          />
        </div>
        <div class="col-12">
          <q-input
            type="password"
            color="grey-9"
            v-model="formData.newpassword"
            @blur="$v.formData.newpassword.$touch"
            :error="$v.formData.newpassword.$error"
            float-label="New Password*"
          />
          <!-- <p class="error1" v-if="!$v.formData.newpassword.required">this field is required</p>
          <br />-->
          <p
            class="error1"
            v-if="!$v.formData.newpassword.strongPassword"
          >Strong passwords need to have a letter, a number, a special character, and be more than 8 characters long.</p>
        </div>
        <br />
        <div class="col-12">
          <q-input
            type="password"
            color="grey-9"
            v-model="formData.retypepassword"
            @blur="$v.formData.retypepassword.$touch"
            :error="$v.formData.retypepassword.$error"
            float-label="Confirm New Password*"
          />
          <!-- <p class="error1" v-if="!$v.formData.retypepassword.required">this field is required</p>
          <br />-->

          <p
            class="error1"
            v-if="!$v.formData.retypepassword.strongPassword"
          >Strong passwords need to have a letter, a number, a special character, and be more than 8 characters long.</p>
        </div>
        <div class="col-12 group">
          <q-btn
            color="primary"
            class="q-ma-sm float-right"
            @click="submitPasswordChangeRequest(formData)"
            align="right"
            label="Submit"
          />
          <q-btn
            outline
            color="dark"
            class="q-ma-sm float-right"
            @click="emitToggleMyAccount()"
            align="right"
            label="Cancel"
          />
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "changePassword",
  props: ["propsToggleModal"],
  data() {
    return {
      toggleModal: this.propsToggleModal,
      currentPasswordMatched: false,
      formData: {
        currentPassword: "",
        newpassword: "",
        retypepassword: ""
      }
    };
  },

  validations: {
    formData: {
      currentPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(15)
      },
      newpassword: {
        required,
        strongPassword(newpassword) {
          return (
            /[a-z]/.test(newpassword) && // checks for a-z and A-Z
            /[0-9]/.test(newpassword) && // checks for 0-9
            /\W|_/.test(newpassword) && // checks for special char
            newpassword.length >= 8
          );
        }
      },
      retypepassword: {
        required,
        strongPassword(newpassword) {
          return (
            /[a-z]/.test(newpassword) && // checks for a-z
            /[0-9]/.test(newpassword) && // checks for 0-9
            /\W|_/.test(newpassword) && // checks for special char
            newpassword.length >= 8
          );
        }
      }
    }
  },
  methods: {
    ...mapActions("Authentication", ["CHANGE_PASSWORD"]),
    emitToggleMyAccount() {
      this.$emit("propsToggleModal");
    },
    submitPasswordChangeRequest(finalFormData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else if (
        this.$v.formData.newpassword.$modal !=
        this.$v.formData.retypepassword.$modal
      ) {
        // this.$q.notify("Oops! password didn't match.");
        this.$q.notify("old and new password must be same.");
      } else {
        this.CHANGE_PASSWORD({ password: finalFormData.newpassword.toString() })
          .then(() => {
            this.$emit("propsToggleModal");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Password changed successfully",
              icon: "thumb_up"
            });
            this.$router.push({ name: "login" });
          })
          .catch(error => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>

<style>
.error1 {
  color: grey;
}
</style>
