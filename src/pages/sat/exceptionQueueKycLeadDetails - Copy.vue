<template>
  <q-page>
      <div class="q-ma-md">
        <!-- Merchant details -->
        <!-- <pre>{{getShortLeadInfo}}</pre> -->
        <div class="flex items-stretch q-ma-xs">
            <div class="col-md-3">
                <div class="q-title q-my-md capitalize">{{formData.shortLead.leadName}}</div>
                <p class="text-light-blue"># {{formData.shortLead.id}}</p>
            </div>
            <div class="col-md-3">
                <div class="q-title q-my-md">Contact</div>
                <p class="no-margin">{{formData.shortLead.contactNumber}}</p>
                <p>{{formData.shortLead.alternateContactNumber}}</p>
            </div>
            <div class="col-md-3">
                <div class="q-title q-my-md">Address</div>
                <p class="capitalize">{{formData.shortLead.leadAddress}}</p>
            </div>
             <!-- <div class="col-md-3">
                <div class="q-title q-my-md">Account Number</div>
                <p>NA</p>
            </div> -->
        </div>

        <!-- Device, Exception, Payment, MDR and Documents -->
        <div class="row">
            <div class="col-md-6">
                <div class="flex">
                    <!-- Device -->
                    <div class="col-md-12 col-sm-12 col-xs-12 ">
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
                                <q-list separator no-border class="no-padding">
                                    <q-item class="items-start q-pa-sm">
                                        <q-item-side class="col-md-6 col-sm-6 col-xs-6">
                                            <small>Plan</small>
                                        </q-item-side>
                                            <q-item-side class="col">
                                            <small>{{formData.shortLead.planName}}</small>
                                        </q-item-side>
                                    </q-item>
                                    <q-item class="items-start q-pa-sm">
                                        <q-item-side class="col-md-6 col-sm-6 col-xs-6">
                                            <small>Setup Fees</small>
                                        </q-item-side>
                                            <q-item-side class="col">
                                            <small>Rs. {{formData.shortLead.setupFees}}</small>
                                        </q-item-side>
                                    </q-item>
                                    <q-item class="items-start q-pa-sm">
                                        <q-item-side class="col-md-6 col-sm-6 col-xs-6">
                                        <small>Recurring Fees</small>
                                        </q-item-side>
                                            <q-item-side class="col">
                                            <small>Rs. {{formData.shortLead.recurringFees}}</small>
                                        </q-item-side>
                                    </q-item>
                                    <q-item class="items-start q-pa-sm">
                                        <q-item-side class="col-md-6 col-sm-6 col-xs-6">
                                            <small>Merchant Category</small>
                                        </q-item-side>
                                            <q-item-side class="col">
                                            <small>{{formData.shortLead.merchantCategory}}</small>
                                        </q-item-side>
                                    </q-item>
                                </q-list>
                            </q-card-main>
                        </q-card>
                    </div>

                    <!-- Payment -->
                   <div class="col-md-12 col-sm-12 col-xs-12 ">
                        <q-card class="q-ma-xs border-1 q-custom-class" flat>
                            <q-card-title class="q-pa-sm bottom-border  title-bg">
                                <div class="row items-center">
                                    <div class="col-auto q-body-1 text-weight-medium">
                                        Payment - 
                                        <span v-if="formData.shortLead.paymentOption == 1">IMPS/NEFT</span>
                                        <span v-if="formData.shortLead.paymentOption == 2">Cheque</span>
                                        <span v-if="formData.shortLead.paymentOption == 3">Swipe</span>
                                    </div>
                                </div>
                            </q-card-title>
                            <q-card-main class="q-pa-sm">
                                <q-list no-border class="no-padding">
                                    <q-item class="items-start q-pa-sm">
                                        <q-item-side class="col-md-6 q-caption">
                                            Payment mode:
                                            <span class="q-caption" v-if="formData.shortLead.paymentOption == 1">IMPS/NEFT</span>
                                            <span class="q-caption" v-else-if="formData.shortLead.paymentOption == 2">Cheque</span>
                                            <span class="q-caption" v-else-if="formData.shortLead.paymentOption == 3">Swipe</span>
                                        </q-item-side>
                                        <q-item-side class="col-md-6 q-caption">
                                            {{formData.shortLead.referenceNumber}}
                                        </q-item-side>
                                    </q-item>
                
                                    <q-item class="items-start">
                                        <q-item-side class="col-md-12 q-caption">
                                            <div v-if="formData.shortLead.paymentDocumentFile == null || formData.shortLead.paymentDocumentFile == ''"><q-icon name="clear" color="negative" /> No image attached</div>
                                            <div v-else>
                                                <q-btn 
                                                    flat
                                                    underline
                                                    size="sm"
                                                    class="bg-white"
                                                    @click="toggleChequeImage(formData.shortLead.paymentDocumentFile)" 
                                                    color="light-blue">
                                                    View Image &nbsp;
                                                    <span v-if="!toggleChequeImageResult"><i class="fas fa-angle-down"></i></span>
                                                    <span v-if="toggleChequeImageResult"><i class="fas fa-angle-up"></i></span>
                                                </q-btn>
                                            </div>
                                        </q-item-side>
                                    </q-item>
                                </q-list>
                            </q-card-main>
                        </q-card>
                    </div>
                    
                    <!-- MDR -->
                    <div class="col-md-12 col-sm-12 col-xs-12 ">
                        <q-card class="q-ma-xs border-1 q-custom-class" flat>
                            <q-card-title class="q-pa-sm bottom-border title-bg">
                                <span class="q-body-1 text-weight-medium">MDR</span>
                            </q-card-title>
                            <q-card-main>
                                <q-list no-border class="no-padding">
                                    <q-item multiline>
                                        <q-item-main>
                                          <q-item-tile>
                                            <q-input 
                                              color="grey-9"
                                              float-label="Debit < 2000 (%)" 
                                              readonly
                                            class="no-pointer-events" v-model="shortLead.debitLessthanAmount"
                                            />
                                          </q-item-tile>
                                        </q-item-main>
                                        <q-item-main>
                                          <q-item-tile>
                                            <q-input 
                                              color="grey-9"
                                              float-label="Debit < 2000 (%)"
                                              readonly
                                            class="no-pointer-events" v-model="shortLead.debitGreaterthanAmount" 
                                            />
                                          </q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item-separator />
                                    <q-item multiline>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Std CC (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="shortLead.stdCC" 
                                            /> 
                                        </q-item-tile>
                                      </q-item-main>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Premium CC (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="shortLead.premiumCC" 
                                            />
                                        </q-item-tile>
                                         </q-item-main>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Corp (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="shortLead.corpIntlCC" 
                                            />
                                        </q-item-tile>
                                         </q-item-main>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Intl (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="shortLead.corpIntlCC" 
                                            />
                                        </q-item-tile>
                                         </q-item-main>
                                      <q-item-main>
                                        <q-item-tile>
                                            <q-input 
                                                color="grey-9"
                                                float-label="Super Pre CC (%)" 
                                                readonly
                                            class="no-pointer-events" v-model="shortLead.corpIntlCC" 
                                            />
                                        </q-item-tile>
                                         </q-item-main>
                                    </q-item>
                                    <q-item class="items-start q-pa-sm" v-if="shortLead.posEnable">
                                        <q-checkbox v-model="shortLead.posEnable" class="no-pointer-events" color="purple-9">
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
                    <div class="col-md-12 col-sm-12 col-xs-12 ">
                        <div v-if="formData.shortLead.leadCategory == 2">
                            <q-card v-if="formData.shortLead.kyc" class="q-ma-xs border-1 q-custom-class" flat>
                                <q-card-title class="q-pa-sm bottom-border title-bg">
                                    <div class="row items-center">
                                        <div class="col-auto q-body-1 text-weight-medium">
                                            Exception KYC
                                        </div>
                                    </div>
                                </q-card-title>
                                <q-card-main class="no-padding">
                                    <div class="row items-center q-pa-sm q-py-md">
                                        <div class="col-md-3 col-sm-12 col-xs-12">
                                            <span class="q-caption text-faded">Reason</span>
                                        </div>
                                        <div class="col-md-9 col-sm-12 col-xs-12">
                                            <span class="q-caption text-faded" v-if="formData.shortLead.reason == null">Reason not specified</span>
                                            <span class="q-caption text-faded" v-else>
                                                {{formData.shortLead.reason}}</span>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                            <q-card v-if="formData.shortLead.bankSubvention" class="q-ma-xs border-1 q-custom-class" flat>
                                <q-card-title class="q-pa-sm bottom-border title-bg">
                                    <div class="row items-center">
                                        <div class="col-auto q-body-1 text-weight-medium">
                                            Exception Bank Subvention
                                        </div>
                                    </div>
                                </q-card-title>
                                <q-card-main class="no-padding">
                                    <div class="row items-center q-pa-sm q-py-md">
                                        <div class="col-md-3 col-sm-12 col-xs-12">
                                            <div class="q-caption text-faded">Reason</div>
                                        </div>
                                        <div class="col-md-9 col-sm-12 col-xs-12">
                                            <div class="q-caption text-faded" v-if="formData.shortLead.reason == null">Reason no specified</div>
                                            <div class="q-caption text-faded" v-else>{{formData.shortLead.reason}}</div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card> 
                            <q-card  v-if="formData.shortLead.pricing" class="q-ma-xs border-1 q-custom-class" flat>
                                <q-card-title class="q-pa-sm bottom-border title-bg">
                                    <div class="row items-center">
                                        <div class="col-auto q-body-1 text-weight-medium">
                                            Exception Pricing
                                        </div>
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
                    <div class="col-md-12 col-sm-12 col-xs-12 ">
                        <q-card class="q-ma-xs border-1" flat>
                            <q-card-title class="q-pa-sm title-bg bottom-border">
                                <span class="q-body-1 text-weight-medium">Documents</span>
                            </q-card-title>
                            <q-card-main class="q-pa-xs">
                                <q-list no-border class="no-padding">
                                    <q-item class="no-padding">
                                        <q-item-main>
                                            <div v-for="(documents,index) in formData.shortLead.leadDocuments" :key="index" >
                                                <div class="row items-center full-width"
                                                v-if="index.toString()==documents[0].subDocumentType">
                                                    <div class="col-md-12 q-body-1">
                                                        <q-collapsible separator indent icon-toggle opened group="closeOnOpen" multiline class="full-width">
                                                            <template slot="header">
                                                                <q-item-side icon="attach_file" />
                                                                <q-item-main class="q-body-1" :sublabel="documents[0].uploadedDocuments.length + 'Document(s)'" :label="index" />
                                                            </template>
                                                            <div v-for="(item,subIndex) in documents[0].uploadedDocuments" :key="subIndex" class="q-py-sm">
                                                                <div v-if="item.mimeType.includes('application')">
                                                                    <div @click="fnPDFViewModal(item.fileName)" class="cursor-pointer no-underline">
                                                                        <q-icon name="fas fa-file-pdf" color="negative" />
                                                                        &nbsp;{{item.fileName}}
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
                                                        </q-collapsible>
                                                    </div>
                                                </div>
                                                    
                                                <div class="row items-center full-width" v-else>
                                                    <!-- <pre>{{documents}}</pre> -->
                                                    <div class="col-md-12 q-body-1">
                                                        <q-collapsible separator indent sicon-toggle opened group="closeOnOpen"  class="full-width">
                                                            <template slot="header">
                                                                <q-item-side  icon="apps" />
                                                                <q-item-main class="q-body-1" 
                                                                :sublabel="documents.length + 'Type(s)'"
                                                                 :label="index" />
                                                            </template>
                                                            <div class="row items-center full-width" v-for="(subDocument,subIndex) in documents" :key="subIndex">
                                                                <div class="col-md-12 q-body-1">
                                                                    <q-collapsible separator icon-toggle opened group="closeOnOpenSubDocument" multiline class="full-width" >
                                                                        <template slot="header">
                                                                            <q-item-side icon="attach_file" />
                                                                            <q-item-main class="q-body-1" 
                                                                            :sublabel="subDocument.uploadedDocuments.length + 'Document(s)'"
                                                                            :label="subDocument.subDocumentType" />
                                                                        </template>
                                                                        <div v-for="(item,subIndex) in subDocument.uploadedDocuments" :key="subIndex" class="q-py-sm cursor-pointer">
                                                                            <div v-if="item.mimeType.includes('application')">
                                                                                <div @click="fnPDFViewModal(item.fileName)">
                                                                                    <q-icon name="fas fa-file-pdf" color="negative" />
                                                                                    &nbsp;{{item.fileName}}
                                                                                </div>
                                                                            </div>
                                                                            <div v-else-if="item.mimeType.includes('image')">
                                                                                <viewer :images="[GLOBAL_FILE_FETCH_URL+ '/'+item.fileName]">
                                                                                    <img :src="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName" style="max-width:100%">
                                                                                </viewer>
                                                                            </div>
                                                                            <div v-else>
                                                                                No document attached
                                                                            </div>
                                                                        </div>
                                                                    </q-collapsible>
                                                                </div>
                                                            </div>
                                                        </q-collapsible>
                                                    </div>
                                                </div>
                                            </div>
                                        </q-item-main>
                                    </q-item>
                                </q-list>
                            </q-card-main>
                        </q-card>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex" v-if="getShortLeadInfo.isStatus != 7">
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
                    icon="check"
                    color="positive"
                    class="q-ma-sm"
                    @click="fnApproveLeadData(getShortLeadInfo)"
                    label="Send to OPS Head"
                />
                <q-btn
                    icon="clear"
                    class="q-ma-sm"
                    color="negative"
                    label="REJECT"
                    @click="fnToggleRejectLeadComp"
                />
            </div>
        </div>
        
        <!-- START >> COMPONENT: Final approval -->
        <showApproveRemarksComponent
        v-if="toggleApproveLeadModal"
        :propToggleLeadModal="toggleApproveLeadModal"
        :propLeadDetails="getShortLeadInfo"
        @toggleLeadModal="fnApproveLeadData"
        ></showApproveRemarksComponent>
        <!-- END >> COMPONENT: Final approval -->
        
        <!-- START >> COMPONENT: Final reject -->
        <showRejectLeadRejectComponent
        v-if="toggleLeadRejectModal"
        :propToggleLeadModal="toggleLeadRejectModal"
        :propLeadDetails="getShortLeadInfo"
        @toggleLeadModal="fnToggleRejectLeadComp"
        ></showRejectLeadRejectComponent>
        <!-- END >> COMPONENT: Final reject -->

        <!-- START >> COMPONENT: Document reject  -->
        <showDocumentLeadApproveComponent
        v-if="toggleLeadDocumentApproveModal"
        :propToggleDocumentApproveModal="toggleLeadDocumentApproveModal"
        :propDocumentDetails="documentApproveTempArr"
        @toggleDocumentModal="fnDocumentApproveModal"
        ></showDocumentLeadApproveComponent>
        <!-- END >> COMPONENT: Document approve -->

        <!-- START >> COMPONENT: Document reject  -->
        <showDocumentLeadRejectComponent
        v-if="toggleLeadDocumentRejectModal"
        :propToggleDocumentRejectModal="toggleLeadDocumentRejectModal"
        :propDocumentDetails="documentRejectTempArr"
        @toggleDocumentModal="fnDocumentRejectModal"
        ></showDocumentLeadRejectComponent>
        <!-- END >> COMPONENT: Document reject -->

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
import { mapGetters, mapActions } from "vuex";
import { easing } from "quasar";

import showApproveRemarksComponent from "../../components/sat/showApproveRemarksComponent.vue";
import showRejectLeadRejectComponent from "../../components/sat/showRejectLeadRejectComponent.vue";
import showDocumentLeadApproveComponent from "../../components/sat/showDocumentLeadApproveComponent.vue";
import showDocumentLeadRejectComponent from "../../components/sat/showDocumentLeadRejectComponent.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

const VERIFIED_KYC_STATUS_FINANCE_PENDING = 6;
const VERIFIED_PRICING_STATUS_FINANCE_PENDING = 4;
const VERIFIED_BANKSUBVENTION_STATUS_FINANCE_PENDING = 3;

export default {
  name: "leadDataEntry",
  components: {
    showPdfModalComponent,
    showApproveRemarksComponent,
    showRejectLeadRejectComponent,
    showDocumentLeadApproveComponent,
    showDocumentLeadRejectComponent
  },
  data() {
    return {
      toggleApproveLeadModal: false,
      toggleLeadRejectModal: false,
      toggleLeadDocumentApproveModal: false,
      toggleLeadDocumentRejectModal: false,
      toggleshowPDFModal: false,
      PDFDetails: null,

      documentApproveTempArr: [],
      documentRejectTempArr: [],
      rejectTempArr: [],

      showProceedToDataEntryButton: false,
      toggleAjaxLoadFilter: false,

      model: "",
      tabsModel: "xtab-2",

      toggleChequeImageResult: false,
      checked: false,
      thumbnailsHorizontal: false,

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
    window.addEventListener("scroll", this.handleScroll);
    //function to load all lead details when page loads
    this.ajaxLoadShortLeadInfo();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions("SatLeadValidation", ["FETCH_SHORT_LEAD_DATA"]),
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

    // function to toggle cheque image for payments info if available
    toggleChequeImage() {
      this.toggleChequeImageResult = !this.toggleChequeImageResult;
    },

    fnDocumentApproveModal(documentDetails) {
      this.toggleLeadDocumentApproveModal = !this
        .toggleLeadDocumentApproveModal;
      this.$set(documentDetails, "leadId", this.$route.params.id);
      this.documentApproveTempArr = documentDetails;
    },

    fnDocumentRejectModal(documentDetails) {
      this.toggleLeadDocumentRejectModal = !this.toggleLeadDocumentRejectModal;
      this.$set(documentDetails, "leadId", this.$route.params.id);
      this.documentRejectTempArr = documentDetails;
    },

    // function to approve lead and send to OPS HEAD
    fnApproveLeadData(leadInfo) {
      this.toggleApproveLeadModal = !this.toggleApproveLeadModal;
    },

    // funcion to toggle reject lead component
    fnToggleRejectLeadComp() {
      this.toggleLeadRejectModal = !this.toggleLeadRejectModal;
    },

    // funcion to toggle pdf component
    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      //   this.PDFDetails = "http://www.africau.edu/images/default/sample.pdf";
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },

    handleScroll(event) {
      // Any code to be executed
      // when the window is scrolled
      console.log("event >> <<", event);
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
