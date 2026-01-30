<template>
  <q-page>
    <div class="q-ma-md">
      <!-- Merchant details -->
      <div class="flex items-stretch q-ma-xs">
        <div class="col-12 col-lg-3">
          <div class="q-title q-my-md capitalize">{{formData.shortLead.leadName}}</div>
          <div
            class="text-light-blue cursor-pointer"
            @click="toggleLeadInformation(formData.shortLead)"
          ># {{formData.shortLead.leadNumber}}</div>
        </div>
        <div class="col-12 col-lg-3">
          <div class="q-title q-my-md">Contact</div>
          <p class="no-margin">{{formData.shortLead.contactNumber}}</p>
          <p>{{formData.shortLead.alternateContactNumber}}</p>
        </div>
        <div class="col-12 col-lg-3">
          <div class="q-title q-my-md">Address</div>
          <p
            v-if="formData.shortLead.leadAddress != null"
            class="capitalize no-margin"
          >{{formData.shortLead.leadAddress}}</p>
          <p class="capitalize no-margin">{{formData.shortLead.city}}, {{formData.shortLead.state}}</p>
        </div>
        <div class="col-12 col-lg-3">
          <div class="q-title q-my-md">Remarks</div>
          <div
            class="capitalize no-margin text-negative"
            v-if="formData.shortLead.marsReason != null"
          >{{formData.shortLead.marsReason}}</div>
          <div v-else>No Remarks</div>
        </div>
      </div>

      <q-list>
        <q-collapsible
          icon="info"
          group="primary"
          label="Merchant details"
          sublabel="Device, Exceptions, Payment, MDR"
          inset-separator
        >
          <div>
            <!-- Device, Exception, Payment, MDR -->
            <div class="row group content-stretch">
              <!-- Device -->
              <div class="col">
                <q-card class="border-1 q-custom-class" flat>
                  <q-card-title class="q-pa-sm items-center bottom-border-dark bg-grey-4">
                    <div class="row items-center">
                      <div class="col q-caption text-weight-medium">
                        Device -
                        {{formData.shortLead.deviceCount}}
                        {{formData.shortLead.device.deviceName}}
                      </div>
                    </div>
                  </q-card-title>
                  <q-card-separator />
                  <q-card-main class="q-pa-sm text-grey-9">
                    <q-list separator no-border class="no-padding">
                      <q-item>
                        <q-item-main class="q-caption">
                          <q-item-tile>Plan</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile>{{formData.shortLead.plan.planName}}</q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main class="q-caption">
                          <q-item-tile>Setup Fees</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile>Rs. {{formData.shortLead.setupFees}}</q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main class="q-caption">
                          <q-item-tile>Recurring Fees</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile>Rs. {{formData.shortLead.recurringFees}}</q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main class="q-caption">
                          <q-item-tile>Merchant Category</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile>{{formData.shortLead.merchantCategory.merchantCategoryName}}</q-item-tile>
                        </q-item-side>
                      </q-item>
                    </q-list>
                  </q-card-main>
                </q-card>
              </div>

              <!-- Exception -->
              <div v-if="formData.shortLead.leadCategory == 2" class="col">
                <div class="group">
                  <q-card v-if="formData.shortLead.kyc" class="border-1" flat>
                    <q-card-title class="q-pa-sm bottom-border-dark bg-grey-4">
                      <div class="row items-center">
                        <div class="col-auto q-caption text-weight-medium">Exception KYC</div>
                      </div>
                    </q-card-title>
                    <q-card-separator />
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
                </div>
                <div class="group">
                  <q-card class="border-1" flat v-if=" formData.shortLead.bankSubvention">
                    <q-card-title class="q-pa-sm bottom-border-dark bg-grey-4">
                      <div class="row items-center">
                        <div class="col-auto q-caption text-weight-medium">Exception Bank Subvention</div>
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
                          >Reason not specified</div>
                          <div class="q-caption text-faded" v-else>{{formData.shortLead.reason}}</div>
                        </div>
                      </div>
                    </q-card-main>
                  </q-card>
                </div>
                <div class="group">
                  <q-card v-if="formData.shortLead.pricing" class="q-ma-xs border-1" flat>
                    <q-card-title class="q-pa-sm bottom-border-dark bg-grey-4">
                      <div class="row items-center">
                        <div class="col-auto q-caption text-weight-medium">Exception Pricing</div>
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

              <!-- Payment -->
              <div class="col">
                <q-card class="border-1 q-custom-class" flat>
                  <q-card-title class="q-pa-sm bottom-border-dark bg-grey-4">
                    <div class="col-auto q-caption text-weight-medium">Payment</div>
                  </q-card-title>
                  <q-card-separator />
                  <q-card-main class="q-pa-sm text-grey-9">
                    <q-list dense no-border class="no-padding">
                      <q-item class="q-pa-sm">
                        <q-item-main class="q-caption">Payment mode:</q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <span v-if="formData.shortLead.paymentOption == 1">IMPS/NEFT</span>
                          <span v-else-if="formData.shortLead.paymentOption == 2">Cheque</span>
                          <span v-else-if="formData.shortLead.paymentOption == 3">Swipe</span>
                           <span v-else-if="formData.shortLead.paymentOption == 4">UPI Link</span>
                        </q-item-side>
                      </q-item>
                      <q-item class="q-pa-sm">
                        <q-item-main class="q-caption">Reference:</q-item-main>
                        <q-item-side
                          class="q-caption"
                          align="center"
                        >{{formData.shortLead.referenceNumber == ''?'NA':formData.shortLead.referenceNumber}}</q-item-side>
                      </q-item>
                    </q-list>
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
                          @click="fnPDFViewModal(formData.shortLead.paymentDocumentFile,'CHEQUE')"
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
                        <q-icon name="clear" color="negative" />No document attached
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
                        />
                      </viewer>
                    </q-item>
                  </q-card-main>
                </q-card>
              </div>

              <!-- MDR -->
              <div class="col">
                <q-card class="border-1 q-custom-class" flat>
                  <q-card-title class="q-pa-sm bottom-border-dark bg-grey-4">
                    <div class="col-auto q-caption text-weight-medium">MDR</div>
                  </q-card-title>
                  <q-card-separator />
                  <q-card-main class="q-pa-sm text-grey-9">
                    <q-list separator dense no-border class="no-padding">
                      <q-item>
                        <q-item-main class="q-caption">Debit &lt;= 2000</q-item-main>
                        <q-item-side
                          class="q-caption"
                          align="center"
                        >{{formData.shortLead.debitLessthanAmount}}%</q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main class="q-caption">
                          <q-item-tile class="q-caption">Debit > 2000</q-item-tile>
                        </q-item-main>
                        <q-item-side
                          class="q-caption"
                          align="center"
                        >{{formData.shortLead.debitGreaterthanAmount}}%</q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main>
                          <q-item-tile class="q-caption">Std CC</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile class="q-caption">{{formData.shortLead.stdCC}}%</q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main>
                          <q-item-tile class="q-caption">Premium CC</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile class="q-caption">
                            <div class="q-caption">{{formData.shortLead.premiumCC}}%</div>
                          </q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main>
                          <q-item-tile class="q-caption">Corp Pre CC</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile class="q-caption">{{formData.shortLead.corpCC}}%</q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main>
                          <q-item-tile class="q-caption">Intl Pre CC</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile class="q-caption">{{formData.shortLead.intlCC}}%</q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main>
                          <q-item-tile class="q-caption">Super Pre CC</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile class="q-caption">{{formData.shortLead.superPremiumlCC}}%</q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main>
                          <q-item-tile class="q-caption">Amex Domestic</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile class="q-caption">{{formData.shortLead.amexDomestic}}%</q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item>
                        <q-item-main>
                          <q-item-tile class="q-caption">Amex International</q-item-tile>
                        </q-item-main>
                        <q-item-side class="q-caption" align="center">
                          <q-item-tile class="q-caption">{{formData.shortLead.amexInternational}}%</q-item-tile>
                        </q-item-side>
                      </q-item>
                      <q-item class="q-pa-sm" v-if="formData.shortLead.posEnable">
                        <q-checkbox
                          v-model="formData.shortLead.posEnable"
                          disable
                          readonly
                          color="grey-9"
                        >
                          <small class="q-caption">Enable Cash@POS Cash @POS incentive Rs. 5"</small>
                        </q-checkbox>
                      </q-item>
                    </q-list>
                  </q-card-main>
                </q-card>
              </div>
            </div>
          </div>
        </q-collapsible>

        <q-collapsible
          opened
          icon="file_copy"
          group="primary"
          label="Documents"
          sublabel="Related documents"
          inset-separator
        >
          <showMarsForm :propLeadDeatils="formData.shortLead"></showMarsForm>
        </q-collapsible>
      </q-list>
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
    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
