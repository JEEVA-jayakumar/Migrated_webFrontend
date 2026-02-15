<template>
    <!-- :options="dropdDown.aggregatorOptions" @input="selectedAggregators"-->
    <div>
        <!-- <div class="row bottom-border q-px-md q-py-sm items-center">
            <div class="col-md-4">
                <q-select color="grey-9" v-model="formData.aggregator" float-label="Select Aggregator" radio
                    :options="dropdDown.aggregatorOptions" @input="selectedAggregators" />
            </div>

        </div> -->
        <div class="row">

            <div class="col-md-4" style="border-right: 1px solid #ccc;">
                <div class="q-ma-md">
                    <div class="q-mb-md text-subtitle1">Region: {{ computedUserRegion }}</div>
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
                                @click="loadDevicesTableData($REGIONAL_INVENTORY_ALL_DEVICES, { name: 'Total Devices' })">
                                <q-card-section align="center" class="cursor-pointer bg-grey-5"
                                    :class="[activeItemId === $REGIONAL_INVENTORY_ALL_DEVICES ? 'shadow-5' : 'shadow-0']">
                                    <div>Count</div>
                                    <div>
                                        <big>{{ fngetAllAggregatorsRegionalInventorySerialNumbersByDevice() }}</big>
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
                                    @click="loadDevicesTableData($REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE, { name: 'Pending Allocation' })">
                                    <q-card-section align="center" class="bg-grey-5"
                                        :class="[activeItemId === $REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE ? 'shadow-5' : 'shadow-0']">
                                        <div>Count</div>
                                        <div>
                                            <big>
                                                {{
                                                    getAllPhonePeRegionalInventoryDeviceDetailsWithCount.
                                                        pendingDeviceCount.count
                                                }}
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
                                    @click="loadDevicesTableData($REGIONAL_INVENTORY_ALLOCATED_DEVICE, { name: 'Allocated Devices' })">
                                    <q-card-section align="center" class="bg-grey-5"
                                        :class="[activeItemId === $REGIONAL_INVENTORY_ALLOCATED_DEVICE ? 'shadow-5' : 'shadow-0']">
                                        <div>Count</div>
                                        <div>
                                            <big>
                                                {{
                                                    getAllPhonePeRegionalInventoryDeviceDetailsWithCount.
                                                        allocatedCount.count
                                                }}
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
                                    @click="loadDevicesTableData($REGIONAL_INVENTORY_DAMAGED_DEVICE, { name: 'Damaged Devices' })">
                                    <q-card-section align="center" class="bg-grey-5"
                                        :class="[activeItemId === $REGIONAL_INVENTORY_DAMAGED_DEVICE ? 'shadow-5' : 'shadow-0']">
                                        <div>Count</div>
                                        <div>
                                            <big>
                                                {{
                                                    getAllPhonePeRegionalInventoryDeviceDetailsWithCount.
                                                        damageDeviceCount.count
                                                }}
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
                                    @click="loadDevicesTableData($REGIONAL_INVENTORY_INBOUND_DEVICE, { name: 'Inbound Devices' })">
                                    <q-card-section align="center" class="bg-grey-5"
                                        :class="[activeItemId === $REGIONAL_INVENTORY_INBOUND_DEVICE ? 'shadow-5' : 'shadow-0']">
                                        <div>Count</div>
                                        <div>
                                            <big>
                                                {{
                                                    getAllPhonePeRegionalInventoryDeviceDetailsWithCount.
                                                        inbountDeviceCount.count
                                                }}
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
                                    @click="loadDevicesTableData($REGIONAL_INVENTORY_FAULTY_DEVICE, { name: 'Faulty Inventory' })">
                                    <q-card-section align="center" class="bg-grey-5"
                                        :class="[activeItemId === $REGIONAL_INVENTORY_FAULTY_DEVICE ? 'shadow-5' : 'shadow-0']">
                                        <div>Count</div>
                                        <div>
                                            <big>
                                                {{
                                                    getAllPhonePeRegionalInventoryDeviceDetailsWithCount.
                                                        pendingListFromAppCount.count
                                                }}
                                            </big>
                                        </div>
                                    </q-card-section>
                                </div>
                            </q-card>
                        </div>
                    </div>
                </div>
                <div class="q-ma-md">
                    <div class="row gutter-md">
                        <div class="col-md-6"
                            v-for="(item, index) in getAllPhonePeRegionalInventoryDeviceDetailsWithCount.inventryCount"
                            :key="index">
                            <q-card role="button" class="no-shadow cursor-pointer">
                                <q-card-section class="no-padding">
                                    <div class="text-body1">{{ item.aggregatorDevice.deviceName }}</div>
                                </q-card-section>
                                <q-separator />
                                <div @click="loadDevicesTableData(index, item)">
                                    <q-card-section align="center" :style="'background:' + item.aggregatorDevice.colorCode"
                                        :class="[activeItemId === index ? 'shadow-5' : 'shadow-0']">
                                        <div>Count</div>
                                        <div>
                                            <strong>{{ item.count }}</strong>
                                        </div>
                                    </q-card-section>
                                </div>
                            </q-card>
                        </div>
                    </div>
                </div>
                <!-- <div>
                  <strong>
                      <h6>Inventory with So</h6>
                  </strong>
              </div>
              <div class="q-ma-md">
                  <div class="row gutter-md">
                      <div class="col-md-6"
                          v-for="(item, index) in getAllPhonePeRegionalInventoryDeviceDetailsWithCount.BillPartnerList"
                          :key="index">
                          <q-card>
                              <q-card-section>
                                  <q-card role="button" class="no-shadow cursor-pointer">
                                      <q-card-section class="no-padding">
                                          <div class="text-body1">{{ item.user.name }}</div>
                                      </q-card-section>
                                      <q-separator />
                                      <div>
                                          <div align="center">
                                              <br />
                                              <big>{{ item.count }}</big>
                                          </div>
                                      </div>
                                  </q-card>
                              </q-card-section>
                          </q-card>
                      </div>
                  </div>
              </div> -->
            </div>

            <div class="col-md-8">
                <div class="row bottom-border q-pa-sm items-center">
                    <div class="text-weight-regular">
                        <div class="text-grey-9 text-subtitle1 q-py-sm">{{ inventoryCountTableTitle }}</div>
                    </div>
                </div>
                <!--STARTv-model: table lead validation -->
                <q-table title="Lead Validation" table-class="customTableClass" class="q-py-none"
                    :rows="getAllAggregatorsRegionalInventorySerialNumbersByDevice" :columns="columnData"
                    :filter="filter" :pagination="paginationControl" :loading="toggleAjaxLoadFilter"
                    row-key="name">
                    <q-td v-slot:body-cell-action="props" :props="props" v-if="info == 6">
                        <div class="row no-wrap no-padding">
                            <q-btn dense no-caps no-wrap label="Usable" icon="fa fa-check square" size="md"
                                @click="fnShowUsable(props.row)" flat class="text-light-blue"></q-btn>
                            <q-btn dense no-caps no-wrap label="Faulty" icon="close" size="md"
                                @click="fnShowFaulty(props.row)" flat class="text-negative"></q-btn>
                        </div>
                    </q-td>
                    <q-td v-slot:body-cell-device_type="props" :props="props">{{
                        props.row.aggregatorDevice
                            ==
                            null ? 'NA' : props.row.aggregatorDevice.deviceName
                    }}</q-td>
                    <template v-slot:top="props" class="bottom-border">
                        <!--START: table filter,search -->
                        <div class="col-md-6">
                            <q-input clearable color="grey-9" v-model="filter"
                                placeholder="Search by SO Name, Serial Number" class="q-mr-lg q-py-sm" />
                        </div>
                        <div class="col-md-5">
                            <downloadExcel :rows="getAllAggregatorsRegionalInventorySerialNumbersByDevice"
                                :fields="json_fields" name="InventoryWithSO.xls">
                                <q-btn outline color="grey-9" label="Download as excel" />
                            </downloadExcel>
                        </div>
                    </template>
                </q-table>

                <!--END: table lead validation -->
            </div>
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
            // flag: false,
            // formData: {
            //     aggregator: "",
            // },
            // dropdDown: {
            //     aggregatorOptions: [],
            // },
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
                    // field: row => row.aggregatorDevice.deviceName,
                    field: "deviceName",
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
            "getAllRegionalInventorySerialNumbersByDevice", "getAllAggregatorsRegionalInventorySerialNumbersByDevice",
            "getAllInventorywithsoDeviceDetailsWithCount", "getAllPhonePeRegionalInventoryDeviceDetailsWithCount"
        ]),
        ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
        computedUserRegion() {
            return JSON.parse(localStorage.getItem("u_i")).region.regionAreaName;
        }
    },

    created() {
        // this.fetchAggregatorList();
        // this.getAllRegionalInventoryDeviceDetailsWithCount();
        this.fetchAllRegionalInventoryDeviceDetailsWithCount();
            this.fetchAllRegionalInventoryDeviceListBasedOnRegionalDevice();

    },
    methods: {
        ...mapActions("SAT_RegionalInventoryAllocation", [
            "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
            "FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
            "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE", "FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE"
        ]),
        ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
        ...mapActions("InventoryCentral", ["USEABLE_DEVICE", "FAULTY_DEVICE"]),

        toggleRemarks(item) {
            item.showRemarks = !item.showRemarks;
        },
        // selectedAggregators(value) {
        //     console.log("value -------->", value)

        //     this.flag = true;
        //     // this.fetchAllRegionalInventoryDeviceDetailsWithCount(value);
        //     // this.fetchAllRegionalInventoryDeviceListBasedOnRegionalDevice(value);
        // },
        fetchAllRegionalInventoryDeviceListBasedOnRegionalDevice() {
            console.log("localStorage -------->", JSON.parse(localStorage.getItem("u_i")).region)
            let param = {
                region: JSON.parse(localStorage.getItem("u_i")).region,
                action: 1
            };
            this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(param);


        },

        fetchAllRegionalInventoryDeviceDetailsWithCount(request) {
            let param = {
                region: JSON.parse(localStorage.getItem("u_i")).region.id
            };
            this.FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(param);
        },

        // fetchAggregatorList() {
        //     let self = this;
        //     let cookedArr = [];
        //     self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
        //         .then(() => {
        //             return _.map(self.getActiveCreatedAggregatorList, (item) => {
        //                 console.log("ITEM -------->", item)
        //                 cookedArr.push({
        //                     value: item,
        //                     label: item.name
        //                 });
        //                 console.log("cookedArr -------->", cookedArr)
        //                 self.dropdDown.aggregatorOptions = cookedArr;
        //                 // this.flag = true;
        //             });

        //         })
        // },

        // Function to get all device serial numbers
        fngetAllAggregatorsRegionalInventorySerialNumbersByDevice() {
            let totalDeviceCount = 0;
            let hashMapCook = this.getAllPhonePeRegionalInventoryDeviceDetailsWithCount
                .inventryCount;
            hashMapCook.map(function (value, index) {
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
            console.log("itemIndex ------>", JSON.stringify(itemIndex))
            console.log("DEVICE LOAD DATAS--------------" + JSON.stringify(this.loadDevicesTableData))
            console.log("DEVICE LOAD DATAS--------------" + JSON.stringify(this.toggleAjaxLoadFilter))
            if (itemIndex == this.$REGIONAL_INVENTORY_ALL_DEVICES) {
                this.inventoryCountTableTitle = item.name;
                this.$emit("emittedForTotalSerialNumbers");
                this.info = Math.abs(this.$REGIONAL_INVENTORY_ALL_DEVICES);
            } else if (itemIndex == this.$REGIONAL_INVENTORY_DAMAGED_DEVICE) {
                this.inventoryCountTableTitle = item.name;
                this.info = Math.abs(this.$REGIONAL_INVENTORY_FILTER_ACTION_DAMAGED);
                console.log("REGIONAL_INVENTORY_FILTER_ACTION_DAMAGED--------------" + JSON.stringify(JSON.parse(localStorage.getItem("u_i")).region))
                let requestParams = {
                    // TODO Please
                    region: JSON.parse(localStorage.getItem("u_i")).region,
                    action: Math.abs(this.$REGIONAL_INVENTORY_FILTER_ACTION_DAMAGED)
                };
                this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
            } else if (
                itemIndex == this.$REGIONAL_INVENTORY_PENDING_ALLOCATION_DEVICE
            ) {
                this.inventoryCountTableTitle = item.name;
                this.info = Math.abs(
                    this.$REGIONAL_INVENTORY_FILTER_ACTION_PENDING_ALLOCATION
                );
                let requestParams = {
                    // TODO Please
                    region: JSON.parse(localStorage.getItem("u_i")).region,
                    action: Math.abs(
                        this.$REGIONAL_INVENTORY_FILTER_ACTION_PENDING_ALLOCATION
                    )
                };

                this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
            } else if (itemIndex == this.$REGIONAL_INVENTORY_INBOUND_DEVICE) {
                this.inventoryCountTableTitle = item.name;
                this.info = Math.abs(this.$REGIONAL_INVENTORY_INBOUND_DEVICE);
                let requestParams = {
                    // TODO Please
                    region: JSON.parse(localStorage.getItem("u_i")).region,
                    action: Math.abs(this.$REGIONAL_INVENTORY_INBOUND_DEVICE)
                };

                this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
            } else if (itemIndex == this.$REGIONAL_INVENTORY_FAULTY_DEVICE) {
                this.inventoryCountTableTitle = item.name;
                this.info = Math.abs(this.$REGIONAL_INVENTORY_FAULTY_DEVICE);
                let requestParams = {
                    // TODO Please
                    region: JSON.parse(localStorage.getItem("u_i")).region,
                    action: Math.abs(this.$REGIONAL_INVENTORY_FAULTY_DEVICE)
                };
                // this.info = Math.abs(this.$REGIONAL_INVENTORY_INBOUND_DEVICE);
                this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
            } else if (itemIndex == this.$REGIONAL_INVENTORY_INVENTORY_SO) {
                this.inventoryCountTableTitle = item.name;
                this.info = Math.abs(this.$REGIONAL_INVENTORY_INVENTORY_SO);
                let requestParams = {
                    // TODO Please
                    region: JSON.parse(localStorage.getItem("u_i")).region,
                    action: Math.abs(this.$REGIONAL_INVENTORY_INVENTORY_SO)
                };
                this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
            } else if (itemIndex == this.$REGIONAL_INVENTORY_ALLOCATED_DEVICE) {
                this.inventoryCountTableTitle = item.name;
                this.info = Math.abs(this.$REGIONAL_INVENTORY_ALLOCATED_DEVICE);
                let requestParams = {
                    // TODO Please
                    region: JSON.parse(localStorage.getItem("u_i")).region,
                    action: Math.abs(this.$REGIONAL_INVENTORY_ALLOCATED_DEVICE)
                };
                this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
            } else {
                this.inventoryCountTableTitle = item.aggregatorDevice.deviceName;
                this.info = Math.abs(this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE);
                // TODO
                let requestParams = {
                    // TODO Please
                    region: JSON.parse(localStorage.getItem("u_i")).region,
                    action: this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE,
                    device: item.device.id
                };
                this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
            }
            this.toggleAjaxLoadFilter = false;
        },
        // selecteddata() {
        //   this.$REGIONAL_INVENTORY_FAULTY_DEVICE;
        //   console.log("datta", this.$REGIONAL_INVENTORY_FAULTY_DEVICE);
        // },
        fnShowUsable(action) {
            console.log("Action---------------->" + JSON.stringify(action))
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
                    console.log("Action------------->" + JSON.stringify(action))
                        .then(response => {
                            this.FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(
                                this.region
                            );
                            let requestParams = {
                                // TODO Please
                                region: JSON.parse(localStorage.getItem("u_i")).region.id,
                                action: 1
                            };
                            this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(
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
                            this.FETCH_PHONE_PE_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(
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
                            this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(
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
            alert("WELCOME")
            this.FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE();
            // this.getAllInventorywithsoDeviceDetailsWithCount();
            //FETCH_AGGREGATORS_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE
        }
    }
};
</script>
