<template>
  <q-page padding>
    <q-stepper flat ref="stepper" v-model="step" color="secondary">
      <q-step default name="campaign" title="Device Deployment">
        <div>
          {{getImplementedQueue.cpvForm}}
          <div class="row gutter-sm q-my-xs">
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="merchant.paymentDetails.deviceSerialNumber"
                class="no-margin"
                float-label="Serial Number"
              />
              <!-- @input="planSelected" -->
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                format="DD/MM/YYYY"
                v-model="merchant.paymentDetails.installationDate"
                class="no-margin"
                float-label="Installation Date"
              />
              <!-- @input="planSelected" -->
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                format="DD/MM/YYYY"
                v-model="merchant.paymentDetails.deinstallationDate"
                class="no-margin"
                float-label="DeInstallation Date"
              />
              <!-- @input="planSelected" -->
            </div>
          </div>
        </div>
        <br />
        <q-stepper-navigation>
          <div>
            <q-btn class="q-ml-sm" color="primary" @click="finalTerminal(merchant)">Submit to mars</q-btn>
          </div>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>
<style>
</style>
<style scoped>
</style>
<script>

import { LocalStorage } from "quasar";
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

import {
  required,
  requiredIf,
  alphaNum,
  integer,
  numeric,
  minLength,
  maxLength,
  email,
  maxValue,
  minValue,
  decimal
} from "@vuelidate/validators";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import { uid } from "quasar";

import MarsErrorResponse from "../../components/MarsErrorResponseHandler.vue";
import showPdfModalComponent from "../../components/sat/showPdfModalComponent.vue";

import { helpers } from "@vuelidate/validators";

