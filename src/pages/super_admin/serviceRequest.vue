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
            <q-tab default name="serviceRequest" label="Service Request" slot="title" />
            <!-- <q-tab name="spareSo" label="Spare Parts So" slot="title" /> -->
            <q-tab name="issueTypes" label="Issue Types" slot="title" />
            <q-tab name="serviceStatus" label="Service Status" slot="title" />
            <q-tab name="cancelled" label="cancelled" slot="title" />
            <q-tab name="serviceResolutionRemarks" label="Service Resolution Remarks" slot="title" />
            <q-tab name="issueMapping" label="Issue Mapping" slot="title" />
            <q-tab name="csSubIssue" label="CS Sub Issue" slot="title" />
            <q-tab-pane name="serviceRequest">
              <serviceRequest/>
            </q-tab-pane>
            <q-tab-pane name="issueTypes">
              <issueTypes/>
            </q-tab-pane>
            <q-tab-pane name="serviceStatus">
              <serviceStatus/>
            </q-tab-pane>
            
            <q-tab-pane name="cancelled">
              <cancelled/>
            </q-tab-pane>
            <q-tab-pane name="serviceResolutionRemarks">
              <serviceResolutionRemarks/>
            </q-tab-pane>
            <q-tab-pane name="issueMapping">
              <issueMapping/>
            </q-tab-pane>
            <q-tab-pane name="csSubIssue">
              <csSubIssue/>
            </q-tab-pane>
          </q-tabs>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
 import serviceRequest from "../../components/super_admin/serviceRequest.vue";
 import issueTypes from "../../components/super_admin/issueTypes.vue";
 import serviceStatus from "../../components/super_admin/serviceStatus.vue";
 import cancelled from "../../components/super_admin/cancelled.vue";
 import serviceResolutionRemarks from "../../components/super_admin/serviceResolutionRemarks.vue";
 import issueMapping from "../../components/super_admin/issueMapping.vue";
 import csSubIssue from "../../components/super_admin/csSubIssue.vue";
// import inventoryCount from "../../components/sat/regionalInventory/inventoryCount.vue";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "inventoryAllocation",

  components: {
    serviceRequest,
    issueTypes,
    serviceStatus,
    cancelled,
    serviceResolutionRemarks,
    issueMapping,
    csSubIssue
  },

  data() {
    return {
      enableUploadInventoryBtn: true,
      toggleScanButton: true,
      inventoryOptionSelected: "serviceRequest"
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
