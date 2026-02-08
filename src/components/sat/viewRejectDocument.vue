<template>
  <div>
    <q-dialog
      minimized
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowConvertToSat()"
      :content-css="{padding:'25px',minWidth: '30vw'}"
    >
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">Reject Reason</div>
          </div>
          <div class="col-md-12">
            <q-input
              @keyup.enter="submitShortLead(formData)"
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
              @click="emitfnshowConvertToSat()"
            >Cancel</q-btn>
            <q-btn align="right" @click="submitShortLead(formData)" color="purple-9">submit</q-btn>
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
  props: ["propShowViewReject", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowViewReject,
      viewBinding: {},
      formData: {
        reason: ""
      },
      formData: {
        reason: "",
        data: this.propRowDetails.id
      }
    };
  },

  computed: {
    ...mapGetters("DocumentApprove", [
      "getDocumentApprove",
      "getDocumentReject"
    ]),
    ...mapGetters("equitasImplementedQueue", ["getEquitasReport"])
  },

  methods: {
    ...mapActions("DocumentApprove", ["DOCUMENT_APPROVE", "DOCUMENT_REJECT"]),
    ...mapActions("equitasImplementedQueue", ["EQUITAS_TRACKER_LIST"]),

    emitfnshowConvertToSat() {
      this.$emit("emitfnshowConvertToSat");
    },
    submitShortLead(request) {
      let requestParams = {
        data: {
          data: request.data
        },
        url: {
          reason: request.reason
        }
      };
      this.DOCUMENT_REJECT(requestParams)
        .then(response => {
          this.$q.loading.hide();
          this.$emit("emitfnshowConvertToSat");
          // this.EQUITAS_TRACKER_LIST();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "This lead is Rejected!",
            icon: "thumb_up"
          });
          location.reload();
        })
        .catch(() => {
          this.$q.loading.hide();
          // this.EQUITAS_TRACKER_LIST();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
            icon: "thumb_down"
          });
          // this.$router.push("sat/lead/lead/view/audocuments");
        });
    },
    ajaxmerchant() {
      this.getEquitasReport();
    },
    fnleadSource(item) {
      this.formData.leadSource1 = item.id;
      this.formData.leadSource = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        merchantType: this.formData.merchantCategory1
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear"
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
        }
      });
    },
    fnDevice(item) {
      this.formData.deviceId = item.id;
      this.formData.device = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        merchantType: this.formData.merchantCategory1
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear"
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
        }
      });
    },
    fnPlan(item) {
      this.formData.planId = item.id;
      this.formData.plan = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        plan: this.formData.planId
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.recurringFees = self.categoryBasedRental.monthlyFees;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear"
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
    fnMerchantCategory(item) {
      this.formData.merchantCategory1 = item.id;
      this.formData.merchantCategory = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        merchantType: this.formData.merchantCategory1
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear"
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
        }
      });
    },
    fnCategoryBasedMdr(request) {
      let formData = {
        leadSource: this.getActiveLeadSource.id,
        device: request.device,
        merchantType: request.merchantType
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear"
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
        }
      });
    },
    fnCategoryBasedRental(request) {
      let formData = {
        leadSource: request.leadSource,
        device: request.device,
        plan: request.plan
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.monthlyFees = self.categoryBasedRental.monthlyFees;
        } else if (response.data == null) {
          this.formData.setupFees = 0;
          this.formData.monthlyFees = 0;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear"
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    }
  }
};
</script>
