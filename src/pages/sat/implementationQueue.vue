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
            <q-tab default name="internal" label="Bijlipay Implementation Queue" slot="title" />
            <!-- <q-tab name="spareSo" label="Spare Parts So" slot="title" /> -->
            <q-tab name="external" label="Aggregator Implementation Queue" slot="title" />
           
           
            <q-tab-pane name="internal">
              <internalimplementationRequest/>
            </q-tab-pane>
           
            <q-tab-pane name="external">
              <externalimplementationRequest/>
            </q-tab-pane>
          </q-tabs>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
 import internalimplementationRequest from "../../components/sat/internalimplementationRequest.vue";
 import externalimplementationRequest from "../../components/sat/externalimplementationRequest.vue";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "inventoryAllocation",

  components: {
    internalimplementationRequest,
    externalimplementationRequest
    
  },

  data() {
    return {
      enableUploadInventoryBtn: true,
      toggleScanButton: true,
      inventoryOptionSelected: "implementationQueue"
    };
  },

//   computed: {
//     ...mapGetters("SAT_RegionalInventoryAllocation", [
//       "getAllRegionalInventoryDeviceDetailsWithCount",
//       "getCurrentPODNumber",
//       "getCurrentDeviceId",
//       "getAllInventorywithsoDeviceDetailsWithCount"
//     ]),
//     ...mapGetters("InventoryWithSo", ["getAllInventoryWithSo"])
//   },

//   created() {
//     this.fnAjaxFetchAllDeviceDetailsWithCount();
//   },

//   methods: {
//     ...mapActions("SAT_RegionalInventoryAllocation", [
//       "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
//       "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
//       "FETCH_INVENTORY_WITH_SO_DEVICE_DETAIL_WITH_COUNT"
//     ]),
//     ...mapActions("InventoryWithSo", ["FETCH_INVENTORY_WITH_SO"]),
//     // fnAjaxFetchAllDeviceDetailsWithCount() {
//     //   this.toggleAjaxLoadFilter = true;
//     //   this.FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(
//     //     JSON.parse(localStorage.getItem("u_i")).region.id
//     //   )
//     //     // this.FETCH_INVENTORY_WITH_SO_DEVICE_DETAIL_WITH_COUNT(
//     //     //   JSON.parse(localStorage.getItem("u_i")).region.id
//     //     // )
//     //     .then(() => {
//     //       let requestParams = {
//     //         region: JSON.parse(localStorage.getItem("u_i")).region.id,
//     //         action: this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE
//     //       };
//     //       this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
//     //       this.toggleAjaxLoadFilter = false;
//     //     })
//     //     .catch(error => {
//     //       this.toggleAjaxLoadFilter = false;
//     //     });
//     // }
//   }
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
