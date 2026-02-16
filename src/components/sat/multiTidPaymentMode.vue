<template>
  <div>
    <q-dialog
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitToggleReject(toggleModel)"
      @escape-key="emitToggleReject(toggleModel)"
      :content-css="{ padding: '100px', minWidth: '70vw' }"
    >
      <div>
        <div align="center" class="text-subtitle1 q-mb-md capitalize">
          {{
            this.propShowRejectComponent.data.institutionCode == "112"
              ? "DBS INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "106"
              ? "EQUITAS INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "101"
              ? "IOB INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "102"
              ? "FEDERAL INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "103"
              ? "CORP INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "104"
              ? "AXIS INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "105"
              ? "AU INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "107"
              ? "MPOS INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "108"
              ? "SIB INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "110"
              ? "UPI INSTANCE"
              : this.propShowRejectComponent.data.institutionCode == "109"
              ? "KVB INSTANCE"
              : null
          }}
        </div>
        <div align="center" class="text-light-blue text-h6 q-mb-md">
          <span>#{{ this.propShowRejectComponent.data.baseTid }}</span> |
          {{ this.propShowRejectComponent.data.rrId }} |
          {{ this.propShowRejectComponent.data.scheme }}
        </div>
        <div align="left" class="text-weight-light text-grey-8 q-mb-md">
          Select Payment Mode
        </div>
        <div class="gutter-xs">
          <q-card style="width: 100%">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-select
                placeholder="Choose from the below"
                color="grey-9"
                v-model.trim="formdata.paymentMode"
                :error="$v.formdata.paymentMode.$error"
                float-label="Payment mode"
                :options="paymnentModeOptions"
              />
            </div>
          </q-card>
        </div>
        <br />
        <div align="left" class="text-weight-light text-grey-8 q-mb-md">
          Select Combined Settlement Flag
        </div>
        <div class="gutter-xs">
          <q-card style="width: 100%">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-select
                placeholder="Choose from the below"
                color="grey-9"
                v-model.trim="formdata.combinedSettlementFlag"
                :error="$v.formdata.combinedSettlementFlag.$error"
                float-label="Combined Settlement Flag "
                :options="combinedSettlementFlagOptions"
              />
            </div>
          </q-card>
        </div>
        <br />
        <div align="left" class="text-weight-light text-grey-8 q-mb-md">
          Routed to Hitachi or Not
        </div>
        <div class="gutter-xs">
          <q-card style="width: 100%">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-select
                placeholder="Choose from the below"
                color="grey-9"
                v-model.trim="formdata.ONBOARDING_REQD"
                :error="$v.formdata.ONBOARDING_REQD.$error"
                float-label="Select Yes Or No"
                :options="onboardingRequestOptions"
              />
            </div>
          </q-card>
        </div>
        <br />
        <div align="right">
          <q-btn
            v-if="this.propShowRejectComponent.data.institutionCode != '104'"
            color="positive"
            class="q-ma-sm float-right"
            @click="finalFormSubmit(formdata)"
            align="right"
            label="Submit To Mars"
          />
          <q-btn
            v-if="this.propShowRejectComponent.data.institutionCode == '104'"
            color="teal"
            class="q-ma-sm float-right"
            @click="OpenAdditionalInfo()"
            align="right"
            label="Additional Info"
          />
          <q-btn
            align="right"
            color="grey-9"
            class="float-right q-ma-sm"
            @click="emitToggleReject(showRejectModel)"
            >Cancel
          </q-btn>
        </div>
      </div>
    </q-dialog>
    <additionalInfo
      v-if="showRejectAdditionalInfo"
      :showRejectAdditionalInfo="showRejectAdditionalInfo"
      :propToggleadditionalInfo="propAdditionalInfoDetails"
      @closeRejectModel="OpenAdditionalInfo"
    ></additionalInfo>
  </div>
</template>
<script>


