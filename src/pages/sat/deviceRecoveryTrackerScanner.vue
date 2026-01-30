<template>
  <q-page>
    <!-- content -->
    <div>
      <div class="row bottom-border q-px-md q-py-md items-center">
        <!--START: table title -->
        <div
          class="col-md-8 q-title text-weight-regular text-grey-9"
        >Device Recovery Tracker - Inventory</div>
        <div class="col-md-4 q-title text-weight-regular text-grey-9" align="right">
          <q-btn
            @click="openScannerComp"
            v-if="!scannerToggleOption"
            flat
            class="common-dark-blue q-py-xs"
            label="Start Scan"
          />
          <q-btn
            @click="closeScannerComp"
            v-if="scannerToggleOption"
            flat
            class="common-dark-blue q-py-xs"
            label="Stop Scan"
          />
        </div>
        <!--END: table title -->
      </div>

      <!--START: table Data -->
      <q-table
        :data="getDeviceScannedItems"
        :columns="columnData"
        table-class="customTableClass shadow-0"
        :filter="filterSearch"
        :pagination.sync="paginationControl"
        row-key="index"
        :loading="tableAjaxLoading"
        color="light-blue"
      >
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
  name: "deviceRecoveryTrackerScanner",

  data() {
    return {
      scannerToggleOption: false,
      tableFilterOptions: [
        {
          label: "NH",
          value: 1
        },
        {
          label: "RSM",
          value: 2
        },
        {
          label: "ASM",
          value: 3
        },
        {
          label: "TL",
          value: 4
        },
        {
          label: "SO",
          value: 5
        }
      ],
      tableFilter: "",
      tabsModel: "unassigned",
      filter_values: "",
      filterSearch: "",
      assignToOptions: [
        {
          label: "NH",
          value: 1
        },
        {
          label: "RSM",
          value: 2
        },
        {
          label: "ASM",
          value: 3
        },
        {
          label: "TL",
          value: 4
        },
        {
          label: "SO",
          value: 5
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
        selectedUsersToAssign: []
      },
      paginationControl: {
        rowsPerPage: 10
      },
      tableAjaxLoading: false
    };
  },

  computed: {
    ...mapGetters("SatDeviceTrackerScanner", ["getDeviceScannedItems"])
  },

  methods: {
    ...mapActions("SatDeviceTrackerScanner", ["REACTIVE_SCANNED_DEVICE_DATA"]),

    // Create callback function to receive barcode when the scanner is already done
    onBarcodeScanned(barcode) {
      this.tempTableData.push({
        device_type: "mPOS",
        serial_number: barcode
      });
      // do something...
      this.REACTIVE_SCANNED_DEVICE_DATA(this.tempTableData);
      console.log(this.tempTableData);
    },
    openScannerComp() {
      this.scannerToggleOption = !this.scannerToggleOption;
      if (!this.$barcodeScanner.hasListener()) {
        this.$barcodeScanner.init(this.onBarcodeScanned);
      }
    },
    closeScannerComp() {
      this.scannerToggleOption = !this.scannerToggleOption;
      this.$barcodeScanner.destroy();
    },
    removeScannedItems(item) {
      this.getDeviceScannedItems.splice(item.__index);
      this.REACTIVE_SCANNED_DEVICE_DATA(this.getDeviceScannedItems);
    }
  }
};
</script>