import { easing } from "quasar";
import { mapGetters, mapActions } from "vuex";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";
import showMarsForm from "../../components/sat/showMarsFormComponent.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "leadDataEntry",
  components: {
    generalLeadInformation,
    showPdfModalComponent,
    showMarsForm
  },
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      showOpenPaymentChequeDocumentInfo: false,
      PDFDetails: null,
      toggleshowPDFModal: false,
      showImage: true,
      showDocumentPreview: true,
      populatedDocumentUrl: "",
      text: "",
      fileUrl: "",
      date2: "",
      select: "",
      model: "",
      showOpenPaymentChequeInfo: false,
      checked: false,
      thumbnailsHorizontal: false,

      formData: {
        shortLead: ""
      }
    };
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus"
    ])
  },
  created() {
    this.ajaxLoadLeadDataEntryInfo();
  },
  methods: {
    ...mapActions("SatLeadValidation", [
      "FETCH_SHORT_LEAD_DATA",
      "VERIFY_DEVICE_FULL_LEAD"
    ]),
    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    ajaxLoadLeadDataEntryInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          this.formData.shortLead = this.getShortLeadInfo;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },
    fnDocumentUrl(documentUrl) {
      this.populatedDocumentUrl = documentUrl;
      this.showDocumentPreview = !this.showDocumentPreview;
    },
    fnCloseDocumentPreview() {
      this.showDocumentPreview = !this.showDocumentPreview;
    },
    fnOpenPaymentChequeInfo() {
      this.showOpenPaymentChequeInfo = !this.showOpenPaymentChequeInfo;
    },

    // Function to show PDF
    fnPDFViewModal(documentUrl, viewChequeFlag) {
      if (viewChequeFlag == "CHEQUE") {
        this.showOpenPaymentChequeDocumentInfo = !this
          .showOpenPaymentChequeDocumentInfo;
        this.PDFDetails = documentUrl;
        this.toggleshowPDFModal = !this.toggleshowPDFModal;
      } else {
        this.PDFDetails = documentUrl;
        this.toggleshowPDFModal = !this.toggleshowPDFModal;
      }
    },

    //Function to et approved by user for payment information
    fnGetVerifiedPerson() {
      let sortedArr = _.orderBy(
        this.getShortLeadInfo.leadVerificationStatus,
        ["id"],
        ["desc"]
      );
      let cookedArr = _.filter(sortedArr, {
        status: true,
        verificationType: this.$VERIFICATION_TYPE_FINANCE
      });
      return cookedArr[0].createdBy.name;
    },

    fnGetVerifiedRSMPerson() {
      let sortedArr = _.orderBy(
        this.getShortLeadInfo.leadVerificationStatus,
        ["id"],
        ["desc"]
      );
      let cookedArr = _.filter(sortedArr, {
        status: true,
        verificationType: this.$VERIFICATION_TYPE_PRICING
      });
      return cookedArr[0].createdBy.name;
    },
    // Function to open handed over image upload
    fnViewHandedOverFileImage() {
      this.$refs.handedOverImageViewer.click();
    }
  }
};
</script>

<style scoped>
.bottom-border-dark {
  border-bottom: 1px solid #afafaf;
}

.border-1 {
  border: 1px solid #afafaf;
}

.q-custom-class {
  min-height: 230px;
}

.custom-z-index {
  z-index: 2;
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
