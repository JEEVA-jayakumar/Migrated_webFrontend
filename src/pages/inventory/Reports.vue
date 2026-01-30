<template>
    <q-page>
      <div class="text-grey-9">
        <div class="row bottom-border q-pa-sm items-center">
          <div class="col">
            <q-tabs
              no-pane-border
              v-model="inventoryOptionSelected"
              color="dark"
              inverted
              class="shadow-1"
            >
              <q-tab name="Replacement" label="Replacement/Recovery" slot="title" />
              <q-tab name="DeviceHistory" label="DeviceHistory" slot="title" />
              <q-tab name="DeviceFSE" label="Device With FSE/SO" slot="title" />
              <q-tab name="DeviceBP" label="Device With BP Regions" slot="title" />
              <q-tab name="InventorySummary" label="Inventory Summary" slot="title" />
            
  
              <q-tab-pane name="Replacement">
                <Replacement />
              </q-tab-pane>
              <q-tab-pane name="DeviceHistory">
                <DeviceHistory />
              </q-tab-pane>
              <q-tab-pane name="DeviceFSE">
                <DeviceFSE />
              </q-tab-pane>
              <q-tab-pane name="DeviceBP">
                <DeviceBP />
              </q-tab-pane>
              <q-tab-pane name="InventorySummary">
                <InventorySummary />
              </q-tab-pane>
            </q-tabs>
          </div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import Replacement from "../../pages/inventory/Replacement.vue";
  import DeviceHistory from "../../pages/inventory/DeviceHistory.vue";
  import DeviceFSE from "../../pages/inventory/DeviceFSE.vue";
  import DeviceBP from "../../pages/inventory/DeviceBP.vue";
  import InventorySummary from "../../pages/inventory/InventorySummary.vue";

  
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "inventoryAllocation",
  
    components: {
        Replacement,
        DeviceHistory,
        DeviceFSE,
        DeviceBP,
        InventorySummary
    },
  
    data() {
      return {
        enableUploadInventoryBtn: true,
        toggleScanButton: true,
        inventoryOptionSelected: "count"
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