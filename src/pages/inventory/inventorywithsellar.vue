<template>
  <q-page>
    <!-- content -->

    <div>
      <div class="row bottom-border q-px-md q-py-md items-center">
        <!--START: table title -->
        <div
          class="col-6 col-sm-4 col-md-8 text-h6 text-weight-regular text-grey-9"
        >Bijlipay Allocate to Reseller</div>
        <!-- <div class="col-md-12 col-md-6 q-pt-md group" align="right">
          <q-btn
            @click="$router.push('/inventory/central')"
            outline
            label="Cancel Allocation"
            color="negative"
          />
        </div> -->
        <div class="col-6 col-sm-8 col-md-4" align="right">
          <!-- <q-btn
            @click="$router.push('/inventory/central')"
            outline
            label="Cancel Allocation"
            color="negative"
          />-->
        </div>
        <!--END: table title -->
      </div>

      <div
        class="row bottom-border group q-px-md q-py-md items-center text-weight-regular text-grey-9"
      >
        <!--START: table title -->
        <div class="col-md-4">
          <q-select
            :disabled="formData.device_type != ''"
            :class="[formData.device_type != '' ? 'no-pointer-events' : '']"
            v-model="formData.region"
            float-label="Select Region"
            radio
            color="grey-9"
            :options="regionOptions"
            @input="regionBasedSO"
          />
        </div>
        <div class="col-md-3">
          <q-select
            v-model="formData.resellar"
            float-label="Select Resellar"
            radio
            color="grey-9"
            :options="resellarOptions"
          />
        </div>
        <div class="col-md-4">
          <q-select
            clearable
            :disable="formData.region == ''"
            @clear="fnClearingDeviceTypeSelection"
            @input="fnSetDevicesByDeviceId"
            v-model="formData.device_type"
            float-label="Select Device Type"
            radio
            color="grey-9"
            :options="deviceOptions"
          />
        </div>

        <div class="col-12 col-lg-4 group" align="right">
          <q-btn
            :disabled="formData.device_type == '' || formData.region == ''"
            @click="openScannerComp"
            v-if="scannerToggleOption"
            color="light-blue"
            class="q-py-xs"
            label="Start scan"
          />
          <q-btn
            icon="shopping_cart"
            outline
            class="q-py-xs"
            label="Add to cart"
            @click="fnAllocateDeviceToResellar"
          />
        </div>
        <!--END: table title -->
      </div>

      <div class="row text-weight-regular text-grey-9">
        <div class="col group" v-for="(item,index) in formData.scannedItems" :key="index">
          <q-card
            class="shadow-4"
            :style="'border:'+[formData.device_type.id == item.device.id?'2px solid #61116a':'unset']"
          >
            <q-list
              highlight
              separator
              class="q-pa-none"
              :class="[formData.device_type.id == item.device.id?'activeDeviceTab':'']"
            >
              <q-item-label header style="border-bottom: 1px solid #ccc;">
                <q-icon
                  :style="'color:'[formData.device_type.id == item.device.id?'#fff':'#202c3f']"
                  name="fas fa-tablet-alt"
                />
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

      <!--START: Open showPDOmodal model -->
      <showPDORegionBasedResellar
        v-if="showPDORegionBasedResellar"
        :propshowRegionBasedResellar="showPDORegionBasedResellar"
        :propAllScannedItemArr="formData"
        @closeModel="fnAllocateDeviceToResellar"
      ></showPDORegionBasedResellar>
      <!--END: Open showPDOmodal model -->
    </div>
  </q-page>
</template>

<script>

// import VueBarcodeScanner from "vue-barcode-scanner";
// Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import showPDORegionBasedResellar from "../../components/inventory/showPDORegionBasedResellar.vue";
export default {
  name: "allocateDevice",
  components: {
    showPDORegionBasedResellar
  },
  data() {
    return {
      filterSearch: "",
      scannerToggleOption: true,
      showPDORegionBasedResellar: false,
      regionOptions: [],
      deviceOptions: [],
      resellarOptions: [],
      regionBasedSo: [],

      tempTableData: [],
      formData: {
        region: "",
        device_type: "",
        resellar: "",
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
      "getRegionBasedSO",
      "getRegionBasedResellar"
    ])
  },
  created() {
    this.fnAjaxGetAllDevicesTypesData();
    this.fnAjaxGetAllDevicesTypes();
    this.fnAjaxGetAllRegionsData();
    this.FETCH_REGION_BASED_SO();
    this.FETCH_REGION_BASED_RESELLAR();
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
      "FETCH_REGION_BASED_SO",
      "FETCH_REGION_BASED_RESELLAR"
    ]),
    ...mapActions("VerifyDevice", [
      "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION"
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
        console.log("Inside");
        this.DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION({
          device: self.formData.device_type.id,
          barcode: barcode
        })
          .then(() => {
            console.log("Error-1");
            assumeArr.deviceSerialNumbers.push(barcode);
          })
          .catch(() => {
            console.log("Error-2");
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: barcode + " is invalid",
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
      // this.formData.scannedItems[index].deviceSerialNumbers.splice(subIndex, 1);
      this.formData.scannedItems[index].deviceSerialNumbers.splice(subIndex
      , 1);
    },

    // Function to final submit for allocate device
    fnAllocateDeviceToResellar() {
      this.showPDORegionBasedResellar = !this.showPDORegionBasedResellar;
    },

    // Function to get all device types
    fnAjaxGetAllDevicesTypes() {
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
    fnAjaxGetAllDevicesTypesData() {
      this.FETCH_REGION_BASED_RESELLAR()
        .then(() => {
          let assumeArr = [];
          this.getRegionBasedResellar.map(function(value, index) {
            assumeArr.push({
              label: value.user.name,
              value: value.user.id
            });
          });
          this.resellarOptions = assumeArr;
        })
        .catch(error => {
          this.resellarOptions = [];
        });
    },
    regionBasedSO() {
      this.FETCH_REGION_BASED_SO(this.formData.region).then(() => {
        let assumeArr = [];
        this.getRegionBasedSO.map(function(value, index) {
          assumeArr.push({
            label: value.name,
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
          this.getAllRegionsData.map(function(value, index) {
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
