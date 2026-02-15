<template>
  <q-page>
    <!-- content -->
    <div>
      <!--START: table title -->
      <div class="row bottom-border q-px-md q-py-sm items-center">
        <!--START: table title -->
        <div class="col-12 col-lg-4 text-h6 text-weight-regular text-grey-9">Bijlipay Central Inventory </div>
        <div class="col-12 col-lg-8 group" align="right">
          <q-btn
            outline
            no-caps
            class="text-weight-regular"
            label="Allocate to SO"
            to="central/allocate/device/so"
          ></q-btn>

          <q-btn
            outline
            no-caps
            class="text-weight-regular"
            label="Allocate to Region"
            to="central/allocate/device/region"
          />
          <q-btn
            outline
            no-caps
            class="text-weight-regular"
            label="Allocate to Reseller"
            to="central/allocate/device/resellar"
          />

          <q-btn
            outline
            no-caps
            class="text-weight-regular"
            label="Add Faulty Device"
            @click="fnShowAddDevice"
            to="showAddDamagedDevices"
          />
          <q-btn-dropdown
            outline
            no-caps
            class="text-weight-regular"
            label="Add new device from manufacturer"
          >
            <!-- dropdown content -->
            <q-list link>
              <q-item to="central/add/device/scan">
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
          </q-btn-dropdown>
         </div>
        <!--END: table title -->
      </div>
      <!--END: table title -->
      <div class="row">
        <div class="col-md-3 group q-pa-md">
          <div
            class="q-pa-md cursor-pointer"
            :class="[activeItemId === index ? 'shadow-5 bg-grey-5' : 'shadow-0']"
            @click="ajaxLoadDataForCentralInventoryByDeviceIdFilter(index,deviceInfo)"
            v-for="(deviceInfo,index) in getAllInventoryDevicesTypesWithCountData"
            :key="index"
            :style="'background:'+deviceInfo.device.colorCode"
            align="center"
          >
            <div>
              <big>{{deviceInfo.count}}</big>
            </div>
            <div>{{deviceInfo.device.deviceName}}</div>
          </div>
        </div>
        <div class="col-md-9">
          <div>
            <!--STARTv-model: table Data -->
            <q-table
              :rows="getAllInventoryDevicesData"
              :columns="columnData"
              table-class="customTableClass shadow-0"
              :filter="filterSearch"
              :pagination="paginationControl"
              row-key="index"
              :loading="tableAjaxLoading"
              color="primary"
            >
              <template slot="top" >
                <!--START: table filter,search -->
                <div class="col-md-5">
                  <q-input
                    clearable
                    color="grey-9"
                    v-model="filterSearch"
                    placeholder="Type.."
                    float-label="Search By Device Serail Number.."
                    class="q-mr-lg q-py-sm"
                  />
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
                  <downloadExcel
                    :rows="getAllInventoryDevicesData"
                    :fields="json_fields"
                    name="CentralInventory.xls"
                  >
                    <q-btn outline color="grey-9" label="Download as excel"/>
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
      <openAddBulkDeviceModelComp
        v-if="openBulkUploadModal"
        :propOpenBulkUploadModal="openBulkUploadModal"
        :propAllDevicestypes="getAllInventoryDevicesTypesData"
        @closeModel="fnOpenBulkUploadModal"
        @emitToggleinventoryBulkUploadOnSuccess="fnReloadPageInformation"
      ></openAddBulkDeviceModelComp>
      <!--END: Open openAddBulkDeviceModelComp model -->
      <!--START >>  Show Add Device Component -->
      <!-- <faultyInventoryComponent
        v-if="faultyInventoryComponent"
        @emitfaultyInventoryComponent="fnShowAddDevice"
        :propfaultyInventoryComponent="faultyInventoryComponent"
        :propDeviceTypes="getAllInventoryDevicesTypesData"
      />-->
      <!--START >>  Show Add Device Component -->
      <showAddDamagedDevices
        v-if="faultyInventoryComponent"
        :faultyInventoryComponent="faultyInventoryComponent"
        @emitRefreshList="fnAjaxPopulateAllDevicesWithCount"
      />
      <!--END >>  Show Add Device Component -->
      <!--END >>  Show Add Device Component -->
    </div>
  </q-page>
</template>

<script>
import { required, and } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import downloadExcel from "vue-json-excel";
import openAddBulkDeviceModelComp from "../../components/inventory/openAddBulkDeviceModelComp.vue";
import faultyInventoryComponent from "../../components/inventory/faultyInventoryComponent.vue";
import showAddDamagedDevices from "../../components/inventory/showAddDamagedDevices.vue";
export default {
  name: "inventoryCentral",
  components: {
    openAddBulkDeviceModelComp,
    showAddDamagedDevices,
    downloadExcel
  },
  data() {
    return {
      faultyInventoryComponent: false,
      sideInnerDeviceMenu: {},
      //Toggle bulk upload modal
      activeItemId: 0,
      openBulkUploadModal: false,
      tableAjaxLoading: false,
      filterSearch: "",
      json_fields: {
        SerialNumber: "serialNumber",
        DeviceType: "device.deviceName"
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
          name: "device",
          required: true,
          label: "Device Type",
          align: "center",
          field: row => {
            return row.device.deviceName;
          },
          sortable: true
        },
      ],

      // table pagination control
      paginationControl: {
        rowsPerPage: 10
      }
    };
  },

  computed: {
    ...mapGetters("InventoryCentral", [
      "getAllInventoryDevicesData",
      "getAllInventoryDevicesTypesData",
      "getAllInventoryDevicesTypesWithCountData"
    ])
  },

  created() {
    //Call to trigger api to get all devices information
    this.fnAjaxPopulateAllDevicesWithCount();

    // //Call to trigger api to get all devices information
    this.fnAjaxPopulateAllDevices();

    //Call to trigger api to get all devices information
    this.fnAjaxPopulateAllDevicesList();
  },

  methods: {
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE",
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA"
    ]),
    ...mapActions("reports", ["INVENTORY_WITH_CENTRAL"]),

    //API for table device filter data using device id
    ajaxLoadDataForCentralInventoryByDeviceIdFilter(itemIndex, deviceInfo) {
      this.activeItemId = itemIndex;
      this.fnAjaxPopulateAllDevicesList(deviceInfo);
    },
    fndownload(){
       const datas =this.getAllInventoryDevicesData;
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
    fnOpenBulkUploadModal() {
      this.openBulkUploadModal = !this.openBulkUploadModal;
    },

    //Function to populate ajax device list with count info
    fnAjaxPopulateAllDevicesWithCount() {
      this.tableAjaxLoading = true;
      this.FETCH_ALL_INVENTORY_DEVICES_TYPES_WITH_COUNT_DATA().then(() => {
        this.FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE().then(() => {
          let allDevicesCount = {
            count: this.getAllInventoryDevicesData.length,
            device: {
              deviceName: "Total",
              colorCode: "666"
            }
          };
          this.getAllInventoryDevicesTypesWithCountData.unshift(
            allDevicesCount
          );
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
      this.FETCH_ALL_INVENTORY_DEVICES_BY_DEVICE_TYPE(deviceInfo);
      this.tableAjaxLoading = false;
    },

    // Function to reload all data after bulk upload
    fnReloadPageInformation() {
      //Call to trigger api to get all devices information
      this.fnAjaxPopulateAllDevicesWithCount();

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
