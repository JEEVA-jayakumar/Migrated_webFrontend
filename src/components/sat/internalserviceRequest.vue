<template>
    <q-page>
        <!-- content -->
        <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      > Bijlipay Service Request</div>
        <div>
            <q-tabs v-model="selectedTab" class="shadow-1" color="grey-1" @select="goToUnassignedTab">
               <q-tab default color="dark" name="opened" slot="title" label="Opened" />
                <q-tab color="dark" name="closed" slot="title" label="Closed" />
                <q-tab color="dark" name="cancel" slot="title" label="cancelled" />
                  <q-tab-pane name="opened">
              <opened/>
            </q-tab-pane>
            <q-tab-pane name="cancel">
              <cancelledInternal/>
            </q-tab-pane>
                <q-tab-pane name="closed">
                    <!--START: table Data -->
                    <q-table :data="internalClosedTableData" :columns="columnDataclosed" table-class="customTableClass"
                        :filter="filterSearch" :pagination.sync="paginationControl2"
                        :selected.sync="formData.marsDeviceIdsCookedUnAssinged" row-key="id" :loading="tableAjaxLoading"
                        :rows-per-page-options="[5, 10, 15, 20]" color="dark" @request="ajaxLoadAllLeadInfo2">

                        <!--START: table header -->
                        <q-tr slot="top-row" slot-scope="props">
                            <q-th auto-width></q-th>
                            <q-th v-for="col in props.columns" :key="col.name" :props="props">{{ col.label }}</q-th>
                        </q-tr>
                        <!--END: table header -->
                        <!--START: Table body -->
                        <template slot="body" slot-scope="props">
                            <!--START: table rows -->
                            <q-tr :props="props" class="bottom-border">
                                
                                <q-td key="serviceReqTicketId">
                                    <q-checkbox checked-icon="fas fa-chevron-up" unchecked-icon="fas fa-chevron-down"
                                        color="grey-9" v-model="props.row.expand" class="q-mr-md"
                                        @input="expandRowPlease(props.row)" />
                                    <span>{{ props.row.serviceReqTicketId }}</span>
                                </q-td>
                                <q-td key="tid" :props="props"> {{ props.row.tid }}</q-td>
                                <q-td key="mid" :props="props">
                                    <span v-if="props.row.mid != null">{{ props.row.mid }}</span>
                                    <span v-else="props.row.mid == null">NA</span>
                                </q-td>
                                <q-td key="createdDate" :props="props"> {{ props.row.createdDate | moment("Do MMM Y") }}
                                </q-td>
                                <q-td key="updatedDate" :props="props"> {{ props.row.updatedDate | moment("Do MMM Y") }}
                                </q-td>
                                <q-td key="meName" :props="props"> {{ props.row.meName }}</q-td>
                                <q-td key="bpRegion" :props="props"> {{ props.row.bpRegion.regionAreaName }} </q-td>
                                <q-td key="assignedTo" :props="props">  {{ props.row.assignedTo == null ? "NA" : props.row.assignedTo.name  }} </q-td>
                                <q-td key="crmRemark" :props="props">
                                    <span v-if="props.row.crmRemark != null" v-html="props.row.crmRemark"></span>
                                    <span v-else="props.row.crmRemark == null">NA</span>
                                </q-td>
                                <q-td key="deviceType" :props="props"> {{ props.row.deviceType }}</q-td>
                                <q-td key="serviceRequestTicketStatus" :props="props">
                                    <span class="label text-positive"
                                        v-if="props.row.serviceRequestTicketStatus == 1">REQUEST_UNASSIGNED</span>
                                    <span class="label text-negative"
                                        v-else-if="props.row.serviceRequestTicketStatus == 2">REQUEST_ASSIGNED</span>
                                    <span class="label text-negative"
                                        v-else-if="props.row.serviceRequestTicketStatus == 3">REQUEST_CLOSED</span>
                                    <span class="label" v-else>NA</span>
                                </q-td>                            
                                <q-td key="serviceRequestMode" :props="props"> {{ props.row.serviceRequestMode == null ? "NA" : props.row.serviceRequestMode }}</q-td>
                                <q-td key="serviceRequestSubTicketStatus" :props="props">
                                    <span class="label text-positive"
                                        v-if="props.row.serviceRequestSubTicketStatus == 1">SR_TICKET_RAISED</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 2">SR_TICKET_ESCALATED_TO_SAT</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 3">SR_ASSIGNED_TO_ENGINEER</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 4">SR_ISSUE_RESOLVED_COURIERED</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 5">SR_DEVICE_COURIERED</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 6">SR_ISSUE_RESOLVED_REMOTELY</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 7">SR_SCHEDULED_ENGINEER_VISIT</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 8">SR_ISSUE_RESOLVED</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 9">SR_MERCHANT_NOT_REACHABLE</span>
                                    <span class="label text-negative"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 10">SR_CANCELLED</span>
                                    <span class="label" v-else>NA</span>
                                </q-td>
                                </q-tr>
                            <!-- START: table expand values -->
                            <q-tr v-show="props.row.expand" :props="props" class="wordWrapCustom bottom-border">
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Request Type
                                    </div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id" :props="props">
                                            <span>
                                                {{ col.serviceRequestType != null ? col.serviceRequestType.name : "NA"}}
                                            </span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">IssueType</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.serviceRequestIssueType != null ? col.serviceRequestIssueType : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">SubTicket Status</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>
                                            {{ col.serviceRequestSubTicketStatus != null ? col.serviceRequestSubTicketStatus.name : "NA" }}
                                            </span><br/>                                   
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Schedule Date</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.scheduleDate != null ? col.scheduleDate : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Pod Number</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.podNumber != null ? col.podNumber : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Service Remarks
                                    </div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id" :props="props">
                                            <span>{{ col.serviceRemarks != null ? col.serviceRemarks : "NA"}}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Cancel Reason</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.cancelReason != null ? col.cancelReason : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Issue Remark</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.issueRemark != null ? col.issueRemark : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Remark</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.remark != null ? col.remark : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Latitude</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.latitude != null ? col.latitude : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Longitude</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.longitude != null ? col.longitude : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Implementation Form</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.implementationForm != null ? col.implementationForm : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Picture Of Shop</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.pictureOfShop != null ? col.pictureOfShop : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Old Sim Number</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.oldSimNumber != null ? col.oldSimNumber : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Old Sim Network</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.oldSimNetwork != null ? col.oldSimNetwork : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">New Sim Number</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.newSimNumber != null ? col.newSimNumber : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">New Sim Network</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.newSimNetwork != null ? col.newSimNetwork : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Scan Sim Number</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.scanSimNumber != null ? col.scanSimNumber : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Scan Device</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.scanDeviceSerialNumber != null ? col.scanDeviceSerialNumber : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Part Type</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.partType != null ? col.partType : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                                <q-td>
                                    <div class="text-left q-caption text-grey-8 text-weight-medium">Paper Roll Count</div>
                                    <div class="text-left" v-if="props.row.subTicketsList.length > 0">
                                        <div v-for="col in props.row.subTicketsList" :key="col.serviceRequestType.id"
                                            :props="props">
                                            <span>{{ col.paperRollCount != null ? col.paperRollCount : "NA" }}</span><br/>
                                        </div>
                                    </div>
                                </q-td>
                            </q-tr>
                            </template>
                            <template slot="top">
                                <div class="col-md-5">
                                    <q-search clearable color="grey-9" v-model="filterSearch" placeholder="Type.."
                                    float-label="Search By ServiceReqTicketId, TID .." class="q-mr-lg q-py-sm" />
                                </div>
                            </template>
                        </q-table>
                    <!--END: table Data -->
                </q-tab-pane>
            </q-tabs>
            <div class="row items-center gutter-y-sm">
                <div class="col-md-9 col-sm-12 col-xs-12">
                    <div class="row items-center"></div>
                </div>
            </div>
           </div>
    </q-page>
