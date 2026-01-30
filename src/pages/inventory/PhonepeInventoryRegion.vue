<template>
    <q-page>
        <!-- content -->
        <div>
            <div class="row bottom-border q-px-md q-py-md items-center">
                <!--START: table title -->
                <div class="col-6 col-md-6 q-title text-weight-regular text-grey-9">Aggregator Inventory With Region
                </div>
            </div>
            <div class="row bottom-border group q-px-md q-py-md items-center text-weight-regular text-grey-9">
                <!--START: table title   :disable="disableDeviceTypeSelection" -->
                <div class="col-md-2">
                    <q-select v-model="formData.region" float-label="Select Region" radio color="grey-9"
                        :options="regionOptions" @input="selectedAggregators" />
                </div>
                <!--@input="filterInventoryByRegion" -->
                <!-- <div class="col-md-2">
                    <q-select color="grey-9" :disable="formData.region == undefined" v-model="aggregator"
                        float-label="Select Aggregator" radio :options="aggregatorOptions"
                        @input="selectedAggregators" />
                </div> -->
                <div class="col-md-2">
                    <q-select :disable="formData.region == ''" v-model="formData.device_type"
                        float-label="Filter By Device" radio color="grey-9" @input="filterByDevice"
                        :options="deviceOptions" />
                </div>
                <div class="col-auto q-px-xs">
                    <downloadExcel :data="regionalItems" :fields="json_fields" name="InventoryWithRegion.xls">
                        <q-btn outline color="grey-9" label="Download as excel" />
                    </downloadExcel>
                </div>
                <!-- @input="filterByDeviceName(formData)" -->

            </div>



            <!--START: table lead validation -->
            <q-table row-key="name" :filter="filter" :data="regionalItems" class="q-py-none" :columns="columns"
                title="Lead Validation" table-class="customTableClass" :pagination.sync="paginationControl">
                <!--START: table body modification  device-->
                <q-td slot="body-cell-region" slot-scope="props" :props="props">{{
                    props.row.region == null ?
                        'NA' : props.row.region.regionAreaName
                }}</q-td>
                <q-td slot="body-cell-device" slot-scope="props" :props="props">{{
                    props.row.aggregatorDevice == null ?
                        'NA' : props.row.aggregatorDevice.deviceName
                }}</q-td>
                <q-td slot="body-cell-aggregator" slot-scope="props" :props="props">{{
                    props.row.aggregator == null ?
                        'NA' : props.row.aggregator.name
                }}</q-td>
                <!-- aggregator -->
                <q-td slot="body-cell-action" slot-scope="props" :props="props">
                    <div class="row no-wrap no-padding">
                        <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                            @click="fnShowAggregatorsEditRegion(props.row)" flat class="text-light-blue">
                        </q-btn>
                        <!-- <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDisablePermission(props.row.id)" flat class="text-negative">
            </q-btn> -->
                    </div>
                </q-td>
                <!-- END: table body modification -->
                <template slot="top" class="bottom-border">
                    <!--START: table filter,search -->
                    <div class="col-md-5">
                        <q-search clearable color="grey-9" v-model="filter" placeholder="Type.."
                            float-label="Search SerialNumber & podNumber..." class="q-mr-lg q-py-sm" />
                    </div>
                    <!--END: table filter,search -->
                </template>
            </q-table>
            <!--END: table lead validation -->
            <!--START: Open showPDOmodal model -->
            <showPDOmodal v-if="showPDOmodal" :propshowPDOmodal="showPDOmodal" :propAllScannedItemArr="formData"
                @closeModel="fnAllocateDeviceToRegion"></showPDOmodal>
            <!--END: Open showPDOmodal model -->

            <!--START: Show edit Region -->
            <AggregatorsinventoryWithRegion v-if="propShowEditRegion" :propShowEditRegion="propShowEditRegion"
                :propRowDetails="propRowDetails" @emitfnshowAggregatorsEditRegion="fnShowAggregatorsEditRegion">
            </AggregatorsinventoryWithRegion>
            <!--END: Show edit Region -->

        </div>
    </q-page>
</template>

<script>
import Vue from "vue";
import VueBarcodeScanner from "vue-barcode-scanner";
import downloadExcel from "vue-json-excel";
Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import showPDOmodal from "../../components/inventory/showFaultymodal.vue";
import AggregatorsinventoryWithRegion from "../../components/inventory/AggregatorsinventoryWithRegion.vue";

