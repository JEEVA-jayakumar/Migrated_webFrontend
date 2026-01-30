<template>
    <q-page>
        <!-- content -->
        <div>
            <div class="row bottom-border q-ma-md q-py-md">
                <div class="col-12 text-weight-regular text-grey-9 " align="left" width="50px">Spare Counts
                </div>
                <br>
                <div class="col-md-9 col-sm-12 col-xs-12">
                    <div v-if="regionSpareCount.length > 0" class="row">
                        <q-card class="border-radius-10 q-pa-md q-ma-md" color="purple-9"
                            v-for="menu in regionSpareCount" :key="menu" height="35px" width="35px">
                            <div>
                                <big :style="'color'">{{ menu.value.count }} </big>
                            </div>
                            <div>
                                <label>{{ menu.value.spareParts.spare_parts_types }}</label>
                            </div>

                        </q-card>
                    </div>

                    <div v-else class="row group">
                        <div>
                            <q-alert color="primary" icon="info">No data available to display</q-alert>
                        </div>
                    </div>
                    <!-- </q-card> -->

                </div>
            </div>
            <!-- <pre>{{getAllRegionsData}}</pre> -->
            <!-- <pre>{{getAllHierarchiesData}}</pre>   -->
            <q-tabs v-model="selectedTab" class="shadow-1" color="grey-1" @select="goToSelectedTab">
                <q-tab default color="dark" name="incomingPods" slot="title" label="Incoming Pod's" />
                <q-tab color="dark" name="stocks" slot="title" label="Stocks" />
                <q-tab color="dark" name="SoPodList" slot="title" label="So Pod List" />
                <q-tab color="dark" name="createSoPod" slot="title" label="Create So Pod" />

                <q-tab-pane name="SoPodList">
                    <PhonepeSoPodList />
                </q-tab-pane>
                <!-- <q-tab-pane name="SoPodList" @click="this.$router.push({name:'PhonepeSparePartsSoPodList'})">
                </q-tab-pane> -->

                <q-tab-pane name="incomingPods">
                    <q-table :data="tableData" table-class="customSATableClass" :columns="columns"
                        :filter="filterSearch" :pagination.sync="paginationControl"
                        :filter-method="myCustomSearchFilter" row-key="name" color="grey-9"
                        @request="ajaxLoadAllLeadInfo">
                        <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">{{
                            props.row.created_date == null
                                ? "NA"
                                : props.row.created_date | moment("Do MMM Y")
                        }}</q-td>
                        <q-td slot="body-cell-updated_date" slot-scope="props" :props="props">{{
                            props.row.updated_date == null
                                ? "NA"
                                : props.row.updated_date | moment("Do MMM Y")
                        }}</q-td>
                        <q-td slot="body-cell-status" slot-scope="props" :props="props">
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
                        <q-td slot="body-cell-owner" slot-scope="props" :props="props">
                            <span class="label text-positive" v-if="props.row.owner == 1">Central Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 2">Regional Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 3">SO</span>
                        </q-td>
                        <q-td slot="body-cell-regionAreaName" slot-scope="props" :props="props">{{
                            props.row.allocate_region == null
                                ? "NA"
                                : props.row.allocate_region.regionAreaName
                        }}</q-td>
                        <q-td slot="body-cell-action" slot-scope="props" :props="props">
                            <div class="row no-wrap no-padding">

                                <q-btn dense no-caps no-wrap label="Reject" icon="far fa-minus-square" size="md"
                                    @click="fnRejectPodDetails(props.row)" flat class="text-negative"></q-btn>
                                <q-btn dense no-caps no-wrap label="Approve" icon="far fa-plus-square" size="md"
                                    @click="fnApprovePodDetails(props.row)" flat class="text-light-blue"></q-btn>
                            </div>
                        </q-td>

                        <template slot="top" slot-scope="props">
                            <!--START: table title -->
                            <!--<div class="col-12 q-title q-my-lg text-weight-regular">
           Incoming Pod
          </div> -->
                            <!-- <div class="col-md-6 q-my-md" align="right">
            <q-btn no-caps no-wrap label="Add New Regions" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateRegions()"/>
          </div>-->
                            <!--END: table title -->
                            <!--START: table filter,search
            @click="fnShowAddNewServiceType(props.row)" -->
                            <div class="col-3">
                                <q-search clearable color="grey-9" v-model="filterSearch" float-label="Search By POD Number" placeholder="Type.."
                                    class="q-mr-lg" />
                            </div>
                            <!--END: table filter,search -->
                        </template>
                    </q-table>
                </q-tab-pane>
                <q-tab-pane name="stocks">
                    <q-table :data="tableData1" table-class="customSATableClass" :columns="columns1"
                        :filter="filterSearch1" :pagination.sync="paginationControl1"
                        :filter-method="myCustomSearchFilter" row-key="name" color="grey-9"
                        @request="ajaxLoadAllLeadInfo1">
                        <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">{{
                            props.row.created_date == null
                                ? "NA"
                                : props.row.created_date | moment("Do MMM Y")
                        }}</q-td>
                        <q-td slot="body-cell-updated_date" slot-scope="props" :props="props">{{
                            props.row.updated_date == null
                                ? "NA"
                                : props.row.updated_date | moment("Do MMM Y")
                        }}</q-td>

                        <q-td slot="body-cell-status" slot-scope="props" :props="props">
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
                        <q-td slot="body-cell-owner" slot-scope="props" :props="props">
                            <span class="label text-positive" v-if="props.row.owner == 1">Central Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 2">Regional Inventory</span>
                            <span class="label text-primary" v-else-if="props.row.owner == 3">SO</span>
                        </q-td>
                        <q-td slot="body-cell-regionAreaName" slot-scope="props" :props="props">{{
                            props.row.allocate_region == null
                                ? "NA"
                                : props.row.allocate_region.regionAreaName
                        }}</q-td>

                        <template slot="top" slot-scope="props">
                            <!--START: table title -->
                            <!--<div class="col-12 q-title q-my-lg text-weight-regular">
            Stocks
          </div> -->
                            <!-- <div class="col-md-6 q-my-md" align="right">
            <q-btn no-caps no-wrap label="Add New Regions" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateRegions()"/>
          </div>-->
                            <!--END: table title -->
                            <!--START: table filter,search -->
                            <div class="col-3">
                                <q-search clearable color="grey-9" v-model="filterSearch1" float-label="Search By POD Number" placeholder="Type.."
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
          </div> :data="tableData2"-->
                        </template>
                    </q-table>
                </q-tab-pane>
                <!-- <q-tab-pane name="allocatedSo">
         
          <q-table :data="tableData2" table-class="customSATableClass" :columns="columns2" :filter="filterSearch2"
            :pagination.sync="paginationControl2" :filter-method="myCustomSearchFilter" row-key="name" color="grey-9"
            @request="ajaxLoadAllLeadInfo2">
            <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">{{
                props.row.created_date == null
                  ? "NA"
                  : props.row.created_date | moment("Do MMM Y")
            }}</q-td>
            <q-td slot="body-cell-status" slot-scope="props" :props="props">
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
            <q-td slot="body-cell-owner" slot-scope="props" :props="props">
              <span class="label text-positive" v-if="props.row.owner == 1">Central Inventory</span>
              <span class="label text-primary" v-else-if="props.row.owner == 2">Regional Inventory</span>
              <span class="label text-primary" v-else-if="props.row.owner == 3">SO</span>
            </q-td>
            <q-td slot="body-cell-regionAreaName" slot-scope="props" :props="props">{{
                props.row.allocate_region == null
                  ? "NA"
                  : props.row.allocate_region.regionAreaName
            }}</q-td>
            <q-td slot="body-cell-name" slot-scope="props" :props="props">{{
                props.row.allocate_so == null
                  ? "NA"
                  : props.row.allocate_so.name
            }}</q-td>

            <template slot="top" slot-scope="props">
              
              <div class="col-3">
                <q-search clearable color="grey-9" v-model="filterSearch2" placeholder="Type.." class="q-mr-lg" />
              </div>
            </template>
          </q-table>
        </q-tab-pane> -->
                <q-tab-pane name="createSoPod">
                    <template>
                        <div class="col-sm-3">
                            <div class="row">
                                <q-select filter clearable v-model="formData.allocate_so" @blur="$v.formData.allocate_so.$touch"
                                    :error="$v.formData.allocate_so.$error" float-label="Select SO" class="col-md-3"
                                    radio color="grey-9" :options="regionBasedSo" @request="regionBasedSoLoad" />
                            </div>
                            <div class="col-md-7">
                                <p class="caption">Spare Parts Type*</p>
                                <div class="row">
                                    <div class="row items-center" v-for="menu in sparePartsTypes" :key="menu.value.id"
                                        :to="menu.to">
                                        <input style="width: 18px; height: 18px" type="checkbox"
                                            :id="menu.value.id + '_CB'" :name="menu.value.spare_parts_types"
                                            @click="getSelectedDetails($event, menu.value)" />
                                        <label>{{ menu.value.spare_parts_types }}</label>
                                    </div>
                                </div>
                                <div v-for="menu in sparePartsTypes" :key="menu.id" :to="menu.to">
                                    <div :id="menu.value.id + '_DV'" style="display: none" @click="finding(menu)">
                                        <label>{{ menu.value.spare_parts_types }}</label>
                                        <input :id="menu.count" type="number" min="0" max="5000" value:menu
                                            @blur="getAllCounts($event, menu)" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-5">
                                    <q-input disable v-model="formData.pod_number" float-label="Pod Number" radio
                                        color="grey-9" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-5">
                                    <q-input disable v-model="formData.total_count" float-label="Total Count" radio
                                        color="grey-9" />
                                </div>
                            </div>

                            <div class="full-width group" align="center" id="formData">
                                <q-btn :disable="this.formData.total_count == 0" regionBasedSo size="md" type="button" color="purple-9"
                                    @click="fnSubmitBankDetails(formData)">
                                    Submit</q-btn>
                            </div>

                        </div>
                    </template>
                </q-tab-pane>
            </q-tabs>


            <!-- START REJECT fnRejectPodDetails-->
            <PhonepeRejectPodDetails v-if="showRejectModel" :showRejectModel="showRejectModel"
                :propShowRejectComponent="propsRejectAppend"
                @reloadPaymentTrackerData="ajaxLoadAllLeadInfo({ pagination: paginationControl, filter: filter })"
                @closeRejectModel="fnRejectPodDetails" />
            <!-- END REJECT-->
            <!--START: Show edit  service Parts -->
            <!-- <showEditServiceType
        v-if="propShowEditServiceType"
        :propShowEditServiceType="propShowEditServiceType"
        :propRowDetails="propRowDetails"
        @emitfnshowEditServiceType="fnShowEditServiceType"
      /> -->
            <!-- END: Show edit  Spare Parts -->

            <!--START: Show edit  Sub Task  -->
            <!-- <showEditSubTaskType
        v-if="propShowEditSubTaskType"
        :propShowEditSubTaskType="propShowEditSubTaskType"
        :propRowDetails1="propRowDetails1"
        @emitfnshowEditSubTaskType="fnShowEditSubTaskType"
      /> -->
            <!-- END: Show edit  Spare Parts -->

            <!--START: Show SubTaskType -->
            <!-- <ShowAddSubTaskType
        v-if="propShowAddSubTaskType"
        :propShowAddSubTaskType="propShowAddSubTaskType"
        :propRowDetails2="propRowDetails2"
        @emitfnShowAddNewSubTaskType="fnShowAddNewSubTaskType"
      /> -->
            <!--END: Show Add SubTaskType -->
        </div>
    </q-page>
