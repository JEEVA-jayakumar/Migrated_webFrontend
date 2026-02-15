<template>
    <q-page>
        <div>
            <q-tabs no-pane-border v-model="selectedTab" color="dark" inverted class="shadow-1"
                @select="goToSelectedTab">
                <q-tab default color="dark" name="tab-1" slot="title" label="Approved Pod" />
                <q-tab color="dark" name="tab-2" slot="title" label="Rejected Pod" />
                <q-tab color="dark" name="tab-3" slot="title" label=" Allocated Pod" />

                <q-tab-panel name="tab-1">
                    <q-table :rows="tableData" table-class="customSATableClass" :columns="columns"
                        :filter="filterSearch" :pagination="paginationControl"
                        :filter-method="myCustomSearchFilter" row-key="name" color="grey-9"
                        @request="ajaxLoadAllLeadInfo">
                        <q-td v-slot:body-cell-createdAt="props" :props="props">{{
                                props.row.created_date == null
                                    ? "NA"
                                    : props.row.created_date | moment("Do MMM Y")
                        }}</q-td>
                          <q-td v-slot:body-cell-updated_date="props" :props="props">{{
                                props.row.updated_date == null
                                    ? "NA"
                                    : props.row.updated_date | moment("Do MMM Y")
                        }}</q-td>
                        <q-td v-slot:body-cell-status="props" :props="props">
                            <span class="label text-positive" v-if="props.row.status == 1">Created</span>
                            <span class="label text-primary" v-else-if="props.row.status == 2">Assigned to R.I</span>
                            <span class="label text-orange" v-else-if="props.row.status == 3">Approved By R.I</span>
                            <span class="label text-orange" v-else-if="props.row.status == 4">Assigned To SO</span>
                            <span class="label text-orange" v-else-if="props.row.status == 5">
                                Approved By So</span>
                            <span class="label text-orange" v-else-if="props.row.status == 6">
                                Rejected</span>

                            <span class="label text-negative" v-else>NA</span>
                        </q-td>
                        <q-td v-slot:body-cell-owner="props" :props="props">
                            <span class="label text-positive" v-if="props.row.owner == 1">Central Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 2">Regional Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 3">SO</span>
                        </q-td>
                        <q-td v-slot:body-cell-regionAreaName="props" :props="props">{{
                                props.row.allocate_region == null
                                    ? "NA"
                                    : props.row.allocate_region.regionAreaName
                        }}</q-td>
                        <q-td v-slot:body-cell-action="props" :props="props">
                            <!-- <div class="row no-wrap no-padding">

                                <q-btn dense no-caps no-wrap label="Reject" icon="far fa-minus-square" size="md"
                                    @click="fnRejectPodDetails(props.row)" flat class="text-negative"></q-btn>
                                <q-btn dense no-caps no-wrap label="Approve" icon="far fa-plus-square" size="md"
                                    @click="fnApprovePodDetails(props.row)" flat class="text-light-blue"></q-btn>
                            </div> -->
                        </q-td>

                        <template v-slot:top="props">
                            <!--START: table title -->
                            <!--<div class="col-12 text-h6 q-my-lg text-weight-regular">
               Incoming Pod
              </div> -->
                            <!-- <div class="col-md-6 q-my-md" align="right">
               <q-btn no-caps no-wrap label="Add New Regions" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateRegions()"/>
              </div>-->
                            <!--END: table title -->
                            <!--START: table filter,search
                @click="fnShowAddNewServiceType(props.row)" -->
                            <div class="col-3">
                                <q-input clearable color="grey-9" v-model="filterSearch" float-label="Search By POD Number" placeholder="Type.."
                                    class="q-mr-lg" />
                            </div>
                            <!--ENDv-model: table filter,search -->
                        </template>
                    </q-table>
                </q-tab-panel>
                <q-tab-panel name="tab-2">
                    <q-table :rows="tableData1" table-class="customSATableClass" :columns="columns1"
                        :filter="filterSearch1" :pagination="paginationControl1"
                        :filter-method="myCustomSearchFilter" row-key="name" color="grey-9"
                        @request="ajaxLoadAllLeadInfo1">
                        <q-td v-slot:body-cell-createdAt="props" :props="props">{{
                                props.row.created_date == null
                                    ? "NA"
                                    : props.row.created_date | moment("Do MMM Y")
                        }}</q-td>
                         <q-td v-slot:body-cell-updated_date="props" :props="props">{{
                                props.row.updated_date == null
                                    ? "NA"
                                    : props.row.updated_date | moment("Do MMM Y")
                        }}</q-td>
                        <q-td v-slot:body-cell-status="props" :props="props">
                            <span class="label text-positive" v-if="props.row.status == 1">Created</span>
                            <span class="label text-primary" v-else-if="props.row.status == 2">Assigned to R.I</span>
                            <span class="label text-orange" v-else-if="props.row.status == 3">Approved By R.I</span>
                            <span class="label text-orange" v-else-if="props.row.status == 4">Assigned To SO</span>
                            <span class="label text-orange" v-else-if="props.row.status == 5">
                                Approved By So</span>
                            <span class="label text-orange" v-else-if="props.row.status == 6">
                                Rejected</span>

                            <span class="label text-negative" v-else>NA</span>
                        </q-td>
                        <q-td v-slot:body-cell-owner="props" :props="props">
                            <span class="label text-positive" v-if="props.row.owner == 1">Central Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 2">Regional Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 3">SO</span>
                        </q-td>
                        <q-td v-slot:body-cell-regionAreaName="props" :props="props">{{
                                props.row.allocate_region == null
                                    ? "NA"
                                    : props.row.allocate_region.regionAreaName
                        }}</q-td>
                        <q-td v-slot:body-cell-name="props" :props="props">{{
                                props.row.allocate_so == null
                                    ? "NA"
                                    : props.row.allocate_so.name+" | "+props.row.allocate_so.employeeID
                        }}</q-td>

                        <q-td v-slot:body-cell-action1="props" :props="props">
                            <div class="row no-wrap no-padding">
                                <q-btn dense no-caps no-wrap label="Update" icon="far fa-plus-square" size="md"
                                    @click="fnUpdateRejectedPodDetails(props.row)" flat class="text-light-blue"></q-btn>
                            </div>
                        </q-td>
                        


                        <template v-slot:top="props">
                            <!--START: table title -->
                            <!--<div class="col-12 text-h6 q-my-lg text-weight-regular">
                 Stocks
                 </div> -->
                            <!-- <div class="col-md-6 q-my-md" align="right">
                    <q-btn no-caps no-wrap label="Add New Regions" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateRegions()"/>
                  </div>-->
                            <!--END: table title -->
                            <!--START: table filter,search -->
                            <div class="col-3">
                                <q-input clearable color="grey-9" v-model="filterSearch1" float-label="Search By POD Number" placeholder="Type.."
                                    class="q-mr-lg" />
                            </div>
                            <!-- <div class="col-3" align="right">
                <q-btn
                  no-caps
                  class="text-weight-regular"
                  label="Assigned To So"
                  @click="$router.push('/sat/sparePartsAssignedToSoDetails')"
                  color="purple-9"
                  size="md"
                />
              </div> -->
                            <!--END: table filter,search -->
                            <!-- <div class="col-3" align="right">
              <q-btn
                no-caps
              class="text-weight-regular"
              label="Add Sub Task"
              @click="fnShowAddNewSubTaskType(props.row)"
              color="purple-9"
              size="md"
             />
             </div> :rows="tableData2"-->
                        </template>
                    </q-table>
                </q-tab-panel>
                <q-tab-panel name="tab-3">

                    <q-table :rows="tableData2" table-class="customSATableClass" :columns="columns2"
                        :filter="filterSearch2" :pagination="paginationControl2"
                        :filter-method="myCustomSearchFilter" row-key="name" color="grey-9"
                        @request="ajaxLoadAllLeadInfo2">
                        <q-td v-slot:body-cell-createdAt="props" :props="props">{{
                                props.row.created_date == null
                                    ? "NA"
                                    : props.row.created_date | moment("Do MMM Y")
                        }}</q-td>
                          <q-td v-slot:body-cell-updated_date="props" :props="props">{{
                                props.row.updated_date == null
                                    ? "NA"
                                    : props.row.updated_date | moment("Do MMM Y")
                        }}</q-td>
                        <q-td v-slot:body-cell-status="props" :props="props">
                            <span class="label text-positive" v-if="props.row.status == 1">Created</span>
                            <span class="label text-primary" v-else-if="props.row.status == 2">Assigned to R.I</span>
                            <span class="label text-orange" v-else-if="props.row.status == 3">Approved By R.I</span>
                            <span class="label text-orange" v-else-if="props.row.status == 4">Assigned To SO</span>
                            <span class="label text-orange" v-else-if="props.row.status == 5">
                                Approved By So</span>
                            <span class="label text-orange" v-else-if="props.row.status == 6">
                                Rejected</span>

                            <span class="label text-negative" v-else>NA</span>
                        </q-td>
                        <q-td v-slot:body-cell-owner="props" :props="props">
                            <span class="label text-positive" v-if="props.row.owner == 1">Central Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 2">Regional Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 3">SO</span>
                        </q-td>
                        <q-td v-slot:body-cell-regionAreaName="props" :props="props">{{
                                props.row.allocate_region == null
                                    ? "NA"
                                    : props.row.allocate_region.regionAreaName
                        }}</q-td>
                        <q-td v-slot:body-cell-name="props" :props="props">{{
                                props.row.allocate_so == null
                                    ? "NA"
                                    : props.row.allocate_so.name+" | "+props.row.allocate_so.employeeID
                        }}</q-td>



                        <template v-slot:top="props">

                            <div class="col-3">
                                <q-input clearable color="grey-9" v-model="filterSearch2" float-label="Search By POD Number" placeholder="Type.."
                                    class="q-mr-lg" />
                            </div>
                        </template>
                    </q-table>
                </q-tab-panel>
            </q-tabs>
        </div>
    </q-page>
