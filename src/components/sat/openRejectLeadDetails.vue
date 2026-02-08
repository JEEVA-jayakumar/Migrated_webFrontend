<template>
  <!--q-modal v-model="showRejectLeadDetailsModel" @hide="emitToggleReject(showRejectLeadDetailsModel)" @escape-key="emitToggleReject(showRejectLeadDetailsModel)" :content-css="{ padding: '75px' }">
    </q-dialog-->
  <div class="row">
    <div class="col-12 text-h6 q-pa-md text-weight-regular bottom-border">
      Reject Lead Details
    </div>
    <div class="col-12 text-h6 q-pa-md">
      <div align="center" class="text-light-blue text-h6 q-mb-md">
        #{{ propShowRejectLeadDetailsComponent.leadName }}
      </div>
      <div align="center" class="text-light-blue text-h6 q-mb-md">
        #{{ propShowRejectLeadDetailsComponent.leadId }}
      </div>
      <div class="col-md-12">
        <q-input
          color="grey-9"
          v-model="formData.device"
          float-label="Device Type"
        />
      </div>
      <div class="col-md-12">
        <div align="center" class="col-md-10 text-light-blue text-h6 q-mb-md">
          Reason Type
        </div>
        <q-radio
          @blur="$v.formData.leadVerificationStatus.reasonType.$touch"
          :error="$v.formData.leadVerificationStatus.reasonType.$error"
          v-model="formData.leadVerificationStatus.reasonType"
          val="Wrong Device Type"
          color="grey-9"
          label="Wrong Device Type"
        />
        <q-radio
          @blur="$v.formData.leadVerificationStatus.reasonType.$touch"
          :error="$v.formData.leadVerificationStatus.reasonType.$error"
          v-model="formData.leadVerificationStatus.reasonType"
          val="Others"
          color="grey-9"
          label="Others"
        />
        <div class="text-negative q-py-xs group text-caption" v-if="$v.formData.leadVerificationStatus.reasonType.$error">
          <div v-if="$v.formData.leadVerificationStatus.reasonType.$params.required">
            <q-icon color="negative" name="warning" />&nbsp;Required
          </div>
        </div>
        <q-input
          type="textarea"
          placeholder="Type Your Reason Here...."
          @blur="$v.formData.leadVerificationStatus.reason.$touch"
          :error="$v.formData.leadVerificationStatus.reason.$error"
          class="q-my-md"
          color="grey-9"
          align="left"
          value=""
          v-model="formData.leadVerificationStatus.reason"
        />
        <div align="center" class="col-md-10 text-light-blue text-h6 q-mb-md">
          <q-btn
            color="negative"
            class="q-ma-sm float-right"
            @click="leadRejectSubmit(formData)"
            align="center"
            label="Reject"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  required,
  requiredIf,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["showRejectLeadDetailsModel", "propShowRejectLeadDetailsComponent"],
  data() {
    return {
      //Reject reason checkbox
      formData: {
        leadInformation: {
          verifiedFinanceStatus: ""
        },
        leadVerificationStatus: {
          status: 0,
          fieldName: "Device",
          reasonType: "",
          reason: ""
        },
        device: "",
        leadId: ""
      },
      propLeadInformation: {},
      propsRowDetails: {}
    };
  },

  validations: {
    formData: {
      leadVerificationStatus: {
        reason: {
          required
        },
        reasonType: {
          required
        }
      }
    }
  },
  beforeMount() {
    this.formData.device = this.propShowRejectLeadDetailsComponent.device;
    this.formData.leadId = this.propShowRejectLeadDetailsComponent.leadId;
    this.formData.leadInformation.verifiedFinanceStatus = this.propShowRejectLeadDetailsComponent.leadInformation.verifiedFinanceStatus;
  },
  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
    ...mapGetters("SatLeadValidation", ["getShortLeadInfo"])
  },
  methods: {
    ...mapActions("Finance", ["REJECT_LEAD_EXCEPTION"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
    ...mapActions("SatLeadValidation", ["FETCH_SHORT_LEAD_DATA"]),
    emitToggleReject(showRejectLeadDetailsModel) {
      this.$emit("closeRejectLeadDetailsModel", "closeReject");
    },
    leadRejectSubmit(formData) {
      // let
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to reject the lead?",
            ok: "Continue",
            cancel: "Cancel"
          })
          .then(() => {
            this.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Processing .."
            });
            this.REJECT_LEAD_EXCEPTION(formData)
              .then(() => {
                this.$emit("closeRejectLeadDetailsModel");
                 this.$emit("closeReject");
                this.$q.loading.hide();
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Rejected lead #" + formData.leadId,
                  icon: "clear"
                });
              })
              .catch(error => {
                this.$q.loading.hide();
                this.$emit("closeRejectLeadDetailsModel");
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message:
                    error.body.message == null
                      ? "Please Try Again Later !"
                      : error.body.message,
                  icon: "thumb_down"
                });
              });
          });
      }
    }
  }
};
</script>
