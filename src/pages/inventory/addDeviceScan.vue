<template>
  <q-page>
    <!-- content -->
    <div>
      <div class="row bottom-border q-px-md q-py-md items-center">
        <!--START: table title -->
        <div class="col-md-8 q-title text-weight-regular text-grey-9">Bijlipay Add New Devices - Scan & Upload</div>
        <div class="col-md-12 col-md-6 q-pt-md group" align="right">
          <q-btn @click="$router.push('/inventory/central')" outline label="Cancel Allocation" color="negative" />
        </div>
        <!--END: table title -->
      </div>
      <div class="row bottom-border q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <!--START: table title -->
        <div class="col" ref="clickHeretoStartParent">
          <q-select ref="clickHeretoStartChild" @input="fnDisableDeviceTypeSelection"
            :disable="tempTableData.length > 0" v-model="formData.device.id" float-label="Select Device Type" radio
            color="grey-9" :options="deviceOptions" />
        </div>
        <!-- Invoice Number Field with margin -->
        <div class="col q-ml-md">
          <q-input type="text" :disable="tempTableData.length > 0" float-label="Invoice Number" color="grey-9" @blur="$v.formData.invoiceNumber.$touch"
            :error="$v.formData.invoiceNumber.$error" v-model="formData.invoiceNumber" />
        </div>
        <!-- Final upload button toggle -->
        <div class="col group" align="right">
          <q-btn :disabled="!isScanButtonEnabled"  v-if="scanningActive" color="primary" label="Start scan"
            @click="fnStartScanner" />
          <q-btn v-if="tempTableData.length > 0" class="common-btn q-py-xs" label="Upload" @click="finalSubmit" />
          <q-btn v-else class="disabled common-btn q-py-xs no-pointer-events" label="Upload" @click="finalSubmit" />
        </div>
        <!--END: table title -->
      </div>
      <!--START: table Data -->
      <q-table :data="tempTableData" :columns="columnData" table-class="customTableClass shadow-0"
        :filter="filterSearch" :pagination.sync="paginationControl" row-key="index" :loading="tableAjaxLoading"
        color="light-blue">
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <q-btn @click="removeScannedItems(props.row)" label="Remove" icon="close" color="red-6" size="sm" />
        </q-td>
        <template slot="top">
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-search clearable color="grey-9" v-model="filterSearch" placeholder="Type.." float-label="Search .."
              class="q-mr-lg q-py-sm" />
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
  import {
    required,
    requiredIf,
    email,
    minLength,
    maxLength,
    alpha,
    alphaNum,
    numeric
  } from "vuelidate/lib/validators";
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
          device: {
            id: "",
            isDisable: false
          },
          invoiceNumber: '',
          deviceSerialNumbers: []
        },

        paginationControl: {
          rowsPerPage: 10
        },

        tableAjaxLoading: false
      };
    },
    validations: {
      formData: {
        invoiceNumber: {
          required
        },
      }
    },
    computed: {
      ...mapGetters("InventoryScanAddDevice", [
        "getAddDeviceScannedItems",
        "getAllInventoryDevicesTypesData"
      ]),
      isScanButtonEnabled() {
    return this.formData.device.id !== "" && this.formData.invoiceNumber.trim() !== "";
  }
    },

    created() {
      this.fnAjaxPopulateAllDevicesTypes();
    },

    methods: {
      ...mapActions("InventoryScanAddDevice", [
        "REACTIVE_ADD_SCANNED_DEVICE_DATA",
        "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
        "FEED_DEVICE_SCAN_BY_ID_DATA"
      ]),
      ...mapActions("VerifyDevice", [
        "VERIFY_DEVICE_BEFORE_ADDING_CENTRAL_INVENTORY"
      ]),

      fnAjaxPopulateAllDevicesTypes() {
        this.FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA().then(response => {
          let tempArr = [];
          this.getAllInventoryDevicesTypesData.map(function (value, index) {
            tempArr.push({ label: value.deviceName, value: value.id });
          });
          this.deviceOptions = tempArr;
        });
      },

      fnDisableDeviceTypeSelection() {
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
          this.VERIFY_DEVICE_BEFORE_ADDING_CENTRAL_INVENTORY({
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
        this.$delete(this.tempTableData, item.__index);
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
          request:{
            device: this.formData.device,
            deviceSerialNumbers: this.formData.deviceSerialNumbers
          },
          invoiceNumber: this.formData.invoiceNumber
        };
        this.FEED_DEVICE_SCAN_BY_ID_DATA(param)
          .then(response => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Devices are added successfully!",
              icon: "thumb_up"
            });
            this.$router.push("/inventory/central");
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
