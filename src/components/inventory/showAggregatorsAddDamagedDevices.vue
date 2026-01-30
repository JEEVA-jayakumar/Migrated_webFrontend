<template>
  <q-page>
    <div class="row items-center q-pa-md text-weight-regular bottom-border text-grey-9">
      <div class="col-md-8 q-title text-weight-regular text-grey-9">Aggregator Faulty Device</div>
      <!-- <div class="col-auto">
        <q-btn round @click="$emit('emitRefreshList')" outline color="dark" icon="clear"/>
      </div> -->
      <div class="col-md-12 col-md-6 q-pt-md group" align="right">
          <q-btn
              @click="$router.push('/inventory/PhonepeInventory')"
              outline
              label="Cancel Allocation"
              color="negative"
            />
        </div>
    </div>
    <div class="q-pa-sm group">
      <div class="row items-center">
        <!--START: table title -->
        <!-- <div class="col-md-2">
          <q-select color="grey-9" v-model="aggregator" @clear="fnClearingAggregators" float-label="Select Aggregator"
            radio :options="aggregatorOptions" @input="selectedAggregators" />
        </div> -->
        <div class="col-md-2">
          <q-select clearable  @clear="fnClearingDeviceTypeSelection"
            @input="fnSetDevicesByDeviceId" v-model="formData.device_type" float-label="Select Device Type"
            color="grey-9" :options="deviceOptions" />
        </div>
        <div class="col-12 col-lg-6 group" align="right">
          <q-btn :disabled="formData.device_type == ''" @click="openScannerComp()" v-if="scannerToggleOption"
            color="light-blue" label="Start scan" />
          <q-btn color="amber-9" class="q-py-xs" :disable="formData.scannedItems.length == 0" label="Send to repair"
            @click="toggleDamagedDevices()" />
        </div>
      </div>
      <!--END: table title -->
      <div class="row text-weight-regular text-grey-9">
        <div class="col group" v-for="(item, index) in formData.scannedItems" :key="index">
          <q-card class="shadow-4">
            <q-list highlight separator>
              <q-list-header style="border-bottom: 1px solid #ccc;">
                <q-icon style="color:#202c3f" name="fas fa-tablet-alt" />
                {{ item.device.deviceName }}
              </q-list-header>
              <q-scroll-area style="height:400px" :thumb-style="{
                right: '4px',
                borderRadius: '5px',
                background: 'grey',
                width: '5px',
                opacity: 0.5
              }" :delay="1500">
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
    </div>
    <showAggregatorsRepairConfirmation v-if="showRepairModal" :showRepairModal="showRepairModal"
      :propAllScannedItemArr="formData" @closeModel="clearAfterSubmit(formData)" />
  </q-page>
</template>

<script>
import Vue from "vue";
import VueBarcodeScanner from "vue-barcode-scanner";
Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import showAggregatorsRepairConfirmation from "./showAggregatorsRepairConfirmation.vue";
export default {
  name: "damagedDevices",
  props: ["faultyInventoryComponent"],
  components: { showAggregatorsRepairConfirmation },
  data() {
    return {
      toggleModal: this.faultyInventoryComponent,
      filterSearch: "",
      scannerToggleOption: true,
      showRepairModal: false,
      deviceOptions: [],
      // aggregatorOptions: [],
      // aggregator: "",
      formData: {
        // region: JSON.parse(localStorage.getItem("u_i")).region.id,
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
    ...mapGetters("InventoryCentral", ["getAllInventoryDevicesTypesData"]),
    ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
    ...mapGetters("superAdminAggregatorsDevice", ["getCreatedActiveDeviceList"]),
  },
  created() {
    // this.fnAjaxGetAllDevicesTypesData();
    // this.fnAjaxGetAllAggregatorList();
    this.AggregatorsDeviceType();
  },
  destroyed() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy();
  },

  methods: {
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA"
    ]),
    ...mapActions("VerifyDevice", [
      "DEVICE_VERIFICATION_IN_CENTRAL_FOR_ACTIVE", "AGGREAGATORS_DEVICE_VERIFICATION_IN_CENTRAL_FOR_ACTIVE"
    ]),
    ...mapActions("superAdminAggregatorsDevice", ["GET_ACTIVE_CREATED_DEVICE_LIST"]),
    ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
    // ...mapActions("VerifyDevice", [
    //   "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION", "PHONE_PE_DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION"
    // ]),

    AggregatorsDeviceType() {
      self = this;
      let cookedArr1 = [];
      self.GET_ACTIVE_CREATED_DEVICE_LIST()
        .then(() => {
          return _.map(this.getCreatedActiveDeviceList, (item) => {
            cookedArr1.push({
              value: item,
              label: item.deviceName
            });
            self.deviceOptions = cookedArr1;
          })
        })
    },
    // fnAjaxGetAllAggregatorList() {
    //   let self = this;
    //   let cookedArr = [];
    //   self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
    //     .then(() => {
    //       return _.map(self.getActiveCreatedAggregatorList, (item) => {
    //         cookedArr.push({
    //           value: item,
    //           label: item.name
    //         });
    //         self.aggregatorOptions = cookedArr;
    //         // this.flag = true;
    //       });

    //     })
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
        this.AGGREAGATORS_DEVICE_VERIFICATION_IN_CENTRAL_FOR_ACTIVE({
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
      this.$delete(this.formData.scannedItems[index].deviceSerialNumbers, subIndex);
    },

    // Function to get all device types
    fnAjaxGetAllDevicesTypesData() {
      this.FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA()
        .then(() => {
          let assumeArr = [];
          this.getAllInventoryDevicesTypesData.map(function (value, index) {
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
      this.$delete(this.formData.scannedItems, index);
    },

    // Function to clear device type
    fnClearingDeviceTypeSelection(closeModal) {
      this.formData.device_type = "";
      this.formData.scannedItems = [];
    },
    fnClearingAggregators(closeModal) {
      this.aggregator = "";
    },

    //Final submission of damaged devices
    toggleDamagedDevices() {
      this.showRepairModal = !this.showRepairModal;
    },
    clearAfterSubmit() {
      this.toggleDamagedDevices();
      this.formData = {
        device_type: "",
        scannedItems: []
      };
    }
  }
};
</script>
