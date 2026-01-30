<template>
  <div>
    <div class="row gutter-sm">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          @blur="$v.merchant.salesInformation.institutionCode.$touch"
          :error="$v.merchant.salesInformation.institutionCode.$error"
          placeholder="Choose from the below"
          color="grey-9"
          v-model="merchant.salesInformation.institutionCode"
          float-label="Institution Code*"
          :options="[{
            label: 'GPRS',
            value: 3
          }]"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          @blur="$v.merchant.salesInformation.applicationType.$touch"
          :error="$v.merchant.salesInformation.applicationType.$error"
          placeholder="Choose from the below*"
          color="grey-9"
          v-model="merchant.salesInformation.applicationType"
          float-label="Application Type*"
          :options="applicationTypeOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          @blur="$v.merchant.salesInformation.applicationNumber.$touch"
          :error="$v.merchant.salesInformation.applicationNumber.$error"
          color="grey-9"
          v-model="merchant.salesInformation.applicationNumber"
          float-label="Application Number*"
          placeholder="Application Number*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          modal
          color="grey-9"
          format="DD/MM/YYYY"
          float-label="Application Date*"
          placeholder="Application Date*"
          @blur="$v.merchant.salesInformation.applicationDate.$touch"
          :error="$v.merchant.salesInformation.applicationDate.$error"
          v-model="merchant.salesInformation.applicationDate"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          modal
          color="grey-9"
          format="DD/MM/YYYY"
          @blur="$v.merchant.salesInformation.aggreementDate.$touch"
          :error="$v.merchant.salesInformation.aggreementDate.$error"
          v-model="merchant.salesInformation.aggreementDate"
          float-label="Agreement Date*"
          placeholder="Agreement Date*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          @blur="$v.merchant.salesInformation.merchantType.$touch"
          :error="$v.merchant.salesInformation.merchantType.$error"
          placeholder="Choose from the below*"
          color="grey-9"
          v-model="merchant.salesInformation.merchantType"
          float-label="Merchant Type*"
          :options="merchantTypeOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          @blur="$v.merchant.salesInformation.categoryType.$touch"
          :error="$v.merchant.salesInformation.categoryType.$error"
          placeholder="Choose from the below*"
          color="grey-9"
          v-model="merchant.salesInformation.categoryType"
          float-label="Category Type*"
          :options="categoryTypeOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below*"
          color="grey-9"
          @blur="$v.merchant.salesInformation.salesPersonCode.$touch"
          :error="$v.merchant.salesInformation.salesPersonCode.$error"
          v-model="merchant.salesInformation.salesPersonCode"
          float-label="Sales Person*"
          :options="salesPersonOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below*"
          color="grey-9"
          @blur="$v.merchant.salesInformation.region.$touch"
          :error="$v.merchant.salesInformation.region.$error"
          v-model="merchant.salesInformation.region"
          float-label="Region*"
          :options="regionOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below*"
          color="grey-9"
          @blur="$v.merchant.salesInformation.leadFrom.$touch"
          :error="$v.merchant.salesInformation.leadFrom.$error"
          v-model="merchant.salesInformation.leadFrom"
          float-label="Lead From*"
          :options="leadFromOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="q-caption">Sharing Model</p>
        <div v-for="(item,index) in viewBinding.sharingModelCode" :key="index">
          <q-radio
            color="grey-9"
            v-model="merchant.salesInformation.sharingModelCode"
            :val="item.value"
            :label="item.label"
          />
        </div>
      </div>
    </div>
    <!-- T => Transaction value model -->
    <div v-show="merchant.salesInformation.sharingModelCode == 'T'" class="row gutter-sm q-my-xs">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch"
          :error="$v.merchant.salesInformation.sharingPartnerCode.$error"
          placeholder="Choose from the below*"
          color="grey-9"
          v-model="merchant.salesInformation.sharingPartnerCode"
          float-label="Sharing partner*"
          :options="sharingPartnerOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          @blur="$v.merchant.salesInformation.dailyFixedAmount.$touch"
          :error="$v.merchant.salesInformation.dailyFixedAmount.$error"
          color="grey-9"
          v-model="merchant.salesInformation.dailyFixedAmount"
          float-label="Daily fixed amount*"
          type="number"
          placeholder="Daily fixed amount*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          @blur="$v.merchant.salesInformation.loanDisbursementPercentage.$touch"
          :error="$v.merchant.salesInformation.loanDisbursementPercentage.$error"
          color="grey-9"
          v-model="merchant.salesInformation.loanDisbursementPercentage"
          float-label="Percentage*"
          type="number"
          placeholder="Percentage*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          format="DD/MM/YYYY"
          format-model="date"
          @blur="$v.merchant.salesInformation.loanDisbursementAmount.$touch"
          :error="$v.merchant.salesInformation.loanDisbursementAmount.$error"
          color="grey-9"
          v-model="merchant.salesInformation.loanDisbursementAmount"
          float-label="Loan disbursement value*"
          type="number"
          placeholder="Loan disbursement value*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          format="DD/MM/YYYY"
          format-model="date"
          @blur="$v.merchant.salesInformation.loanDisbursementDate.$touch"
          :error="$v.merchant.salesInformation.loanDisbursementDate.$error"
          color="grey-9"
          minimal
          v-model="merchant.salesInformation.loanDisbursementDate"
          float-label="Disbursement Date*"
          placeholder="Disbursement Date*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          @blur="$v.merchant.salesInformation.tenureMonth.$touch"
          :error="$v.merchant.salesInformation.tenureMonth.$error"
          color="grey-9"
          v-model="merchant.salesInformation.tenureMonth"
          float-label="Tenure (in months)*"
          type="number"
          placeholder="Tenure (in months)*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          @blur="$v.merchant.salesInformation.tenureDay.$touch"
          :error="$v.merchant.salesInformation.tenureDay.$error"
          color="grey-9"
          v-model="merchant.salesInformation.tenureDay"
          float-label="Tenure (in days)*"
          type="number"
          placeholder="Tenure (in days)*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-datetime
          format="DD/MM/YYYY"
          format-model="date"
          @blur="$v.merchant.salesInformation.tenureStartDate.$touch"
          :error="$v.merchant.salesInformation.tenureStartDate.$error"
          color="grey-9"
          minimal
          v-model="merchant.salesInformation.tenureStartDate"
          float-label="Start Date*"
          placeholder="Tenure Start Date*"
        />
      </div>
    </div>
    <!-- M => MDR/cash@pos/rent -->
    <div v-show="merchant.salesInformation.sharingModelCode == 'M'" class="row gutter-sm q-my-xs">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          @blur="$v.merchant.salesInformation.sharingPartnerCode.$touch"
          :error="$v.merchant.salesInformation.sharingPartnerCode.$error"
          placeholder="Choose from the below*"
          color="grey-9"
          v-model="merchant.salesInformation.sharingPartnerCode"
          float-label="Sharing partner*"
          :options="sharingPartnerOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          @blur="$v.merchant.salesInformation.rentPercentage.$touch"
          :error="$v.merchant.salesInformation.rentPercentage.$error"
          color="grey-9"
          v-model="merchant.salesInformation.rentPercentage"
          float-label="Rent %*"
          type="number"
          placeholder="Rent %*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          @blur="$v.merchant.salesInformation.rentFixed.$touch"
          :error="$v.merchant.salesInformation.rentFixed.$error"
          color="grey-9"
          v-model="merchant.salesInformation.rentFixed"
          float-label="Rent fixed*"
          type="number"
          placeholder="Rent fixed*"
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
        @click="$emit('saveData','salesInformation',merchant, {mdrCode:mdrCode,customStepper: false})"
      />
    </q-stepper-navigation>
    <div class="hidden">{{makePropsReactive}}</div>
  </div>