</template>
<script>
import { required, or } from '@vuelidate/validators';
// import ShowAddServiceType from "../../components/super_admin/ShowAddServiceType.vue";
// import showEditServiceType from "../../components/super_admin/showEditServiceType.vue";
// import showEditSubTaskType from "../../components/super_admin/showEditSubTaskType.vue";
// import ShowAddSubTaskType from "../../components/super_admin/ShowAddSubTaskType.vue";
// import allocatedSo from "../../components/sat/allocatedSo.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "getserviceRequestGetTypes",
    // components: {
    //     allocatedSo,

    // },

    data() {
        return {
            propShowAddServiceType: false,
            propShowEditServiceType: false,
            propShowEditSubTaskType: false,
            propShowAddSubTaskType: false,
            propRowDetails: "",
            propRowDetails1: "",
            propRowDetails2: "",
            // propRowDetails1:"",

            filter: "",
            filterSearch: "",
            filterSearch1: "",
            filterSearch2: "",
            selectedTab: "",
            filter_values: "",
            multipleSelect: "",

            paginationControl: {
                rowsPerPage: 10
            },
            regionBasedSo: [],
            regionSpareCount: [],
            sparePartsTypes: [],
            formData: {
                // allocate_so: "",
                // pod_number:"",
                //   total_count: 0,
                allocate_region: "",
                allocate_reseller: null,
                total_count: 0,
                allocate_so: "",
                pod_number: "",
                sparePartsSets: []

            },
            paginationControl: {
                rowsNumber: 10,
                page: 1,
                sortBy: "updated_date",
                descending: false,
                rowsPerPage: 5 // current rows per page being displayed
            },
            paginationControl1: {
                rowsNumber: 10,
                page: 1,
                sortBy: "updated_date",
                descending: false,
                rowsPerPage: 5 // current rows per page being displayed
            },
            paginationControl2: {
                rowsNumber: 10,
                page: 1,
                sortBy: "updated_date",
                descending: false,
                rowsPerPage: 5 // current rows per page being displayed
            },
            //table information
            columns1: [
                {
                    name: "pod_number",
                    required: true,
                    label: "Pod Number",
                    align: "left",
                    field: "pod_number",
                    sortable: true
                },
                {
                    name: "regionAreaName",
                    required: true,
                    label: "Region",
                    align: "left",
                    field: row => {
                        row.allocate_region.regionAreaName;
                    }
                    // sortable: truename
                },
                {
                    name: "name",
                    required: true,
                    label: "SO",
                    align: "left",
                    field: row => {
                        row.allocate_so.name+" | "+row.allocate_so.employeeID;
                    }
                    // sortable: truename
                },
                
                {
                    name: "status",
                    required: true,
                    label: "Status",
                    align: "left",
                    field: "status",
                    sortable: false,
                },
                {
                    name: "owner",
                    required: true,
                    label: "Owner",
                    align: "left",
                    field: "owner",
                    sortable: false,
                },
                {
                    name: "total_count",
                    required: true,
                    label: "Total Count",
                    align: "left",
                    field: "total_count",
                    sortable: false,
                },
                {
                    name: "createdAt",
                    required: true,
                    label: "Created Date",
                    align: "left",
                    field: "created_date",
                    sortable: false
                },
                {
                    name: "updated_date",
                    required: true,
                    label: "Updated Date",
                    align: "left",
                    field: "updated_date",
                    sortable: true
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
            columns2: [
                {
                    name: "pod_number",
                    required: true,
                    label: "Pod Number",
                    align: "left",
                    field: "pod_number",
                    sortable: true
                },
                {
                    name: "regionAreaName",
                    required: true,
                    label: "Region",
                    align: "left",
                    field: row => {
                        row.allocate_region.regionAreaName;
                    }
                    // sortable: truename
                },
                {
                    name: "name",
                    required: true,
                    label: "SO Name",
                    align: "left",
                    field: row => {
                        row.allocate_so.name+" | "+row.allocate_so.employeeID;
                    }
                    // sortable: truename
                },
                {
                    name: "status",
                    required: true,
                    label: "Status",
                    align: "left",
                    field: "status",
                    sortable: false,
                },
                {
                    name: "owner",
                    required: true,
                    label: "Owner",
                    align: "left",
                    field: "owner",
                    sortable: false,
                },
                {
                    name: "total_count",
                    required: true,
                    label: "Total Count",
                    align: "left",
                    field: "total_count",
                    sortable: false,
                },
                {
                    name: "createdAt",
                    required: true,
                    label: "Created Date",
                    align: "left",
                    field: "created_date",
                    sortable: false
                },
                {
                    name: "updated_date",
                    required: true,
                    label: "Updated Date",
                    align: "left",
                    field: "updated_date",
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
            ],
            columns: [
                {
                    name: "pod_number",
                    required: true,
                    label: "Pod Number",
                    align: "left",
                    field: "pod_number",
                    sortable: true
                },
                {
                    name: "regionAreaName",
                    required: true,
                    label: "Region",
                    align: "left",
                    field: row => {
                        row.allocate_region.regionAreaName;
                    }
                    // sortable: truename
                },
                {
                    name: "status",
                    required: true,
                    label: "Status",
                    align: "left",
                    field: "status",
                    sortable: false,
                },
                {
                    name: "owner",
                    required: true,
                    label: "Owner",
                    align: "left",
                    field: "owner",
                    sortable: false,
                },
                {
                    name: "total_count",
                    required: true,
                    label: "Total Count",
                    align: "left",
                    field: "total_count",
                    sortable: false,
                },
                {
                    name: "createdAt",
                    required: true,
                    label: "Created Date",
                    align: "left",
                    field: "created_date",
                    sortable: false
                },
                {
                    name: "updated_date",
                    required: true,
                    label: "Updated Date",
                    align: "left",
                    field: "updated_date",
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
            ],
            tableData: [],
            tableData1: [],
            tableData2: [],
            tableDataUpdate: [],
            getsinglePodData: [],
        };
    },

    created() {
        /* START: Load user table data filter > Regions */
        this.ajaxSpareData();
        this.ajaxSpareData1();
        this.getAllInventoryData();
        this.regionBasedSoLoad();
        this.fnSparePartsTypes();
        this.fnregionSpareCount()
        this.ajaxLoadAllLeadInfo({
            pagination: this.paginationControl,
            filter: this.filterSearch,
        });
        this.ajaxLoadAllLeadInfo1({
            pagination: this.paginationControl1,
            filter: this.filterSearch1,
        });
        this.ajaxLoadAllLeadInfo2({
            pagination: this.paginationControl2,
            filter: this.filterSearch2,
        });
        /* End: Load user table data filter > Regions */
    },

    computed: {
        ...mapGetters("serviceRequest", [
            "getserviceRequestGetTypes",
            "getsubTaskDetails"
        ]),
        ...mapGetters("InventoryCentral", [
            "getCentralInventoryDashboardCount",
            "getRegionBasedSO"
        ]),
        ...mapGetters("sparePartsGetTypes", [
            "getsparePartsGetTypes",
            "getallInventorySparePartsGetTypes"
        ]),
         ...mapGetters("getInventoryUpdatedPodDetails", [
      "getInventoryUpdatedPodDetails"
    ]),
        ...mapGetters("soPodListDatas", ["getPhonepeApprovedSoPodListDatas", "getPhoneperejectedSoPodListDatas"]),
        ...mapGetters("regionalInventoryDetails", ["getsparePartsSetsAndCounts", "getsinglePodDetails", "getregionalInventoryPodDetails", "getregionalInventoryStocksPodDetails", "getPhonePeRegionalInventoryAllocatedSoPodDetails"])
    },
    beforeMount() {
        const name = "SO";
        const d = new Date();
        // console.log("DATE OF POD---------->",d)
        let number = d.getTime();
        // console.log("Number OF POD---------->",JSON.stringify(number))
        let finalValue = name.concat(number);
        // console.log("finalValue OF POD---------->",finalValue)
        this.formData.pod_number = finalValue;
    },
    methods: {
        ...mapActions("serviceRequest", [
            "FETCH_ALL_SERVICE_REQUEST_GET_TYPES",
            "DELETE_SERVICE_REQUEST_TYPES",
            "FETCH_SUB_TASK_DATAS",
            "DELETE_SUB_TASK_TYPES"
        ]),
        ...mapActions("sparePartsGetTypes", [
            "FETCH_SPARE_PARTS_GET_TYPES",
            "FETCH_ALL_SPARE_PARTS_INVENTORY_DATAS",
            "SPARE_PARTS_ADD_STOCKS"
        ]),
        ...mapActions("InventoryCentral", [
            "FETCH_CENTRAL_INVENTORY_DASHBOARD_COUNT",
            "FETCH_REGION_BASED_SO"
        ]),
        ...mapActions("sparePartsInventory", [
            "UPDATE_SPARE_PARTS_INVENTORY_DATAS"
        ]),
        ...mapActions("regionalInventoryDetails", ["FETCH_SPARE_PARTS_SETS_AND_COUNTS", "FETCH_SINGLE_POD_DETAILS", "FETCHING_INCOMING_POD_LIST_DETAILS", "APPROVE_INCOMING_POD_DETAILS", "REJECT_INCOMING_POD_DETAILS", "FETCHING_INCOMING_STOCKS_POD_LIST_DETAILS", "FETCHING_PHONEPE_INCOMING_ALLOCATED_SO_POD_LIST_DETAILS"]),
         ...mapActions("getInventoryUpdatedPodDetails", [
      "FETCH_INVENTORY_UPDATED_POD_DETAILS"
    ]),
        ...mapActions("soPodListDatas", ["FETCHING_PHONEPE_APPROVED_POD_LIST_DETAILS", "FETCHING_PHONEPE_REJECTED_POD_LIST_DETAILS"]),

        fnUpdateRejectedPodDetails(reqData){
             console.log("the request data " + JSON.stringify(reqData));
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to Update?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
          let param = {
            podNumber: reqData.pod_number
          };
          console.log("the request data " + JSON.stringify(param));
          this.FETCH_INVENTORY_UPDATED_POD_DETAILS(param).then(() => {
            // this.ajaxLoadAllLeadInfo();
            this.tableDataUpdate = this.getInventoryUpdatedPodDetails;
            console.log(
              "the  tableDataUpdate data " + JSON.stringify(this.tableDataUpdate)
            );
            this.$q.loading.hide();
            this.$router.push({
              name: "updateRegionalRejectPods",
              params: { data: this.tableDataUpdate }
            });
          });
        });
        },

        // fnRejectPodDetails(reqdata) {
        //     console.log("fnRejectPodDetails------>", JSON.stringify(reqdata));
        //     this.$q
        //         .dialog({
        //             title: "Confirm",
        //             message: "Are you sure want to Reject?",
        //             ok: "Continue",
        //             cancel: "Cancel"
        //         })
        //         .then(() => {
        //             this.$q.loading.show({
        //                 delay: 0, // ms
        //                 spinnerColor: "purple-9",
        //                 message: "Processing .."
        //             });
        //             console.log("reqdata-------->", JSON.stringify(reqdata))
        //             this.FETCH_SINGLE_POD_DETAILS(reqdata);
        //             // console.log("reqdata-------->", JSON.stringify(reqdata))
        //             let param = {
        //                 allocate_region: this.getsinglePodDetails.data.allocate_region,
        //                 created_by: this.getsinglePodDetails.data.created_by,
        //                 allocate_reseller: this.getsinglePodDetails.data.allocate_reseller,
        //                 allocate_so: this.getsinglePodDetails.data.allocate_so,
        //                 sparePartsSets: this.getsinglePodDetails.data.sparePartsSets,
        //                 total_count: this.getsinglePodDetails.data.total_count,
        //                 pod_number: this.getsinglePodDetails.data.pod_number,
        //                 created_date: this.getsinglePodDetails.data.created_date,
        //                 updated_date: this.getsinglePodDetails.data.updated_date,
        //             };

        //             param.status = reqdata.status;
        //             param.owner = reqdata.owner;
        //             console.log("PARAMS VALUES------------>", JSON.stringify(param))

        //             this.REJECT_INCOMING_POD_DETAILS(param)
        //                 .then(() => {
        //                     this.ajaxLoadAllLeadInfo({
        //                         pagination: this.paginationControl,
        //                         filter: this.filterSearch,
        //                     });
        //                     this.$q.loading.hide();
        //                     this.$q.notify({
        //                         color: "positive",
        //                         position: "bottom",
        //                         message: "Successfully Rejected!",
        //                         icon: "thumb_up"
        //                     });
        //                 })
        //                 .catch(error => {
        //                     this.$q.loading.hide();
        //                     this.$q.notify({
        //                         color: "negative",
        //                         position: "bottom",
        //                         message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
        //                         icon: "thumb_down"
        //                     });
        //                 });
        //         })

        // },
        fnregionSpareCount() {
            let self = this;
            self.FETCH_SPARE_PARTS_SETS_AND_COUNTS().then(() => {
                return _.map(self.getsparePartsSetsAndCounts, item => {
                    console.log("GETTING SPARE PARTS COUNT DETAILS---------->", JSON.stringify(this.getsparePartsSetsAndCounts))
                    self.regionSpareCount.push({
                        value: item,
                        label: item.spare_parts_types
                    });
                });
            });
        },
        fnApprovePodDetails(reqdata) {
            console.log("fnApprovePodDetails------>", JSON.stringify(reqdata));
            this.$q
                .dialog({
                    title: "Confirm",
                    message: "Are you sure want to Approve?",
                    ok: "Continue",
                    cancel: "Cancel"
                })
                .then(() => {
                    this.$q.loading.show({
                        delay: 0, // ms
                        spinnerColor: "purple-9",
                        message: "Processing .."
                    });
                    this.FETCH_SINGLE_POD_DETAILS(reqdata);
                    // console.log("reqdata-------->", JSON.stringify(reqdata))
                    //  .then((res) => {
                    //   //  this.getsinglePodData = this.getsinglePodDetails.content;
                    //    console.log("getsinglePodData-------->",JSON.stringify(res))
                    //  })
                    let param = {
                        allocate_region: this.getsinglePodDetails.data.allocate_region,
                        created_by: this.getsinglePodDetails.data.created_by,
                        allocate_reseller: this.getsinglePodDetails.data.allocate_reseller,
                        allocate_so: this.getsinglePodDetails.data.allocate_so,
                        sparePartsSets: this.getsinglePodDetails.data.sparePartsSets,
                        total_count: this.getsinglePodDetails.data.total_count,
                        pod_number: this.getsinglePodDetails.data.pod_number,
                        created_date: this.getsinglePodDetails.data.created_date,
                        updated_date: this.getsinglePodDetails.data.updated_date,
                        // status: reqdata.status,
                        // owner: reqdata.owner
                    };

                    param.status = reqdata.status;
                    param.owner = reqdata.owner;
                    console.log("PARAMS VALUES------------>", JSON.stringify(param))

                    this.APPROVE_INCOMING_POD_DETAILS(param)
                        .then(() => {
                            this.ajaxLoadAllLeadInfo({
                                pagination: this.paginationControl,
                                filter: this.filterSearch,
                            });
                            this.$q.loading.hide();
                            this.$q.notify({
                                color: "positive",
                                position: "bottom",
                                message: "Successfully Approved!",
                                icon: "thumb_up"
                            });
                        })
                        .catch(error => {
                            this.$q.loading.hide();
                            this.$q.notify({
                                color: "negative",
                                position: "bottom",
                                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                                icon: "thumb_down"
                            });
                        });
                })
        },
        ajaxLoadAllLeadInfo({ pagination, filter }) {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Fetching data ..",
            });
            this.FETCHING_PHONEPE_APPROVED_POD_LIST_DETAILS({ pagination, filter }).then((res) => {
                // updating pagination to reflect in the UI
                this.paginationControl = pagination;

                // we also set (or update) rowsNumber
                this.paginationControl.rowsNumber =
                    this.getPhonepeApprovedSoPodListDatas.totalElements;
                this.paginationControl.page =
                    this.getPhonepeApprovedSoPodListDatas.number + 1;

                // then we update the rows with the fetched ones
                this.tableData =
                    this.getPhonepeApprovedSoPodListDatas.content;
                if (this.getPhonepeApprovedSoPodListDatas.sort != null) {
                    this.paginationControl.sortBy =
                        this.getPhonepeApprovedSoPodListDatas.sort[0].property;
                    this.paginationControl.descending =
                        this.getPhonepeApprovedSoPodListDatas.sort[0].ascending;
                }

                // finally we tell QTable to exit the "loading" state
                this.$q.loading.hide();
            })
                .catch(() => {
                    this.$q.loading.hide();
                });
        },
        ajaxLoadAllLeadInfo2({ pagination, filter }) {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Fetching data ..",
            });
            this.FETCHING_PHONEPE_INCOMING_ALLOCATED_SO_POD_LIST_DETAILS({ pagination, filter }).then((res) => {
                // updating pagination to reflect in the UI
                this.paginationControl2 = pagination;

                // we also set (or update) rowsNumber
                this.paginationControl2.rowsNumber =
                    this.getPhonePeRegionalInventoryAllocatedSoPodDetails.totalElements;
                this.paginationControl2.page =
                    this.getPhonePeRegionalInventoryAllocatedSoPodDetails.number + 1;

                // then we update the rows with the fetched ones
                this.tableData2 =
                    this.getPhonePeRegionalInventoryAllocatedSoPodDetails.content;
                if (this.getPhonePeRegionalInventoryAllocatedSoPodDetails.sort != null) {
                    this.paginationControl2.sortBy =
                        this.getPhonePeRegionalInventoryAllocatedSoPodDetails.sort[0].property;
                    this.paginationControl2.descending =
                        this.getPhonePeRegionalInventoryAllocatedSoPodDetails.sort[0].ascending;
                }

                // finally we tell QTable to exit the "loading" state
                this.$q.loading.hide();
            })
                .catch(() => {
                    this.$q.loading.hide();
                });
        },
        ajaxLoadAllLeadInfo1({ pagination, filter }) {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Fetching data ..",
            });
            this.FETCHING_PHONEPE_REJECTED_POD_LIST_DETAILS({ pagination, filter }).then((res) => {
                // updating pagination to reflect in the UI
                this.paginationControl1 = pagination;

                // we also set (or update) rowsNumber
                this.paginationControl1.rowsNumber =
                    this.getPhoneperejectedSoPodListDatas.totalElements;
                this.paginationControl1.page =
                    this.getPhoneperejectedSoPodListDatas.number + 1;

                // then we update the rows with the fetched ones
                this.tableData1 =
                    this.getPhoneperejectedSoPodListDatas.content;
                if (this.getPhoneperejectedSoPodListDatas.sort != null) {
                    this.paginationControl1.sortBy =
                        this.getPhoneperejectedSoPodListDatas.sort[0].property;
                    this.paginationControl1.descending =
                        this.getPhoneperejectedSoPodListDatas.sort[0].ascending;
                }

                // finally we tell QTable to exit the "loading" state
                this.$q.loading.hide();
            })
                .catch(() => {
                    this.$q.loading.hide();
                });
        },
        goToSelectedTab(tab) {
            if (tab == "tab-2") {
                let request = {
                    pagination: this.paginationControl1,
                    filter: this.filterSearch1,
                };
                this.toggleAjaxLoadFilter = true;
                this.FETCHING_PHONEPE_REJECTED_POD_LIST_DETAILS(request)
                    .then((response) => {
                        this.toggleAjaxLoadFilter = false;
                    })
                    .catch((error) => {
                        this.toggleAjaxLoadFilter = false;
                    });
            } else if (tab == "tab-3") {
                let request = {
                    pagination: this.paginationControl2,
                    filter: this.filterSearch2,
                };
                this.toggleAjaxLoadFilter = true;
                this.FETCHING_PHONEPE_INCOMING_ALLOCATED_SO_POD_LIST_DETAILS(request)
                    .then((response) => {
                        this.toggleAjaxLoadFilter = false;
                    })
                    .catch((error) => {
                        this.toggleAjaxLoadFilter = false;
                    });
            } else {
                this.ajaxLoadAllLeadInfo({
                    pagination: this.paginationControl,
                    filter: this.filterSearch,
                });
            }
        },
        fnSubmitBankDetails(request) {
            this.formData.allocate_so = JSON.parse(this.formData.allocate_so == ""
                ? null
                : this.formData.allocate_so);

            // this.formData.allocate_region =JSON.parse(this.formData.allocate_region == ""
            //     ? null
            //     : this.formData.allocate_region);
            this.formData.allocate_region = JSON.parse(localStorage.getItem("u_i")).region;
            this.formData.allocate_reseller = JSON.parse(this.formData.allocate_reseller == "" ? null : this.formData.allocate_reseller);

            console.log(
                "SELCETED fnSubmitBankDetails VALUES------->",
                JSON.stringify(this.formData)
            );
            this.$q.loading.show();
            this.UPDATE_SPARE_PARTS_INVENTORY_DATAS(request)
                .then(() => {
                    this.$q.loading.hide();
                    this.$q.notify({
                        color: "positive",
                        position: "bottom",
                        message: "Successfully updated!",
                        icon: "thumb_up"
                    });

                    // this.$router.push("/components/sat/spareParts");
                    //  this.$router.push("allocatedSo");{ name: "login" }D:\SparePartsUpdate(10_05_2022)\SparePartsUpdate(10_05_2022)\src\components\sat\spareParts.vue
                    //this.$router.push({name: "spareParts"})
                })
                .catch(error => {
                    this.$q.loading.hide();
                    this.$q.notify({
                        color: "negative",
                        position: "bottom",
                        message:
                            error.body.message == null
                                ? "Please Try Again Later !"
                                : error.body.message,
                        icon: "thumb_down"
                    });
                });


        },
        fnSparePartsTypes() {
            let self = this;
            self.FETCH_SPARE_PARTS_GET_TYPES().then(() => {
                return _.map(self.getsparePartsGetTypes, item => {
                    self.sparePartsTypes.push({
                        value: item,
                        label: item.spare_parts_types
                    });
                });
            });
        },
        getSelectedDetails(event, request) {
            this.requestData = request;
            this.selectedSpareValue = this.requestData;

            let chFlag = event.target.checked;
            if (chFlag) {
                document.getElementById(request.id + "_DV").style.display = "block";
            } else {
                document.getElementById(request.id + "_DV").style.display = "none";
                if (this.formData.sparePartsSets.length > 0) {
                    document.getElementById(request.id + "_DV").value = "";
                    let rmSpareCount = this.formData.sparePartsSets.filter(
                        spare => spare.id == request.id
                    );
                    this.formData.sparePartsSets = this.formData.sparePartsSets.filter(
                        spare => spare.id != request.id
                    );
                    this.formData.total_count =
                        parseInt(this.formData.total_count) -
                        parseInt(rmSpareCount[0].count);
                }
            }
        },
        getAllCounts(event, menu) {
            console.log("GET ALL COUNT EVENTS--------->", event);
            console.log("GET ALL COUNT menu--------->", menu);
            var flag = 0;
            var spCount = 0;
            if (this.formData.sparePartsSets.length > 0) {
                let myArr = this.formData.sparePartsSets;
                for (var j = 0; j < myArr.length; j++) {
                    if (myArr[j].id == menu.value.id) {
                        this.formData.sparePartsSets[j].count = parseInt(
                            event.target.value
                        );
                        flag = 1;
                    }
                }
            }
            if (flag == 0) {
                this.formData.sparePartsSets.push({
                    count: parseInt(event.target.value),
                    spareParts: {
                        id: menu.value.id
                    }
                });
            }
            if (this.formData.sparePartsSets.length > 0) {
                this.formData.sparePartsSets.forEach(function (obj) {
                    console.log("The object sss: ----------------- : ", JSON.stringify(obj));
                    spCount = spCount + parseInt(obj.count);
                });
            }

            this.formData.total_count = spCount;
        },
        finding(request) {
            console.log("SELCETED CHECK BOX VALUES------->", JSON.stringify(request));
            // this.formData.count = request;
            //  console.log("SELCETED CHECK BOX count------->",JSON.stringify(this.formData.count))
        },
        regionBasedSoLoad() {
            let regionArea = JSON.parse(localStorage.getItem("u_i")).region.id;
            console.log("REGION BASED SO DETAILS--------->", regionArea);
            // this.red
            this.FETCH_REGION_BASED_SO(regionArea).then(() => {
                let assumeArr = [];
                this.getRegionBasedSO.map(function (value, index) {
                    assumeArr.push({
                        label: value.name,
                        // value: value.id
                        value: JSON.stringify(value)
                    });
                });
                this.regionBasedSo = assumeArr;
            });
        },

        fnDeleteServiceType(rowDetails) {
            console.log("ROW DETAILS------------->", JSON.stringify(rowDetails));
            this.$q
                .dialog({
                    title: "Confirm",
                    message: "Are you sure want to delete?",
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
                    this.DELETE_SERVICE_REQUEST_TYPES(rowDetails).then(response => {
                        this.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: "Successfully removed",
                            icon: "thumb_up"
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
        fnDeleteSubTaskType(rowDetails) {
            console.log("ROW DETAILS------------->", JSON.stringify(rowDetails));
            this.$q
                .dialog({
                    title: "Confirm",
                    message: "Are you sure want to delete?",
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
                    this.DELETE_SUB_TASK_TYPES(rowDetails).then(response => {
                        this.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: "Successfully removed",
                            icon: "thumb_up"
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

        ajaxSpareData() {
            this.FETCH_ALL_SERVICE_REQUEST_GET_TYPES()
                .then(res => {
                    this.tableData = this.getserviceRequestGetTypes;
                    console.log(
                        "TABLE DATA VALUES-RESPONSE---------->",
                        JSON.stringify(this.tableData)
                    );
                })
                .catch(() => {
                    this.$q.loading.hide();
                });
        },
        getAllInventoryData() {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Fetching data .."
            });
            this.FETCH_CENTRAL_INVENTORY_DASHBOARD_COUNT().then(() => {
                this.inventoryData.centralItems = this.getCentralInventoryDashboardCount.centralInventory;
                this.inventoryData.merchantItems = this.getCentralInventoryDashboardCount.merchantInventory;
                this.inventoryData.regionalItems = this.getCentralInventoryDashboardCount.regionalInventory;
                this.inventoryData.billPartnerInventory = this.getCentralInventoryDashboardCount.billPartnerInventory;
                this.inventoryData.resellarItems = this.getCentralInventoryDashboardCount.resellerInventory;
                this.inventoryData.faultyInventory = this.getCentralInventoryDashboardCount.faultyInventory;
                this.inventoryData.sendtoRepair = this.getCentralInventoryDashboardCount.faultySentToRepair;
                this.FETCH_ALL_REGIONS_DATA()
                    .then(() => {
                        this.inventoryData.regionFilterOptions = this.getAllRegionsData;

                        this.$q.loading.hide();
                    })
                    .catch(() => {
                        this.$q.loading.hide();
                    });
            });
        },
        ajaxSpareData1() {
            this.FETCH_SUB_TASK_DATAS()
                .then(res => {
                    this.tableData1 = this.getsubTaskDetails;
                    console.log(
                        "TABLE DATA 11111111111111 VALUES-RESPONSE---------->",
                        JSON.stringify(this.tableData1)
                    );
                })
                .catch(() => {
                    this.$q.loading.hide();
                });
        },
        fnShowAddNewSubTaskType(rowDetails) {
            this.propShowAddSubTaskType = !this.propShowAddSubTaskType;
            this.propRowDetails2 = rowDetails;
        },
        fnShowEditServiceType(rowDetails) {
            this.propShowEditServiceType = !this.propShowEditServiceType;
            this.propRowDetails = rowDetails;
        },
        fnShowEditSubTaskType(rowDetails) {
            this.propShowEditSubTaskType = !this.propShowEditSubTaskType;
            this.propRowDetails1 = rowDetails;
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
