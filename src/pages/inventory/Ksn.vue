<template>
  <div>
    <div class="col-12 q-title q-my-lg text-weight-regular" align="center">
      OTP Verification
    </div>
    <form>
      <div class="row gutter-sm q-py-sm">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <q-input
            clearable
            v-model.trim="formData.otp"
            @blur="$v.formData.otp.$touch"
            :error="$v.formData.otp.$error"
            class="text-weight-regular text-grey-8"
            color="grey-9"
            float-label="*Enter OTP"
            placeholder="Enter OTP"
            maxlength="6"
            onkeypress="return (event.charCode > 47 && event.charCode < 59)"
          />
        </div>
      </div>
      <div class="full-width group" align="center">
        <q-btn
          :disable="this.formData.otp.length != 6"
          size="md"
          type="button"
          color="purple-9"
          @click="fnSubmitotp(formData)"
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
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Ksn",
  components: {},
  data() {
    return {
      formData: {
        otp: "",
      },
    };
  },

  validations: {
    formData: {
      otp: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters("appDevice", ["getOtpData", "getOtpValue", "getMobileNum"]),
  },
  created() {
    this.ajaxLoadLeadSource();
  },
  methods: {
    ...mapActions("appDevice", ["VERIFY_OTP_DATA", "SEND_OTP", "VERIFY_MOB_NUM"]),
    fnSubmitotp(formData) {
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
        this.VERIFY_OTP_DATA(formData.otp)
          .then((response) => {
            this.otpresponse = this.getOtpData;
            if (this.otpresponse.status == 200) {
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: this.otpresponse.body.message,
                icon: "thumb_up",
              });
              this.$router.push({ name: "KsnEnable" });
            } else {
              this.$q.loading.hide();
              this.$q.notify({
                type: "warning",
                color: "amber-9",
                position: "bottom",
                message: this.otpresponse.body.message,
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
    ajaxLoadLeadSource() {
      this.$q.loading.show({
        delay: 100,
        spinnerColor: "purple-9",
        message: "Please wait..",
      });
      const mobileverify = {
        mblNo: JSON.parse(localStorage.getItem("u_i")).user.contactNumber,
      };
      this.VERIFY_MOB_NUM(mobileverify)
        .then((response) => {
          this.mobiledata = this.getMobileNum;
          if (this.mobiledata.status == 200) {
            this.$q.loading.show({
              delay: 100,
              spinnerColor: "purple-9",
              message: "Please wait..",
            });
            this.SEND_OTP()
              .then((response) => {
                this.otpdata = this.getOtpValue;
                if (this.otpdata.status == 200) {
                  this.$q.loading.hide();
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: this.otpresponse.body.message,
                    icon: "thumb_up",
                  });
                } else {
                  this.$q.loading.hide();
                  this.$q.notify({
                    type: "warning",
                    color: "amber-9",
                    position: "bottom",
                    message: this.otpresponse.body.message,
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
          } else {
            this.$q.loading.hide();
            this.$q.notify({
              type: "warning",
              color: "amber-9",
              position: "bottom",
              message: this.mobiledata.body.message,
              icon: "thumb_up",
            });
          }
        })
        .catch((error) => {
          if (error.body.message == "Value already present") {
            this.$q.loading.show({
              delay: 100,
              spinnerColor: "purple-9",
              message: "Please wait..",
            });
            this.SEND_OTP()
              .then((response) => {
                this.otpdata = this.getOtpValue;
                if (this.otpdata.status == 200) {
                  this.$q.loading.hide();
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: this.otpresponse.body.message,
                    icon: "thumb_up",
                  });
                } else {
                  this.$q.loading.hide();
                  this.$q.notify({
                    type: "warning",
                    color: "amber-9",
                    position: "bottom",
                    message: this.otpresponse.body.message,
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
          } else {
            this.$q.loading.hide();
            this.$q.notify({
              type: "warning",
              color: "amber-9",
              position: "bottom",
              message: error.data.message,
            });
          }
        });
    },
  },
};
</script>
