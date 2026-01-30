<template>
  <q-page>
    <!-- content -->
    <div>
      <div class="row bottom-border q-px-md q-py-md items-center">
        <!--START: table title -->
        <div class="col-6 col-md-6 q-title text-weight-regular text-grey-9">Bijlipay Faulty Inventory</div>
        <div class="col-6 col-md-6" align="right">
          <q-btn
            icon="attach_file"
            @click="bulkUploadFaultyDevices"
            outline
            color="dark"
            label="Bulk upload"
          />
        </div>
        <!--END: table title -->
      </div>
      <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <div class="col-6 col-md-6">
          <q-input v-model="podNumber" float-label="Enter POD number" color="grey-9" />
        </div>
        <div class="col-6 col-md-6" align="right">
          <q-btn
            @click="fnAjaxFaultyInventoryData"
            color="light-blue"
            class="q-py-xs"
            label="Submit"
          />
        </div>
      </div>
      <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <!--START: table title -->
        <div class="col-6 col-md-6">
          <q-select
            :disable="disableDeviceTypeSelection"
            @input="fnSetDevicesByDeviceId"
            v-model="formData.device_type"
            float-label="Select Device Type"
            color="grey-9"
            :options="deviceOptions"
          />
        </div>
        <div class="col-6 col-md-6" align="right">
          <q-btn
            :disabled="formData.device_type == '' || formData.region == ''"
            @click="openScannerComp"
            v-if="scannerToggleOption"
            color="light-blue"
            class="q-py-xs"
            label="Start scan"
          />
        </div>
      </div>
      <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <div class="col-12 group" align="right">
          <q-btn
            :disabled="disabledButton"
            class="q-py-xs"
            icon="build"
            outline
            color="amber-9"
            label="Send to repair"
            @click="fnFinalFaultySubmit(1)"
          />

          <q-btn
            :disabled="disabledButton"
            class="q-py-xs"
            icon="check"
            outline
            color="positive"
            label="Accept Devices"
            @click="fnFinalFaultySubmit(2)"
          />
        </div>
        <!--END: table title -->
      </div>

      <!-- <div class="row text-weight-regular text-grey-9">
        <div class="col group" v-for="(item,index) in formData.scannedItems" :key="index">
            <q-card class="shadow-4">
              <q-list highlight separator>
                <q-list-header style="border-bottom: 1px solid #ccc;">
                  <q-icon style="color:#202c3f" name="fas fa-tablet-alt"/> {{item.device.name}} 
                </q-list-header>
                <q-scroll-area
                  style="height:400px"
                  :thumb-style="{
                    right: '4px',
                    borderRadius: '5px',
                    background: 'grey',
                    width: '5px',
                    opacity: 0.5
                  }"
                  :delay="1500"
                >
                  <div v-if="item.deviceSerialNumbers.length > 0">
                    <q-item separator class=" text-light-blue" v-for="(subItem,subIndex) in item.deviceSerialNumbers" :key="subIndex">
                      <q-item-main class="q-body-1">{{subItem}}</q-item-main>
                      <q-item-side>
                        <q-btn round size="sm" color="negative" icon="clear" @click="fnRemoveScannedItems(index,subIndex)" />
                      </q-item-side>
                    </q-item>
                  </div>
                  <div v-else>
                    <q-item>
                      <q-item-main class="q-body-1">No data to display</q-item-main>
                      <q-item-side><q-btn round size="sm" color="negative" @click="fnRemoveDeviceTypeFromList(index)" icon="clear" /></q-item-side>
                    </q-item>
                  </div>
                </q-scroll-area>
              </q-list>
            </q-card>
        </div>
      </div>-->
      <!--START: table lead validation -->
      <q-table
        row-key="name"
        :filter="filter"
        :data="tableData"
        class="q-py-none"
        :columns="columns"
        title="Lead Validation"
        table-class="customTableClass"
        :pagination.sync="paginationControl"
      >
        <!--START: table body modification -->
        <q-td
          slot="body-cell-deviceType"
          slot-scope="props"
          :props="props"
        >{{props.row.device.name}}</q-td>
        <q-td
          slot="body-cell-serialNumber"
          slot-scope="props"
          :props="props"
        >{{props.row.serialNumber}}</q-td>
        <q-td slot="body-cell-status" slot-scope="props" :props="props">
          <q-btn flat v-if="props.row.status == true" icon="check" color="positive" />
          <q-btn flat v-else-if="props.row.status == false" icon="clear" color="negative" />
          <q-btn flat color="amber-9" v-else icon="warning" />
        </q-td>
        <!-- END: table body modification -->
        <template slot="top"  class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-search
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search by SO name, Merchant Name, Lead ID"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
      <!--START: Open showPDOmodal model -->
      <showPDOmodal
        v-if="showPDOmodal"
        :propshowPDOmodal="showPDOmodal"
        :propAllScannedItemArr="formData"
        @closeModel="fnAllocateDeviceToRegion"
      ></showPDOmodal>
      <!--END: Open showPDOmodal model -->
      <!--START: Open showPDOmodal model -->
      <faultyBulkUploadModal
        v-if="toggleFaultyBulkUpload"
        :propBulkUpload="toggleFaultyBulkUpload"
        :propAllDevicestypes="deviceOptions"
        @closeModel="bulkUploadFaultyDevices"
      ></faultyBulkUploadModal>
      <!--END: Open showPDOmodal model -->
    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
