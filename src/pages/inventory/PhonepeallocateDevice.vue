<template>
  <q-page>
    <!-- content -->
    <div>
      <div class="row bottom-border q-px-md q-py-md items-center">
        <!--START: table title -->
        <div class="col-6 col-sm-4 col-md-8 q-title text-weight-regular text-grey-9">Aggregator Allocate Device</div>
        <div class="col-md-12 col-md-6 q-pt-md group" align="right">
          <q-btn
              @click="$router.push('/inventory/PhonepeInventory')"
              outline
              label="Cancel Allocation"
              color="negative"
            />
        </div>
      </div>
      <div class="row bottom-border group q-px-md q-py-md items-center text-weight-regular text-grey-9">
        <div class="col-md-2">
          <q-select :disabled="formData.device_type != ''"
            :class="[formData.device_type != '' ? 'no-pointer-events' : '']" v-model="formData.region"
            float-label="Select Region" radio color="grey-9" :options="regionOptions" />

        </div>
        <!-- <div class="col-md-2">
          <q-select color="grey-9" :disable="formData.region == ''" v-model="aggregator" float-label="Select Aggregator" radio
            :options="aggregatorOptions" @input="selectedAggregators" />
        </div> -->
        <div class="col-md-2">
          <q-select clearable :disable="formData.region == ''" @clear="fnClearingDeviceTypeSelection"
            @input="fnSetDevicesByDeviceId" v-model="formData.device_type" float-label="Select Device Type" radio
            color="grey-9" :options="deviceOptions" />
        </div>
        <div class="col-12 col-lg-4 group" align="right">
          <q-btn :disabled="formData.device_type == '' || formData.region == ''" @click="openScannerComp"
            v-if="scannerToggleOption" color="light-blue" class="q-py-xs" label="Start scan" />
          <q-btn icon="shopping_cart" outline class="q-py-xs" label="Add to cart" @click="fnAllocateDeviceToRegion" />
        </div>
        <!--END: table title -->
      </div>

      <div class="row text-weight-regular text-grey-9">
        <div class="col group" v-for="(item, index) in formData.scannedItems" :key="index">
          <q-card class="shadow-4"
            :style="'border:' + [formData.device_type.id == item.device.id ? '2px solid #61116a' : 'unset']">
            <q-list highlight separator class="q-pa-none"
              :class="[formData.device_type.id == item.device.id ? 'activeDeviceTab' : '']">
              <q-list-header style="border-bottom: 1px solid #ccc;">
                <q-icon :style="'color:'[formData.device_type.id == item.device.id ? '#fff' : '#202c3f']"
                  name="fas fa-tablet-alt" />
                {{ item.device.deviceName }}
              </q-list-header>
              <q-scroll-area style="height:400px" :thumb-style="{ right: '4px', borderRadius: '5px', background: 'grey', width: '5px', opacity: 0.5 }" :delay="1500">
                <div v-if="item.deviceSerialNumbers.length > 0">
                  <q-item separator class="text-light-blue" v-for="(subItem, subIndex) in item.deviceSerialNumbers"
                    :key="subIndex">
                    <q-item-main class="q-body-1">{{ subItem }}</q-item-main>
                    <q-item-side>
                      <q-btn round size="sm" color="negative" icon="clear"
                        @click="fnRemoveScannedItems(index, subIndex)" />
                    </q-item-side>
                  </q-item>
                </div>
                <div v-else>
                  <q-item>
                    <q-item-main class="q-body-1">No data to display</q-item-main>
                    <q-item-side>
                      <q-btn round size="sm" color="negative" @click="fnRemoveDeviceTypeFromList(index)" icon="clear" />
                    </q-item-side>
                  </q-item>
                </div>
              </q-scroll-area>
            </q-list>
          </q-card>
        </div>
      </div>

      <!--START: Open showPDOmodal model -->
      <!-- <showPDOmodal v-if="showPDOmodal" :propshowPDOmodal="showPDOmodal" :propAllScannedItemArr="formData"
        @closeModel="fnAllocateDeviceToRegion"></showPDOmodal> -->
        <showPhonePePDOmodal v-if="showPhonePePDOmodal" :propshowPDOmodal="showPhonePePDOmodal" :propAllScannedItemArr="formData"
        @closeModel="fnAllocateDeviceToRegion"></showPhonePePDOmodal>
      <!--END: Open showPDOmodal model -->
    </div>
  </q-page>
