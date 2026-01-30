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
            <!-- <q-btn outline no-caps class="text-weight-regular" label="Allocate to SO" to="PhonepeallocateToSo" /> -->
              <q-tab default name="Aggregatorspare" label="Spare Parts" slot="title" />
              <q-tab name="Aggregatorcount" label="Inventory Count" slot="title" />
              <q-tab name="AggregatorDispatch" label="Disptached Inventory" slot="title" />
              <q-tab name="AggregatorDamagedDevices" label="Add Damaged Devices" slot="title" />
              <!-- <q-tab name="AggregatorAllocateToSo" label="Aggregator Allocate To So" slot="title" /> -->
              <q-tab name="AggregatorAllocatetoso" label="Allocate to So" slot="title" />

              <q-tab name="AggregatorInventoryWithSo" label="Inventory With So" slot="title" />

              <q-tab name="AggregatorAllocateSotoso" label="Allocate SO to SO" slot="title" />
              <q-tab name="RequestSOList" label="REQUEST" slot="title" />
  
              <q-tab-pane name="Aggregatorspare">
                <AggregatorsInventoryspareParts/>
              </q-tab-pane>

              <q-tab-pane name="Aggregatorcount">
                <AggregatorinventoryCount  />
              </q-tab-pane>
  
              <q-tab-pane name="AggregatorDispatch">
                <AggregatorDispatchedInventory
                />
              </q-tab-pane>
              <q-tab-pane name="AggregatorDamagedDevices">
              <AggregatorshowAddDamagedDevices
                :propDeviceTypes="getAllRegionalInventoryDeviceDetailsWithCount"
              />
            </q-tab-pane>
  
              <q-tab-pane name="AggregatorAllocatetoso">
                <AggregatorInventoryallocatetoso />
              </q-tab-pane>
              <q-tab-pane name="AggregatorAllocateSotoso">
                <AggregatorSOtoso />
              </q-tab-pane>
              <q-tab-pane name="AggregatorInventoryWithSo">
                  <AggregatorInventoryWithSo />
              </q-tab-pane>
              <q-tab-pane name="RequestSOList">
                <AggregatorSODeviceReassigned />
              </q-tab-pane>
            </q-tabs>
          </div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import AggregatorsInventoryspareParts from "../../components/sat/AggregatorInventory/AggregatorsInventoryspareParts.vue";
  import AggregatorinventoryCount from "../../components/sat/AggregatorInventory/AggregatorinventoryCount.vue";
  import AggregatorDispatchedInventory from "../../components/sat/AggregatorInventory/AggregatorDispatchedInventory.vue";
  import AggregatorshowAddDamagedDevices from "../../components/sat/AggregatorshowAddDamagedDevices.vue";
  // import AggregatorAllocateToSo from "../../pages/inventory/PhonepeallocateToSo.vue";
  import AggregatorInventoryallocatetoso from "../../pages/sat/AggregatorInventoryallocatetoso.vue";
  import AggregatorSOtoso from "../../pages/sat/AggregatorSOtoso.vue";
  import AggregatorInventoryWithSo from "../../pages/sat/AggregatorInventoryWithSo.vue";
  import AggregatorSODeviceReassigned from "../../pages/sat/AggregatorSODeviceReassigned.vue";
  
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "inventoryAllocation",
  
    components: {
      AggregatorsInventoryspareParts,
        AggregatorinventoryCount,
    AggregatorDispatchedInventory,
    AggregatorshowAddDamagedDevices,
    AggregatorSOtoso,
    AggregatorSODeviceReassigned,
    // AggregatorAllocateToSo
    AggregatorInventoryWithSo,
      AggregatorInventoryallocatetoso,
    },
  
    data() {
      return {
        enableUploadInventoryBtn: true,
        toggleScanButton: true,
        inventoryOptionSelected: "Aggregatorcount"
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
  
    methods: {
      ...mapActions("SAT_RegionalInventoryAllocation", [
        "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
        "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
        "FETCH_INVENTORY_WITH_SO_DEVICE_DETAIL_WITH_COUNT"
      ]),
      ...mapActions("InventoryWithSo", ["FETCH_INVENTORY_WITH_SO"]),
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
