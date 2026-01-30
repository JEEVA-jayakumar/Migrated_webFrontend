<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-title q-pa-md text-weight-regular bottom-border">Existing Rental charge</div>
      <!-- START >> Setup MDR details -->
      <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
        <q-card style="width:100%">
          <q-card-separator />
          <q-card-main>
            <q-item>
              <q-item-main>
                <q-select
                  color="grey-9"
                  v-model="formData.leadSource"
                  :options="dropDown.leadSourceOptions"
                  float-label="Select lead source"
                  placeholder="Lead source"
                />
              </q-item-main>
              <!-- <q-item-side right>
                <q-btn
                  round
                  dense
                  no-caps
                  size="md"
                  @click="fnManageLeadSource"
                  color="purple-9"
                  icon="add"
                  class="no-margin"
                />
              </q-item-side>-->
            </q-item>
            <q-item>
              <q-item-main>
                <q-select
                  color="grey-9"
                  v-model="formData.device"
                  :options="dropDown.deviceOptions"
                  float-label="Select device"
                  placeholder="Device"
                />
              </q-item-main>
              <!-- <q-item-side right>
                <q-btn
                  round
                  dense
                  no-caps
                  size="md"
                  @click="fnManageDevice"
                  color="purple-9"
                  icon="add"
                  class="no-margin"
                />
              </q-item-side>-->
            </q-item>
            <q-item>
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.marsDevice"
                    :options="dropDown.marsDeviceOptions"
                    float-label="Mars Device Model"
                  />
                </q-item-main>
                <!-- <q-item-side right>
                  <q-btn round @click="fnManageDevice" size="sm" icon="add" color="purple-9" />
                </q-item-side>-->
              </q-item>
            <q-item>
              <q-item-main>
                <q-select
                  color="grey-9"
                  v-model="formData.plan"
                  :options="dropDown.planOptions"
                  float-label="Select plan"
                  placeholder="Plan"
                  @input="fnCategoryBasedRental(formData)"
                />
              </q-item-main>
              <!-- <q-item-side right>
                <q-btn
                  round
                  dense
                  no-caps
                  size="md"
                  @click="fnManagePlan"
                  color="purple-9"
                  icon="add"
                  class="no-margin"
                />
              </q-item-side>-->
            </q-item>
            <q-item>
              <q-item-main>
                <q-input
                  color="grey-9"
                  type="number"
                  v-model="formData.setupFees"
                  placeholder="Setup fee"
                  float-label="Enter Setup fee"
                />
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <div class="col">
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.monthlyFees"
                    placeholder="Recurring fee"
                    float-label="Enter recurring fee"
                  />
                </div>
              </q-item-main>
            </q-item>
          </q-card-main>
          <q-card-actions vertical align="end">
            <q-btn label="submit" @click="fnEditRentalPlan(formData)" color="purple-9" />
            <!-- <q-btn label="submit" @click="fnsubmit(formData)" color="purple-9" /> -->
          </q-card-actions>
        </q-card>
      </div>
      <!-- START >> Setup fee and recurring fee -->

      <!-- START >> Table >> rental charge details -->
      <!-- <div class="col-md-7 col-sm-8 col-xs-12">
        <q-table
          :data="tableData"
          table-class="customSATableClass"
          :columns="columns"
          :filter="filterSearch"
          :pagination.sync="paginationControl"
          :filter-method="myCustomSearchFilter"
          row-key="name"
          color="grey-9"
        >
          <q-td slot="body-cell-action" slot-scope="props" :props="props">
            <div class="row no-wrap no-padding">
              <q-btn
                dense
                no-caps
                no-wrap
                label="Modify"
                icon="far fa-plus-square"
                size="md"
                @click="fnShowEditPermission(props.row)"
                flat
                class="text-light-blue"
              ></q-btn>
              <q-btn
                dense
                no-caps
                no-wrap
                label="Disable"
                icon="far fa-minus-square"
                size="md"
                @click="fnDisablePermission(props.row.id)"
                flat
                class="text-negative"
              ></q-btn>
            </div>
          </q-td>

          <template slot="top" slot-scope="props">
      <!--START: table filter,search-->
      <!-- <div class="col">
              <q-search
                clearable
                color="grey-9"
                v-model="filterSearch"
                placeholder="Type.."
                float-label="Search by name, short name"
                class="q-mr-lg"
              />
            </div>
      <!--END: table filter,search-->
      <!-- </template>
        </q-table>
      </div>-->

      <!-- END >> Table >> MDR details -->

      <!--START: Show lead source -->
      <showLeadSourceModalComponent
        v-if="showLeadSourceModal"
        :propToggleModal="showLeadSourceModal"
        @emitToggleModal="fnManageLeadSource"
      ></showLeadSourceModalComponent>
      <!--END: Show lead source -->

      <!--START: Show device details -->
      <showDeviceDetailModalComponent
        v-if="showDeviceDetailModal"
        :propToggleModal="showDeviceDetailModal"
        @emitToggleModal="fnManageDevice"
      ></showDeviceDetailModalComponent>
      <!--END: Show device details-->

      <!--START: Show plan details -->
      <showPlanModalComponent
        v-if="showPlanDetailModal"
        :propToggleModal="showPlanDetailModal"
        @emitToggleModal="fnManagePlan"
      ></showPlanModalComponent>
      <!--END: Show plan details-->
    </div>
  </q-page>
