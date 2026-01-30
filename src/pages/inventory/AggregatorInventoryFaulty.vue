<template>
  <q-page>
    <!-- content -->
    <div>
      <div class="row bottom-border q-px-md q-py-md items-center">
        <!--START: table title -->
        <div class="col-6 col-md-6 q-title text-weight-regular text-grey-9">Aggregator Faulty Inventory</div>
        <div class="col-6 col-md-6" align="right">
          <q-btn icon="attach_file" @click="bulkUploadFaultyDevices" outline color="dark" label="Bulk upload" />
        </div>
        <!--END: table title -->
      </div>
      <!-- <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <div class="col-md-4">
          <q-select color="grey-9" v-model="aggregator" float-label="Select Aggregator" radio
            :options="aggregatorOptions" @input="getaggregator" />
        </div>
      </div> -->
      <div >
        <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
          <div class="col-6 col-md-6">
            <q-input v-model="podNumber" float-label="Enter POD number" color="grey-9" />
          </div>
          <div class="col-6 col-md-6" align="right">
            <q-btn @click="fnAjaxFaultyInventoryData" color="light-blue" class="q-py-xs" label="Submit" />
          </div>
        </div>
        <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
          <!--START: table title -->
          <div class="col-6 col-md-6">
            <q-select :disable="disableDeviceTypeSelection" @input="fnSetDevicesByDeviceId"
              v-model="formData.device_type" float-label="Select Device Type" color="grey-9" :options="deviceOptions" />
          </div>
          <div class="col-6 col-md-6" align="right">
            <q-btn :disabled="formData.device_type == '' || formData.region == ''" @click="openScannerComp"
              v-if="scannerToggleOption" color="light-blue" class="q-py-xs" label="Start scan" />
          </div>
        </div>
        <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
          <div class="col-12 group" align="right">
            <q-btn :disabled="disabledButton" class="q-py-xs" icon="build" outline color="amber-9"
              label="Send to repair" @click="fnFinalFaultySubmit(1)" />

            <q-btn :disabled="disabledButton" class="q-py-xs" icon="check" outline color="positive"
              label="Accept Devices" @click="fnFinalFaultySubmit(2)" />
          </div>
          <!--END: table title -->
        </div>
        <!--START: table lead validation -->
        <q-table row-key="name" :filter="filter" :data="tableData" class="q-py-none" :columns="columns"
          title="Lead Validation" table-class="customTableClass" :pagination.sync="paginationControl">
          <!--START: table body modification -->
          <q-td slot="body-cell-deviceType" slot-scope="props" :props="props">{{ props.row.device.name }}</q-td>
          <q-td slot="body-cell-serialNumber" slot-scope="props" :props="props">{{ props.row.serialNumber }}</q-td>
          <q-td slot="body-cell-status" slot-scope="props" :props="props">
            <q-btn flat v-if="props.row.status == true" icon="check" color="positive" />
            <q-btn flat v-else-if="props.row.status == false" icon="clear" color="negative" />
            <q-btn flat color="amber-9" v-else icon="warning" />
          </q-td>
          <!-- END: table body modification -->
          <template slot="top" class="bottom-border">
            <!--START: table filter,search -->
            <div class="col-md-5">
              <q-search clearable color="grey-9" v-model="filter" placeholder="Type.."
                float-label="Search by SO name, Merchant Name, Lead ID" class="q-mr-lg q-py-sm" />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
      </div>
      <!--END: table lead validation -->
      <!--START: Open showPDOmodal model -->
      <showPDOmodal v-if="showPDOmodal" :propshowPDOmodal="showPDOmodal" :propAllScannedItemArr="formData"
        @closeModel="fnAllocateDeviceToRegion"></showPDOmodal>
      <!--END: Open showPDOmodal model -->
      <!--START: Open showPDOmodal model -->
      <AggregatorFaultyBulkUploadModal v-if="toggleFaultyBulkUpload" :propBulkUpload="toggleFaultyBulkUpload"
        :propAllDevicestypes="deviceOptions" @closeModel="bulkUploadFaultyDevices"></AggregatorFaultyBulkUploadModal>
      <!--END: Open showPDOmodal model -->
    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
