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
          <div class="text-h6 q-py-md">Approval confirmation</div>
          <div>
            <q-input
              v-model="formData.leadInformation.reason"
              float-label="Remarks"
              color="primary"
            />
          </div>
          <div class="group">
            <q-btn
              icon="done"
              color="positive"
              class="q-ma-sm float-right"
              @click="sendRemarks(formData)"
              align="right"
              label="Approve"
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
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propToggleLeadModal", "propLeadDetails"],
  data() {
    return {
      toggleModal: this.propToggleLeadModal,
      itemDetails: this.propLeadDetails,
      formData: {
        leadInformation: {
          fieldName: "SAT exception queue KYC approve by OPS",
          reason: ""
        },
        leadId: this.propLeadDetails.id,
        defaultUrlValue: this.$EXCEPTION_QUEUE_KYC_OPS_HEAD_APPROVE_URL_PARAM
      }
    };
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
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Processing .."
      });
      this.FEED_EQ_KYC_FEEDBACK(formDataDetails)
        .then(response => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Approved Lead : #" + formDataDetails.leadId,
            icon: "thumb_up"
          });
          this.$router.push("/ops/head/exceptions");
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Error in approving exception!",
            icon: "thumb_down"
          });
        });
    }
  }
};
</script>
