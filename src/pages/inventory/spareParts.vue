<template>
  <q-page>
    <div class="text-grey-9">
      <div class="row q-pa-sm items-center">
        <div class="col">
          <q-tabs
            no-pane-border
            v-model="inventoryOptionSelected"
            color="dark"
            inverted
            class="shadow-1"
          >
            <q-tab name="sparePartsInventory" label="Spare Parts Inventory" slot="title" />
             <q-tab name="sparePodList" label="Spare Pod List" slot="title" />
            
            <q-tab-pane name="sparePartsInventory">
              <sparePartsAddStocks
                @emittedForTotalSerialNumbers="
                  fnAjaxFetchAllDeviceDetailsWithCount
                "
              />
            </q-tab-pane>
            <q-tab-pane name="sparePodList">
              <sparePartsPodList
                @emittedForTotalSerialNumbers="
                  fnAjaxFetchAllDeviceDetailsWithCount
                "
              />
            </q-tab-pane>
          </q-tabs>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import sparePartsAddStocks from "../../pages/inventory/sparePartsAddStocks.vue";
import sparePartsPodList from "../../pages/inventory/sparePartsPodList.vue";


import { mapGetters, mapActions } from "vuex";
export default {
  name: "inventoryAllocation",

  components: {
    sparePartsAddStocks,
    sparePartsPodList,

  },

  data() {
    return {
      enableUploadInventoryBtn: true,
      toggleScanButton: true,
    inventoryOptionSelected: "sparePartsInventory"
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

  created() {
    this.fnAjaxFetchAllDeviceDetailsWithCount();
  },

  methods: {
    ...mapActions("SAT_RegionalInventoryAllocation", [
      "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
      "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
      "FETCH_INVENTORY_WITH_SO_DEVICE_DETAIL_WITH_COUNT"
    ]),
    ...mapActions("InventoryWithSo", ["FETCH_INVENTORY_WITH_SO"]),
    fnAjaxFetchAllDeviceDetailsWithCount() {
      this.toggleAjaxLoadFilter = true;
      this.FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(
        JSON.parse(localStorage.getItem("u_i")).region.id
      )
        // this.FETCH_INVENTORY_WITH_SO_DEVICE_DETAIL_WITH_COUNT(
        //   JSON.parse(localStorage.getItem("u_i")).region.id
        // )
        .then(() => {
          let requestParams = {
            region: JSON.parse(localStorage.getItem("u_i")).region.id,
            action: this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE
          };
          this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
          this.toggleAjaxLoadFilter = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter = false;
        });
    }
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
