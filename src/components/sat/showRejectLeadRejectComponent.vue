<template>
  <div>
    <q-modal 
        minimized
        no-backdrop-dismiss	
        no-esc-dismiss	
        v-model="toggleModel"  
        :content-css="{padding:'30px',minWidth: '40vw'}"
        class="customModalOverlay"
    >
      <!-- START >> Lead reject -->
      <form>
        <div class="column group">
           <div class="q-title q-py-md">
            Are you sure want to reject?
           </div>
           <div>
            <q-input
              class=" no-pointer-events"
              v-model="formData.soReason"
              float-label="SO Remarks"
              color="light-blue" 
            />
          </div>
          <div>
            <q-input
              v-model="formData.leadInformation.kycSatRemark"
              @blur="$v.formData.leadInformation.kycSatRemark.$touch"      
              :error="$v.formData.leadInformation.kycSatRemark.$error" 
              float-label="SAT Remarks"
              color="light-blue" 
            />
          </div>
          <div class="group">
            <q-btn icon="clear" color="negative" class="q-ma-sm float-right" @click="sendRemarks(formData)" align="right" label="Reject" />
            <q-btn icon="block" color="grey-5" @click="emitToggleRemarks()" class="q-ma-sm float-right text-dark" align="right" v-close-overlay label="Cancel" />
          </div>
        </div>
      </form>
      <!-- END >> Lead reject -->
    </q-modal>
  </div>
</template>

<script>
import { date } from "quasar";
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propToggleLeadModal", "propLeadDetails"],
  data() {
    return {
      toggleModel: this.propToggleLeadModal,
      itemDetails: this.propLeadDetails,
      formData: {
        soReason: this.propLeadDetails.reason,
        leadInformation: {
          fieldName: "SAT exception queue KYC reject",
          kycSatRemark: ""
        },
        leadId: this.propLeadDetails.id,
        defaultUrlValue: this.$EXCEPTION_QUEUE_KYC_SAT_REJECT_URL_PARAM
      }
    };
  },
  validations: {
    formData: {
      leadInformation: {
        kycSatRemark: {
          required
        }
      }
    }
  },
  computed: {
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },
  methods: {
    ...mapActions("ExceptionQueue", ["FEED_SAT_EQ_KYC_FEEDBACK"]),
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
        this.FEED_SAT_EQ_KYC_FEEDBACK(formData)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Rejected Lead : #" + formData.leadId,
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
