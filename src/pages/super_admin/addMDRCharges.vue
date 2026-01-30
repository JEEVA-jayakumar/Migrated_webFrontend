<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-title q-pa-md text-weight-regular bottom-border">Add MDR details</div>
      <!-- START >> Setup MDR details -->
      <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
        <q-card style="width:100%">
          <q-card-main>
            <q-list no-border>
              <q-item>
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.leadSource"
                    :options="dropDown.leadSourceOptions"
                    float-label="Select lead source"
                  />
                </q-item-main>
                <q-item-side right>
                  <q-btn round @click="fnManageLeadSource" size="sm" icon="add" color="purple-9" />
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.device"
                    :options="dropDown.deviceOptions"
                    float-label="Select device"
                  />
                </q-item-main>
                <q-item-side right>
                  <q-btn round @click="fnManageDevice" size="sm" icon="add" color="purple-9" />
                </q-item-side>
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
                    v-model="formData.merchantType"
                    :options="dropDown.merchantTypesOptions"
                    float-label="Select merchant category type"
                    @input="fnCategoryBasedMdr(formData)"
                  />
                </q-item-main>
                <!-- <q-item-side right>
                  <q-btn round @click="fnManageMerchantType" size="sm" icon="add" color="purple-9"/>
                </q-item-side>-->
              </q-item>
               
              <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.debitLessthanAmount"
                    placeholder="Debit <= 2000 %"
                    float-label="Debit <= 2000 %"
                  />
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.debitGreaterthanAmount"
                    float-label="Debit > 2000 %"
                    placeholder="Debit > 2000 %"
                  />
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.stdCC"
                    float-label="Std CC %"
                    placeholder="Std CC %"
                  />
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.premiumCC"
                    float-label="Premium CC %"
                    placeholder="Premium CC %"
                  />
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.corpCC"
                    float-label="Corp Pre CC %"
                    placeholder="Corp Pre CC %"
                  />
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.intlCC"
                    float-label="Intl Pre CC %"
                    placeholder="Intl Pre CC %"
                  />
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="number"
                    v-model="formData.superPremiumlCC"
                    float-label="Super Pre CC %"
                    placeholder="Super Pre CC %"
                  />
                </q-item-main>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-actions vertical align="end">
            <!-- <q-btn label="EXSITING MDR PLAN" @click="fnEditMdrPlan(formData)" color="purple-9" /> -->
            <q-btn label="submit" @click="fnsubmit(formData)" color="purple-9" />
          </q-card-actions>
        </q-card>
      </div>
      <!-- END >> Setup MDR details -->
      <!-- START >> Table >> MDR details -->
      <div class="col-md-7 col-sm-8 col-xs-12">
        <!-- <q-table
          :data="tableData"
          table-class="customSATableClass"
          :columns="columns"
          :filter="filterSearch"
          :pagination.sync="paginationControl"
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
        <--START: table filter,search-->
        <!-- <div class="col"> -->
        <!-- <q-search
                clearable
                color="grey-9"
                v-model="filterSearch"
                placeholder="Type.."
                float-label="Search by name, short name"
        class="q-mr-lg"-->
        <!-- /> -->
        <!-- </div> -->
        <!--END: table filter,search -->
        <!-- </template> -->
        <!-- </q-table> -->
        <!-- -->
      </div>
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
      <!--START: Show lead source -->
      <showMerchantModalComponent
        v-if="showMerchantModal"
        :propToggleModal="showMerchantModal"
        @emitToggleModal="fnManageMerchantType"
      ></showMerchantModalComponent>
      <!--END: Show lead source -->
    </div>
  </q-page>
</template>

<script>
/* START >> Modal components Lead source, device, merchant type */
import showLeadSourceModalComponent from "../../components/super_admin/showLeadSourceModalComponents.vue";
import showDeviceDetailModalComponent from "../../components/super_admin/showDeviceDetailModalComponents.vue";
import showMerchantModalComponent from "../../components/super_admin/merchantTypes.vue";
/* END >> Modal components Lead source, device, merchant type */