</template>
<script>
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
  between
} from "vuelidate/lib/validators";
export default {
  props: [
    "leadDetails",
    "regionOptions",
    "leadFromOptions",
    "salesInformation",
    "salesPersonOptions",
    "sharingPartnerOptions"
  ],
  data() {
    return {
      mdrCode: null,
      viewBinding: {
        sharingModelCode: [
          { label: "No sharing", value: "N" },
          { label: "Transaction value model", value: "T" },
          { label: "MDR/cash@pos/rent", value: "M" }
        ]
      },
      applicationTypeOptions: [
        { label: "Digital", value: "D" },
        { label: "Non Digital", value: "N" }
      ],
      categoryTypeOptions: [
        { label: "Small", value: "S" },
        { label: "Other", value: "O" }
      ],
      merchantTypeOptions: [
        { label: "Group Merchant", value: "G" },
        { label: "Merchant Outlet", value: "O" },
        { label: "Merchant", value: "M" }
      ],
      merchant: {
        salesInformation: {}
      }
    };
  },
  validations: {
    merchant: {
      salesInformation: {
        institutionCode: { required },
        applicationType: { required },
        applicationNumber: { required, alphaNum },
        applicationDate: { required },
        aggreementDate: { required },
        salesPersonCode: { required },
        region: { required },
        merchantType: { required },
        categoryType: { required },
        leadFrom: { required },
        sharingPartnerCode: {
          required: requiredIf(function() {
            return this.getTransctionValueModel || this.getCashAtPos;
          })
        },
        dailyFixedAmount: {
          required: requiredIf(function() {
            return this.getTransctionValueModel;
          }),
          decimal,
          between: between(0, 99999.99),
          minLength: minLength(2),
          maxLength: maxLength(7)
        },
        loanDisbursementPercentage: {
          required: requiredIf(function() {
            return this.getTransctionValueModel;
          }),
          decimal,
          between: between(0, 100)
        },
        loanDisbursementAmount: {
          required: requiredIf(function() {
            return this.getTransctionValueModel;
          }),
          decimal,
          between: between(0, 99999999.99),
          maxLength: maxLength(10),
          minLength: minLength(2)
        },
        loanDisbursementDate: {
          required: requiredIf(function() {
            return this.getTransctionValueModel;
          })
        },
        tenureMonth: {
          required: requiredIf(function() {
            return this.getTransctionValueModel;
          }),
          integer,
          minValue: minValue(0)
        },
        tenureDay: {
          required: requiredIf(function() {
            return this.getTransctionValueModel;
          }),
          integer,
          minValue: minValue(0)
        },
        tenureStartDate: {
          required: requiredIf(function() {
            return this.getTransctionValueModel;
          })
        },
        rentPercentage: {
          required: requiredIf(function() {
            return this.getCashAtPos;
          }),
          decimal,
          between: between(0, 100)
        },
        rentFixed: {
          required: requiredIf(function() {
            return this.getCashAtPos;
          }),
          decimal,
          minValue: minValue(0)
        }
      }
    }
  },
  computed: {
    makePropsReactive() {
      this.merchant.salesInformation = this.salesInformation;
    },
    // T => Transaction value model
    getTransctionValueModel() {
      return this.merchant.salesInformation.sharingModelCode == "T";
    },
    // M => MDR/cash@pos/rent
    getCashAtPos() {
      return this.merchant.salesInformation.sharingModelCode == "M";
    }
  },
  methods: {
    // ...mapActions("mars_dataSubmit", ["FETCH_SAVED_DATA_FROM_OWN_DB"]),
    // onCreated() {
    //   if ([1, 2].includes(marsFormSubmitAction)) {
    //     return this.FETCH_SAVED_DATA_FROM_OWN_DB({
    //       leadId: this.$route.params.id
    //     })
    //       .then(() => {
    //         return this.marsSavedDataFromInternal;
    //       })
    //       .then(res => {
    //         this.$set(
    //           res.salesInformation,
    //           "applicationDate",
    //           this.commonDateFormat(res.salesInformation.applicationDate)
    //         );
    //         return res;
    //       })
    //       .then(res => {
    //         this.$set(
    //           res.salesInformation,
    //           "aggreementDate",
    //           this.commonDateFormat(res.salesInformation.aggreementDate)
    //         );
    //         return res;
    //       })
    //       .then(res => {
    //         this.$set(
    //           res.salesInformation,
    //           "loanDisbursementDate",
    //           this.commonDateFormat(res.salesInformation.loanDisbursementDate)
    //         );
    //         return res;
    //       })
    //       .then(res => {
    //         this.$set(
    //           res.salesInformation,
    //           "tenureStartDate",
    //           this.commonDateFormat(res.salesInformation.tenureStartDate)
    //         );
    //         return res;
    //       });
    //   }
    // },
    validate() {
      this.$v.merchant.salesInformation.$touch();
      if (this.$v.merchant.salesInformation.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        if (this.merchant.salesInformation.categoryType == "S") {
          // for production
          this.mdrCode = 44;
          //for UAT
          //this.mdrCode = 45;
        } else {
          // for production
          this.mdrCode = 45;
          // for UAT
          // this.mdrCode = 44;
        }
        this.$emit("goNext", "salesInformation", this.merchant, this.mdrCode);
      }
    }
  }
};
</script>