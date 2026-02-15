<template>
    <q-page>
        <!-- content -->
        <div>

            <q-tabs class="shadow-1" color="grey-1">
                <q-tab default color="dark" name="active" slot="title" label="Active Aggregators Device" />
                <q-tab color="dark" name="deactive" slot="title" label="Deactive Aggregators Device" />
                <q-tab-panel name="active">
                    <q-table :rows="activeTableData" table-class="customSATableClass" :columns="columns"
                        :filter="filterSearch" :pagination="paginationControl"
                        :filter-method="myCustomSearchFilter" row-key="name" color="grey-9">
                        <q-td v-slot:body-cell-name="props" :props="props">{{ props.row.aggregator
                                == null ? "NA" : props.row.aggregator.name
                        }}</q-td>
                        <q-td v-slot:body-cell-action="props" :props="props">
                            <div class="row no-wrap no-padding">
                                <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                                    @click="fnShowEditAggregatorDevice(props.row)" flat class="text-light-blue"></q-btn>
                                <q-btn dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md"
                                    @click="fnDeleteAggregatorsDevice(props.row)" flat class="text-negative"></q-btn>
                            </div>
                        </q-td>

                        <template v-slot:top="props">
                            <!--END: table title -->
                            <!--START: table filter,search -->
                            <div class="col-6">
                                <q-input clearable color="grey-9" v-model="filterSearch" placeholder="Type.."
                                    class="q-mr-lg" />
                            </div>
                            <!--END: table filter,search -->
                            <div class="col-6" align="right">
                                <q-btn no-caps class="text-weight-regular" label="Add New Aggregators Device"
                                    @click="fnShowAddNewAggregatorsDevice(props.row)" color="purple-9" size="md" />
                            </div>
                        </template>
                    </q-table>
                </q-tab-panel>

                <q-tab-panel name="deactive">
                    <q-table :rows="deActiveTableData" table-class="customSATableClass" :columns="columns1"
                        :filter="filterSearch" :pagination="paginationControl"
                        :filter-method="myCustomSearchFilter" row-key="name" color="grey-9">
                        <q-td v-slot:body-cell-name="props" :props="props">{{ props.row.aggregator
                                == null ? "NA" : props.row.aggregator.name
                        }}</q-td>
                        <q-td v-slot:body-cell-action1="props" :props="props">
                            <div class="row no-wrap no-padding">
                                <q-btn dense no-caps no-wrap label="Active" icon="far fa-plus-square" size="md"
                                    @click="fnActivate(props.row)" flat class="positive"></q-btn>
                                <!-- <q-btn dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md"
                                    @click="fnDeleteAggregators(props.row)" flat class="text-negative"></q-btn> -->
                            </div>
                        </q-td>

                        <template v-slot:top="props">
                            <!--END: table title -->
                            <!--START: table filter,search -->
                            <div class="col-6">
                                <q-input clearable color="grey-9" v-model="filterSearch" placeholder="Type.."
                                    class="q-mr-lg" />
                            </div>
                            <!--END: table filter,search -->
                            <!-- <div class="col-6" align="right">
                                <q-btn no-caps class="text-weight-regular" label="Add New Aggregators"
                                    @click="fnShowAddNewAggregators(props.row)" color="purple-9" size="md" />
                            </div> -->
                        </template>
                    </q-table>
                </q-tab-panel>
                <!-- We can't disable regiongroup because existing flow through errors-->


            </q-tabs>

            <!--START: Show create Regions -->
            <showCreateRegion v-if="propShowCreateRegions" :propShowCreateRegions="propShowCreateRegions"
                @emitfnshowRegions="fnshowCreateRegions" @emitfnForRegionTable="ajaxLoadDataForRegionTable" />
            <!--END: Show create Regions -->
            <!--START: Show edit Regions -->
            <showEditAggregatorDevice v-if="propShowEditAggregatorDevice"
                :propShowEditAggregatorDevice="propShowEditAggregatorDevice" :propRowDetails="propRowDetails"
                @emitfnShowEditAggregatorDevice="fnShowEditAggregatorDevice" />
            <!--END: Show edit Regions -->

            <!--START regiongroup-->
            <ShowAddNewAggregatorsDevice v-if="propShowAddNewAggregatorsDevice"
                :propShowAddNewAggregatorsDevice="propShowAddNewAggregatorsDevice" :propRowDetails="propRowDetails"
                @emitfnShowAddNewAggregatorsDevice="fnShowAddNewAggregatorsDevice" />
            <!--END regiongroup-->



        </div>
    </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
