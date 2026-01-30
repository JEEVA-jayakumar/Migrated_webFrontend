<template>
    <q-page>
      <!-- content -->
      <div>
        <!--START: table title -->
        <div class="row bottom-border q-px-md q-py-md items-center">
          <!--START: table title -->
          <div class="col-12 q-title text-weight-regular text-grey-9">Mobikwik Inventory Table</div>
          <!--END: table title -->
        </div>
        <!--END: table title -->
  
        <!-- AGGREGATORS LST-->
  
        <!-- <div class="row bottom-border q-px-md q-py-sm items-center">
          <div class="col-md-4">
            <q-select color="grey-9" v-model="aggregator" float-label="Select Aggregator" radio
              :options="aggregatorOptions" @input="selectedAggregators" /> 
          </div>
        </div> -->
  
        <!-- AGGREGATORS LST  @input="selectedAggregators"-->
        <div class="row bottom-border q-ma-md q-py-md">
          <div class="col-12 text-weight-regular text-grey-9">Central Inventory</div>
          <div class="col-md-9 col-sm-12 col-xs-12">
            
            <div v-if="inventoryData.centralItems.length > 0" class="row">
              <div class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md" v-for="(device, index) in inventoryData.centralItems"
                :key="index" :style="'border: 1px solid ' + device.aggregatorDevice.colorCode" align="center">
                <div>
                  <big :style="'color:' + device.aggregatorDevice.colorCode">{{ device.count }}</big>
                </div>
                <div>{{ device.aggregatorDevice.deviceName }}</div>
              </div>
            </div>
            <div v-else class="row group">
              <div>
                <q-alert color="primary" icon="info">No data available to display</q-alert>
              </div>
            </div>
          </div>
        </div>
        <div class="row bottom-border q-ma-md q-py-md group">
          <div class="col-12 text-weight-regular text-grey-9">Inventory with regions</div>
          <div class="col-md-9 col-sm-12 col-xs-12">
            <div v-if="inventoryData.regionalItems.length > 0" class="row">
              <div class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
                @click="ajaxLoadDataForCentralInventoryByDeviceIdFilter(index, deviceInfo)"
                v-for="(deviceInfo, index) in inventoryData.regionalItems" :key="index"
                :style="'border: 1px solid ' + deviceInfo.aggregatorDevice.colorCode" align="center">
                <div>
                  <big :style="'color:' + deviceInfo.aggregatorDevice.colorCode">{{ deviceInfo.count }}</big>
                </div>
                <div>{{ deviceInfo.aggregatorDevice.deviceName }}</div>
              </div>
            </div>
            <div v-else class="row group">
              <q-alert color="primary" icon="info">No data available to display</q-alert>
            </div>
          </div>
        </div>
  
        <div class="row bottom-border q-ma-md q-py-md group">
          <div class="col-12 text-weight-regular text-grey-9">Inventory with Merchant</div>
          <div class="col-md-9 col-sm-12 col-xs-12">
            <div v-if="inventoryData.merchantItems.length > 0" class="row">
              <div class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
                @click="ajaxLoadDataForCentralInventoryByDeviceIdFilter(index, deviceInfo)"
                v-for="(deviceInfo, index) in inventoryData.merchantItems" :key="index"
                :style="'border: 1px solid ' + deviceInfo.aggregatorDevice.colorCode" align="center">
                <div>
                  <big :style="'color:' + deviceInfo.aggregatorDevice.colorCode">{{ deviceInfo.count }}</big>
                </div>
                <div>{{ deviceInfo.aggregatorDevice.deviceName }}</div>
              </div>
            </div>
            <div v-else class="row group">
              <q-alert color="primary" icon="info">No data available to display</q-alert>
            </div>
          </div>
        </div>
  
        <div class="row bottom-border q-ma-md q-py-md group">
          <div class="col-12 text-weight-regular text-grey-9">Inventory with SO</div>
          <div class="col-md-9 col-sm-12 col-xs-12">
            <div v-if="inventoryData.billPartnerInventory.length > 0" class="row">
              <div class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
                @click="ajaxLoadDataForCentralInventoryByDeviceIdFilter(index, deviceInfo)"
                v-for="(deviceInfo, index) in inventoryData.billPartnerInventory" :key="index"
                :style="'border: 1px solid ' + deviceInfo.aggregatorDevice.colorCode" align="center">
                <div>
                  <big :style="'color:' + deviceInfo.aggregatorDevice.colorCode">{{ deviceInfo.count }}</big>
                </div>
                <div>{{ deviceInfo.aggregatorDevice.deviceName }}</div>
              </div>
            </div>
            <div v-else class="row group">
              <q-alert color="primary" icon="info">No data available to display</q-alert>
            </div>
          </div>
        </div>
        <div class="row bottom-border q-ma-md q-py-md group">
          <div class="col-12 text-weight-regular text-grey-9">Faulty Inventory</div>
          <div class="col-md-9 col-sm-12 col-xs-12">
            <div v-if="inventoryData.faultyInventory.length > 0" class="row">
              <div class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
                @click="ajaxLoadDataForCentralInventoryByDeviceIdFilter(index, deviceInfo)"
                v-for="(deviceInfo, index) in inventoryData.faultyInventory" :key="index"
                :style="'border: 1px solid ' + deviceInfo.aggregatorDevice.colorCode" align="center">
                <div>
                  <big :style="'color:' + deviceInfo.aggregatorDevice.colorCode">{{ deviceInfo.count }}</big>
                </div>
                <div>{{ deviceInfo.aggregatorDevice.deviceName }}</div>
              </div>
            </div>
            <div v-else class="row group">
              <q-alert color="primary" icon="info">No data available to display</q-alert>
            </div>
          </div>
        </div>
  
        <div class="row bottom-border q-ma-md q-py-md group">
          <div class="col-12 text-weight-regular text-grey-9">Send to Repair</div>
          <div class="col-md-9 col-sm-12 col-xs-12">
            <div v-if="inventoryData.sendtoRepair.length > 0" class="row">
              <div class="col-md-2 col-sm-3 col-xs-3 q-ma-xs q-pa-md"
                @click="ajaxLoadDataForCentralInventoryByDeviceIdFilter(index, deviceInfo)"
                v-for="(deviceInfo, index) in inventoryData.sendtoRepair" :key="index"
                :style="'border: 1px solid ' + deviceInfo.aggregatorDevice.colorCode" align="center">
                <div>
                  <big :style="'color:' + deviceInfo.aggregatorDevice.colorCode">{{ deviceInfo.count }}</big>
                </div>
                <div>{{ deviceInfo.aggregatorDevice.deviceName }}</div>
              </div>
            </div>
            <div v-else class="row group">
              <q-alert color="primary" icon="info">No data available to display</q-alert>
            </div>
          </div>
        </div>
        <!--START: Open openAddBulkDeviceModelComp model -->
        <openAddBulkDeviceModelComp v-if="openBulkUploadModal" :propOpenBulkUploadModal="openBulkUploadModal"
          @closeModel="fnOpenBulkUploadModal"></openAddBulkDeviceModelComp>
        <!--END: Open openAddBulkDeviceModelComp model -->
      </div>
    </q-page>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import downloadExcel from "vue-json-excel";
  export default {
    components: {
      downloadExcel
    },
    name: "inventory",
    data() {
      return {
        devicedata: "",
        json_fields: {
          DeviceType: "device.deviceName",
          SerialNumber: "serialNumber"
        },
        flag: false,
        // aggregator: "",
        // aggregatorOptions: [],
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
          region: "",
          so: "",
          regionFilterOptions: [],
          SOFilterOptions: [],
  
          regionalItems: [],
  
          // billPartnerInventory: [],
  
          central: "",
          centralItems: [],
  
          merchant: "",
          // merchantItems: [],
          // resellarItems: [],
          // faultyInventory: [],
          // sendtoRepair: []
        }
      };
    },
    computed: {
      ...mapGetters("SAT_RegionalInventoryAllocation", ["getAllRegionalInventorySerialNumbersByDevice",
      ]),
      ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
      ...mapGetters("InventoryCentral", ["getCentralInventoryDashboardCount", "getAllInventoryDevicesData",
        "getAllInventoryDevicesTypesData", "getAggregatorsCentralInventoryDashboardCount",
        "getAllInventoryDevicesTypesWithCountData"]),
      ...mapGetters("SuperAdminUsers", ["getAllRegionsData", "getAllSOsData"]),
      ...mapGetters("SAT_RegionalInventoryAllocation", [
        "getAllRegionalInventoryDeviceDetailsWithCount",
        "getAllSoInventoryDeviceDetailsWithCount"
      ])
    },
  
    created() {
      // this.fetchAggregatorList();
      this.getAllInventoryData();
      this.getAllSOData();
    },
  
    methods: {
      ...mapActions("InventoryCentral", [
        "FETCH_CENTRAL_INVENTORY_DASHBOARD_COUNT", "FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE", "FETCH_AGGREGATORS_CENTRAL_INVENTORY_DASHBOARD_COUNT",
        "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
        "FETCH_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA"
      ]),
      ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
      ...mapActions("SAT_RegionalInventoryAllocation", [
        "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
        "FETCH_SO_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
        "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE"
      ]),
      ...mapActions("SuperAdminUsers", [
        "FETCH_ALL_REGIONS_DATA",
        "FETCH_ALL_SO_DATA"
      ]),
  
      // fetchAggregatorList() {
      //   let self = this;
      //   let cookedArr = [];
      //   self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
      //     .then(() => {
      //       return _.map(self.getActiveCreatedAggregatorList, (item) => {
      //         console.log("ITEM -------->", item)
      //         cookedArr.push({
      //           value: item,
      //           label: item.name
      //         });
      //         console.log("cookedArr -------->", cookedArr)
      //         self.aggregatorOptions = cookedArr;
      //         // this.flag = true;
      //       });
  
      //     })
      // },
      // selectedAggregators(value) {
      //   this.flag = true;
      //   this.getAllInventoryData(value);
  
      // },
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
        this.FETCH_AGGREGATORS_CENTRAL_INVENTORY_DASHBOARD_COUNT().then(() => {
          console.log("FETCH_AGGREGATORS_CENTRAL_INVENTORY_DASHBOARD_COUNT ------->", JSON.stringify(this.getAggregatorsCentralInventoryDashboardCount));
          this.inventoryData.centralItems = this.getAggregatorsCentralInventoryDashboardCount.centralInventory;
          this.inventoryData.merchantItems = this.getAggregatorsCentralInventoryDashboardCount.merchantInventory;
          this.inventoryData.regionalItems = this.getAggregatorsCentralInventoryDashboardCount.regionalInventory;
          this.inventoryData.billPartnerInventory = this.getAggregatorsCentralInventoryDashboardCount.billPartnerInventory;
          // this.inventoryData.resellarItems = this.getAggregatorsCentralInventoryDashboardCount.resellerInventory;
          this.inventoryData.faultyInventory = this.getAggregatorsCentralInventoryDashboardCount.faultyInventory;
          this.inventoryData.sendtoRepair = this.getAggregatorsCentralInventoryDashboardCount.faultySentToRepair;
          this.$q.loading.hide();
        })
          .catch(() => {
            this.$q.loading.hide();
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
  
    }
  };
  </script>
  
  <style>
  
  </style>
  