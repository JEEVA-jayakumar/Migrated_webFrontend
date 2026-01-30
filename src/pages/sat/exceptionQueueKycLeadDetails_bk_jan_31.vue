<template>
  <q-page>
    <div class="q-ma-md">
      <div class="row">
        <div class="col-6">
          <q-alert
            v-if="formData.shortLead.verifiedBanksubventionStatus == $VERIFIED_BANKSUBVENTION_STATUS_ATTACH_FILE_PENDING"
            icon="info"
            type="primary"
            message="KYC & Bank subvention"
            detail="Status: Bank subvention verification pending"
          />
          <q-alert
            v-if="formData.shortLead.verifiedPricingStatus == $VERIFIED_PRICING_STATUS_RSM_PENDING"
            icon="info"
            type="primary"
            message="KYC & Pricing"
            detail="Status: RSM pricing verification pending"
          />
        </div>
      </div>

      <!-- Merchant details -->
      <div class="row q-ma-xs">
        <div class="col">
          <div class="q-title q-my-md capitalize">{{formData.shortLead.leadName}}</div>
          <div
            class="text-light-blue cursor-pointer"
            @click="toggleLeadInformation(formData.shortLead)"
          ># {{formData.shortLead.id}}</div>
        </div>
        <div class="col">
          <div class="q-title q-my-md">Contact</div>
          <div class="no-margin">{{formData.shortLead.contactNumber}}</div>
          <div>{{formData.shortLead.alternateContactNumber}}</div>
        </div>
        <div class="col">
          <div class="q-title q-my-md">Address</div>
          <div class="capitalize no-margin">{{formData.shortLead.leadAddress}}</div>
          <div
            class="capitalize no-margin"
          >{{formData.shortLead.city}}, {{formData.shortLead.state}}</div>
        </div>
      </div>
      <!-- <pre>{{sample}}</pre> -->
      <!-- <pre>{{formData.shortLead.leadDocuments}}</pre> -->
      <!-- Device, Exception, Payment, MDR and Documents -->
      <div class="row">
        <div class="col-md-6">
          <div class="flex">
            <!-- Device -->
            <div class="full-width">
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
            <div class="full-width">
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
            <div class="full-width">
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
            <div class="full-width">
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
                        >Reason not specified</div>
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

            <!-- Documents proof -->
            <div class="full-width">
              <q-card class="q-ma-xs border-1" flat>
                <q-card-title class="q-pa-sm title-bg bottom-border">
                  <span class="q-body-1 text-weight-medium">Document</span>
                </q-card-title>
                <q-card-main class="no-padding">
                  <q-list no-border class="no-padding">
                    <!-- START >> Component for handover to sat -->
                    <uploadLeadDocumentsComponent
                      v-if="formData.shortLead.documentUploadedType == 1 && formData.shortLead.leadCategory == 2"
                      class="full-width q-body-1 no-padding"
                      :propGetShortLeadInfoDocumentTypes="getShortLeadInfoDocumentTypes"
                      :propMerchantTypeFromSO="getShortLeadInfo"
                      @emitTriggerComponentHotLoad="ajaxLoadShortLeadInfo"
                      @emitAjaxLoadShortLeadInfo="ajaxLoadShortLeadInfo"
                      @emitCookUpKYCdocumentsId="fnCookUpKYCmarkedDocumentsId"
                    />
                    <!-- END >> Component for handover to sat -->
                    <!-- START >> Component for Full document upload -->
                    <viewLeadDocumentsComponent
                      v-else
                      @emitTriggerComponentHotLoad="ajaxLoadShortLeadInfo"
                      :propLeadDocumentInformation.sync="formData.shortLead.leadDocuments"
                      :propGetShortInfo="formData.shortLead"
                    />
                    <!-- END >> Component for Full document upload -->
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons - Cancel, Approve, Reject -->
      <div class="flex">
        <div class="col-md-12" align="right">
          <!-- START >> Buttons - Cancel -->
          <q-btn
            icon="block"
            color="grey-5"
            class="q-ma-sm text-dark"
            :to="'/sat/lead/validation'"
            label="Cancel"
          />
          <!-- END >> Buttons - Cancel -->
          <!-- START >> Buttons - Send to operations head -->
          <q-btn
            icon="check"
            color="positive"
            class="q-ma-sm"
            @click="fnApproveLeadData(getShortLeadInfo)"
            label="Send to OPS Head"
          />
          <!-- END >> Buttons - Send to operations head -->
          <!-- START >> Buttons - Reject if any document is rejected -->
          <q-btn
            :disable="!fnCheckIfAnyDocumentIsRejected"
            icon="clear"
            class="q-ma-sm"
            color="negative"
            label="Reject"
            @click="fnToggleRejectLeadComp"
          />
          <!-- END >> Buttons - Reject if any document is rejected -->
        </div>
      </div>

      <!-- START >> COMPONENT: View PDF  -->
      <showPdfModalComponent
        v-if="toggleshowPDFModal"
        :propToggleshowPDFModal="toggleshowPDFModal"
        :propPDFDetails="PDFDetails"
        @togglePDFModal="fnPDFViewModal"
      />
      <!-- END >> COMPONENT: View PDF -->
      <!-- START >> COMPONENT: Final approval -->
      <showApproveRemarksComponent
        v-if="toggleApproveLeadModal"
        :propToggleLeadModal="toggleApproveLeadModal"
        :propLeadDetails="getShortLeadInfo"
        :propDocumentIds="merchantDocumentIds"
        @toggleLeadModal="fnApproveLeadData"
      />
      <!-- END >> COMPONENT: Final approval -->
      <!-- START >> COMPONENT: Final reject -->
      <showRejectLeadRejectComponent
        v-if="toggleLeadRejectModal"
        :propToggleLeadModal="toggleLeadRejectModal"
        :propLeadDetails="getShortLeadInfo"
        @toggleLeadModal="fnToggleRejectLeadComp"
      />
      <!-- END >> COMPONENT: Final reject -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :propLeadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />

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
import showApproveRemarksComponent from "../../components/sat/showApproveRemarksComponent.vue";
import showRejectLeadRejectComponent from "../../components/sat/showRejectLeadRejectComponent.vue";

