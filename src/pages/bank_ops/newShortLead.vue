<template>
  <q-page>
    <div>
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Assign Short Lead</div>
      <div class="q-px-lg">
        <div class="text-body1 uppercase text-weight-medium text-grey-9 q-my-md">Merchant Details</div>
        <div class="row group">
          <div class="col">
            <q-input
              v-model="formData.leadName"
              @blur="$v.formData.leadName.$touch"
              :error="$v.formData.leadName.$error"
              float-label="Merchant Name"
              placeholder="Merchant Name"
              color="grey-9"
            />
          </div>
          <div class="col">
            <q-input
              v-model="formData.contactName"
              @blur="$v.formData.contactName.$touch"
              :error="$v.formData.contactName.$error"
              float-label="Contact Name"
              placeholder="Contact Name"
              color="grey-9"
            />
          </div>
          <div class="col">
            <q-input
              v-model="formData.contactNumber"
              @blur="$v.formData.contactNumber.$touch"
              :error="$v.formData.contactNumber.$error"
              float-label="Contact Number"
              placeholder="Contact Number"
              color="grey-9"
            />
          </div>
          <div class="col">
            <q-input
              @blur="$v.formData.alternateContactNumber.$touch"
              :error="$v.formData.alternateContactNumber.$error"
              v-model="formData.alternateContactNumber"
              float-label="Alternate Contact Number"
              placeholder="Alternate Contact Number"
              color="grey-9"
            />
          </div>
        </div>

        <div class="row group">
          <div class="col">
            <q-input
              v-model="formData.leadAddress"
              float-label="Merchant Address"
              placeholder="Merchant Address"
              color="grey-9"
            />
          </div>
          <div class="col">
            <q-input
              type="number"
              :error="$v.formData.pincode.$error"
              clearable
              @clear="fnClearStateCity"
              color="grey-9"
              v-model="formData.pincode"
              float-label="Pincode"
              placeholder="Pincode"
            >
              <q-autocomplete
                @search="pincodeSearch"
                :debounce="500"
                :min-characters="1"
                @selected="pincodeSelected"
              />
            </q-input>
          </div>
          <div class="col">
            <q-input
              disable
              v-model="formData.city"
              @blur="$v.formData.city.$touch"
              :error="$v.formData.city.$error"
              float-label="City/Town"
              placeholder="City/Town"
              color="grey-9"
            />
          </div>
          <div class="col">
            <q-input
              disable
              v-model="formData.state"
              @blur="$v.formData.state.$touch"
              :error="$v.formData.state.$error"
              float-label="State"
              placeholder="State"
              color="grey-9"
            />
          </div>
        </div>

        <div class="text-body1 uppercase text-weight-medium text-grey-9 q-my-md">Device Details</div>
        <div class="row group">
          <div class="col">
            <q-input
              :error="$v.formData.leadSource.id.$error"
              @blur="$v.formData.leadSource.id.$touch"
              clearable
              @clear="fnClearDeviceList"
              color="grey-9"
              v-model="formData.leadSource.name"
              float-label="Lead Source"
              placeholder="Lead Source"
            >
              <q-autocomplete
                @search="leadSourceSearch"
                :debounce="500"
                :min-characters="1"
                @selected="leadSourceSelected"
              />
            </q-input>
            <p class="q-py-sm" v-if="leadSourceSelectOptions.length == 0">No data available</p>
          </div>
          <div class="col">
            <q-select
              :disable="deviceSelectOptions.length > 0"
              placeholder="Device Type"
              clearable
              color="grey-9"
              v-model="formData.device.id"
              @blur="$v.formData.device.id.$touch"
              :error="$v.formData.device.id.$error"
              float-label="Type"
              :options="deviceSelectOptions"
            />
            <p class="q-py-sm" v-if="deviceSelectOptions.length == 0">No data available</p>
          </div>
          <div class="col">
            <q-input
              v-model="formData.deviceCount"
              @blur="$v.formData.deviceCount.$touch"
              :error="$v.formData.deviceCount.$error"
              type="number"
              float-label="Count"
              placeholder="Device Count"
              color="grey-9"
            />
          </div>
        </div>
        <div class="text-body1 uppercase text-weight-medium text-grey-9 q-my-md">Assign To</div>
        <div class="row">
          <div class="col-md-6 group">
            <q-radio
              v-model="formData.tempAssignedTo"
              @input="fnToShowAssignSelect"
              val="1"
              label="RSM"
            />
            <q-radio
              v-model="formData.tempAssignedTo"
              @input="fnToShowAssignSelect"
              val="2"
              label="ASM"
            />
          </div>
        </div>

        <div class="row group q-mt-xs">
          <div class="col-md-4" v-if="formData.tempAssignedTo == 1">
            <q-select
              :disable="RSMselectOptions.length > 0"
              @blur="$v.formData.assignedOpsTo.id.$touch"
              :error="$v.formData.assignedOpsTo.id.$error"
              placeholder="Choose from the below"
              clearable
              color="grey-9"
              v-model="formData.assignedOpsTo.id"
              float-label="RSM Name"
              :options="RSMselectOptions"
            />
            <p class="q-py-sm" v-if="leadSourceSelectOptions.length == 0">No data available</p>
          </div>
          <div class="col-md-4" v-if="formData.tempAssignedTo == 2">
            <q-select
              :disable="getAllRegionsData.length > 0"
              placeholder="Choose Region"
              clearable
              color="grey-9"
              v-model="region"
              float-label="Region"
              :options="getAllRegionsData"
              @clear="fnClearASMList"
              @input="fnFetchASMList()"
            />
            <p class="q-py-xs" v-if="leadSourceSelectOptions.length == 0">No data available</p>
          </div>
          <div class="col-md-4" v-if="formData.tempAssignedTo == 2">
            <q-select
              :disable="ASMselectOptions.length > 0"
              @blur="$v.formData.assignedOpsTo.id.$touch"
              :error="$v.formData.assignedOpsTo.id.$error"
              placeholder="Choose from the below"
              clearable
              color="grey-9"
              v-model="formData.assignedOpsTo.id"
              float-label="ASM Name"
              :options="ASMselectOptions"
            />
            <p class="q-py-xs" v-if="leadSourceSelectOptions.length == 0">No data available</p>
          </div>
        </div>
        <div class="row">
          <div class="col group" align="right">
            <q-btn icon="block" outline color="dark" label="Cancel"/>
            <q-btn @click="fnSubmibAssignShortLead()" icon="check" color="info" label="Submit"/>
          </div>
        </div>
      </div>
      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35"/>
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import {
  required,
  maxValue,
  minValue,
  minLength,
  maxLength
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "newShortLead",

  data() {
    return {
      toggleAjaxLoadFilter: false,
      region: "",
      deviceSelectOptions: [],
      leadSourceSelectOptions: [],
      RSMselectOptions: [],
      ASMselectOptions: [],
      showAssignSelect: null,
      formData: {
        leadName: "",
        contactName: "",
        contactNumber: "",
        alternateContactNumber: "",
        leadAddress: "",
        latitude: 13.458,
        longitude: 89.236,
        city: "",
        deviceCount: "",
        state: "",
        device: {
          id: ""
        },
        leadSource: {
          id: "",
          name: ""
        },
        tempAssignedTo: "1",
        assignedOpsTo: {
          id: ""
        },
        pincode: ""
      }
    };
  },

  validations: {
    formData: {
      leadName: { required },
      contactName: { required },
      contactNumber: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      alternateContactNumber: {
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      latitude: { required },
      longitude: { required },
      city: { required },
      deviceCount: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(100)
      },
      state: { required },
      device: {
        id: { required }
      },
      leadSource: {
        id: { required }
      },
      assignedOpsTo: {
        id: { required }
      },
      pincode: { required }
    }
  },

  created() {
    /* START: Load all States */
    this.ajaxLoadDataForAllStatesList();
    this.ajaxLoadDataForRSMandASMList();
    /* End: Load all States */
  },

  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllStatesData", "getAllRegionsData"]),
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
    ...mapGetters("BankOpsShortLead", [
      "getSelectOptionsRSMInfo",
      "getSelectOptionsASMInfo",
      "getSelectOptionsLeadSourceBankInfo"
    ]),
    ...mapGetters("DeviceListBasedOnLeadSource", [
      "getDevicesBasedOnLeadSource"
    ])
  },

  methods: {
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_STATES_DATA",
      "FETCH_PINCODE_WITH_TERM",
      "FETCH_ALL_REGIONS_DATA"
    ]),
    ...mapActions("DeviceListBasedOnLeadSource", [
      "DEVICE_LIST_BASED_ON_LEAD_SOURCE"
    ]),
    ...mapActions("BankOpsShortLead", [
      "CREATE_SHORT_LEAD",
      "FETCH_RSM_DATA",
      "FETCH_ASM_DATA",
      "FETCH_ALL_LEAD_SOURCE_BANK_DATA"
    ]),

    // Funtion to load states available
    ajaxLoadDataForAllStatesList() {
      this.FETCH_ALL_STATES_DATA();
      this.FETCH_ALL_REGIONS_DATA();

      this.FETCH_ALL_LEAD_SOURCE_BANK_DATA().then(() => {
        let assumeArr = [];
        this.getSelectOptionsLeadSourceBankInfo.map(function(value) {
          assumeArr.push({ label: value.sourceName, value: value.id });
        });
        console.log("assumeArr", this.getSelectOptionsLeadSourceBankInfo);
        this.leadSourceSelectOptions = assumeArr;
      });

      this.FETCH_DEVICES_DATA().then(() => {
        let assumeArr = [];
        this.getAllDevicesInfo.map(function(value) {
          assumeArr.push({ label: value.deviceName, value: value.id });
        });
        this.deviceSelectOptions = assumeArr;
      });

      this.FETCH_RSM_DATA().then(() => {
        let assumeArr = [];
        this.getSelectOptionsRSMInfo.map(function(value) {
          assumeArr.push({ label: value.name, value: value.id });
        });
        this.RSMselectOptions = assumeArr;
      });
    },

    // Funtion to load states available
    ajaxLoadDataForRSMandASMList() {
      this.FETCH_ALL_STATES_DATA();
    },

    //Function clear city and state when pincode is cleared
    fnClearStateCity() {
      this.formData.pincode = "";
      this.formData.state = "";
      this.formData.city = "";
    },

    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function(oo) {
        return oo.label.toLowerCase().includes(terms.toLowerCase());
      });
    },
    COMMON_FILTER_FUNCTION_PINCODE(arraySet, terms) {
      return _.filter(arraySet, function(oo) {
        return oo.label.toLowerCase().includes(terms.toLowerCase());
      });
    },

    /* Pincode search result */
    pincodeSearch(terms, done) {
      this.formData.cityName = "";
      this.formData.stateName = "";
      this.FETCH_PINCODE_WITH_TERM(terms)
        .then(() => {
          done(
            this.COMMON_FILTER_FUNCTION_PINCODE(this.getAllStatesData, terms)
          );
        })
        .catch(() => {
          done([]);
        });
    },
    pincodeSelected(item) {
      this.formData.state = item.value.stateName;
      this.formData.city = item.value.cityName;
      this.formData.pincode = item.value.pincode;
    },
    /* Pincode search result */

    /* Lead source search result */
    leadSourceSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.leadSourceSelectOptions, terms));
    },
    leadSourceSelected(item) {
      this.formData.leadSource.name = item.label;
      this.formData.leadSource.id = item.value;

      this.toggleAjaxLoadFilter = true;
      this.deviceSelectOptions = [];
      let self = this;
      // Calls action in store to get device types
      this.DEVICE_LIST_BASED_ON_LEAD_SOURCE(self.formData.leadSource.id)
        .then(response => {
          this.toggleAjaxLoadFilter = false;
          let assumeArr = [];
          // Function to framing device options
          let currentMappingElement = self.getDevicesBasedOnLeadSource.device;
          currentMappingElement.map(function(value, index) {
            assumeArr.push({ label: value.deviceName, value: value.id });
          });
          self.deviceSelectOptions = assumeArr;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter = false;

          // if any issues throw the below error
          if (error.status == this.$API_SUCCESS) {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "No device type available",
              icon: "info"
            });
          } else {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          }
        });
    },
    /* Lead source search result */

    // Function to show rsm/asm select box
    fnToShowAssignSelect() {
      this.formData.assignedOpsTo.id = null;
      // this.showAssignSelect = !this.showAssignSelect;
    },

    fnClearASMList() {
      this.ASMselectOptions = [];
    },
    fnClearDeviceList() {
      this.deviceSelectOptions = [];
    },

    fnFetchASMList() {
      this.FETCH_ASM_DATA(this.region).then(() => {
        if (this.getSelectOptionsASMInfo.length > 0) {
          let assumeArr = [];
          this.getSelectOptionsASMInfo.map(function(value) {
            assumeArr.push({ label: value.name, value: value.id });
          });
          this.ASMselectOptions = assumeArr;
        } else {
          this.$q.notify({
            color: "amber-9",
            position: "bottom",
            message: "No ASM available in the selected region ",
            icon: "warning"
          });
        }
      });
    },

    // Function to final submit short lead
    fnSubmibAssignShortLead() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.CREATE_SHORT_LEAD(this.formData)
          .then(() => {
            this.$q.loading.hide();
            this.$router.push("/bank/ops/assign/short/lead");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up"
            });
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>

<style>
</style>
