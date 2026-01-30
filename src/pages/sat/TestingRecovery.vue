<template>
    <q-page>
        <div>
            <div class="col-md-6 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Aggregator Device
                Recovery</div>
            <q-table table-class="customTableClass" :data="tableData" :columns="columns" :filter="filter"
                :pagination.sync="paginationControl" row-key="name" @request="fnajaxLoadingData">
                <q-td slot="body-cell-serialNumber" slot-scope="props" :props="props">{{
                    props.row.aggregatorRegionalInventory == null ? "NA" :
                        props.row.aggregatorRegionalInventory.serialNumber
                }}</q-td>
                <q-td slot="body-cell-podNumber" slot-scope="props" :props="props">{{
                    props.row.aggregatorRegionalInventory == null ? "NA" :
                        props.row.aggregatorRegionalInventory.podNumber
                }}</q-td>
                <q-td slot="body-cell-deviceName" slot-scope="props" :props="props">{{
                    props.row.aggregatorRegionalInventory == null ? "NA" :
                        props.row.aggregatorRegionalInventory.aggregatorDevice.deviceName
                }}</q-td>
                <q-td slot="body-cell-tid" slot-scope="props" :props="props">{{
                    props.row.tid == null ? "NA" :
                        props.row.tid
                }}</q-td>
                <q-td slot="body-cell-mid" slot-scope="props" :props="props">{{
                    props.row.mid == null ? "NA" :
                        props.row.mid
                }}</q-td>
                <q-td slot="body-cell-leadNumber" slot-scope="props" :props="props">{{
                    props.row.leadInformation == null ? "NA" :
                        props.row.leadInformation.leadNumber
                }}</q-td>
                <template slot="top" slot-scope="props">
                    <div class="col-md-5">
                        <q-search clearable v-model="filter" separator color="grey-9" placeholder="Type.."
                            float-label="Search TID, MID" class="q-mr-lg q-py-sm" />
                    </div>
                    <div class="col-md-2">

                        <q-btn square outline color="purple-9" label="Download as Excel"
                            class="q-mr-lg q-py-sm float-right" size="md" @click="downloadDeviceRecovery()" />


                    </div>
                    <div class="col-md-5">
                        <q-btn-dropdown outline no-caps class="text-weight-regular" color="purple-9"
                        label="Add Phonepe Device Recovery Manufacturer">
                        <q-list link>
                            <q-item to="DeviceRecoveryUpload">
                                <q-item-side icon="search" />
                                <q-item-main>
                                    <q-item-tile label>Scan and Upload</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item @click.native="fnPhonePeBulkUpload">
                                <q-item-side icon="attach_file" />
                                <q-item-main>
                                    <q-item-tile label>Bulk upload</q-item-tile>
                                </q-item-main>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                    </div>
                 
                    <!-- <div class="col-md-3">
                        <q-btn square outline color="purple-9" label="Single Scan And Upload"
                            class="q-mr-lg q-py-sm float-right" size="md"  @click="$router.push('/sat/DeviceRecoveryUpload')" />
                          
                    </div>
                    <div class="col">
                        <q-btn square outline color="purple-9" label="Bulk Upload"
                            class="q-mr-lg q-py-sm float-right" size="md"  @click.native="fnPhonePeBulkUpload" />
                    </div> -->

                    <!--END: table excel download -->
                </template>
            </q-table>
            <!-- START SIngle Upload -->
            <!-- <DeviceRecoveryUpload
         v-if="propInventoryWithSo" 
        :propInventoryWithSo="propInventoryWithSo" 
        @emitfnshowInventoryWithSo="fnclickSingle"
     ></DeviceRecoveryUpload> -->

            <PhonepeBulkDeviceUpload v-if="openBulkUploadModal" :propOpenBulkUploadModal="openBulkUploadModal"
                :propAllDevicestypes="getPhonepeDeviceRecoveryDatas" @closeModel="fnPhonePeBulkUpload"
                @emitToggleinventoryBulkUploadOnSuccess="fnReloadPageInformation"></PhonepeBulkDeviceUpload>
            <!-- END SIngle Upload -->
        </div>
    </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
import moment from "moment";
import axios from "axios";
// import DeviceRecoveryUpload from "../../pages/sat/DeviceRecoveryUpload.vue";
import PhonepeBulkDeviceUpload from "../../pages/sat/PhonepeBulkDeviceUpload.vue";

