<template>
  <div>
    <q-dialog
      minimized
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowservice()"
      :content-css="{ padding: '25px', minWidth: '30vw' }"
    >
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">Reject Reason</div>
          </div>
          <div class="col-md-12">
            <q-input
              v-model="formData.reason"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Enter the Reason"
              placeholder="reason"
            />
          </div>
          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowservice()"
              >Cancel</q-btn
            >
            <q-btn
              align="right"
              :disabled="submitDisabled()"
              @click="submitShortLead(formData)"
              color="purple-9"
              >submit</q-btn
            >
          </div>
        </div>
      </form>
    </q-dialog>
  </div>
</template>

<script>
import { required, maxLength, minLength } from "@vuelidate/validators";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowTicketReject", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowTicketReject,
      formData: {
        reason: "",
      },
    };
  },
  beforeMount() {
    // console.log("Hellow world ----->", JSON.stringify(this.propRowDetails));
  },
  computed: {
    ...mapGetters("equitasImplementedQueue", ["getservicereject"]),
  },

  methods: {
    ...mapActions("equitasImplementedQueue", ["SERVICE_TICKET_REJECT"]),

    emitfnshowservice() {
      this.$emit("emitfnshowservice");
    },
    submitShortLead(request) {
      // console.log("request", request);
      this.$q.loading.show({
        delay: 100, // ms
        spinnerColor: "purple-9",
        message: "Please wait..",
      });
      let requestParams = {
        id: this.propRowDetails.id,
        reason: {
          satRejectedRemarks: request.reason,
        },
      };
      this.SERVICE_TICKET_REJECT(requestParams)
        .then((response) => {
          this.$q.loading.hide();
          this.$emit("emitfnshowservice");
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "This lead is Rejected!",
            icon: "thumb_up",
          });
          location.reload();
        })
        .catch(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:
              error.body.message == null
                ? "Please Try Again Later !"
                : error.body.message,
            icon: "thumb_down",
          });
        });
    },
    submitDisabled() {
      if (this.formData.reason.length > 0) {
        const firstCharCode = this.formData.reason.charCodeAt(0);
        if (firstCharCode == 32) {
          this.formData.reason = this.formData.reason.trim();
          return true;
        } else if (firstCharCode == 10) {
          this.formData.reason = this.formData.reason.trim();
          return true;
        } else {
          return false;
        }
      } else {
        this.formData.reason = this.formData.reason.trim();
        return true;
      }
    },
  },
};
</script>