import VueBarcodeScanner from "vue-barcode-scanner";
Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import showPDOmodal from "../../components/inventory/showFaultymodal.vue";
import faultyBulkUploadModal from "../../components/inventory/faultyBulkUploadModal.vue";
export default {
  name: "allocateDevice",
  components: {
    showPDOmodal,
    faultyBulkUploadModal
  },
  data() {
    return {
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
    ...mapGetters("InventoryCentral", [
      "getAllInventoryDevicesTypesData",
      "getAllRegionsData",
      "getInvenotryAsFaultyData"
    ]),
    disabledButton() {
      return _.find(this.formData.scannedItems, function(oo) {
        return oo.deviceSerialNumbers.length > 0 ? true : false;
      }) == undefined
        ? true
        : false;
    }
  },
  created() {
    this.fnAjaxGetAllDevicesTypesData();
    // this.fnAjaxGetAllRegionsData();
    // this.fnAjaxFaultyInventoryData();
  },
  destroyed() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy();
  },

  methods: {
    // ...mapActions("SatDeviceTrackerScanner", ["REACTIVE_SCANNED_DEVICE_DATA"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_REGIONS_DATA",
      "FEED_FAULTY_FINAL_SUBMIT",
      "FETCH_FAULT_INVENTORY_DEVICES_FROM_REGIONAL"
    ]),
    ...mapActions("VerifyDevice", [
      "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID"
    ]),

    // Function to dynamically set column name for scanned items without store
    fnSetDevicesByDeviceId() {
      this.scannerToggleOption = true;
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
      let predictIfDeviceExist = self.formData.scannedItems.find(function(
        value
      ) {
        return value.device.id == self.formData.device_type.id;
      });
      let assumeArr;
      assumeArr = {
        device: {
          name: self.formData.device_type.deviceName,
          id: self.formData.device_type.id
        },
        deviceSerialNumbers: predictIfDeviceExist.deviceSerialNumbers
      };
      let finalAssumation = _.find(assumeArr.deviceSerialNumbers, function(oo) {
        return oo == barcode;
      });
      if (finalAssumation == undefined) {
        this.DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID({
          device: self.formData.device_type.id,
          barcode: barcode
        })
          .then(() => {
            assumeArr.deviceSerialNumbers.push(barcode);
            let findDeviceSerialNumber = _.find(this.tableData, function(oo) {
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
    fnAjaxGetAllDevicesTypesData() {
      this.FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA()
        .then(() => {
          let assumeArr = [];
          this.getAllInventoryDevicesTypesData.map(function(value, index) {
            assumeArr.push({
              label: value.deviceName,
              value: value
            });
          });
          this.deviceOptions = assumeArr;
        })
        .catch(error => {
          this.deviceOptions = [];
        });
    },

    // Function to get ll faulty inventorey data
    fnAjaxFaultyInventoryData() {
      this.FETCH_FAULT_INVENTORY_DEVICES_FROM_REGIONAL(this.podNumber)
        .then(() => {
          this.disableDeviceTypeSelection = false;
          let cookedArr = [];
          _.map(this.getInvenotryAsFaultyData, function(oo) {
            cookedArr.push({
              serialNumber: oo.serialNumber,
              deviceName: oo.device.deviceName,
              device: oo.device.id,
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

          this.FEED_FAULTY_FINAL_SUBMIT(assumeArr)
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
