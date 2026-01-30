<template>
  <q-page>
    <!-- content -->
    <div class="row items-center window-height">
      <div class="col-md-5 gt-sm bg-grey-4" align="center">
        <div class="row items-center window-height full-width inline" align="center">
          <div class="col-auto no-padding full-width" align="center">
            <img src="~assets/images/logo.png" class="responsive vertical-align" style="width:200px" />
          </div>
        </div>
      </div>
      <div class="col-md-7 q-px-xl">
        <div class="row justify-center gutter-md">
          <div class="col-md-8" align="center">
            <div class="q-display-1 text-grey-9 text-weight-medium q-py-lg">Please Log In </div>
          </div>
          <div class="col-md-8">
            <q-input v-model.trim="formData.email" @blur="$v.formData.email.$touch" :error="$v.formData.email.$error"
              float-label="Email" color="grey-9" placeholder="Enter your email id"
              @keyup.enter="fuSubmitLoginDetails(formData)" />
          </div>
          <div class="col-md-8">
            <q-input v-model.trim="formData.password" @blur="$v.formData.password.$touch"
              :error="$v.formData.password.$error" placeholder="Enter your password"
              @keyup.enter="fuSubmitLoginDetails(formData)" type="password" float-label="Password" color="grey-9" />
            <!-- <p
              class="error"
              v-if="!$v.formData.password.strongPassword"
            >Strong passwords need to have a letter, a number, a special character, and be more than 8 characters long.</p>-->
          </div>
          <div class="col-md-8">
            <q-checkbox v-model="formData.rememberPassword" color="purple-9" label="Remember Password" />
          </div>
          <div class="col-md-8" align="center">
            <q-btn class="full-width text-weight-regular q-pa-md" no-caps color="purple-9"
              @click="fuSubmitLoginDetails(formData)" style="max-width:300px">Log In</q-btn>
          </div>
          <div class="col-md-8" align="center">
            <q-btn flat no-caps class="text-purple-9 text-weight-regular" color="white"
              @click="fnShowForgetPasswordModal">Forgot your password?</q-btn>
          </div>
        </div>
      </div>

      <!--START: Component: Show edit user -->
      <showForgetPasswordComp v-if="showForgetPassword" :propShowForgetPassword="showForgetPassword"
        @emitfnShowForgetPasswordModal="fnShowForgetPasswordModal"></showForgetPasswordComp>
      <!--END: Component: Show edit user -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  required,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import showForgetPasswordComp from "../components/forgetPassword.vue";
import * as CryptoJS from "crypto-js";
import phonepePendingCrmVue from "./crm/phonepePendingCrm.vue";
let AesUtil = function (keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function (salt, passPhrase) {
  var key = CryptoJS.PBKDF2("BijliWeAreMakers", CryptoJS.enc.Hex.parse(salt), {
    keySize: this.keySize,
    iterations: this.iterationCount
  });
  return key;
};

AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, "BijliWeAreMakers");
  var encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Hex.parse(iv)
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

