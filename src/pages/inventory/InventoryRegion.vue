<template>
    <q-page>
        <!-- content -->
        <div>
            <div class="row bottom-border q-px-md q-py-md items-center">
                <!--START: table title -->
                <div class="col-6 col-md-6 text-h6 text-weight-regular text-grey-9">Bijlipay Inventory With Region</div>
            </div>
            <div class="row bottom-border group q-px-md q-py-md items-center text-weight-regular text-grey-9">
                <!--START: table title   :disable="disableDeviceTypeSelection" -->
                <div class="col-md-4">
                    <q-select v-model="formData.region" float-label="Select Region" radio color="grey-9"
                        @input="filterInventoryByRegion" :options="regionOptions" />
                </div>

                <div class="col-md-4 col-lg-4 group">
                    <q-select :disable="formData.region == undefined" v-model="formData.device_type"
                        float-label="Filter By Device" radio color="grey-9" @input="filterByDevice"
                        :options="deviceOptions" />
                </div>
                <div class="col-auto q-px-xs">
                        <downloadExcel :rows="regionalItems" :fields="json_fields" name="InventoryWithRegion.xls">
                          <q-btn outline color="grey-9" label="Download as excel" />
                        </downloadExcel>
                      </div>
                <!-- @input="filterByDeviceName(formData)" -->

            </div>



            <!--STARTv-model: table lead validation -->
            <q-table row-key="name" :filter="filter" :rows="regionalItems" class="q-py-none" :columns="columns"
                title="Lead Validation" table-class="customTableClass" :pagination="paginationControl">
                <!--START: table body modification  device-->
                <q-td v-slot:body-cell-region="props" :props="props">{{ props.row.region == null ?
                        'NA' : props.row.region.regionAreaName
                }}</q-td>
                <q-td v-slot:body-cell-device="props" :props="props">{{ props.row.device == null ?
                        'NA' : props.row.device.deviceName
                }}</q-td>
                <q-td v-slot:body-cell-action="props" :props="props">
                    <div class="row no-wrap no-padding">
                        <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                            @click="fnShowEditRegion(props.row)" flat class="text-light-blue">
                        </q-btn>
                        <!-- <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDisablePermission(props.row.id)" flat class="text-negative">
            </q-btn> -->
                    </div>
                </q-td>
                <!-- END: table body modification -->
                <template slot="top" class="bottom-border">
                    <!--START: table filter,search -->
                    <div class="col-md-5">
                        <q-input clearable color="grey-9" v-model="filter" placeholder="Type.."
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
            <inventoryWithRegion v-if="propShowEditRegion" :propShowEditRegion="propShowEditRegion"
                :propRowDetails="propRowDetails" @emitfnshowEditRegion="fnShowEditRegion"></inventoryWithRegion>
            <!--END: Show edit Region -->

        </div>
    </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';

// import VueBarcodeScanner from "vue-barcode-scanner";
import downloadExcel from "vue-json-excel";
// Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import showPDOmodal from "../../components/inventory/showFaultymodal.vue";
import inventoryWithRegion from "../../components/inventory/inventoryWithRegion.vue";

export default {
    name: "allocateDevice",
    components: {
        showPDOmodal,
        inventoryWithRegion,
        downloadExcel,

    },
    data() {
        return {
            disableDeviceTypeSelection: true,
            json_fields:{
                SerialNumber: "serialNumber",
                PodNumber: "podNumber",
                DeviceType: "device.deviceName",
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
                        row.device.deviceName;
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
        ...mapGetters("inventoryWithRegion", ["getinventoryWithRegion"]),
        // disabledButton() {
        //   return _.find(this.formData.scannedItems, function(oo) {
        //     return oo.deviceSerialNumbers.length > 0 ;
        //   }) == undefined
        //     ? true
        //     : false;
        // }
    },
    // mounted() {
    //     this.ajaxloadingData();
    // },
    created() {
        this.fnAjaxGetAllDevicesTypesData();
        this.fnAjaxGetAllRegionsData();
        // this.fnAjaxGetAllRegionsData();
        // this.fnAjaxFaultyInventoryData();
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
            "FEED_FAULTY_FINAL_SUBMIT"
        ]),
        ...mapActions("VerifyDevice", [
            "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID"
        ]),
        ...mapActions("inventoryWithRegion", ["FETCH_INVENTORY_WITH_REGION_DATAS"]),

        fnShowEditRegion(rowDetails) {
            this.propShowEditRegion = !this.propShowEditRegion;
            if (rowDetails != undefined) {
                this.propRowDetails = rowDetails;
            }
        },
        filterByDevice(request) {

            this.regionalItems = this.getinventoryWithRegion.filter(service => service.device.id == request)
            this.$q.loading.hide();
            
        },

        filterInventoryByRegion(value) {
            console.log("Table Datas value---------------------->" + JSON.stringify(value));
            let params = {
                regionId: value.id
            };
            this.regionalItems = [];
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Fetching data .."
            });
            this.FETCH_INVENTORY_WITH_REGION_DATAS(params)
                .then(() => {

                    this.regionalItems = this.getinventoryWithRegion;
                    // console.log("Table Datas ---------------------->" + JSON.stringify(this.regionalItems));

                    this.$q.loading.hide();
                })
                .catch(() => {
                    this.$q.loading.hide();
                });

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