import showCreateRegion from "../../components/super_admin/showCreateRegions.vue";
import showEditAggregatorDevice from "../../components/super_admin/showEditAggregatorDevice.vue";
import ShowAddNewAggregatorsDevice from "../../components/super_admin/ShowAddNewAggregatorsDevice.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "regions",
    components: {
        showCreateRegion,
        showEditAggregatorDevice,
        ShowAddNewAggregatorsDevice,
    },
    data() {
        return {
            propShowCreateRegions: false,
            propShowEditAggregatorDevice: false,
            propShowAddNewRegions: false,
            propShowAddNewAggregatorsDevice: false,
            propRowDetails: "",
            // propRowDetails1:"",

            filter: "",
            filterSearch: "",
            filterSearch1: "",
            filter_values: "",
            multipleSelect: "",

            paginationControl: {
                rowsPerPage: 10
            },
            paginationControl1: {
                rowsPerPage: 10
            },
            //table information
            columns: [
                {
                    name: "name",
                    required: true,
                    label: "Aggregator",
                    align: "left",
                    field:"name",
                    //  row => {
                    //     row.aggregator.name;
                    // },
                    sortable: false
                },
                {
                    name: "deviceName",
                    required: true,
                    label: "Device",
                    align: "left",
                    field: "deviceName",
                    sortable: false
                },
                {
                    name: "action",
                    required: true,
                    label: "",
                    align: "left",
                    field: "action",
                    sortable: false
                }
            ],
            columns1: [
            {
                    name: "name",
                    required: true,
                    label: "Aggregator",
                    align: "left",
                    field:"name",
                    //  row => {
                    //     row.aggregator.name;
                    // },
                    sortable: false
                },
                {
                    name: "deviceName",
                    required: true,
                    label: "Device",
                    align: "left",
                    field: "deviceName",
                    sortable: false
                },
                {
                    name: "action1",
                    required: true,
                    label: "",
                    align: "left",
                    field: "action1",
                    sortable: false
                }
            ],
            tableData: [],
            activeTableData: [],
            deActiveTableData: [],

        };
    },

    created() {
        /* START: Load user table data filter > Regions */
        this.ajaxLoadDataForRegionTable();
        /* End: Load user table data filter > Regions */
    },

    computed: {
        ...mapGetters("SuperAdminUsers", [
            "getAllRegionsData",
            "getAllRegionsData1"
        ]),
        ...mapGetters("regionGroupDatas", ["getAllRegionGroupData"]),
        ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList"]),
        ...mapGetters("superAdminAggregatorsDevice", ["getCreatedAggregatorDeviceList"])
    },

    methods: {
        ...mapActions("SuperAdminUsers", [
            "FETCH_ALL_REGIONS_DATA",
            "FETCH_ALL_REGIONS_DATA1",
            "DELETE_REGIONS_BY_REGIONS_ID_DATA"
        ]),
        ...mapActions("regionGroupDatas", ["FETCH_REGION_GROUP_DATAS", "DELETE_REGION_GROUP_DATAS", "ACTIVE_REGION_GROUP_DATAS"]),
        ...mapActions("superAdminAggregatorsDevice", ["GET_CREATED_AGGREGATORS_DEVICE_LIST", "DELETE_CREATED_AGGREGATORS_DEVICE_LIST", "EDIT_CREATED_AGGREGATORS_DEVICE_LIST"]),
        ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "DELETE_CREATED_AGGREGATORS", "EDIT_CREATED_AGGREGATORS"]),
        // GET_CREATED_AGGREGATORS_DEVICE_LIST
        ajaxLoadDataForRegionTable() {
            this.GET_CREATED_AGGREGATORS_DEVICE_LIST()
                .then(response => {
                    console.log("getCreatedAggregatorDeviceList 123 DATA-------->", JSON.stringify(this.getCreatedAggregatorDeviceList))
                    this.tableData = this.getCreatedAggregatorDeviceList;
                    // console.log("REGION GROUP 123 DATA-------->", JSON.stringify(this.tableData))
                    this.activeTableData = this.getCreatedAggregatorDeviceList.filter(service => service.active == true);
                    this.deActiveTableData = this.getCreatedAggregatorDeviceList.filter(service => service.active == false);

                    this.$q.loading.hide();
                })
                .catch(() => {
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                        icon: "thumb_down",
                    });
                });
            this.FETCH_ALL_REGIONS_DATA();
        },
        fnActivate(request) {
            console.log("fnActivate VALUES-------->", JSON.stringify(request))
            this.$q
                .dialog({
                    title: "Confirm",
                    message: "Are you sure want to active?",
                    ok: "Continue",
                    cancel: "Cancel"
                })
                .then(() => {
                    this.$q.loading.show({
                        delay: 100, // ms
                        message: "Please Wait",
                        spinnerColor: "purple-9",
                        customClass: "shadow-none"
                    });
                    this.EDIT_CREATED_AGGREGATORS_DEVICE_LIST(request)
                        .then(response => {
                            this.GET_CREATED_AGGREGATORS_DEVICE_LIST();
                            this.$q.notify({
                                color: "positive",
                                position: "bottom",
                                message: "Successfully Activated",
                                icon: "thumb_up"
                            });
                            this.ajaxLoadDataForRegionTable();
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
        fnDeleteAggregatorsDevice(rowDetails) {
            console.log("DELETED VALUES-------->", JSON.stringify(rowDetails))
            this.$q
                .dialog({
                    title: "Confirm",
                    message: "Are you sure want to delete ?",
                    ok: "Continue",
                    cancel: "Cancel"
                })
                .then(() => {
                    this.$q.loading.show({
                        delay: 100, // ms
                        message: "Please Wait",
                        spinnerColor: "purple-9",
                        customClass: "shadow-none"
                    });
                    this.DELETE_CREATED_AGGREGATORS_DEVICE_LIST(rowDetails)
                        .then(response => {
                            this.GET_CREATED_AGGREGATORS_DEVICE_LIST();
                            this.$q.notify({
                                color: "positive",
                                position: "bottom",
                                message: "Successfully removed",
                                icon: "thumb_up"
                            });
                            this.ajaxLoadDataForRegionTable();
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
        fnShowAddNewAggregatorsDevice(rowDetails) {
            this.propShowAddNewAggregatorsDevice = !this.propShowAddNewAggregatorsDevice;
            this.propRowDetails = rowDetails;
        },
        fnActiveRegionGroup(reqData) {
            console.log("DISABLE DATAS------------->", JSON.stringify(reqData))
            this.$q
                .dialog({
                    title: "Confirm",
                    message: "Are you sure want to Active Region?",
                    ok: "Continue",
                    cancel: "Cancel"
                })
                .then(() => {
                    this.$q.loading.show({
                        delay: 100, // ms
                        message: "Please Wait",
                        spinnerColor: "purple-9",
                        customClass: "shadow-none"
                    });
                    let param = {
                        regionAreaName: reqData.regionAreaName,
                        active: reqData.active == false ? true : reqData.active,
                        id: reqData.id
                    };
                    this.ACTIVE_REGION_GROUP_DATAS(param)
                        .then(response => {
                            this.$q.loading.hide();
                            this.$q.notify({
                                color: "positive",
                                position: "bottom",
                                message: "Successfully activated",
                                icon: "thumb_up"
                            });
                            this.$q.loading.hide();
                        })
                        .catch(error => {
                            this.$q.notify({
                                color: "warning",
                                position: "bottom",
                                message: "Please try again!",
                                icon: "thumb_down"
                            });
                            this.$q.loading.hide();
                        });

                })

        },
        fnshowCreateRegions() {
            this.propShowCreateRegions = !this.propShowCreateRegions;
        },

        fnShowEditAggregatorDevice(rowDetails, token) {
            this.propShowEditAggregatorDevice = !this.propShowEditAggregatorDevice;
            this.propRowDetails = rowDetails;
            if (token == "refresh") {
                this.ajaxLoadDataForRegionTable();
            }
        },

        fnDeleteRegionGroup(rowDetails) {
            console.log("DELETED VALUES-------->", JSON.stringify(rowDetails))
            this.$q
                .dialog({
                    title: "Confirm",
                    message: "Are you sure want to delete region?",
                    ok: "Continue",
                    cancel: "Cancel"
                })
                .then(() => {
                    this.$q.loading.show({
                        delay: 100, // ms
                        message: "Please Wait",
                        spinnerColor: "purple-9",
                        customClass: "shadow-none"
                    });
                    this.DELETE_REGION_GROUP_DATAS(rowDetails)
                        .then(response => {
                            this.FETCH_ALL_REGIONS_DATA();
                            this.$q.notify({
                                color: "positive",
                                position: "bottom",
                                message: "Successfully removed",
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

        myCustomSearchFilter(rows, terms, cols, cellValue) {
            const lowerTerms = terms ? terms.toLowerCase() : "";
            return rows.filter(row =>
                cols.some(
                    col =>
                        (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
                )
            );
        }
    }
};
</script>

<style>

</style>
