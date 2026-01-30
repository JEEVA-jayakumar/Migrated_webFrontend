<template>
  <div>
    <div class="row q-mb-md gutter-sm items-center">
      <div class="col-md-12">
        <div class="q-title">Merchant Bank Details</div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          upper-case
          color="grey-9"
          :error="$v.merchant.bankInformation.bankDetails.ifsc.$error"
          @blur="populateBankDetails"
          v-model="merchant.bankInformation.bankDetails.ifsc"
          float-label="IFSC Code*"
          placeholder="Enter IFSC*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.bankInformation.bankDetails.branchName.$touch"
          :error="$v.merchant.bankInformation.bankDetails.branchName.$error"
          v-model="merchant.bankInformation.bankDetails.branchName"
          float-label="Branch Name*"
          placeholder="Branch Name* "
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below"
          color="grey-9"
          v-model="merchant.bankInformation.bankDetails.feeType"
          float-label="Fee Type"
          :options="feeTypeOptions"
        />
      </div>
      <div
        v-if="merchant.bankInformation.bankDetails.feeType == 'N' || merchant.bankInformation.bankDetails.feeType == 'S'"
        class="col-md-6 col-sm-12 col-xs-12"
      >
        <q-input
          color="grey-9"
          @blur="$v.merchant.bankInformation.bankDetails.settlementOrNeftFee.$touch"
          :error="$v.merchant.bankInformation.bankDetails.settlementOrNeftFee.$error"
          v-model="merchant.bankInformation.bankDetails.settlementOrNeftFee"
          float-label="NEFT/Settlement Fee Inclusive of Tax*"
          placeholder="NEFT/Settlement Fee Inclusive of Tax*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.bankInformation.bankDetails.micr.$touch"
          :error="$v.merchant.bankInformation.bankDetails.micr.$error"
          v-model="merchant.bankInformation.bankDetails.micr"
          float-label="MICR*"
          placeholder="MICR*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.bankInformation.bankDetails.bankName.$touch"
          :error="$v.merchant.bankInformation.bankDetails.bankName.$error"
          v-model="merchant.bankInformation.bankDetails.bankName"
          float-label="Bank Name*"
          placeholder="Bank Name*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below"
          color="grey-9"
          v-model="merchant.bankInformation.bankDetails.paymentMode"
          float-label="Payment mode"
          :options="paymnentModeOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.bankInformation.bankDetails.bankCityRefCode.$touch"
          :error="$v.merchant.bankInformation.bankDetails.bankCityName.$anyError ||$v.merchant.bankInformation.bankDetails.bankCityRefCode.$anyError"
          v-model="merchant.bankInformation.bankDetails.bankCityName"
          float-label="City (type min 3 characters)*"
          placeholder="Start typing ..*"
        >
          <q-autocomplete
            separator
            @search="citySearch"
            :debounce="10"
            :min-characters="3"
            @selected="bankCitySelected"
          />
        </q-input>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.bankInformation.bankDetails.bankCityRefCode.$touch"
          :error="$v.merchant.bankInformation.bankDetails.bankStateName.$anyError || $v.merchant.bankInformation.bankDetails.bankCityRefCode.$anyError"
          v-model="merchant.bankInformation.bankDetails.bankStateName"
          float-label="State (type min 3 characters)*"
          placeholder="Start typing ..*"
        >
          <q-autocomplete
            separator
            @search="stateSearch"
            :debounce="10"
            :min-characters="1"
            @selected="bankStateSelected"
          />
        </q-input>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below"
          color="grey-9"
          v-model="merchant.bankInformation.bankDetails.accountType"
          float-label="Account Type"
          :options="accountTypeOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.bankInformation.bankDetails.accountNumber.$touch"
          :error="$v.merchant.bankInformation.bankDetails.accountNumber.$error"
          v-model="merchant.bankInformation.bankDetails.accountNumber"
          float-label="Bank A/c Number*"
          placeholder="Bank A/c Number*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-checkbox
          color="grey-9"
          true-value="Y"
          false-value="N"
          v-model="merchant.bankInformation.bankDetails.bankStatementAttached"
          label="Bank Statement Attached"
        />
        <q-checkbox
          color="grey-9"
          true-value="Y"
          false-value="N"
          v-model="merchant.bankInformation.bankDetails.cancelChequeAttached"
          label="Cancelled Cheque Lead Attached"
        />
      </div>
    </div>
    <div class="row gutter-sm items-center">
      <div class="col-md-12">
        <div class="q-title">Payment Collection Details</div>
      </div>
      <div v-show="propLeadDeatils.paymentOption == 1" class="col-md-12">
        <div class="row">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-input
              color="grey-9"
              @blur="$v.merchant.bankInformation.collectionDetails.chequeNumber.$touch"
              :error="$v.merchant.bankInformation.collectionDetails.chequeNumber.$error"
              v-model="merchant.bankInformation.collectionDetails.chequeNumber"
              float-label="Cheque/UTR No*"
              placeholder="Cheque/UTR No*"
            />
          </div>
        </div>
      </div>
      <div v-show="propLeadDeatils.paymentOption == 3" class="col-md-12">
        <div class="row">
          <div class="col-md-4 col-sm-12 col-xs-12">
            <q-input
              color="grey-9"
              @blur="$v.merchant.bankInformation.collectionDetails.swipeAmount.$touch"
              :error="$v.merchant.bankInformation.collectionDetails.swipeAmount.$error"
              v-model="merchant.bankInformation.collectionDetails.swipeAmount"
              float-label="Swipe Amount*"
              placeholder="Swipe Amount*"
            />
          </div>
          <div class="col-md-4 col-sm-12">
            <q-datetime
              format="DD/MM/YYYY"
              format-model="number"
              color="grey-9"
              minimal
              @blur="$v.merchant.bankInformation.collectionDetails.collectedDate.$touch"
              :error="$v.merchant.bankInformation.collectionDetails.collectedDate.$error"
              v-model="merchant.bankInformation.collectionDetails.collectedDate"
              float-label="Swipe Date*"
              placeholder="Swipe Date*"
            />
          </div>
          <div class="col-md-4 col-sm-12 col-xs-12">
            <q-input
              color="grey-9"
              @blur="$v.merchant.bankInformation.collectionDetails.swipeTerminal.$touch"
              :error="$v.merchant.bankInformation.collectionDetails.swipeTerminal.$error"
              v-model="merchant.bankInformation.collectionDetails.swipeTerminal"
              float-label="Swiped on the terminal of*"
              placeholder="Swiped on the terminal of*"
            />
          </div>
        </div>
      </div>
      <div v-show="propLeadDeatils.paymentOption == 2" class="col-md-12">
        <div class="row">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-input
              color="grey-9"
              @blur="$v.merchant.bankInformation.collectionDetails.chequeAmount.$touch"
              :error="$v.merchant.bankInformation.collectionDetails.chequeAmount.$error"
              v-model="merchant.bankInformation.collectionDetails.chequeAmount"
              float-label="Cheque Amount*"
              placeholder="Cheque Amount*"
            />
          </div>
          <div class="col-md-3 col-sm-12">
            <q-datetime
              format="DD/MM/YYYY"
              format-model="number"
              color="grey-9"
              minimal
              @blur="$v.merchant.bankInformation.collectionDetails.chequeDate.$touch"
              :error="$v.merchant.bankInformation.collectionDetails.chequeDate.$error"
              v-model="merchant.bankInformation.collectionDetails.chequeDate"
              float-label="Cheque Date*"
              placeholder="Cheque Date*"
            />
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-datetime
              format="DD/MM/YYYY"
              format-model="number"
              color="grey-9"
              minimal
              @blur="$v.merchant.bankInformation.collectionDetails.chequeDepositedDate.$touch"
              :error="$v.merchant.bankInformation.collectionDetails.chequeDepositedDate.$error"
              v-model="merchant.bankInformation.collectionDetails.chequeDepositedDate"
              float-label="Cheque Deposited Date*"
              placeholder="Cheque Deposited Date*"
            />
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-input
              color="grey-9"
              @blur="$v.merchant.bankInformation.collectionDetails.chequeNumber.$touch"
              :error="$v.merchant.bankInformation.collectionDetails.chequeNumber.$error"
              v-model="merchant.bankInformation.collectionDetails.chequeNumber"
              float-label="Cheque/UTR No*"
              placeholder="Cheque/UTR No*"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <q-select
          clearable
          placeholder="Choose from the below"
          color="grey-9"
          v-model="merchant.bankInformation.collectionDetails.acquirerBank"
          float-label="Bank Name"
          :options="bankListSet"
        />
      </div>
    </div>
    <q-stepper-navigation>
      <q-btn color="primary" class="q-ma-xs" icon="check" @click="validate" label="Continue" />
      <q-btn
        color="amber-10"
        class="q-ma-xs"
        icon="save"
        label="Save Partial"
        @click="$emit('saveData')"
      />
      <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$emit('goBack')" label="Back" />
    </q-stepper-navigation>
  </div>