AesUtil.prototype.decrypt = function (salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, "BijliWeAreMakers");
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: CryptoJS.enc.Hex.parse(iv)
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export default {
  name: "login",
  components: {
    showForgetPasswordComp
  },
  data() {
    return {
      showForgetPassword: false,
      formData: {
        email: "",
        password: "",
        rememberPassword: false
      }
    };
  },

  validations: {
    formData: {
      email: {
        required
      },
      password: {
        required
        // strongPassword(password) {
        //   return (
        //     /[a-z]/.test(password) && // checks for a-z
        //     /[0-9]/.test(password) && // checks for 0-9
        //     /\W|_/.test(password) && // checks for special char
        //     password.length >= 8
        //   );
        // }
      }
    }
  },

  computed: {
    ...mapGetters("Authentication", ["getUserAuthInfo"])
  },

  methods: {
    ...mapActions("Authentication", [
      "FEED_LOGIN_DATA",
      "FETCH_LOGGEDIN_USER_DATA"
    ]),

    fuSubmitLoginDetails(request) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        let iv = CryptoJS.lib.WordArray.random(128 / 8).toString(
          CryptoJS.enc.Hex
        );
        let salt = CryptoJS.lib.WordArray.random(128 / 8).toString(
          CryptoJS.enc.Hex
        );
        let aesUtil = new AesUtil(128, 1000);
        let ciphertext = aesUtil.encrypt(
          salt,
          iv,
          $("#key").text(),
          this.formData.password
        );
        let aesPassword = iv + "::" + salt + "::" + ciphertext;
        let password = btoa(aesPassword);
        let requestParams = {
          url: {
            email: request.email,
            password: password,
            rememberPassword: request.rememberPassword
          }
        };
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        this.FEED_LOGIN_DATA(requestParams)
          .then(response => {
            this.FETCH_LOGGEDIN_USER_DATA()
              .then(response => {
                let userInfo = JSON.parse(localStorage.getItem("u_i"));
                /* variables:
                authUserRoles => contains user info, which is saved in local storage of browser
                hierarchyRoleLevel =>  contains current object of roles array */
                let menuArr = [];
                _.map(userInfo.roles, function (oo) {
                  menuArr.push(oo.hierarchyRoleLevel);
                });
                if (menuArr.includes(this.$ROLE_HIERARCHY_OPERATION_SAT)) {
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Succesfully Logged In",
                    icon: "thumb_up",
                  });
                  this.$router.push({ name: "BijlipaySat" });
                } else if (menuArr.includes(this.$ROLE_BIJLIPAY_MANAGER)) {
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Succesfully Logged In",
                    icon: "thumb_up",
                  });
                  this.$router.push({ name: "adminDashboard" });
                } else if (
                  menuArr.includes(this.$ROLE_HIERARCHY_SALES_RSM) ||
                  menuArr.includes(this.$ROLE_HIERARCHY_SALES_ASM) ||
                  menuArr.includes(this.$ROLE_HIERARCHY_SALES_NATIONAL_HEAD)
                ) {
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Succesfully Logged In",
                    icon: "thumb_up",
                  });
                  this.$router.push({ name: "leadAllocation" });
                } else if (menuArr.includes(this.$ROLE_HIERARCHY_BANK_OPS)) {
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Succesfully Logged In",
                    icon: "thumb_up",
                  });
                  this.$router.push({ name: "assignShortLead" });
                } else if (menuArr.includes(this.$ROLE_HIERARCHY_OPERATIONS_HEAD)) {
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Succesfully Logged In",
                    icon: "thumb_up",
                  });
                  this.$router.push({ name: "exceptions" });
                } else if (
                  menuArr.includes(this.$ROLE_HIERARCHY_FINANCE_HEAD) ||
                  menuArr.includes(this.$ROLE_HIERARCHY_FINANCE_MANAGER) ||
                  menuArr.includes(this.$ROLE_HIERARCHY_FINANCE_EXECUTIVE)
                ) {
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Succesfully Logged In",
                    icon: "thumb_up",
                  });
                  this.$router.push({ name: "paymentVerificationTracker" });
                } else if (menuArr.includes(this.$ROLE_HIERARCHY_INVENTORY_OFFICER)) {
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Succesfully Logged In",
                    icon: "thumb_up",
                  });
                  this.$router.push({ name: "Bijlipay" });
                } else if (menuArr.includes(this.$ROLE_HIERARCHY_KSN)) {
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Succesfully Logged In",
                    icon: "thumb_up",
                  });
                  this.$router.push({ name: "Ksn" });
                } else if (menuArr.includes(this.$HIERARCHY_CRM1)) {
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Succesfully Logged In",
                    icon: "thumb_up",
                  });
                  this.$router.push({ name: "phonepePendingCrm" });
                } else {
                  this.$q.notify({
                    type: "warning",
                    position: "bottom",
                    message: "Permission denied.",
                  });
                }
                this.$q.loading.hide();
              })
              .catch((error) => {
                this.$q.loading.hide();
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Something went wrong! Contact administrator",
                  icon: "thumb_down",
                });
              });
          })
          .catch((error) => {
            this.$q.loading.hide();
            if (error.status == 401) {
              this.$q.notify({
                type: "warning",
                position: "bottom",
                message: "Oops! Incorrect credentials",
              });
            } else if (error.status == 423) {
              this.$q.notify({
                type: "warning",
                position: "bottom",
                message: "Your Accout is Locked, Please Contact Admin",
              });
            } else {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message:
                  error.body.message == null
                    ? "Please Try Again Later !"
                    : error.body.message,
                icon: "thumb_down",
              });
            }
          });
      }
    },
    fnShowForgetPasswordModal() {
      this.showForgetPassword = !this.showForgetPassword;
    },
  },
};
</script>

<style></style>
