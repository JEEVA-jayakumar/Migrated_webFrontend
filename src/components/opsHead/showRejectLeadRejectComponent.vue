<template>
  <div>
    <q-dialog
      minimized
      no-backdrop-dismiss
      no-esc-dismiss
      v-model="toggleModal"
      :content-css="{padding:'30px',minWidth: '40vw'}"
    >
      <form>
        <div class="column group">
          <div class="text-h6 q-py-md">Are you sure want to reject?</div>
          <div>
            <q-input
              v-model="formData.leadInformation.reason"
              @blur="$v.formData.leadInformation.reason.$touch"
              :error="$v.formData.leadInformation.reason.$error"
              float-label="Remarks"
              color="primary"
            />
          </div>
          <div class="group">
            <q-btn
              icon="clear"
              color="negative"
              class="q-ma-sm float-right"
              @click="sendRemarks(formData)"
              align="right"
              label="Reject"
            />
            <q-btn
              icon="block"
              color="grey-5"
              @click="emitToggleRemarks()"
              class="q-ma-sm float-right text-dark"
              align="right"
              v-close-overlay
              label="Cancel"
            />
          </div>
        </div>
      </form>
    </q-dialog>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propToggleLeadModal", "propLeadDetails"],
  data() {
    return {
      toggleModal: this.propToggleLeadModal,
      itemDetails: this.propLeadDetails,
      formData: {
        leadInformation: {
          fieldName: "SAT exception queue KYC reject by OPS",
          reason: ""
        },
        leadId: this.propLeadDetails.id,
        defaultUrlValue: this.$EXCEPTION_QUEUE_KYC_OPS_HEAD_REJECT_URL_PARAM
      }
    };
  },
  validations: {
    formData: {
      leadInformation: {
        reason: {
          required
        }
      }
    }
  },
  computed: {
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },
  methods: {
    ...mapActions("OPSHead", [
      "FEED_EQ_KYC_FEEDBACK",
      "FETCH_ALL_EXCEPTION_KYC_DATA"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleRemarks() {
      this.$emit("toggleLeadModal");
    },
    sendRemarks(formDataDetails) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Processing .."
      });
        this.FEED_EQ_KYC_FEEDBACK(formDataDetails)
          .then(() => {
            this.$q.loading.hide()
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Rejected Lead : #" + formDataDetails.leadId,
              icon: "clear"
            });
            this.FETCH_ALL_EXCEPTION_KYC_DATA();
            this.$router.push("/ops/head/exceptions");
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
      }
    }
  }
};
</script>
