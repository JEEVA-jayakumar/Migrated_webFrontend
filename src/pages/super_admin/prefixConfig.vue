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
              <q-tab name="prefix" label="Prfix Config" slot="title" />
              <!-- <q-tab name="Socount" label="Inventory So Count" slot="title" /> -->
              <q-tab name="vasDevLs" label="LeadSource And Vas Device Config" slot="title" />
  
              <!-- <q-tab-pane name="count">
                <inventoryCount @emittedForTotalSerialNumbers="fnAjaxFetchAllDeviceDetailsWithCount" />
              </q-tab-pane>
  
              <q-tab-pane name="Socount">
                <inventoryCount @emittedForTotalSerialNumbers="fnAjaxFetchAllDeviceDetailsWithCount" />
              </q-tab-pane>
  
              <q-tab-pane name="dispatch">
                <dispatchedInventory
                  @fetchDeviceDetailsWithCount="fnAjaxFetchAllDeviceDetailsWithCount"
                />
              </q-tab-pane>
              <q-tab-pane name="damage">
                <showAddDamagedDevices
                  :propDeviceTypes="getAllRegionalInventoryDeviceDetailsWithCount"
                />
              </q-tab-pane> -->
              <q-tab-pane name="prefix">
                <prefix />
              </q-tab-pane>
              <q-tab-pane name="vasDevLs">
                <vasDevLs />
              </q-tab-pane>
<!--   
              <q-tab-pane name="allocatetoso">
                <inventoryallocatetoso />
              </q-tab-pane>
  
              <q-tab-pane name="inventorywithSo">
                <inventorywithso />
              </q-tab-pane>
  
              <q-tab-pane name="inventorywithResellar">
                <inventorywithResellar />
              </q-tab-pane>
              <q-tab-pane name="inventorywithResellarDetails">
                <inventorywithResellarDetails />
              </q-tab-pane> -->
            </q-tabs>
          </div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import prefix from "../../components/super_admin/prefixConfig.vue";
  import vasDevLs from "../../components/super_admin/leadSourceVasDeviceConfig.vue";
//   import inventoryCount from "../../components/sat/regionalInventory/inventoryCount.vue";
//   import dispatchedInventory from "../../components/sat/regionalInventory/dispatchedInventory.vue";
//   import showAddDamagedDevices from "../../components/sat/showAddDamagedDevices.vue";
//   import inventorywithso from "../../components/inventory/inventorywithso.vue";
//   import inventoryallocatetoso from "../../pages/sat/allocateSo.vue";
//   // import inventoryFaulty from "../../pages/sat/satFaulty.vue";
//   import inventorySOCount from "../../components/sat/regionalInventory/SOinventoryCount.vue";
//   import inventorywithResellar from "../../pages/inventory/inventorywithsellar.vue";
//   import inventorywithResellarDetails from "../../pages/inventory/inventorywithresellar.vue";
  
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "inventoryAllocation",
  
    components: {
        prefix,
        vasDevLs
    //   inventoryCount,
    //   showAddDamagedDevices,
    //   dispatchedInventory,
    //   inventorywithso,
    //   // inventoryFaulty,
    //   inventoryallocatetoso,
    //   inventorywithResellar,
    //   inventorywithResellarDetails
    },
  
    data() {
      return {
        enableUploadInventoryBtn: true,
        toggleScanButton: true,
        inventoryOptionSelected: "count"
      };
    },
  
    computed: {
      ...mapGetters("SAT_RegionalInventoryAllocation", [
        "getAllRegionalInventoryDeviceDetailsWithCount",
        "getCurrentPODNumber",
        "getCurrentDeviceId",
        "getAllInventorywithsoDeviceDetailsWithCount"
      ]),
      ...mapGetters("InventoryWithSo", ["getAllInventoryWithSo"])
    },
  
    // created() {
    //   this.fnAjaxFetchAllDeviceDetailsWithCount();
    // },
  
    methods: {
      ...mapActions("SAT_RegionalInventoryAllocation", [
        "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
        "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
        "FETCH_INVENTORY_WITH_SO_DEVICE_DETAIL_WITH_COUNT"
      ]),
      ...mapActions("InventoryWithSo", ["FETCH_INVENTORY_WITH_SO"]),
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