</template>

<script>
/* START >> Modal components Lead source, device, merchant type */
import showLeadSourceModalComponent from "../../components/super_admin/showLeadSourceModalComponents.vue";
import showDeviceDetailModalComponent from "../../components/super_admin/showDeviceDetailModalComponents.vue";
import showPlanModalComponent from "../../components/super_admin/showPlanModalComponent.vue";
/* END >> Modal components Lead source, device, plan */

import { mapGetters, mapActions } from "vuex";
export default {
  name: "deviceTypes",
  components: {
    /* START >> Modal components Lead source, device, plan */
    showLeadSourceModalComponent,
    showDeviceDetailModalComponent,
    showPlanModalComponent
    /* END >> Modal components Lead source, device, plan */
  },
  data() {
    return {
      /* START >> Modal props */
      showLeadSourceModal: false,
      showDeviceDetailModal: false,
      showPlanDetailModal: false,
      activeLeadSourceList: [],
      activeDeviceList: [],

      /* END >> Modal props */

      /* START >> Rental charges */
      formData: {
        leadSource: "",
        device: "",
        marsDevice: "",
        plan: "",
        setupFees: "",
        monthlyFees: ""
      },
      dropDown: {
        deviceOptions: [],
        leadSourceOptions: [],
        marsDeviceOptions: [],
        planOptions: []
      },
      selectOptions: [
        {
          label: "Option 01",
          value: 1
        },
        {
          label: "Option 02",
          value: 2
        }
      ],
      /* END >>Table properties */

      /* START >>Table properties */
      filterSearch: "",
      paginationControl: {
        rowsPerPage: 5
      }
      /* END >>Table properties */

      /* START >>Table data */
      // columns: [
      //   {
      //     name: "leadSource",
      //     required: true,
      //     label: "Lead source",
      //     align: "left",
      //     field: "leadSource",
      //     sortable: true
      //   },
      //   {
      //     name: "device",
      //     required: true,
      //     label: "Device",
      //     align: "left",
      //     field: "device",
      //     sortable: true
      //   },
      //   {
      //     name: "merchant",
      //     required: true,
      //     label: "Merchant Type",
      //     align: "left",
      //     field: "merchant",
      //     sortable: true
      //   },
      //   {
      //     name: "action",
      //     required: true,
      //     label: "",
      //     align: "left",
      //     field: "action",
      //     sortable: true
      //   }
      // ],
      // tableData: [
      //   {
      //     leadSource: "AB",
      //     device: "mPOS",
      //     merchant: "Sandiwich Shop"
      //   },
      //   {
      //     leadSource: "IB",
      //     device: "mPOS",
      //     merchant: "Burger Shop"
      //   }
      // ]
      /* END >>Table data */
    };
  },

  created() {
    /* START: Load user table data filter > DeviceTypes */
    this.ajaxLoadDataForDeviceTypeTable();
    this.marsDeviceModelDatasLoading();
    /* End: Load user table data filter > DeviceTypes */
  },
  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo","getMarsDeviceModel"]),
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("merchantTypes", ["getActiveMerchantTypes"]),
    ...mapGetters("plan", ["getActivePlan"]),
    ...mapGetters("categoryBasedRental", ["categoryBasedRental"])
  },

  methods: {
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA","FETCH_MARS_DEVICE_MODEL"]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("plan", ["PLAN_ACTIVE_LIST"]),
    ...mapActions("RentalPlan", ["RENTAL_PLAN"]),
    ...mapActions("categoryBasedRental", [
      "CATEGORY_BASED_RENTAL_PLAN",
      "EDIT_RENTAL_PLAN"
    ]),
    marsDeviceModelDatasLoading(){
      let self = this;
      self.FETCH_MARS_DEVICE_MODEL()
          .then(() => {
            return _.map(self.getMarsDeviceModel, item => {
              console.log("GETTING API ITEM VALUES OF PLAN--------->"+JSON.stringify(item))
              item.map(oo => {
                console.log("mapping mars device options : " + oo.code + ", name : " + oo.name)
                self.dropDown.marsDeviceOptions.push({ 
                  label: oo.name, 
                  value: oo.code 
                });
              });
            });
          });
          
    },
    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self
        .FETCH_DEVICES_DATA()
        .then(() => {
          return _.map(self.getAllDevicesInfo, item => {
            self.dropDown.deviceOptions.push({
              value: item.id,
              label: item.deviceName
            });
          });
        })
        .then(() => {
          self.LEAD_SOURCE_ACTIVE_LIST().then(() => {
            return _.map(self.getActiveLeadSource, item => {
              self.dropDown.leadSourceOptions.push({
                value: item.id,
                label: item.sourceName
              });
            });
          });
        })
        .then(() => {
          self.PLAN_ACTIVE_LIST().then(() => {
            return _.map(self.getActivePlan, item => {
              self.dropDown.planOptions.push({
                value: item.id,
                label: item.planName
              });
            });
          });
        });
    },
    fnCategoryBasedRental(request) {
      let formData = {
        leadSource: request.leadSource,
        device: request.device,
        plan: request.plan
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then(response => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.monthlyFees = self.categoryBasedRental.monthlyFees;
        } else if (response.data == null) {
          this.formData.setupFees = 0;
          this.formData.monthlyFees = 0;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear"
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
    // fnsubmit(request) {
    //   let requestParams = {
    //     url: {
    //       leadSource: request.leadSource,
    //       device: request.device,
    //       plan: request.plan
    //     },
    //     params: {
    //       setupFees: request.setupFees,
    //       monthlyFees: request.monthlyFees
    //     }
    //   };
    //   this.RENTAL_PLAN(requestParams)
    //     .then(response => {
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "data",
    //         icon: "thumb_up",
    //         message: response.data.message
    //       });
    //       var self = this;
    //       Object.keys(this.formData).forEach(function(key, index) {
    //         self.formData[key] = "";
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         icon: "thumb_up",
    //         message: error.data.message
    //       });
    //       var self = this;
    //       Object.keys(this.formData).forEach(function(key, index) {
    //         self.formData[key] = "";
    //       });
    //     });
    // },
    fnEditRentalPlan(request) {
      let requestParams = {
        id: this.categoryBasedRental.id,
        setupFees: request.setupFees,
        monthlyFees: request.monthlyFees
      };
      this.EDIT_RENTAL_PLAN(requestParams)
        .then(response => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: response.data.message
          });
          var self = this;
          Object.keys(this.formData).forEach(function(key, index) {
            self.formData[key] = "";
          });
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            color: "positive",
            position: "bottom",
            icon: "thumb_up",
            message: error.data.message
          });
          var self = this;
          Object.keys(this.formData).forEach(function(key, index) {
            self.formData[key] = "";
          });
        });
    },

    /* START >> Manage lead source, device, merchant type */
    fnManageLeadSource() {
      this.showLeadSourceModal = !this.showLeadSourceModal;
    },
    activeDevice() {
      this.FETCH_DEVICES_DATA().then(() => {
        this.activeDeviceList = this.getAllDevicesInfo;
      });
    },
    fnManageDevice(token) {
      this.showDeviceDetailModal = !this.showDeviceDetailModal;
      if (token == "refresh") {
        this.activeDevice();
      }
    },
    activePincode() {
      this.PLAN_ACTIVE_LIST().then(() => {
        this.activeLeadSourceList = this.getActivePlan;
      });
    },
    fnManagePlan(token) {
      this.showPlanDetailModal = !this.showPlanDetailModal;
      if (token == "refresh") {
        this.activePincode();
      }
    }
    // leadSourceCreate(token) {
    //   this.propShowCreateLeadSource = !this.propShowCreateLeadSource;
    //   if (token == "refresh") {
    //     this.leadSourceActiveList();
    //   }
  },

  /* END >> Manage lead source, device, merchant type */

  /* START >> Manage MDR charges */
  fnShowEditPermission() {},
  fnDisablePermission() {},
  /* END >> Manage MDR charges */

  myCustomSearchFilter(rows, terms, cols, cellValue) {
    const lowerTerms = terms ? terms.toLowerCase() : "";
    return rows.filter(row =>
      cols.some(
        col =>
          (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
      )
    );
  }
};
</script>

<style>
</style>
