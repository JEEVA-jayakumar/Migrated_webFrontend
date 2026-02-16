<template>
  <div class="q-pa-md group">
    <div class="row">
      <!--START: table title -->
      <div class="col">
        <q-select
          clearable
          :disable="formData.region == ''"
          @clear="fnClearingDeviceTypeSelection"
          @input="fnSetDevicesByDeviceId"
          v-model="formData.device_type"
          float-label="Select Device Type"
          color="grey-9"
          :options="deviceOptions"
        />
      </div>
      <div class="col-auto" align="center">
        <q-btn
          :disabled="formData.device_type == ''"
          @click="openScannerComp"
          v-if="scannerToggleOption"
          color="light-blue"
          class="q-py-xs"
          label="Start scan"
        />
      </div>
      <div class="col" align="right">
        <q-btn icon="check" outline class="q-py-xs" label="Submit" @click="toggleDamagedDevices"/>
      </div>
    </div>
    <!--END: table title -->
    <div class="row text-weight-regular text-grey-9">
      <div class="col group" v-for="(item,index) in formData.scannedItems" :key="index">
        <q-card class="shadow-4">
          <q-list highlight separator>
            <q-item-label header style="border-bottom: 1px solid #ccc;">
              <q-icon style="color:#202c3f" name="fas fa-tablet-alt"/>
              {{item.device.deviceName}}
            </q-item-label header>
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
                <q-item
                  separator
                  class="text-light-blue"
                  v-for="(subItem,subIndex) in item.deviceSerialNumbers"
                  :key="subIndex"
                >
                  <q-item-section class="text-body1">{{subItem}}</q-item-section>
                  <q-item-section>
                    <q-btn
                      round
                      size="sm"
                      color="negative"
                      icon="clear"
                      @click="fnRemoveScannedItems(index,subIndex)"
                    />
                  </q-item-section>
                </q-item>
              </div>
              <div v-else>
                <q-item>
                  <q-item-section class="text-body1">No data to display</q-item-section>
                  <q-item-section>
                    <q-btn
                      round
                      size="sm"
                      color="negative"
                      @click="fnRemoveDeviceTypeFromList(index)"
                      icon="clear"
                    />
                  </q-item-section>
                </q-item>
              </div>
            </q-scroll-area>
          </q-list>
        </q-card>
      </div>
    </div>
    <!--START >>  Show Add Device Component -->
    <showRegionalInventoryDevicePod
      v-if="showPDOmodal"
      :propShowPDOmodal="showPDOmodal"
      :propAllScannedItemArr="formData"
      @closeModel="toggleDamagedDevices"
      @emittedAfterPODsubmission="fnClearingDeviceTypeSelection"
    />
    <!--END >>  Show Add Device Component -->
  </div>
</template>

<script>

// import VueBarcodeScanner from "vue-barcode-scanner";
import showRegionalInventoryDevicePod from "./showRegionalInventoryDevicePod.vue";
// Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
export default {
  name: "damagedDevices",
  components: {
    showRegionalInventoryDevicePod
  },
  data() {
    return {
      filterSearch: "",
      scannerToggleOption: true,
      showPDOmodal: false,
      deviceOptions: [],
      tempTableData: [],
      formData: {
        region: JSON.parse(localStorage.getItem("u_i")).region.id,
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
    ...mapGetters("InventoryCentral", ["getAllInventoryDevicesTypesData"])
  },
  created() {
    this.fnAjaxGetAllDevicesTypesData();
  },
  unmounted() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy();
  },

  methods: {
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA"
    ]),
    ...mapActions("VerifyDevice", [
      "VERIFY_DEVICE_ON_REGIONAL_TO_CENTRAL_FOR_FAULTY"
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
            deviceName: self.formData.device_type.deviceName,
            id: self.formData.device_type.id
          },
          deviceSerialNumbers: []
        });
      }
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
          deviceName: self.formData.device_type.deviceName,
          id: self.formData.device_type.id
        },
        deviceSerialNumbers: predictIfDeviceExist.deviceSerialNumbers
      };
      let finalAssumation = _.find(assumeArr.deviceSerialNumbers, function(oo) {
        return oo == barcode;
      });
      if (finalAssumation == undefined) {
        this.VERIFY_DEVICE_ON_REGIONAL_TO_CENTRAL_FOR_FAULTY({
          device: self.formData.device_type.id,
          barcode: barcode
        })
          .then(() => {
            assumeArr.deviceSerialNumbers.push(barcode);
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
      formData.scannedItems[index].deviceSerialNumbers.splice(subIndex, 1);
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

    // Function to delete the entire device based information
    fnRemoveDeviceTypeFromList(index) {
      this.formData.scannedItems.splice(index, 1);
    },

    // Function to clear device type
    fnClearingDeviceTypeSelection(closeModal) {
      this.formData.device_type = "";
      this.formData.scannedItems = [];
    },

    //Final submission of damaged devices
    toggleDamagedDevices() {
      this.showPDOmodal = !this.showPDOmodal;
    }
  }
};
</script>