export default {
    name: "merchantTracker",
    components: {
        PhonepeBulkDeviceUpload
    },

    data() {
        return {
            propInventoryWithSo: false,
            openBulkUploadModal: false,
            paginationControl: {
                rowsNumber: 10,
                page: 1,
                sortBy: 'tid',
                descending: false,
                rowsPerPage: 10
            },
            tableData: [],
            json_fields: {
                SOName: "name",
                PodNumber: "pod_number",
                SerialNumber: "serial_number",
                DeviceType: "device_name",
                createDate: {
                    field: "created_at",
                    callback: value => {
                        if (value == null) {
                            return "NA";
                        } else {
                            return moment(value).format("DD/MM/YYYY");
                        }
                    }
                },
                ReceivedDate: {
                    field: "updated_at",
                    callback: value => {
                        if (value == null) {
                            return "NA";
                        } else {
                            return moment(value).format("DD/MM/YYYY");
                        }
                    }
                },
                BPRegion: "region_name"
            },
            filter: "",
            filter_values: "",
            columns: [
                {
                    name: "leadNumber",
                    required: true,
                    label: "Lead Number",
                    align: "center",
                    field: row => {
                        row.leadInformation.leadNumber;
                    },

                    sortable: false
                },
                {
                    name: "serialNumber",
                    required: true,
                    label: "Serial Number",
                    align: "center",
                    field: row => {
                        row.aggregatorRegionalInventory.serialNumber;
                    },

                    sortable: false
                },
                {
                    name: "tid",
                    required: true,
                    label: "TID",
                    align: "center",
                    field: "tid",

                    sortable: true
                },
                {
                    name: "mid",
                    required: true,
                    label: "MID",
                    align: "center",
                    field: "mid",

                    sortable: false
                },
                {
                    name: "podNumber",
                    required: true,
                    label: "Pod Number",
                    align: "center",
                    field: row => {
                        row.aggregatorRegionalInventory.podNumber;
                    },

                    sortable: false
                },
                {
                    name: "deviceName",
                    required: true,
                    label: "Device Name",
                    align: "center",
                    field: row => {
                        row.aggregatorRegionalInventory.aggregatorDevice.deviceName;
                    },

                    sortable: false
                },

                //   {aggregatorDevice.deviceName
                //     name: "pod_number",
                //     label: "podNumber",
                //     field: "pod_number",
                //     align: "center",
                //     sortable: true
                //   },
                //   {
                //     name: "serial_number",
                //     label: "serialNumber",
                //     field: "serial_number",
                //     align: "center",
                //     sortable: true
                //   },
                //   {
                //     name: "device_name",
                //     required: true,
                //     label: "Device Type",
                //     align: "center",
                //     field: "device_name",

                //     sortable: true
                //   },
                //   {
                //     name: "created_at",
                //     required: true,
                //     label: "Create Date",
                //     align: "center",
                //     field: row => {
                //       return moment(row.created_at).format("DD/MM/YYYY");
                //     }
                //   },
                //   {
                //     name: "updated_at",
                //     required: true,
                //     label: "Receive Date",
                //     align: "center",
                //     field: row => {
                //       return moment(row.updated_at).format("DD/MM/YYYY");
                //     }
                //   },

                //   {
                //     name: "region_name",
                //     required: true,
                //     label: "BPRegion",
                //     align: "center",
                //     field: "region_name",

                //     sortable: true
                //   }
            ]
        };
    },
    computed: {
        ...mapGetters("InventoryWithSo", ["getAllInventoryWithSo"]),
        ...mapGetters("PhonepeDeviceRecovery", ["getPhonepeDeviceRecoveryDatas"])
    },
    mounted() {
        this.fnajaxLoadingData({
            pagination: this.paginationControl,
            filter: this.filter
        });
    },
    methods: {
        ...mapActions("InventoryWithSo", ["FETCH_INVENTORY_WITH_SO"]),
        ...mapActions("PhonepeDeviceRecovery", ["FETCH_PHONEPE_DEVICE_RECOVERY_DATAS", "DOWNLOAD_PHONEPE_DEVICE_RECOVERY_DATAS"]),
        ...mapActions("reports", ["INVENTORY_WITH_SO_LIST_DOWNLOAD"]),

        //     fnclickSingle(){
        //   this.propInventoryWithSo =! this.propInventoryWithSo;
        // },

        fnPhonePeBulkUpload() {
            this.openBulkUploadModal = !this.openBulkUploadModal;
        },
        fnReloadPageInformation() {
            this.fnajaxLoadingData({
                pagination: this.paginationControl,
                filter: this.filter
            });
        },

        fnajaxLoadingData({ pagination, filter }) {
            // we set QTable to "loading" state
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: 'purple-9',
                message: 'Fetching data ..'
            });
            this.FETCH_PHONEPE_DEVICE_RECOVERY_DATAS({ pagination, filter })
                .then(res => {
                    //     console.log("getPhonepeDeviceRecoveryDatas ------>",JSON.stringify(this.getPhonepeDeviceRecoveryDatas))
                    //   this.tableData = this.getPhonepeDeviceRecoveryDatas.content;
                    //   console.log("FETCH_PHONEPE_DEVICE_RECOVERY_DATAS ------>",JSON.stringify(this.tableData))
                    // updating pagination to reflect in the UI
                    this.paginationControl = pagination;

                    // we also set (or update) rowsNumber
                    this.paginationControl.rowsNumber = this.getPhonepeDeviceRecoveryDatas.totalElements;
                    this.paginationControl.page = this.getPhonepeDeviceRecoveryDatas.number + 1;

                    // then we update the rows with the fetched ones
                    this.tableData = this.getPhonepeDeviceRecoveryDatas.content;
                    if (this.getPhonepeDeviceRecoveryDatas.sort != null) {
                        this.paginationControl.sortBy = this.getPhonepeDeviceRecoveryDatas.sort[0].property;
                        this.paginationControl.descending = this.getPhonepeDeviceRecoveryDatas.sort[0].ascending;
                    }
                    this.$q.loading.hide();
                })
                .catch(() => {
                    this.$q.loading.hide();
                });
        },

        downloadInventoryWithSoList() {
            this.propInventoryWithSo = !this.propInventoryWithSo;
        },
        downloadDeviceRecovery() {
            this.$q.loading.show({
                delay: 100 // ms
            });
            this.DOWNLOAD_PHONEPE_DEVICE_RECOVERY_DATAS(this.formData)
                .then(() => {
                    this.$q.loading.hide();
                    this.$q.notify({
                        color: "positive",
                        position: "bottom",
                        message: "Success, file has been downloaded",
                        icon: "check"
                    });
                })
                .catch(error => {
                    this.$q.loading.hide();
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: "Please try again",
                        icon: "thumb_down"
                    });
                });
        }
        // async fetchData() {
        //   console.log("hellow");
        //   const response = await axios.get(
        //     "http://192.168.4.205:8080/api/allsoinventorydetails"
        //   );

        //   return response;
        // }
    }
};
</script>

<style>

</style>
