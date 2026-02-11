<template>
  <q-page>
      <div class="q-ma-md">
        <div class="flex items-stretch q-ma-xs">
            <div class="col-md-3">
                <div class="text-h6 q-my-md capitalize">{{formData.shortLead.leadName}}</div>
                <p class="text-light-blue"># {{formData.shortLead.id}}</p>
            </div>
            <div class="col-md-3">
                <div class="text-h6 q-my-md">Contact</div>
                <p class="no-margin">{{formData.shortLead.contactNumber}}</p>
                <p>{{formData.shortLead.alternateContactNumber}}</p>
            </div>
            <div class="col-md-3">
                <div class="text-h6 q-my-md">Address</div>
                <p class="capitalize">{{formData.shortLead.leadAddress}}</p>
            </div>
        </div>

        <!-- Device, Exception, Payment, MDR and Documents -->
        <div class="row">
            <div class="col-md-6">
                <div class="flex">
                    <!-- Device -->
                    <div class="full-width">
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
                                        <q-item-section>
                                            Plan
                                        </q-item-section>
                                        <q-item-section>
                                            {{formData.shortLead.plan.planName}}
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-pa-sm text-body1">
                                        <q-item-section>
                                            Setup Fees
                                        </q-item-section>
                                        <q-item-section>
                                            Rs. {{formData.shortLead.setupFees}}
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-pa-sm text-body1">
                                        <q-item-section>
                                        Recurring Fees
                                        </q-item-section>
                                        <q-item-section>
                                            Rs. {{formData.shortLead.recurringFees}}
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-pa-sm text-body1">
                                        <q-item-section>
                                            Merchant Category
                                        </q-item-section>
                                        <q-item-section>
                                            {{formData.shortLead.merchantCategory.merchantCategoryName}}
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
                    </div>

                    <!-- Payment -->
                    <div class="full-width">
                        <q-card class="q-ma-xs border-1 q-custom-class" flat>
                            <q-card-section class="q-pa-sm bottom-border title-bg">
                                <div class="row items-center">
                                    <div class="col-auto text-body1 text-weight-medium">
                                        Payment 
                                    </div>
                                </div>
                            </q-card-section>
                            <q-card-section class="q-pa-sm">
                                <q-list no-border separator class="no-padding">
                                    <q-item class="q-pa-sm">
                                        <q-item-section class="text-body1">
                                            Mode of payment
                                        </q-item-section>
                                        <q-item-section class="text-body1">
                                            <span class="text-body1" v-if="formData.shortLead.paymentOption == 1">IMPS/NEFT</span>
                                            <span class="text-body1" v-else-if="formData.shortLead.paymentOption == 2">Cheque</span>
                                            <span class="text-body1" v-else-if="formData.shortLead.paymentOption == 3">Swipe</span>
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-pa-sm">
                                        <q-item-section class="text-body1">
                                            Reference No
                                        </q-item-section>
                                        <q-item-section class="text-body1">
                                            {{formData.shortLead.referenceNumber == ''? 'NA':formData.shortLead.referenceNumber}}
                                        </q-item-section>
                                    </q-item>
                                    <q-item v-if="formData.shortLead.paymentOption == 2">
                                        <div v-if="formData.shortLead.paymentDocumentMimeType != null && formData.shortLead.paymentDocumentMimeType.includes('pdf')">
                                            <q-btn size="sm" :outline="!showOpenPaymentChequeDocumentInfo" color="dark" label="View Document" icon="attach_file" @click="fnPDFViewModal(formData.shortLead.paymentDocumentFile,'CHEQUE')"></q-btn>
                                        </div>
                                        <div v-else-if="formData.shortLead.paymentDocumentMimeType != null && formData.shortLead.paymentDocumentMimeType.includes('image')">
                                            <q-btn :outline="!showOpenPaymentChequeInfo" size="sm" color="dark" label="View Document" icon="attach_file" @click="fnOpenPaymentChequeInfo(formData.shortLead.paymentDocumentFile)" />
                                        </div>
                                        <div v-else class="text-grey-9">
                                            <q-icon name="clear" color="negative"/> No document attached
                                        </div>
                                    </q-item>
                                    <q-item v-if="showOpenPaymentChequeInfo">
                                            <viewer class="cursor-pointer" :images="[GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.paymentDocumentFile]">
                                            <img :src="GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.paymentDocumentFile" style="max-width:100%">
                                        </viewer>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
                    </div>
                    
                    <!-- MDR -->
                    <div class="full-width">
                        <q-card class="q-ma-xs border-1 q-custom-class" flat>
                            <q-card-section class="q-pa-sm bottom-border title-bg">
                                <span class="text-body1 text-weight-medium">MDR</span>
                            </q-card-section>
                            <q-card-section>
                                <q-list no-border class="no-padding">
                                    <q-item class="no-padding q-py-sm">
                                        <q-item-section>
                                            <q-input color="grey-9" float-label="Debit < 2000 (%)" readonly class="no-pointer-events" v-model="formData.shortLead.debitLessthanAmount" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-input color="grey-9" float-label="Debit < 2000 (%)" readonly class="no-pointer-events" v-model="formData.shortLead.debitGreaterthanAmount" />
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="no-padding q-py-sm">
                                        <q-item-section>
                                            <q-input color="grey-9" float-label="Std CC (%)" readonly class="no-pointer-events" v-model="formData.shortLead.stdCC" /> 
                                        </q-item-section>
                                        <q-item-section>
                                            <q-input color="grey-9" float-label="Premium CC (%)" readonly class="no-pointer-events" v-model="formData.shortLead.premiumCC" />
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="no-padding q-py-sm">
                                        <q-item-section>
                                            <q-input color="grey-9" float-label="Corp Pre CC (%)" readonly class="no-pointer-events" v-model="formData.shortLead.corpCC" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-input color="grey-9" float-label="Intl Pre CC (%)" readonly class="no-pointer-events" v-model="formData.shortLead.intlCC" />
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="no-padding q-py-sm">
                                        <q-item-section>
                                            <q-input color="grey-9" float-label="Super Pre CC (%)" readonly class="no-pointer-events" v-model="formData.shortLead.superPremiumlCC" />
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="items-start q-pa-sm" v-if="formData.shortLead.posEnable">
                                        <q-checkbox v-model="formData.shortLead.posEnable" class="no-pointer-events" color="purple-9">
                                            <small class="text-caption">Enable Cash@POS Cash @POS incentive Rs.5</small>
                                        </q-checkbox>
                                    </q-item>
                                </q-list>
                            </q-card-section>
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
                                <q-card-section class="q-pa-sm bottom-border title-bg">
                                    <div class="row items-center">
                                        <div class="col-auto text-body1 text-weight-medium">
                                            Exception KYC
                                        </div>
                                    </div>
                                </q-card-section>
                                <q-card-section class="no-padding">
                                    <div class="row items-center q-pa-sm q-py-md">
                                        <div class="col-md-3 col-sm-12 col-xs-12">
                                            <span class="text-caption text-faded">Reason</span>
                                        </div>
                                        <div class="col-md-9 col-sm-12 col-xs-12">
                                            <span class="text-caption text-faded" v-if="formData.shortLead.reason == null">Reason not specified</span>
                                            <span class="text-caption text-faded" v-else>
                                                {{formData.shortLead.reason}}</span>
                                        </div>
                                    </div>
                                </q-card-section>
                            </q-card>
                            <q-card v-if="formData.shortLead.bankSubvention" class="q-ma-xs border-1 q-custom-class" flat>
                                <q-card-section class="q-pa-sm bottom-border title-bg">
                                    <div class="row items-center">
                                        <div class="col-auto text-body1 text-weight-medium">
                                            Exception Bank Subvention
                                        </div>
                                    </div>
                                </q-card-section>
                                <q-card-section class="no-padding">
                                    <div class="row items-center q-pa-sm q-py-md">
                                        <div class="col-md-3 col-sm-12 col-xs-12">
                                            <div class="text-caption text-faded">Reason</div>
                                        </div>
                                        <div class="col-md-9 col-sm-12 col-xs-12">
                                            <div class="text-caption text-faded" v-if="formData.shortLead.reason == null">Reason no specified</div>
                                            <div class="text-caption text-faded" v-else>{{formData.shortLead.reason}}</div>
                                        </div>
                                    </div>
                                </q-card-section>
                            </q-card> 
                            <q-card  v-if="formData.shortLead.pricing" class="q-ma-xs border-1 q-custom-class" flat>
                                <q-card-section class="q-pa-sm bottom-border title-bg">
                                    <div class="row items-center">
                                        <div class="col-auto text-body1 text-weight-medium">
                                            Exception Pricing
                                        </div>
                                    </div>
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
                    <div class="full-width">
                        <q-card class="q-ma-xs border-1" flat>
                            <q-card-section class="q-pa-sm title-bg bottom-border">
                                <span class="text-body1 text-weight-medium">Documents</span>
                            </q-card-section>
                            <q-card-section class="q-pa-xs">
                                <q-list no-border class="no-padding">
                                    <q-item class="no-padding">
                                        <q-item-section>
                                            <div v-for="(documents,index) in formData.shortLead.leadDocuments" :key="index" >
                                                <div class="row items-center full-width"
                                                v-if="index.toString()==documents[0].subDocumentType">
                                                    <div class="col-md-12 text-body1">
                                                        <q-expansion-item separator indent icon-toggle opened group="closeOnOpen" multiline class="full-width">
                                                            <template slot="header">
                                                                <q-item-section icon="attach_file" />
                                                                <q-item-section class="text-body1" :sublabel="documents[0].uploadedDocuments.length + 'Document(s)'" :label="index" />
                                                            </template>
                                                            <div v-for="(item,subIndex) in documents[0].uploadedDocuments" :key="subIndex" class="q-py-sm">
                                                                <div v-if="item.mimeType.includes('application')">
                                                                    <div @click="fnPDFViewModal(item.fileName)" class="cursor-pointer no-underline">
                                                                        <q-icon name="fas fa-file-pdf" color="negative" />
                                                                        &nbsp;{{item.fileNameOriginal}}
                                                                    </div>
                                                                </div>
                                                                <div v-else-if="item.mimeType.includes('image')">
                                                                    <div class="no-underline cursor-pointer">
                                                                        <viewer :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]">
                                                                            <img :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName" style="max-width:100%">
                                                                        </viewer>
                                                                    </div>
                                                                </div>
                                                                <div v-else>No documents attached</div>
                                                            </div>
                                                        </q-expansion-item>
                                                    </div>
                                                </div>
                                                    
                                                <div class="row items-center full-width" v-else>
                                                    <!-- <pre>{{documents}}</pre> -->
                                                    <div class="col-md-12 text-body1">
                                                        <q-expansion-item separator indent sicon-toggle opened group="closeOnOpen"  class="full-width">
                                                            <template slot="header">
                                                                <q-item-section  icon="apps" />
                                                                <q-item-section class="text-body1"
                                                                :sublabel="documents.length + 'Type(s)'"
                                                                 :label="index" />
                                                            </template>
                                                            <div class="row items-center full-width" v-for="(subDocument,subIndex) in documents" :key="subIndex">
                                                                <div class="col-md-12 text-body1">
                                                                    <q-expansion-item separator icon-toggle opened group="closeOnOpenSubDocument" multiline class="full-width" indent>
                                                                        <template slot="header">
                                                                            <q-item-section icon="attach_file" />
                                                                            <q-item-section class="text-body1"
                                                                            :sublabel="subDocument.uploadedDocuments.length + 'Document(s)'"
                                                                            :label="subDocument.subDocumentType" />
                                                                        </template>
                                                                        <div v-for="(item,subIndex) in subDocument.uploadedDocuments" :key="subIndex" class="q-py-sm">
                                                                            <div v-if="item.mimeType.includes('application')">
                                                                            <div @click="fnPDFViewModal(item.fileName)" class="cursor-pointer no-underline">
                                                                                <q-icon name="fas fa-file-pdf" color="negative" />
                                                                                &nbsp;{{item.fileNameOriginal}}
                                                                            </div>
                                                                            </div>
                                                                            <div v-else-if="item.mimeType.includes('image')">
                                                                                <div class="no-underline cursor-pointer">
                                                                                    <viewer :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]">
                                                                                        <img :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName" style="max-width:100%">
                                                                                    </viewer>
                                                                                </div>
                                                                            </div>
                                                                            <div v-else>
                                                                                No document attached
                                                                            </div>
                                                                        </div>
                                                                    </q-expansion-item>
                                                                </div>
                                                            </div>
                                                        </q-expansion-item>
                                                    </div>
                                                </div>
                                            </div>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
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
                <q-btn
                    icon="cloud_upload"
                    class="q-ma-sm"
                    color="positive"
                    label="Upload Document"
                    @click="fnUploadDocumentAndSubmit"
                />
            </div>
        </div>

        <!--START >>  COMPONENT toggleUploadDocumentAndSubmit -->
        <toggleUploadDocumentAndSubmit
            :propLeadDetails="formData.shortLead"
            :propToggleUploadDocumentAndSubmit="toggleUploadDocumentAndSubmit"
            @toggleDocumentUploadAndFinalSubmit=fnUploadDocumentAndSubmit
        >
        </toggleUploadDocumentAndSubmit>
        <!--END >>  COMPONENT toggleUploadDocumentAndSubmit -->

        <!-- START >> COMPONENT: View PDF  -->
        <showPdfModalComponent
        v-if="toggleshowPDFModal"
        :propToggleshowPDFModal="toggleshowPDFModal"
        :propPDFDetails="PDFDetails"
        @togglePDFModal="fnPDFViewModal"
        ></showPdfModalComponent>
        <!-- END >> COMPONENT: View PDF -->

        <!--START >>  Show Ajax Spinner -->
        <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
            <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
        </div>
        <!--END >>  Show Ajax Spinner -->
        </div>
    </q-page>
