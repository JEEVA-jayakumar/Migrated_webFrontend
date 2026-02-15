<template>
  <q-page>
    <!-- content -->
    <div>
      <!-- <pre>{{getCentralInventoryDashboardCount}}</pre> -->
      <!--START: table title -->
      <div class="row bottom-border q-px-md q-py-md items-center">
        <!--START: table title -->
        <div class="col-12 text-h6 text-weight-regular text-grey-9">Bijlipay Inventory Table</div>
        <!--END: table title -->
      </div>
      <!--END: table title -->
      <div class="row bottom-border q-ma-md q-py-md">
        <div class="col-12 text-weight-regular text-grey-9">Central Inventory</div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div v-if="inventoryData.centralItems.length > 0" class="row">
            <div
              class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
              v-for="(device,index) in inventoryData.centralItems"
              :key="index"
              :style="'border: 1px solid '+device.device.colorCode"
              align="center"
            >
              <div>
                <big :style="'color:'+device.device.colorCode">{{device.count}}</big>
              </div>
              <div>{{device.device.deviceName}}</div>
            </div>
          </div>
          <div v-else class="row group">
            <div>
              <q-banner color="primary" icon="info">No data available to display</q-banner>
            </div>
          </div>
        </div>
      </div>
      <div class="row bottom-border q-ma-md q-py-md group">
        <div class="col-12 text-weight-regular text-grey-9">Inventory with regions</div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div v-if="inventoryData.regionalItems.length > 0" class="row">
            <div
              class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
              
              @click="ajaxLoadDataForCentralInventoryByDeviceIdFilter(index,deviceInfo)"
              v-for="(deviceInfo,index) in inventoryData.regionalItems"
              :key="index"
              :style="'border: 1px solid '+deviceInfo.device.colorCode"
              align="center"
            >
              <div>
                <big :style="'color:'+deviceInfo.device.colorCode">{{deviceInfo.count}}</big>
              </div>
              <div>{{deviceInfo.device.deviceName}}</div>
            </div>
          </div>
          <div v-else class="row group">
            <q-banner color="primary" icon="info">No data available to display</q-banner>
          </div>
        </div>
        <div v-if="inventoryData.regionalItems.length > 0" class="col-md-6">
          <div>
            <!--STARTv-model: table Data -->
            <q-table
              :rows="getAllRegionalInventorySerialNumbersByDevice"
              :columns="columnData"
              table-class="customTableClass shadow-0"
              :filter="filterSearch"
              :pagination="paginationControl"
              row-key="index"
              :loading="tableAjaxLoading"
              color="primary"
            >
              <template v-slot:top="props">
                <!--START: table filter,search -->
                <div class="col-md-6">
                  <q-input
                    clearable
                    color="grey-9"
                    v-model="filterSearch"
                    placeholder="Type.."
                    float-label="Search .."
                    class="q-mr-lg q-py-sm"
                  />
                </div>

                <div class="col-md-6">
                  <!-- <q-input
                    clearable
                    color="grey-9"
                    v-model="filterSearch"
                    placeholder="Type.."
                    float-label="Search .."
                    class="q-mr-lg q-py-sm"
                  />-->
                  <downloadExcel
                    :rows="getAllRegionalInventorySerialNumbersByDevice"
                    :fields="json_fields"
                    name="Central Inventory Region.xls"
                  >
                    <q-btn outline color="grey-9" label="Download as excel" />
                  </downloadExcel>
                  <!-- @click="downloadReport" -->
                </div>
                <!--END: table filter,search -->
              </template>
            </q-table>
            <!--END: table Data -->
          </div>
        </div>
        <div class="col">
          <q-select
            v-model="inventoryData.region"
            color="grey-9"
            @input="filterInventoryCountByRegion"
            :options="inventoryData.regionFilterOptions"
            placeholder="Select"
            float-label="Filter By Region Wise"
          />
        </div>
      </div>
      <div class="row bottom-border q-ma-md q-py-md group">
        <div class="col-12 text-weight-regular text-grey-9">Inventory with SO</div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div v-if="inventoryData.billPartnerInventory.length > 0" class="row">
            <div
              class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
              v-for="(device,index) in inventoryData.billPartnerInventory"
              :key="index"
              :style="'border: 1px solid '+device.device.colorCode"
              align="center"
            >
              <div>
                <big :style="'color:'+device.device.colorCode">{{device.count}}</big>
              </div>
              <div>{{device.device.deviceName}}</div>
            </div>
          </div>
          <div v-else class="row group">
            <q-banner color="primary" icon="info">No data available to display</q-banner>
          </div>
        </div>
        <div class="col">
          <q-select
            filter
            clearable
            v-model="inventoryData.so"
            color="grey-9"
            :options="inventoryData.SOFilterOptions"
            placeholder="Select"
            float-label="Filter By SO Wise"
            @input="filterInventoryCountBySO"
          />
        </div>
      </div>
      <div class="row bottom-border q-mx-md q-py-md">
        <div class="col-12 text-weight-regular text-grey-9">Inventory with Resellar</div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div v-if="inventoryData.merchantItems.length > 0" class="row group">
            <div
              class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
              v-for="(device,index) in inventoryData.resellarItems"
              :key="index"
              :style="'border: 1px solid '+device.device.colorCode"
              align="center"
            >
              <div>
                <big :style="'color:'+device.device.colorCode">{{device.count}}</big>
              </div>
              <div>{{device.device.deviceName}}</div>
            </div>
          </div>
          <div v-else class="row group">
            <q-banner color="primary" icon="info">No data available to display</q-banner>
          </div>
        </div>
      </div>
      <div class="row bottom-border q-mx-md q-py-md">
        <div class="col-12 text-weight-regular text-grey-9">Inventory with Merchant</div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div v-if="inventoryData.merchantItems.length > 0" class="row group">
            <div
              class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
              v-for="(device,index) in inventoryData.merchantItems"
              :key="index"
              :style="'border: 1px solid '+device.device.colorCode"
              align="center"
            >
              <div>
                <big :style="'color:'+device.device.colorCode">{{device.count}}</big>
              </div>
              <div>{{device.device.deviceName}}</div>
            </div>
          </div>
          <div v-else class="row group">
            <q-banner color="primary" icon="info">No data available to display</q-banner>
          </div>
        </div>
      </div>
      <div class="row bottom-border q-mx-md q-py-md">
        <div class="col-12 text-weight-regular text-grey-9">Faulty Inventory</div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div v-if="inventoryData.faultyInventory.length > 0" class="row group">
            <div
              class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
              v-for="(device,index) in inventoryData.faultyInventory"
              :key="index"
              :style="'border: 1px solid '+device.device.colorCode"
              align="center"
            >
              <div>
                <big :style="'color:'+device.device.colorCode">{{device.count}}</big>
              </div>
              <div>{{device.device.deviceName}}</div>
            </div>
          </div>
          <div v-else class="row group">
            <q-banner color="primary" icon="info">No data available to display</q-banner>
          </div>
        </div>
      </div>
      <div class="row bottom-border q-mx-md q-py-md">
        <div class="col-12 text-weight-regular text-grey-9">Send to Repair</div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div v-if="inventoryData.sendtoRepair.length > 0" class="row group">
            <div
              class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
              v-for="(device,index) in inventoryData.sendtoRepair"
              :key="index"
              :style="'border: 1px solid '+device.device.colorCode"
              align="center"
            >
              <div>
                <big :style="'color:'+device.device.colorCode">{{device.count}}</big>
              </div>
              <div>{{device.device.deviceName}}</div>
            </div>
          </div>
          <div v-else class="row group">
            <q-banner color="primary" icon="info">No data available to display</q-banner>
          </div>
        </div>
      </div>
      <!--START: Open openAddBulkDeviceModelComp model -->
      <openAddBulkDeviceModelComp
        v-if="openBulkUploadModal"
        :propOpenBulkUploadModal="openBulkUploadModal"
        @closeModel="fnOpenBulkUploadModal"
      ></openAddBulkDeviceModelComp>
      <!--END: Open openAddBulkDeviceModelComp model -->
    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import downloadExcel from "vue-json-excel";