</template>
  
<script>
import Vue from "vue";
import VueBarcodeScanner from "vue-barcode-scanner";
Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import showPhonePePDOmodal from "../../components/inventory/showPhonePePDOmodal.vue";
export default {
  name: "allocateDevice",
  components: {
    showPhonePePDOmodal
  },
  data() {
    return {
      filterSearch: "",
      scannerToggleOption: true,
      showPhonePePDOmodal: false,
      regionOptions: [],
      // aggregatorOptions:[],
      deviceOptions: [],

      tempTableData: [],
      formData: {
        region: "",
        device_type: "",
        scannedItems: []
      },
      // aggregator:"",
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
    ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
    ...mapGetters("superAdminAggregatorsDevice", ["getCreatedActiveDeviceList"]),
  },
  created() {
    // this.fnAjaxGetAllDevicesTypesData();
    this.fnAjaxGetAllRegionsData();
    this.AggregatorsDeviceType();
    // this.fnAjaxGetAllAggregatorList();
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
      "FETCH_ALL_REGIONS_DATA"

    ]),
    ...mapActions("superAdminAggregatorsDevice", ["GET_ACTIVE_CREATED_DEVICE_LIST"]),
    ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
    ...mapActions("VerifyDevice", [
      "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION", "PHONE_PE_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION"
    ]),
    //  emitToggleCheque(toggleModal) {
    //   this.$emit("closeModel");
    // },
    // fnSubmitAllocateResellar(request) {
    //   let params = {};
    //   if (this.formData.region == "") {
    //     this.$q.notify({
    //       color: "amber-9",
    //       position: "bottom",
    //       message: "Region cannot be empty!",
    //       icon: "warning"
    //     });
    //   } else if (this.formData.device == "") {
    //     this.$q.notify({
    //       color: "amber-9",
    //       position: "bottom",
    //       message: "Device Type cannot be empty!",
    //       icon: "warning"
    //     });
    //   } else {
    //     this.FETCH_ALL_SUBMITS(this.formData)
    //       .then(() => {
    //         this.TOGGLE_COMMON_LOADER(false);
    //         this.$q.notify({
    //           color: "positive",
    //           position: "bottom",
    //           message: "Devices has been successfully allocated to region",
    //           icon: "thumb_up"
    //         });
    //         this.$router.push("/inventory/central");
    //       })
    //       .catch(error => {
    //         this.TOGGLE_COMMON_LOADER(false);
    //         this.$q.notify({
    //           color: "negative",
    //           position: "bottom",
    //           message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
    //           icon: "thumb_down"
    //         });
    //       });
    //   }
    // },

    // Function to dynamically set column name for scanned items without store
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
      let predictIfDeviceExist = self.formData.scannedItems.find(function (
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
      let finalAssumation = _.find(assumeArr.deviceSerialNumbers, function (oo) {
        return oo == barcode;
      });
      if (finalAssumation == undefined) {
        console.log("Inside");
        this.PHONE_PE_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION({
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
      // this.formData.scannedItems[index].deviceSerialNumbers.splice(subIndex, 1);
      this.$delete(
        this.formData.scannedItems[index].deviceSerialNumbers,
        subIndex
      );
    },

    // Function to final submit for allocate device
    fnAllocateDeviceToRegion() {
      this.showPhonePePDOmodal = !this.showPhonePePDOmodal;
    },

    // Function to get all device types
    // fnAjaxGetAllDevicesTypesData() {
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
    AggregatorsDeviceType(){
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

    // fnAjaxGetAllAggregatorList(){
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

    // Function to delete the entire device based information
    fnRemoveDeviceTypeFromList(index) {
      // this.formData.scannedItems.splice(index, 1);
      this.$delete(this.formData.scannedItems, index);
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
  
