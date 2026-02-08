<template>
  <div>
    <div class="row gutter-sm">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.businessInformation.weekdayStartHour.$touch"
          :error="$v.merchant.businessInformation.weekdayStartHour.$error"
          v-model="merchant.businessInformation.weekdayStartHour"
          float-label="Weekday start hour (00.00)"
          placeholder="Weekday start hour"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.businessInformation.weekdayEndHour.$touch"
          :error="$v.merchant.businessInformation.weekdayEndHour.$error"
          v-model="merchant.businessInformation.weekdayEndHour"
          float-label="Weekday end hour (00.00)"
          placeholder="Weekday end hour"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.businessInformation.weekendStartHour.$touch"
          :error="$v.merchant.businessInformation.weekendStartHour.$error"
          v-model="merchant.businessInformation.weekendStartHour"
          float-label="Weekend start hour (00.00)"
          placeholder="Weekend start hour"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.businessInformation.weekendEndHour.$touch"
          :error="$v.merchant.businessInformation.weekendEndHour.$error"
          v-model="merchant.businessInformation.weekendEndHour"
          float-label="Weekend end hour (00.00)"
          placeholder="Weekend end hour"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.businessInformation.lastTurnoverYear.$touch"
          :error="$v.merchant.businessInformation.lastTurnoverYear.$error"
          v-model="merchant.businessInformation.lastTurnoverYear"
          float-label="Last turnover year"
          placeholder="Last turnover year"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          type="number"
          @blur="$v.merchant.businessInformation.lastTurnoverAmount.$touch"
          :error="$v.merchant.businessInformation.lastTurnoverAmount.$error"
          v-model="merchant.businessInformation.lastTurnoverAmount"
          float-label="Turnover during last year"
          placeholder="Turnover during last year"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          type="number"
          @blur="$v.merchant.businessInformation.expectedCardBusiness.$touch"
          :error="$v.merchant.businessInformation.expectedCardBusiness.$error"
          v-model="merchant.businessInformation.expectedCardBusiness"
          float-label="Expected Card Business"
          placeholder="Expected Card Business"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          type="number"
          @blur="$v.merchant.businessInformation.averageBillAmount.$touch"
          :error="$v.merchant.businessInformation.averageBillAmount.$error"
          v-model="merchant.businessInformation.averageBillAmount"
          float-label="Average Bill Amount"
          placeholder="Average Bill Amount"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          upper-case
          color="grey-9"
          @blur="$v.merchant.businessInformation.gstId.$touch"
          :error="$v.merchant.businessInformation.gstId.$error"
          v-model="merchant.businessInformation.gstId"
          float-label="GST ID"
          placeholder="GST ID"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          v-model="merchant.businessInformation.currentPosName"
          float-label="Name of the other POS Currentlly Used"
          placeholder="Name of the other POS Currentlly Used"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.businessInformation.debitCardMdr.$touch"
          :error="$v.merchant.businessInformation.debitCardMdr.$error"
          v-model="merchant.businessInformation.debitCardMdr"
          float-label="Debit Card MDR"
          placeholder="Debit Card MDR"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          color="grey-9"
          @blur="$v.merchant.businessInformation.creditCardMdr.$touch"
          :error="$v.merchant.businessInformation.creditCardMdr.$error"
          v-model="merchant.businessInformation.creditCardMdr"
          float-label="Credit Card MDR"
          placeholder="Credit Card MDR"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          format="DD/MM/YYYY"
          format-model="number"
          @blur="$v.merchant.businessInformation.memberSince.$touch"
          :error="$v.merchant.businessInformation.memberSince.$error"
          color="grey-9"
          modal
          v-model="merchant.businessInformation.memberSince"
          float-label="Member since"
          placeholder="Member since"
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
        @click="$emit('saveData')"
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
  between
} from "@vuelidate/validators";
const timeValidate = helpers.regex(
  "timeValidate",
  /^(?:\d|[01]\d|2[0-3])\.[0-5]\d$/
);
export default {
  // name: 'ComponentName',
  props: ["businessInformation"],

  data() {
    return {
      merchant: {
        businessInformation: {}
      }
    };
  },
  validations: {
    merchant: {
      businessInformation: {
        gstId: {
          // required,
          // gstn,
          maxLength: maxLength(15),
          minLength: minLength(15)
        },
        weekendEndHour: {
          timeValidate
        },
        weekendStartHour: {
          timeValidate
        },
        weekdayEndHour: {
          timeValidate
        },
        weekdayStartHour: {
          timeValidate
        },
        memberSince: {
          // Removing the validation as per client request
          required: false
        },
        debitCardMdr: {
          decimal,
          between: between(0, 99.99)
        },
        creditCardMdr: {
          decimal,
          between: between(0, 99.99)
        },
        expectedCardBusiness: {
          decimal,
          between: between(0, 9999999999.99)
        },
        averageBillAmount: {
          decimal,
          between: between(0, 9999999999.99)
        },
        lastTurnoverAmount: {
          decimal,
          between: between(0, 9999999999.99)
        },
        lastTurnoverYear: {
          integer,
          between: between(0, 2018),
          minLength: minLength(4),
          maxLength: maxLength(4)
        }
      }
    }
  },
  computed: {
    makePropsReactive() {
      this.merchant.businessInformation = this.businessInformation;
    }
  },
  methods: {
    validate() {
      this.$v.merchant.businessInformation.$touch();
      if (this.$v.merchant.businessInformation.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$emit("goNext", "businessInformation", this.merchant);
      }
    }
  }
};
</script>

<style>
</style>
