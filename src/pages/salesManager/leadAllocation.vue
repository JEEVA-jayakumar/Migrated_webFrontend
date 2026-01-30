<template>
  <q-page>
    <div>
      <!--START: table title -->
      <div
        class="q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Lead Allocation</div>
      <!--END: table title -->
      <div class="q-px-lg text-weight-regular text-grey-8">
        <div class="row">
          <div class="group col-md-6 col-sm-12 col-xs-12">
            <div class="row group">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  @blur="$v.formData.leadName.$touch"
                  :error="$v.formData.leadName.$error"
                  color="grey-9"
                  v-model="formData.leadName"
                  float-label="Merchant Name*"
                  placeholder="Merchant Name"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.formData.contactName.$touch"
                  :error="$v.formData.contactName.$error"
                  v-model="formData.contactName"
                  float-label="Contact Name*"
                  placeholder="Contact Name"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                 
                  v-model="formData.email"
                  float-label="Email"
                  placeholder="Email"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.formData.contactNumber.$touch"
                  :error="$v.formData.contactNumber.$error"
                  v-model="formData.contactNumber"
                  type="number"
                  float-label="Contact Number*"
                  placeholder="Contact Number"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.formData.alternateContactNumber.$touch"
                  :error="$v.formData.alternateContactNumber.$error"
                  v-model="formData.alternateContactNumber"
                  type="number"
                  float-label="Alternate Contact Number"
                  placeholder="Alternate Contact Number"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  color="grey-9"
                  @blur="$v.formData.leadAddress.$touch"
                  :error="$v.formData.leadAddress.$error"
                  v-model="formData.leadAddress"
                  float-label="Merchant Address"
                  placeholder="Merchant Address"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-select
                  placeholder="Select Pincode"
                  filter
                  clearable
                  color="grey-9"
                  @blur="$v.formData.pincodeObj.$touch"
                  :error="$v.formData.pincodeObj.$error"
                  v-model="formData.pincodeObj"
                  @input="fnPopulateStateCity"
                  @clear="fnClearStateCity"
                  float-label="Pincode"
                  :options="getAllStatesData"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  disable
                  color="grey-9"
                  @blur="$v.formData.city.$touch"
                  :error="$v.formData.city.$error"
                  v-model="formData.city"
                  float-label="City/Town"
                  placeholder="Merchant Address"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  disable
                  color="grey-9"
                  @blur="$v.formData.state.$touch"
                  :error="$v.formData.state.$error"
                  v-model="formData.state"
                  float-label="State"
                  placeholder="State"
                />
              </div>
            </div>
          </div>
          <div class="group col-md-6 col-sm-12 col-xs-12">
            <div class="row group">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-select
                  @input="fnAjaxRequestPopulateDeviceListData"
                  color="grey-9"
                  @blur="$v.formData.leadSource.id.$touch"
                  :error="$v.formData.leadSource.id.$error"
                  v-model="formData.leadSource.id"
                  float-label="Lead Source*"
                  placeholder="Lead Source"
                  radio
                  :options="leadSourceOptions"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-select
                  color="grey-9"
                  @blur="$v.formData.device.id.$touch"
                  :error="$v.formData.device.id.$error"
                  v-model="formData.device.id"
                  float-label="Device Type"
                  radio
                  :disable="isDeviceTypeSelectionDisabled"
                  :options="deviceTypeOptions"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  type="number"
                  color="grey-9"
                  @blur="$v.formData.deviceCount.$touch"
                  :error="$v.formData.deviceCount.$error"
                  v-model="formData.deviceCount"
                  float-label="Device Count*"
                  placeholder="Device Count"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12" v-show="enableRSMdropdown">
                <q-select
                  @input="fnGetAllUsersByHidUidRSM"
                  color="grey-9"
                  v-model="currentAssingedToRSM"
                  placeholder="--RSM--"
                  stack-label="Select RSM"
                  radio
                  :disable="assignToOptionsRSM.length > 0 ? false:true"
                  :options="assignToOptionsRSM"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12" v-show="enableASMdropdown">
                <q-select
                  @input="fnGetAllUsersByHidUidASM"
                  color="grey-9"
                  v-model="currentAssingedToASM"
                  placeholder="--ASM--"
                  stack-label="Select ASM"
                  radio
                  :disable="assignToOptionsASM.length > 0 ? false:true"
                  :options="assignToOptionsASM"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-select
                  @input="fnGetAllUsersByHidUidTL"
                  color="grey-9"
                  v-model="assignTo"
                  placeholder="--TL--"
                  stack-label="Select TL"
                  radio
                  :disable="assignToOptionsTL.length > 0 ? false:true"
                  :options="assignToOptionsTL"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-select
                  filter 
                  clearable
                  color="grey-9"
                  @blur="$v.formData.assignedTo.id.$touch"
                  :error="$v.formData.assignedTo.id.$error"
                  v-model="formData.assignedTo.id"
                  placeholder="--SO--"
                  stack-label="Select SO"
                  radio
                  :disable="assignToOptionsSO.length > 0 ? false:true"
                  :options="assignToOptionsSO"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-4 col-xs-12">
            <q-btn color="dark" @click="fnFinalSubmit(formData)" label="Assign"/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  maxValue,
  minValue,
  alphaNum,
  email
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  // name: 'PageName',
  data() {
    return {
      enableRSMdropdown: false,
      enableASMdropdown: false,

      isDeviceTypeSelectionDisabled: true,
      merchantName: "",
      assignTo: "",
      assignToOptionsRSM: [],
      currentAssingedToRSM: null,
      assignToOptionsASM: [],
      currentAssingedToASM: null,
      assignToOptionsTL: [],
      currentAssingedToTL: null,
      assignToOptionsSO: [],
      currentAssingedToSO: null,
      assignToOptions: [
        {
          label: "Foo",
          value: 1
        },
        {
          label: "Bar",
          value: 2
        },
        {
          label: "Ipsum",
          value: 3
        }
      ],
      leadSourceOptions: [],
      deviceTypeOptions: [],
      formData: {
        leadName: "",
        contactName: "",
        contactNumber: "",
        email: "",
        alternateContactNumber: "",
        leadAddress: "",
        latitude: 13.458,
        longitude: 89.236,
        city: "",
        deviceCount: "",
        state: "",
        device: {
          id: null
        },
        leadSource: {
          id: null
        },
        tempAssignedTo: "1",
        assignedTo: {
          id: null
        },
        pincodeObj: null,
        pincode: null
      }
    };
  },

  validations: {
    formData: {
      leadName: {
        required
      },
      leadAddress: {
        required
      },
      // email: {
      //   required,
      //   email
      // },
      contactName: {
        required
      },
      contactNumber: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      alternateContactNumber: {
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      latitude: {
        required
      },
      longitude: {
        required
      },
      city: {
        required
      },
      deviceCount: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(100)
      },
      state: {
        required
      },
      device: {
        id: {
          required
        }
      },
      leadSource: {
        id: {
          required
        }
      },
      assignedTo: {
        id: {
          required
        }
      },
      pincodeObj: {
        required
      }
    }
  },

  created() {
    this.fnAjaxRequestPopulateTrackerData();
  },

  computed: {
    ...mapGetters("DeviceListBasedOnLeadSource", [
      "getDevicesBasedOnLeadSource"
    ]),
    ...mapGetters("SalesManager_LeadAllocation", [
      "getAllUserByIdAndHierarchyIdData"
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"]),
    ...mapGetters("BankOpsShortLead", ["getSelectOptionsLeadSourceInfo"])
  },

  methods: {
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_STATES_DATA"]),
    ...mapActions("BankOpsShortLead", ["FETCH_ALL_LEAD_SOURCE_DATA"]),
    ...mapActions("DeviceListBasedOnLeadSource", [
      "DEVICE_LIST_BASED_ON_LEAD_SOURCE"
    ]),
    ...mapActions("SalesManager_LeadAllocation", [
      "FETCH_USERS_BY_USER_ID",
      "UPDATE_SHORT_LEAD_SALES_INFO"
    ]),

    identifySalesHierarchyRole() {
      let self = this;
      /* Hierachy sales values has been taken from gloabl variables from plugin */
      return _.find(JSON.parse(localStorage.getItem("u_i")).roles, function(
        oo
      ) {
        return oo.hierarchy.hierarchyCode.includes(self.$HIERARCHY_SALES);
      });
    },

    //  Function to populate all lead allocation tracker
    fnAjaxRequestPopulateTrackerData() {
      let self = this;
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data.."
      });
      this.FETCH_ALL_STATES_DATA()
        .then(() => {
          this.FETCH_USERS_BY_USER_ID({
            hierarchy: { id: this.identifySalesHierarchyRole().hierarchy.id },
            user: { id: JSON.parse(localStorage.getItem("u_i")).user.id }
          })
            .then(response => {
              if (self.getAllUserByIdAndHierarchyIdData.length == 0) {
                this.$q.notify({
                  color: "primary",
                  position: "bottom",
                  message: "No user available",
                  icon: "info"
                });
              } else {
                let assumeArr = [];
                // Function to framing device options
                let currentMappingElement =
                  self.getAllUserByIdAndHierarchyIdData;
                currentMappingElement.map(function(value, index) {
                  assumeArr.push({ label: value.user.name, value: value });
                });
                if (
                  this.identifySalesHierarchyRole().hierarchyRoleLevel ==
                  this.$ROLE_HIERARCHY_SALES_NATIONAL_HEAD
                ) {
                  self.enableRSMdropdown = true;
                  self.enableASMdropdown = true;
                  self.assignToOptionsRSM = assumeArr;
                } else if (
                  this.identifySalesHierarchyRole().hierarchyRoleLevel ==
                  this.$ROLE_HIERARCHY_SALES_RSM
                ) {
                  self.enableRSMdropdown = false;
                  self.enableASMdropdown = true;
                  self.assignToOptionsASM = assumeArr;
                } else if (
                  this.identifySalesHierarchyRole().hierarchyRoleLevel ==
                  this.$ROLE_HIERARCHY_SALES_ASM
                ) {
                  self.enableRSMdropdown = false;
                  self.enableASMdropdown = false;
                  self.assignToOptionsTL = assumeArr;
                }
                // Assingnment to disable == false select box
                // self.isDeviceTypeSelectionDisabled = false;
              }
            })
            .then(response => {
              this.FETCH_ALL_LEAD_SOURCE_DATA().then(response => {
                let assumeArr = [];
                // Function to framing device options
                let currentMappingElement = self.getSelectOptionsLeadSourceInfo;
                currentMappingElement.map(function(value, index) {
                  assumeArr.push({ label: value.sourceName, value: value.id });
                });
                self.leadSourceOptions = assumeArr;
              });
            });
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
          // if any issues throw the below error
          if (error.status == this.$API_SUCCESS) {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "No user available",
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
    //  Function to populate all lead allocation tracker
    fnAjaxRequestPopulateDeviceListData() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data.."
      });
      this.deviceTypeOptions = [];
      let self = this;
      // Calls action in store to get device types
      this.DEVICE_LIST_BASED_ON_LEAD_SOURCE(self.formData.leadSource.id)
        .then(response => {
          let assumeArr = [];
          // Function to framing device options
          let currentMappingElement = self.getDevicesBasedOnLeadSource.device;
          currentMappingElement.map(function(value, index) {
            assumeArr.push({ label: value.deviceName, value: value.id });
          });
          self.deviceTypeOptions = assumeArr;
          // Assingnment to disable == false select box
          self.isDeviceTypeSelectionDisabled = false;
          this.$q.loading.hide();
        })
        .catch(error => {
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
          this.$q.loading.hide();
        });
    },

    // Function to popluate state and city based on pincode
    fnPopulateStateCity(value) {
      this.formData.pincode = value.pincode;
      this.formData.state = value.stateName;
      this.formData.city = value.cityName;
    },

    //Function clear city and state when pincode is cleared
    fnClearStateCity() {
      this.formData.state = "";
      this.formData.city = "";
    },

    // Function to create new lead and allocate
    fnFinalSubmit(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Submitting data.."
        });
        this.UPDATE_SHORT_LEAD_SALES_INFO(formData)
          .then(response => {
            this.$q.loading.hide();
            this.$router.push("/sales/manager/lead/allocation/tracker");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully lead has been created and allocated!",
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
    },

    //Start >> Functions to populate ASM/TL/SO
    // function to populate ASM
    fnGetAllUsersByHidUidRSM(request) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data.."
      });
      this.assignToOptionsASM = [];
      this.assignToOptionsTL = [];
      this.assignToOptionsSO = [];
      let self = this;
      this.FETCH_USERS_BY_USER_ID(request)
        .then(response => {
          if (self.getAllUserByIdAndHierarchyIdData.length == 0) {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "No user available",
              icon: "info"
            });
          } else {
            let assumeArr = [];
            // Function to framing device options
            let currentMappingElement = self.getAllUserByIdAndHierarchyIdData;
            currentMappingElement.map(function(value, index) {
              assumeArr.push({ label: value.user.name, value: value });
            });
            self.assignToOptionsASM = assumeArr;
          }
          this.$q.loading.hide();
        })
        .catch(error => {
          // if any issues throw the below error
          if (error.status == this.$API_SUCCESS) {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "No user available",
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
          this.$q.loading.hide();
        });
    },
    // function to populate TL
    fnGetAllUsersByHidUidASM(request) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data.."
      });
      this.assignToOptionsTL = [];
      this.assignToOptionsSO = [];
      let self = this;
      this.FETCH_USERS_BY_USER_ID(request)
        .then(response => {
          if (self.getAllUserByIdAndHierarchyIdData.length == 0) {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "No user available",
              icon: "info"
            });
          } else {
            let assumeArr = [];
            // Function to framing device options
            let currentMappingElement = self.getAllUserByIdAndHierarchyIdData;
            currentMappingElement.map(function(value, index) {
              assumeArr.push({ label: value.user.name, value: value });
            });
            self.assignToOptionsTL = assumeArr;
          }
          this.$q.loading.hide();
        })
        .catch(error => {
          // if any issues throw the below error
          if (error.status == this.$API_SUCCESS) {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "No user available",
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
          this.$q.loading.hide();
        });
    },

    // function to populate SO
    fnGetAllUsersByHidUidTL(request) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data.."
      });
      this.assignToOptionsSO = [];
      let self = this;
      this.FETCH_USERS_BY_USER_ID(request)
        .then(response => {
          if (self.getAllUserByIdAndHierarchyIdData.length == 0) {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "No user available",
              icon: "info"
            });
          } else {
            let assumeArr = [];
            // Function to framing device options
            let currentMappingElement = self.getAllUserByIdAndHierarchyIdData;
            currentMappingElement.map(function(value, index) {
              assumeArr.push({ label: value.user.name, value: value.user.id });
            });
            self.assignToOptionsSO = assumeArr;
          }
          this.$q.loading.hide();
        })
        .catch(error => {
          // if any issues throw the below error
          if (error.status == this.$API_SUCCESS) {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "No user available",
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
          this.$q.loading.hide();
        });
    }
    //End >> Functions to populate ASM/TL/SO
  }
};
</script>

<style>
</style>
