<template>
  <div>
    <div class="row gutter-sm">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-caption">Device Owned By</p>
        <div class="group">
          <q-radio
            @blur="$v.merchant.paymentDetails.deviceOwnedBy.$touch"
            :error="$v.merchant.paymentDetails.deviceOwnedBy.$error"
            v-for="(item,index) in deviceOwnedByOptions"
            :key="index"
            color="grey-9"
            v-model="merchant.paymentDetails.deviceOwnedBy"
            :val="item.value"
            :label="item.label"
          />
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <q-input
          color="grey-9"
          type="number"
          @blur="$v.merchant.paymentDetails.installationFee.$touch"
          :error="$v.merchant.paymentDetails.installationFee.$error"
          v-model="merchant.paymentDetails.installationFee"
          float-label="Installation Fee*"
          placeholder="Installation Fee*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below"
          color="grey-9"
          @blur="$v.merchant.paymentDetails.terminalModeCode.$touch"
          :error="$v.merchant.paymentDetails.terminalModeCode.$error"
          v-model="merchant.paymentDetails.terminalModeCode"
          float-label="Terminal Model*"
          :options="terminalModelSet"
        />
      </div>
      <div class="col-md-6 col-sm-12">
        <q-input
          color="grey-9"
          type="number"
          disable
          @blur="$v.merchant.paymentDetails.numberOfTerminals.$touch"
          :error="$v.merchant.paymentDetails.numberOfTerminals.$error"
          v-model="merchant.paymentDetails.numberOfTerminals"
          float-label="No of Terminals*"
          placeholder="No of Terminals*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-caption">Cash @POS Enabled?</p>
        <div class="group">
          <q-radio
            disable
            @blur="$v.merchant.paymentDetails.cashAtPosEnabled.$touch"
            :error="$v.merchant.paymentDetails.cashAtPosEnabled.$error"
            v-for="(item,index) in cashAtPosEnabledOptions"
            :key="index"
            color="grey-9"
            v-model="merchant.paymentDetails.cashAtPosEnabled"
            :val="item.value"
            :label="item.label"
          />
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below*"
          color="grey-9"
          v-model="merchant.paymentDetails.rentalPlanCode"
          float-label="Rental Plan*"
          :options="rentalPlanSet"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below*"
          color="grey-9"
          v-model="merchant.paymentDetails.rentalMode"
          float-label="Rental Mode*"
          :options="rentalModeOptions"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below*"
          color="grey-9"
          @blur="$v.merchant.paymentDetails.serviceProvider.$touch"
          :error="$v.merchant.paymentDetails.serviceProvider.$error"
          v-model="merchant.paymentDetails.serviceProvider"
          float-label="Service provider*"
          :options="serviceProviderListSet"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-select
          placeholder="Choose from the below*"
          color="grey-9"
          @blur="$v.merchant.paymentDetails.networkPreferred.$touch"
          :error="$v.merchant.paymentDetails.networkPreferred.$error"
          v-model="merchant.paymentDetails.networkPreferred"
          float-label="Network provider*"
          :options="networkProviderListSet"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-caption">Rental Type</p>
        <div class="group">
          <q-radio
            @blur="$v.merchant.paymentDetails.rentalType.$touch"
            :error="$v.merchant.paymentDetails.rentalType.$error"
            v-for="(item,index) in rentalTypeOptions"
            :key="index"
            color="grey-9"
            v-model="merchant.paymentDetails.rentalType"
            :val="item.value"
            :label="item.label"
            @input="merchant.paymentDetails.gracePeriod = 0"
          />
        </div>
      </div>
      <div v-if="merchant.paymentDetails.rentalType == 'R'" class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          @blur="$v.merchant.paymentDetails.gracePeriod.$touch"
          :error="$v.merchant.paymentDetails.gracePeriod.$error"
          color="grey-9"
          type="number"
          v-model="merchant.paymentDetails.gracePeriod"
          float-label="Grace period*"
          placeholder="Grace period*"
        />
      </div>
      <div v-if="merchant.paymentDetails.rentalType == 'A'" class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          type="number"
          @blur="$v.merchant.paymentDetails.advanceRentCollected.$touch"
          :error="$v.merchant.paymentDetails.advanceRentCollected.$error"
          v-model="merchant.paymentDetails.advanceRentCollected"
          float-label="Advance Rent Collected*"
          placeholder="Advance Rent Collected*"
        />
      </div>
      <div v-if="merchant.paymentDetails.rentalType == 'A'" class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          type="number"
          @blur="$v.merchant.paymentDetails.noOfMonthRentPaidInAdvance.$touch"
          :error="$v.merchant.paymentDetails.noOfMonthRentPaidInAdvance.$error"
          v-model="merchant.paymentDetails.noOfMonthRentPaidInAdvance"
          float-label="No. Of Month Rent Paid In Advance*"
          placeholder="No. Of Month Rent Paid In Advance*"
        />
      </div>
      <div v-if="merchant.paymentDetails.rentalType == 'A'" class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-caption">Advanced Rent Mode</p>
        <div class="group">
          <q-radio
            @blur="$v.merchant.paymentDetails.advanceRentMode.$touch"
            :error="$v.merchant.paymentDetails.advanceRentMode.$error"
            v-for="(item,index) in advanceRentModeOptions"
            :key="index"
            color="grey-9"
            v-model="merchant.paymentDetails.advanceRentMode"
            :val="item.value"
            :label="item.label"
          />
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <q-input
          color="grey-9"
          type="number"
          @blur="$v.merchant.paymentDetails.devicePrice.$touch"
          :error="$v.merchant.paymentDetails.devicePrice.$error"
          v-model="merchant.paymentDetails.devicePrice"
          float-label="Device Price"
          placeholder="Device Price"
        />
      </div>
      <div class="col-md-6 col-sm-12">
        <q-input
          color="grey-9"
          type="number"
          @blur="$v.merchant.paymentDetails.otherCharges.$touch"
          :error="$v.merchant.paymentDetails.otherCharges.$error"
          v-model="merchant.paymentDetails.otherCharges"
          float-label="Other Charges"
          placeholder="Other Charges"
        />
      </div>
      <div class="col-md-6 col-sm-12">
        <q-input
          color="grey-9"
          type="number"
          @blur="$v.merchant.paymentDetails.totalAmountPaid.$touch"
          :error="$v.merchant.paymentDetails.totalAmountPaid.$error"
          v-model="merchant.paymentDetails.totalAmountPaid"
          float-label="Total Amount Paid"
          placeholder="Total Amount Paid"
        />
      </div>
    </div>
    <q-stepper-navigation>
      <q-btn color="primary" class="q-ma-xs" icon="check" @click="validate" label="Continue"/>
      <q-btn
        color="amber-10"
        class="q-ma-xs"
        icon="save"
        label="Save Partial"
        @click="$emit('saveData','paymentDetails',merchant)"
      />
      <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$emit('goBack')" label="Back"/>
    </q-stepper-navigation>
    <div class="hidden">{{makePropsReactive}}</div>
  </div>