export default {
  components: {
    downloadExcel
  },
  name: "inventory",
  data() {
    return {
      devicedata:"",
       json_fields: {
        DeviceType: "device.deviceName",
        SerialNumber: "serialNumber"
      },
         activeItemId: 0,
       tableAjaxLoading: false,
       filterSearch: "",
          paginationControl: {
        rowsPerPage: 10
      },
            columnData: [
        {
          name: "serialNumber",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: "serialNumber",
          sortable: true
        }
      ],
      //Toggle bulk upload modal
      openBulkUploadModal: false,
      inventoryData: {
        region:"",
        so: "",
        regionFilterOptions: [],
        SOFilterOptions: [],

        regionalItems: [],

        billPartnerInventory: [],

        central: "",
        centralItems: [],

        merchant: "",
        merchantItems: [],
        resellarItems: [],
        faultyInventory: [],
        sendtoRepair: []
      }
    };
  },
  computed: {
      ...mapGetters("SAT_RegionalInventoryAllocation", ["getAllRegionalInventorySerialNumbersByDevice",
      ]),
    ...mapGetters("InventoryCentral", ["getCentralInventoryDashboardCount", "getAllInventoryDevicesData",
      "getAllInventoryDevicesTypesData",
      "getAllInventoryDevicesTypesWithCountData"]),
    ...mapGetters("SuperAdminUsers", ["getAllRegionsData", "getAllSOsData"]),
    ...mapGetters("SAT_RegionalInventoryAllocation", [
      "getAllRegionalInventoryDeviceDetailsWithCount",
      "getAllSoInventoryDeviceDetailsWithCount"
    ])
  },

  created() {
    this.getAllInventoryData();
    this.getAllSOData();
     this.fnAjaxPopulateAllDevicesList();
  },

  methods: {
    ...mapActions("InventoryCentral", [
      "FETCH_CENTRAL_INVENTORY_DASHBOARD_COUNT","FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE",
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA"
    ]),

    ...mapActions("SAT_RegionalInventoryAllocation", [
      "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
      "FETCH_SO_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
       "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE"
    ]),
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FETCH_ALL_SO_DATA"
    ]),
     ajaxLoadDataForCentralInventoryByDeviceIdFilter(itemIndex, deviceInfo) {
      this.activeItemId = itemIndex;
      this.fnAjaxPopulateAllDevicesList(deviceInfo);
    },
     fnAjaxPopulateAllDevicesList(deviceInfo) {
      this.tableAjaxLoading = false;
     
      let requestParams = {
          // TODO Please
          region: this.inventoryData.region,
          action: this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE,
          device: deviceInfo.device.id
        };
      this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
     
    },

    getAllInventoryData() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_CENTRAL_INVENTORY_DASHBOARD_COUNT().then(() => {
        this.inventoryData.centralItems = this.getCentralInventoryDashboardCount.centralInventory;
        this.inventoryData.merchantItems = this.getCentralInventoryDashboardCount.merchantInventory;
        this.inventoryData.regionalItems = this.getCentralInventoryDashboardCount.regionalInventory;
        this.inventoryData.billPartnerInventory = this.getCentralInventoryDashboardCount.billPartnerInventory;
        this.inventoryData.resellarItems = this.getCentralInventoryDashboardCount.resellerInventory;
        this.inventoryData.faultyInventory = this.getCentralInventoryDashboardCount.faultyInventory;
        this.inventoryData.sendtoRepair = this.getCentralInventoryDashboardCount.faultySentToRepair;
        this.FETCH_ALL_REGIONS_DATA()
          .then(() => {
            this.inventoryData.regionFilterOptions = this.getAllRegionsData;
            
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      });
    },
    getAllSOData() {
      this.FETCH_ALL_SO_DATA()
        .then(() => {
          this.inventoryData.SOFilterOptions = this.getAllSOsData;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
   
    filterInventoryCountByRegion(value) {
      this.inventoryData.regionalItems = [];
    
      this.FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(value)
        .then(() => {
        
          this.inventoryData.regionalItems = this.getAllRegionalInventoryDeviceDetailsWithCount.inventryCount;
          
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    filterInventoryCountBySO(value) {
      this.inventoryData.billPartnerInventory = [];
      this.FETCH_SO_INVENTORY_DEVICE_DETAIL_WITH_COUNT(value)
        .then(() => {
          this.inventoryData.billPartnerInventory = this.getAllSoInventoryDeviceDetailsWithCount.inventryCount;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    }
  }
};
</script>

<style>
</style>
