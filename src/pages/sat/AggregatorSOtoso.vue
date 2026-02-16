<template>
    <q-page>
      <div>
        <div class="row bottom-border group q-px-md q-py-md items-center text-weight-regular text-grey-9">
          <!--START: table title -->
          <!-- <div class="col-md-2">
            <q-select :disabled="formData.device_type != ''"
              :class="[formData.device_type != '' ? 'no-pointer-events' : '']" v-model="formData.region"
              float-label="Select Region" radio color="grey-9" :options="regionOptions" @input="regionBasedSO" />
          </div> -->
          <div class="col-md-2">
            <q-select filter clearable  v-model="formData.so" float-label="Select SO" radio color="grey-9"
              :options="assignToOptions" @input="SelectedSo" />
          </div>
          <!-- <div class="col-md-2">
            <q-select clearable @clear="fnClearingDeviceTypeSelection"
              @input="fnSetDevicesByDeviceId" v-model="formData.device_type" float-label="Select Device Type" radio
              color="grey-9" :options="deviceOptions" />
          </div> -->
          <div class="col-12 col-lg-4 group" align="right">
            <q-btn :disabled="formData.so == ''" @click="openScannerComp"
              v-if="scannerToggleOption" color="light-blue" class="q-py-xs" label="Start scan" />
            <q-btn icon="shopping_cart" outline class="q-py-xs" label="Re-Assign" @click="fnAllocateDeviceToSO" />
          </div>
          <!--END: table title -->
        </div>
        <div class="row text-weight-regular text-grey-9">
          <div class="col group" v-for="(item, index) in formData.scannedItems" :key="index">
            <q-card class="shadow-4"
              :style="'border:' + [formData.device_type.id == item.device.id ? '2px solid #61116a' : 'unset']">
              <q-list highlight separator class="q-pa-none"
                :class="[formData.device_type.id == item.device.id ? 'activeDeviceTab' : '']">
                <q-item-label header style="border-bottom: 1px solid #ccc;">
                  <q-icon :style="'color:'[formData.device_type.id == item.device.id ? '#fff' : '#202c3f']"
                    name="fas fa-tablet-alt" />
                  {{ item.device.deviceName }}
                </q-item-label header>
                <q-scroll-area style="height:400px" :thumb-style="{
                  right: '4px',
                  borderRadius: '5px',
                  background: 'grey',
                  width: '5px',
                  opacity: 0.5
                }" :delay="1500">
                  <div v-if="item.deviceSerialNumbers.length > 0">
                    <q-item separator class="text-light-blue" v-for="(subItem, subIndex) in item.deviceSerialNumbers"
                      :key="subIndex">
                      <q-item-section class="text-body1">{{ subItem }}</q-item-section>
                      <q-item-section class="text-body1">{{item.userName[0]}}</q-item-section>
                      <q-item-section>
                        <q-btn round size="sm" color="negative" icon="clear"
                          @click="fnRemoveScannedItems(index, subIndex)" />
                      </q-item-section>
                    </q-item>
                  </div>
                  <div v-else>
                    <q-item>
                      <q-item-section class="text-body1">No data to display</q-item-section>
                      <q-item-section>
                        <q-btn round size="sm" color="negative" @click="fnRemoveDeviceTypeFromList(index)" icon="clear" />
                      </q-item-section>
                    </q-item>
                  </div>
                </q-scroll-area>
              </q-list>
            </q-card>
          </div>
        </div>
        <!--START: Open showPDOmodal model -->
        <showAggregatorsPDOSotoSO v-if="showAggregatorsPDOSotoSO"
          :propshowRegionBasedSo="showAggregatorsPDOSotoSO" 
          :propAllScannedItemArr="formData"
          @closeModel="fnAllocateDeviceToSO" @emittedAfterPODsubmission="fnClearingDeviceTypeSelection">
        </showAggregatorsPDOSotoSO>
        <!--END: Open showPDOmodal model -->
      </div>
    </q-page>
  </template>
  
  <script>