</template>

<script>
import { not, and } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

import toggleUploadDocumentAndSubmit from "../../components/sat/toggleUploadDocumentAndSubmit.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

export default {
  name: "exceptionQueueBankLeadDetails",
  components: {
    showPdfModalComponent,
    toggleUploadDocumentAndSubmit
  },
  data() {
    return {
      PDFDetails: null,
      toggleshowPDFModal: null,

      toggleAjaxLoadFilter: false,
      toggleUploadDocumentAndSubmit: false,
      model: "",
      tabsModel: "xtab-2",
      toggleChequeImageResult: false,
      toggleDocumentLeadRejectModal: false,
      documentRejectTempArr: [],
      checked: false,
      thumbnailsHorizontal: false,
      toggleLeadRejectModal: false,
      showOpenPaymentChequeDocumentInfo: false,
      showOpenPaymentChequeInfo: false,
      leadRejectReason: "",
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
    //function to load all lead details when page loads
    this.ajaxLoadShortLeadInfo();
  },

  methods: {
    ...mapActions("SatLeadValidation", [
      "FETCH_SHORT_LEAD_DATA",
      "VERIFY_DEVICE_FULL_LEAD",
      "VERIFY_DOCUMENT_FULL_LEAD",
      "VERIFY_LEAD_DATA"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    //function to load all lead details
    ajaxLoadShortLeadInfo() {
      this.FETCH_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          this.formData.shortLead = this.getShortLeadInfo;
        })
        .catch(error => {
          console.log("FAILED >> ajaxLoadShortLeadInfo >>", error);
        });
      this.toggleAjaxLoadFilter = false;
    },

    // Function to show PDF
    fnOpenPaymentChequeInfo() {
      this.showOpenPaymentChequeInfo = !this.showOpenPaymentChequeInfo;
    },

    fnUploadDocumentAndSubmit() {
      this.toggleUploadDocumentAndSubmit = !this.toggleUploadDocumentAndSubmit;
    },

    // funcion to toggle pdf component
    fnPDFViewModal(documentUrl, viewChequeFlag) {
      if (viewChequeFlag == "CHEQUE") {
        this.showOpenPaymentChequeDocumentInfo = !this
          .showOpenPaymentChequeDocumentInfo;
        this.PDFDetails = documentUrl;
        this.toggleshowPDFModal = !this.toggleshowPDFModal;
      } else {
        this.PDFDetails = documentUrl;
        //this.PDFDetails = "http://www.africau.edu/images/default/sample.pdf";
        this.toggleshowPDFModal = !this.toggleshowPDFModal;
      }
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