</template>

<script>
import {
    required,
    requiredIf,
    email,
    minLength,
    maxLength,
    alpha,
    alphaNum,
    numeric
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

import opened from "../../components/sat/opened.vue";
import cancelledInternal from "../../components/sat/cancelledInternal.vue";
export default {
    name: "implementationQueue",
     components: {
      opened,
      cancelledInternal
    },
    data() {
        return {
            propToggleLeadInformation: false,
            addtnLeadInformation: null,

            filterSearch: "",
            filterSearch1: "",
            filterSearch2: "",
            selectedTab: "assigned",
            assignTo: "",
            assignToOptions: [],
            tableData: [],
            tableData1: [],
            internalUnAssignedTableData: [],
            internalAssignedTableData: [],
            internalClosedTableData: [],
            // internalAssignedTableData
            tableData2: [],
            //   formData: {
            //       requestMode:"",
            //       podNumber:"",
            //   },
            requestOptions: [
                {
                    label: "Direct Dispatch",
                    value: "Direct Dispatch",
                },
                {
                    label: "SO",
                    value: "SO",
                },
            ],
            //Defining columns for table
            columnDataclosed: [
            {
                    name: "serviceReqTicketId",
                    required: true,
                    label: "ServiceReqTicketId",
                    align: "left",
                    field: row => {
                        return row.serviceReqTicketId;
                    },
                    sortable: false
                },
                //     field: (row) => {
                //         return row.serviceReqTicketId == null
                //             ? "NA"
                //             : row.serviceReqTicketId;
                //     },
                //     sortable: false,
                // },

                {
                    name: "tid",
                    required: true,
                    label: "TID",
                    align: "left",
                    field: (row) => {
                        return row.tid == null
                            ? "NA"
                            : row.tid;
                    },
                    sortable: false,
                },
                {
                    name: "mid",
                    required: true,
                    label: "MID",
                    align: "left",
                    field: (row) => {
                        return row.mid == null
                            ? "NA"
                            : row.mid;
                    },
                    sortable: false,
                },
                {
                    name: "createdDate",
                    required: true,
                    label: "CreatedDate",
                    align: "left",
                    field: (row) => {
                        return row.createdDate
                    },
                    sortable: true,
                },
                {
                    name: "updatedDate",
                    required: true,
                    label: "UpdatedDate",
                    align: "left",
                    field: (row) => {
                        return row.updatedDate
                    },
                    sortable: false,
                },

                {
                    name: "meName",
                    required: true,
                    label: "ME Name",
                    align: "left",
                    field: (row) => {
                        return row.meName == null
                            ? "NA"
                            : row.meName;
                    },
                    sortable: false,
                },
                // {
                //     name: "address",
                //     required: true,
                //     label: "Address",
                //     align: "left",
                //     field: (row) => {
                //         return row.address == null
                //             ? "NA"
                //             : row.address;
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "state",
                //     required: true,
                //     label: "State",
                //     align: "left",
                //     field: (row) => {
                //         return row.state == null
                //             ? "NA"
                //             : row.state;
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "city",
                //     required: true,
                //     label: "City",
                //     align: "left",
                //     field: (row) => {
                //         return row.city == null
                //             ? "NA"
                //             : row.city;
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "pincode",
                //     required: true,
                //     label: "Pincode",
                //     align: "left",
                //     field: (row) => {
                //         return row.pincode == null
                //             ? "NA"
                //             : row.pincode;
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "kaptureTicketId",
                //     required: true,
                //     label: "KaptureTicketId",
                //     align: "left",
                //     field: (row) => {
                //         return row.kaptureTicketId == null
                //             ? "NA"
                //             : row.kaptureTicketId;
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "contactNumber",
                //     required: true,
                //     label: "ContactNumber",
                //     align: "left",
                //     field: (row) => {
                //         return row.contactNumber == null
                //             ? "NA"
                //             : row.contactNumber;
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "emailId",
                //     required: true,
                //     label: "EmailId",
                //     align: "left",
                //     field: (row) => {
                //         return row.emailId == null
                //             ? "NA"
                //             : row.emailId;
                //     },
                //     sortable: false,
                // },
                {
                    name: "bpRegion",
                    required: true,
                    label: "BpRegion",
                    align: "left",
                    field: (row) => {
                        return row.bpRegion == null
                            ? "NA"
                            : row.bpRegion.regionAreaName;
                    },
                    sortable: false,
                },
                {
                    name: "assignedTo",
                    required: true,
                    label: "AssignedTo",
                    align: "left",
                    field: (row) => {
                        return row.assignedTo == null
                            ? "NA"
                            : row.assignedTo.name;
                    },
                    sortable: false,
                },
                // {
                //     name: "serviceReqType",
                //     required: true,
                //     label: "ServiceReqType",
                //     align: "left",
                //     field: (row) => {
                //         return row.serviceReqType == null
                //             ? "NA"
                //             : row.serviceReqType.name;
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "serviceReqIssueType",
                //     required: true,
                //     label: "ServiceReqIssueType",
                //     align: "left",
                //     field: (row) => {
                //         return row.serviceReqIssueType == null
                //             ? "NA"
                //             : row.serviceReqIssueType;
                //     },
                //     sortable: false,
                // },
                {
                    name: "crmRemark",
                    required: true,
                    label: "CRM Remark",
                    align: "left",
                    field: (row) => {
                        return row.crmRemark == null
                            ? "NA"
                            : row.crmRemark;
                    },
                    sortable: false,
                },
                {
                    name: "deviceType",
                    required: true,
                    label: "DeviceType",
                    align: "left",
                    field: (row) => {
                        return row.deviceType == null
                            ? "NA"
                            : row.deviceType;
                    },
                    sortable: false,
                },
                {
                    name: "serviceRequestSubTicketStatus",
                    required: true,
                    label: "ServiceReqIssueStatus",
                    align: "left",
                    field: (row) => {
                        return row.serviceRequestSubTicketStatus
                    },
                    sortable: false,
                },
                // {
                //     name: "kaptureTicketStatus",
                //     required: true,
                //     label: "KaptureTicketStatus",
                //     align: "left",
                //     field: (row) => {
                //         return row.kaptureTicketStatus == null
                //             ? "NA"
                //             : row.kaptureTicketStatus;
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "source",
                //     required: true,
                //     label: "Source",
                //     align: "left",
                //     field: (row) => {
                //         return row.source == true
                //             ? "Internal"
                //             : "External";
                //     },
                //     sortable: false,
                // },
                {
                    name: "serviceRequestMode",
                    required: true,
                    label: "RequestMode",
                    align: "left",
                    field: (row) => {
                        return row.serviceRequestMode == null
                            ? "NA"
                            : row.serviceRequestMode;
                    },
                    sortable: false,
                },
                // {
                //     name: "kaptureDueDate",
                //     required: true,
                //     label: "KaptureDueDate",
                //     align: "left",
                //     field: (row) => {
                //         return row.kaptureDueDate
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "appointmentDate",
                //     required: true,
                //     label: "AppointmentDate",
                //     align: "left",
                //     field: (row) => {
                //         return row.appointmentDate
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "courierDueDate",
                //     required: true,
                //     label: "CourierDueDate",
                //     align: "left",
                //     field: (row) => {
                //         return row.courierDueDate
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "scheduleDate",
                //     required: true,
                //     label: "ScheduleDate",
                //     align: "left",
                //     field: (row) => {
                //         return row.scheduleDate
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "seName",
                //     required: true,
                //     label: "SE Name",
                //     align: "left",
                //     field: (row) => {
                //         return row.seName == null
                //             ? "NA"
                //             : row.seName;
                //     },
                //     sortable: false,
                // },
                // {
                //     name: "sePhoneNumber",
                //     required: true,
                //     label: "SE PhoneNumber",
                //     align: "left",
                //     field: (row) => {
                //         return row.sePhoneNumber == null
                //             ? "NA"
                //             : row.sePhoneNumber;
                //     },
                //     sortable: false,
                // },
                {
                    name: "serviceRequestTicketStatus",
                    required: true,
                    label: "TicketStatus",
                    align: "left",
                    field: (row) => {
                        return row.serviceRequestTicketStatus
                    },
                    sortable: false,
                },
                // {
                //     name: "podNumber",
                //     required: true,
                //     label: "podNumber",
                //     align: "left",
                //     field: (row) => {
                //         return row.podNumber == null
                //             ? "NA"
                //             : row.podNumber;
                //     },
                //     sortable: false,
                // },
            ],
            
            currentDeviceInfo: {},
            showDeviceAddressModal: false,
            //   formData: {
            //       serviceRequestMode:"",
            //       podNumber:"",
            //   },
            formData: {
                marsDeviceIdsCooked: [],
                marsDeviceIdsCookedUnAssinged: [],
                triggerWelcomeMail: false,
                assignTo: {
                    id: ""
                },
                podNumber: "",
            },
            paginationControl: {
                sortBy: "createdDate", // String, column "name" property value
                descending: false,
                page: 1,
                rowsPerPage: 10, // current rows per page being displayed
            },
            paginationControl1: {
                sortBy: "createdDate", // String, column "name" property valuecreated_date
                descending: false,
                page: 1,
                rowsPerPage: 10, // current rows per page being displayed
            },
            paginationControl2: {
                sortBy: "createdDate", // String, column "name" property valuecreated_date
                descending: false,
                page: 1,
                rowsPerPage: 10, // current rows per page being displayed
            },
            tableAjaxLoading: false,
            tableAjaxLoading1: false,
        };
    },

    //   validation:{
    //       formData:{
    //           serviceRequestMode:{
    //               required
    //           },
    //       }
    //   },

    computed: {
        ...mapGetters("DeviceReplacement", [
            "getDeviceReplacementQueueAssignedList",
            "getDeviceReplacementQueueUnassignedList",
        ]),
        ...mapGetters("ImplementationExecutive", [
            "getImplementationExecutiveList",
        ]),
        ...mapGetters("serviceRequestSat", ["getserviceRequestUnassignedDatas", "getserviceRequestassignedDatas", "getserviceRequestClosedDatas"]),
        ...mapGetters("SuperAdminUsers", ["getAllStatesData"]),
    },
    created() {
        // this.ajaxLoadAllLeadInfo({
        //     pagination: this.paginationControl,
        //     filter: this.filterSearch,
        // });
        // this.ajaxLoadAllLeadInfo1({
        //     pagination: this.paginationControl1,
        //     filter: this.filterSearch1,
        // });
        this.ajaxLoadAllLeadInfo2({
            pagination: this.paginationControl2,
            filter: this.filterSearch2,
        })
        this.getPincodeInformations();
    },
    // mounted() {
    //   this.ajaxLoadAllLeadInfo({
    //     pagination: this.paginationControl,
    //     filter: this.filterSearch,
    //   });
    //   this.ajaxLoadAllLeadInfo1({
    //     pagination: this.paginationControl1,
    //     filter: this.filterSearch1,
    //   });
    // },
    methods: {
        ...mapActions("DeviceReplacement", [
            "DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST",
            "DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST",
            "DEVICE_REPLACEMENT_QUEUE_SUBMIT",
        ]),
        ...mapActions("serviceRequestSat", ["FETCH_UNASSIGNED_SERVICE_REQUEST_DATAS", "SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE", "FETCH_ASSIGNED_SERVICE_REQUEST_DATAS", "FETCH_CLOSED_SERVICE_REQUEST_DATAS"]),
        ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
        ...mapActions("SuperAdminUsers", ["FETCH_ALL_STATES_DATA"]),
        //Load all short lead info while page loading FETCH_UNASSIGNED_SERVICE_REQUEST_DATAS
        // ajaxLoadAllLeadInfo2() {
        //   this.toggleAjaxLoadFilter = true;

        //   this.IMPLEMENTATION_EXECUTIVE_LIST().then((response) => {
        //     let assumeArr = [];
        //     this.getImplementationExecutiveList.map(function (value) {
        //       assumeArr.push({ label: value.name, value: value.id });
        //     });
        //     this.assignToOptions = assumeArr;
        //   });
        //   // todo => pass region id
        //   this.toggleAjaxLoadFilter = false;
        // },

        getPincodeInformations() {
            this.FETCH_ALL_STATES_DATA();
        },
        // ajaxLoadAllLeadInfo1({ pagination, filter }) {
        //     // we set QTable to "loading" state
        //     this.$q.loading.show({
        //         delay: 0, // ms
        //         spinnerColor: "purple-9",
        //         message: "Fetching data ..",
        //     });
        //     this.FETCH_UNASSIGNED_SERVICE_REQUEST_DATAS({ pagination, filter })
        //         .then((res) => {
        //             this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
        //                 let assumeArr = [];
        //                 this.getImplementationExecutiveList.map(function (value) {
        //                     assumeArr.push({ label: value.name, value: value.id });
        //                 });
        //                 this.assignToOptions = assumeArr;
        //             });
        //             // updating pagination to reflect in the UI
        //             this.paginationControl1 = pagination;

        //             // we also set (or update) rowsNumber
        //             this.paginationControl1.rowsNumber =
        //                 this.getserviceRequestUnassignedDatas.totalElements;
        //             this.paginationControl1.page =
        //                 this.getserviceRequestUnassignedDatas.number + 1;

        //             // then we update the rows with the fetched ones source
        //             this.tableData1 =
        //                 this.getserviceRequestUnassignedDatas.content;
        //             this.internalUnAssignedTableData = this.tableData1.filter(service => service.source == true);
        //             if (this.getserviceRequestUnassignedDatas.sort != null) {
        //                 this.paginationControl1.sortBy =
        //                     this.getserviceRequestUnassignedDatas.sort[0].property;
        //                 this.paginationControl1.descending =
        //                     this.getserviceRequestUnassignedDatas.sort[0].ascending;
        //             }

        //             // finally we tell QTable to exit the "loading" state
        //             this.$q.loading.hide();
        //         })
        //         .catch(() => {
        //             this.$q.loading.hide();
        //         });
        // },
        ajaxLoadAllLeadInfo2({ pagination, filter }) {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Fetching data ..",
            });
            this.FETCH_CLOSED_SERVICE_REQUEST_DATAS({ pagination, filter })
                .then((res) => {
                    // updating pagination to reflect in the UI
                    this.paginationControl2 = pagination;

                    // we also set (or update) rowsNumber
                    this.paginationControl2.rowsNumber =
                        this.getserviceRequestClosedDatas.totalElements;
                    this.paginationControl2.page =
                        this.getserviceRequestClosedDatas.number + 1;

                    // then we update the rows with the fetched ones
                    this.tableData2 = this.getserviceRequestClosedDatas.content;
                    this.internalClosedTableData = this.tableData2.filter(service => service.source == true);
                    if (this.getserviceRequestClosedDatas.sort != null) {
                        this.paginationControl2.sortBy =
                            this.getserviceRequestClosedDatas.sort[0].property;
                        this.paginationControl2.descending =
                            this.getserviceRequestClosedDatas.sort[0].ascending;
                    }

                    // finally we tell QTable to exit the "loading" state
                    this.$q.loading.hide();
                })
                .catch(() => {
                    this.$q.loading.hide();
                });
        },
        // ajaxLoadAllLeadInfo({ pagination, filter }) {
        //     // we set QTable to "loading" state
        //     this.$q.loading.show({
        //         delay: 0, // ms
        //         spinnerColor: "purple-9",
        //         message: "Fetching data ..",
        //     });
        //     this.FETCH_ASSIGNED_SERVICE_REQUEST_DATAS({ pagination, filter })
        //         .then((res) => {
        //             // updating pagination to reflect in the UI
        //             this.paginationControl = pagination;

        //             // we also set (or update) rowsNumber
        //             this.paginationControl.rowsNumber =
        //                 this.getserviceRequestassignedDatas.totalElements;
        //             this.paginationControl.page =
        //                 this.getserviceRequestassignedDatas.number + 1;

        //             // then we update the rows with the fetched ones externalAssignedTableData

        //             this.tableData = this.getserviceRequestassignedDatas.content;

        //             this.internalAssignedTableData = this.tableData.filter(service => service.source == true);
        //             if (this.getserviceRequestassignedDatas.sort != null) {
        //                 this.paginationControl.sortBy =
        //                     this.getserviceRequestassignedDatas.sort[0].property;
        //                 this.paginationControl.descending =
        //                     this.getserviceRequestassignedDatas.sort[0].ascending;
        //             }

        //             // finally we tell QTable to exit the "loading" state
        //             this.$q.loading.hide();
        //         })
        //         .catch(() => {
        //             this.$q.loading.hide();
        //         });
        // },

        //Load all short lead info while page loading
        goToUnassignedTab(tab) {
            if (tab == "unAssigned") {
                let request = {
                    pagination: this.paginationControl1,
                    filter: this.filterSearch1,
                };
                this.toggleAjaxLoadFilter = true;
                this.FETCH_UNASSIGNED_SERVICE_REQUEST_DATAS(request)
                    .then((response) => {
                        this.toggleAjaxLoadFilter = false;
                    })
                    .catch((error) => {
                        this.toggleAjaxLoadFilter = false;
                    });
            }
            else if (tab == "assigned") {
                let request = {
                    pagination: this.paginationControl,
                    filter: this.filterSearch,
                };
                this.toggleAjaxLoadFilter = true;
                this.FETCH_ASSIGNED_SERVICE_REQUEST_DATAS(request)
                    .then((response) => {
                        this.toggleAjaxLoadFilter = false;
                    })
                    .catch((error) => {
                        this.toggleAjaxLoadFilter = false;
                    });
            } else {
                this.ajaxLoadAllLeadInfo2({
                    pagination: this.paginationControl2,
                    filter: this.filterSearch2,
                });
            }
        },

        // Function to open device address pop up
        UpdateDeviceAddress(currentDeviceInfo) {
            this.currentDeviceInfo = [];
            this.showDeviceAddressModal = !this.showDeviceAddressModal;
            if (this.formData.marsDeviceIdsCooked.length == 0) {
                let assumeObj = {
                    id: [currentDeviceInfo.id],
                    marsDeviceAddress: {
                        deviceAddress: currentDeviceInfo.deviceAddress,
                        latitude: 0,
                        longitude: 0,
                        pincode: currentDeviceInfo.pincode,
                        city: currentDeviceInfo.city,
                        state: currentDeviceInfo.state,
                    },
                };
                this.currentDeviceInfo = assumeObj;
            } else {
                let marsDeviceIdsCooked = [];
                this.formData.marsDeviceIdsCooked.map(function (value) {
                    marsDeviceIdsCooked.push(value.id);
                });
                let assumeObj = {
                    id: marsDeviceIdsCooked,
                    marsDeviceAddress: {
                        deviceAddress: currentDeviceInfo.deviceAddress,
                        latitude: 0,
                        longitude: 0,
                        pincode: currentDeviceInfo.pincode,
                        city: currentDeviceInfo.city,
                        state: currentDeviceInfo.state,
                    },
                };
                this.currentDeviceInfo = assumeObj;
            }
        },
        // Function to open device address pop up
        UpdateDeviceAddressAfterEmit(pagination) {
            this.showDeviceAddressModal = !this.showDeviceAddressModal;
            this.paginationControl = pagination;
        },

        // Function to assign implementation manager in implementation queue
        assignImplementationUser() {
            let self = this;
            if (self.formData.marsDeviceIdsCooked.length == 0) {
                self.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "Select atleast one item to assign",
                    icon: "thumb_down",
                });
            } else if (self.formData.assignTo == "") {
                self.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "Request Mode cannot be empty!",
                    icon: "thumb_down",
                });
            }
            else if (self.formData.serviceRequestMode == 'Direct Dispatch' && self.formData.podNumber == null) {
                self.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "Pod Number cannot be empty!",
                    icon: "thumb_down",
                });
            }
            else {
                let marsDeviceIdsCooked = [];
                self.formData.marsDeviceIdsCooked.map(function (value) {
                    value.podNumber = self.formData.podNumber;
                    value.serviceRequestMode = self.formData.serviceRequestMode;
                    // value.assignedTo = self.formData.assignTo.id;
                    marsDeviceIdsCooked.push(value);
                });
                // marsDeviceIdsCooked.podNumber = marsDeviceIdsCooked.podNumber == null ? null :self.formData.podNumber;
                let postValues = {
                    // action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
                    request: marsDeviceIdsCooked,
                    // triggerWelcomeMail: self.formData.triggerWelcomeMail,
                    userId: self.formData.assignTo.id,
                };
                self
                    .SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE(postValues)
                    .then(() => {
                        // self.DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST();
                        // self.ajaxLoadAllLeadInfo();
                        // this.ajaxLoadAllLeadInfo({
                        //     pagination: this.paginationControl,
                        //     filter: this.filterSearch,
                        // });
                        // this.ajaxLoadAllLeadInfo1({
                        //     pagination: this.paginationControl1,
                        //     filter: this.filterSearch1,
                        // });
                        self.formData.marsDeviceIdsCooked = [];
                        self.formData.assignTo = "";
                        self.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: "Successfully assigned!",
                            icon: "thumb_up",
                        });
                    })
                    .catch(() => {
                        self.$q.notify({
                            color: "negative",
                            position: "bottom",
                            message: "Please try again",
                            icon: "thumb_down",
                        });
                    });
            }
        },

        // Function to unAssignImplementationUser in implementation queue
        unAssignImplementationUser() {
            let self = this;
            if (self.formData.marsDeviceIdsCookedUnAssinged.length == 0) {
                self.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "Select atleast one item to Unassign",
                    icon: "thumb_down",
                });
            } else {
                let marsDeviceIdsCookedUnAssinged = [];
                self.formData.marsDeviceIdsCookedUnAssinged.map(function (value) {
                    marsDeviceIdsCookedUnAssinged.push(value.id);
                });

                let postValues = {
                    action: this.$MARS_DEVICE_STATUS_TID_GENERATED,
                    marsDeviceIds: marsDeviceIdsCookedUnAssinged,
                    userId: this.$SEND_ZERO_FOR_UNASSIGING,
                };
                self
                    .DEVICE_REPLACEMENT_QUEUE_SUBMIT(postValues)
                    .then(() => {
                        // self.DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST();
                        // self.ajaxLoadAllLeadInfo();
                        // this.ajaxLoadAllLeadInfo({
                        //     pagination: this.paginationControl,
                        //     filter: this.filterSearch,
                        // });
                        self.formData.marsDeviceIdsCookedUnAssinged = [];
                        self.formData.assignTo = "";
                        self.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: "Successfully Unassigned!",
                            icon: "thumb_up",
                        });
                    })
                    .catch(() => {
                        self.$q.notify({
                            color: "negative",
                            position: "bottom",
                            message: "Please try again",
                            icon: "thumb_down",
                        });
                    });
            }
        },

        // Function to unAssignImplementationUser in implementation queue
        reAssignImplementationUser() {
            let self = this;
            if (self.formData.marsDeviceIdsCookedUnAssinged.length == 0) {
                self.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "Select atleast one item to assign",
                    icon: "thumb_down",
                });
            } else if (self.formData.assignTo == "") {
                self.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "Implementation officer cannot be empty!",
                    icon: "thumb_down",
                });
            } else {
                let marsDeviceIdsCookedUnAssinged = [];
                self.formData.marsDeviceIdsCookedUnAssinged.map(function (value) {
                    marsDeviceIdsCookedUnAssinged.push(value.id);
                });

                let postValues = {
                    action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
                    marsDeviceIds: marsDeviceIdsCookedUnAssinged,
                    triggerWelcomeMail: self.formData.triggerWelcomeMail,
                    userId: self.formData.assignTo,
                };
                self
                    .DEVICE_REPLACEMENT_QUEUE_SUBMIT(postValues)
                    .then(() => {
                        self.DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST();
                        // self.ajaxLoadAllLeadInfo();
                        self.formData.marsDeviceIdsCookedUnAssinged = [];
                        self.formData.assignTo = "";
                        self.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: "Successfully re assigned !",
                            icon: "thumb_up",
                        });
                    })
                    .catch(() => {
                        self.$q.notify({
                            color: "negative",
                            position: "bottom",
                            message: "Please try again",
                            icon: "thumb_down",
                        });
                    });
            }
        },

        // Function to toggle lead information pop up screen
        toggleLeadInformation(leadDetails) {
            this.propToggleLeadInformation = !this.propToggleLeadInformation;
            if (leadDetails != undefined) {
                this.addtnLeadInformation = leadDetails;
            }
        },
    },
};
</script>

<style scoped>
.customTd {
    text-align: left !important;
    word-wrap: break-word;
    white-space: normal;
}

.customTd.customCellLength {
    min-width: 300px !important;
    overflow-x: auto;
}
</style>
