<template>
  <div>
    <q-modal
      minimized
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowservice()"
      :content-css="{ padding: '50px', minWidth: '40vw' }"
    >
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Approve the Lead</div>
          </div>

          <div class="col-md-12">
            <q-input
              disable
              class="no-margin"
              float-label="TID"
              v-model.trim="formData.tid"
            />
          </div>
          <div class="col-md-12">
            <q-input
              disable
              class="no-margin"
              float-label="TICKET ID"
              v-model.trim="formData.ticketid"
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
            <q-btn align="right" @click="submitShortLead()" color="purple-9"
              >submit</q-btn
            >
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowTicketApprove", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowTicketApprove,
      formData: {
        tid: this.propRowDetails.serviceRequestData.tid,
        ticketid: this.propRowDetails.serviceRequestData.serviceReqTicketId,
      },
    };
  },
  beforeMount() {},
  computed: {
    ...mapGetters("equitasImplementedQueue", ["getserviceapprove"]),
  },
  methods: {
    ...mapActions("equitasImplementedQueue", ["SERVICE_TICKET_APPROVE"]),

    emitfnshowservice() {
      this.$emit("emitfnshowservice");
    },
    submitShortLead() {
      this.$q.loading.show({
        delay: 100,
        spinnerColor: "purple-9",
        message: "Please wait..",
      });
      this.SERVICE_TICKET_APPROVE(this.propRowDetails)
        .then(() => {
          this.$q.loading.hide();
          this.$emit("emitfnshowservice");
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Approved successfully",
            icon: "thumb_up",
          });
          location.reload();
        })
        .catch((error) => {
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
  },
};
</script>
