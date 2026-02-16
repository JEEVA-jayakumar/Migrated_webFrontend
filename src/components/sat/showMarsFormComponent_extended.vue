<template>
  <div>
    <!-- <pre>{{merchant.kyc.documents}}</pre> -->
    <!-- Documents -->
    <div id="mainContainer" class="row">
      <!-- Documents proof -->
      <div id="leftSidePane" class="col-md-5 q-pa-xs largeCont" v-if="showDocumentPreview">
        <!-- <viewLeadDocuments
          :propLeadDocumentInformation="propLeadDeatils.leadDocuments"
          :propGetShortInfo="propLeadDeatils"
        />-->
      </div>
      <!-- Document related form -->
      <div id="rightSidePane" class="col-md-7 q-pa-xs block relative">
        <q-stepper color="purple-9" ref="stepper" contractable text alternative-labels>
          <q-step error-icon="warning" name="first" title="Sales" subtitle="Info">
            <salesInformation
              :regionOptions="regionOptions"
              :leadFromOptions="leadFromOptions"
              :salesPersonOptions="salesPersonOptions"
              :sharingPartnerOptions="sharingPartnerOptions"
              :salesInformation="merchant.salesInformation"
              :leadDetails="{marsCurrentStatus:propLeadDeatils.marsFormSubmitAction}"
              @goNext="validate"
              @saveData="saveDetails"
            />
          </q-step>
          <q-step error-icon="warning" name="second" title="Details">
            <companyInformation
              :cityOptions="cityOptions"
              :stateOptions="stateOptions"
              :mccSearchSet="mccSearchSet"
              :propLeadDeatils="propLeadDeatils"
              :companyInformation="merchant.companyInformation"
              @goNext="validate"
              @goBack="$refs.stepper.previous()"
              @saveData="saveDetails"
            />
          </q-step>
          <q-step
            error-icon="warning"
            :icon="showPartnerstab?'':'block'"
            name="third"
            title="Partners"
          >
            <!-- :disable="!showPartnerstab" -->
            <partnerInformation
              :constitution="propLeadDeatils.merchantType.marsMappingId"
              :partnerInformation="merchant.partnerInformation"
              :cityOptions="cityOptions"
              :stateOptions="stateOptions"
              @goNext="validate"
              @goBack="$refs.stepper.previous()"
              @saveData="saveDetails"
            />
          </q-step>
          <q-step error-icon="warning" name="fourth" title="Business" subtitle="Info">
            <businessInformation
              :businessInformation="merchant.businessInformation"
              @goNext="validate"
              @goBack="$refs.stepper.previous()"
              @saveData="saveDetails"
            />
          </q-step>
          <q-step error-icon="warning" name="fifth" title="Payment" subtitle="Details">
            <paymentInformation
              :terminalModelSet="terminalModelSet"
              :rentalPlanSet="rentalPlanSet"
              :serviceProviderListSet="serviceProviderListSet"
              :networkProviderListSet="networkProviderListSet"
              :paymentInformation="merchant.paymentInformation"
              @goNext="validate"
              @goBack="$refs.stepper.previous()"
              @saveData="saveDetails"
            />
          </q-step>
          <q-step error-icon="warning" name="sixth" title="Discount" subtitle="Rate">
            <discountInformation
              :sharingModelCode="merchant.salesInformation.sharingModelCode"
              :mdrPlan="merchant.mdrPlan"
              :mdrAddtionalDetails="{debitLessthanAmount:propLeadDeatils.debitLessthanAmount,debitGreaterthanAmount:propLeadDeatils.debitGreaterthanAmount,stdCC:propLeadDeatils.stdCC,premiumCC:propLeadDeatils.premiumCC,superPremiumlCC:propLeadDeatils.superPremiumlCC,corpCC:propLeadDeatils.corpCC,intlCC:propLeadDeatils.intlCC}"
              :SharingDiscountFee="merchant.SharingDiscountFee"
              @goNext="validate"
              @goBack="$refs.stepper.previous()"
              @saveData="saveDetails"
            />
          </q-step>

          <q-step error-icon="warning" name="seventh" title="Bank & Collection" subtitle="Details">
            <bankInformation
              :cityOptions="cityOptions"
              :stateOptions="stateOptions"
              :bankListSet="bankListSet"
              :propLeadDeatils="propLeadDeatils"
              :bankInformation="merchant.bankInformation"
              @goNext="validate"
              @goBack="$refs.stepper.previous()"
              @saveData="saveDetails"
            />
          </q-step>
          <q-step error-icon="warning" name="eight" title="KYC" subtitle="Details">
            <kycInformation
              :propLeadDeatils="propLeadDeatils"
              :kyc="merchant.kyc"
              @save="validate"
              @goBack="$refs.stepper.previous()"
              @saveData="saveDetails"
            />
          </q-step>
        </q-stepper>
      </div>
    </div>
  </div>