const gstn = helpers.regex(
  "gstn",
  // /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9]{1})+$/
  /^([0-9]){2}([A-Z]{3}[ABCFEGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[0-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
);
export default {
  components: {
    showPdfModalComponent,
    MarsErrorResponse
  },
  data() {
    return {
      PDFDetails: null,
      toggleshowPDFModal: false,
      formData: {
        shortLead: this.getShortLeadInfo,
        documentType: []
      },
      check: false,
      merchantTypeSelection: "",
      subDocumentTypeSelection: 0,
      stateOptions: [],
      cityOptions: [],
      dropDown: {
        deviceOptions: [],
        planOptions: [],
        leadSourceOptions: [],
        merchantTypesOptions: []
      },
      info: {
        datainfo1: ""
      },
      merchant: {
        datainfo: ""
      },
      formdata: {
        paymentOption: "",
        referenceNumber: "",
        paymentMadeon: "",
        setupFees: "",
        recurringFees: "",
        verifiedCmsPricingStatus: 1,
        plan: "",
        planCode: "",
        contactName: "",
        contactNumber: "",
        alternateContactNumber: "",
        city: "",
        device: "",
        deviceCount: "",
        leadAddress: "",
        latitude: "",
        longitude: "",
        state: "",
        leadCategory: 2,
        kyc: false,
        verifiedBanksubventionStatus: "",
        reason: "",
        amountCollected: "",
        merchantCategory: "",
        corpCC: "",
        debitGreaterthanAmount: "",
        debitLessthanAmount: "",
        premiumCC: "",
        pricing: 1,
        leadStatus: "",
        submittoRSMDate: "",
        posIncentive: "",
        posEnable: "",
        leadName: "",
        paymentDocumentFile: "",
        paymentDocumentMimeType: ""
      },
      formdata1: {
        paymentOption: "",
        referenceNumber: "",
        paymentMadeon: "",
        setupFees: "",
        recurringFees: "",
        verifiedCmsPricingStatus: 1,
        plan: "",
        planCode: "",
        contactName: "",
        contactNumber: "",
        alternateContactNumber: "",
        city: "",
        device: "",
        deviceCount: "",
        leadAddress: "",
        latitude: "",
        longitude: "",
        state: "",
        leadCategory: 2,
        kyc: false,
        verifiedBanksubventionStatus: "",
        reason: "",
        amountCollected: "",
        merchantCategory: "",
        corpCC: "",
        debitGreaterthanAmount: "",
        debitLessthanAmount: "",
        premiumCC: "",
        pricing: 1,
        leadStatus: "",
        submittoRSMDate: "",
        posIncentive: "",
        posEnable: "",
        leadName: "",
        paymentDocumentFile: "",
        paymentDocumentMimeType: ""
      },
      merchant: {
        salesInformation: {
          institutionCode: ""
        },
        companyinformation: {
          pan: "",
          contactPhone: "",
          legalName: "",
          dbaName: "",
          registeredAddress: "",
          registeredPin: "",
          registeredCityRefCode: "",
          registeredStateRefCode: "",
          registeredCityName: "",
          registeredStateName: "",
          businessNature: "",
          contactMobile: "",
          contactName: "",
          statementEmail: "",
          applicationNumber: ""
        },
        bankInformation: {
          bankDetails: {
            accountNumber: "",
            ifsc: "",
            bankName: "",
            paymentMode: "",
            accountType: ""
          }
        },
        businessInformation: {
          gstId: ""
        },
        kyc: {
          documents: []
        },
        paymentDetails: {
          settlementType: "",
          tipEnabled: "",
          cashAtPosEnabled: "",
          intlCardAcceptance: "",
          preAuth: "",
          rentalPlanCode: "",
          deviceSerialNumber: "",
          installationDate: "",
          deinstallationDate: ""
        },
        mdrPlan: {
          code: 1,
          domesticDebitUpTo2000: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          domesticDebitAbove2000: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          standardOrClassic: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          premiumOrPlatinum: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          superPremiumOrSignature: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          commercialOrCorporate: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          internationalDebitCard: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          internationalCreditCard: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          onus: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          mVisa: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          masterPass: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          cashAtPos: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          },
          convenientFee: {
            fixed: 0.0,
            percentage: 0.0,
            minimum: 0.0
          }
        }
      },
      error: {
        field: {
          merchant: {
            businessInformation: {
              gstId: {
                alert: false,
                issue: "",
                value: ""
              }
            }
          }
        }
      },

      model: "",
      // rental: [
      //   {
      //     label: "Monthly Plan",
      //     value: "1"
      //   },
      //   {
      //     label: "Six Month Plan",
      //     value: "2"
      //   }
      // ],
      payment: [
        {
          label: "Cheque",
          value: 2
        },
        {
          label: "Swipe",
          value: 3
        },
        {
          label: "Neft",
          value: 1
        }
      ],
      autoormanualOptions: [
        {
          label: "Auto Settlement",
          value: "A"
        },
        {
          label: "Manual Settlement",
          value: "M"
        }
      ],
      preauthOptions: [
        {
          label: "Enable",
          value: "Y"
        },
        {
          label: "Disable",
          value: "N"
        }
      ],
      cashandposOptions: [
        {
          label: "Enable",
          value: "Y"
        },
        {
          label: "Disable",
          value: "N"
        }
      ],
      internationalcardOptions: [
        {
          label: "Enable",
          value: "Y"
        },
        {
          label: "Disable",
          value: "N"
        }
      ],
      tipOptions: [
        {
          label: "Enable",
          value: "Y"
        },
        {
          label: "Disable",
          value: "N"
        }
      ],
      paymnentModeOptions: [
        {
          label: "Direct credit",
          value: "D"
        },
        {
          label: "NEFT",
          value: "N"
        }
        // {
        //   label: "IMPS",
        //   value: "I"
        // }
      ],
      accountTypeOptions: [
        {
          label: "Saving account",
          value: "S"
        },
        {
          label: "Current account",
          value: "C"
        },
        {
          label: "Overdraft account",
          value: "O"
        },
        {
          label: "Cash credit account",
          value: "R"
        }
      ]
    };
  },

  computed: {
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus"
    ]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("plan", ["getActivePlan"]),
    ...mapGetters("CategoryBasedMdr", ["categoryBasedMdr"]),
    ...mapGetters("GetMarsData", ["getAllMarsData", "getImplementedQueue"]),
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus",
      "getShortLeadInfoDocumentTypes"
    ]),
    ...mapGetters("mars_city", ["cityFromMars"]),
    ...mapGetters("mars_state", ["stateFromMars"]),
    ...mapGetters("mars_ifsc", ["ifscFromMars"])
  },
  created() {
    this.ajaxLoadLeadDataEntryInfo();

    this.ajaxLoadMarsData();
    // this.FETCH_MARS_DATA(this.getAllMarsData.leadInformation.id);

    this.fetchAndCookDocuments();
    // this.fetchAndCookDocuments();
  },
  validations: {
    formdata: {
      referenceNumber: {
        required
      },
      paymentOption: {
        required
      },
      paymentMadeon: {
        required
      }
      // paymentDocumentFile:{
      //   required
      // },
    },
    merchant: {
      businessInformation: {
        gstId: {
          // required,
          gstn,
          maxLength: maxLength(15),
          minLength: minLength(15)
        }
      }
    }
  },
  methods: {
    ...mapActions("SatLeadValidation", [
      "FETCH_SHORT_LEAD_DATA",
      "VERIFY_DEVICE_FULL_LEAD"
    ]),
    ...mapActions("mars_city", ["CITY_FROM_MARS"]),
    ...mapActions("mars_state", ["STATE_FROM_MARS"]),
    ...mapActions("mars_ifsc", ["IFSC_FROM_MARS"]),
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
    ...mapActions("GetMarsData", ["FETCH_MARS_DATA", "IMPLEMENTED_QUEUE"]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("MdrPlan", ["MDR_PLAN"]),
    ...mapActions("CategoryBasedMdr", [
      "CATEGORY_BASED_MDR_PLAN",
      "EDIT_MDR_PLAN"
    ]),
    ...mapActions("SatLeadValidation", [
      "FEED_HAND_OVER_TO_SAT_DOCUMENT",
      "FEED_CHEQUE_FORM",
      "FEED_FULL_APPLICATION_FORM",
      "DELETE_DOCUMENT_FROM_BY_SAT",
      "FETCH_LEAD_DOCUMENT_TYPE_DATA",
      "FETCH_SHORT_LEAD_DATA"
    ]),
    ...mapActions("SatLeadValidation", [
      "MOVE_BACK_DOCUMENT_VERIFICATION_STAGE"
    ]),
    ...mapActions("SendTORSMCMS", ["SEND_TO_RSM_CMS"]),
    ...mapActions("plan", ["PLAN_ACTIVE_LIST"]),
    ...mapActions("CMS_EDIT_MDR", [
      "CMS_EDIT_MDR",
      "CMS_EDIT_MERCHANT",
      "CMS_EDIT_KYC",
      "CMS_EDIT_TERMINAL"
    ]),

    ajaxLoadLeadDataEntryInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.IMPLEMENTED_QUEUE(this.$route.params.id)
        .then(response => {
          let self = this;
          self.merchant.kyc.documents.push({
            documentName: "CPV Form",
            documentType: 11,
            documentImage: [
              this.GLOBAL_FILE_FETCH_URL +
                "/" +
                this.getImplementedQueue.cpvForm
            ]
          });
          self.merchant.kyc.documents.push({
            documentName: "Implementation Form",
            documentType: 11,
            documentImage: [
              this.GLOBAL_FILE_FETCH_URL +
                "/" +
                this.getImplementedQueue.implementationForm
            ]
          });
          self.merchant.kyc.documents.push({
            documentName: "Picture of Shop",
            documentType: 11,
            documentImage: [
              this.GLOBAL_FILE_FETCH_URL +
                "/" +
                this.getImplementedQueue.pictureOfShop
            ]
          });
          // this.formdata.paymentOption=this.getShortLeadInfo.paymentOption
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },

    // planSelected(item) {

    // this.formdata.plan= item;
    // // this.formdata.planCode=item.planName;
    // // this.formdata.planCode1=item.
    //   console.log("Hello",this.formdata.plan);
    // },
    sendtoFinance(request) {
      this.$v.formdata.$touch();
      if (this.$v.formdata.$error) {
        this.$q.notify("Please review fields again.");
      } else if (
        this.formdata.paymentOption == 2 &&
        this.formdata.paymentDocumentFile == ""
      ) {
        this.$q.notify({
          color: "amber",
          position: "bottom",
          message: "data",
          icon: "attachment",
          message: "Please attach the Cheque File"
        });
      } else {
        let requestparams = {
          url: {
            id: this.getShortLeadInfo.id
          },
          params: {
            setupFees: request.setupFees,
            recurringFees: request.recurringFees,
            planCode: request.planCode,
            verifiedCmsPricingStatus: request.verifiedCmsPricingStatus,
            contactName: request.contactName,
            contactNumber: request.contactNumber,
            alternateContactNumber: request.alternateContactNumber,
            city: request.city,
            device: request.device,
            deviceCount: request.deviceCount,
            leadAddress: request.leadAddress,
            latitude: request.latitude,
            longitude: request.longitude,
            state: request.state,
            leadCategory: request.leadCategory,
            kyc: request.kyc,
            verifiedBanksubventionStatus: request.verifiedBanksubventionStatus,
            reason: request.reason,
            amountCollected: request.amountCollected,
            merchantCategory: request.merchantCategory,
            corpCC: request.corpCC,
            debitGreaterthanAmount: request.debitGreaterthanAmount,
            debitLessthanAmount: request.debitLessthanAmount,
            premiumCC: request.premiumCC,
            pricing: request.pricing,
            leadStatus: request.leadStatus,
            submittoRSMDate: request.submittoRSMDate,
            posEnable: request.posEnable,
            posIncentive: request.posIncentive,
            plan1: request.plan,
            leadName: request.leadName,
            paymentMadeon: request.paymentMadeon,
            referenceNumber: request.referenceNumber,
            paymentOption: request.paymentOption,
            paymentDocumentFile: request.paymentDocumentFile,
            paymentDocumentMimeType: request.paymentDocumentMimeType
          }
        };
        if (this.check == false) {
          requestparams.params.leadCategory = 1;
          requestparams.params.pricing = 0;
        } else {
          requestparams.params.leadCategory = 2;
          requestparams.params.pricing = 1;
        }
        // this.SEND_TO_RSM_CMS(requestparams)
        // this.$q.notify({
        //             color: "positive",
        //             position: "bottom",
        //             message: "Succesfully Send to RSM",
        //             icon: "thumb_up"
        //           });
        //  this.$router.push("/sat/change/management");
        // delete this.formdata.plan;
        this.SEND_TO_RSM_CMS(requestparams)
          .then(response => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "data",
              icon: "thumb_up",
              message: response.data.message
            });
            this.$router.push("/sat/change/management");
            // var self = this;
            // Object.keys(this.formData).forEach(function(key, index) {
            //   self.formData[key] = "";
            // });
          })
          .catch(error => {
            console.log(error);
            this.$q.notify({
              color: "negative",
              position: "bottom",
              icon: "thumb_down",
              message: error.data.message
            });
            // var self = this;
            // Object.keys(this.formData).forEach(function(key, index) {
            //   self.formData[key] = "";
            // });
          });
      }
    },

    sendtoNH(request) {
      let requestparams = {
        url: {
          id: this.getShortLeadInfo.id
        },
        params: {
          setupFees: request.setupFees,
          recurringFees: request.recurringFees,
          planCode: request.planCode,
          verifiedCmsPricingStatus: request.verifiedCmsPricingStatus,
          contactName: request.contactName,
          contactNumber: request.contactNumber,
          alternateContactNumber: request.alternateContactNumber,
          city: request.city,
          device: request.device,
          deviceCount: request.deviceCount,
          leadAddress: request.leadAddress,
          latitude: request.latitude,
          longitude: request.longitude,
          state: request.state,
          leadCategory: request.leadCategory,
          kyc: request.kyc,
          verifiedBanksubventionStatus: request.verifiedBanksubventionStatus,
          reason: request.reason,
          amountCollected: request.amountCollected,
          merchantCategory: request.merchantCategory,
          corpCC: request.corpCC,
          debitGreaterthanAmount: request.debitGreaterthanAmount,
          debitLessthanAmount: request.debitLessthanAmount,
          premiumCC: request.premiumCC,
          pricing: request.pricing,
          leadStatus: request.leadStatus,
          submittoRSMDate: request.submittoRSMDate,
          posEnable: request.posEnable,
          posIncentive: request.posIncentive,
          plan1: request.plan,
          leadName: request.leadName,
          paymentMadeon: request.paymentMadeon,
          referenceNumber: request.referenceNumber,
          paymentOption: request.paymentOption,
          paymentDocumentFile: request.paymentDocumentFile,
          paymentDocumentMimeType: request.paymentDocumentMimeType
        }
      };
      if (this.check == false) {
        requestparams.params.leadCategory = 1;
        requestparams.params.pricing = 0;
      } else {
        requestparams.params.leadCategory = 2;
        requestparams.params.pricing = 1;
      }
      // this.SEND_TO_RSM_CMS(requestparams)
      // this.$q.notify({
      //             color: "positive",
      //             position: "bottom",
      //             message: "Succesfully Send to RSM",
      //             icon: "thumb_up"
      //           });
      //  this.$router.push("/sat/change/management");
      // delete this.formdata.plan;
      this.SEND_TO_RSM_CMS(requestparams)
        .then(response => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: response.data.message
          });
          this.$router.push("/sat/change/management");
          // var self = this;
          // Object.keys(this.formData).forEach(function(key, index) {
          //   self.formData[key] = "";
          // });
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            color: "negative",
            position: "bottom",
            icon: "thumb_down",
            message: error.data.message
          });
          // var self = this;
          // Object.keys(this.formData).forEach(function(key, index) {
          //   self.formData[key] = "";
          // });
        });
    },
    fnVerificationDocumentUpload(event, documentDetails) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Uploading file .."
      });
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      // formData.append("fileNameOriginal", "cheque");

      let requestParams = {
        files: formData,
        leadId: this.$route.params.id,
        documentId: documentDetails.id
      };

      this.FEED_HAND_OVER_TO_SAT_DOCUMENT(requestParams)
        .then(response => {
          this.$q.loading.hide();
          // this.$emit(
          //   "emitAjaxLoadShortLeadInfo",
          //   "hotReloadForDocumentsUploadValidation",
          //   this.merchantTypeSelection
          // );
          this.FETCH_SHORT_LEAD_DATA(this.getShortLeadInfo.id);
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down"
          });
        });
    },
    ajaxLoadDataForDeviceTypeTable1() {
      let self = this;
      self
        .FETCH_DEVICES_DATA()
        .then(() => {
          return _.map(self.getAllDevicesInfo, item => {
            self.dropDown.deviceOptions.push({
              value: item.id,
              label: item.deviceName
            });
          });
        })
        .then(() => {
          self.LEAD_SOURCE_ACTIVE_LIST().then(() => {
            return _.map(self.getActiveLeadSource, item => {
              self.dropDown.leadSourceOptions.push({
                value: item.id,
                label: item.sourceName
              });
            });
          });
        })
        .then(() => {
          self.PLAN_ACTIVE_LIST().then(() => {
            return _.map(self.getActivePlan, item => {
              self.dropDown.planOptions.push({
                value: item.id,
                label: item.planName
              });
            });
          });
        });
    },
    ajaxLoadMarsData() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_MARS_DATA(382)
        .then(response => {
          this.merchant.paymentDetails.settlementType = this.getAllMarsData.paymentDetails.settlementType;
          this.merchant.paymentDetails.tipEnabled = this.getAllMarsData.paymentDetails.tipEnabled;
          this.merchant.paymentDetails.cashAtPosEnabled = this.getAllMarsData.paymentDetails.cashAtPosEnabled;
          this.merchant.paymentDetails.intlCardAcceptance = this.getAllMarsData.paymentDetails.intlCardAcceptance;
          this.merchant.paymentDetails.preAuth = this.getAllMarsData.paymentDetails.preAuth;
          this.merchant.paymentDetails.rentalPlanCode = this.getAllMarsData.paymentDetails.rentalPlanCode;
          this.merchant.salesInformation.institutionCode = this.getAllMarsData.salesInformation.institutionCode;
          this.fetchAndCookDocuments();
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },

    finalTerminal(request) {
      let key = this.merchant.salesInformation.institutionCode;
      this.$q.localStorage.set("a_t", key);
      let requestparams = {
        url: {
          id: this.getAllMarsData.merchantRefCode
        },
        params: {
          merchant: {
            companyInformation: {
              applicationNumber: this.getAllMarsData.salesInformation
                .applicationNumber
            },

            kyc: request.kyc
          }
        }
      };
      let terminalparams = {
        terminal: {
          id: this.getAllMarsData.paymentDetails.terminalModeCode
        },
        terminalparams: {
          merchant: {
            companyInformation: {
              applicationNumber: this.getAllMarsData.salesInformation
                .applicationNumber
            },
            paymentDetails: request.paymentDetails
          },
          paymentDetails: {
            deviceSerialNumber: request.paymentDetails.deviceSerialNumber,
            installationDate: request.paymentDetails.installationDate,
            deinstallationDate: request.paymentDetails.deinstallationDate
          }
        }
      };

      //  let terman

      this.CMS_EDIT_TERMINAL(terminalparams)
        .then(response => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: response.data.message
          });
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            color: "negative",
            position: "bottom",
            icon: "thumb_down",
            message: error.data.message
          });
        });
      this.CMS_EDIT_KYC(requestparams)
        .then(response => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: response.data.message
          });
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            color: "negative",
            position: "bottom",
            icon: "thumb_down",
            message: error.data.message
          });
        });
      console.log(
        "final submit to mars",
        requestparams.params.merchant.salesInformation.institutionCode
      );
    }
  },
  finalFormSubmit(request) {
    let key = this.merchant.salesInformation.institutionCode;
    this.$q.localStorage.set("a_t", key);
    let requestparams = {
      url: {
        id: this.getAllMarsData.merchantRefCode
        //  code:this.getAllMarsData.salesInformation.institutionCode
      },

      params: {
        merchant: {
          companyInformation: {
            applicationNumber: this.getAllMarsData.salesInformation
              .applicationNumber
          },
          mdrPlan: request.mdrPlan
        }
      }
    };

    this.CMS_EDIT_MDR(requestparams)

      .then(response => {
        this.$q.notify({
          color: "positive",
          position: "bottom",
          message: "data",
          icon: "thumb_up",
          message: response.data.message
        });

        // var self = this;
        // Object.keys(this.formData).forEach(function(key, index) {
        //   self.formData[key] = "";
        // });
      })
      .catch(error => {
        console.log(error);
        this.$q.notify({
          color: "negative",
          position: "bottom",
          icon: "thumb_down",
          message: error.data.message
        });
        // var self = this;
        // Object.keys(this.formData).forEach(function(key, index) {
        //   self.formData[key] = "";
        // });
      });
    console.log("final submit to mars", requestparams.url);
  },
  finalFormSubmitKyc(request) {
    let key = this.merchant.salesInformation.institutionCode;
    this.$q.localStorage.set("a_t", key);
    let requestparams = {
      url: {
        id: this.getAllMarsData.merchantRefCode
        //  code:this.getAllMarsData.salesInformation.institutionCode
      },

      params: {
        merchant: {
          companyInformation: {
            applicationNumber: this.getAllMarsData.salesInformation
              .applicationNumber
          },

          kyc: request.kyc
        }
      }
    };

    // this.ajaxLoadLeadDataEntryInfo();
    this.CMS_EDIT_KYC(requestparams)

      .then(response => {
        this.$q.notify({
          color: "positive",
          position: "bottom",
          message: "data",
          icon: "thumb_up",
          message: response.data.message
        });

        // var self = this;
        // Object.keys(this.formData).forEach(function(key, index) {
        //   self.formData[key] = "";
        // });
      })
      .catch(error => {
        console.log(error);
        this.$q.notify({
          color: "negative",
          position: "bottom",
          icon: "thumb_down",
          message: error.data.message
        });
        requestparams.params.kyc = "";
        // var self = this;
        // Object.keys(this.formData).forEach(function(key, index) {
        //   self.formData[key] = "";
        // });
      });
    console.log("final submit to mars", requestparams.url);
  },
  fetchAllDropdownValuesFromMARSapi() {
    // let key = this.merchant.salesInformation.institutionCode
    //     let variable = localStorage.getItem("aa_t")
    //     let v = variable.lastIndexOf('|')
    //     let res = variable.substring(v+1)

    // console.log("ram _"+res);
    // this.merchant.salesInformation.institionCode=this.merchant.companyInformation.mcc;
    // this.$q.localStorage.set("aa_t", key);
    //  console.log("Before Set _"+res)
    let self = this;
    /* API call to fetch regions */
    self
      .CITY_FROM_MARS()
      .then(() => {
        self.cityOptions = [];
        self.cityFromMars.items.map(oo => {
          self.cityOptions.push({ label: oo.name, value: oo.code });
        });
      })

      .then(() => {
        /* API call to fetch state */
        return self.STATE_FROM_MARS().then(response => {
          self.stateOptions = [];
          self.stateFromMars.items.map(oo => {
            self.stateOptions.push({ label: oo.name, value: oo.code });
          });
          // self.stateOptions = stateArr;
        });
      });
  },
  fetchAndCookDocuments() {
    console.log("Hellow world");
    let self = this;
    self.merchant.kyc.documents.push({
      documentName: "Agreement",
      documentType: 11,
      documentImage: [
        this.GLOBAL_FILE_FETCH_URL + "/" + this.getImplementedQueue.cpvForm
      ]
    });
  },
  populateBankDetails() {
    let self = this;
    let ifscArr = [];
    self
      .IFSC_FROM_MARS(this.merchant.bankInformation.bankDetails.ifsc)
      .then(response => {
        if (response.status == 200) {
          this.merchant.bankInformation.bankDetails.bankName =
            self.ifscFromMars.bankName;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear"
          });
          this.merchant.bankInformation.bankDetails.ifsc = "";
          this.merchant.bankInformation.bankDetails.bankName = "";
        }
      });
  },
  /* IFSC bank search result */
  residentStateSearch(terms, done) {
    done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
  },
  registeredStateSelected(item) {
    this.merchant.companyinformation.registeredStateName = item.label;
    this.merchant.companyinformation.registeredStateRefCode = item.value;
  },
  residentStateSearch(terms, done) {
    done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
  },
  residentCitySearch(terms, done) {
    done(this.COMMON_FILTER_FUNCTION(this.cityOptions, terms));
  },
  registeredCitySelected(item) {
    this.merchant.companyinformation.registeredCityName = item.label;
    this.merchant.companyinformation.registeredCityRefCode = item.value;
  },
  COMMON_FILTER_FUNCTION(arraySet, terms) {
    return _.filter(arraySet, function(oo) {
      return (
        oo.label.toLowerCase().includes(terms.toLowerCase()) ||
        oo.value.toString().includes(terms.toString())
      );
    });
  },
  commonDateFormat(selectedDate) {
    if (
      selectedDate == "" ||
      selectedDate == null ||
      selectedDate == "Invalid date"
    ) {
      return null;
    } else {
      return moment(selectedDate).format("DD/MM/YYYY");
    }
  },
  goBackToDocumentVerificationStage() {
    let formData = {
      leadId: this.$route.params.id,
      defaultUrlValue:
        this.getShortLeadInfo.leadStatus ==
        this.$LEAD_STATUS_MARS_REFERRAL_BACK_DATA_ENTRY_PENDING
          ? this.$SAT_LEAD_VALIDATION_PROCEED_TO_DATA_ENTRY_WITH_REFERBACK
          : this.$SAT_LEAD_VALIDATION_APPROVE
    };

    this.$q
      .dialog({
        title: "Confirm",
        message: "Are you sure want to proceed to document verification stage?",
        ok: "Continue",
        cancel: "Cancel"
      })
      .then(() => {
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Processing .."
        });

        this.MOVE_BACK_DOCUMENT_VERIFICATION_STAGE(formData).then(() => {
          this.$router.push("/sat/lead/validation/" + this.$route.params.id);
          this.$q.loading.hide();
        });
      })
      .catch(error => {
        this.$q.loading.hide();
      });
  }
};
</script>
<style>
.customQuasarSelect {
  padding: 5px;
}

label {
  padding: 5px 10px;
  display: table;
}

input[type="file"] {
  display: none;
}
.bg-dark-custom {
  background: rgba(0, 0, 0, 0.5);
}
</style>