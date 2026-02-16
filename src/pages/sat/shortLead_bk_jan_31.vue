<template>
  <q-page>
    <div class="q-ma-md">
      <!-- Merchant details -->
      <div class="row q-ma-xs">
        <div class="col">
          <div class="text-h6 q-my-md capitalize">{{formData.shortLead.leadName}}</div>
          <div
            class="text-light-blue cursor-pointer"
            @click="toggleLeadInformation(formData.shortLead)"
          ># {{formData.shortLead.leadNumber}}</div>
        </div>
        <div class="col">
          <div class="text-h6 q-my-md">Contact</div>
          <div class="no-margin">{{formData.shortLead.contactNumber}}</div>
          <div>{{formData.shortLead.alternateContactNumber}}</div>
        </div>
        <div class="col">
          <div class="text-h6 q-my-md">Address</div>
          <div class="capitalize no-margin">{{formData.shortLead.leadAddress}}</div>
          <div
            class="capitalize no-margin"
          >{{formData.shortLead.city}}, {{formData.shortLead.state}}</div>
        </div>
      </div>

      <!-- Device, Exception, Payment, MDR and Documents -->
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <!-- Device -->
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col text-body1 text-weight-medium">
                      Device -
                      {{formData.shortLead.deviceCount}}
                      {{formData.shortLead.device.deviceName}}
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-list separator no-border class="no-padding text-body1">
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Plan</q-item-section>
                      <q-item-section>{{formData.shortLead.plan.planName}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Setup Fees</q-item-section>
                      <q-item-section>Rs. {{formData.shortLead.setupFees}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Recurring Fees</q-item-section>
                      <q-item-section>Rs. {{formData.shortLead.recurringFees}}</q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm text-body1">
                      <q-item-section>Merchant Category</q-item-section>
                      <q-item-section>{{formData.shortLead.merchantCategory.merchantCategoryName}}</q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>

            <!-- Payment -->
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col-auto text-body1 text-weight-medium">
                      Payment -
                      <span v-if="formData.shortLead.paymentOption == 1">IMPS/NEFT</span>
                      <span v-if="formData.shortLead.paymentOption == 2">Cheque</span>
                      <span v-if="formData.shortLead.paymentOption == 3">Swipe</span>
                    </div>
                    <div class="col text-body1 text-positive" align="right">
                      Approved by
                      <span class="capitalize">{{fnGetVerifiedPerson()}}</span> (Finance)
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-list no-border separator class="no-padding">
                    <q-item class="q-pa-sm">
                      <q-item-section class="text-body1">Mode of payment</q-item-section>
                      <q-item-section class="text-body1">
                        <span
                          class="text-body1"
                          v-if="formData.shortLead.paymentOption == 1"
                        >IMPS/NEFT</span>
                        <span
                          class="text-body1"
                          v-else-if="formData.shortLead.paymentOption == 2"
                        >Cheque</span>
                        <span
                          class="text-body1"
                          v-else-if="formData.shortLead.paymentOption == 3"
                        >Swipe</span>
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-section class="text-body1">Reference No</q-item-section>
                      <q-item-section
                        class="text-body1"
                      >{{formData.shortLead.referenceNumber == ''? 'NA':formData.shortLead.referenceNumber}}</q-item-section>
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
                </q-card-section>
              </q-card>
            </div>

            <!-- MDR -->
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <span class="text-body1 text-weight-medium">MDR</span>
                  <span class="text-body1 text-positive float-right" v-if="getShortLeadInfo.pricing">
                    Approved by
                    <span class="capitalize">{{fnGetVerifiedRSMPerson()}}</span> (RSM)
                  </span>
                </q-card-section>
                <q-card-section>
                  <q-list no-border class="no-padding">
                    <q-item class="q-pa-sm">
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Debit <= 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.debitLessthanAmount"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Debit > 2000 (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.debitGreaterthanAmount"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Std CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.stdCC"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Premium CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.premiumCC"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Corp Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.corpCC"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Intl Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.intlCC"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="q-pa-sm">
                      <q-item-section>
                        <q-input
                          color="grey-9"
                          float-label="Super Pre CC (%)"
                          readonly
                          class="no-pointer-events"
                          v-model="formData.shortLead.superPremiumlCC"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="items-start q-pa-sm" v-if="formData.shortLead.posEnable">
                      <q-checkbox
                        v-model="formData.shortLead.posEnable"
                        class="no-pointer-events"
                        color="purple-9"
                      >
                        <small class="text-caption">Enable Cash@POS Cash @POS incentive Rs.5</small>
                      </q-checkbox>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>

            <!-- Comments -->
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-section class="q-pa-sm bottom-border title-bg">
                  <span class="text-body1 text-weight-medium">Remarks</span>
                </q-card-section>
                <q-card-section>
                  <q-scroll-area
                    :style="formData.shortLead.leadVerificationStatus.length > 4?'width: 100%; height:400px;':'width: 100%; height:100px;'"
                  >
                    <q-list no-border class="no-padding">
                      <q-item
                        dense
                        v-for="(item,index) in formData.shortLead.leadVerificationStatus"
                        :key="index"
                        class="q-pa-sm"
                      >
                        <q-item-section
                          color="purple-9"
                          inverted
                          :letter="item.createdBy.name.charAt(0)"
                        />
                        <q-item-section>
                          <q-item-label label>{{item.reason}}</q-item-label>
                          <q-item-label sublabel>{{item.createdBy.name}}</q-item-label>
                          <q-item-label sublabel>{{item.fieldName}}</q-item-label>
                          <q-item-label stamp>{{item.updatedAt | moment("Do MMM Y")}}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                    </q-list>
                  </q-scroll-area>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row">
            <!-- Exception -->
            <div class="col-12">
              <div v-if="formData.shortLead.leadCategory == 2">
                <q-card v-if="formData.shortLead.kyc" class="q-ma-xs border-1 q-custom-class" flat>
                  <q-card-section class="q-pa-sm bottom-border title-bg">
                    <span class="text-body1 text-weight-medium">Exception KYC</span>
                    <span class="text-body1 text-positive float-right" v-if="getShortLeadInfo.kyc">
                      Approved by
                      <span class="capitalize">{{fnGetVerifiedOPHPerson()}}</span> (OPS HEAD)
                    </span>
                  </q-card-section>
                  <q-card-section class="no-padding">
                    <div class="row items-center q-pa-sm q-py-md">
                      <div class="col-md-3 col-sm-12 col-xs-12">
                        <span class="text-caption text-faded">Reason</span>
                      </div>
                      <div class="col-md-9 col-sm-12 col-xs-12">
                        <span
                          class="text-caption text-faded"
                          v-if="formData.shortLead.reason == null"
                        >Reason not specified</span>
                        <span class="text-caption text-faded" v-else>{{formData.shortLead.reason}}</span>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card
                  v-if="formData.shortLead.bankSubvention"
                  class="q-ma-xs border-1 q-custom-class"
                  flat
                >
                  <q-card-section class="q-pa-sm bottom-border title-bg">
                    <span class="text-body1 text-weight-medium">Exception Bank Subvention</span>
                    <span
                      class="text-body1 text-positive float-right"
                      v-if="getShortLeadInfo.bankSubvention"
                    >
                      Approved by
                      <span class="capitalize">{{fnGetVerifiedFINANCEPerson()}}</span> (Finance)
                    </span>
                  </q-card-section>
                  <q-card-section class="no-padding">
                    <div class="row items-center q-pa-sm q-py-md">
                      <div class="col-md-3 col-sm-12 col-xs-12">
                        <div class="text-caption text-faded">Reason</div>
                      </div>
                      <div class="col-md-9 col-sm-12 col-xs-12">
                        <div
                          class="text-caption text-faded"
                          v-if="formData.shortLead.reason == null"
                        >Reason not specified</div>
                        <div class="text-caption text-faded" v-else>{{formData.shortLead.reason}}</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card
                  v-if="formData.shortLead.pricing"
                  class="q-ma-xs border-1 q-custom-class"
                  flat
                >
                  <q-card-section class="q-pa-sm bottom-border title-bg">
                    <span class="text-body1 text-weight-medium">Exception Pricing</span>
                    <span
                      class="text-body1 text-positive float-right"
                      v-if="getShortLeadInfo.pricing"
                    >
                      Approved by
                      <span class="capitalize">{{fnGetVerifiedRSMPerson()}}</span> (RSM)
                    </span>
                  </q-card-section>
                  <q-card-section class="no-padding">
                    <div class="row items-center q-pa-sm q-py-md">
                      <div class="col-md-3 col-sm-12 col-xs-12">
                        <div class="text-caption text-faded">Reason</div>
                      </div>
                      <div class="col-md-9 col-sm-12 col-xs-12">
                        <div class="text-caption text-faded">{{formData.shortLead.reason}}</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <!-- Documents proof -->
            <div class="col-12">
              <q-card class="q-ma-xs border-1" flat>
                <q-card-section class="q-pa-sm title-bg bottom-border">
                  <span class="text-body1 text-weight-medium">Document</span>
                  <span
                    v-if="formData.shortLead.kyc"
                    class="float-right text-body1 text-positive"
                  >KYC Exception Case</span>
                </q-card-section>
                <q-card-section class="no-padding">
                  <q-list no-border class="no-padding">
                    <uploadLeadDocumentsComponent
                      v-if="formData.shortLead.documentUploadedType == 1 && formData.shortLead.kyc === false"
                      class="full-width text-body1 no-padding"
                      v-model:propGetShortLeadInfoDocumentTypes="getShortLeadInfoDocumentTypes"
                      :propMerchantTypeFromSO="getShortLeadInfo"
                      @emitTriggerComponentHotLoad="ajaxLoadShortLeadInfo"
                      @emitAjaxLoadShortLeadInfo="ajaxLoadShortLeadInfo"
                    />
                    <viewLeadDocumentsComponent
                      v-else
                      @emitTriggerComponentHotLoad="ajaxLoadShortLeadInfo"
                      :propLeadDocumentInformation="formData.shortLead.leadDocuments"
                      :propGetShortInfo="getShortLeadInfo"
                    />
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <!-- Final actions -->
      <div class="row">
        <div class="col-md-12" align="right">
          <q-btn
            icon="block"
            color="grey-5"
            class="q-ma-sm text-dark"
            @click="$router.go(-1)"
            label="Cancel"
          />
          <q-btn
            :disable="!showProceedToDataEntryButton"
            icon="check"
            color="tertiary"
            class="q-ma-sm"
            @click="fnApproveLeadData(getShortLeadInfo)"
            label="Proceed to data entry"
          />
          <q-btn
            :disable="!showFinalRejectionAction"
            icon="clear"
            class="q-ma-sm"
            color="negative"
            label="REJECT"
            @click="fnToggleRejectLeadComp"
          />
        </div>
      </div>

      <!-- START >> COMPONENT: Final reject -->
      <showFinalRejectLeadRemarksComponent
        v-if="toggleLeadRejectModal"
        :propToggleLeadModal="toggleLeadRejectModal"
        :propLeadDetails="getShortLeadInfo"
        @toggleLeadModal="fnToggleRejectLeadComp"
      />
      <!-- END >> COMPONENT: Final reject -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35"/>
      </div>
      <!--END >>  Show Ajax Spinner -->
      <!-- START >> COMPONENT: View PDF  -->
      <showPdfModalComponent
        v-if="toggleshowPDFModal"
        :propToggleshowPDFModal="toggleshowPDFModal"
        :propPDFDetails="PDFDetails"
        @togglePDFModal="fnPDFViewModal"
      />
      <!-- END >> COMPONENT: View PDF -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :propLeadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
    </div>
  </q-page>
</template>

<script>
import { between, not, and } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

import uploadLeadDocumentsComponent from "../../components/sat/uploadLeadDocumentsComponent.vue";
import viewLeadDocumentsComponent from "../../components/sat/viewLeadDocumentsComponent.vue";

import showFinalRejectLeadRemarksComponent from "../../components/sat/showFinalRejectLeadRemarksComponent.vue";

import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "leadDataEntry",
  components: {
    uploadLeadDocumentsComponent,
    viewLeadDocumentsComponent,
    showPdfModalComponent,
    showFinalRejectLeadRemarksComponent,
    generalLeadInformation
  },

  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      showOpenPaymentChequeDocumentInfo: false,
      PDFDetails: null,
      toggleshowPDFModal: false,

      merchantTypeSelection: 0,
      subDocumentTypeSelection: 0,

      //Component properties
      toggleApproveLeadModal: false,
      toggleLeadRejectModal: false,
      //Component properties

      //Template porperties
      showProceedToDataEntryButton: true,
      toggleAjaxLoadFilter: false,
      model: "",
      tabsModel: "xtab-2",
      toggleChequeImageResult: false,
      toggleDocumentLeadRejectModal: false,
      checked: false,
      thumbnailsHorizontal: false,
      showOpenPaymentChequeInfo: false,

      leadRejectReason: "",
      formData: {
        shortLead: "",
        documentType: []
      }
      //Template porperties
    };
  },

  beforeRouteLeave(to, from, next) {
    if (
      to.name == "leadDataEntry" ||
      to.name == "leadValidation" ||
      to.path == "/404"
    ) {
      next();
    } else {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
  },

  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getShortLeadInfoDocumentTypes"
    ]),

    showFinalRejectionAction() {
      let dummyArr = [];
      let documents = this.getShortLeadInfo.leadDocuments;
      // Function to check if any of the document is rejected
      for (var key in documents) {
        let returnSubValue = _.filter(documents[key], function(subValue) {
          return subValue.documentVerifiedStatus == 3;
        });
        if (returnSubValue.length > 0) {
          dummyArr.push(returnSubValue);
        }
      }
      // If yes, then throw an alert
      if (dummyArr.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },

  created() {
    //function to load all lead details when page loads
    this.ajaxLoadShortLeadInfo();
  },
  methods: {
    ...mapActions("SatLeadValidation", [
      "FETCH_SHORT_LEAD_DATA",
      "VERIFY_LEAD_DATA"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    // Function redirect to data entry screen
    fnMoveToDataEntryScreen() {
      if (
        this.getShortLeadInfo.leadStatus >= this.$LEAD_STATUS_DATA_ENTRY_PENDING
      ) {
        this.$q.notify({
          color: "positive",
          position: "bottom",
          message: "Redirecting to data entry screen",
          icon: "fas fa-exchange-alt"
        });
        this.$router.push(
          "/sat/lead/validation/" + this.$route.params.id + "/data/entry"
        );
      }
    },

    //Function to load all lead details
    ajaxLoadShortLeadInfo(
      hotReloadForDocumentsUploadValidation,
      merchantTypeSelection
    ) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          this.formData["shortLead"] = this.getShortLeadInfo;
          this.fnMoveToDataEntryScreen();
          if (this.formData.shortLead.documentUploadedType == 1) {
            if (
              hotReloadForDocumentsUploadValidation ==
              "hotReloadForDocumentsUploadValidation"
            ) {
              this.fnToToggleSubmitAction(merchantTypeSelection);
            }
          } else {
            this.fnCheckValidationFlag();
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // Function to show PDF
    fnPDFViewModal(documentUrl) {
      this.showOpenPaymentChequeDocumentInfo = !this
        .showOpenPaymentChequeDocumentInfo;
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },

    // Function to open payment document as image info
    fnOpenPaymentChequeInfo() {
      this.showOpenPaymentChequeInfo = !this.showOpenPaymentChequeInfo;
    },

    // Function to approve lead and send to data entry final screen MARS
    fnApproveLeadData(leadInfo) {
      let dummyArr_rejection = [];
      let documents = leadInfo.leadDocuments;
      // Function to check if any of the document is rejected
      for (var key in documents) {
        // START>> Function to get all rejected documents count
        let returnSubValue_rejection = _.filter(documents[key], function(
          subValue
        ) {
          return subValue.documentVerifiedStatus == 3;
        });
        if (returnSubValue_rejection.length > 0) {
          dummyArr_rejection.push(returnSubValue_rejection);
        }
        // END>> Function to get all rejected documents count
      }
      if (dummyArr_rejection.length > 0) {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Some document(s) are rejected",
          icon: "warning"
        });
      } else {
        let formData = {
          leadInformation: {
            fieldName: "Full Lead Information",
            reason: ""
          },
          leadId: leadInfo.id,
          defaultUrlValue: this.$SAT_LEAD_VALIDATION_APPROVE
        };
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to proceed to data entry?",
            ok: "Continue",
            cancel: "Cancel"
          })
          .then(() => {
            this.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Processing .."
            });
            this.VERIFY_LEAD_DATA(formData)
              .then(response => {
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Successfully approved",
                  icon: "thumb_up"
                });
                this.$router.push(
                  "/sat/lead/validation/" +
                    this.$route.params.id +
                    "/data/entry"
                );
                this.$q.loading.hide();
              })
              .catch(error => {
                if (error.status == 422) {
                  this.$q.notify({
                    color: "primary",
                    position: "bottom",
                    message:
                      error.data.data.subDocumentType +
                      " is pending for approval",
                    icon: "info"
                  });
                } else {
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                    icon: "thumb_down"
                  });
                }
                this.$q.loading.hide();
              });
          })
          .catch(() => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "No changes made!",
              icon: "thumb_down"
            });
          });
      }
    },

    // Funcion to toggle reject lead component
    fnToggleRejectLeadComp() {
      this.toggleLeadRejectModal = !this.toggleLeadRejectModal;
    },

    // Function to check validation flag
    fnCheckValidationFlag() {
      let self = this;
      // Document uploaded type, 2 => full document upload in SO FOS App

      if (Object.keys(this.formData.shortLead.leadDocuments).length > 0) {
        let cookedArr = [];
        for (var key in this.formData.shortLead.leadDocuments) {
          if (this.formData.shortLead.leadDocuments.hasOwnProperty(key)) {
            _.forEach(this.formData.shortLead.leadDocuments[key], function(
              subValue,
              subIndex
            ) {
              if (
                subValue.documentVerifiedStatus ==
                self.$VERIFIED_DOCUMENT_STATUS_REJECT
              ) {
                cookedArr.push(subValue.id);
              }
            });
          }
        }
        if (cookedArr.length > 0) {
          this.showProceedToDataEntryButton = false;
        } else {
          this.showProceedToDataEntryButton = true;
        }
      } else {
        this.showProceedToDataEntryButton = false;
      }
    },

    // Function to toggle between submit button/action
    fnToToggleSubmitAction(merchantTypeSelection) {
      //Get document applicable from Lead Info Documents Type
      let self = this;
      let parentArr = this.getShortLeadInfoDocumentTypes.filter(function(
        value
      ) {
        return value.merchantType == merchantTypeSelection;
      });

      // Get uploaded documents count
      let majorArr = [];
      Object.keys(self.getShortLeadInfo.leadDocuments).forEach(function(
        key,
        index
      ) {
        let childArr = _.find(parentArr[0].documentsApplicable, function(o) {
          return (
            key == o.documentType &&
            self.getShortLeadInfo.leadDocuments.hasOwnProperty(key) &&
            self.getShortLeadInfo.leadDocuments[key].length > 0
          );
        });
        majorArr.push(childArr);
      });

      if (parentArr[0].documentsApplicable.length == majorArr.length) {
        this.showProceedToDataEntryButton = true;
      } else {
        this.showProceedToDataEntryButton = false;
      }
    },

    //Function to get approved by user for payment information
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

    // Function to get verified Finance person name
    fnGetVerifiedFINANCEPerson() {
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

    // Function to get verified RSM person name
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

    //Function to get verified OPS Head person name
    fnGetVerifiedOPHPerson() {
      let sortedArr = _.orderBy(
        this.getShortLeadInfo.leadVerificationStatus,
        ["id"],
        ["desc"]
      );
      let cookedArr = _.filter(sortedArr, {
        status: true,
        verificationType: this.$VERIFICATION_TYPE_KYC
      });
      return cookedArr[0].createdBy.name;
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
.customQuasarSelect {
  padding: 5px;
}

label {
  padding: 3px 8px;
  display: table;
}

input[type="file"] {
  display: none;
}
</style>
