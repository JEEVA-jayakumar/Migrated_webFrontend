<template>
  <div>
    <q-dialog
      no-esc-dismiss
      no-backdrop-dismiss
      v-model="toggleModel"
      class="customModalOverlay"
      :content-css="{minWidth:'50%',height:'auto',maxHeight:'50vh',margin:'20px',padding:'20px'}"
    >
      <!-- START >> Lead reject -->
      <div class="column group">
        <div class="text-h6 q-py-md">Are you sure want to reject?</div>
        <div>
          <q-input
            v-model="formData.leadVerificationStatus.reason"
            float-label="SAT Remarks"
            color="grey-9"
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
      <!-- END >> Lead reject -->
    </q-dialog>
  </div>
</template>

<script>
import { date } from "quasar";
import { required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propToggleLeadModal", "propLeadDetails"],
  data() {
    return {
      toggleModel: this.propToggleLeadModal,
      itemDetails: this.propLeadDetails,
      formData: {
        leadVerificationStatus: {
          fieldName: "Bank Subvention",
          reason: "Bank Issues"
        },
        leadInformation: {
          id: this.propLeadDetails.id,
          verifiedBanksubventionStatus: 0
        }
      }
    };
  },
  validations: {
    formData: {
      leadVerificationStatus: {
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
    ...mapActions("ExceptionQueue", ["FEED_SAT_EQ_BANK_FEEDBACK"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    emitToggleRemarks() {
      this.$emit("toggleLeadModal");
    },
    sendRemarks(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Processing .."
        });
        this.FEED_SAT_EQ_BANK_FEEDBACK(formData)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Rejected Lead : #" + formData.leadInformation.id,
              icon: "clear"
            });
            this.$router.push("/sat/exception/queue");
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
      }
    }
  }
};
</script>