</template>

<script>

import salesInformation from "./dataEntry/salesInformation.vue";
import companyInformation from "./dataEntry/companyInformation.vue";
import partnerInformation from "./dataEntry/partnersInformation.vue";
import businessInformation from "./dataEntry/businessInformation.vue";
import paymentInformation from "./dataEntry/paymentInformation.vue";
import discountInformation from "./dataEntry/discountInformation.vue";
import bankInformation from "./dataEntry/bankInformation.vue";
import kycInformation from "./dataEntry/kycInformation.vue";

import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import viewLeadDocuments from "./viewLeadDocumentsDataEntryComponent.vue";

export default {
  name: "leadDataEntry",
  props: ["propLeadDeatils"],
  components: {
    viewLeadDocuments,
    salesInformation,
    companyInformation,
    partnerInformation,
    businessInformation,
    paymentInformation,
    discountInformation,
    bankInformation,
    kycInformation
  },
  data() {
    return {
      showPartnerstab: true,
      viewBinding: {},
      regionOptions: [],
      leadFromOptions: [],
      salesPersonOptions: [],
      sharingPartnerOptions: [],
      cityOptions: [],
      stateOptions: [],
      mccSearchSet: [],
      terminalModelSet: [],
      ifscSet: [],
      rentalPlanSet: [],
      mdrSearchSet: [],
      bankListSet: [],
      networkProviderListSet: [],
      serviceProviderListSet: [],
      //end >> Actual dropdown options values

      holdPayment: 1,
      leadDataEntryRemarks: "",
      merchant: {
        salesInformation: {
          institutionCode: 3,
          applicationType: "D",
          applicationNumber: "",
          applicationDate: "",
          aggreementDate: "",
          merchantType: "M",
          categoryType: "O",
          region: "",
          salesPersonCode: "",
          leadFrom: "",
          sharingModelCode: "N",
          sharingPartnerCode: "",
          dailyFixedAmount: "",
          loanDisbursementPercentage: "",
          loanDisbursementAmount: "",
          loanDisbursementDate: "",
          tenureMonth: "",
          tenureDay: "",
          tenureStartDate: "",
          rentPercentage: 2,
          rentFixed: ""
        },
        companyInformation: {
          legalName: "",
          dbaName: "",
          registeredAddress: "",
          registeredPin: "",
          registeredCityRefCode: "",
          registeredStateRefCode: "",
          constitution: "",
          constitutionName: "",
          constitutionDescription: "",
          establishYear: "",
          registerNumber: "",
          pan: "",
          tin: "",
          tan: "",
          businessNature: "",
          businessType: "R",
          mcc: "",
          residentialAddress: "",
          residentialPin: "",
          residentialCityRefCode: "",
          residentialStateRefCode: "",
          contactName: "",
          contactMobile: "",
          contactAlternateMobile: "",
          contactPhone: "",
          contactEmail: "",
          statementType: "P",
          statementFrequency: "D",
          statementEmail: ""
        },
        businessInformation: {
          weekdayStartHour: "00.00",
          weekdayEndHour: "00.00",
          weekendStartHour: "00.00",
          weekendEndHour: "00.00",
          lastTurnoverYear: 2017,
          lastTurnoverAmount: "",
          expectedCardBusiness: "",
          averageBillAmount: "",
          gstId: null,
          currentPosName: "",
          debitCardMdr: "",
          creditCardMdr: "",
          memberSince: "",
          businessIncome: ""
        },
        partnerInformation: [
          {
            name: "",
            address: "",
            pan: "",
            pin: "",
            stateRefCode: "",
            cityRefCode: "",
            contactMobile: "",
            contactEmail: ""
          }
        ],
        paymentDetails: {
          deviceOwnedBy: "B",
          installationFee: "",
          terminalModeCode: "",
          numberOfTerminals: 1,
          cashAtPosEnabled: "Y",
          rentalPlanCode: 1,
          serviceProvider: 1,
          networkPreferred: 1,
          rentalMode: "S",
          rentalType: "A",
          advanceRentCollected: "",
          advanceRentMode: "NEFT",
          noOfMonthRentPaidInAdvance: "",
          gracePeriod: 0,
          devicePrice: "",
          otherCharges: "",
          totalAmountPaid: ""
        },
        bankInformation: {
          bankDetails: {
            ifsc: "",
            micr: "",
            bankName: "",
            branchName: "",
            bankCityRefCode: "",
            bankStateRefCode: "",
            paymentMode: "D",
            accountType: "S",
            accountNumber: "",
            bankStatementAttached: "Y",
            cancelChequeAttached: "Y",
            feeType: "N",
            settlementOrNeftFee: ""
          },
          collectionDetails: {
            collectedDate: "",
            swipeAmount: "",
            swipeTerminal: "",
            chequeAmount: "",
            chequeDate: "",
            chequeDepositedDate: "",
            chequeNumber: "",
            acquirerBank: ""
          }
        },
        kyc: { documents: [] },
        mdrPlan: {
          code: 1,
          domesticDebitUpTo2000: { fixed: 0, percentage: 0, minimum: 0 },
          domesticDebitAbove2000: { fixed: 0, percentage: 0, minimum: 0 },
          standardOrClassic: { fixed: 0, percentage: 0, minimum: 0 },
          premiumOrPlatinum: { fixed: 0, percentage: 0, minimum: 0 },
          superPremiumOrSignature: { fixed: 0, percentage: 0, minimum: 0 },
          commercialOrCorporate: { fixed: 0, percentage: 0, minimum: 0 },
          internationalDebitCard: { fixed: 0, percentage: 0, minimum: 0 },
          internationalCreditCard: { fixed: 0, percentage: 0, minimum: 0 },
          onus: { fixed: 0, percentage: 0, minimum: 0 },
          mVisa: { fixed: 0, percentage: 0, minimum: 0 },
          masterPass: { fixed: 0, percentage: 0, minimum: 0 },
          cashAtPos: { fixed: 0, percentage: 0, minimum: 0 }
        },
        SharingDiscountFee: {
          domesticDebitUpTo2000: { fixed: 0, percentage: 0, minimum: 0 },
          domesticDebitAbove2000: { fixed: 0, percentage: 0, minimum: 0 },
          standardOrClassic: { fixed: 0, percentage: 0, minimum: 0 },
          premiumOrPlatinum: { fixed: 0, percentage: 0, minimum: 0 },
          superPremiumOrSignature: { fixed: 0, percentage: 0, minimum: 0 },
          commercialOrCorporate: { fixed: 0, percentage: 0, minimum: 0 },
          internationalDebitCard: { fixed: 0, percentage: 0, minimum: 0 },
          internationalCreditCard: { fixed: 0, percentage: 0, minimum: 0 },
          onus: { fixed: 0, percentage: 0, minimum: 0 },
          mVisa: { fixed: 0, percentage: 0, minimum: 0 },
          masterPass: { fixed: 0, percentage: 0, minimum: 0 },
          cashAtPos: { fixed: 0, percentage: 0, minimum: 0 }
        }
      },
      showDocumentPreview: true
    };
  },

  computed: {
    ...mapGetters("mars_regions", ["regionsFromMars"]),
    ...mapGetters("mars_leadFrom", ["leadFromInfoFromMars"]),
    ...mapGetters("mars_salesPerson", ["salesPersonFromMars"]),
    ...mapGetters("mars_sharingPartner", ["sharingPartnerFromMars"]),
    ...mapGetters("mars_city", ["cityFromMars"]),
    ...mapGetters("mars_state", ["stateFromMars"]),
    ...mapGetters("mars_mcc", ["mccFromMars"]),
    ...mapGetters("mars_deviceModel", ["deviceModelFromMars"]),
    ...mapGetters("mars_rentalPlans", ["rentalPlanFromMars"]),
    ...mapGetters("mars_ifsc", ["ifscFromMars"]),
    ...mapGetters("mars_mdrPlans", ["mdrPlanFromMars"]),
    ...mapGetters("mars_bankList", ["bankListFromMars"]),
    ...mapGetters("mars_serviceProvider", ["serviceProviderFromMars"]),
    ...mapGetters("mars_networkProvider", ["networkProviderFromMars"]),
    ...mapGetters("mars_dataSubmit", ["marsSavedDataFromInternal"])
  },

  created() {
    //<< View binding - default 3
    this.fetchAllDropdownValuesFromMARSapi(3);
    if (
      this.$PARTNERS_TAB_ENABLED_ITEMS.includes(
        this.merchant.companyInformation.constitution
      )
    ) {
      this.showPartnerstab = true;
    } else {
      this.showPartnerstab = true;
    }
  },
  methods: {
    ...mapActions("mars_regions", ["REGION_FROM_MARS"]),
    ...mapActions("mars_leadFrom", ["LEAD_FROM_FROM_MARS"]),
    ...mapActions("mars_salesPerson", ["SALES_PERSON_FROM_MARS"]),
    ...mapActions("mars_sharingPartner", ["SHARING_PARTNER_FROM_MARS"]),
    ...mapActions("mars_city", ["CITY_FROM_MARS"]),
    ...mapActions("mars_state", ["STATE_FROM_MARS"]),
    ...mapActions("mars_mcc", ["MCC_FROM_MARS"]),
    ...mapActions("mars_deviceModel", ["DEVICE_MODEL_FROM_MARS"]),
    ...mapActions("mars_rentalPlans", ["RENTAL_PLAN_FROM_MARS"]),
    ...mapActions("mars_ifsc", ["IFSC_FROM_MARS"]),
    ...mapActions("mars_mdrPlans", ["MDR_PLAN_FROM_MARS"]),
    ...mapActions("mars_bankList", ["BANK_LIST_FROM_MARS"]),
    ...mapActions("mars_networkProvider", ["NETWORK_PROVIDER"]),
    ...mapActions("mars_serviceProvider", ["SERVICE_PROVIDER"]),
    ...mapActions("mars_dataSubmit", [
      "MARS_DATA_SUBMIT_INTERNAL",
      "MARS_DATA_SUBMIT_EXTERNAL",
      "MARS_DATA_EXTERNAL_SUBMIT_RESPONSE",
      "FETCH_SAVED_DATA_FROM_OWN_DB"
    ]),

    validate(step, details, additional) {
      if (step == "kyc") {
        alert("finalStep");
      } else {
        this.saveDetails(step, details, { customStepper: true });
      }
    },

    saveDetails(step, details, extras) {
      if (step == "salesInformation") {
        this.merchant.salesInformation = details.salesInformation;
      } else if (step == "companyInformation") {
        this.merchant.companyInformation = details.companyInformation;
      } else if (step == "partnerInformation") {
        this.merchant.partnerInformation = details.partnerInformation;
      } else if (step == "businessInformation") {
        this.merchant.businessInformation = details.businessInformation;
      } else if (step == "paymentDetails") {
        this.merchant.paymentDetails = details.paymentDetails;
      } else if (step == "mdrPlan") {
        this.merchant.mdrPlan = details.mdrPlan;
        this.merchant.SharingDiscountFee = details.SharingDiscountFee;
      } else if (step == "bankInformation") {
        this.merchant.bankInformation = details.bankInformation;
      } else if (step == "kyc") {
        this.merchant.kyc = details.kyc;
      } else {
        this.$q.notify({
          color: "warning",
          position: "bottom",
          message: `Oops, something went wrong!`,
          icon: "warning"
        });
        return false;
      }
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Saving data .."
      });
      this.merchant["leadId"] = this.$route.params.id;
      this.MARS_DATA_SUBMIT_INTERNAL({
        merchant: this.merchant,
        action: 1
      })
        .then(response => {
          if (
            extras != undefined &&
            extras.hasOwnProperty("customStepper") &&
            extras.customStepper
          ) {
            this.$refs.stepper.next();
          }
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: `${response.data.message}`,
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: `${error.data.message}`,
            icon: "thumb_down"
          });
        });
    },
    fetchAllDropdownValuesFromMARSapi(institutionCode) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Setting data .."
      });
      let self = this;
      /* API call to fetch regions */
      self
        .REGION_FROM_MARS(institutionCode)
        .then(() => {
          self.regionOptions = [];
          return self.regionsFromMars.items.map(oo => {
            self.regionOptions.push({ label: oo.name, value: oo.code });
          });
        })
        .then(() => {
          /* API call to fetch sharing partner */
          return self
            .SHARING_PARTNER_FROM_MARS(institutionCode)
            .then(response => {
              self.sharingPartnerOptions = [];
              self.sharingPartnerFromMars.items.map(oo => {
                self.sharingPartnerOptions.push({
                  label: oo.name,
                  value: oo.code
                });
              });
            });
        })
        .then(() => {
          /* API call to fetch sharing partner */
          return self.LEAD_FROM_FROM_MARS(institutionCode).then(response => {
            self.leadFromOptions = [];
            self.leadFromInfoFromMars.items.map(oo => {
              self.leadFromOptions.push({ label: oo.name, value: oo.name });
            });
          });
        })
        .then(() => {
          /* API call to fetch sales person */
          return self.SALES_PERSON_FROM_MARS(institutionCode).then(response => {
            self.salesPersonOptions = [];
            self.salesPersonFromMars.items.map(oo => {
              self.salesPersonOptions.push({ label: oo.name, value: oo.code });
            });
          });
        })
        .then(() => {
          /* API call to fetch city */
          return self.CITY_FROM_MARS().then(response => {
            self.cityOptions = [];
            self.cityFromMars.items.map(oo => {
              self.cityOptions.push({ label: oo.name, value: oo.code });
            });
          });
        })
        .then(() => {
          /* API call to fetch state */
          return self.STATE_FROM_MARS().then(response => {
            self.stateOptions = [];
            self.stateFromMars.items.map(oo => {
              self.stateOptions.push({ label: oo.name, value: oo.code });
            });
          });
        })
        .then(() => {
          /* API call to fetch state */
          return self.MCC_FROM_MARS().then(response => {
            self.mccSearchSet = [];
            self.mccFromMars.items.map(oo => {
              self.mccSearchSet.push({
                label: oo.code + "-" + oo.name,
                value: oo.code
              });
            });
          });
        })
        .then(() => {
          /* API call to fetch device model */
          return self.DEVICE_MODEL_FROM_MARS(institutionCode).then(response => {
            self.terminalModelSet = [];
            self.deviceModelFromMars.items.map(oo => {
              self.terminalModelSet.push({ label: oo.name, value: oo.code });
            });
          });
        })
        .then(() => {
          /* API call to fetch rental plan */
          return self.RENTAL_PLAN_FROM_MARS(institutionCode).then(response => {
            self.rentalPlanSet = [];
            self.rentalPlanFromMars.items.map(oo => {
              self.rentalPlanSet.push({ label: oo.name, value: oo.code });
            });
          });
        })
        .then(() => {
          /* API call to fetch bank list */
          return self.BANK_LIST_FROM_MARS(institutionCode).then(response => {
            // let bankList = [];
            self.bankListFromMars.bankNames.map(oo => {
              self.bankListSet.push({ label: oo, value: oo });
            });
          });
        })
        .then(() => {
          /* API call to fetch bank list */
          return self.NETWORK_PROVIDER(institutionCode).then(response => {
            // let bankList = [];
            self.networkProviderFromMars.items.map(oo => {
              self.networkProviderListSet.push({
                label: oo.name,
                value: oo.code
              });
            });
          });
        })
        .then(() => {
          /* API call to fetch bank list */
          return self.SERVICE_PROVIDER(institutionCode).then(response => {
            // let bankList = [];
            self.serviceProviderFromMars.items.map(oo => {
              self.serviceProviderListSet.push({
                label: oo.name,
                value: oo.code
              });
            });
          });
        })
        .then(() => {
          let marsFormSubmitAction = this.propLeadDeatils.marsFormSubmitAction;
          if ([1, 2].includes(marsFormSubmitAction)) {
            return this.FETCH_SAVED_DATA_FROM_OWN_DB({
              leadId: this.$route.params.id
            })
              .then(res => {
                //Date formatting for MARS
                res.salesInformation["applicationDate"] = this.commonDateFormat(res.salesInformation.applicationDate;
                );
                res.salesInformation["aggreementDate"] = this.commonDateFormat(res.salesInformation.aggreementDate;
                );
                this.$set(
                  res.salesInformation,
                  "loanDisbursementDate",
                  this.commonDateFormat(
                    res.salesInformation.loanDisbursementDate
                  )
                );
                res.salesInformation["tenureStartDate"] = this.commonDateFormat(res.salesInformation.tenureStartDate;
                );
                res.companyInformation["establishYear"] = this.commonDateFormat(res.companyInformation.establishYear;
                );
                this.$set(
                  res.bankInformation.collectionDetails,
                  "chequeDepositedDate",
                  this.commonDateFormat(
                    res.bankInformation.collectionDetails.chequeDepositedDate
                  )
                );
                this.$set(
                  res.bankInformation.collectionDetails,
                  "collectedDate",
                  this.commonDateFormat(
                    res.bankInformation.collectionDetails.collectedDate
                  )
                );
                this.$set(
                  res.bankInformation.collectionDetails,
                  "chequeDate",
                  this.commonDateFormat(
                    res.bankInformation.collectionDetails.chequeDate
                  )
                );
                res.businessInformation["memberSince"] = this.commonDateFormat(res.businessInformation.memberSince;
                );
                return res;
              })
              .then(res => {
                this.merchant = {
                  salesInformation: res.salesInformation,
                  companyInformation: res.companyInformation,
                  partnerInformation: res.partnerInformation,
                  businessInformation: res.businessInformation,
                  paymentDetails: res.paymentDetails,
                  mdrPlan: res.mdrPlan,
                  SharingDiscountFee: res.SharingDiscountFee,
                  bankInformation: res.bankInformation,
                  kyc: res.kyc
                };
                if (
                  this.$PARTNERS_TAB_ENABLED_ITEMS.includes(
                    this.merchant.companyInformation.constitution
                  )
                ) {
                  this.showPartnerstab = true;
                } else {
                  this.showPartnerstab = true;
                }
              });
          } else {
            let companyInformation = this.merchant.companyInformation;
            let salesInformation = this.merchant.salesInformation;
            let paymentDetails = this.merchant.paymentDetails;
            let leadDetails = this.propLeadDeatils;
            salesInformation.applicationNumber = Math.floor(
              Date.now() / 1000 + 22 * 10
            );
            companyInformation.dbaName = leadDetails.leadName;
            companyInformation.contactMobile = leadDetails.contactNumber;
            companyInformation.contactName = leadDetails.contactName;
            companyInformation.registeredAddress = leadDetails.leadAddress;
            companyInformation.registeredPin = leadDetails.pincode;
            companyInformation.contactName = leadDetails.contactName;
            companyInformation.contactMobile = leadDetails.contactNumber;
            companyInformation.constitution =
              leadDetails.merchantType.marsMappingId;
            companyInformation.constitutionName =
              leadDetails.merchantType.merchantTypeName;
            mdrPlan.domesticDebitUpTo2000.percentage =
              leadDetails.debitLessthanAmount;
            mdrPlan.domesticDebitAbove2000.percentage =
              leadDetails.debitGreaterthanAmount;
            mdrPlan.standardOrClassic.percentage = leadDetails.stdCC;
            mdrPlan.premiumOrPlatinum.percentage = leadDetails.premiumCC;
            mdrPlan.superPremiumOrSignature.percentage =
              leadDetails.superPremiumlCC;
            mdrPlan.commercialOrCorporate.percentage = leadDetails.corpCC;
            mdrPlan.internationalCreditCard.percentage = leadDetails.intlCC;
            paymentDetails.numberOfTerminals = leadDetails.deviceCount;
          }
        })
        .then(() => {
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    finalFormSubmit() {
      this.$v.merchant.$touch();
      if (this.$v.merchant.$error) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info"
        });
      } else {
        let self = this;
        self.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating .."
        });
        const finalRequest = { action: 2, merchant: self.merchant };
        finalRequest.merchant.leadId = self.$route.params.id;
        finalRequest.merchant.leadDataEntryRemarks =
          finalRequest.leadDataEntryRemarks;
        finalRequest.merchant.holdPayment = finalRequest.holdPayment;

        if (
          self.$PARTNERS_TAB_ENABLED_ITEMS.includes(
            self.merchant.companyInformation.constitution
          )
        ) {
          finalRequest.merchant.partnerInformation =
            self.viewBinding.partnersArr;
        } else {
          finalRequest.merchant.partnerInformation = [];
        }
        /* API call to fetch regions */
        self
          .MARS_DATA_SUBMIT_INTERNAL(finalRequest)
          .then(response => {
            self.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Saved.. Sending data to mars"
            });
            delete finalRequest.action;
            delete finalRequest.merchant.leadId;
            delete finalRequest.merchant.holdPayment;
            delete finalRequest.merchant.leadDataEntryRemarks;
            delete finalRequest.merchant.companyInformation.constitutionName;
            self
              .MARS_DATA_SUBMIT_EXTERNAL({
                params: finalRequest,
                leadStatus: this.propLeadDeatils.leadStatus,
                refNumber: this.propLeadDeatils.merchantRefCode
              })
              .then(response => {
                self.$q.loading.show({
                  delay: 0, // ms
                  spinnerColor: "purple-9",
                  message: "Great.. All set to go"
                });
                self
                  .MARS_DATA_EXTERNAL_SUBMIT_RESPONSE({
                    request: response.body,
                    leadId: self.$route.params.id
                  })
                  .then(response => {
                    self.$q.notify({
                      color: "positive",
                      position: "bottom",
                      message: "Successfully submitted to MARS",
                      icon: "thumb_up"
                    });
                    self.$router.push("/sat/lead/validation");
                    self.$q.loading.hide();
                  });
              })
              .catch(error => {
                this.$set(
                  finalRequest.merchant.salesInformation,
                  "applicationDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.applicationDate
                  )
                );

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
                    finalRequest.merchant.bankInformation.collectionDetails
                      .collectedDate
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "chequeDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails
                      .chequeDate
                  )
                );

                this.$set(
                  finalRequest.merchant.businessInformation,
                  "memberSince",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.businessInformation.memberSince
                  )
                );
                self.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Some mandatory fields are empty",
                  icon: "info"
                });
              });
            self.$q.loading.hide();
          })
          .catch(() => {
            self.$q.loading.hide();
          });
      }
    },

    //Common function for data format
    commonDateFormat(selectedDate) {
      if (
        selectedDate == "" ||
        selectedDate == null ||
        selectedDate == "Invalid date"
      ) {
        return null;
      } else {
        return moment(selectedDate).format("YYYY-MM-DD");
      }
    },
    //Common function for data format
    commonDateFormatInvalidMARSformat(selectedDate) {
      if (
        selectedDate == "" ||
        selectedDate == null ||
        selectedDate == "Invalid date"
      ) {
        return null;
      } else {
        return moment(selectedDate, "DD/MM/YYYY").format("YYYY-MM-DD");
      }
    }
  }
};
</script>

<style scoped>
.border-1 {
  border: 1px solid #e5e5e5;
}

.q-custom-class {
  min-height: 270px;
}
 
.custom-z-index {
  z-index: 2;
}
</style>
