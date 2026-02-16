<template>
  <div>
    <div
      v-for="(v,index) in $v.partnersArr.$each"
      :key="index"
      class="row q-my-xs gutter-sm"
      ref="parentElement"
    >
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="row group items-center">
          <div class="col">
            <span class="q-pa-sm bg-light text-dark">
              <q-icon name="people"/>
              Partner 0{{parseInt(index)+1}}
            </span>
          </div>
          <div class="col-auto" v-if="Object.keys($v.partnersArr.$each).length > 1">
            <q-btn round icon="delete" @click="removePartnerFromArr(v,index)" color="negative"/>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          :error="v.name.$anyError"
          @blur="v.name.$touch()"
          color="grey-9"
          v-model="v.$model.name"
          float-label="Name*"
          placeholder="Name*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          upper-case
          :error="v.pan.$anyError"
          @blur="v.pan.$touch()"
          color="grey-9"
          v-model="v.$model.pan"
          float-label="Pan*"
          placeholder="Pan*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          :error="v.address.$anyError"
          @blur="v.address.$touch()"
          color="grey-9"
          v-model="v.$model.address"
          float-label="Address*"
          placeholder="Address*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          :error="v.pin.$anyError"
          @blur="v.pin.$touch()"
          color="grey-9"
          type="number"
          v-model="v.$model.pin"
          float-label="Pincode*"
          placeholder="Pincode*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          :error="v.cityRefLabel.$anyError || v.cityRefCode.$anyError"
          @blur="v.cityRefCode.$touch()"
          color="grey-9"
          v-model="v.$model.cityRefLabel"
          float-label="City (type min 3 characters)*"
          placeholder="Start typing ..*"
        >
          <q-autocomplete
            separator
            @search="citySearch"
            :debounce="10"
            :min-characters="3"
            @selected="obj => partnerCitySelected(obj,index)"
          />
        </q-input>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          :error="v.stateRefLabel.$anyError || v.stateRefCode.$anyError"
          @blur="v.stateRefCode.$touch()"
          color="grey-9"
          v-model="v.$model.stateRefLabel"
          float-label="State (type min 3 characters)*"
          placeholder="Start typing ..*"
        >
          <q-autocomplete
            separator
            @search="stateSearch"
            :debounce="10"
            :min-characters="1"
            @selected="obj => partnerStateSelected(obj,index)"
          />
        </q-input>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          :error="v.contactMobile.$anyError"
          @blur="v.contactMobile.$touch()"
          color="grey-9"
          type="tel"
          v-model="v.$model.contactMobile"
          float-label="Mobile*"
          placeholder="Mobile*"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input
          :error="v.contactEmail.$anyError"
          @blur="v.contactEmail.$touch()"
          color="grey-9"
          type="email"
          v-model="v.$model.contactEmail"
          float-label="Email*"
          placeholder="Email*"
        />
      </div>
    </div>
    <q-stepper-navigation>
      <q-btn color="primary" class="q-ma-xs" icon="check" @click="validate()" label="Continue"/>
      <q-btn
        color="amber-10"
        class="q-ma-xs"
        icon="save"
        label="Save Partial"
        @click="$emit('saveData','partnerInformation',partnersArr)"
      />
      <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$emit('goBack')" label="Back"/>
      <q-btn
        color="positive float-right"
        @click="addMorePartnersSet"
        class="q-ma-xs"
        icon="add"
        label="Add More"
      />
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
  email
} from "@vuelidate/validators";
const panCard = helpers.regex(
  "panCard",
  /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
);
export default {
  // name: 'ComponentName',
  props: ["cityOptions", "stateOptions", "constitution", "partnerInformation"],
  data() {
    return {
      partnersArr: []
    };
  },
  validations: {
    partnersArr: {
      required: requiredIf(function() {
        return this.getPartnersVisiblity;
      }),
      $each: {
        name: { required },
        address: { required },
        pan: {
          required,
          panCard,
          maxLength: maxLength(10),
          minLength: minLength(10)
        },
        pin: {
          required,
          integer,
          minLength: minLength(6),
          maxLength: maxLength(7)
        },
        stateRefCode: { required, integer },
        stateRefLabel: { required },
        cityRefCode: { required, integer },
        cityRefLabel: { required },
        contactMobile: {
          required,
          integer,
          minLength: minLength(10),
          maxLength: maxLength(10)
        },
        contactEmail: { required, email }
      }
    }
  },
  computed: {
    makePropsReactive() {
      this.partnersArr = this.partnerInformation;
    },
    // Checks for value in partners array => Global variable
    getPartnersVisiblity() {
      return this.$PARTNERS_TAB_ENABLED_ITEMS.includes(this.constitution);
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

    // Partners city selction
    partnerCitySelected(item, index) {
      this.$v.partnersArr.$each[index].cityRefCode.$model = item.value;
      this.$v.partnersArr.$each[index].cityRefLabel.$model = item.label;
    },

    // Partners state selection
    partnerStateSelected(item, index) {
      this.$v.partnersArr.$each[index].stateRefCode.$model = item.value;
      this.$v.partnersArr.$each[index].stateRefLabel.$model = item.label;
    },

    addMorePartnersSet() {
      let partnerObj = {
        name: "",
        address: "",
        pan: "",
        pin: "",
        cityRefCode: "",
        cityRefLabel: "",
        stateRefCode: "",
        stateRefLabel: "",
        contactMobile: "",
        contactEmail: ""
      };
      this.partnersArr.push(partnerObj);
    },

    removePartnerFromArr(item, index) {
      this.partnersArr.splice(index, 1);
    },
    validate() {
      this.$v.partnersArr.$touch();
      if (this.$v.partnersArr.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$emit("goNext", "partnerInformation", {
          partnerInformation: this.partnersArr
        });
      }
    }
  }
};
</script>

<style>
</style>