import VueBarcodeScanner from "vue-barcode-scanner";
Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import showPDOmodal from "../../components/inventory/AggregatorShowFaultyModal.vue";
import AggregatorFaultyBulkUploadModal from "../../components/inventory/AggregatorFaultyBulkUploadModal.vue";
export default {
  name: "allocateDevice",
  components: {
    showPDOmodal,
    AggregatorFaultyBulkUploadModal
  },
  data() {
    return {
      // aggregatorOptions: [],
      deviceOptions: [],
      // aggregator: "",
      flag: false,
      disableDeviceTypeSelection: true,
      podNumber: "",
      disableSubmitButton: true,
      toggleFaultyBulkUpload: false,
      filter: "",
      scannerToggleOption: true,
      showPDOmodal: false,
      regionOptions: [],
      deviceOptions: [],
      columns: [
        {
          name: "deviceName",
          required: true,
          label: "Device Type",
          align: "left",
          field: "deviceName",
          sortable: false
        },
        {
          name: "serialNumber",
          required: true,
          label: "Serial number",
          align: "left",
          field: "serialNumber",
          sortable: false
        },
        {
          name: "status",
          required: true,
          label: "",
          align: "left",
          field: "status",
          sortable: true
        }
      ],
      tableData: [],
      // tempTableData: [],
      formData: {
        device_type: "",
        scannedItems: []
      },
      paginationControl: {
        rowsPerPage: 10
      },
      tableAjaxLoading: false
    };
  },

  computed: {
    // ...mapGetters("InventoryScanAddDevice", ["getAddDeviceScannedItems"]),
    ...mapGetters("AggregatorInventoryCentral", [
      "getAllAggregatorInventoryDevicesTypesData",
      "getAggregatorInvenotryAsFaultyData"
    ]),
    ...mapGetters("superAdminAggregatorsDevice", ["getCreatedActiveDeviceList"]),
    ...mapGetters("superAdminAggregators", ["getActiveCreatedAggregatorList"]),
    disabledButton() {
      return _.find(this.formData.scannedItems, function (oo) {
        return oo.deviceSerialNumbers.length > 0 ? true : false;
      }) == undefined
        ? true
        : false;
    }
  },
  mounted() {
    // this.fetchAggregatorList();
    this.AggregatorsDevice();
  },
  // created() {
  //   this.fnAjaxGetAllDevicesTypesData();
  //   // this.fnAjaxFaultyInventoryData();
  // },
  destroyed() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy();
  },

  methods: {
    // ...mapActions("SatDeviceTrackerScanner", ["REACTIVE_SCANNED_DEVICE_DATA"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("AggregatorInventoryCentral", [
      "FETCH_ALL_AGGREGATOR_INVENTORY_DEVICES_TYPES_DATA",
      "FEED_AGGREGATOR_FAULTY_FINAL_SUBMIT",
      "FETCH_AGGREGATOR_FAULT_INVENTORY_DEVICES_FROM_REGIONAL"
    ]),
    ...mapActions("VerifyDevice", [
      "AGGREGATOR_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID"
    ]),
    ...mapActions("superAdminAggregatorsDevice", ["GET_ACTIVE_CREATED_DEVICE_LIST"]),
    ...mapActions("superAdminAggregators", ["GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),

    // Function to dynamically set column name for scanned items without store
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

    fnSetDevicesByDeviceId() {
      this.scannerToggleOption = true;
      this.$barcodeScanner.destroy();
      // Set local variable for this
      let self = this;

      // Get device type object from array using selected dvice type by user
      let predictIfDeviceExist = self.formData.scannedItems.filter(function (
        value
      ) {
        return value.device.id == self.formData.device_type.id;
      });

      // Push scanned item values into array
      if (predictIfDeviceExist.length == 0) {
        self.formData.scannedItems.unshift({
          aggregatorDevice: {
            name: self.formData.device_type.deviceName,
            id: self.formData.device_type.id
          },
          deviceSerialNumbers: []
        });
      }
      //We do not need this function caal right here, since bijlipay team has changed the scope by hgaving faulty inevnto module with POD number
      // this.fnAjaxFaultyInventoryData(self.formData.device_type.id);
      // this.onBarcodeScanned("9781234567897");
    },

    // Create callback function to receive barcode when the scanner is already done
    onBarcodeScanned(barcode) {
      let self = this;
      let predictIfDeviceExist = self.formData.scannedItems.find(function (
        value
      ) {
        console.log("VALUE",JSON.stringify(value));
        return value.aggregatorDevice.id == self.formData.device_type.id;
      });
      let assumeArr;
      assumeArr = {
        aggregatorDevice: {
          name: self.formData.device_type.deviceName,
          id: self.formData.device_type.id
        },
        deviceSerialNumbers: predictIfDeviceExist.deviceSerialNumbers
      };
      console.log("assumeArr ---------->",JSON.stringify(assumeArr));
      let finalAssumation = _.find(assumeArr.deviceSerialNumbers, function (oo) {
        return oo == barcode;
      });
      console.log("onBarcodeScanned inside coming !!!!!!!!!!!!!");
      console.log("barcode ----->",barcode)
      if (finalAssumation == undefined) {
        console.log("If Condition inside coming !!!!!!!!!!!!!")
        this.AGGREGATOR_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID({
          device: self.formData.device_type.id,
          barcode: barcode
        })
          .then(() => {
            assumeArr.deviceSerialNumbers.push(barcode);
            let findDeviceSerialNumber = _.find(this.tableData, function (oo) {
              return (
                oo.serialNumber == barcode &&
                oo.device == self.formData.device_type.id
              );
            });
            findDeviceSerialNumber.status = true;
          })
          .catch(() => {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: barcode + " is invalid",
              icon: "info"
            });
          });
      } else {
        this.$q.notify({
          color: "primary",
          position: "bottom",
          message: barcode + " - already exist in " + assumeArr.device.name,
          icon: "info"
        });
      }
      // this.disabledButton();
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

    // Function to get all device types
    // fnAjaxGetAllDevicesTypesData(aggregator) {
    //   this.FETCH_ALL_AGGREGATOR_INVENTORY_DEVICES_TYPES_DATA(aggregator)
    //     .then(() => {
    //       let assumeArr = [];
    //       this.getAllAggregatorInventoryDevicesTypesData.map(function (value, index) {
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

    // Function to get ll faulty inventorey data
    fnAjaxFaultyInventoryData() {
      this.FETCH_AGGREGATOR_FAULT_INVENTORY_DEVICES_FROM_REGIONAL(this.podNumber)
        .then(() => {
          this.disableDeviceTypeSelection = false;
          let cookedArr = [];
          _.map(this.getAggregatorInvenotryAsFaultyData, function (oo) {
            cookedArr.push({
              serialNumber: oo.serialNumber,
              deviceName: oo.aggregatorDevice.deviceName,
              device: oo.aggregatorDevice.id,
              status: false
            });
          });
          this.tableData = cookedArr;
        })
        .catch(() => {
          this.disableDeviceTypeSelection = true;
        });
    },

    // function for bulk upload
    bulkUploadFaultyDevices() {
      this.toggleFaultyBulkUpload = !this.toggleFaultyBulkUpload;
    },

    fnFinalFaultySubmit(action) {
      this.$q
        .dialog({
          title: "Confirm",
          message:
            "Are you sure want" +
            (action == 1 ? " to send to repair" : "accept devices") +
            "?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          let assumeArr = {
            data: this.formData.scannedItems,
            action: action
          };

          this.FEED_AGGREGATOR_FAULTY_FINAL_SUBMIT(assumeArr)
            .then(() => {
              this.scannerToggleOption = false;
              this.formData = {
                device_type: "",
                scannedItems: []
              };
              this.tableData = [];
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Devices has been updated successfully",
                icon: "thumb_up"
              });
            })
            .catch(() => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Please try again",
                icon: "thumb_down"
              });
            });
        });
    }
  }
};
</script>