</template>

<script>
import {
  helpers,
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
  between
} from "vuelidate/lib/validators";
export default {
  // name: 'ComponentName',
  props: ["cityOptions", "stateOptions", "propLeadDeatils", "bankInformation"],
  data() {
    return {
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
      ],
      feeTypeOptions: [
        {
          label: "NEFT",
          value: "N"
        },
        {
          label: "Settlement",
          value: "S"
        },
        {
          label: "None",
          value: "X"
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
        },
        {
          label: "IMPS",
          value: "I"
        }
      ],
      merchant: {
        bankInformation: {}
      }
    };
  },
  validations: {
    merchant: {
      bankInformation: {
        bankDetails: {
          ifsc: {
            required,
            alphaNum,
            maxLength: maxLength(11)
          },
          micr: {
            required,
            numeric,
            minLength: minLength(9),
            maxLength: maxLength(9)
          },
          branchName: {
            required
          },
          bankName: {
            required
          },
          bankCityName: {
            required
          },
          bankCityRefCode: {
            required,
            numeric
          },
          accountNumber: {
            required,
            numeric,
            minLength: minLength(6),
            maxLength: maxLength(19)
          },
          bankStateName: {
            required
          },
          bankStateRefCode: {
            required,
            numeric
          },
          paymentMode: {
            required
          },
          accountType: {
            required
          },
          settlementOrNeftFee: {
            required: requiredIf(function() {
              return this.getfeeTypeForSettlementVisibility;
            }),
            integer,
            between: between(0, 999)
          }
        },
        collectionDetails: {
          collectedDate: {
            required: requiredIf(function() {
              return this.bankInfoSwipePayment;
            })
          },
          swipeAmount: {
            decimal,
            required: requiredIf(function() {
              return this.bankInfoSwipePayment;
            }),
            minValue: minValue(0)
          },
          swipeTerminal: {
            required: requiredIf(function() {
              return this.bankInfoSwipePayment;
            })
          },
          chequeAmount: {
            decimal,
            required: requiredIf(function() {
              return this.bankInfoChequePayment;
            }),
            minValue: minValue(0)
          },
          chequeNumber: {
            alphaNum,
            required: requiredIf(function() {
              return this.bankInfoChequePayment;
            }),
            minLength: minLength(6),
            maxLength: maxLength(25)
          },
          chequeDate: {
            required: requiredIf(function() {
              return this.bankInfoChequePayment;
            })
          },
          chequeDepositedDate: {
            required: requiredIf(function() {
              return this.bankInfoChequePayment;
            })
          }
        }
      }
    }
  },
  computed: {
    makePropsReactive() {
      this.merchant.bankInformation = this.businessInformation;
    },
    bankInfoSwipePayment() {
      return this.propLeadDeatils.paymentOption;
    },
    bankInfoChequePayment() {
      return this.propLeadDeatils.paymentOption;
    }
  },
  methods: {
    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function(oo) {
        return oo.label.toLowerCase().includes(terms.toLowerCase());
      });
    },
    citySearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.cityOptions, terms));
    },
    stateSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
    },

    /* Registered City search result */
    bankCitySelected(item) {
      this.merchant.bankInformation.bankDetails.bankCityName = item.label;
      this.merchant.bankInformation.bankDetails.bankCityRefCode = item.value;
    },
    /* Registered City search result */

    /* Registered State search result */
    bankStateSelected(item) {
      this.merchant.bankInformation.bankDetails.bankStateName = item.label;
      this.merchant.bankInformation.bankDetails.bankStateRefCode = item.value;
    },
    /* Registered State search result */

    /* IFSC bank search result */
    populateBankDetails() {
      let self = this;
      let ifscArr = [];
      self
        .IFSC_FROM_MARS(this.merchant.bankInformation.bankDetails.ifsc)
        .then(response => {
          if (response.status == 200) {
            this.merchant.bankInformation.bankDetails.bankName =
              self.ifscFromMars.bankName;
            this.merchant.bankInformation.bankDetails.branchName =
              self.ifscFromMars.branchName;
            this.merchant.bankInformation.bankDetails.micr =
              self.ifscFromMars.MICR;
          } else {
            this.$q.notify({
              color: "negative",
              position: "bottom-left",
              message: "Invalid IFSC code",
              icon: "clear"
            });
            this.merchant.bankInformation.bankDetails.ifsc = "";
            this.merchant.bankInformation.bankDetails.bankName = "";
            this.merchant.bankInformation.bankDetails.branchName = "";
            this.merchant.bankInformation.bankDetails.micr = "";
          }
        });
    },
    /* IFSC bank search result */
    validate() {
      this.$v.merchant.companyInformation.$touch();
      if (this.$v.merchant.companyInformation.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$emit("goNext", "bank", this.merchant);
      }
    }
  }
};
</script>

<style>
</style>
