<template>
  <q-page>
    <div class="q-ma-md">
      <!-- Merchant details -->
      <div class="row q-ma-xs">
        <div class="col">
          <div class="q-title q-my-md capitalize">{{shortLead.leadName}}</div>
          <div
            class="text-primary cursor-pointer"
            @click="toggleLeadInformation(shortLead)"
          ># {{shortLead.id}}</div>
        </div>
        <div class="col">
          <div class="q-title q-my-md">Contact</div>
          <div class="no-margin">{{shortLead.contactNumber}}</div>
          <div>{{shortLead.alternateContactNumber}}</div>
        </div>
        <div class="col">
          <div class="q-title q-my-md">Address</div>
          <div class="capitalize">{{shortLead.leadAddress}}</div>
        </div>
      </div>

      <!-- Device, Exception, Payment, MDR and Documents -->
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <!-- Device -->
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">
                      Device -
                      {{shortLead.deviceCount}}
                      {{shortLead.device.deviceName}}
                    </div>
                  </div>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Plan</q-item-main>
                      <q-item-side>{{shortLead.plan.planName}}</q-item-side>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Setup Fees</q-item-main>
                      <q-item-side>Rs. {{formData.leadInformation.setupGivenFees}}</q-item-side>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Recurring Fees</q-item-main>
                      <q-item-side>Rs. {{formData.leadInformation.recurringGivenFees}}</q-item-side>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Merchant Category</q-item-main>
                      <q-item-side>{{shortLead.merchantCategory.merchantCategoryName}}</q-item-side>
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
            </div>

            <!-- MDR -->
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <span class="q-body-1 text-weight-medium">MDR</span>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list no-border>
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          type="number"
                          color="grey-9"
                          float-label="Debit <= 2000 (%)"
                          :class="[shouldShowGivenPricefield?'':'no-pointer-events']"
                          :readonly="!shouldShowGivenPricefield"
                          v-model="formData.leadInformation.debitLessthanAmount"
                        />
                      </q-item-main>
                      <q-item-main>
                        <q-input
                          type="number"
                          color="grey-9"
                          float-label="Debit > 2000 (%)"
                          :class="[shouldShowGivenPricefield?'':'no-pointer-events']"
                          :readonly="!shouldShowGivenPricefield"
                          v-model="formData.leadInformation.debitGreaterthanAmount"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          type="number"
                          color="grey-9"
                          float-label="Std CC (%)"
                          :class="[shouldShowGivenPricefield?'':'no-pointer-events']"
                          :readonly="!shouldShowGivenPricefield"
                          v-model="formData.leadInformation.stdCC"
                        />
                      </q-item-main>
                      <q-item-main>
                        <q-input
                          type="number"
                          color="grey-9"
                          float-label="Premium CC (%)"
                          :class="[shouldShowGivenPricefield?'':'no-pointer-events']"
                          :readonly="!shouldShowGivenPricefield"
                          v-model="formData.leadInformation.premiumCC"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          type="number"
                          color="grey-9"
                          float-label="Corp Pre CC (%)"
                          :class="[shouldShowGivenPricefield?'':'no-pointer-events']"
                          :readonly="!shouldShowGivenPricefield"
                          v-model="formData.leadInformation.corpCC"
                        />
                      </q-item-main>
                      <q-item-main>
                        <q-input
                          type="number"
                          color="grey-9"
                          float-label="Intl Pre CC (%)"
                          :class="[shouldShowGivenPricefield?'':'no-pointer-events']"
                          :readonly="!shouldShowGivenPricefield"
                          v-model="formData.leadInformation.intlCC"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          type="number"
                          color="grey-9"
                          float-label="Super Pre CC (%)"
                          :class="[shouldShowGivenPricefield?'':'no-pointer-events']"
                          :readonly="!shouldShowGivenPricefield"
                          v-model="formData.leadInformation.superPremiumlCC"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="items-start q-pa-sm">
                      <q-checkbox
                        v-model="shortLead.posEnable"
                        color="purple-9"
                        :readonly="!shouldShowGivenPricefield"
                      >
                        <small class="q-caption">Enable Cash@POS Cash @POS incentive Rs.5</small>
                      </q-checkbox>
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <q-card class="q-ma-xs border-1 q-custom-class" flat>
            <q-card-title class="q-pa-sm bottom-border title-bg">
              <span class="q-body-1 text-weight-medium">Price Details</span>
            </q-card-title>
            <q-card-main>
              <q-list multiline no-border>
                <q-item>
                  <q-item-side>
                    <q-item-tile>Expected Setup Price</q-item-tile>
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile>
                      <q-icon name="fas fa-rupee-sign" size="12px" />
                      {{formData.leadInformation.setupGivenFees}}
                    </q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-side>
                    <q-item-tile>Expected Recurring Price</q-item-tile>
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile>
                      <q-icon name="fas fa-rupee-sign" size="12px" />
                      {{formData.leadInformation.recurringGivenFees}}
                    </q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-side>
                    <q-item-tile>SO Remarks</q-item-tile>
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile>{{shortLead.reason}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item
                  v-if="((shouldShowGivenPricefield) && (shortLead.verifiedPricingStatus != 2 || shortLead.verifiedCmsPricingStatus==4))"
                >
                  <q-item-side>
                    <q-item-tile>RSM Remarks</q-item-tile>
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile>{{getRsmReason.reason}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item
                  v-if="((shouldShowGivenPricefield) && (shortLead.verifiedPricingStatus != 2 || shortLead.verifiedCmsPricingStatus==4))"
                >
                  <q-item-main>
                    <q-item-tile>
                      <q-input
                        v-model="formData.leadInformation.recurringFees"
                        @blur="$v.formData.leadInformation.recurringFees.$touch"
                        :error="$v.formData.leadInformation.recurringFees.$error"
                        color="grey-9"
                        @input="fnCheckPrice(formData)"
                        float-label="Given recurring fees"
                        type="number"
                      />
                    </q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item
                  v-if="((shouldShowGivenPricefield) && (shortLead.verifiedPricingStatus == 2 || shortLead.verifiedCmsPricingStatus==4))"
                >
                  <q-item-side>Recurring fees</q-item-side>
                  <q-item-main>
                    <q-item-tile>{{formData.leadInformation.recurringGivenFees}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item
                  v-if="((shouldShowGivenPricefield) && (shortLead.verifiedPricingStatus != 2 || shortLead.verifiedCmsPricingStatus==4))"
                >
                  <q-item-main>
                    <q-item-tile>
                      <q-input
                        v-model="formData.leadInformation.setupFees"
                        @blur="$v.formData.leadInformation.setupFees.$touch"
                        :error="$v.formData.leadInformation.setupFees.$error"
                        color="grey-9"
                        @input="fnCheckPrice(formData)"
                        float-label="Given Setup Price"
                        type="number"
                      />
                    </q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item
                  v-if="((shouldShowGivenPricefield) && (shortLead.verifiedPricingStatus == 2 || shortLead.verifiedCmsPricingStatus==4))"
                >
                  <q-item-side>Given Setup Price</q-item-side>
                  <q-item-main>
                    <q-item-tile>{{formData.leadInformation.setupGivenFees}}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item v-if="$route.params.showAction == undefined">
                  <q-item-main
                    v-if="!shouldShowGivenPricefield && $route.params.showAction == undefined"
                  >
                    <q-item-tile>
                      <q-input
                        @keyup.enter="leadVerificationApprove()"
                        v-model="formData.leadVerificationStatus.reason"
                        @blur="$v.formData.leadVerificationStatus.reason.$touch"
                        :error="$v.formData.leadVerificationStatus.reason.$error"
                        color="grey-9"
                        float-label="Remarks"
                      />
                    </q-item-tile>
                  </q-item-main>
                  <q-item-main
                    v-if="shouldShowGivenPricefield && $route.params.showAction == undefined"
                  >
                    <q-item-tile>
                      <q-input
                        @keyup.enter="leadVerificationNHApprove()"
                        v-model="formData.leadVerificationStatus.reason"
                        @blur="$v.formData.leadVerificationStatus.reason.$touch"
                        :error="$v.formData.leadVerificationStatus.reason.$error"
                        color="grey-9"
                        float-label="Remarks"
                      />
                    </q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-card-main>
          </q-card>
        </div>
      </div>
      <!-- Final actions -->
      <div class="row" v-if="$route.params.showAction == undefined">
        <div class="col-md-12" align="right">
          <q-btn
            icon="block"
            color="grey-5"
            class="q-ma-sm text-dark"
            @click="$router.go(-1)"
            label="Cancel"
          />
          <q-btn
            icon="clear"
            color="negative"
            class="q-ma-sm"
            label="Reject"
            @click="leadVerificationReject()"
          />
          <q-btn
            v-if="!shouldShowGivenPricefield"
            icon="check"
            color="positive"
            class="q-ma-sm"
            label="Send to NH"
            @click="leadVerificationApprove()"
          />
          <q-btn
            v-if="shouldShowGivenPricefield"
            icon="check"
            color="positive"
            class="q-ma-sm"
            label="Approve"
            @click="leadVerificationNHApprove()"
          />
        </div>
      </div>

      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >>  Show Ajax Spinner -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
    </div>
  </q-page>
</template>

<script>
import { required, numeric, requiredIf } from "vuelidate/lib/validators";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "leadDataEntry",
  components: {
    generalLeadInformation,
  },
  data() {
    return {
      shouldShowGivenPricefield: false,
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      showRSMApproveButton: true,
      model: "",
      toggleAjaxLoadFilter: false,
      shortLead: {},
      formData: {
        leadInformation: {
          debitGreaterthanAmount: "",
          debitLessthanAmount: "",
          corpCC: "",
          premiumCC: "",
          superPremiumlCC: "",
          intlCC: "",
          stdCC: "",
          setupFees: "",
          recurringFees: "",
          setupGivenFees: "",
          recurringGivenFees: "",
        },
        leadVerificationStatus: {
          reason: "",
        },
      },
    };
  },

  validations: {
    formData: {
      leadInformation: {
        debitGreaterthanAmount: { required },
        debitLessthanAmount: { required },
        corpCC: { required },
        premiumCC: { required },
        superPremiumlCC: { required },
        intlCC: { required },
        stdCC: { required },
        setupFees: {
          required: requiredIf(function () {
            return this.shouldShowGivenPricefield === true;
          }),
          numeric,
        },
        recurringFees: {
          required: requiredIf(function () {
            return this.shouldShowGivenPricefield === true;
          }),
          numeric,
        },
      },
      leadVerificationStatus: {
        reason: { required },
      },
    },
  },

  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SalesManagerException", ["getShortLeadInfo"]),
    getRsmReason() {
      return _.find(this.getShortLeadInfo.leadVerificationStatus, function (
        oo
      ) {
        return oo.verificationType == 4 && oo.status == true;
      });
    },
  },

  created() {
    //function to load all lead details when page loads
    this.ajaxLoadShortLeadInfo();
  },

  methods: {
    ...mapActions("SalesManagerException", ["FETCH_SHORT_LEAD_DATA"]),
    ...mapActions("rsmPricingExceptionVerification", [
      "PRICING_EXCEPTION_VERIFICATION",
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    //function to load all lead details
    ajaxLoadShortLeadInfo() {
      this.FETCH_SHORT_LEAD_DATA(this.$route.params.id).then((response) => {
        this.shortLead = this.getShortLeadInfo;
        this.formData.leadInformation = {
          debitGreaterthanAmount: this.getShortLeadInfo.debitGreaterthanAmount,
          debitLessthanAmount: this.getShortLeadInfo.debitLessthanAmount,
          corpCC: this.getShortLeadInfo.corpCC,
          premiumCC: this.getShortLeadInfo.premiumCC,
          superPremiumlCC: this.getShortLeadInfo.superPremiumlCC,
          intlCC: this.getShortLeadInfo.intlCC,
          stdCC: this.getShortLeadInfo.stdCC,
          setupGivenFees: this.getShortLeadInfo.setupFees,
          recurringGivenFees: this.getShortLeadInfo.recurringFees,
        };
      });
      let self = this;
      let finalObj = _.find(
        JSON.parse(localStorage.getItem("u_i")).roles,
        function (oo) {
          return (
            oo.hierarchyRoleLevel == self.$ROLE_HIERARCHY_SALES_NATIONAL_HEAD
          );
        }
      );
      if (finalObj == undefined) {
        this.shouldShowGivenPricefield = false;
      } else {
        this.shouldShowGivenPricefield = true;
      }
      this.toggleAjaxLoadFilter = false;
    },

    // Common lead verification action
    leadVerificationReject() {
      this.$v.formData.leadVerificationStatus.reason.$touch();
      if (this.$v.formData.leadVerificationStatus.reason.$error) {
        this.$q.notify("Reason for rejection is mandatory");
      } else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to reject lead?",
            ok: "Continue",
            cancel: "Cancel",
          })
          .then(() => {
            let requestParams = {
              leadId: this.$route.params.id,
              action: 0,
              remarks: this.formData,
            };
            this.PRICING_EXCEPTION_VERIFICATION(requestParams)
              .then((response) => {
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Rejected Lead : #" + this.$route.params.id,
                  icon: "thumb_up",
                });
                this.$router.push(
                  "/sales/manager/pricing/exception/verification"
                );
              })
              .catch((error) => {
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                  icon: "thumb_down",
                });
              });
          });
      }
    },

    // RSM verification action
    leadVerificationApprove() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to approve lead?",
            ok: "Continue",
            cancel: "Cancel",
          })
          .then(() => {
            let requestParams = {
              leadId: this.$route.params.id,
              action: 1,
              remarks: this.formData,
            };
            this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none",
        });
            this.PRICING_EXCEPTION_VERIFICATION(requestParams)
              .then((response) => {
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Approved Lead : #" + this.$route.params.id,
                  icon: "thumb_up",
                });
                this.$q.loading.hide();
                this.$router.push(
                  "/sales/manager/pricing/exception/verification"
                );
              })
              .catch((error) => {
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                  icon: "thumb_down",
                });
                this.$q.loading.hide();
              });
          });
      }
    },

    // Nation head verification action
    leadVerificationNHApprove() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to approve lead?",
            ok: "Continue",
            cancel: "Cancel",
          })
          .then(() => {
            let requestParams = {
              leadId: this.$route.params.id,
              action: 1,
              remarks: this.formData,
            };
            this.PRICING_EXCEPTION_VERIFICATION(requestParams)
              .then((response) => {
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Approved Lead : #" + this.$route.params.id,
                  icon: "thumb_up",
                });
                this.$router.push(
                  "/sales/manager/pricing/exception/verification"
                );
              })
              .catch((error) => {
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                  icon: "thumb_down",
                });
              });
          });
      }
    },
    fnCheckPrice() {},

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
  },
};
</script>

<style scoped>
.border-1 {
  border: 1px solid #c7c7c7;
}

.custom-z-index {
  z-index: 2;
}
.title-bg {
  background: #bbbbbb4a;
}
.no-underline {
  text-decoration: none;
  color: #222;
}
.no-underline:hover,
.no-underline:active,
.no-underline:focus {
  text-decoration: none;
  color: #027be3;
}
</style>
