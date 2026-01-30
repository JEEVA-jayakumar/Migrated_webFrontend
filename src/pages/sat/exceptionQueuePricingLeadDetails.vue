<template>
  <q-page>
    <div class="q-ma-md">
      <!-- Merchant details -->
      <!-- <pre>{{getShortLeadInfo}}</pre> -->
      <div class="flex items-stretch q-ma-xs">
        <div class="col-md-3">
          <div class="q-title q-my-md capitalize">{{formData.shortLead.leadName}}</div>
          <p
            class="text-light-blue cursor-pointer"
            @click="toggleLeadInformation(formData.shortLead)"
          ># {{formData.shortLead.id}}</p>
        </div>
        <div class="col-md-3">
          <div class="q-title q-my-md">Contact</div>
          <p class="no-margin">{{formData.shortLead.contactNumber}}</p>
          <p>{{formData.shortLead.alternateContactNumber}}</p>
        </div>
        <div class="col-md-3">
          <div class="q-title q-my-md">Address</div>
          <p
            v-if="formData.shortLead.leadAddress != null"
            class="capitalize no-margin"
          >{{formData.shortLead.leadAddress}}</p>
          <p class="capitalize no-margin">{{formData.shortLead.city}}, {{formData.shortLead.state}}</p>
        </div>
      </div>

      <!-- Device, Exception, Payment, MDR and Documents -->
      <div class="row">
        <div class="col-md-6">
          <div class="flex">
            <!-- Device -->
            <div class="col-md-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">
                      Device -
                      {{formData.shortLead.deviceCount}}
                      {{formData.shortLead.device.deviceName}}
                    </div>
                  </div>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Plan</q-item-main>
                      <q-item-side>{{formData.shortLead.plan.planName}}</q-item-side>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Setup Fees</q-item-main>
                      <q-item-side>Rs. {{formData.shortLead.setupFees}}</q-item-side>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Recurring Fees</q-item-main>
                      <q-item-side>Rs. {{formData.shortLead.recurringFees}}</q-item-side>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Merchant Category</q-item-main>
                      <q-item-side>{{formData.shortLead.merchantCategory.merchantCategoryName}}</q-item-side>
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
            </div>

            <!-- Payment -->
            <div class="col-md-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col-auto q-body-1 text-weight-medium">Payment</div>
                  </div>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list no-border separator class="no-padding">
                    <q-item class="q-pa-sm">
                      <q-item-main class="q-body-1">Mode of payment</q-item-main>
                      <q-item-side class="q-body-1">
                        <span
                          class="q-body-1"
                          v-if="formData.shortLead.paymentOption == 1"
                        >IMPS/NEFT</span>
                        <span
                          class="q-body-1"
                          v-else-if="formData.shortLead.paymentOption == 2"
                        >Cheque</span>
                        <span
                          class="q-body-1"
                          v-else-if="formData.shortLead.paymentOption == 3"
                        >Swipe</span>
                                   <span
                          class="q-body-1"
                          v-else-if="formData.shortLead.paymentOption == 4"
                        >UPI Link</span>
                      </q-item-side>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-main class="q-body-1">Reference No</q-item-main>
                      <q-item-side
                        class="q-body-1"
                      >{{formData.shortLead.referenceNumber == ''? 'NA':formData.shortLead.referenceNumber}}</q-item-side>
                    </q-item>
                    <q-item v-if="formData.shortLead.paymentOption == 2">
                      <div
                        v-if="formData.shortLead.paymentDocumentMimeType != null && formData.shortLead.paymentDocumentMimeType.includes('pdf')"
                      >
                        <q-btn
                          size="sm"
                          :outline="!showOpenPaymentChequeDocumentInfo"
                          color="dark"
                          label="View Document"
                          icon="attach_file"
                          @click="fnPDFViewModal(formData.shortLead.paymentDocumentFile)"
                        ></q-btn>
                      </div>
                      <div
                        v-else-if="formData.shortLead.paymentDocumentMimeType != null && formData.shortLead.paymentDocumentMimeType.includes('image')"
                      >
                        <q-btn
                          :outline="!showOpenPaymentChequeInfo"
                          size="sm"
                          color="dark"
                          label="View Document"
                          icon="attach_file"
                          @click="fnOpenPaymentChequeInfo(formData.shortLead.paymentDocumentFile)"
                        />
                      </div>
                      <div v-else class="text-grey-9">
                        <q-icon name="clear" color="negative"/>No document attached
                      </div>
                    </q-item>
                    <q-item v-if="showOpenPaymentChequeInfo">
                      <viewer
                        class="cursor-pointer"
                        :images="[GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.paymentDocumentFile]"
                      >
                        <img
                          :src="GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.paymentDocumentFile"
                          style="max-width:100%"
                        >
                      </viewer>
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
            </div>

            <!-- MDR -->
            <div class="col-md-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <span class="q-body-1 text-weight-medium">MDR</span>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list no-border class="no-padding">
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Debit < 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.debitLessthanAmount"
                        />
                      </q-item-main>
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Debit < 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.debitGreaterthanAmount"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Std CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.stdCC"
                        />
                      </q-item-main>
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Premium CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.premiumCC"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Corp Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.corpCC"
                        />
                      </q-item-main>
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Intl Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.intlCC"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Super Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.superPremiumlCC"
                        />
                      </q-item-main>
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Upi Debit Card UpTo 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.upiDebitCardUpTo2000"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Upi Debit Card Above 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.upiDebitCardAbove2000"
                        />
                      </q-item-main>
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Upi Prepaid Credit Cards UpTo 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.upiPrepaidCreditCardsUpTo2000"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-main>
                        <q-input
                          color="grey-9"
                          float-label="Upi Prepaid Credit Cards Above 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.upiPrepaidCreditCardsAbove2000"
                        />
                      </q-item-main>
                    </q-item>
                    <q-item class="items-start q-pa-sm" v-if="formData.shortLead.posEnable">
                      <q-checkbox
                        v-model="formData.shortLead.posEnable"
                        class="no-pointer-events"
                        color="purple-9"
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
          <div class="flex">
            <!-- Exception -->
            <div class="col-md-12">
              <div v-if="formData.shortLead.leadCategory == 2">
                <q-card v-if="formData.shortLead.kyc" class="q-ma-xs border-1 q-custom-class" flat>
                  <q-card-title class="q-pa-sm bottom-border title-bg">
                    <div class="row items-center">
                      <div class="col-auto q-body-1 text-weight-medium">Exception KYC</div>
                    </div>
                  </q-card-title>
                  <q-card-main class="no-padding">
                    <div class="row items-center q-pa-sm q-py-md">
                      <div class="col-md-3 col-sm-12 col-xs-12">
                        <span class="q-caption text-faded">Reason</span>
                      </div>
                      <div class="col-md-9 col-sm-12 col-xs-12">
                        <span
                          class="q-caption text-faded"
                          v-if="formData.shortLead.reason == null"
                        >Reason not specified</span>
                        <span class="q-caption text-faded" v-else>{{formData.shortLead.reason}}</span>
                      </div>
                    </div>
                  </q-card-main>
                </q-card>
                <q-card
                  v-if="formData.shortLead.bankSubvention"
                  class="q-ma-xs border-1 q-custom-class"
                  flat
                >
                  <q-card-title class="q-pa-sm bottom-border title-bg">
                    <div class="row items-center">
                      <div class="col-auto q-body-1 text-weight-medium">Exception Bank Subvention</div>
                    </div>
                  </q-card-title>
                  <q-card-main class="no-padding">
                    <div class="row items-center q-pa-sm q-py-md">
                      <div class="col-md-3 col-sm-12 col-xs-12">
                        <div class="q-caption text-faded">Reason</div>
                      </div>
                      <div class="col-md-9 col-sm-12 col-xs-12">
                        <div
                          class="q-caption text-faded"
                          v-if="formData.shortLead.reason == null"
                        >Reason no specified</div>
                        <div class="q-caption text-faded" v-else>{{formData.shortLead.reason}}</div>
                      </div>
                    </div>
                  </q-card-main>
                </q-card>
                <q-card
                  v-if="formData.shortLead.pricing"
                  class="q-ma-xs border-1 q-custom-class"
                  flat
                >
                  <q-card-title class="q-pa-sm bottom-border title-bg">
                    <div class="row items-center">
                      <div class="col-auto q-body-1 text-weight-medium">Exception Pricing</div>
                    </div>
                  </q-card-title>
                  <q-card-main class="no-padding">
                    <div class="row items-center q-pa-sm q-py-md">
                      <div class="col-md-3 col-sm-12 col-xs-12">
                        <div class="q-caption text-faded">Reason</div>
                      </div>
                      <div class="col-md-9 col-sm-12 col-xs-12">
                        <div class="q-caption text-faded">{{formData.shortLead.reason}}</div>
                      </div>
                    </div>
                  </q-card-main>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <!-- Final actions -->
        <div class="col-md-12" align="right">
          <q-btn
            icon="block"
            color="grey-5"
            class="q-ma-sm text-dark"
            @click="$router.go(-1)"
            label="Cancel"
          />
        </div>
      </div>

      <!-- START >> COMPONENT: View PDF  -->
      <showPdfModalComponent
        v-if="toggleshowPDFModal"
        :propToggleshowPDFModal="toggleshowPDFModal"
        :propPDFDetails="PDFDetails"
        @togglePDFModal="fnPDFViewModal"
      ></showPdfModalComponent>
      <!-- END >> COMPONENT: View PDF -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />

      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35"/>
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { easing } from "quasar";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "exceptionQueuePricingLeadDetails",
  components: {
    showPdfModalComponent,
    generalLeadInformation
  },
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      showOpenPaymentChequeInfo: false,
      showOpenPaymentChequeDocumentInfo: false,
      toggleshowPDFModal: false,
      PDFDetails: null,

      showProceedToDataEntryButton: false,
      toggleAjaxLoadFilter: false,
      model: "",
      tabsModel: "xtab-2",
      toggleChequeImageResult: false,
      toggleDocumentLeadRejectModal: false,
      documentRejectTempArr: [],
      checked: false,
      thumbnailsHorizontal: false,
      toggleLeadRejectModal: false,

      leadRejectReason: "",
      formData: {
        shortLead: ""
      }
    };
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SatLeadValidation", ["getShortLeadInfo"]),

    IsKYCVerifiedBySAT() {
      return _.find(
        _.orderBy(
          this.getShortLeadInfo.leadVerificationStatus,
          ["id"],
          ["desc"]
        ),
        function(oo) {
          return oo.status && oo.verificationType == 3;
        }
      );
    }
  },
  created() {
    //function to load all lead details when page loads
    this.ajaxLoadShortLeadInfo();
  },
  methods: {
    ...mapActions("SatLeadValidation", ["FETCH_SHORT_LEAD_DATA"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    //function to load all lead details
    ajaxLoadShortLeadInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          this.$q.loading.hide();
          this.formData.shortLead = this.getShortLeadInfo;
        })
        .catch(error => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },

    // function to toggle cheque image for payments info if available
    fnOpenPaymentChequeInfo() {
      this.showOpenPaymentChequeInfo = !this.showOpenPaymentChequeInfo;
    },

    // funcion to toggle pdf component
    fnPDFViewModal(documentUrl) {
      this.showOpenPaymentChequeDocumentInfo = !this
        .showOpenPaymentChequeDocumentInfo;
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    }
  }
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
