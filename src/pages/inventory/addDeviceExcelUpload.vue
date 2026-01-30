<template>
    <q-page>
        <!-- content -->
        <div>
            <div class="row bottom-border q-px-md q-py-md items-center">
                <!--START: table title -->
                <div class="col-md-8 q-title text-weight-regular  text-grey-9">Add New Devices - Scan & Upload</div>
                <div class="col-md-4 col-sm-12 col-xs-12 q-title text-weight-regular text-grey-9" align="right">
                   <q-btn
                    @click="$router.push('/inventory/central')"
                    outline
                    label="Go Back"
                    color="black"
                   />
                </div>
                <!--END: table title -->
            </div>

            <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
                <!--START: table title -->
                <div class="col-md-4">
                     <q-select
                        v-model="formData.device_type"
                        float-label="Select Device Type"
                        radio
                        color="grey-9"
                        :options="deviceOptions"
                    />
                </div>
                <div class="col-md-3" align="center">
                      <q-btn
                        @click="openScannerComp"
                        v-if="!scannerToggleOption"
                        color="light-blue"
                        class="q-py-xs" 
                        label="Start Scan"
                    />
                    <q-btn
                        @click="closeScannerComp"
                        v-if="scannerToggleOption"
                        color="negative"
                        class="q-py-xs" 
                        label="Stop Scan"
                    />
                </div>
                <div class="col-md-5" align="right">
                      <q-btn
                        class="common-btn q-py-xs" 
                        label="Upload"
                        @click="finalSubmit"
                    />
                </div>
                <!--END: table title -->
            </div>

             <!--START: table Data -->
            <q-table :data="getAddDeviceScannedItems" :columns="columnData" table-class="customTableClass shadow-0" :filter="filterSearch" :pagination.sync="paginationControl" row-key="index" :loading="tableAjaxLoading"
            color="light-blue">

                <q-td slot="body-cell-action" slot-scope="props" :props="props">
                   <q-btn
                   @click="removeScannedItems(props.row)"
                    label="Remove"
                    icon="close"
                    color="red-6"
                    size="sm"
                   />
                </q-td>

                <template slot="top" slot-scope="props">
                    <!--START: table filter,search -->
                    <div class="col-md-5">
                    <q-search
                        clearable
                        color="grey-9"
                        v-model="filterSearch"
                        placeholder="Type.."
                        float-label="Search .."
                        class="q-mr-lg q-py-sm"
                    />
                    </div>
                    <!--END: table filter,search -->
                </template>
            </q-table>
        </div>
	</q-page>
</template>

<script>
import Vue from "vue";
import VueBarcodeScanner from "vue-barcode-scanner";
Vue.use(VueBarcodeScanner);

import { mapGetters, mapActions } from "vuex";
export default {
  name: "deviceRecoveryTrackerFaultyScanner",

  data() {
    return {
      filterSearch: "",
      scannerToggleOption: false,
      deviceOptions: [
        {
          value: 1,
          label: "mGPRS"
        },
        {
          value: 2,
          label: "GPRS"
        },
        {
          value: 3,
          label: "mPOS"
        }
      ],
      //Defining columns for table unassigned
      columnData: [
        {
          name: "device_type",
          required: true,
          label: "Device Type",
          align: "left",
          field: "device_type",
          sortable: true
        },
        {
          name: "serial_number",
          required: true,
          label: "Serial Number",
          align: "left",
          field: "serial_number",
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
      tableData: [
        {
          serial_number: 3366525,
          device_type: "mPOS"
        },
        {
          serial_number: 3366525,
          device_type: "mPOS"
        },
        {
          serial_number: 3366525,
          device_type: "mPOS"
        },
        {
          serial_number: 3366525,
          device_type: "mPOS"
        },
        {
          serial_number: 3366525,
          device_type: "mPOS"
        },
        {
          serial_number: 3366525,
          device_type: "mPOS"
        },
        {
          serial_number: 3366525,
          device_type: "mPOS"
        },
        {
          serial_number: 3366525,
          device_type: "mPOS"
        }
      ],

      tempTableData: [],
      formData: {
        devices: this.getAddDeviceScannedItems,
        device_type: ""
      },
      paginationControl: {
        rowsPerPage: 10
      },
      tableAjaxLoading: false
    };
  },

  computed: {
    ...mapGetters("InventoryScanAddDevice", ["getAddDeviceScannedItems"])
  },

  methods: {
    ...mapActions("InventoryScanAddDevice", [
      "REACTIVE_ADD_SCANNED_DEVICE_DATA"
    ]),

    // Create callback function to receive barcode when the scanner is already done
    onBarcodeScanned(barcode) {
      this.tempTableData.push({
        device_type: "mPOS",
        serial_number: barcode
      });
      // do something...
      this.REACTIVE_ADD_SCANNED_DEVICE_DATA(this.tempTableData);
      console.log(this.tempTableData);
    },
    // onBarcodeDestroy() {
    //   removeListener("keypress");
    //   removeListener("keydown");
    // },

    openScannerComp() {
      this.$q.notify({
        color: "positive",
        position: "bottom",
        message: "Scan mode activated!",
        icon: "search"
      });
      this.scannerToggleOption = !this.scannerToggleOption;
      if (!this.$barcodeScanner.hasListener()) {
        this.$barcodeScanner.init(this.onBarcodeScanned);
      }
    },
    closeScannerComp() {
      this.$q.notify({
        color: "negative",
        position: "bottom",
        message: "Scan mode deactivated!",
        icon: "close"
      });
      this.scannerToggleOption = !this.scannerToggleOption;
      this.$barcodeScanner.destroy(this.onBarcodeDestroy);
    },
    removeScannedItems(item) {
      this.getAddDeviceScannedItems.splice(item.__index);
      this.REACTIVE_ADD_SCANNED_DEVICE_DATA(this.getAddDeviceScannedItems);
    },

    finalSubmit() {
      this.$q.notify({
        color: "positive",
        position: "bottom",
        message: "Devices are added successfully!",
        icon: "thumb_up"
      });
    }
  }
};
</script>