export default {
    name: "allocateDevice",
    components: {
        showPDOmodal,
        AggregatorsinventoryWithRegion,
        downloadExcel,

    },
    data() {
        return {
            disableDeviceTypeSelection: true,
            json_fields: {
                SerialNumber: "serialNumber",
                PodNumber: "podNumber",
                DeviceType: "aggregatorDevice.deviceName",
                Aggregator: "aggregator.name",
                Region: "region.regionAreaName"

            },
            disableSubmitButton: true,
            toggleFaultyBulkUpload: false,
            propShowEditRegion: false,
            filter: "",
            showPDOmodal: false,
            regionOptions: [],
            deviceOptions: [],
            regionalItems: [],
            aggregatorOptions: [],
            columns: [
                {
                    name: "serialNumber",
                    required: true,
                    label: "Serial number",
                    align: "left",
                    field: "serialNumber",
                    sortable: false
                },
                {
                    name: "podNumber",
                    required: true,
                    label: "Pod Number",
                    align: "left",
                    field: "podNumber",
                    sortable: false
                },
                {
                    name: 'region',
                    required: true,
                    label: 'Region',
                    align: 'center',
                    field: row => {
                        row.region.regionAreaName;
                    },
                    sortable: false
                },
                {
                    name: 'device',
                    required: true,
                    label: 'Device Type',
                    align: 'center',
                    field: row => {
                        row.aggregatorDevice.deviceName;
                    },
                    sortable: false
                },
                {
                    name: 'aggregator',
                    required: true,
                    label: 'Aggregator',
                    align: 'center',
                    field: row => {
                        row.aggregator.name;
                    },
                    sortable: false
                },
                {
                    name: "action",
                    required: true,
                    label: "",
                    align: "left",
                    field: "action",
                    sortable: false,
                },


            ],
            tableData: [],
            formData: {
                device_type: "",
                scannedItems: []
            },
            aggregator: "",
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
            "getInvenotryAsFaultyData"
        ]),
        ...mapGetters("superAdminAggregatorsDevice", ["getCreatedActiveDeviceList"]),
        ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
        ...mapGetters("inventoryWithRegion", ["getinventoryWithRegion", "getAggregatorsInventoryWithRegion"]),
        // disabledButton() {
        //   return _.find(this.formData.scannedItems, function(oo) {
        //     return oo.deviceSerialNumbers.length > 0 ? true : false;
        //   }) == undefined
        //     ? true
        //     : false;
        // }
    },
    // mounted() {
    //     this.ajaxloadingData();
    // },
    created() {
        // this.fnAjaxGetAllDevicesTypesData();
        this.fnAjaxGetAllRegionsData();
        this.fnAjaxGetAllAggregatorList();
        // this.fnAjaxGetAllRegionsData();
        // this.fnAjaxFaultyInventoryData();
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
            "FETCH_ALL_REGIONS_DATA",
            "FEED_FAULTY_FINAL_SUBMIT"
        ]),
        ...mapActions("superAdminAggregatorsDevice", ["GET_ACTIVE_CREATED_DEVICE_LIST"]),
        ...mapActions("VerifyDevice", [
            "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID"
        ]),
        ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
        ...mapActions("inventoryWithRegion", ["FETCH_INVENTORY_WITH_REGION_DATAS", "FETCH_AGGREGATORS_INVENTORY_WITH_REGION_DATAS"]),

        fnShowAggregatorsEditRegion(rowDetails) {
            this.propShowEditRegion = !this.propShowEditRegion;
            if (rowDetails != undefined) {
                this.propRowDetails = rowDetails;
            }
        },
        filterByDevice(request) {
            console.log("this.getAggregatorsInventoryWithRegion---------------------->" + JSON.stringify(this.getAggregatorsInventoryWithRegion.filter(service => service.aggregatorDevice.id)));
            console.log("Table Datas value---------------------->" + JSON.stringify(request));
            this.regionalItems = this.getAggregatorsInventoryWithRegion.filter(service => service.aggregatorDevice.id == request)
            this.$q.loading.hide();

        },

        filterInventoryByRegion(value) {
            console.log("Table Datas value---------------------->" + JSON.stringify(value));
            let params = {
                regionId: value.region.id

            };
            this.regionalItems = [];
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Fetching data .."
            });
            this.FETCH_AGGREGATORS_INVENTORY_WITH_REGION_DATAS(params)
                .then(() => {
                    console.log("this.getAggregatorsInventoryWithRegion ---------------------->" + JSON.stringify(this.getAggregatorsInventoryWithRegion));
                    this.regionalItems = this.getAggregatorsInventoryWithRegion;
                    // console.log("Table Datas ---------------------->" + JSON.stringify(this.regionalItems));

                    this.$q.loading.hide();
                })
                .catch(() => {
                    this.$q.loading.hide();
                });

        },
        selectedAggregators() {
            this.filterInventoryByRegion({ region: this.formData.region });
            self = this;
            let cookedArr1 = [];
            self.GET_ACTIVE_CREATED_DEVICE_LIST()
                .then(() => {
                    return _.map(this.getCreatedActiveDeviceList, (item) => {
                        console.log("ITEM -------->", item)
                        cookedArr1.push({
                            value: item.id,
                            label: item.deviceName
                        });
                        console.log("cookedArr1 -------->", cookedArr1)
                        self.deviceOptions = cookedArr1;
                    })
                })
        },

        fnAjaxGetAllRegionsData() {
            this.FETCH_ALL_REGIONS_DATA()
                .then(() => {
                    let assumeArr = [];
                    this.getAllRegionsData.map(function (value, index) {
                        assumeArr.push({
                            label: value.regionAreaName,
                            value: value
                        });
                    });
                    this.regionOptions = assumeArr;
                })
                .catch(error => {
                    this.regionOptions = [];
                });
        },

        fnAjaxGetAllAggregatorList() {
            let self = this;
            let cookedArr = [];
            self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
                .then(() => {
                    return _.map(self.getActiveCreatedAggregatorList, (item) => {
                        console.log("ITEM -------->", item)
                        cookedArr.push({
                            value: item,
                            label: item.name
                        });
                        console.log("cookedArr -------->", cookedArr)
                        self.aggregatorOptions = cookedArr;
                        // this.flag = true;
                    });

                })
        },

        // Function to get all device types
        fnAjaxGetAllDevicesTypesData() {
            this.FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA()
                .then(() => {
                    let assumeArr = [];
                    this.getAllInventoryDevicesTypesData.map(function (value, index) {
                        assumeArr.push({
                            label: value.deviceName,
                            value: value.id
                        });
                    });
                    this.deviceOptions = assumeArr;
                })
                .catch(error => {
                    this.deviceOptions = [];
                });
        },

    }
};
</script>
