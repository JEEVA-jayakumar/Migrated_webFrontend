<template>
    <q-page>
        <div>
            <q-table :data="tableData2" :columns="columnDataclosed"
                        table-class="customTableClass" :filter=" filterSearch" 
                        :selected.sync="formData.marsDeviceIdsCooked" :pagination.sync=" paginationControl" row-key="id"
                        :loading="tableAjaxLoading" :rows-per-page-options="[5, 10, 15, 20]" color="dark"
                        @request=" ajaxLoadAllLeadInfo">
                       
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
                                <q-search clearable color="grey-9" v-model=" filterSearch" placeholder="Type.."
                                float-label="Search By ServiceReqTicketId, TID .." class="q-mr-lg q-py-sm" />
                            </div>
                        </template>
                    </q-table>
            
        </div>
    </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    // name: "implementationQueue",
    //  components: {
    //   opened,
    //   cancelledInternal
    // },
    data() {
        return {
            propToggleLeadInformation: false,
            addtnLeadInformation: null,

             filterSearch: "",
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

            tableAjaxLoading: false,
    
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
       
        ...mapGetters("serviceRequestSat", ["getserviceRequestCancelledDatas"]),
    },
    created() {
        this. ajaxLoadAllLeadInfo({
            pagination: this. paginationControl,
            filter: this. filterSearch,
        })
      
    },

    methods: {
       
        ...mapActions("serviceRequestSat", ["FETCH_CANCELLED_SERVICE_REQUEST_DATAS"]),
       
     
         ajaxLoadAllLeadInfo({ pagination, filter }) {
            this.$q.loading.show({
                delay: 0, // ms
                spinnerColor: "purple-9",
                message: "Fetching data ..",
            });
            this.FETCH_CANCELLED_SERVICE_REQUEST_DATAS({ pagination, filter })
                .then((res) => {
                    // updating pagination to reflect in the UI
                    this. paginationControl = pagination;

                    // we also set (or update) rowsNumber
                    this. paginationControl.rowsNumber =
                        this. getserviceRequestCancelledDatas.totalElements;
                    this. paginationControl.page =
                        this. getserviceRequestCancelledDatas.number + 1;

                    // then we update the rows with the fetched ones
                    this.tableData2 = this. getserviceRequestCancelledDatas.content;
                    this.internalClosedTableData = this.tableData2.filter(service => service.source == true);
                    if (this. getserviceRequestCancelledDatas.sort != null) {
                        this. paginationControl.sortBy =
                            this. getserviceRequestCancelledDatas.sort[0].property;
                        this. paginationControl.descending =
                            this. getserviceRequestCancelledDatas.sort[0].ascending;
                    }

                    // finally we tell QTable to exit the "loading" state
                    this.$q.loading.hide();
                })
                .catch(() => {
                    this.$q.loading.hide();
                });
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
