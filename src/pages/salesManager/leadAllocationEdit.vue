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
                  v-model="formData.alternateContactNumber"
                  type="number"
                  float-label="Alternate Contact Number"
                  placeholder="Alternate Contact Number"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-input
                  type="email"
                  color="grey-9"
                
                  v-model="formData.email"
                  float-label="Email"
                  placeholder="Email"
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
                <!-- <q-select
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
                />-->
                <q-input
                  type="number"
                  :error="$v.formData.pincodeObj.$error"
                  clearable
                  @clear="fnClearStateCity"
                  color="grey-9"
                  v-model.trim="formData.pincodeObj"
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
                  color="grey-9"
                  @input="fnAjaxRequestPopulateDeviceListData"
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
              <div class="col-md-12 col-sm-12 col-xs-12">
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
              <div class="col-md-12 col-sm-12 col-xs-12">
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
              <!-- Show only for EQUITAS -->
                <div v-if="formData.leadSource && formData.leadSource.id == 9" class="col-md-12 col-sm-12 col-xs-12" >
                    <q-card flat bordered>
                      <q-card-section class="q-pa-none">
                        <table class="q-table full-width">
                          <thead class="bg-grey-3">
                            <tr>
                              <th style="padding:10px; color:black;">
                                <strong>Document Name</strong>
                              </th>
                              <th style="padding:10px; width:120px; color: black;" class="text-center">
                                <strong>Action</strong>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td >Business Proof Document</td>
                              <td class="text-center">
                                <q-btn
                                  v-for="file in formData.businessProof"
                                  :key="file"
                                  color="blue-grey-10"
                                  size="sm"
                                  class="q-mr-sm"
                                  label="View"
                                  @click="previewDocument(file)"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Merchant Agreement</td>
                              <td class="text-center">
                                <q-btn
                                  v-for="file in formData.merchantAgreement"
                                  :key="file"
                                  color="blue-grey-10"
                                  size="sm"
                                  class="q-mr-sm"
                                  label="View"
                                  @click="previewDocument(file)"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Bank Approval Letter</td>
                              <td class="text-center">
                                <q-btn
                                  v-for="file in formData.bankApprovalLetter"
                                  :key="file"
                                  color="blue-grey-10"
                                  size="sm"
                                  class="q-mr-sm"
                                  label="View"
                                  @click="previewDocument(file)"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </q-card-section>
                    </q-card>
                </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-4 col-xs-12 q-mt-sm q-mt-md-none" style="margin-top:-9px">
            <q-btn color="dark" @click="fnFinalSubmit(formData)" label="Assign" />
          </div>
        </div>
      </div>
    </div>
    <q-modal v-model="showPreviewDialog" minimized>
      <q-card style="max-width: 900px; width: 100%;">
          <q-card-title>
            <q-btn
              icon="close"
              flat
              round
              dense
              class="absolute-top-right q-ma-sm"  
              @click="showPreviewDialog = false"
            />
          </q-card-title>
        <q-card-separator />
        <q-card-main style="max-height: 70vh; overflow:auto;">
            <!-- IMAGE-->
            <viewer v-if="!isPdf" :images="[previewUrl]">
              <img :src="previewUrl" style="width:100%" />
            </viewer>
            <!-- PDF -->
            <iframe
              v-else
              :src="previewUrl"
              width="100%"
              height="600"
              frameborder="0"
            ></iframe>
        </q-card-main>
      </q-card>
    </q-modal>
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
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  // name: 'PageName',
  data() {
    return {
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
          value: 1,
        },
        {
          label: "Bar",
          value: 2,
        },
        {
          label: "Ipsum",
          value: 3,
        },
      ],
      leadSourceOptions: [],
      deviceTypeOptions: [],
      // populatedDocumentUrl: "",
      // showOpenPaymentChequeInfo: false,
      showPreviewDialog: false,
      isPdf: false,
      previewUrl: "",
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
          id: null,
        },
        leadSource: {
          id: null,
        },
        assignedTo: {
          id: null,
        },
        pincodeObj: null,
        pincode: null,
        businessProof: [],
        merchantAgreement: [],
        bankApprovalLetter: []
      },
    };
  },

  validations: {
    formData: {
      leadName: {
        required,
      },
      leadAddress: {
        required,
      },
      contactName: {
        required,
      },
      // email: {
      //   required,
      // },
      contactNumber: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(10),
      },
      latitude: {
        required,
      },
      longitude: {
        required,
      },
      city: {
        required,
      },
      deviceCount: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(100),
      },
      state: {
        required,
      },
      device: {
        id: {
          required,
        },
      },
      leadSource: {
        id: {
          required,
        },
      },
      assignedTo: {
        id: {
          required,
        },
      },
      pincodeObj: {
        required,
      },
    },
  },

  created() {
    this.fnAjaxRequestPopulateTrackerData();
  },

  computed: {
    ...mapGetters("DeviceListBasedOnLeadSource", [
      "getDevicesBasedOnLeadSource",
    ]),
    ...mapGetters("SalesManager_LeadAllocation", [
      "getAllUserByIdAndHierarchyIdData",
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"]),
    ...mapGetters("BankOpsShortLead", [
      "getSelectOptionsLeadSourceInfo",
      "getAllShortLeadInfoById",
    ]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    isEquitasSource() {
      return (
        this.formData.leadSource &&
        this.formData.leadSource.sourceName ===
          "LS_EQUITAS SMALL FINANCE BANK LIMITED"
      );
    },
    // documentRows() {
    //   const rules = this.leadInformation.merchantType.merchantDocumentType || [];
    //   const uploaded = this.leadInformation.leadDocuments || [];

    //   return rules
    //     .filter(r => r.active)
    //     .map(rule => {
    //       const docs = uploaded.filter(
    //         d => d.merchantDocumentType === rule.id
    //       );

    //       // flatten all uploaded files for this document
    //       const files = docs.flatMap(d => d.uploadedDocuments || []);

    //       return {
    //         name: rule.documentType,
    //         subName: rule.subDocumentType,
    //         files,                 // 👈 ARRAY OF FILES
    //         required: rule.required,
    //         viewType: rule.viewType
    //       };
    //     });
    // }
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_STATES_DATA",
      "FETCH_PINCODE_WITH_TERM",
    ]),
    ...mapActions("BankOpsShortLead", [
      "FETCH_ALL_LEAD_SOURCE_DATA",
      "FETCH_LEAD_DETAILS_IN_DETAIL",
    ]),
    ...mapActions("DeviceListBasedOnLeadSource", [
      "DEVICE_LIST_BASED_ON_LEAD_SOURCE",
    ]),
    ...mapActions("SalesManager_LeadAllocation", [
      "FETCH_USERS_BY_USER_ID",
      "UPDATE_SHORT_LEAD_SALES_INFO",
    ]),
    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function (oo) {
        return oo.label.toString().includes(terms.toLowerCase());
      });
    },
    /* Pincode search result */
    pincodeSearch(terms, done) {
      this.formData.cityName = "";
      this.formData.stateName = "";
      this.FETCH_PINCODE_WITH_TERM(terms)
        .then(() => {
          done(this.COMMON_FILTER_FUNCTION(this.getAllStatesData, terms));
        })
        .catch(() => {
          done([]);
        });
    },
    pincodeSelected(item) {
      this.formData.state = item.value.stateName;
      this.formData.city = item.value.cityName;
      this.formData.pincode = item.value.pincode;
      this.formData.pincodeObj = item.value.pincode;
    },
    /* Pincode search result */

    //  Function to populate all lead allocation tracker
    fnAjaxRequestPopulateTrackerData() {
      let self = this;
      this.FETCH_ALL_STATES_DATA();
      this.FETCH_LEAD_DETAILS_IN_DETAIL(this.$route.params.id)
        .then(() => {
          this.formData = {
            leadName: this.getAllShortLeadInfoById.assignedLeads.leadName,
            contactName: this.getAllShortLeadInfoById.assignedLeads.contactName,
            contactNumber: this.getAllShortLeadInfoById.assignedLeads
              .contactNumber,
            email: this.getAllShortLeadInfoById.assignedLeads.email,
            alternateContactNumber: this.getAllShortLeadInfoById.assignedLeads
              .alternateContactNumber,
            leadAddress: this.getAllShortLeadInfoById.assignedLeads.leadAddress,
            latitude: 13.458,
            longitude: 89.236,
            city: this.getAllShortLeadInfoById.assignedLeads.city,
            deviceCount: this.getAllShortLeadInfoById.assignedLeads.deviceCount,
            state: this.getAllShortLeadInfoById.assignedLeads.state,
            leadId: this.$route.params.id,
            device: {
              id: this.getAllShortLeadInfoById.assignedLeads.device.id,
            },
            leadSource: {
              id: this.getAllShortLeadInfoById.assignedLeads.leadSource.id,
            },
            assignedTo: {
              id:
                this.getAllShortLeadInfoById.assignedLeads.assignedTo == null
                  ? ""  
                  : this.getAllShortLeadInfoById.assignedLeads.assignedTo.id,
            },
            pincodeObj: this.getAllShortLeadInfoById.assignedLeads.pincode,
          };
          // ---- Populate extra document fields ----
          const lead = this.getAllShortLeadInfoById.assignedLeads;

          // 1️⃣ Business Proof Document  (Company Proof)
          let businessDoc = null;
          if (lead.leadDocuments && lead.leadDocuments.length) {
            businessDoc = lead.leadDocuments.find(function (d) {
              return d.documentType === "Company Proof";
            });
          }
          if (
            businessDoc &&
            businessDoc.uploadedDocuments &&
            businessDoc.uploadedDocuments.length
          ) {
            this.formData.businessProof =
              businessDoc.uploadedDocuments.map(u => u.fileName);
          } else {
            this.formData.businessProof = [];
          }
          // 2️⃣ Merchant Agreement (applicationFile)
          this.formData.merchantAgreement = lead.applicationFile ? [lead.applicationFile] : [];
          // 3️⃣ Bank Approval Letter (Others)
          let bankDoc = null;
          if (lead.leadDocuments && lead.leadDocuments.length) {
            bankDoc = lead.leadDocuments.find(function (d) {
              return d.documentType === "Others";
            });
          }

          if (bankDoc && bankDoc.uploadedDocuments && bankDoc.uploadedDocuments.length) {
            this.formData.bankApprovalLetter =
              bankDoc.uploadedDocuments.map(u => u.fileName);
          } else {
            this.formData.bankApprovalLetter = [];
          }
          this.FETCH_ALL_LEAD_SOURCE_DATA().then((response) => {
            let assumeArr = [];
            // Function to framing device options
            let currentMappingElement = self.getSelectOptionsLeadSourceInfo;
            currentMappingElement.map(function (value, index) {
              assumeArr.push({ label: value.sourceName, value: value.id });
            });
            self.leadSourceOptions = assumeArr;
          });
          this.fnAjaxRequestPopulateDeviceListData();

          // values of current user from local storage
          _.map(JSON.parse(localStorage.getItem("u_i")).roles, function (oo) {
            if (oo.hierarchyRoleLevel == self.$ROLE_HIERARCHY_SALES_ASM) {
              //populate TL
              let params = {
                user: {
                  id: JSON.parse(localStorage.getItem("u_i")).user.id,
                },
                hierarchy: {
                  id: oo.hierarchy.id,
                },
              };
              self.fnGetAllUsersByHidUidASM(params);
            } else if (
              oo.hierarchyRoleLevel == self.$ROLE_HIERARCHY_SALES_RSM
            ) {
              // populate ASM
              let params = {
                user: {
                  id: JSON.parse(localStorage.getItem("u_i")).user.id,
                },
                hierarchy: {
                  id: oo.hierarchy.id,
                },
              };
              self.fnGetAllUsersByHidUidRSM(params);
            } else {
              // populate RSM
              let params = {
                user: {
                  id: JSON.parse(localStorage.getItem("u_i")).user.id,
                },
                hierarchy: {
                  id: oo.hierarchy.id,
                },
              };
              self.fnGetAllUsersByHidUidNH(params);
            }
          });
        })
        .catch((error) => {
          // if any issues throw the below error
          self.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
            icon: "thumb_down",
          });
        });
    },
    //  Function to populate all lead allocation tracker
    fnAjaxRequestPopulateDeviceListData() {
      this.deviceTypeOptions = [];
      let self = this;
      // Calls action in store to get device types
      this.DEVICE_LIST_BASED_ON_LEAD_SOURCE(self.formData.leadSource.id)
        .then((response) => {
          let assumeArr = [];
          // Function to framing device options
          let currentMappingElement = self.getDevicesBasedOnLeadSource.device;
          currentMappingElement.map(function (value, index) {
            assumeArr.push({ label: value.deviceName, value: value.id });
          });
          self.deviceTypeOptions = assumeArr;
          // Assingnment to disable == false select box
          self.isDeviceTypeSelectionDisabled = false;
        })
        .catch((error) => {
          // if any issues throw the below error
          if (error.status == this.$API_SUCCESS) {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "No device type available",
              icon: "info",
            });
          } else {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down",
            });
          }
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
        this.UPDATE_SHORT_LEAD_SALES_INFO(formData)
          .then((response) => {
            this.$router.push("/sales/manager/lead/allocation/tracker");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully lead has been created and allocated!",
              icon: "thumb_up",
            });
          })
          .catch((error) => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down",
            });
          });
      }
    },

    //Start >> Functions to populate ASM/TL/SO
    // function to populate RSM
    fnGetAllUsersByHidUidNH(request) {
      this.assignToOptionsASM = [];
      this.assignToOptionsTL = [];
      this.assignToOptionsSO = [];
      let self = this;
      this.FETCH_USERS_BY_USER_ID(request).then((response) => {
        if (self.getAllUserByIdAndHierarchyIdData.length == 0) {
          this.$q.notify({
            color: "primary",
            position: "bottom",
            message: "No user available",
            icon: "info",
          });
        } else {
          let assumeArr = [];
          // Function to framing device options
          let currentMappingElement = self.getAllUserByIdAndHierarchyIdData;
          currentMappingElement.map(function (value, index) {
            assumeArr.push({ label: value.user.name, value: value });
          });
          self.assignToOptionsRSM = assumeArr;
          // Assingnment to disable == false select box
          // self.isDeviceTypeSelectionDisabled = false;
        }
      });
    },
    // function to populate ASM
    fnGetAllUsersByHidUidRSM(request) {
      this.assignToOptionsTL = [];
      this.assignToOptionsSO = [];
      let self = this;
      this.FETCH_USERS_BY_USER_ID(request).then((response) => {
        if (self.getAllUserByIdAndHierarchyIdData.length == 0) {
          this.$q.notify({
            color: "primary",
            position: "bottom",
            message: "No user available",
            icon: "info",
          });
        } else {
          let assumeArr = [];
          // Function to framing device options
          let currentMappingElement = self.getAllUserByIdAndHierarchyIdData;
          currentMappingElement.map(function (value, index) {
            assumeArr.push({ label: value.user.name, value: value });
          });
          self.assignToOptionsASM = assumeArr;
          // Assingnment to disable == false select box
          // self.isDeviceTypeSelectionDisabled = false;
        }
      });
    },
    // function to populate TL
    fnGetAllUsersByHidUidASM(request) {
      this.assignToOptionsTL = [];
      this.assignToOptionsSO = [];
      let self = this;
      this.FETCH_USERS_BY_USER_ID(request).then((response) => {
        if (self.getAllUserByIdAndHierarchyIdData.length == 0) {
          this.$q.notify({
            color: "primary",
            position: "bottom",
            message: "No user available",
            icon: "info",
          });
        } else {
          let assumeArr = [];
          // Function to framing device options
          let currentMappingElement = self.getAllUserByIdAndHierarchyIdData;
          currentMappingElement.map(function (value, index) {
            assumeArr.push({ label: value.user.name, value: value });
          });
          self.assignToOptionsTL = assumeArr;
        }
      });
    },

    // function to populate SO
    fnGetAllUsersByHidUidTL(request) {
      this.assignToOptionsSO = [];
      let self = this;
      this.FETCH_USERS_BY_USER_ID(request).then((response) => {
        if (self.getAllUserByIdAndHierarchyIdData.length == 0) {
          this.$q.notify({
            color: "primary",
            position: "bottom",
            message: "No user available",
            icon: "info",
          });
        } else {
          let assumeArr = [];
          // Function to framing device options
          let currentMappingElement = self.getAllUserByIdAndHierarchyIdData;
          currentMappingElement.map(function (value, index) {
            assumeArr.push({ label: value.user.name, value: value.user.id });
          });
          self.assignToOptionsSO = assumeArr;
        }
      });
    },
    //End >> Functions to populate ASM/TL/SO
    previewDocument(fileName) {
      if (!fileName) return;
      const url = this.GLOBAL_FILE_FETCH_URL + "/" + fileName;
      // detect pdf
      this.isPdf = fileName.toLowerCase().endsWith(".pdf");
      // set preview URL
      this.previewUrl = url;
      // open dialog
      this.showPreviewDialog = true;
    }
  },
};
</script>

<style>
</style>
