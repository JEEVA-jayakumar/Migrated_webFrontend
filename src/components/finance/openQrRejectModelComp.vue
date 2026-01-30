<template>
    <div>
       <q-modal 
       v-model="showQrRejectModel" 
       @hide="emitToggleReject(showQrRejectModel)" 
       @escape-key="emitToggleReject(showQrRejectModel)"  
       :content-css="{padding:'50px'}"
       >
        <div>
          <div align="center" class="q-subheading q-mb-md capitalize">{{propShowQrRejectComponent.merchantName}}</div>
          <div align="center" class="text-light-blue q-title q-mb-md">#{{propShowQrRejectComponent.qrLeadNumber}}</div>
          <div align="left" class="text-weight-light text-grey-8 q-mb-md">Reason</div>
          <div class="gutter-xs">
            <q-radio 
            @blur="$v.formData.qrLeadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.qrLeadVerificationStatus.reasonType.$error" v-model="formData.qrLeadVerificationStatus.reasonType" val="Short Fund" color="grey-9" label="Short Fund" />
            <q-radio @blur="$v.formData.qrLeadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.qrLeadVerificationStatus.reasonType.$error" v-model="formData.qrLeadVerificationStatus.reasonType" val="Excess Fund" color="grey-9" label="Excess Fund" />
            <q-radio @blur="$v.formData.qrLeadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.qrLeadVerificationStatus.reasonType.$error" v-model="formData.qrLeadVerificationStatus.reasonType" val="Cheque Bounce" color="grey-9" label="Cheque Bounce" />
            <q-radio @blur="$v.formData.qrLeadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.qrLeadVerificationStatus.reasonType.$error" v-model="formData.qrLeadVerificationStatus.reasonType" val="No Fund" color="grey-9" label="No Fund" />
            <q-radio @blur="$v.formData.qrLeadVerificationStatus.reasonType.$touch"      
            :error="$v.formData.qrLeadVerificationStatus.reasonType.$error" v-model="formData.qrLeadVerificationStatus.reasonType" val="Others" color="grey-9" label="Others" />
          </div>
          <q-input
            type="textarea"
            placeholder="Type.."
            @blur="$v.formData.qrLeadVerificationStatus.reason.$touch"      
            :error="$v.formData.qrLeadVerificationStatus.reason.$error" 
            class="q-my-md"
            color="grey-9"
            align="left"
            value=""
            v-model="formData.qrLeadVerificationStatus.reason"
          />
          <q-btn color="negative" class="q-ma-sm float-right" @click="financeRejectSubmit(formData)" align="right" label="Reject" />
          <q-btn align="right" color="grey-9" 
            class="float-right q-ma-sm" @click="emitToggleReject(showQrRejectModel)">Cancel
          </q-btn>
        </div>
      </q-modal>
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
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["showQrRejectModel", "propShowQrRejectComponent"],

  data() {
    return {
      //Reject reason checkbox
      formData: {
        qrLeadInformation: {
          verifiedFinanceStatus: 3
        },
        qrLeadVerificationStatus: {
          status: 0,
          fieldName: "Finance",
          reasonType: "",
          reason: ""
        },
        leadId: this.propShowQrRejectComponent.id
      }
    };
  },

  validations: {
    formData: {
      qrLeadVerificationStatus: {
        reasonType: {
          required
        },
        reason: {
          required: requiredIf(function(formData) {
            // console.log(formData)
            return formData.reasonType == "Others";
          })
        }
      }
    }
  },

  methods: {
    ...mapActions("qrFinance", ["QR_REJECT_FINANCE_EXCEPTION"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    emitToggleReject(showQrRejectModel) {
      this.$emit("closeQrRejectModel", "reloadQrPaymentTrackerData");
    },
    financeRejectSubmit(formData) {
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
            this.QR_REJECT_FINANCE_EXCEPTION(formData)
              .then(() => {
                this.$emit("closeQrRejectModel");
                this.$emit("reloadQrPaymentTrackerData");
                this.$q.loading.hide()
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Rejected lead #" + formData.leadId,
                  icon: "clear"
                });
              })
              .catch(error => {
                this.$q.loading.hide()
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                  icon: "thumb_down"
                });
              });
          })
          .catch(() => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "No changes made!",
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>