</template>

<script>
import {
  helpers,
  required,
  requiredIf,
  integer,
  minLength,
  maxLength,
  email,
  decimal,
  between,
  numeric
} from "@vuelidate/validators";
export default {
  // name: 'ComponentName',
  props: [
    "terminalModelSet",
    "rentalPlanSet",
    "serviceProviderListSet",
    "networkProviderListSet",
    "paymentInformation"
  ],
  data() {
    return {
      deviceOwnedByOptions: [
        {
          label: "Bijlipay",
          value: "B"
        },
        {
          label: "Merchant",
          value: "M"
        }
      ],
      cashAtPosEnabledOptions: [
        {
          label: "Yes",
          value: "Y"
        },
        {
          label: "No",
          value: "N"
        }
      ],
      rentalModeOptions: [
        {
          label: "Standing instructions",
          value: "S"
        },
        {
          label: "Normal",
          value: "N"
        },
        {
          label: "Nabad",
          value: "B"
        },
        {
          label: "Invoice for EPRS",
          value: "I"
        },
        {
          label: "Equitas Rental",
          value: "E"
        },
        {
          label: "Big merchant",
          value: "M"
        },
        {
          label: "Invoice to Trade",
          value: "IT"
        },
        {
          label: "Rental Fee Waiver",
          value: "RW"
        },
        {
          label: "Advance Rental",
          value: "AR"
        },
        {
          label: "Settlement",
          value: "SE"
        },
        {
          label: "Exibition",
          value: "EX"
        },
        {
          label: "Clix",
          value: "CX"
        },
        {
          label: "Subvention",
          value: "SB"
        },
        {
          label: "EMI Rental",
          value: "EM"
        },
        {
          label: "BPCL",
          value: "BP"
        },
        {
          label: "Demo Device",
          value: "DD"
        },
        {
          label: "Invoice to Bank",
          value: "IB"
        },
        {
          label: "Finetree Finance LTD",
          value: "FF"
        },
        {
          label: "Deactivated",
          value: "DT"
        }
      ],
      advanceRentModeOptions: [
        {
          label: "Card",
          value: "Card"
        },
        {
          label: "Cheque",
          value: "Cheque"
        },
        {
          label: "NEFT",
          value: "NEFT"
        },
        {
          label: "IMPS",
          value: "IMPS"
        },
        {
          label: "Cash",
          value: "Cash"
        }
      ],
      rentalTypeOptions: [
        {
          label: "Advanced",
          value: "A"
        },
        {
          label: "Regular",
          value: "R"
        }
      ],
      merchant: {
        paymentDetails: {}
      }
    };
  },
  validations: {
    merchant: {
      paymentDetails: {
        installationFee: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForRental === true;
          }),
          decimal,
          between: between(0, 999999.99),
          minLength: minLength(1),
          maxLength: maxLength(12)
        },
        serviceProvider: {
          required
        },
        networkPreferred: {
          required
        },
        terminalModeCode: {
          required
        },
        devicePrice: {
          decimal,
          between: between(0, 999999.99),
          minLength: minLength(2),
          maxLength: maxLength(8)
        },
        otherCharges: {
          decimal,
          between: between(0, 999999),
          minLength: minLength(2),
          maxLength: maxLength(8)
        },
        totalAmountPaid: {
          decimal,
          between: between(0, 999999),
          minLength: minLength(2),
          maxLength: maxLength(12)
        },
        numberOfTerminals: {
          numeric,
          between: between(1, 100)
        },
        deviceOwnedBy: {
          required
        },
        cashAtPosEnabled: {
          required
        },
        rentalType: {
          required
        },
        advanceRentCollected: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForAdvanced;
          }),
          decimal,
          between: between(0, 999999),
          minLength: minLength(2),
          maxLength: maxLength(8)
        },
        advanceRentMode: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForAdvanced;
          })
        },
        noOfMonthRentPaidInAdvance: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForAdvanced;
          }),
          between: between(0, 999999),
          minLength: minLength(2),
          maxLength: maxLength(8)
        },
        gracePeriod: {
          required: requiredIf(function() {
            return this.getRentalTypeVisibilityForRental === true;
          }),
          between: between(0, 999999),
          minLength: minLength(1),
          maxLength: maxLength(8)
        }
      }
    }
  },
  computed: {
    makePropsReactive() {
      this.merchant.paymentDetails = this.paymentInformation;
    },
    // R=> rental type /= Rental
    getRentalTypeVisibilityForRental() {
      return this.merchant.paymentDetails.rentalType == "R";
    },
    // A=> rental type /= Advanced
    getRentalTypeVisibilityForAdvanced() {
      return this.merchant.paymentDetails.rentalType == "A";
    }
  },
  methods: {
    validate() {
      this.$v.merchant.paymentDetails.$touch();
      if (this.$v.merchant.paymentDetails.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$emit("goNext", "paymentDetails", this.merchant);
      }
    }
  }
};
</script>

<style>
</style>
