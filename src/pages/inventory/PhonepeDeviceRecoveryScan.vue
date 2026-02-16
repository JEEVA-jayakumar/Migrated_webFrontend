<template>
    <q-page>
      <!-- content -->
      <div>
        <div class="row bottom-border q-px-md q-py-md items-center">
          <!--START: table title -->
          <div class="col-md-8 text-h6 text-weight-regular text-grey-9">Aggregator Add New Device Recovery - Scan & Upload</div>
          <!--END: table title -->
        </div>
        <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
          <!--START: table title -->
          <!-- <div class="col-md-4">
            <q-select color="grey-9" v-model="formData.aggregator" float-label="Select Aggregator" radio
              :options="dropdDown.aggregatorOptions" @input="getaggregator" />
          </div> -->
          <div class="col-md-2">
            <!-- <pre>{{tempTableData}}</pre>  ref="clickHeretoStartParent"  ref="clickHeretoStartChild"      -->
            <q-select @input="fnDisableDeviceTypeSelection"  v-model="formData.device.id" float-label="Select Device Type"
              radio color="grey-9" :options="deviceOptions" />
          </div>
          <!-- Final upload button toggle -->
          <div class="col-12 col-lg-4 group" align="right">
            <q-btn :disabled="formData.device.id == ''" v-if="scanningActive" color="primary" label="Start scan"
              @click="fnStartScanner" />
            <q-btn v-if="tempTableData.length > 0" class="common-btn q-py-xs" label="Upload" @click="finalSubmit" />
            <q-btn v-else class="disabled common-btn q-py-xs no-pointer-events" label="Upload" @click="finalSubmit" />
          </div>
          <!--ENDv-model: table title -->
        </div>
        <!--START: table Data -->
        <q-table :rows="tempTableData" :columns="columnData" table-class="customTableClass shadow-0"
          :filter="filterSearch" :pagination="paginationControl" row-key="index" :loading="tableAjaxLoading"
          color="light-blue">
          <q-td v-slot:body-cell-action="props" :props="props">
            <q-btn @click="removeScannedItems(props.row)" label="Remove" icon="close" color="red-6" size="sm" />
          </q-td>
          <template slot="top">
            <!--START: table filter,search -->
            <div class="col-md-5">
              <q-input clearable color="grey-9" v-model="filterSearch" placeholder="Type.." float-label="Search .."
                class="q-mr-lg q-py-sm" />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
      </div>
    </q-page>
  </template>
    
  <script>
