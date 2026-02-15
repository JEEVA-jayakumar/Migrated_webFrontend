<template>
  <q-page>
    <!-- content -->
    <div>
      <!--START: table title -->
      <div class="row bottom-border q-px-md q-py-sm items-center">
        <!--START: table title -->
        <div class="col-12 col-lg-4 text-h6 text-weight-regular text-grey-9">Aggregator Inventory</div>
        <div class="col-12 col-lg-8 group" align="right">
          <q-btn-dropdown outline no-caps class="text-weight-regular" label="Add Refurbished Device" >
            <q-list link>
              <!-- <q-item to="phonepeRefurbishmentAddDeviceScan">
                <q-item-section icon="search" />
                <q-item-section>
                  <q-item-label label>Scan and Upload</q-item-label>
                </q-item-section>
              </q-item> -->
              <q-item @click.native="fnPhonePeOpenRefurbishedBulkUploadModal">
                <q-item-section icon="attach_file" />
                <q-item-section>
                  <q-item-label label>Bulk upload</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn outline no-caps class="text-weight-regular" label="Allocate to SO" to="PhonepeallocateToSo" />
          <q-btn outline no-caps class="text-weight-regular" label="Allocate to Region" to="PhonepeallocateDevice" />
          <q-btn outline no-caps class="text-weight-regular" label="Add Faulty Device" @click="fnShowAddDevice" to="showAggregatorsAddDamagedDevices" />
          <q-btn-dropdown outline no-caps class="text-weight-regular" label="Add new device from manufacturer" >
            <q-list link>
              <q-item to="PhonepeAddDeviceScan">
                <q-item-section icon="search" />
                <q-item-section>
                  <q-item-label label>Scan and Upload</q-item-label>
                </q-item-section>
              </q-item>
              <q-item @click.native="fnPhonePeOpenBulkUploadModal">
                <q-item-section icon="attach_file" />
                <q-item-section>
                  <q-item-label label>Bulk upload</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          
          <!-- Phonepe Device Recovery -->
          <!-- <q-btn-dropdown
            outline
            no-caps
            class="text-weight-regular"
            label="Add Phonepe Device Recovery Manufacturer"
          >
            <q-list link>
              <q-item to="PhonepeDeviceRecoveryScan">
                <q-item-section icon="search" />
                <q-item-section>
                  <q-item-label label>Scan and Upload</q-item-label>
                </q-item-section>
              </q-item>
              <q-item @click.native="fnOpenBulkUploadModal">
                <q-item-section icon="attach_file" />
                <q-item-section>
                  <q-item-label label>Bulk upload</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>  -->
        </div>
        <!--END: table title -->
      </div>
      <!--Aggregator select List-->
      <!-- <div class="row bottom-border q-px-md q-py-sm items-center">
        <div class="col-md-4">
          <q-select color="grey-9" v-model="formData.aggregator" float-label="Select Aggregator" radio
            :options="dropdDown.aggregatorOptions" @input="selectedAggregators" />
        </div>
      </div> -->
      <!--END: table title -->
      <div class="row">
        <div class="col-md-3 group q-pa-md">
          <div class="q-pa-md cursor-pointer" v-if="deviceInfo.aggregatorDevice != undefined" :class="[activeItemId === index ? 'shadow-5 bg-grey-5' : 'shadow-0']"
            @click="ajaxLoadDataForCentralInventoryByDeviceIdFilter(index, deviceInfo)"
            v-for="(deviceInfo, index) in getAllPhonepeInventoryDevicesTypesWithCountData" :key="index"
            :style="'background:' + deviceInfo.aggregatorDevice.colorCode" align="center">
            <div>
              <big>{{ deviceInfo.count }}</big>
            </div>
            <div>{{ deviceInfo.aggregatorDevice.deviceName }}</div>
          </div>
        </div>
        <div class="col-md-9">
          <div>
            <!--STARTv-model: table Data -->
            <q-table :rows="getAllPhonepeInventoryDevicesData" :columns="columnData"
              table-class="customTableClass shadow-0" :filter="filterSearch" 
             
              row-key="index" :loading="tableAjaxLoading" color="primary">
              <template slot="top">
                <!--START: table filter,search  :pagination="paginationControl"-->
                <div class="col-md-5">
                  <q-input clearable color="grey-9" v-model="filterSearch" placeholder="Type.." float-label="Search By Device Serail Number.."
                    class="q-mr-lg q-py-sm" />
                </div>

                <div class="col-md-5">
                  <!-- <q-input
                      clearable
                      color="grey-9"
                      v-model="filterSearch"
                      placeholder="Type.."
                      float-label="Search .."
                      class="q-mr-lg q-py-sm"
                    />-->
                  <downloadExcel :rows="getAllPhonepeInventoryDevicesData" :fields="json_fields"
                    name="CentralInventory.xls">
                    <q-btn outline color="grey-9" label="Download as excel" />
                    <!-- @click="fndownload() -->
                  </downloadExcel>
                  <!-- @click="downloadReport" -->
                </div>
                <!--END: table filter,search -->
              </template>
            </q-table>
            <!--END: table Data -->
          </div>
        </div>
      </div>
      <!-- <pre>{{getAllInventoryDevicesTypesData}}</pre> -->
      <!--START: Open openAddBulkDeviceModelComp model -->
      <PhonePeopenAddBulkDeviceModelComp v-if="openBulkUploadModal" :propOpenBulkUploadModal="openBulkUploadModal"
        :propAllDevicestypes="getAllInventoryDevicesTypesData" @closeModel="fnPhonePeOpenBulkUploadModal"
        @emitToggleinventoryBulkUploadOnSuccess="fnReloadPageInformation"></PhonePeopenAddBulkDeviceModelComp>

        <phonepeAddRefurbishedBulkUploadDevice v-if="openRefurbishedBulkUploadModal" :propOpenRefurbishedBulkUploadModal="openRefurbishedBulkUploadModal"
        :propAllDevicestypes="getAllInventoryDevicesTypesData" @closeModel="fnPhonePeOpenRefurbishedBulkUploadModal" 
        @emitToggleinventoryRefurbishedBulkUploadOnSuccess="fnReloadPageInformation"></phonepeAddRefurbishedBulkUploadDevice>
      <!--END: Open openAddBulkDeviceModelComp model -->
      <!--START >>  Show Add Device Component -->
      <!-- <faultyInventoryComponent
          v-if="faultyInventoryComponent"
          @emitfaultyInventoryComponent="fnShowAddDevice"
          :propfaultyInventoryComponent="faultyInventoryComponent"
          :propDeviceTypes="getAllInventoryDevicesTypesData"
        />-->
      <!--START >>  Show Add Device Component -->
      <showAggregatorsAddDamagedDevices v-if="faultyInventoryComponent" :faultyInventoryComponent="faultyInventoryComponent"
        @emitRefreshList="fnAjaxPopulateAllDevicesWithCount" />
      <!--END >>  Show Add Device Component -->
      <!--END >>  Show Add Device Component -->
    </div>
  </q-page>
