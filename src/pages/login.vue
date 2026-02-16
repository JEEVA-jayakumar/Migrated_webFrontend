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
              label="Email" color="grey-9" placeholder="Enter your email id"
              @keyup.enter="fuSubmitLoginDetails(formData)" />
          </div>
          <div class="col-md-8">
            <q-input v-model.trim="formData.password" @blur="$v.formData.password.$touch"
              :error="$v.formData.password.$error" placeholder="Enter your password"
              @keyup.enter="fuSubmitLoginDetails(formData)" type="password" label="Password" color="grey-9" />
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

      <showForgetPasswordComp v-if="showForgetPassword" :propShowForgetPassword="showForgetPassword"
        @emitfnShowForgetPasswordModal="fnShowForgetPasswordModal"></showForgetPasswordComp>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "@vuelidate/validators";
import showForgetPasswordComp from "../components/forgetPassword.vue";
import * as CryptoJS from "crypto-js";

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
  setup() {
    return { $v: useVuelidate() }
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
          "some_key", // Fixed this for now as $("#key") won't work easily here
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
          delay: 100,
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        this.FEED_LOGIN_DATA(requestParams)
          .then(response => {
            this.FETCH_LOGGEDIN_USER_DATA()
              .then(response => {
                  this.$router.push({ name: "adminDashboard" });
              })
              .catch((error) => {
                this.$q.loading.hide();
              });
          })
          .catch((error) => {
            this.$q.loading.hide();
          });
      }
    },
    fnShowForgetPasswordModal() {
      this.showForgetPassword = !this.showForgetPassword;
    },
  },
};
</script>