import { mapGetters, mapActions } from "vuex";
export default {
  name: "MDRdetails",
  components: {
    /* START >> Modal components Lead source, device, merchant type */
    showLeadSourceModalComponent,
    showDeviceDetailModalComponent,
    showMerchantModalComponent
    /* END >> Modal components Lead source, device, merchant type */
  },
  data() {
    return {
      /* START >> Modal props */
      showLeadSourceModal: false,
      showDeviceDetailModal: false,
      showMerchantModal: false,
      /* END >> Modal props */

      /* START >> Rental charges */
      formData: {
        leadSource: "",
        device: "",
        marsDevice:"",
        merchantType: "",
        
        debitLessthanAmount: "",
        debitGreaterthanAmount: "",
        stdCC: "",
        premiumCC: "",
        corpCC: "",
        intlCC: "",
        superPremiumlCC: ""
      },
      dropDown: {
        deviceOptions: [],
        leadSourceOptions: [],
        marsDeviceOptions: [],
        merchantTypesOptions: []
      },
      /* END >> Rental charges */

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
    ...mapGetters("merchantCategory", ["getActiveMerchantCategory"]),
    ...mapGetters("CategoryBasedMdr", ["categoryBasedMdr"])
  },

  methods: {
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA","FETCH_MARS_DEVICE_MODEL"]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("merchantCategory", ["MERCHANT_CATEGORY_ACTIVE_LIST"]),
    ...mapActions("MdrPlan", ["MDR_PLAN"]),
    ...mapActions("CategoryBasedMdr", [
      "CATEGORY_BASED_MDR_PLAN",
      "EDIT_MDR_PLAN"
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

    /* START >> Fetch table data for MDR charges */
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
          self.MERCHANT_CATEGORY_ACTIVE_LIST().then(() => {
            return _.map(self.getActiveMerchantCategory, item => {
              self.dropDown.merchantTypesOptions.push({
                value: item.id,
                label: item.merchantCategoryName
              });
            });
          });
        });
    },
    fnsubmit(request) {
     console.log("FN SUBMIT MDR")
      let requestParams = {
        url: {
          leadSource: request.leadSource,
          device: request.device,
          merchantType: request.merchantType
        },
        params: {
          debitLessthanAmount: request.debitLessthanAmount,
          debitGreaterthanAmount: request.debitGreaterthanAmount,
          stdCC: request.stdCC,
          premiumCC: request.premiumCC,
          corpCC: request.corpCC,
          intlCC: request.intlCC,
          superPremiumlCC: request.superPremiumlCC
        }
      };

      this.MDR_PLAN(requestParams)
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
    // fnEditMdrPlan(request) {
    //   let requestParams = {
    //     id: this.categoryBasedMdr.id,
    //     debitLessthanAmount: request.debitLessthanAmount,
    //     debitGreaterthanAmount: request.debitGreaterthanAmount,
    //     stdCC: request.stdCC,
    //     premiumCC: request.premiumCC,
    //     corpCC: request.corpCC,
    //     intlCC: request.intlCC,
    //     superPremiumlCC: request.superPremiumlCC
    //   };
    //   this.EDIT_MDR_PLAN(requestParams)
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

    // fnCategoryBasedMdr(request) {
    //   let formData = {
    //     leadSource: request.leadSource,
    //     device: request.device,
    //     merchantType: request.merchantType
    //   };
    //   let self = this;
    //   self.CATEGORY_BASED_MDR_PLAN(formData).then(response => {
    //     if (response.status == 200) {
    //       this.formData.debitLessthanAmount =
    //         self.categoryBasedMdr.debitLessthanAmount;
    //       this.formData.debitGreaterthanAmount =
    //         self.categoryBasedMdr.debitGreaterthanAmount;
    //       this.formData.stdCC = self.categoryBasedMdr.stdCC;
    //       this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
    //       this.formData.corpCC = self.categoryBasedMdr.corpCC;
    //       this.formData.intlCC = self.categoryBasedMdr.intlCC;
    //       this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
    //     } else {
    //       this.$q.notify({
    //         color: "negative",
    //         position: "bottom-left",
    //         message: "Invalid IFSC code",
    //         icon: "clear"
    //       });
    //       this.formData.debitLessthanAmount = "";
    //       this.formData.debitGreaterthanAmount = "";
    //       this.formData.stdCC = "";
    //       this.formData.premiumCC = "";
    //       this.formData.corpCC = "";
    //       this.formData.intlCC = "";
    //       this.formData.superPremiumlCC = "";
    //     }
    //   });
    // },
    /* END >> Fetch table data for MDR charges */

    /* START >> Manage lead source, device, merchant type */
    fnManageLeadSource() {
      this.showLeadSourceModal = !this.showLeadSourceModal;
    },
    fnManageDevice() {
      this.showDeviceDetailModal = !this.showDeviceDetailModal;
    },
    fnManageMerchantType() {
      this.showMerchantModal = !this.showMerchantModal;
    },
    /* END >> Manage lead source, device, merchant type */

    /* START >> Manage MDR charges */
    fnShowEditPermission() {},
    fnDisablePermission() {}
    /* END >> Manage MDR charges */
  }
};
</script>

<style>
</style>