</template>
  
<script>
import { required, and } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import downloadExcel from "vue-json-excel";
import phonepeAddRefurbishedBulkUploadDevice from "../../components/inventory/phonepeAddRefurbishedBulkUploadDevice.vue"
import PhonePeopenAddBulkDeviceModelComp from "../../components/inventory/PhonePeopenAddBulkDeviceModelComp.vue";
import faultyInventoryComponent from "../../components/inventory/faultyInventoryComponent.vue";
import showAggregatorsAddDamagedDevices from "../../components/inventory/showAggregatorsAddDamagedDevices.vue";
export default {
  name: "inventoryCentral",
  components: {
    PhonePeopenAddBulkDeviceModelComp,
    showAggregatorsAddDamagedDevices,
    downloadExcel,
    phonepeAddRefurbishedBulkUploadDevice
  },
  data() {
    return {
      faultyInventoryComponent: false,
      sideInnerDeviceMenu: {},
      //Toggle bulk upload modal
      activeItemId: 0,
      // flag: false,
      openBulkUploadModal: false,
      openRefurbishedBulkUploadModal:false,
      tableAjaxLoading: false,
      filterSearch: "",
      json_fields: {
        SerialNumber: "serialNumber",
        Aggregator: "aggregator.name",
        DeviceType: "aggregatorDevice.deviceName"
      },
      // formData: {
      //   aggregator: "",
      // },
      dropdDown: {
        aggregatorOptions: [],
      },
      // table column data
      columnData: [
        {
          name: "serialNumber",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: "serialNumber",
          sortable: true
        },
        {
          name: "deviceCategoryType",
          required: true,
          label: "Device Category",
          align: "center",
          field: row => {
            return row.deviceCategoryType == null ? "NA" :row.deviceCategoryType ;
          },
          
        },
        {
          name: "aggregator",
          required: true,
          label: "Aggregator",
          align: "center",
          field: row => {
            return row.aggregator.name;
          },
          sortable: true
        },
        {
          name: "device",
          required: true,
          label: "Device Type",
          align: "center",
          field: row => {
            return row.aggregatorDevice.deviceName;
          },
          sortable: true
        },
      ],

      // table pagination control
      // paginationControl: {
      //   rowsPerPage: 10
      // }
    };
  },

  computed: {
    ...mapGetters("InventoryCentral", [
      "getAllInventoryDevicesData",
      "getAllInventoryDevicesTypesData",
      "getAllInventoryDevicesTypesWithCountData", "getAllPhonepeInventoryDevicesTypesWithCountData", "getAllPhonepeInventoryDevicesData", "getAllPhoneInventoryDevicesData"
    ]),
    ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
  },

  created() {
    //Call to trigger api to get all devices information
    // this.fnAjaxPopulateAllDevicesWithCount();

    // //Call to trigger api to get all devices information
    // this.fnAjaxPopulateAllDevices();

    // //Call to trigger api to get all devices information
    // this.fnAjaxPopulateAllDevicesList();


    /* START Aggregator Dynamic Code */
    // this.fetchAggregatorList();

    /* START Aggregator Dynamic Code */

    /* START Aggregator Static Code */
    this.fnAjaxPopulateAllDevicesWithCount();
      this.fnAjaxPopulateAllDevicesList();
       /* START Aggregator Static Code */
  },

  methods: {
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE",
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA", "FETCH_ALL_PHONE_PE_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA", "FETCH_ALL_PHOEPE_INVENTORY_DEVICES_BY_DEVICE_TYPE", "FETCH_ALL_PHONE_PE_INVENTORY_DEVICES"
    ]),
    ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
    ...mapActions("reports", ["INVENTORY_WITH_CENTRAL"]),

    //API for table device filter data using device id
    ajaxLoadDataForCentralInventoryByDeviceIdFilter(itemIndex, deviceInfo) {
      this.activeItemId = itemIndex;
      this.fnAjaxPopulateAllDevicesList(deviceInfo);
    },
    // selectedAggregators(value) {
    //   this.fnAjaxPopulateAllDevicesWithCount(value);
    //   this.fnAjaxPopulateAllDevicesList();
    // },
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
    //         self.dropdDown.aggregatorOptions = cookedArr;
    //         // this.flag = true;
    //       });

    //     })
    // },
    fndownload() {
      const datas = this.getAllPhonepeInventoryDevicesData;
      let output = '';
      console.log(datas);
      // while (index < datas.length) {
      //   console.log(datas[index].stan);
      //   output += datas[index].stan;
      //   output += '\r\n';
      //   index += 1;
      // }
      datas.forEach(element => {

        output += element.serialNumber;
        output += '\r\n';
      });

      const file = new Blob([output],

        { type: 'text/plain;charset=utf-8' });
      // element.href = URL.createObjectURL(file);
      // element.download = "serialNumber.txt";
      // document.body.appendChild(element);

      // element.click();
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(file);
      link.download = "serialNumber.txt"

      link.click();
    },

    //Function to open bulk upload modal
    fnPhonePeOpenBulkUploadModal() {
      this.openBulkUploadModal = !this.openBulkUploadModal;
    },
    
    fnPhonePeOpenRefurbishedBulkUploadModal() {

      this.openRefurbishedBulkUploadModal = !this.openRefurbishedBulkUploadModal;
          this.fnAjaxPopulateAllDevicesWithCount();
      this.fnAjaxPopulateAllDevicesList();
  //  this.fnAjaxPopulateAllDevicesList();
    },
    //Function to populate ajax device list with count info
    fnAjaxPopulateAllDevicesWithCount() {
      this.tableAjaxLoading = true;
      this.FETCH_ALL_PHONE_PE_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA().then(() => {
        this.FETCH_ALL_PHOEPE_INVENTORY_DEVICES_BY_DEVICE_TYPE().then(() => {
          let allDevicesCount = {
            count: this.getAllPhonepeInventoryDevicesData.length,
            device: {
              deviceName: "Total",
              colorCode: "666"
            }
          };
          console.log("before getAllPhonepeInventoryDevicesTypesWithCountData ------>", JSON.stringify(this.getAllPhonepeInventoryDevicesTypesWithCountData));
          this.getAllPhonepeInventoryDevicesTypesWithCountData.unshift(
            allDevicesCount
          );
          console.log("After getAllPhonepeInventoryDevicesTypesWithCountData ------>", JSON.stringify(this.getAllPhonepeInventoryDevicesTypesWithCountData));
        });
      });
      this.tableAjaxLoading = false;
      if (this.faultyInventoryComponent) {
        this.faultyInventoryComponent = false;
      }
    },

    //Function to populate ajax device list
    fnAjaxPopulateAllDevicesList(deviceInfo) {
      this.tableAjaxLoading = true;
      this.FETCH_ALL_PHOEPE_INVENTORY_DEVICES_BY_DEVICE_TYPE(deviceInfo);
      this.tableAjaxLoading = false;
    },

    // Function to reload all data after bulk upload
    fnReloadPageInformation() {
      //Call to trigger api to get all devices information
      // this.fnAjaxPopulateAllDevicesWithCount();

      //Call to trigger api to get all devices information
      this.fnAjaxPopulateAllDevices();

      //Call to trigger api to get all devices information
      // this.fnAjaxPopulateAllDevicesList();
    },
   

    //Function to populate ajax device list for add device popup
    fnAjaxPopulateAllDevices() {
      this.tableAjaxLoading = true;
      this.FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA();
      this.tableAjaxLoading = false;
    },

    // Function to show add devices for damaged queue
    fnShowAddDevice() {
      this.faultyInventoryComponent = !this.faultyInventoryComponent;
    },
    downloadReport() {
      this.$q.loading.show({
        delay: 100 // ms
      });
      this.INVENTORY_WITH_CENTRAL(this.formData)
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check"
          });
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down"
          });
        });
    }
  }
};
</script>
  
<style>

</style>
  