</template>

<script>
// import PhonepeSoPodList from "../../components/sat/AggregatorInventory/PhonepeSoPodList.vue";
// import PhonepeSparePartsSoPodList from "../../pages/sat/PhonepeSparePartsSoPodList.vue";
import PhonepeRejectPodDetails from "../AggregatorInventory/PhonepeRejectPodDetails.vue";
import PhonepeSoPodList from "../AggregatorInventory/PhonepeSoPodList.vue";
import { mapGetters, mapActions } from "vuex";
import {
    required,
    requiredIf,
    alphaNum,
    integer,
    numeric,
    minLength,
    maxLength,
    email,
    maxValue,
    minValue,
    decimal
} from "vuelidate/lib/validators";
import { stringify } from "json5";
export default {
    name: "getserviceRequestGetTypes",
    components: {
        PhonepeSoPodList,
        PhonepeRejectPodDetails

    },

    data() {
        return {
            propShowAddServiceType: false,
            propShowEditServiceType: false,
            propShowEditSubTaskType: false,
            propShowAddSubTaskType: false,
            showRejectModel: false,
            propsRejectAppend: [],
            // getDisableCount:"",
            propRowDetails: "",
            propRowDetails1: "",
            propRowDetails2: "",
            flagField: false,
            // propRowDetails1:"",
            disableSo: false,
            countFlag: false,
            filter: "",
            filterSearch: "",
            filterSearch1: "",
            filterSearch2: "",
            filterSearch4: "",
            selectedTab: "",
            filter_values: "",
            multipleSelect: "",
            clearData: {
                data: ""
            },
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
                sparePartsSets: [],
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
            paginationControl4: {
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
                        row.allocate_so.name;
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
            columns4: [
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
            tableData4: [],
            getsinglePodData: [],
        };
    },
    validations: {
        flag: {
            required,
        },
        formData: {
            allocate_so: {
                required
            }
        }
    },
    created() {
        /* START: Load user table data filter > Regions */
        this.ajaxSpareData();
        this.ajaxSpareData1();
        this.getAllInventoryData();
        this.regionBasedSoLoad();
        this.fnSparePartsTypes();
        this.fnregionSpareCount();
        this.podNumberCreation();
        ajaxLoadAllLeadInfo4({
            pagination: this.paginationControl4,
            filter: this.filterSearch4,
        });
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
        ...mapGetters("soPodListDatas", ["getPhonepeApprovedSoPodListDatas"]),
        ...mapGetters("regionalInventoryDetails", ["getPhonepeSparePartsSetsAndCounts", "getsparePartsSetsAndCounts", "getphonepeRegionalInventoryAllocatedSoPodDetails", "getregionalInventoryPodDetails", "getPhonepeRegionalInventoryStocksPodDetails", "getregionalInventoryStocksPodDetails", "getregionalInventoryAllocatedSoPodDetails"]),
        ...mapGetters("singlePodData", ["getsinglePodDetails"])

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
            "UPDATE_SPARE_PARTS_INVENTORY_DATAS", "UPDATE_PHONEPE_SPARE_PARTS_INVENTORY_DATAS"
        ]),
        ...mapActions("soPodListDatas", ["FETCHING_PHONEPE_APPROVED_POD_LIST_DETAILS"]),
        ...mapActions("regionalInventoryDetails", ["FETCH_PHONEPE_SPARE_PARTS_SETS_AND_COUNTS", "FETCH_SPARE_PARTS_SETS_AND_COUNTS", "FETCHING_PHONEPE_INCOMING_POD_LIST_DETAILS", "FETCHING_INCOMING_POD_LIST_DETAILS", "APPROVE_PHONEPE_INCOMING_POD_DETAILS", "APPROVE_INCOMING_POD_DETAILS", "REJECT_INCOMING_POD_DETAILS", "FETCHING_PHONEPE_INCOMING_STOCKS_POD_LIST_DETAILS", "FETCHING_INCOMING_STOCKS_POD_LIST_DETAILS", "FETCHING_INCOMING_ALLOCATED_SO_POD_LIST_DETAILS"]),
        ...mapActions("singlePodData", ["FETCH_SINGLE_POD_DETAILS", "FETCH_PHONEPE_SINGLE_POD_DETAILS"]),

        fnRejectPodDetails(exceptionDetails) {
            this.showRejectModel = !this.showRejectModel;
            this.propsRejectAppend = exceptionDetails;
        },

        // fnRejectPodDetails(reqdata) {
        //   console.log("fnRejectPodDetails------>", JSON.stringify(reqdata));
        //   this.$q
        //     .dialog({
        //       title: "Confirm",
        //       message: "Are you sure want to Reject?",
        //       ok: "Continue",
        //       cancel: "Cancel"
        //     })
        //     .then(() => {
        //       this.$q.loading.show({
        //         delay: 0, // ms
        //         spinnerColor: "purple-9",
        //         message: "Processing .."
        //       });
        //        console.log("reqdata-------->", JSON.stringify(reqdata))
        //       this.FETCH_SINGLE_POD_DETAILS(reqdata);
        //       // console.log("reqdata-------->", JSON.stringify(reqdata))
        //       let param = {
        //         allocate_region: this.getsinglePodDetails.data.allocate_region,
        //         created_by: this.getsinglePodDetails.data.created_by,
        //         allocate_reseller: this.getsinglePodDetails.data.allocate_reseller,
        //         allocate_so: this.getsinglePodDetails.data.allocate_so,
        //         sparePartsSets: this.getsinglePodDetails.data.sparePartsSets,
        //         total_count: this.getsinglePodDetails.data.total_count,
        //         pod_number: this.getsinglePodDetails.data.pod_number,
        //         created_date: this.getsinglePodDetails.data.created_date,
        //         updated_date: this.getsinglePodDetails.data.updated_date,
        //       };

        //       param.status = reqdata.status;
        //       param.owner = reqdata.owner;
        //       console.log("PARAMS VALUES------------>", JSON.stringify(param))

        //       this.REJECT_INCOMING_POD_DETAILS(param)
        //         .then(() => {
        //           this.ajaxLoadAllLeadInfo({
        //             pagination: this.paginationControl,
        //             filter: this.filterSearch,
        //           });
        //           this.$q.loading.hide();
        //           this.$q.notify({
        //             color: "positive",
        //             position: "bottom",
        //             message: "Successfully Rejected!",
        //             icon: "thumb_up"
        //           });
        //         })
        //         .catch(error => {
        //           this.$q.loading.hide();
        //           this.$q.notify({
        //             color: "negative",
        //             position: "bottom",
        //             message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
        //             icon: "thumb_down"
        //           });
        //         });
        //     })

        // },
        fnregionSpareCount() {
            let self = this;
            self.regionSpareCount = [];
            self.getPhonepeSparePartsSetsAndCounts = [];
            self.FETCH_PHONEPE_SPARE_PARTS_SETS_AND_COUNTS().then(() => {
                return _.map(self.getPhonepeSparePartsSetsAndCounts, item => {
                    console.log("GETTING SPARE PARTS COUNT DETAILS---------->", JSON.stringify(this.getPhonepeSparePartsSetsAndCounts))
                    self.regionSpareCount.push({
                        value: item,
                        label: item.spare_parts_types
                    });
                });
            });
        },
        ajaxLoadAllLeadInfo4({ pagination, filter }) {
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
        fnApprovePodDetails(reqdata) {
            this.$q
                .dialog({
                    title: "Confirm",
                    message: "Are you sure want to Approve?",
                    ok: "Continue",
                    cancel: "Cancel"
                })
                .then(() => {
                    this.FETCH_PHONEPE_SINGLE_POD_DETAILS(reqdata)
                        .then(response => {
                            let param = {
                                allocate_region: response.data.data.allocate_region,
                                created_by: response.data.data.created_by,
                                allocate_reseller: response.data.data.allocate_reseller,
                                allocate_so: response.data.data.allocate_so,
                                sparePartsSets: response.data.data.sparePartsSets,
                                total_count: response.data.data.total_count,
                                pod_number: response.data.data.pod_number,
                                created_date: response.data.data.created_date,
                                updated_date: response.data.data.updated_date
                            }
                            param.status = reqdata.status
                            param.owner = reqdata.owner
                            this.APPROVE_PHONEPE_INCOMING_POD_DETAILS(param)
                                .then(() => {
                                    console.log('PARAM---->>>>>>', JSON.stringify(param))
                                    console.log('second')
                                    this.$q.notify({
                                        color: 'positive',
                                        position: 'bottom',
                                        message: 'Successfully Approved!',
                                        icon: 'thumb_up'
                                    })
                                    this.ajaxLoadAllLeadInfo({
                                        pagination: this.paginationControl,
                                        filter: this.filterSearch
                                    })
                                    this.fnregionSpareCount()
                                })
                                .catch(error => {
                                    this.$q.loading.hide()
                                    this.$q.notify({
                                        color: 'negative',
                                        position: 'bottom',
                                        message: error.body.message == null ? 'Please Try Again Later !' : error.body.message,
                                        icon: 'thumb_down'
                                    })
                                })
                        })
                        .catch(error => {
                            this.$q.loading.hide()
                            this.$q.notify({
                                color: 'negative',
                                position: 'bottom',
                                message: error.body.message == null ? 'Please Try Again Later !' : error.body.message,
                                icon: 'thumb_down'
                            })
                        })
                })
        },
        ajaxLoadAllLeadInfo({ pagination, filter }) {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: 'purple-9',
                message: 'Fetching data ..'
            })
            this.FETCHING_PHONEPE_INCOMING_POD_LIST_DETAILS({ pagination, filter }).then((res) => {
                // updating pagination to reflect in the UI
                this.paginationControl = pagination

                // we also set (or update) rowsNumber
                this.paginationControl.rowsNumber =
                    this.getphonepeRegionalInventoryAllocatedSoPodDetails.totalElements
                this.paginationControl.page =
                    this.getphonepeRegionalInventoryAllocatedSoPodDetails.number + 1

                // then we update the rows with the fetched ones
                this.tableData =
                    this.getphonepeRegionalInventoryAllocatedSoPodDetails.content
                if (this.getphonepeRegionalInventoryAllocatedSoPodDetails.sort != null) {
                    this.paginationControl.sortBy =
                        this.getphonepeRegionalInventoryAllocatedSoPodDetails.sort[0].property
                    this.paginationControl.descending =
                        this.getphonepeRegionalInventoryAllocatedSoPodDetails.sort[0].ascending
                }

                // finally we tell QTable to exit the "loading" state
                this.$q.loading.hide()
            })
                .catch(() => {
                    this.$q.loading.hide()
                })
        },
        ajaxLoadAllLeadInfo2({ pagination, filter }) {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: 'purple-9',
                message: 'Fetching data ..'
            })
            this.FETCHING_INCOMING_ALLOCATED_SO_POD_LIST_DETAILS({ pagination, filter }).then((res) => {
                // updating pagination to reflect in the UI
                this.paginationControl2 = pagination

                // we also set (or update) rowsNumber
                this.paginationControl2.rowsNumber =
                    this.getregionalInventoryAllocatedSoPodDetails.totalElements
                this.paginationControl2.page =
                    this.getregionalInventoryAllocatedSoPodDetails.number + 1

                // then we update the rows with the fetched ones
                this.tableData2 =
                    this.getregionalInventoryAllocatedSoPodDetails.content
                if (this.getregionalInventoryAllocatedSoPodDetails.sort != null) {
                    this.paginationControl2.sortBy =
                        this.getregionalInventoryAllocatedSoPodDetails.sort[0].property
                    this.paginationControl2.descending =
                        this.getregionalInventoryAllocatedSoPodDetails.sort[0].ascending
                }

                // finally we tell QTable to exit the "loading" state
                this.$q.loading.hide()
            })
                .catch(() => {
                    this.$q.loading.hide()
                })
        },
        ajaxLoadAllLeadInfo1({ pagination, filter }) {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: 'purple-9',
                message: 'Fetching data ..'
            })
            this.FETCHING_PHONEPE_INCOMING_STOCKS_POD_LIST_DETAILS({ pagination, filter }).then((res) => {
                // updating pagination to reflect in the UI
                this.paginationControl1 = pagination

                // we also set (or update) rowsNumber
                this.paginationControl1.rowsNumber =
                    this.getPhonepeRegionalInventoryStocksPodDetails.totalElements
                this.paginationControl1.page =
                    this.getPhonepeRegionalInventoryStocksPodDetails.number + 1

                // then we update the rows with the fetched ones
                this.tableData1 =
                    this.getPhonepeRegionalInventoryStocksPodDetails.content
                if (this.getPhonepeRegionalInventoryStocksPodDetails.sort != null) {
                    this.paginationControl1.sortBy =
                        this.getPhonepeRegionalInventoryStocksPodDetails.sort[0].property
                    this.paginationControl1.descending =
                        this.getPhonepeRegionalInventoryStocksPodDetails.sort[0].ascending
                }

                // finally we tell QTable to exit the "loading" state
                this.$q.loading.hide()
            })
                .catch(() => {
                    this.$q.loading.hide()
                })
        },
        goToSelectedTab(tab) {
            if (tab == 'allocatedSo') {
                let request = {
                    pagination: this.paginationControl2,
                    filter: this.filterSearch2
                }
                this.toggleAjaxLoadFilter = true
                this.FETCHING_INCOMING_ALLOCATED_SO_POD_LIST_DETAILS(request)
                    .then((response) => {
                        this.toggleAjaxLoadFilter = false
                    })
                    .catch((error) => {
                        this.toggleAjaxLoadFilter = false
                    })
            } else if (tab == 'stocks') {
                this.ajaxLoadAllLeadInfo1({
                    pagination: this.paginationControl1,
                    filter: this.filterSearch1
                })
            } else {
                this.ajaxLoadAllLeadInfo({
                    pagination: this.paginationControl,
                    filter: this.filterSearch
                })
            }
        },
        fnSubmitBankDetails(request) {
            this.formData.allocate_so = JSON.parse(this.formData.allocate_so == ''
                ? null
                : this.formData.allocate_so)

            // this.formData.allocate_region =JSON.parse(this.formData.allocate_region == ""
            //     ? null
            //     : this.formData.allocate_region);
            this.formData.allocate_region = JSON.parse(localStorage.getItem('u_i')).region
            this.formData.allocate_reseller = JSON.parse(this.formData.allocate_reseller == '' ? null : this.formData.allocate_reseller)
            this.$v.formData.$touch();
            if (this.$v.formData.$error) {
                this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "Please fill all mandatory fields",
                    icon: "info",
                });
            } else {
                this.$q.loading.show()
                this.UPDATE_PHONEPE_SPARE_PARTS_INVENTORY_DATAS(request)
                    .then(() => {
                        this.$q.loading.hide()
                        this.$q.notify({
                            color: 'positive',
                            position: 'bottom',
                            message: 'Successfully updated!',
                            icon: 'thumb_up'
                        })
                        this.formData = "";
                        console.log("this.formdata ------>",JSON.stringify(this.formData))

                    })
                    .catch(error => {
                        this.$q.loading.hide()
                        this.$q.notify({
                            color: 'negative',
                            position: 'bottom',
                            message:
                                error.body.message == null
                                    ? 'Please Try Again Later !'
                                    : error.body.message,
                            icon: 'thumb_down'
                        })
                    })
            }

        },
        fnSparePartsTypes() {
            let self = this
            self.FETCH_SPARE_PARTS_GET_TYPES().then(() => {
                return _.map(self.getsparePartsGetTypes, item => {
                    self.sparePartsTypes.push({
                        value: item,
                        label: item.spare_parts_types
                    })
                })
            })
        },
        getSelectedDetails(event, request) {
            var flag = 0
            var totalCount = 0
            var spCount = 0
            var spCount1 = 0
            var spCount2 = 0
            this.requestData = request
            this.selectedSpareValue = this.requestData
            let chFlag = event.target.checked
            if (chFlag) {
                document.getElementById(request.id + '_DV').style.display = 'block'
                console.log('event===>>', event)
            } else {
                console.log('event===>>', event)
                console.log('event value===>>', JSON.stringify(event.srcElement.value))
                document.getElementById(request.id + '_DV').style.display = 'none'

                if (this.formData.sparePartsSets.length > 0) {
                    this.rmSpareCount = this.formData.sparePartsSets.filter(
                        spare => spare.spareParts.id == request.id
                    )
                    var length = this.rmSpareCount.length
                    let rmCount = this.rmSpareCount[length - 1].spareParts.id
                    var length2 = this.formData.sparePartsSets.length
                    if (this.formData.sparePartsSets.length > 0) {
                        this.formData.sparePartsSets.forEach(function (obj1) {
                            console.log('rm', obj1.spareParts.id)
                            if (rmCount == obj1.spareParts.id) {
                                obj1.count = 0
                            }
                        })
                        if (this.formData.sparePartsSets.length > 0) {
                            this.formData.sparePartsSets.forEach(function (obj) {
                                if (obj.spareParts.id == 8) {
                                    spCount = obj.count
                                } else if (obj.spareParts.id == 9) {
                                    spCount1 = obj.count
                                } else if (obj.spareParts.id == 10) {
                                    spCount2 = obj.count
                                } else {
                                    console.log('NA')
                                }
                                totalCount = spCount + spCount1 + spCount2
                            })
                            this.formData.total_count = totalCount
                        }
                        this.formData.total_count = totalCount
                    }
                }
            }
        },
        getAllCounts(event, menu) {
            console.log('GET ALL COUNT EVENTS--------->', event)
            console.log('GET ALL COUNT menu--------->', menu)
            let ch1Flag = event.target.checked
            console.log('FLAG====--------->', JSON.stringify(this.getDisableCount))
            var flag = 0
            var totalCount = 0
            var spCount = 0
            var spCount1 = 0
            var spCount2 = 0
            var count1 = 0
            if (this.formData.sparePartsSets.length > 0) {
                let myArr = this.formData.sparePartsSets
                for (var j = 0; j < myArr.length; j++) {
                    if (myArr[j].id == menu.value.id) {
                        this.formData.sparePartsSets[j].count = parseInt(
                            event.target.value
                        )
                        flag = 1
                    }
                }
            }
            if (flag == 0) {
                console.log('FORMDATAS', JSON.stringify(this.formData.sparePartsSets))
                this.formData.sparePartsSets.push({
                    count: parseInt(event.target.value),
                    spareParts: {
                        id: menu.value.id
                    }
                })
            }
            if (this.formData.sparePartsSets.length > 0) {
                this.formData.sparePartsSets.forEach(function (obj) {
                    console.log('The object : ----------------- : ', JSON.stringify(obj))
                    if (obj.spareParts.id == 8) {
                        spCount = obj.count
                    } else if (obj.spareParts.id == 9) {
                        spCount1 = obj.count
                    } else if (obj.spareParts.id == 10) {
                        spCount2 = obj.count
                    } else {
                        console.log('NA')
                    }
                    console.log('s1', spCount)
                    console.log('s3', spCount1)
                    console.log('s5', spCount2)
                    totalCount = spCount + spCount1 + spCount2
                    console.log('TOTAL===>', totalCount)
                })
                this.formData.total_count = totalCount
            }
            console.log('event value get all counts===>>', JSON.stringify(event.srcElement.value))

            console.log('BOOLEAN', event.target.checked)
        },
        finding(menu) {
            console.log('SELCETED CHECK BOX VALUES------->', JSON.stringify(menu))
        },
        regionBasedSoLoad() {
            let regionArea = JSON.parse(localStorage.getItem('u_i')).region.id
            console.log('REGION BASED SO DETAILS--------->', regionArea)
            // this.red
            this.FETCH_REGION_BASED_SO(regionArea).then(() => {
                let assumeArr = []
                this.getRegionBasedSO.map(function (value, index) {
                    assumeArr.push({
                        label: value.name + " | " + value.employeeID+ " | " + value.email,
                        // value: value.id
                        value: JSON.stringify(value)
                    })
                })
                this.regionBasedSo = assumeArr
                console.log('SO=====>>>>', JSON.stringify(this.regionBasedSo))
            })
        },

        fnDeleteServiceType(rowDetails) {
            console.log('ROW DETAILS------------->', JSON.stringify(rowDetails))
            this.$q
                .dialog({
                    title: 'Confirm',
                    message: 'Are you sure want to delete?',
                    ok: 'Continue',
                    cancel: 'Cancel'
                })
                .then(() => {
                    this.$q.loading.show({
                        delay: 100, // ms
                        message: 'Please Wait',
                        spinnerColor: 'purple-9',
                        customClass: 'shadow-none'
                    })
                    this.DELETE_SERVICE_REQUEST_TYPES(rowDetails).then(response => {
                        this.$q.notify({
                            color: 'positive',
                            position: 'bottom',
                            message: 'Successfully removed',
                            icon: 'thumb_up'
                        })
                    })
                    this.$q.loading.hide()
                })
                .catch(() => {
                    this.$q.notify({
                        color: 'negative',
                        position: 'bottom',
                        message: 'No changes made!',
                        icon: 'thumb_down'
                    })
                })
        },
        fnDeleteSubTaskType(rowDetails) {
            console.log('ROW DETAILS------------->', JSON.stringify(rowDetails))
            this.$q
                .dialog({
                    title: 'Confirm',
                    message: 'Are you sure want to delete?',
                    ok: 'Continue',
                    cancel: 'Cancel'
                })
                .then(() => {
                    this.$q.loading.show({
                        delay: 100, // ms
                        message: 'Please Wait',
                        spinnerColor: 'purple-9',
                        customClass: 'shadow-none'
                    })
                    this.DELETE_SUB_TASK_TYPES(rowDetails).then(response => {
                        this.$q.notify({
                            color: 'positive',
                            position: 'bottom',
                            message: 'Successfully removed',
                            icon: 'thumb_up'
                        })
                    })
                    this.$q.loading.hide()
                })
                .catch(() => {
                    this.$q.notify({
                        color: 'negative',
                        position: 'bottom',
                        message: 'No changes made!',
                        icon: 'thumb_down'
                    })
                })
        },

        ajaxSpareData() {
            this.FETCH_ALL_SERVICE_REQUEST_GET_TYPES()
                .then(res => {
                    this.tableData = this.getserviceRequestGetTypes
                    console.log(
                        'TABLE DATA VALUES-RESPONSE---------->',
                        JSON.stringify(this.tableData)
                    )
                })
                .catch(() => {
                    this.$q.loading.hide()
                })
        },
        getAllInventoryData() {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: 'purple-9',
                message: 'Fetching data ..'
            })
            this.FETCH_CENTRAL_INVENTORY_DASHBOARD_COUNT().then(() => {
                this.inventoryData.centralItems = this.getCentralInventoryDashboardCount.centralInventory
                this.inventoryData.merchantItems = this.getCentralInventoryDashboardCount.merchantInventory
                this.inventoryData.regionalItems = this.getCentralInventoryDashboardCount.regionalInventory
                this.inventoryData.billPartnerInventory = this.getCentralInventoryDashboardCount.billPartnerInventory
                this.inventoryData.resellarItems = this.getCentralInventoryDashboardCount.resellerInventory
                this.inventoryData.faultyInventory = this.getCentralInventoryDashboardCount.faultyInventory
                this.inventoryData.sendtoRepair = this.getCentralInventoryDashboardCount.faultySentToRepair
                this.FETCH_ALL_REGIONS_DATA()
                    .then(() => {
                        this.inventoryData.regionFilterOptions = this.getAllRegionsData

                        this.$q.loading.hide()
                    })
                    .catch(() => {
                        this.$q.loading.hide()
                    })
            })
        },
        ajaxSpareData1() {
            this.FETCH_SUB_TASK_DATAS()
                .then(res => {
                    this.tableData1 = this.getsubTaskDetails
                    console.log(
                        'TABLE DATA 11111111111111 VALUES-RESPONSE---------->',
                        JSON.stringify(this.tableData1)
                    )
                })
                .catch(() => {
                    this.$q.loading.hide()
                })
        },
        fnShowAddNewSubTaskType(rowDetails) {
            this.propShowAddSubTaskType = !this.propShowAddSubTaskType
            this.propRowDetails2 = rowDetails
        },
        fnShowEditServiceType(rowDetails) {
            this.propShowEditServiceType = !this.propShowEditServiceType
            this.propRowDetails = rowDetails
        },
        fnShowEditSubTaskType(rowDetails) {
            this.propShowEditSubTaskType = !this.propShowEditSubTaskType
            this.propRowDetails1 = rowDetails
        },

        myCustomSearchFilter(rows, terms, cols, cellValue) {
            const lowerTerms = terms ? terms.toLowerCase() : ''
            return rows.filter(row =>
                cols.some(
                    col =>
                        (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1
                )
            )
        }
    }
}
</script>

<style>

</style>
