<template>
    <q-page>
      <div class="text-grey-9">
        <div class="row bottom-border q-pa-sm items-center">
          <div class="col">
            <q-tabs
              no-pane-border
              v-model="MarsApiOptionSelected"
              color="dark"
              inverted
              class="shadow-1"
            >
              <q-tab name="DeviceModelApiSync" label="DeviceModel" slot="title" />
              <q-tab name="CityApiSync" label="City" slot="title" />
              <q-tab name="RegionApiSync" label="Region" slot="title" />
              <q-tab name="RentalPlanApiSync" label="RentalPlan" slot="title" />
              <q-tab name="LeadFormApiSync" label="LeadForm" slot="title" />
              <q-tab name="StateApiSync" label="State" slot="title" />
            
  
              <q-tab-pane name="DeviceModelApiSync">
                <DeviceModelApiSync />
              </q-tab-pane>
              <q-tab-pane name="CityApiSync">
                <CityApiSync />
              </q-tab-pane>
              <q-tab-pane name="RegionApiSync">
                <RegionApiSync />
              </q-tab-pane>
              <q-tab-pane name="RentalPlanApiSync">
                <RentalPlanApiSync />
              </q-tab-pane>
              <q-tab-pane name="LeadFormApiSync">
                <LeadFormApiSync />
              </q-tab-pane>
              <q-tab-pane name="StateApiSync">
                <StateApiSync />
              </q-tab-pane>
            </q-tabs>
          </div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import DeviceModelApiSync from "../../pages/super_admin/DeviceModelApiSync.vue";
  import CityApiSync from "../../pages/super_admin/CityApiSync.vue";
  import RegionApiSync from "../../pages/super_admin/RegionApiSync.vue";
  import RentalPlanApiSync from "../../pages/super_admin/RentalPlanApiSync.vue";
  import LeadFormApiSync from "../../pages/super_admin/LeadFormApiSync.vue";
  import StateApiSync from "../../pages/super_admin/StateApiSync.vue";

  
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "marsApiSync",
  
    components: {
        DeviceModelApiSync,
        CityApiSync,
        RegionApiSync,
        RentalPlanApiSync,
        LeadFormApiSync,
        StateApiSync
    },
  
    data() {
      return {
        enableUploadInventoryBtn: true,
        toggleScanButton: true,
        MarsApiOptionSelected: "count"
      };
    },
  
    // computed: {
    //   ...mapGetters("SAT_RegionalInventoryAllocation", [
    //     "getAllRegionalInventoryDeviceDetailsWithCount",
    //     "getCurrentPODNumber",
    //     "getCurrentDeviceId",
    //     "getAllInventorywithsoDeviceDetailsWithCount"
    //   ]),
    //   ...mapGetters("InventoryWithSo", ["getAllInventoryWithSo"])
    // },
  
    // created() {
    //   this.fnAjaxFetchAllDeviceDetailsWithCount();
    // },
  
    methods: {
    //   ...mapActions("SAT_RegionalInventoryAllocation", [
    //     "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
    //     "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
    //     "FETCH_INVENTORY_WITH_SO_DEVICE_DETAIL_WITH_COUNT"
    //   ]),
    //   ...mapActions("InventoryWithSo", ["FETCH_INVENTORY_WITH_SO"]),
    //   fnAjaxFetchAllDeviceDetailsWithCount() {
    //     this.toggleAjaxLoadFilter = true;
    //     this.FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(
    //       JSON.parse(localStorage.getItem("u_i")).region.id
    //     )
    //       // this.FETCH_INVENTORY_WITH_SO_DEVICE_DETAIL_WITH_COUNT(
    //       //   JSON.parse(localStorage.getItem("u_i")).region.id
    //       // )
    //       .then(() => {
    //         let requestParams = {
    //           region: JSON.parse(localStorage.getItem("u_i")).region.id,
    //           action: this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE
    //         };
    //         this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
    //         this.toggleAjaxLoadFilter = false;
    //       })
    //       .catch(error => {
    //         this.toggleAjaxLoadFilter = false;
    //       });
    //   }
    }
  };
  </script>
  
  <style>
  .border-1 {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .border-2 {
    border: 3px solid rgba(48, 48, 48, 0.5);
  }
  </style>