import { email } from '@vuelidate/validators';

  // import VueBarcodeScanner from "vue-barcode-scanner";
  // Vue.use(VueBarcodeScanner);
  import { mapGetters, mapActions } from "vuex";
  import showAggregatorsPDOSotoSO from "../../components/inventory/showAggregatorsPDOSotoSO.vue";
  export default {
    name: "allocateDevice",
    components: {
        showAggregatorsPDOSotoSO
    },
    data() {
      return {
        userName:"",
        filterSearch: "",
        scannerToggleOption: true,
        assignToOptions:[],
        showAggregatorsPDOSotoSO: false,
        regionOptions: [],
        deviceOptions: [],
        regionBasedSo: [],
        // aggregatorOptions: [],
        // aggregator: "",
  
        tempTableData: [],
        formData: {
          region: "",
          device_type: "",
          so: "",
          scannedItems: [],
          assignedUserId:'',
        },
        paginationControl: {
          rowsPerPage: 10
        },
        tableAjaxLoading: false
      };
    },
  
    computed: {
      // ...mapGetters("InventoryScanAddDevice", ["getAddDeviceScannedItems"]),
      ...mapGetters("InventoryCentral", [
        "getAllInventoryDevicesTypesData",
        "getAllRegionsData",
        "getRegionBasedSO"
      ]),
      ...mapGetters("ImplementationExecutive", [
            "getImplementationExecutiveList"
        ]),
      ...mapGetters("superAdminAggregatorsDevice", ["getCreatedActiveDeviceList"]),
      ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
    },
    beforeMount(){
      this.implementationExecutiveList()
    },
    created() {
      // this.fnAjaxGetAllDevicesTypesData();
      this.fnAjaxGetAllRegionsData();
  
      // this.FETCH_REGION_BASED_SO();
    },
    unmounted() {
      // Remove listener when component is destroyed
      this.$barcodeScanner.destroy();
    },
  
    methods: {
      // ...mapActions("SatDeviceTrackerScanner", ["REACTIVE_SCANNED_DEVICE_DATA"]),
      ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
      ...mapActions("InventoryCentral", [
        "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
        "FETCH_ALL_REGIONS_DATA",
        "FETCH_REGION_BASED_SO"
      ]),
      ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
      ...mapActions("superAdminAggregatorsDevice", ["GET_ACTIVE_CREATED_DEVICE_LIST"]),
      ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
      ...mapActions("VerifyDevice", [
        "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION",
        "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_SO_ALLOCATION", "AGGREGATORS_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_SO_ALLOCATION",
        "AGGREGATOR_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_SO_TO_SO_ALLOCATION"
      ]),
  
      // Function to dynamically set column name for scanned items without store
      fnSetDevicesByDeviceId() {
       
        this.$barcodeScanner.destroy();
        // Set local variable for this
        let self = this;
  
        // Get device type object from array using selected dvice type by user
        let predictIfDeviceExist = self.formData.scannedItems.filter(function(
          value
        ) {
          return value.device.id == self.formData.device_type.id;
        });
  
        // Push scanned item values into array
        if (predictIfDeviceExist.length == 0) {
          self.formData.scannedItems.unshift({
            device: {
              deviceName: self.formData.device_type.deviceName,
              id: self.formData.device_type.id
            },
            deviceSerialNumbers: [],
            userName:[]
          });
        }
      },
      fnClearingDeviceTypeSelection(closeModal) {
        console.log("fnClearingDeviceTypeSelection  !!!!!!-------->")
        this.formData.device_type = "";
        this.formData.scannedItems = [];
        this.formData.region = "",
          this.formData.so = ""
      },
      SelectedSo() {
        this.scannerToggleOption = true;
        this.$barcodeScanner.destroy();
        // this.fetchAggregatorList();
        // this.AggregatorsDevice();
      },
  
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
      AggregatorsDevice() {
        self = this;
        let cookedArr1 = [];
        self.GET_ACTIVE_CREATED_DEVICE_LIST()
          .then(() => {
            return _.map(this.getCreatedActiveDeviceList, (item) => {
              console.log("ITEM -------->", item)
              cookedArr1.push({
                value: item,
                label: item.deviceName
              });
              console.log("cookedArr1 -------->", cookedArr1)
              self.deviceOptions = cookedArr1;
            })
          })
      },

      implementationExecutiveList() {
            this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
                let assumeArr = [];
                this.getImplementationExecutiveList.map(function (value) {
                    assumeArr.push({ label: value.name+" | "+value.employeeID+" | "+value.email, value: value.id });
                });
                this.assignToOptions = assumeArr;
            });
        },
      // fnAjaxGetAllDevicesTypesData(value) {
      //   this.FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA()
      //     .then(() => {
      //       let assumeArr = [];
      //       this.getAllInventoryDevicesTypesData.map(function (value, index) {
      //         assumeArr.push({
      //           label: value.deviceName,
      //           value: value
      //         });
      //       });
      //       this.deviceOptions = assumeArr;
      //     })
      //     .catch(error => {
      //       this.deviceOptions = [];
      //     });
      // },
      // Create callback function to receive barcode when the scanner is already done
     
      onBarcodeScanned(barcode) {
        console.log("PREDICT",JSON.stringify(this.formData.scannedItems));
        this.fnSetDevicesByDeviceId()
        let self = this;
        let predictIfDeviceExist = self.formData.scannedItems.find(function(
          value
        ) {
          return value.device.id == self.formData.device_type.id;
        });
        let assumeArr;
        assumeArr = {
          device: {
            deviceName: self.formData.device_type.deviceName,
            id: self.formData.device_type.id
          },
          deviceSerialNumbers: predictIfDeviceExist.deviceSerialNumbers,
          userName:predictIfDeviceExist.userName
        };
        let finalAssumation = _.find(assumeArr.deviceSerialNumbers, function(oo) {
          return oo == barcode;
        });
        if (finalAssumation == undefined) {
          console.log("Inside");
          this.AGGREGATOR_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_SO_TO_SO_ALLOCATION({
            device: self.formData.device_type.id,
            barcode: barcode
          })
            .then(response  => {
              console.log("Error-1",JSON.stringify(response.body.data.user));
              // self.userName = null
              this.scannerToggleOption = false;
              self.userName = response.body.data.user.username
              console.log("USER NAME",self.userName);
              assumeArr.deviceSerialNumbers.push(barcode);
              assumeArr.userName.push(self.userName)
              this.formData.assignedUserId = response.body.data.user.id
            })
            .catch(error => {
              let message = error.data.message
              console.log("Error-2",error.data.message);
              this.$q.notify({
                color: "primary",
                position: "bottom",
                message: barcode +" - "+ message,
                icon: "info"
              });
            });
        } else {
          this.$q.notify({ S });
        }
      },
  
      openScannerComp() {
        this.$q.notify({
          color: "positive",
          position: "bottom",
          message: "Start scanning for " + this.formData.device_type.deviceName,
          icon: "list"
        });
  
        this.scannerToggleOption = false;
  
        if (!this.$barcodeScanner.hasListener()) {
          this.$barcodeScanner.init(this.onBarcodeScanned);
        }
      },
  
      // Function remove scanned items
      fnRemoveScannedItems(index, subIndex) {
    console.log("BEFORE",JSON.stringify(this.formData.scannedItems[index].userName));
        // this.formData.scannedItems[index].deviceSerialNumbers.splice(subIndex, 1);
        this.formData.scannedItems[index].deviceSerialNumbers.splice(subIndex
        , 1);
        this.formData.scannedItems[index].userName.splice(subIndex
        , 1);
        this.scannerToggleOption = true;
        console.log("AFTER",JSON.stringify(this.formData.scannedItems[index].userName));
      },
  
      // Function to final submit for allocate device
      fnAllocateDeviceToSO(token) {
        this.showAggregatorsPDOSotoSO = !this.showAggregatorsPDOSotoSO;
        console.log("INSIDE COMMING ---->", token);
        if (token == 'refresh') {
          // this.formData = "";
        //   formData: {
        //   region: "",
        //   device_type: "",
        //   so: "",
        //   scannedItems: []
        // },
          console.log("INSIDE COMMING");
          this.formData.device_type = "";
          this.formData.scannedItems = [];
          this.formData.region = "",
            this.formData.so = ""
        }
      },
  
      // Function to get all device types
  
      regionBasedSO() {
        this.FETCH_REGION_BASED_SO(this.formData.region).then(() => {
          let assumeArr = [];
          this.getRegionBasedSO.map(function (value, index) {
            assumeArr.push({
              label: value.name + " | " + value.employeeID+ " | " + value.email,
              value: value.id
            });
          });
          this.regionBasedSo = assumeArr;
        });
      },
      // Function to get ll regiosn data
      fnAjaxGetAllRegionsData() {
        this.FETCH_ALL_REGIONS_DATA()
          .then(() => {
            let assumeArr = [];
            this.getAllRegionsData.map(function (value, index) {
              assumeArr.push({
                label: value.regionAreaName,
                value: value.id
              });
            });
            this.regionOptions = assumeArr;
          })
          .catch(error => {
            this.regionOptions = [];
          });
      },
  
      // Function to delete the entire device based information
      fnRemoveDeviceTypeFromList(index) {
        // this.formData.scannedItems.splice(index, 1);
        this.formData.scannedItems.splice(index, 1);
        this.scannerToggleOption = true;
      },
  
      // Function to clear device type
      fnClearingDeviceTypeSelection() {
        this.formData.device_type = "";
        this.formData.scannedItems = [];
      }
    }
  };
  </script>
  <style scoped>
  .activeDeviceTab .q-list-header {
    border-bottom: 1px solid rgb(204, 204, 204);
    background: #61116a;
    color: #fff;
  }
  </style>
  
