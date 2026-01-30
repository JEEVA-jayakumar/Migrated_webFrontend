<template>
  <div>
    <q-datetime
      minimal
      modal
      format="YYYY-MM-DD"
      v-model="formData.leadVerificationStatus.expectedSubmitDate"
      @blur="$v.formData.leadVerificationStatus.expectedSubmitDate.$touch"
      :error="$v.formData.leadVerificationStatus.expectedSubmitDate.$error"
      float-label="Expected date of Doc Submission"
      type="date"
      class="q-mt-lg"
      color="red-6"
    />
    <q-input
      v-model="formData.leadVerificationStatus.soReason"
      type="textarea"
      disabled
      readonly
      float-label="SO's Remarks"
      :max-height="100"
      class="q-mt-lg"
      rows="1"
      color="red-6"
    />
    <q-input
      v-model="formData.leadVerificationStatus.reason"
      @blur="$v.formData.leadVerificationStatus.reason.$touch"
      :error="$v.formData.leadVerificationStatus.reason.$error"
      type="textarea"
      class="q-mt-lg"
      float-label="SAT Remarks"
      :max-height="100"
      rows="1"
      color="red-6"
    />
    <q-btn
      size="sm"
      align="right"
      @click="sendRemarks(formData,item)"
      rounded
      outline
      color="red-9"
      class="float-right q-mx-sm q-my-md"
    >Send</q-btn>
    <q-btn
      size="sm"
      align="right"
      rounded
      outline
      color="grey-9"
      class="float-right q-mx-sm q-my-md"
      @click="emitToggleRemarks(item)"
    >Cancel</q-btn>
  </div>
</template>

<script>
import { date } from "quasar";
import {
  required,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["item"],
  data() {
    return {
      model: "",
      itemDetails: this.item,
      formData: {
        leadInformation: {
          verifiedKycStatus: 3
        },
        leadVerificationStatus: {
          fieldName: "KYC",
          expectedSubmitDate: "",
          soReason: this.item.SORemarks,
          reason: "",
          leadInformation: {
            id: this.item.leadId
          }
        }
      }
    };
  },
  validations: {
    formData: {
      leadVerificationStatus: {
        reason: {
          required
        },
        expectedSubmitDate: {
          required
        }
      }
    }
  },
  computed: {
    ...mapGetters("ExceptionQueue", ["getExceptionQueueInfo"]),
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },
  methods: {
    ...mapActions("ExceptionQueue", [
      "FEED_SAT_EQ_KYC_FEEDBACK",
      "FETCH_ALL_EXCEPTIONS_DATA"
    ]),
    ...mapActions("commonLoader", ["UPDATE_DEVICE_ADDRESS"]),

    emitToggleRemarks(item) {
      this.$emit("toggleRemarks", item);
    },
    sendRemarks(formData, item) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.TOGGLE_COMMON_LOADER(true);
        this.FEED_SAT_EQ_KYC_FEEDBACK(formData)
          .then(() => {
            this.TOGGLE_COMMON_LOADER(false);
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                "Rejected Lead: #" +
                formData.leadVerificationStatus.leadInformation.id,
              icon: "clear"
            });
            this.FETCH_ALL_EXCEPTIONS_DATA();
          })
          .catch(error => {
            this.TOGGLE_COMMON_LOADER(false);
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
        this.$emit("toggleRemarks", item);
      }
    }
  }
};
</script>