import { required } from '@vuelidate/validators';

  // import VueBarcodeScanner from "vue-barcode-scanner";
  // Vue.use(VueBarcodeScanner);
  
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "addDeviceScan",
  
    data() {
      return {
        filterSearch: "",
  
        scanningActive: true,
        deviceOptions: [],
  
        //Defining columns for table unassigned
        columnData: [
          {
            name: "deviceSerialNumbers",
            required: true,
            label: "Serial Number",
            align: "left",
            field: "deviceSerialNumbers",
            sortable: true
          },
          {
            name: "action",
            required: true,
            label: "",
            align: "left",
            field: "action"
          }
        ],
  
        tempTableData: [],
  
        formData: {
            // aggregator: "",
         
          device: {
            id: "",
            isDisable: false
          },
          deviceSerialNumbers: []
        },
        // dropdDown: {
        //   aggregatorOptions: [],
        //   // deviceOption: [],
        // },
  
        paginationControl: {
          rowsPerPage: 10
        },
  
        tableAjaxLoading: false
      };
    },
  
    computed: {
      ...mapGetters("InventoryScanAddDevice", [
        "getAddDeviceScannedItems",
        "getAllInventoryDevicesTypesData", "getAllPhonepeInventoryDevicesTypesData"
      ]),
      ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
      ...mapGetters("superAdminAggregatorsDevice", ["getCreatedActiveDeviceList"])
    },
  
    created() {
      // this.fetchAggregatorList();
      this.AggregatorsDevice();
    },
  
    methods: {
      ...mapActions("InventoryScanAddDevice", [
        "REACTIVE_ADD_SCANNED_DEVICE_DATA",
        "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
        "FEED_DEVICE_SCAN_BY_ID_DATA","FEED_PHONE_PE_DEVICE_SCAN_BY_ID_DATA"
      ]),
      ...mapActions("VerifyDevice", [
        "VERIFY_DEVICE_BEFORE_ADDING_CENTRAL_INVENTORY", "AGGREGATORS_VERIFY_DEVICE_BEFORE_ADDING_CENTRAL_INVENTORY"
      ]),
      ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
      ...mapActions("superAdminAggregatorsDevice", ["GET_ACTIVE_CREATED_DEVICE_LIST"]),
      // fetchAggregatorList() {
      //   let self = this;
      //   let cookedArr = [];
      //   self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
      //     .then(() => {
      //       return _.map(self.getActiveCreatedAggregatorList, (item) => {
      //         console.log("ITEM -------->", item)
      //         cookedArr.push({
      //           value: item.id,
      //           label: item.name
      //         });
      //         console.log("cookedArr -------->", cookedArr)
      //         self.dropdDown.aggregatorOptions = cookedArr;
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
                value: item.id,
                label: item.deviceName
              });
              console.log("cookedArr1 -------->", cookedArr1)
              self.deviceOptions = cookedArr1;
            })
          })
      },
      // fnAjaxPopulateAllDevicesTypes() {
      //   this.FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA().then(response => {
      //     let tempArr = [];
      //     this.getAllInventoryDevicesTypesData.map(function(value, index) {
      //       tempArr.push({ label: value.deviceName, value: value.id });
      //     });
      //     this.deviceOptions = tempArr;
      //   });
      // },
  
      fnDisableDeviceTypeSelection() {
        console.log("fnDisableDeviceTypeSelection ----->",this.scanningActive)
        if (!this.scanningActive) {
          this.scanningActive = true;
        }
        this.$barcodeScanner.destroy();
      },
  
      fnStartScanner() {
        this.$barcodeScanner.init(this.onBarcodeScanned);
        this.scanningActive = false;
      },
  
      // fnStopScanner() {
      //   this.scanningActive = true;
      //   this.$barcodeScanner.destroy();
      // },
  
      // Create callback function to receive barcode when the scanner is already done
      onBarcodeScanned(barcode) {
        let duplicatecheckSum = _.find(this.tempTableData, function (oo) {
          return oo.deviceSerialNumbers == barcode;
        });
        if (duplicatecheckSum == undefined) {
          this.AGGREGATORS_VERIFY_DEVICE_BEFORE_ADDING_CENTRAL_INVENTORY({
            device: this.formData.device.id,
            barcode: barcode
          })
            .then(response => {
              this.tempTableData.push({
                deviceSerialNumbers: barcode
              });
            })
            .catch(() => {
              this.$q.notify({
                color: "primary",
                position: "bottom",
                message: barcode + " - device already available in the inventory",
                icon: "info"
              });
            });
        } else {
          this.$q.notify({
            color: "primary",
            position: "bottom",
            message: barcode + " - device already scanned",
            icon: "info"
          });
        }
        /* Send duplicate avoided values to state => action  */
        // this.REACTIVE_ADD_SCANNED_DEVICE_DATA(
        //   _.uniqBy(this.tempTableData, "deviceSerialNumbers")
        // );
      },
  
      //Function to remove scanned items
      removeScannedItems(item) {
        // this.getAddDeviceScannedItems.splice(item.__index, 1);
        // this.tempTableData.splice(item.__index, 1);
        this.tempTableData.splice(item.__index, 1);
        if (this.tempTableData.length == 0) {
          this.scanningActive = true;
        }
        // this.REACTIVE_ADD_SCANNED_DEVICE_DATA(this.getAddDeviceScannedItems);
      },
  
      //Function to final submit all devices scanned
      finalSubmit() {
        let cookedArr = [];
        this.tempTableData.map(function (value, index) {
          cookedArr.push(value.deviceSerialNumbers);
        });
        this.formData.deviceSerialNumbers = cookedArr;
        let param = {
          // aggregatorId: this.formData.aggregator,
          deviceId: this.formData.device.id,
          request: {
            deviceSerialNumbers: this.formData.deviceSerialNumbers
          }
        };
        this.FEED_PHONE_PE_DEVICE_SCAN_BY_ID_DATA(param)
          .then(response => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Devices are added successfully!",
              icon: "thumb_up"
            });
            this.$router.push("/inventory/PhonepeInventory");
          })
          .catch(error => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Error in updating devices!",
              icon: "thumb_down"
            });
          });
      }
    }
  };
  </script>
  