import { LocalStorage } from "quasar";
import additionalInfo from "./additionalInfo";
import multiTidComponents from "./multiTidComponents.vue";
import multiTidPaymentMode from "./multiTidPaymentMode";
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
  decimal,
} from "@vuelidate/validators";

import { date } from "quasar";
import moment from "moment";
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import { uid } from "quasar";


import viewLeadDocumentsDataEntryComponent from "./viewLeadDocumentsDataEntryComponent.vue";
// import MarsErrorResponse from "../MarsErrorResponseHandler.vue";

import { helpers } from "@vuelidate/validators";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
const panCard = helpers.regex(
  "panCard",
  /^([A-Z]{3}[ABCFEGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1})?$/
);

const gstn = helpers.regex(
  "gstn",
  // /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9]{1})+$/
  /^([0-9]){2}([A-Z]{3}[ABCFEGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[0-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
);

// 4 alphabets, 5 numbers, 1 number
const tanValidate = helpers.regex("tanValidate", /[A-Za-z]{4}\d{5}[A-Za-z]{1}/);
const timeValidate = helpers.regex("timeValidate", /^(?:\d|[01]\d|2[0-3])\.[0-5]\d$/);

// const alphaNumericValidate = helpers.regex(
//   "alphaNumericValidate",
//   /^[a-zA-Z ]*$/
// );
// const alphaNumericValidate = helpers.regex(
//   "alphaNumericValidate",
//   /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/
// );
const alphaNumericValidate = helpers.regex(
  "alphaNumericValidate",
  /^(?:[A-Za-z0-9]+)(?:[A-Za-z0-9 ]*)$/
);
const alphaNumericSpecialValidate = helpers.regex(
  "alphaNumericSpecialValidate",
  /^[ A-Za-z0-9_@.*#/!%^()&+-,"]*$/
);

export default {
  props: ["showRejectPaymentMode", "propShowRejectComponent"],
components: {
       additionalInfo
    },
  data() {
    return {
      toggleModel: this.propShowRejectComponent,
      showRejectAdditionalInfo:false,
      propAdditionalInfoDetails: [],
      paymnentModeOptions: [
        {
          label: "Direct credit",
          value: "D",
        },
        {
          label: "NEFT",
          value: "N",
        },
      ],
      combinedSettlementFlagOptions: [
        {
          label: "Yes",
          value: 1,
        },
        {
          label: "No",
          value: 0,
        },
      ],
      onboardingRequestOptions: [
        {
          label: "Yes",
          value: 1,
        },
        {
          label: "No",
          value: 0,
        },
      ],
      baseAndSubTidList: [],
      subTidDuplicateData: [],
      listAllSubTidDetails: [],
      genSubTidFlag: false,
      disabledListAllSubTidDetails: [],
      viewBinding: {},
      subTidArr: [],
      SubTidField: false,
      baseTidFlag: false,
      merchant: this.propShowRejectComponent.merchant,
      propLeadDeatils: this.propShowRejectComponent.propLeadDeatils,
      holdPayment: this.propShowRejectComponent.holdPayment,
      leadId: this.propShowRejectComponent.leadId,
      diners: this.propShowRejectComponent.diners,      
      multiTidpaymentMode:this.formdata,
      data: this.propShowRejectComponent.data.institutionCode,
      formdata: {
        paymentMode: "",
        combinedSettlementFlag: "",
        ONBOARDING_REQD: "",
      },
      propAdditionalInfoDetails: {
        data: {},
        holdPayment: "",
        merchant: {},
        propLeadDeatils: {},
        leadId: "",
        diners: {},
      },
    };
  },
  error: {
    formdata: {
      paymentMode: {
        alert: false,
        issue: "",
        value: "",
      },
      combinedSettlementFlag: {
        alert: false,
        issue: "",
        value: "",
      },
      ONBOARDING_REQD: {
        alert: false,
        issue: "",
        value: "",
      },
    },
  },
  validations: {
    formdata: {
      paymentMode: {
        required,
      },
      combinedSettlementFlag: {
        required,
      },
      ONBOARDING_REQD: {
        required,
      },
    },
    viewBinding: {
      partnersArr: {
        required: requiredIf(function () {
          return this.getPartnersVisiblity;
        }),
        $each: {
          name: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(120),
            alphaNumericValidate,
          },
          dob: {
            required,
          },
          address: {
            minLength: minLength(1),
            maxLength: maxLength(120),
            required,
          },
          pan: {
            required,
            panCard,
            maxLength: maxLength(10),
            minLength: minLength(10),
          },
          pin: {
            required,
            integer,
            minLength: minLength(6),
            maxLength: maxLength(7),
          },
          stateRefCode: {
            required,
            integer,
          },
          stateRefLabel: {
            required,
          },
          cityRefCode: {
            required,
            integer,
          },
          cityRefLabel: {
            required,
          },
          contactMobile: {
            required,
            integer,
            minLength: minLength(10),
            maxLength: maxLength(10),
          },
          contactEmail: {
            required,
            email,
          },
        },
      },
    },
  },
  beforeMount() {
   

    this.merchant = this.propShowRejectComponent.merchant;
    this.data = this.propShowRejectComponent.data;
    this.merchant.leadId = this.propShowRejectComponent.leadId;
    // this.institutionCode = this.propShowRejectComponent.data.institutionCode;
    this.propLeadDeatils = this.propShowRejectComponent.propLeadDeatils;
    this.diners = this.propShowRejectComponent.diners;
    this.holdPayment = this.propShowRejectComponent.holdPayment;
    this.multiTidpaymentMode = this.formdata;
    this.formData = this.propShowRejectComponent.diners;
    this.viewBinding = {
      partnersArr: [
        {
          name: "",
          address: "",
          pan: "",
          pin: null,
          cityRefCode: "",
          cityRefLabel: "",
          stateRefCode: "",
          stateRefLabel: "",
          contactMobile: "",
          contactEmail: "",
        },
      ],
    };
    this.fetchAllValuesFromMARSapi();
  },
  computed: {
    ...mapGetters("mars_dataSubmit", ["marsSavedDataFromInternal"]),
  },
  methods: {
    ...mapActions("mars_dataSubmit", [
      "MARS_DATA_SUBMIT_INTERNAL",
      "MARS_DATA_SUBMIT_EXTERNAL",
      "MARS_DATA_EXTERNAL_SUBMIT_RESPONSE",
      "SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS",
      "FETCH_SAVED_DATA_FROM_OWN_DB",
    ]),
    ...mapActions("leadInformationVasMapping", [
      "LEAD_INFORMATION_VAS_MAPPING_DERTAILS",
      "SAVEING_THE_LEAD_STATUS_DETAILS",
      "GET_LEAD_INFORMATION_VAS_MAPPING_DERTAILS",
      "CREATE_BASE_TID",
      "LOAD_GET_SUB_TID_LIST",
      "GET_BASE_TID_LIST",
      "GET_SUB_TID_LIST",
      "CREATE_SUB_TIDS_LIST",
    ]),

    emitToggleReject(toggleModel) {
      this.$emit("closeRejectModel");
    },

    commonDateFormatDOB1(selectedDate) {
      if (selectedDate == "" || selectedDate == null || selectedDate == "Invalid date") {
        return null;
      } else {
        if (typeof selectedDate === "number") {
        
          return moment(selectedDate).format("DD/MM/YYYY");
        } else {
          return selectedDate;
        }
      }
    },

    //Common function for data format
    commonDateFormat(selectedDate) {
      if (selectedDate == "" || selectedDate == null || selectedDate == "Invalid date") {
        return null;
      } else {
        return moment(selectedDate).format("YYYY-MM-DD");
      }
    },
    //Common function for data format
    commonDateFormatInvalidMARSformat(selectedDate) {
      if (selectedDate == "" || selectedDate == null || selectedDate == "Invalid date") {
        return null;
      } else {
        return moment(selectedDate, "DD/MM/YYYY").format("YYYY-MM-DD");
      }
    },
    commonDateFormatDOB(selectedDate) {
      if (selectedDate == "" || selectedDate == null || selectedDate == "Invalid date") {
        return null;
      } else {
        return moment(selectedDate).format("DD-MM-YYYY");
      }
    },
    updateLeadStatus(request) {
      this.SAVEING_THE_LEAD_STATUS_DETAILS(request)
        .then((response) => {
          if (response.status == 200) {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: response.message,
              icon: "thumb_up",
            });
          } else {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Something went wrong!",
              icon: "clear",
            });
          }
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:
              error.body != null
                ? error.body.message
                : "Lead Information status update failed!",
            icon: "clear",
          });
          this.$q.loading.hide();
        });
    },
    OpenAdditionalInfo(token) {
      // this.showRejectAdditionalInfo = !this.showRejectAdditionalInfo;
      this.$v.formdata.$touch();
      if (this.$v.formdata.$error) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info",
        });
      } else {
        this.showRejectAdditionalInfo = !this.showRejectAdditionalInfo;
        this.propAdditionalInfoDetails.holdPayment = this.holdPayment;
        this.propAdditionalInfoDetails.merchant = this.merchant;
        this.propAdditionalInfoDetails.data = this.data;
        this.propAdditionalInfoDetails.propLeadDeatils = this.propLeadDeatils;
        this.propAdditionalInfoDetails.leadId = this.leadId;
        this.propAdditionalInfoDetails.diners = this.diners;
        this.propAdditionalInfoDetails.multiTidpaymentMode = this.formdata;
      
        if (token == "refresh") {
          this.emitToggleReject();
        }
      }
    },
    loadingSubTid(request) {
      // LOAD_GET_SUB_TID_LIST
      this.LOAD_GET_SUB_TID_LIST(request)
        .then((response) => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: response.body.message,
            icon: "thumb_up",
          });
          let res = response.body.data;
          this.listAllSubTidDetails = res;
        })
        .catch((error) => {
          this.$q.loading.hide();
        });
    },
    // MARS DATA STORING START
    fetchAllValuesFromMARSapi() {
      if (
        this.propShowRejectComponent.data.leadInformation.marsFormSubmitAction == 1 ||
        this.propShowRejectComponent.data.leadInformation.marsFormSubmitAction == 2
      ) {
        return this.FETCH_SAVED_DATA_FROM_OWN_DB({
          leadId: this.merchant.leadId,
        })
          .then(() => {
            //Date formatting for MARS
            return this.$set(
              this.marsSavedDataFromInternal.salesInformation,
              "applicationDate",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.salesInformation.applicationDate
              )
            );
          })
          .then(() => {
            return this.$set(
              this.marsSavedDataFromInternal.salesInformation,
              "aggreementDate",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.salesInformation.aggreementDate
              )
            );
          })
          .then(() => {
            return this.$set(
              this.marsSavedDataFromInternal.salesInformation,
              "loanDisbursementDate",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.salesInformation.loanDisbursementDate
              )
            );
          })
          .then(() => {
            return this.$set(
              this.marsSavedDataFromInternal.salesInformation,
              "tenureStartDate",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.salesInformation.tenureStartDate
              )
            );
          })
          .then(() => {
            return this.$set(
              this.marsSavedDataFromInternal.companyInformation,
              "establishYear",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.companyInformation.establishYear
              )
            );
          })
          .then(() => {
            return this.$set(
              this.marsSavedDataFromInternal.bankInformation.collectionDetails,
              "chequeDepositedDate",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.bankInformation.collectionDetails
                  .chequeDepositedDate
              )
            );
          })
          .then(() => {
            return this.$set(
              this.marsSavedDataFromInternal.bankInformation.collectionDetails,
              "collectedDate",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.bankInformation.collectionDetails
                  .collectedDate
              )
            );
          })
          .then(() => {
            return this.$set(
              this.marsSavedDataFromInternal.bankInformation.collectionDetails,
              "chequeDate",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.bankInformation.collectionDetails
                  .chequeDate
              )
            );
          })
          .then(() => {
            return this.$set(
              this.marsSavedDataFromInternal.businessInformation,
              "memberSince",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.businessInformation.memberSince
              )
            );
          })

          .then(() => {
            return this.$set(
              this.marsSavedDataFromInternal.businessInformation,
              "lastTurnoverYear",
              this.commonDateFormat(
                this.marsSavedDataFromInternal.businessInformation.lastTurnoverYear
              )
            );
          })
          .then(() => {
            this.merchant.salesInformation = this.marsSavedDataFromInternal.salesInformation;
            this.merchant.companyInformation = this.marsSavedDataFromInternal.companyInformation;
            this.merchant.businessInformation = this.marsSavedDataFromInternal.businessInformation;
            this.viewBinding.partnersArr = this.marsSavedDataFromInternal.partnerInformation;
            let errorThis = this;
            let errorObj = {
              name: {
                alert: false,
                issue: "",
                value: "",
              },
              address: {
                alert: false,
                issue: "",
                value: "",
              },
              pan: {
                alert: false,
                issue: "",
                value: "",
              },
              pin: {
                alert: false,
                issue: "",
                value: "",
              },
              stateRefCode: {
                alert: false,
                issue: "",
                value: "",
              },
              cityRefCode: {
                alert: false,
                issue: "",
                value: "",
              },
              contactMobile: {
                alert: false,
                issue: "",
                value: "",
              },
              contactEmail: {
                alert: false,
                issue: "",
                value: "",
              },
            };
            errorThis.error.field.merchant.partnerInformation = [];
            this.viewBinding.partnersArr.map(() => {
              errorThis.error.field.merchant.partnerInformation.push(errorObj);
            });
            this.merchant.paymentDetails = this.marsSavedDataFromInternal.paymentDetails;
            this.merchant.bankInformation = this.marsSavedDataFromInternal.bankInformation;
            this.merchant.mdrPlan = this.marsSavedDataFromInternal.mdrPlan;
            if (this.marsSavedDataFromInternal.SharingDiscountFee != null) {
              this.merchant.SharingDiscountFee = this.marsSavedDataFromInternal.sharingDiscountFee;
            }
            this.merchant.companyInformation.constitution = this.propLeadDeatils.merchantType.marsMappingId;
          });
      } else {
        return true;
      }
    },
    // MARS DATA STORING END

    finalFormSubmit(request) {
      this.$v.formdata.$touch();
      if (this.$v.formdata.$error) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info",
        });
      } else {
        this.subTidArr = [];
        this.subTidArr.push({ request });
        let self = this;
        self.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating ..",
        });
        const finalRequest = { action: 2, merchant: self.merchant };
        finalRequest.merchant.leadId = self.$route.params.id;
        finalRequest.merchant.holdPayment = finalRequest.holdPayment;
        let a = {
          ...finalRequest.merchant.mdrPlan,
        };
        finalRequest.merchant.mdrPlan = { ...a, diners: this.formData };
        finalRequest.merchant.businessInformation.currentPosName =
          finalRequest.merchant.businessInformation.currentPosName == "N"
            ? ""
            : finalRequest.merchant.businessInformation.currentPosName;
        finalRequest.merchant.companyInformation.constitutionName =
          finalRequest.merchant.companyInformation.constitutionName == "61"
            ? "60"
            : finalRequest.merchant.companyInformation.constitutionName;
        (finalRequest.merchant.paymentDetails.emiStartDate = this.commonDateFormatDOB1(
          finalRequest.merchant.paymentDetails.emiStartDate
        )),
          (finalRequest.merchant.revParamAndLeadInfo = {
            bijlipaySwitch: this.propLeadDeatils.bijlipaySwitch,
            vasInstanceMapping: this.propLeadDeatils.vasInstanceMapping,
          });
        finalRequest.merchant.revParameters.notificationRecipient =
          finalRequest.merchant.revParameters.notificationRecipient == "N"
            ? null
            : finalRequest.merchant.revParameters.notificationRecipient;
        if (this.data.institutionCode != "110") {
         
          finalRequest.merchant.revParameters.upiFlag =
            finalRequest.merchant.revParameters.upiFlag == "1"
              ? "0"
              : finalRequest.merchant.revParameters.upiFlag;
        } else if (this.data.institutionCode == "110") {
        
          finalRequest.merchant.revParameters.upiFlag =
            finalRequest.merchant.revParameters.upiFlag == "0"
              ? "1"
              : finalRequest.merchant.revParameters.upiFlag;
        }
        finalRequest.merchant.bankInformation.bankDetails.paymentMode =
          request.paymentMode;
        finalRequest.merchant.revParameters.combinedSettlementFlag =
          request.combinedSettlementFlag;
        finalRequest.merchant.revParameters.ONBOARDING_REQD = request.ONBOARDING_REQD;

        self
          .MARS_DATA_SUBMIT_INTERNAL(finalRequest)
          .then((response) => {
            self.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Saved.. Sending data to mars",
            });
            let key = this.data.institutionCode;
            this.$q.localStorage.set("aa_t", key);
            delete this.merchant.customIncentiveRates[0].add;
            delete this.merchant.customIncentiveRates[1].add;
            delete this.merchant.customIncentiveRates[2].add;
            delete this.merchant.customIncentiveRates[3].add;
            delete this.merchant.customIncentiveRates[4].add;

            delete finalRequest.merchant.leadId;
            delete finalRequest.action;
            delete finalRequest.merchant.revParamAndLeadInfo;
            delete finalRequest.merchant.holdPayment;
            delete finalRequest.merchant.SharingDiscountFee;
            if (this.propLeadDeatils.mAtmOnboardingPlan != null) {
              if (
                this.propLeadDeatils.mAtmOnboardingPlan.leadSource.sourceName == "ATM" &&
                this.propLeadDeatils.mAtmOnboardingPlan.planName == "Kannor ATM Plan"
              ) {
                finalRequest.merchant.mdrPlan.incentive.fixed =
                  finalRequest.merchant.mdrPlan.incentive.fixed;
                finalRequest.merchant.mdrPlan.incentive.percentage =
                  finalRequest.merchant.mdrPlan.incentive.percentage;
                finalRequest.merchant.mdrPlan.incentive.minimum =
                  finalRequest.merchant.mdrPlan.incentive.minimum;
                finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                  finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
              } else {
                finalRequest.merchant.mdrPlan.incentive.percentage =
                  finalRequest.merchant.mdrPlan.incentive.percentage == 0
                    ? null
                    : finalRequest.merchant.mdrPlan.incentive.percentage;
                finalRequest.merchant.mdrPlan.incentive.fixed =
                  finalRequest.merchant.mdrPlan.incentive.fixed == 0
                    ? null
                    : finalRequest.merchant.mdrPlan.incentive.fixed;
                finalRequest.merchant.mdrPlan.incentive.minimum =
                  finalRequest.merchant.mdrPlan.incentive.minimum == 0
                    ? null
                    : finalRequest.merchant.mdrPlan.incentive.minimum;
                finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                  finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0
                    ? null
                    : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
              }
            } else {
              finalRequest.merchant.mdrPlan.incentive.percentage =
                finalRequest.merchant.mdrPlan.incentive.percentage == 0
                  ? null
                  : finalRequest.merchant.mdrPlan.incentive.percentage;
              finalRequest.merchant.mdrPlan.incentive.fixed =
                finalRequest.merchant.mdrPlan.incentive.fixed == 0
                  ? null
                  : finalRequest.merchant.mdrPlan.incentive.fixed;
              finalRequest.merchant.mdrPlan.incentive.minimum =
                finalRequest.merchant.mdrPlan.incentive.minimum == 0
                  ? null
                  : finalRequest.merchant.mdrPlan.incentive.minimum;
              finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0
                  ? null
                  : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
            }
            finalRequest.merchant.paymentDetails.numberOfTerminals = 1;
            let size = finalRequest.merchant.partnerInformation.length;
            for (var i = 0; i < size; i++) {
              finalRequest.merchant.partnerInformation[i].dob = this.commonDateFormatDOB1(
                finalRequest.merchant.partnerInformation[i].dob
              );
              // if(!moment(finalRequest.merchant.partnerInformation.dob, 'MM/DD/YYYY')){
              //     finalRequest.merchant.partnerInformation[i].dob = this.commonDateFormatDOB1(finalRequest.merchant.partnerInformation[i].dob);
              // }else{
              //     finalRequest.merchant.partnerInformation[i].dob = finalRequest.merchant.partnerInformation[i].dob;
              // }
            }
            // finalRequest.merchant.salesInformation.institutionCode = this.propLeadDeatils.institutionCode != null ? this.propLeadDeatils.institutionCode : finalRequest.merchant.salesInformation.institutionCode;
            finalRequest.merchant.revParameters.isMTIDEnabled =
              this.propShowRejectComponent.data.subTid == true ? 1 : 0;
            finalRequest.merchant.revParameters.bTID =
              this.propShowRejectComponent.data.baseTid != null
                ? this.propShowRejectComponent.data.baseTid
                : "null";
            finalRequest.merchant.revParameters.scheme =
              this.propShowRejectComponent.data.scheme != null
                ? this.propShowRejectComponent.data.scheme
                : "null";
            finalRequest.merchant.revParameters.rrId =
              this.propShowRejectComponent.data.rrId != null
                ? this.propShowRejectComponent.data.rrId
                : "null";
            finalRequest.merchant.revParameters.tidIdentifier =
              this.propShowRejectComponent.data.tidIdentifier != null
                ? this.propShowRejectComponent.data.tidIdentifier
                : "null";
            finalRequest.merchant.revParameters.baseInstitution =
              this.propShowRejectComponent.data.institutionCode != null
                ? this.propShowRejectComponent.data.institutionCode
                : "null";
            finalRequest.merchant.revParameters.baseMid =
              this.propShowRejectComponent.data.baseMid != null
                ? this.propShowRejectComponent.data.baseMid
                : "null";
            finalRequest.merchant.salesInformation.institutionCode = this.propShowRejectComponent.data.institutionCode;
            finalRequest.merchant.partnerInformation.dob = this.propShowRejectComponent.merchant.partnerInformation.dob;
            finalRequest.merchant.revParameters.combinedSettlementFlag =
              request.combinedSettlementFlag;
            finalRequest.merchant.revParameters.ONBOARDING_REQD = request.ONBOARDING_REQD;


            self
              .MARS_DATA_SUBMIT_EXTERNAL({
                params: finalRequest,
                leadStatus: this.propLeadDeatils.leadStatus,
                refNumber: this.propLeadDeatils.merchantRefCode,
              })

              .then((response) => {
                let feed_paramaters;
                if (response.status == 204) {
                  feed_paramaters = {
                    applicationNumber: this.propLeadDeatils.applicationNumber,
                    merchantRefCode: this.propLeadDeatils.merchantRefCode,
                  };
                } else {
                  feed_paramaters = response.body;
                }
                self.$q.loading.show({
                  delay: 0, // ms
                  spinnerColor: "purple-9",
                  message: "Great.. All set to go",
                });
                if (this.propLeadDeatils.leadSource.multiTidEnabled == true) {
                  let param = {
                    merchantRefCode: feed_paramaters.merchantRefCode,
                    marsDeviceId: this.propShowRejectComponent.data.id,
                  };
                  self
                    .SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS(param)
                    .then((response) => {
                      self.$q.notify({
                        color: "positive",
                        position: "bottom",
                        message: "Successfully submitted to MARS",
                        icon: "thumb_up",
                      });
                      self.$q.loading.hide();
                    });
                  self.updateLeadStatus({ leadId: self.$route.params.id, status: 104 });
                }
                self
                  .MARS_DATA_EXTERNAL_SUBMIT_RESPONSE({
                    request: feed_paramaters,
                    leadId: self.$route.params.id,
                  })
                  .then((response) => {
                    self.$q.notify({
                      color: "positive",
                      position: "bottom",
                      message: "Successfully submitted to MARS",
                      icon: "thumb_up",
                    });
                    self.loadingSubTid({ leadId: self.$route.params.id });
                    self.$emit("closeRejectModel");
                    // self.$router.push('/sat/lead/validation/');
                  });
              })
              .catch((error) => {
              
                this.merchant.companyInformation.constitutionName = this.propLeadDeatils.merchantType.merchantTypeName;
                this.$set(
                  finalRequest.merchant.salesInformation,
                  "applicationDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.applicationDate
                  )
                );
                // this.$set(
                //     finalRequest.merchant.partnerInformation,
                //     "dob",
                //     this.commonDateFormatInvalidMARSformat(
                //         finalRequest.merchant.partnerInformation.dob
                //     )
                // );

                this.$set(
                  finalRequest.merchant.salesInformation,
                  "aggreementDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.aggreementDate
                  )
                );

                this.$set(
                  finalRequest.merchant.salesInformation,
                  "loanDisbursementDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.loanDisbursementDate
                  )
                );

                this.$set(
                  finalRequest.merchant.salesInformation,
                  "tenureStartDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.tenureStartDate
                  )
                );

                this.$set(
                  finalRequest.merchant.companyInformation,
                  "establishYear",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.companyInformation.establishYear
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "chequeDepositedDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails
                      .chequeDepositedDate
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "collectedDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails.collectedDate
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "chequeDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails.chequeDate
                  )
                );

                this.$set(
                  finalRequest.merchant.businessInformation,
                  "memberSince",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.businessInformation.memberSince
                  )
                );
                this.$set(
                  finalRequest.merchant.businessInformation,
                  "lastTurnoverYear",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.businessInformation.lastTurnoverYear
                  )
                );

                if (error.data.hasOwnProperty("errorDetails")) {
                  let OThis = this;
                  _.map(error.data.errorDetails, (actual) => {
                    let splitted = actual.field.split("/");
                    if (splitted[1].slice(0, 18) == "partnerInformation") {
                      let findPartnersErrorIndex = actual.field
                        .split("partnerInformation")[1]
                        .slice(1, 2);
                      let computeSplitted = splitted[splitted.length - 1];
                      let fieldErrorFound = eval(`
                        OThis.$v.viewBinding.partnersArr.$each[
                          ${findPartnersErrorIndex}
                        ].${computeSplitted}`);
                      fieldErrorFound.$model = "";
                      OThis.error.tab.partnerInformation = true;

                      let generateErrorMessage = eval(`
                        OThis.error.field.merchant.partnerInformation[
                          ${findPartnersErrorIndex}
                        ]`);
                      generateErrorMessage.alert = true;
                      generateErrorMessage.issue = actual.issue;
                      generateErrorMessage.value = actual.value;
                    } else {
                      let splittingErrorField = `OThis.$v.${splitted.join(".")}`;
                      let fieldErrorFound = eval(splittingErrorField);
                      fieldErrorFound.$model = "";
                      OThis.$set(OThis.error.tab, splitted[1], true);

                      let generateErrorMessage = eval(
                        `OThis.error.field.${splitted.join(".")}`
                      );
                      generateErrorMessage.alert = true;
                      generateErrorMessage.issue = actual.issue;
                      generateErrorMessage.value = actual.value;
                    }
                  });
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: `${error.data.message}`,
                    icon: "thumb_down",
                  });
                } else {
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: `${error.data.message}`,
                    icon: "thumb_down",
                  });
                }
                self.$q.loading.hide();
              });
          })
          .catch(() => {
            self.$q.loading.hide();
          });
      }
    },
  },
};
</script>