/* For documents view or upload */
import uploadLeadDocumentsComponent from "../../components/sat/uploadExceptionLeadDocumentsComponent.vue";
import viewLeadDocumentsComponent from "../../components/sat/viewExceptionLeadDocumentsComponent.vue";
/* For documents view or upload */

import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "exceptionQueueKycLeadDetails",
  components: {
    showApproveRemarksComponent,
    showRejectLeadRejectComponent,
    showPdfModalComponent,

    uploadLeadDocumentsComponent,
    viewLeadDocumentsComponent,
    generalLeadInformation
  },

  data() {
    return {
      sample: [],
      merchantDocumentIds: [],

      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      isAllDocumentsUploaded: false,
      showOpenPaymentChequeInfo: false,
      showOpenPaymentChequeDocumentInfo: false,
      toggleshowPDFModal: false,
      PDFDetails: null,
      merchantTypeSelection: 0,
      subDocumentTypeSelection: 0,
      select: "",

      //Component properties
      toggleApproveLeadModal: false,
      toggleLeadRejectModal: false,
      //Component properties

      //Template porperties
      showProceedToDataEntryButton: false,
      toggleAjaxLoadFilter: false,
      model: "",
      tabsModel: "xtab-2",
      toggleChequeImageResult: false,
      toggleDocumentLeadRejectModal: false,
      checked: false,
      thumbnailsHorizontal: false,
      leadRejectReason: "",
      formData: {
        shortLead: "",
        documentType: []
      }
      //Template porperties
    };
  },

  beforeRouteLeave(to, from, next) {
    if (to.name == "exceptionQueue") {
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

    // toggle function to check if any documents are rejected
    fnCheckIfAnyDocumentIsRejected() {
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

    //function to load all lead details
    ajaxLoadShortLeadInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          this.$set(this.formData, "shortLead", this.getShortLeadInfo);
          this.$q.loading.hide();
          this.toggleAjaxLoadFilter = false;
        })
        .catch(error => {
          this.$q.loading.hide();
          this.toggleAjaxLoadFilter = false;
        });
    },

    //fnCookUpKYCmarkedDocumentsId
    fnCookUpKYCmarkedDocumentsId(cookedDocumentArr) {
      this.merchantDocumentIds = cookedDocumentArr;
      //   console.log("this.merchantDocumentIds", this.merchantDocumentIds);
    },
    // function to approve lead and send to OPS HEAD
    fnApproveLeadData() {
      if (
        this.getShortLeadInfo.documentUploadedType ==
        this.$DOCUMENT_UPLOAEDED_TYPE_HANDOVER_SAT
      ) {
        // START >> Operation for handed over to SAT flow
        let innerSelf = this;
        let innerSelfLeadDocument = this.getShortLeadInfo.leadDocuments;
        let finalAssumeArr = [];
        // END >> Operation for handed over to SAT flow
        // START >> Traverse through single document upload array
        innerSelf.getShortLeadInfoDocumentTypes.uploadedDocuments.forSingleDocument.map(
          function(o) {
            o.documents.map(function(io) {
              if (!io.isKycChecked) {
                if (innerSelfLeadDocument.hasOwnProperty(io.documentType)) {
                  let innerAssume = [];
                  innerSelfLeadDocument[io.documentType].map(function(oo) {
                    console.log("oooooooo", oo);
                    if (
                      (oo.uploadedDocuments.length == 0 &&
                        new String(oo.subDocumentType).valueOf() ==
                          new String(io.subDocumentType).valueOf()) ||
                      (oo.documentVerifiedStatus == 3 &&
                        new String(oo.subDocumentType).valueOf() ==
                          new String(io.subDocumentType).valueOf())
                    ) {
                      innerSelf.$set(oo, "viewType", 1);
                      finalAssumeArr.push(oo);
                    }
                  });
                } else {
                  innerSelf.$set(io, "viewType", 1);
                  finalAssumeArr.push(io);
                }
              }
            });
          }
        );
        // END >> Traverse through single document upload array
        // START >> Traverse through multiple document upload array
        innerSelf.getShortLeadInfoDocumentTypes.uploadedDocuments.forMutipleDocument.map(
          function(o) {
            if (!o.isKycChecked) {
              if (innerSelfLeadDocument.hasOwnProperty(o.documentType)) {
                let innerAssume = [];
                innerSelfLeadDocument[o.documentType].map(function(oo) {
                  o.documents.map(function(coo) {
                    if (
                      (oo.uploadedDocuments.length == 0 &&
                        new String(oo.subDocumentType).valueOf() ==
                          new String(coo.subDocumentType).valueOf()) ||
                      (coo.documentVerifiedStatus == 3 &&
                        new String(oo.subDocumentType).valueOf() ==
                          new String(coo.subDocumentType).valueOf())
                    ) {
                      innerSelf.$set(oo, "viewType", 0);
                      finalAssumeArr.push(oo);
                    }
                  });
                });
              } else {
                innerSelf.$set(o, "viewType", 0);
                // o.viewType = 0;
                finalAssumeArr.push(o);
              }
            }
          }
        );
        // END >> Traverse through multiple document upload array
        // START >> Get array size and throw all errors
        if (finalAssumeArr.length > 0) {
          innerSelf.$q.notify({
            color: "amber-9",
            position: "bottom",
            timeout: 3000, // in milliseconds; 0 means no timeout
            message:
              finalAssumeArr[0].subDocumentType == undefined
                ? finalAssumeArr[0].documentType
                : finalAssumeArr[0].viewType == 0
                ? finalAssumeArr[0].documentType
                : finalAssumeArr[0].subDocumentType + " is mandatory",
            icon: "warning"
          });
        } else {
          this.toggleApproveLeadModal = !this.toggleApproveLeadModal;
        }
        // END >> Get array size and throw all errors
      } else {
        // console.log("asdsad");
        let dummyArr_rejection = [];
        let dummyArr_pending = [];
        let documents = this.getShortLeadInfo.leadDocuments;
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
          // START>> Function to get pending document count
          let returnSubValue_pending = _.filter(documents[key], function(
            subValue
          ) {
            return (
              subValue.documentVerifiedStatus == 2 && !subValue.kycException
            );
          });
          if (returnSubValue_pending.length > 0) {
            dummyArr_pending.push(returnSubValue_pending);
          }
          // END>> Function to get pending document count
        }
        // If yes, then throw an alert
        if (dummyArr_rejection.length > 0) {
          this.$q.notify({
            color: "amber-9",
            position: "bottom",
            message:
              "Some document(s) are rejected. You can only reject this lead",
            icon: "warning"
          });
        } else if (dummyArr_pending.length > 0) {
          this.$q.notify({
            color: "amber-9",
            position: "bottom",
            message: "Some document(s) are pending for approval",
            icon: "warning"
          });
        } else {
          this.toggleApproveLeadModal = !this.toggleApproveLeadModal;
        }
      }
    },
    // // function to approve lead and send to OPS HEAD
    // fnApproveLeadData() {
    //   // console.log("asdsad");
    //   let dummyArr_rejection = [];
    //   let documents = this.getShortLeadInfo.leadDocuments;
    //   // Function to check if any of the document is rejected
    //   for (var key in documents) {
    //     // START>> Function to get all rejected documents count
    //     let returnSubValue_rejection = _.filter(documents[key], function(
    //       subValue
    //     ) {
    //       return subValue.documentVerifiedStatus == 3;
    //     });
    //     if (returnSubValue_rejection.length > 0) {
    //       dummyArr_rejection.push(returnSubValue_rejection);
    //     }
    //     // END>> Function to get all rejected documents count
    //   }
    //   // If yes, then throw an alert
    //   if (dummyArr_rejection.length > 0) {
    //     this.$q.notify({
    //       color: "amber-9",
    //       position: "bottom",
    //       message: "Some document(s) are rejected",
    //       icon: "warning"
    //     });
    //   } else {
    //     this.toggleApproveLeadModal = !this.toggleApproveLeadModal;
    //   }
    // },

    // funcion to toggle reject lead component
    fnToggleRejectLeadComp() {
      this.toggleLeadRejectModal = !this.toggleLeadRejectModal;
    },

    //Function to toggle between payment chque image
    fnOpenPaymentChequeInfo() {
      this.showOpenPaymentChequeInfo = !this.showOpenPaymentChequeInfo;
    },

    // funcion to toggle pdf component
    fnPDFViewModal(documentUrl, viewChequeFlag) {
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
