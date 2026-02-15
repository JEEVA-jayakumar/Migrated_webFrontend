<template>
  <div class="row">
    <div class="col-md-4" style="border-right: 1px solid #ccc;">
      <div class="q-ma-md">
        <div class="q-mb-md text-subtitle1">Region: {{computedUserRegion}}</div>
        <div>
          <q-card class="no-shadow">
            <q-card-section class="no-padding">
              <div class="text-body1">
                <strong>
                  <h6>Inventory with Region</h6>
                </strong>
              </div>
            </q-card-section>
            <q-separator />
            <div
              @click="loadDevicesTableData($REGIONAL_INVENTORY_ALL_DEVICES,{name:'Total Devices'})"
            >
              <q-card-section
                align="center"
                class="cursor-pointer bg-grey-5"
                :class="[activeItemId === $REGIONAL_INVENTORY_ALL_DEVICES ? 'shadow-5' : 'shadow-0']"
              >
                <div>Count</div>
                <div>
                  <big>{{fngetAllRegionalInventorySerialNumbersByDevice()}}</big>
                </div>
              </q-card-section>
            </div>
          </q-card>
        </div>
        <div class="row gutter-md">
          <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Pending Allocation</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE,{name:'Pending Allocation'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllRegionalInventoryDeviceDetailsWithCount.
                      pendingDeviceCount.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Allocated Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_ALLOCATED_DEVICE,{name:'Allocated Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_ALLOCATED_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllRegionalInventoryDeviceDetailsWithCount.
                      allocatedCount.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Damaged Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_DAMAGED_DEVICE,{name:'Damaged Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_DAMAGED_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllRegionalInventoryDeviceDetailsWithCount.
                      damageDeviceCount.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Inbound Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_INBOUND_DEVICE,{name:'Inbound Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_INBOUND_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllRegionalInventoryDeviceDetailsWithCount.
                      inbountDeviceCount.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Pending List From App Count</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_FAULTY_DEVICE,{name:'Faulty Inventory'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_FAULTY_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllRegionalInventoryDeviceDetailsWithCount.
                      pendingListFromAppCount.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>

          <!-- <div
            class="col-md-6"
            v-for="(item,index) in getAllRegionalInventoryDeviceDetailsWithCount.inventryCount"
            :key="index"
          >
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">{{item.device.deviceName}}</div>
              </q-card-section>
              <q-separator />
              <div @click="loadDevicesTableData(index,item)">
                <q-card-section
                  align="center"
                  :style="'background:'+item.device.colorCode"
                  :class="[activeItemId === index ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>{{item.count}}</big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>-->
        </div>
      </div>
      <div class="q-ma-md">
        <div class="row gutter-md">
          <div
            class="col-md-6"
            v-for="(item,index) in getAllRegionalInventoryDeviceDetailsWithCount.inventryCount"
            :key="index"
          >
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">{{item.device.deviceName}}</div>
              </q-card-section>
              <q-separator />
              <div @click="loadDevicesTableData(index,item)">
                <q-card-section
                  align="center"
                  :style="'background:'+item.device.colorCode"
                  :class="[activeItemId === index ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <strong>{{item.count}}</strong>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
        </div>
      </div>
      <div>
        <strong>
          <h6>Inventory with So</h6>
        </strong>
      </div>
      <div class="q-ma-md">
        <div class="row gutter-md">
          <div
            class="col-md-6"
            v-for="(item,index) in getAllRegionalInventoryDeviceDetailsWithCount.BillPartnerList"
            :key="index"
          >
            <q-card>
              <q-card-section>
                <q-card role="button" class="no-shadow cursor-pointer">
                  <q-card-section class="no-padding">
                    <div class="text-body1">{{item.user.name}}</div>
                  </q-card-section>
                  <q-separator />
                  <div>
                    <!-- <q-card-section
                      align="center"
                      :class="[activeItemId === $REGIONAL_INVENTORY_ALL_DEVICES ? 'shadow-5' : 'shadow-0']"
                    >-->
                    <!-- <div>Count</div> -->
                    <div align="center">
                      <br />
                      <big>{{item.count}}</big>
                    </div>
                    <!-- </q-card-section> -->
                  </div>
                </q-card>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div>
        <strong>
          <h6>Inventory with Resellar</h6>
        </strong>
      </div>
      <div class="q-ma-md">
        <div class="row gutter-md">
          <div
            class="col-md-6"
            v-for="(item,index) in getAllRegionalInventoryDeviceDetailsWithCount.resellerdevicecount"
            :key="index"
          >
            <q-card>
              <q-card-section>
                <q-card role="button" class="no-shadow cursor-pointer">
                  <q-card-section class="no-padding">
                    <div class="text-body1">{{item.user.name}}</div>
                  </q-card-section>
                  <q-separator />
                  <div>
                    <q-card-section
                      align="center"
                      :class="[activeItemId === $REGIONAL_INVENTORY_ALL_DEVICES ? 'shadow-5' : 'shadow-0']"
                    >
                      <!-- <div>Count</div> -->
                      <div>
                        <br />
                        <big>{{item.count}}</big>
                      </div>
                    </q-card-section>
                  </div>
                </q-card>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- <div class="q-ma-md"> -->
      <!-- <div>
          <q-card class="no-shadow">
            <q-card-section class="no-padding">
              <div class="text-body1">
                <strong>
                  <h6>Inventory with SO</h6>
                </strong>
              </div>
            </q-card-section>
            <q-separator />
            <div
              @click="loadDevicesTableData($REGIONAL_INVENTORY_ALL_DEVICES,{name:'Total Devices'})"
            >
              <q-card-section
                align="center"
                class="cursor-pointer bg-grey-5"
                :class="[activeItemId === $REGIONAL_INVENTORY_ALL_DEVICES ? 'shadow-5' : 'shadow-0']"
              >
                <div>Count</div>
                <div>
                  <big>{{fngetAllSoInventorySerialNumbersByDevice()}}</big>
                </div>
              </q-card-section>
            </div>
          </q-card>
      </div>-->
      <!-- <div class="row gutter-md"> -->
      <!-- <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Pending Allocation</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE,{name:'Pending Allocation'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllInventorywithsoDeviceDetailsWithCount.
                      pendingDeviceCountBillPartner.count}}
                    </big>
                  </div>
                </q-card-section>aj Arumugam

      </div>-->
      <!-- <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Allocated Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesbig
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_ALLOCATED_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllInventorywithsoDeviceDetailsWithCount.
                      allocatedCountBillPartner.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
      </div>-->
      <!-- <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Damaged Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_DAMAGED_DEVICE,{name:'Damaged Devices'})"
              >
                <q-card-section <div class="row gutter-md">
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_DAMAGED_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllInventorywithsoDeviceDetailsWithCount.
                      damageDeviceCountBillPartner.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
      </div>-->
      <!-- <div class="col-md-6">
            <q-card role="button" class="no-shadow cursor-pointer">
              <q-card-section class="no-padding">
                <div class="text-body1">Inbound Devices</div>
              </q-card-section>
              <q-separator />
              <div
                @click="loadDevicesTableData($REGIONAL_INVENTORY_INBOUND_DEVICE,{name:'Inbound Devices'})"
              >
                <q-card-section
                  align="center"
                  class="bg-grey-5"
                  :class="[activeItemId === $REGIONAL_INVENTORY_INBOUND_DEVICE ? 'shadow-5' : 'shadow-0']"
                >
                  <div>Count</div>
                  <div>
                    <big>
                      {{getAllInventorywithsoDeviceDetailsWithCount.
                      inbountDeviceCountBillPartner.count}}
                    </big>
                  </div>
                </q-card-section>
              </div>
            </q-card>
      </div>-->
    </div>

    <div class="col-md-8">
      <div class="row bottom-border q-pa-sm items-center">
        <div class="text-weight-regular">
          <!--STARTv-model: table title -->
          <div class="text-grey-9 text-subtitle1 q-py-sm">{{inventoryCountTableTitle}}</div>
          <!--END: table title -->
        </div>
      </div>
      <!--START: table lead validation -->
      <q-table
        title="Lead Validation"
        table-class="customTableClass"
        class="q-py-none"
        :rows="getAllRegionalInventorySerialNumbersByDevice"
        :columns="columnData"
        :filter="filter"
        :pagination="paginationControl"
        :loading="toggleAjaxLoadFilter"
        row-key="name"
      >
        <q-td v-slot:body-cell-action="props" :props="props" v-if="info==6">
          <div class="row no-wrap no-padding">
            <q-btn
              dense
              no-caps
              no-wrap
              label="Usable"
              icon="fa fa-check square"
              size="md"
              @click="fnShowUsable(props.row)"
              flat
              class="text-light-blue"
            ></q-btn>
            <q-btn
              dense
              no-caps
              no-wrap
              label="Faulty"
              icon="close"
              size="md"
              @click="fnShowFaulty(props.row)"
              flat
              class="text-negative"
            ></q-btn>
          </div>
        </q-td>
        <template v-slot:top="props" class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-6">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Search by SO Name, Serial Number"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <div class="col-md-5">
            <downloadExcel
              :rows="getAllRegionalInventorySerialNumbersByDevice"
              :fields="json_fields"
              name="InventoryWithSO.xls"
            >
              <q-btn outline color="grey-9" label="Download as excel" />
            </downloadExcel>
          </div>
        </template>
      </q-table>

      <!--END: table lead validation -->
    </div>
  </div>
</template>
<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import downloadExcel from "vue-json-excel";
import moment from "moment";

export default {
  components: {
    downloadExcel
  },
  props: ["propMerchantTypeFromSO"],

  data() {
    return {
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsPerPage: 10
      },
      info: "",
      region: JSON.parse(localStorage.getItem("u_i")).region.id,
      inventoryCountTableTitle: "Total Devices",
      toggleInventoryPrimaryComponent: false,
      showAddDeviceComponent: false,
      filter: "",
      code: 1,

      activeItemId: false,
      multipleSelect: "",
      json_fields: {
        DeviceType: "device.deviceName",
        SerialNumber: "serialNumber"
      },
      columnData: [
        {
          name: "device_type",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => row.device.deviceName,
          sortable: true
        },
        {
          name: "serialNumber",
          required: true,
          label: "Serial Number",
          align: "left",
          field: row => row.serialNumber,
          sortable: true
        },
        {
          name: "user",
          required: true,
          label: "SoName",
          align: "left",
          field: row => (row.user == null ? "NA" : row.user.name+" | "+row.user.employeeID),
          sortable: true
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false
        }
      ]
    };
  },

  computed: {
    ...mapGetters("SAT_RegionalInventoryAllocation", [
      "getAllRegionalInventoryDeviceDetailsWithCount",
      "getAllRegionalInventorySerialNumbersByDevice",
      "getAllInventorywithsoDeviceDetailsWithCount"
    ]),
    computedUserRegion() {
      return JSON.parse(localStorage.getItem("u_i")).region.regionAreaName;
    }
  },

  created() {
    this.getAllRegionalInventoryDeviceDetailsWithCount();
  },
  methods: {
    ...mapActions("SAT_RegionalInventoryAllocation", [
      "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
      "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE"
    ]),
    ...mapActions("InventoryCentral", ["USEABLE_DEVICE", "FAULTY_DEVICE"]),

    toggleRemarks(item) {
      item.showRemarks = !item.showRemarks;
    },

    // Function to get all device serial numbers
    fngetAllRegionalInventorySerialNumbersByDevice() {
      let totalDeviceCount = 0;
      let hashMapCook = this.getAllRegionalInventoryDeviceDetailsWithCount
        .inventryCount;
      hashMapCook.map(function(value, index) {
        totalDeviceCount = totalDeviceCount + value.count;
      });
      return totalDeviceCount;
    },
    // fngetAllSoInventorySerialNumbersByDevice() {
    //   let totalDeviceCount = 0;
    //   let hashMapCook = this.getAllInventorywithsoDeviceDetailsWithCount
    //     .inventryCountBillPartner;
    //   hashMapCook.map(function(value, index) {
    //     totalDeviceCount = totalDeviceCount + value.count;
    //   });
    //   return totalDeviceCount;
    // },

    // Function to show serial numbers based on device type
    loadDevicesTableData(itemIndex, item) {
      this.toggleAjaxLoadFilter = true;
      this.activeItemId = itemIndex;
      console.log("DEVICE LOAD DATAS--------------"+JSON.stringify(this.loadDevicesTableData))
       console.log("DEVICE LOAD DATAS--------------"+JSON.stringify(this.toggleAjaxLoadFilter))
      if (itemIndex == this.$REGIONAL_INVENTORY_ALL_DEVICES) {
        this.inventoryCountTableTitle = item.name;
        this.$emit("emittedForTotalSerialNumbers");
        this.info = Math.abs(this.$REGIONAL_INVENTORY_ALL_DEVICES);
      } else if (itemIndex == this.$REGIONAL_INVENTORY_DAMAGED_DEVICE) {
        this.inventoryCountTableTitle = item.name;
        this.info = Math.abs(this.$REGIONAL_INVENTORY_FILTER_ACTION_DAMAGED);
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(this.$REGIONAL_INVENTORY_FILTER_ACTION_DAMAGED)
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else if (
        itemIndex == this.$REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE
      ) {
        this.inventoryCountTableTitle = item.name;
        this.info = Math.abs(
          this.$REGIONAL_INVENTORY_FILTER_ACTION_PENDING_ALLOCATION
        );
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(
            this.$REGIONAL_INVENTORY_FILTER_ACTION_PENDING_ALLOCATION
          )
        };

        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else if (itemIndex == this.$REGIONAL_INVENTORY_INBOUND_DEVICE) {
        this.inventoryCountTableTitle = item.name;
        this.info = Math.abs(this.$REGIONAL_INVENTORY_INBOUND_DEVICE);
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(this.$REGIONAL_INVENTORY_INBOUND_DEVICE)
        };

        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else if (itemIndex == this.$REGIONAL_INVENTORY_FAULTY_DEVICE) {
        this.inventoryCountTableTitle = item.name;
        this.info = Math.abs(this.$REGIONAL_INVENTORY_FAULTY_DEVICE);
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(this.$REGIONAL_INVENTORY_FAULTY_DEVICE)
        };
        // this.info = Math.abs(this.$REGIONAL_INVENTORY_INBOUND_DEVICE);
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else if (itemIndex == this.$REGIONAL_INVENTORY_INVENTORY_SO) {
        this.inventoryCountTableTitle = item.name;
        this.info = Math.abs(this.$REGIONAL_INVENTORY_INVENTORY_SO);
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(this.$REGIONAL_INVENTORY_INVENTORY_SO)
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else if (itemIndex == this.$REGIONAL_INVENTORY_ALLOCATED_DEVICE) {
        this.inventoryCountTableTitle = item.name;
        this.info = Math.abs(this.$REGIONAL_INVENTORY_ALLOCATED_DEVICE);
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: Math.abs(this.$REGIONAL_INVENTORY_ALLOCATED_DEVICE)
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      } else {
        this.inventoryCountTableTitle = item.device.deviceName;
        this.info = Math.abs(this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE);
        // TODO
        let requestParams = {
          // TODO Please
          region: JSON.parse(localStorage.getItem("u_i")).region.id,
          action: this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE,
          device: item.device.id
        };
        this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
      }
      this.toggleAjaxLoadFilter = false;
    },
    // selecteddata() {
    //   this.$REGIONAL_INVENTORY_FAULTY_DEVICE;
    //   console.log("datta", this.$REGIONAL_INVENTORY_FAULTY_DEVICE);
    // },
    fnShowUsable(action) {
      // this.$q
      //   .dialog({
      //     title: "Confirm",
      //     message: "Are You want to submit Usable Device.",
      //     ok: "Yes",
      //     cancel: "No"
      //   })

      //   .then(() => {
      //     console.log("send the data", action);
      //     this.USEABLE_DEVICE(action);
      //     this.FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT();

      //     this.$q.notify("Successfully Submitted!");
      //   })
      //   .catch(() => {
      //     this.$q.notify("Cancel");
      //     // this.data();
      //     // this.fnAjaxFetchAllDeviceDetailsWithCount();
      // });
      console.log("Action---------------->"+JSON.stringify(action))
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are You want to submit Usable Device?",
          ok: "Submit",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          this.USEABLE_DEVICE(action)
          console.log("Action------------->"+JSON.stringify(action))
            .then(response => {
              this.FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(
                this.region
              );
              let requestParams = {
                // TODO Please
                region: JSON.parse(localStorage.getItem("u_i")).region.id,
                action: 1
              };
              this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(
                requestParams
              );
              this.info = 1;
              (this.inventoryCountTableTitle = "Total Devices"),
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Successfully Submitted",
                  icon: "thumb_up"
                });
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Please try again!",
                icon: "thumb_down"
              });
            });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down"
          });
        });
    },
    fnShowFaulty(action) {
      // this.$q
      //   .dialog({
      //     title: "Confirm",
      //     message: "Are You want to submit Faulty Device?",
      //     ok: "Yes",
      //     cancel: "No"
      //   })

      //   .then(() => {
      //     console.log("send the data", action);
      //     this.FAULTY_DEVICE(action);
      //     this.data();

      //     this.$q.notify("Successfully Submitted!");
      //   })
      //   .catch(() => {
      //     this.$q.notify("Cancel");
      //     // this.data();
      //     // this.fnAjaxFetchAllDeviceDetailsWithCount();
      //   });
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are You want to submit Faulty Device?",
          ok: "Submit",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          this.FAULTY_DEVICE(action)
            .then(response => {
              this.FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(
                this.region
              );
              // FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(
              //   this.region + "/1"
              // );
              let requestParams = {
                // TODO Please
                region: JSON.parse(localStorage.getItem("u_i")).region.id,
                action: 1
              };
              this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(
                requestParams
              );
              this.info = 1;
              (this.inventoryCountTableTitle = "Total Devices"),
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Successfully Submitted",
                  icon: "thumb_up"
                });
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Please try again!",
                icon: "thumb_down"
              });
            });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down"
          });
        });
    },

    data() {
      // this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(),
      //   this.FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(),
      //   this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE();
      this.getAllInventorywithsoDeviceDetailsWithCount();
    }
  }
};
</script>
