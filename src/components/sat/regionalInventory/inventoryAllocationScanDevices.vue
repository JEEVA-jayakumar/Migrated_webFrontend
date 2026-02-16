<template>
    <q-dialog
    v-model="propShowDeviceVerificationComponent"
    maximized
    no-backdrop-dismiss	
    no-esc-dismiss	
    :content-css="{marginTop:'100px',minWidth: '40vw'}"
    class="customModalOverlay"
    >
    <div>
      <div class="row bottom-border q-px-md q-py-md items-center">
          <!--START: table title -->
          <div class="col-md-8 text-h6 text-weight-regular  text-grey-9">Regional Inventory Disptached Devices Verification</div>
          <div class="col-md-4 col-sm-12 col-xs-12 text-h6 text-weight-regular text-grey-9" align="right">
              <q-btn
              outline
              label="Cancel"
              color="negative"
              />
          </div>
          <!--END: table title -->
      </div>

      <div class="row bottom-border group q-px-md q-py-md items-center text-weight-regular text-grey-9">
          <!--START: table title -->
            <div class="col-md-3">
                <q-select
                  @input="fnSetDevicesByDeviceId"
                  v-model="formData.device_type"
                  float-label="Select Device Type"
                  radio
                  color="grey-9"
                  :options="deviceOptions"
              />
            </div>
          <!-- <div class="col-md-2" align="center">
                <q-btn
                  @click="openScannerComp"
                  v-if="!scannerToggleOption"
                  color="light-blue"
                  class="q-py-xs" 
                  label="Scan"
              />
              <q-btn
                  @click="closeScannerComp"
                  v-if="scannerToggleOption"
                  color="negative"
                  class="q-py-xs" 
                  label="Stop"
              />
          </div> -->
          <!-- <div class="col-md-2" align="right">
                <q-btn
                  outline
                  class="q-py-xs" 
                  label="Add to cart"
                  @click="fnAllocateDeviceToRegion"
              />
          </div> -->
          <!--END: table title -->
      </div>

      <div class="row text-weight-regular text-grey-9">
          <div class="col group" v-for="(item,index) in formData.scannedItems" :key="index">
          <q-card class="shadow-4">
            <q-list highlight separator>
              <q-item-label header style="border-bottom: 1px solid #ccc;">
                <q-icon style="color:#202c3f" name="fas fa-tablet-alt"/> {{item.device.name}} 
              </q-item-label header>
              <div v-if="item.deviceSerialNumbers.length > 0">
                <q-item separator class=" text-light-blue" v-for="(subItem,subIndex) in item.deviceSerialNumbers" :key="subIndex">
                  <q-item-section class="text-body1">{{subItem.barcode}}</q-item-section>
                  <q-item-section>
                    <q-btn flat v-if="subitem.checksum" round size="sm" color="positive" icon="check" />
                    <q-btn flat v-if="!subitem.checksum" round size="sm" color="negative" icon="clear" />
                  </q-item-section>
                </q-item>
              </div>
              <div v-else>
                <q-item>
                  <q-item-section class="text-body1">No data to display</q-item-section>
                  <q-item-section><q-btn round size="sm" color="negative" @click="fnRemoveDeviceTypeFromList(index)" icon="clear" /></q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-card>
          </div>
      </div>
        
      <!--START: Open showPDOmodal model -->
      <showPDOmodal 
      v-if="showPDOmodal" 
      :propshowPDOmodal="showPDOmodal" 
      :propAllScannedItemArr="formData"
      @closeModel=fnAllocateDeviceToRegion
      ></showPDOmodal>
      <!--END: Open showPDOmodal model -->
    </div>
	</q-dialog>
</template>

<script>
import { and } from '@vuelidate/validators';

// import VueBarcodeScanner from "vue-barcode-scanner";
// Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
export default {
  name: "allocateDevice",
  props: ["propShowDeviceVerificationComponent"],
  data() {
    return {
      filterSearch: "",
      scannerToggleOption: false,
      showPDOmodal: false,
      regionOptions: [],
      deviceOptions: [],

      tempTableData: [],
      formData: {
        region: "",
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
      "getAllRegionsData"
    ]),

    ...mapGetters("SA_Devices", ["getAllDevicesInfo"])
  },
  created() {
    this.fnAjaxGetAllDevicesTypesData();
    this.fnAjaxGetAllRegionsData();
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
      "FETCH_ALL_REGIONS_DATA"
    ]),

    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),

    // Function to dynamically set column name for scanned items without store
    fnSetDevicesByDeviceId() {
      // Set local variable for this
      let self = this;
      self.openScannerComp();

      // Get device type object from array using selected dvice type by user
      let predictIfDeviceExist = self.formData.scannedItems.filter(function(
        value
      ) {
        return value.device.id == self.formData.device_type.id;
      });

      // Push scanned item values into array
      if (predictIfDeviceExist.length > 0) {
      } else {
        self.formData.scannedItems.unshift({
          device: {
            name: self.formData.device_type.deviceName,
            id: self.formData.device_type.id
          },
          deviceSerialNumbers: []
        });
      }
    },

    // Create callback function to receive barcode when the scanner is already done
    onBarcodeScanned(barcode) {
      let self = this;
      let predictIfDeviceExist = self.formData.scannedItems.filter(function(
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
        deviceSerialNumbers: predictIfDeviceExist[0].deviceSerialNumbers
      };

      //TODO => api call to check if barcode with POD number exists
      //Condition to check if scanned item and current POD is proper??

      if (response) {
        assumeArr.deviceSerialNumbers.push({
          barcode: barcode,
          checksum: true
        });
      } else {
        assumeArr.deviceSerialNumbers.push({
          barcode: barcode,
          checksum: false
        });
      }
      return _.uniqBy(assumeArr, "barcode");
    },

    openScannerComp() {
      this.$q.notify({
        color: "positive",
        position: "bottom",
        message: "You have selected " + this.formData.device_type.deviceName,
        icon: "list"
      });
      if (!this.$barcodeScanner.hasListener()) {
        this.$barcodeScanner.init(this.onBarcodeScanned);
      }
    },

    // closeScannerComp() {
    //   this.scannerToggleOption = !this.scannerToggleOption;
    //   this.$barcodeScanner.destroy();
    // },

    // Function remove scanned items
    fnRemoveScannedItems(index, subIndex) {
      this.formData.scannedItems[index].deviceSerialNumbers.splice(subIndex, 1);
    },

    // Function to final submit for allocate device
    fnAllocateDeviceToRegion() {
      this.showPDOmodal = !this.showPDOmodal;
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

    // Function to get ll regiosn data
    fnAjaxGetAllRegionsData() {
      this.FETCH_ALL_REGIONS_DATA()
        .then(() => {
          let assumeArr = [];
          this.getAllRegionsData.map(function(value, index) {
            console.log("sdfsafasdsad0", value);
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
      this.formData.scannedItems.splice(index, 1);
    }
  }
};
</script>