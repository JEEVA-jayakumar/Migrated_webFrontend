<template>
  <div class="row">
    <div class="col-md-4" style="border-right: 1px solid #ccc;">
      <div class="q-ma-md">
        <div class="q-mb-md text-subtitle1">Region: {{computedUserRegion}}</div>
        <div>
          <q-card class="no-shadow">
            <q-card-section class="no-padding">
              <div class="text-body1">
                <strong>
                  <h6>Inventory with Region</h6>
                </strong>
              </div>
            </q-card-section>
            <q-separator />
            <div
              @click="loadDevicesTableData($REGIONAL_INVENTORY_ALL_DEVICES,{name:'Total Devices'})"
            >
              <q-card-section
                align="center"
                class="cursor-pointer bg-grey-5"
                :class="[activeItemId === $REGIONAL_INVENTORY_ALL_DEVICES ? 'shadow-5' : 'shadow-0']"
              >
                <div>Count</div>
                <div>
                  <big>{{fngetAllRegionalInventorySerialNumbersByDevice()}}</big>
                </div>
              </q-card-section>
            </div>
          </q-card>
        </div>
        <div class="row gutter-md">
          <div class="col-md-2">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Pending Allocation</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE,{name:'Pending Allocation'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllRegionalInventoryDeviceDetailsWithCount.
                      pendingDeviceCount.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-2">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Allocated Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_ALLOCATED_DEVICE,{name:'Allocated Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_ALLOCATED_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllRegionalInventoryDeviceDetailsWithCount.
                      allocatedCount.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-2">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Damaged Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_DAMAGED_DEVICE,{name:'Damaged Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_DAMAGED_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllRegionalInventoryDeviceDetailsWithCount.
                      damageDeviceCount.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-2">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Inbound Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_INBOUND_DEVICE,{name:'Inbound Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_INBOUND_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllRegionalInventoryDeviceDetailsWithCount.
                      inbountDeviceCount.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>

          <!-- <div
            class="col-md-6"
            v-for="(item,index) in getAllRegionalInventoryDeviceDetailsWithCount.inventryCount"
            :key="index"
          >
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">{{item.device.deviceName}}</div>
              </q-card-section>
              <q-separator />
              <div @click="loadDevicesTableData(index,item)">
                <q-card-section
                  align="center"
                  :style="'background:'+item.device.colorCode"
                  :class="[activeItemId === index ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>{{item.count}}</big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>-->
        </div>
      </div>
      <div class="q-ma-md">
        <div>
          <q-card class="no-shadow">
            <q-card-section class="no-padding">
              <div class="text-body1">
                <strong>
                  <h6>Inventory with SO</h6>
                </strong>
              </div>
            </q-card-section>
            <q-separator />
            <div
              @click="loadDevicesTableData($REGIONAL_INVENTORY_ALL_DEVICES,{name:'Total Devices'})"
            >
              <q-card-section
                align="center"
                class="cursor-pointer bg-grey-5"
                :class="[activeItemId === $REGIONAL_INVENTORY_ALL_DEVICES ? 'shadow-5' : 'shadow-0']"
              >
                <div>Count</div>
                <div>
                  <big>{{fngetAllSoInventorySerialNumbersByDevice()}}</big>
                </div>
              </q-card-section>
            </div>
          </q-card>
        </div>
        <div class="row gutter-md">
          <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Pending Allocation</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE,{name:'Pending Allocation'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllInventorywithsoDeviceDetailsWithCount.
                      pendingDeviceCountBillPartner.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-1">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Allocated Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_ALLOCATED_DEVICE,{name:'Allocated Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_ALLOCATED_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllInventorywithsoDeviceDetailsWithCount.
                      allocatedCountBillPartner.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-2">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Damaged Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_DAMAGED_DEVICE,{name:'Damaged Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_DAMAGED_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllInventorywithsoDeviceDetailsWithCount.
                      damageDeviceCountBillPartner.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-2">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Inbound Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_INBOUND_DEVICE,{name:'Inbound Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_INBOUND_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllInventorywithsoDeviceDetailsWithCount.
                      inbountDeviceCountBillPartner.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>

          <div
            class="col-md-2"
            v-for="(item,index) in getAllRegionalInventoryDeviceDetailsWithCount.inventryCount"
            :key="index"
          >
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">{{item.device.deviceName}}</div>
              </q-card-section>
              <q-separator />
              <div @click="loadDevicesTableData(index,item)">
                <q-card-section
                  align="center"
                  :style="'background:'+item.device.colorCode"
                  :class="[activeItemId === index ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>{{item.count}}</big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-2">
      <div class="row bottom-border q-pa-sm items-center">
        <div class="text-weight-regular">
          <!--STARTv-model: table title -->
          <div class="text-grey-9 text-subtitle1 q-py-sm">{{inventoryCountTableTitle}}</div>
          <!--END: table title -->
        </div>
      </div>
      <!--START: table lead validation -->
      <q-table
        title="Lead Validation"
        table-class="customTableClass"
        class="q-py-none"
        :rows="getAllRegionalInventorySerialNumbersByDevice"
        :columns="columnData"
        :filter="filter"
        :pagination="paginationControl"
        :loading="toggleAjaxLoadFilter"
        row-key="name"
      >
        <template v-slot:top="props" class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-8">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Search by device name, serial no"
              class="q-mr-lg q-py-sm"
            />
          </div>
        </template>
      </q-table>

      <!--END: table lead validation -->
    </div>
  </div>
</template>
<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  props: ["propMerchantTypeFromSO"],

  data() {
    return {
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsPerPage: 10
      },
      inventoryCountTableTitle: "Total Devices",
      toggleInventoryPrimaryComponent: false,
      showAddDeviceComponent: false,
      filter: "",

      activeItemId: false,
      multipleSelect: "",
      columnData: [
        {
          name: "device_type",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => row.device.deviceName,
          sortable: true
        },
        {
          name: "serialNumber",
          required: true,
          label: "Serial Number",
          align: "left",
          field: row => row.serialNumber,
          sortable: true
        }
      ]
    };
  },

  computed: {
    ...mapGetters("SAT_RegionalInventoryAllocation", [
      "getAllRegionalInventoryDeviceDetailsWithCount",
      "getAllRegionalInventorySerialNumbersByDevice",
      "getAllInventorywithsoDeviceDetailsWithCount"
    ]),
    computedUserRegion() {
      return JSON.parse(localStorage.getItem("u_i")).region.regionAreaName;
    }
  },

  created() {
    this.getAllInventorywithsoDeviceDetailsWithCount();
  },
  methods: {
    ...mapActions("SAT_RegionalInventoryAllocation", [
      "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE"
    ]),

    toggleRemarks(item) {
      item.showRemarks = !item.showRemarks;
    },

    // Function to get all device serial numbers
    fngetAllRegionalInventorySerialNumbersByDevice() {
      let totalDeviceCount = 0;
      let hashMapCook = this.getAllRegionalInventoryDeviceDetailsWithCount
        .inventryCount;
      hashMapCook.map(function(value, index) {
        totalDeviceCount = totalDeviceCount + value.count;
      });
      return totalDeviceCount;
    },
    fngetAllSoInventorySerialNumbersByDevice() {
      let totalDeviceCount = 0;
      let hashMapCook = this.getAllInventorywithsoDeviceDetailsWithCount
        .inventryCountBillPartner;
      hashMapCook.map(function(value, index) {
        totalDeviceCount = totalDeviceCount + value.count;
      });
      return totalDeviceCount;
    },

    // Function to show serial numbers based on device type
    loadDevicesTableData(itemIndex, item) {
      this.toggleAjaxLoadFilter = true;
      this.activeItemId = itemIndex;

      if (itemIndex == this.$REGIONAL_INVENTORY_ALL_DEVICES) {
        this.inventoryCountTableTitle = item.name;
        this.$emit("emittedForTotalSerialNumbers");
      } else if (itemIndex == this.$REGIONAL_INVENTORY_DAMAGED_DEVICE) {
        this.inventoryCountTableTitle = item.name;
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(this.$REGIONAL_INVENTORY_FILTER_ACTION_DAMAGED)
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else if (
        itemIndex == this.$REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE
      ) {
        this.inventoryCountTableTitle = item.name;
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(
            this.$REGIONAL_INVENTORY_FILTER_ACTION_PENDING_ALLOCATION
          )
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else if (itemIndex == this.$REGIONAL_INVENTORY_INBOUND_DEVICE) {
        this.inventoryCountTableTitle = item.name;
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(this.$REGIONAL_INVENTORY_INBOUND_DEVICE)
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else if (itemIndex == this.$REGIONAL_INVENTORY_INVENTORY_SO) {
        this.inventoryCountTableTitle = item.name;
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(this.$REGIONAL_INVENTORY_INVENTORY_SO)
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else if (itemIndex == this.$REGIONAL_INVENTORY_ALLOCATED_DEVICE) {
        this.inventoryCountTableTitle = item.name;
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(this.$REGIONAL_INVENTORY_ALLOCATED_DEVICE)
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else {
        this.inventoryCountTableTitle = item.device.deviceName;
        // TODO
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE,
          device: item.device.id
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      }
      this.toggleAjaxLoadFilter = false;
    }
  }
};
</script>
