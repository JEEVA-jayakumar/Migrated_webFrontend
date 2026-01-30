<template>
    <div>
        <div class="row q-ma-md">

            <div class="col-md-4" style="border-right: 1px solid #ccc;">
                <!-- <div class="row group items-baseline">
                    <div class="col-12">
                        <q-chip color="purple-9">Step -1</q-chip>&nbsp; Select Aggregator
                    </div>
                    <div class="col">
                        <q-select color="grey-9" v-model="aggregator" float-label="Select Aggregator" radio
                            :options="aggregatorOptions" />

                    </div>
                </div> -->
                <div class="row group items-baseline">
                    <div class="col-12">
                        <q-chip color="purple-9">Step -1</q-chip>&nbsp; Enter POD number and submit
                    </div>
                    <!--aggregator == ''-->
                    <div class="col">
                        <q-input  v-model="podNumber" color="grey-9" placeholder="POD Number"
                            float-label="Enter POD Number" />
                    </div>
                    <div class="col-auto" align="right">
                        <q-btn :disabled="podNumber == ''" label="Submit"
                            class="text-white text-weight-regular common-dark-blue q-py-sm"
                            @click="fnCookDispatchedHistoryDetails" />
                    </div>
                </div>
                <div class="row">
                    <div class="q-pa-sm col-12">
                        <q-chip color="purple-9">Step -2</q-chip>&nbsp; Select a device type
                    </div>
                    <div class="col-md-12">
                        <div class="q-pa-sm cursor-pointer" v-for="(item, index) in deviceTableData" :key="index"
                            @click="fnShowDisptachedeviceHistory(index, item)">
                            <q-card class="text-white q-pa-sm"
                                :class="[activeDispatchedItemId === index ? 'shadow-8' : 'shadow-0']"
                                :style="item.aggregatorDevice.colorCode == null ? 'background:#ccc' : 'background:' + item.aggregatorDevice.colorCode">
                                <q-card-main>
                                    <div class="row text-dark">
                                        <div class="col-md-8">
                                            <div>{{ item.aggregatorDevice.deviceName }}</div>
                                            <div>{{ item.aggregatorDevice.createDate | moment("MMMM Do YYYY") }}</div>
                                        </div>
                                        <div class="col-md-4" align="right">
                                            <div>Count</div>
                                            <div class="q-title">{{ item.count }}</div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="q-pa-sm">
                    <p>
                        <q-chip color="purple-9">Step -3</q-chip>&nbsp; Click on scan
                    </p>
                    <p>
                        <q-chip color="purple-9">Step -4</q-chip>&nbsp; Once scanning is done, click on upload to
                        regional
                        inventory
                    </p>
                </div>
                <!--START: table damaged device -->
                <q-table title="Lead Validation" table-class="customTableClass" class="q-py-none"
                    :data="deviceregionalInventoryList" :columns="columnData" :filter="filter"
                    :pagination.sync="paginationControl" :loading="toggleAjaxLoadFilter" row-key="name">
                    <q-td slot="body-cell-inboundVerified" slot-scope="props" :props="props">
                        <q-btn flat v-if="props.row.inboundVerifiedStatus == 1" icon="check" color="positive" />
                        <q-btn flat v-else-if="props.row.inboundVerifiedStatus == 2" icon="clear" color="negative" />
                        <q-btn flat color="amber-9" v-else icon="warning" />
                    </q-td>
                    <template slot="top" slot-scope="props" class="bottom-border">
                        <!--START: table filter,search -->
                        <div class="col-md-12">
                            <div class="row group`">
                                <div class="col-12 col-lg-4">
                                    <q-search clearable color="grey-9" v-model="filter"
                                        placeholder="Search by device name, serial no" />
                                </div>
                                <div class="col-12 col-lg-8 group" align="right">
                                    <q-btn outline :disable="currentDeviceId == null" class="common-dark-blue"
                                        v-if="toggleScanButton" @click="fnShowDevicesVerificationStart()">Scan</q-btn>
                                    <q-btn :disable="computeEnableUploadToInventory.length == 0" outline
                                        class="common-dark-blue" @click="fnUploadDeviceSerialNumbersAsPending()">Upload
                                        to
                                        regional inventory</q-btn>
                                    <!--text-faded-->
                                </div>
                            </div>
                        </div>
                    </template>
                </q-table>
                <!--END: table lead validation -->
            </div>
        </div>
    </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    props: ["propMerchantTypeFromSO"],

    data() {
        return {
            currentDeviceId: null,
            enableUploadInventoryBtn: true,
            toggleScanButton: true,
            paginationControl: {
                rowsPerPage: 10
            },
            // flag: false,

            // aggregator: "",
            // aggregatorOptions: [],
            filter: "",
            toggleAjaxLoadFilter: false,
            activeDispatchedItemId: false,
            columnData: [
                {
                    name: "device_type",
                    required: true,
                    label: "Device",
                    align: "left",
                    field: row => row.aggregatorDevice.deviceName,
                    sortable: true
                },
                {
                    name: "serial_number",
                    required: true,
                    label: "Serial Number",
                    align: "left",
                    field: row => row.serialNumber,
                    sortable: true
                },
                {
                    name: "inboundVerified",
                    required: true,
                    label: "Status",
                    align: "left",
                    field: "inboundVerified",
                    sortable: true
                }
            ],
            tableData: [],
            deviceTableData: [],
            deviceregionalInventoryList: [],
            podNumber: ""
        };
    },
    computed: {
        ...mapGetters("SAT_RegionalInventoryAllocation", [
            "getAllRegionalInventoryPDOBasedDevicesWithCount", "getAllPhonePeRegionalInventoryPDOBasedDevicesWithCount",
            "getCurrentPODNumber"
        ]),
        ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
        computeEnableUploadToInventory() {
            return _.filter(
                this.deviceregionalInventoryList,
                oo => {
                    return oo.inboundVerifiedStatus == 1;
                }
            );
        }
    },
    created() {
        // this.fetchAggregatorList();
    },

    methods: {
        ...mapActions("SAT_RegionalInventoryAllocation", [
            "FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT",
            "FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE",
            "FETCH_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT", "FETCH_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT",
            "VERIFY_DEVICE_WITH_POD_AND_DEVICE_ID", "AGGREGATORS_VERIFY_DEVICE_WITH_POD_AND_DEVICE_ID",
            "CONVERT_INBOUND_TO_ACTIVE_DEVICE", "AGGREGATORS_CONVERT_INBOUND_TO_ACTIVE_DEVICE"
        ]),
        ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),

        // Function to populate devices details with count
        fnCookDispatchedHistoryDetails() {
            this.toggleAjaxLoadFilter = true;
            let requestParams = {
                request: { podNumber: this.podNumber }
            };
            this.FETCH_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT(
                requestParams
            )
                .then((response) => {
                    this.toggleAjaxLoadFilter = false;
                    console.log("response ------>", JSON.stringify(response))
                    this.deviceTableData = response.data.data.regionalInventoryCount;
                    this.deviceregionalInventoryList = response.data.data.regionalInventoryList;
                })
                .catch(error => {
                    this.$q.notify({
                        color: "warning",
                        position: "bottom",
                        message: error.data.message,
                        icon: "info"
                    });
                    this.getAllPhonePeRegionalInventoryPDOBasedDevicesWithCount.regionalInventoryCount = [];
                    this.getAllPhonePeRegionalInventoryPDOBasedDevicesWithCount.regionalInventoryList = [];
                    this.toggleAjaxLoadFilter = false;
                });
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
        //                 self.aggregatorOptions = cookedArr;
        //                 // this.flag = true;
        //             });

        //         })
        // },

        fnAjaxFetchAllDeviceDetailsWithCount() {
            this.toggleAjaxLoadFilter = true;
            this.FETCH_REGIONAL_INVENTORY_DEVICE_DETAIL_WITH_COUNT(
                JSON.parse(localStorage.getItem("u_i")).region.id
            )
                .then(() => {
                    let requestParams = {
                        region: JSON.parse(localStorage.getItem("u_i")).region.id,
                        action: this.$REGIONAL_INVENTORY_FILTER_ACTION_DEVICE
                    };
                    this.FETCH_REGIONAL_INVENTORY_SERIAL_NUMBER_BY_DEVICE(requestParams);
                    this.toggleAjaxLoadFilter = false;
                })
                .catch(error => {
                    this.toggleAjaxLoadFilter = false;
                });
        },

        // Create callback function to receive barcode when the scanner is already done
        onBarcodeScanned(barcode) {
            if (this.podNumber == "") {
                this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: `POD number is mandatory`,
                    icon: "clear"
                });
            } else {
                let formData = {
                    podNumber: this.podNumber,
                    device: this.currentDeviceId,
                    serialNumber: barcode
                };
                this.AGGREGATORS_VERIFY_DEVICE_WITH_POD_AND_DEVICE_ID(formData)
                    .then(() => {
                        let requestParams = {
                            podNumber: formData.podNumber,
                            device: formData.device
                        };
                        this.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: `#${barcode} - Validated`,
                            icon: "check"
                        });
                        this.FETCH_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT(
                            requestParams
                        ).then((response) => {
                            console.log("onBarcodeScanned ----->", JSON.stringify(response))

                            this.enableUploadInventoryBtn = false;
                            this.fnCookDispatchedHistoryDetails();
                        });
                        // location.reload();
                        this.toggleAjaxLoadFilter = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.$q.notify({
                            color: "negative",
                            position: "bottom",
                            message: `${error.data.message}`,
                            icon: "clear"
                        });
                        this.toggleAjaxLoadFilter = false;
                    });
            }
        },

        fnShowDevicesVerificationStart() {
            if (this.currentDeviceId == null) {
                this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "Choose a device from the list",
                    icon: "clear"
                });
            } else {
                this.$barcodeScanner.init(this.onBarcodeScanned);
                this.toggleScanButton = false;
            }
        },

        fnUploadDeviceSerialNumbersAsPending() {
            let formData = {
                podNumber: this.podNumber
            };
            this.AGGREGATORS_CONVERT_INBOUND_TO_ACTIVE_DEVICE(formData)
                .then(() => {
                    this.podNumber = null;
                    this.tableData = [];
                    this.deviceTableData = [];
                    this.deviceregionalInventoryList = [];
                    this.$emit("fetchDeviceDetailsWithCount");
                    this.$q.notify({
                        color: "positive",
                        position: "bottom",
                        message: "Successfully added",
                        icon: "check"
                    });
                    this.toggleAjaxLoadFilter = false;
                    // let requestParams = {
                    //     podNumber: this.podNumber,
                    //     device: this.currentDeviceId,
                    //     aggregator: this.aggregator
                    // };
                    // console.log("AGGREGATORS_CONVERT_INBOUND_TO_ACTIVE_DEVICE ---->", JSON.stringify(requestParams))
                    // this.FETCH_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT(
                    //     requestParams
                    // ).then(() => {
                    //     console.log("AGGREGATORS_CONVERT_INBOUND_TO_ACTIVE_DEVICE RESPONCE---->")
                    //     this.podNumber = null;
                    //     this.tableData = [];
                    //     this.deviceTableData = [];
                    //     this.aggregator = "";
                    //     this.deviceregionalInventoryList = [];
                    //     this.$emit("fetchDeviceDetailsWithCount");
                    //     this.$q.notify({
                    //         color: "positive",
                    //         position: "bottom",
                    //         message: "Successfully added to inventory",
                    //         icon: "check"
                    //     });
                    //     this.toggleAjaxLoadFilter = false;
                    // });
                })
                .catch(error => {
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: "Please try again",
                        icon: "clear"
                    });
                    this.toggleAjaxLoadFilter = false;
                });
        },

        // Function to populate tabel data based on POD data
        fnShowDisptachedeviceHistory(itemIndex, item) {
            console.log("fnShowDisptachedeviceHistory itemIndex ------>", JSON.stringify(itemIndex))
            console.log("fnShowDisptachedeviceHistory item ------>", JSON.stringify(item))
            this.activeDispatchedItemId = itemIndex;
            this.toggleAjaxLoadFilter = true;
            let requestParams = {
                podNumber: this.podNumber,
                device: item.aggregatorDevice.id,
                aggregator: this.aggregator
            };
            this.currentDeviceId = item.aggregatorDevice.id;
            this.FETCH_PHONE_PE_REGIONAL_INVENTORY_PDO_BASED_DEVICE_DETAIL_WITH_COUNT(
                requestParams
            )
                .then(() => {
                    this.$emit("refreshScanButtonVisiblity");
                    this.deviceTableData = response.data.data.regionalInventoryCount;
                    this.deviceregionalInventoryList = response.data.data.regionalInventoryList;
                    this.toggleAjaxLoadFilter = false;
                })
                .catch(error => {
                    this.$emit("refreshScanButtonVisiblity");
                    this.toggleAjaxLoadFilter = false;
                });
        }
    }
};
</script>
