<template>
    <q-page>
        <div>
            <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" @select="goToCompleteTab">
                <q-tab default color="dark" name="tab-1" slot="title" label="Pending Tickets" />
                <q-tab color="dark" name="tab-2" slot="title" label="Completed Tickets" />
                <q-tab-panel name="tab-1">
                    <div class="row items-center">
                        <div class="col">
                            <strong> Open For </strong>
                        </div>
                        <q-select class="col" v-model.trim="formData.date" :options="dateType" 
                            color="grey" @input="dateClick">
                        </q-select>
                        <div class="col-5"></div>
                        <q-input class="col-5" clearable color="grey-9" placeholder="Type.." v-model="filter"
                        float-label="Search By Ticket No, Merchant No..." />
                    </div>
                    <q-table table-class="customTableClass" class="q-py-none" :rows="tableData" :columns="columns"
                        :filter="filter" :rows-per-page-options="[5, 10, 15]" :pagination="paginationControl"
                        :loading="toggleAjaxLoadFilter" @request="ajaxLoadAllLeadInfo">
                        <q-td v-slot:body-cell-Date="props" :props="props">{{
                                props.row == null ? "NA" : props.row.createdDate |
                                    moment("Do MMM Y")
                        }}</q-td>
                        <q-td v-slot:body-cell-action="props" :props="props">
                            <div class="row no-wrap no-padding">
                                <q-btn :disable="props.row.serviceRequestTicketStatus != 1" dense no-caps no-wrap
                                    label="Resolved" icon="far fa-plus-square" size="md" @click="fnResolve(props.row)"
                                    flat class="custom-green">
                                </q-btn>
                                <q-btn :disable="props.row.serviceRequestTicketStatus != 1" dense no-caps no-wrap
                                    label="Escalate to Sat" icon="far fa-plus-square" size="md"
                                    @click="fnEscalateToSat(props.row)" flat class="custom-negative">
                                </q-btn>
                            </div>
                        </q-td>
                        <q-td v-slot:body-cell-updateRemarks="props" :props="props">
                            <div class="row no-wrap no-padding">
                                <q-btn :disable="props.row.serviceRequestTicketStatus != 1" no-caps icon="edit"
                                    color="purple-9" size="xs" round @click="toggleAddremarks(props.row)">
                                </q-btn>
                                <span class="q-ma-sm" v-if="props.row.crmRemark != null"
                                    v-html="props.row.crmRemark"></span>
                                <span class="q-ma-sm" v-else="props.row.crmRemark == null">NA</span>
                            </div>
                        </q-td>
                        <q-td v-slot:body-cell-createdDate="props" :props="props">{{ props.row == null
                                ? "NA" : props.row.createdDate | moment("Do MMM Y")
                        }}</q-td>
                    </q-table>
                </q-tab-panel>
                <q-tab-panel name="tab-2">
                    <div class="row">
                        <q-input class="col-4" v-model="filter1" clearable color="grey-9" placeholder="Type.."
                        float-label="Search By Ticket No, Merchant No..." />
                    </div>
                    <q-table table-class="customTableClass" class="q-py-none" :rows="tableData1" :columns="columns2"
                        :filter="filter1" :rows-per-page-options="[5, 10, 15]" :pagination="paginationControl1"
                        :loading="toggleAjaxLoadFilter1" @request="ajaxLoadAllLeadInfo1">
                        <q-td v-slot:body-cell-updateRemarks="props" :props="props">
                            <div class="row no-wrap no-padding">
                                <span class="q-ma-sm" v-if="props.row.crmRemark != null"
                                    v-html="props.row.crmRemark"></span>
                                <span class="q-ma-sm" v-else="props.row.crmRemark == null">NA</span>
                            </div>
                        </q-td>
                        <q-td v-slot:body-cell-createdDate="props" :props="props">{{ props.row.createdDate |
                                moment("Do MMM Y")
                        }}</q-td>
                        <q-td v-slot:body-cell-updatedDate="props" :props="props">{{ props.row.updatedDate |
                                moment("Do MMM Y")
                        }}</q-td>
                    </q-table>

                </q-tab-panel>
            </q-tabs>

        </div>
        <bijlipayAddRemarks v-if="propToggleRemarks" :remarksInfo="addBasicInformation"
            :propToggleRemarksPop="propToggleRemarks" @reloadBijlipayPendingDetails="loadingData({ pagination: paginationControl,
            filter:filter, date:formData.date})"
            @closeRemarksInfo="toggleAddremarks" />
        <div v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1" class="fullscreen spinner-overlay">
            <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
        </div>
    </q-page>
</template>
<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import bijlipayAddRemarks from '../../components/crm/bijlipayAddRemarks.vue';
export default {
    name: "bijlipayCrm",
    components: {
        bijlipayAddRemarks,
    },
    data() {
        return {

            propToggleRemarks: false,
            propToggleViewRemarks: false,
            addBasicInformation: {
                remarks: null,
                action: 0
            },

            toggleAjaxLoadFilter: false,
            toggleAjaxLoadFilter1: false,
            activeItemId: 0,
            activeTab: "tab-1",
            filter: "",
            filter1: "",

            paginationControl1: {
                rowsNumber: 5,
                page: 1,
                sortBy: 'createdDate',
                descending: false,
                rowsPerPage: 5
            },
            paginationControl: {
                rowsNumber: 5,
                page: 1,
                sortBy: 'createdDate',
                descending: false,
                rowsPerPage: 5
            },
            formData: {
                date: 0,
            },

            tableAjaxLoading: false,


            dateType: [{
                label: "Today",
                value: 0
            },
            {
                label: "T+1",
                value: 1
            },
            {
                label: "T+2",
                value: 2
            },
            {
                label: "All",
                value: 3
            }
            ],
            activeTab: "tab-1",
            columns: [{
                name: "serviceReqTicketId",
                required: true,
                label: "Ticket No",
                align: "left",
                field: row => {
                    return row.serviceReqTicketId;
                },
                sortable: false
            },
            {
                name: "merchantName",
                required: true,
                label: "Merchant Name",
                align: "left",
                field: "meName",
                sortable: false
            },
            {
                name: "emailId",
                required: true,
                label: "Merchant Email",
                align: "left",
                field: "emailId",
                sortable: false
            },
            {
                name: "contactNumber",
                required: true,
                label: "Merchant No",
                align: "left",
                field: "contactNumber",
                sortable: false
            },
            {
                name: "subTickets",
                required: true,
                label: "Issue Reported",
                align: "left",
                field: row => {
                    let issues = [];
                    if (row.subTicketsList.length > 0) {
                        row.subTicketsList.forEach((element, index) => {
                            if (element.serviceRequestType != null) {
                                issues.push((index + 1) + "." + element.serviceRequestType.name + "   ");
                            }
                        });
                    }
                    return issues.length > 0 ? issues.join(', ') : "NA";
                },
                sortable: false
            },
            {
                name: "createdDate",
                required: true,
                label: "Date",
                align: "left",
                field: "createdDate",
                sortable: true
            },
            {
                name: "Remarks",
                required: true,
                label: "Status",
                align: "left",
                field: row => {
                    let issues = [];
                    if (row.subTicketsList.length > 0) {
                        row.subTicketsList.forEach((element, index) => {
                            if (element.serviceRequestSubTicketStatus != null) {
                                issues.push((index + 1) + "." + element.serviceRequestSubTicketStatus.name + "   ");
                            }
                        });
                    }
                    return issues.length > 0 ? issues.join(', ') : "NA";
                },
                sortable: false
            },
            {
                name: "updateRemarks",
                required: true,
                label: "Remarks",
                align: "left",
                field: "updateRemarks",
                sortable: false
            },
            {
                name: "action",
                required: true,
                label: "Action",
                align: "left",
                field: "action",
                sortable: false
            },

            ],
            columns2: [{
                name: "serviceReqTicketId",
                required: true,
                label: "Ticket No",
                align: "left",
                field: row => {
                    return row.serviceReqTicketId;
                },
                sortable: false
            },
            {
                name: "merchantName",
                required: true,
                label: "Merchant Name",
                align: "left",
                field: "meName",
                sortable: false
            },
            {
                name: "emailId",
                required: true,
                label: "Merchant Email",
                align: "left",
                field: "emailId",
                sortable: false
            },
            {
                name: "contactNumber",
                required: true,
                label: "Merchant Number",
                align: "left",
                field: "contactNumber",
                sortable: false
            },
            {
                name: "name",
                required: true,
                label: "Status Reported",
                align: "left",
                field: row => {
                    let issues = [];
                    if (row.subTicketsList.length > 0) {
                        row.subTicketsList.forEach((element, index) => {
                            if (element.serviceRequestType != null) {
                                issues.push((index + 1) + "." + element.serviceRequestType.name + "   ");
                            }
                        });
                    }
                    return issues.length > 0 ? issues.join(', ') : "NA";
                },
                sortable: false
            },

            {
                name: "updateRemarks",
                required: true,
                label: "Remarks",
                align: "left",
                field: "updateRemarks",
                sortable: false
            },
            {
                name: "createdDate",
                required: true,
                label: "Open Date ",
                align: "left",
                field: "createdDate",
                sortable: true
            },
            {
                name: "updatedDate",
                required: true,
                label: "Closed Date",
                align: "left",
                field: "updatedDate",
                sortable: false
            }],
            tableData: [],
            tableData1: [],
            filterRoles: [],
            error: true,
            warning: false
        };
    },

    computed: {
        ...mapGetters("bijlipayCrm", ["getBijlipayMerchantDetails", "getBijlipayCompletedData", "getBijlipayDate"])
    },
    mounted() {
        this.ajaxLoadAllLeadInfo1({
            pagination: this.paginationControl1,
            filter: this.filter1
        });
    },
    created() {
        this.loadingData({
            pagination: this.paginationControl,
            filter: this.filter,
            date: this.formData.date
        });

    },
    methods: {
        ...mapActions("bijlipayCrm", ["FETCH_BIJLIPAY_PENDING_CRM", "FETCH_BIJLIPAY_COMPLETED_DATA", "BIJLIPAY_CRM_DATE", "ASSIGN_TO_COMPLETE", "ESCALATE_TO_SAT"]),
        ajaxLoadAllLeadInfo() {
            console.log("loading Data with out request");
            this.loadingData({
                pagination: this.paginationControl,
                filter: this.filter,
                date: this.formData.date
            });
        },
        ajaxLoadAllLeadInfo(request) {
            console.log("loading Data with request : ", request);
            let req = {
                pagination: request.pagination,
                filter: request.filter,
                date: this.formData.date
            }
            this.loadingData(req);
        },
        loadingData(request) {
            console.log("CRM DATE ------>", JSON.stringify(request))
            this.$q.loading.show({
                delay: 0,
                spinnerColor: 'purple-9',
                message: 'Fetching data ..'
            });
            this.BIJLIPAY_CRM_DATE(request)
                .then(response => {
                    console.log("Req pagination : ---- :", request.pagination);
                    this.paginationControl = request.pagination;
                    this.paginationControl.rowsNumber = this.getBijlipayDate.totalElements;
                    this.paginationControl.page = this.getBijlipayDate.number + 1;
                    this.tableData = this.getBijlipayDate.content;
                    if (this.getBijlipayDate.sort != null) {
                        this.paginationControl.sortBy = this.getBijlipayDate.sort[0].property;
                        this.paginationControl.descending = this.getBijlipayDate.sort[0].ascending;
                    } 
                    console.log("CRM DATE 2------>", JSON.stringify(request))
                    this.$q.loading.hide();
                })
                .catch(() => {
                    this.$q.loading.hide();
                });
        },
        dateClick(request) {
            console.log("Date click REQ : --- : ", request)
            console.log("Date click : --- : ", this.formData.date)
            this.addBasicInformation.action = request;
            this.loadingData({
                pagination: this.paginationControl,
                filter: this.filter,
                date: request
            });
        },
        fnResolve(request) {
            this.$q.dialog({
                title: "Confirm",
                message: "Are you sure ?",
                ok: "Yes",
                cancel: "Cancel",
            }).then(() => {
                let ticketId = {
                    ticketId: request.serviceReqTicketId,
                    pagination: this.paginationControl,
                    filter: this.filter,
                }
                this.ASSIGN_TO_COMPLETE(ticketId)
                    .then(response => {
                        this.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: "Successfully Resolved!",
                            icon: "thumb_up",
                        })
                        // this.loadingData(this.addBasicInformation.action,
                        // )
                        this.loadingData({
                            pagination: this.paginationControl,
                            filter: this.filter,
                            date: this.addBasicInformation.action,
                        });
                    })
            }).catch(() => {
                this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "No changes made!",
                    icon: "thumb_down",
                });
            });
        },
        fnEscalateToSat(request) {
            this.$q.dialog({
                title: "Confirm",
                message: "Are you sure?",
                ok: "Yes",
                cancel: "Cancel",
            }).then(() => {
                let TicketId = {
                    ticketId: request.serviceReqTicketId
                }
                this.ESCALATE_TO_SAT(TicketId)
                    .then(response => {
                        this.$q.notify({
                            color: "positive",
                            position: "bottom",
                            message: "Escalated To SAT!",
                            icon: "thumb_up",
                        });
                        this.loadingData({
                            pagination: this.paginationControl,
                            filter: this.filter,
                            date: this.addBasicInformation.action,
                        });
                    })
            }).catch(() => {
                this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "No changes made!",
                    icon: "thumb_down",
                });
            });
        },
        goToCompleteTab(tab) {
            if (tab == "tab-2") {
                this.ajaxLoadAllLeadInfo1({
                    pagination: this.paginationControl1,
                    filter: this.filter1
                });
                let request = {
                    pagination: this.paginationControl1,
                    filter: this.filter1,
                };
                this.FETCH_BIJLIPAY_COMPLETED_DATA(request)
                    .then((response) => {
                        this.toggleAjaxLoadFilter1 = false;
                    })
                    .catch((error) => {
                        this.toggleAjaxLoadFilter1 = false;
                    });
            } else {
                this.ajaxLoadAllLeadInfo({
                    pagination: this.paginationControl,
                    filter: this.filter
                });
            }
        },
        ajaxLoadAllLeadInfo1() {
            this.toggleAjaxLoadFilter1 = true;
            this.FETCH_BIJLIPAY_COMPLETED_DATA()
                .then(response => {
                    this.toggleAjaxLoadFilter1 = false;
                })
                .catch(error => {
                    this.toggleAjaxLoadFilter1 = false;
                });
        },
        ajaxLoadAllLeadInfo1({ pagination, filter }) {
            this.$q.loading.show({
                delay: 0,
                spinnerColor: 'purple-9',
                message: 'Fetching data ..'
            });
            this.FETCH_BIJLIPAY_COMPLETED_DATA({ pagination, filter })
                .then(res => {
                    this.paginationControl1 = pagination;
                    this.paginationControl1.rowsNumber = this.getBijlipayCompletedData.totalElements;
                    this.paginationControl1.page = this.getBijlipayCompletedData.number + 1;
                    this.tableData1 = this.getBijlipayCompletedData.content;
                    if (this.getBijlipayCompletedData.sort != null) {
                        this.paginationControl1.sortBy = this.getBijlipayCompletedData.sort[0].property;
                        this.paginationControl1.descending = this.getBijlipayCompletedData.sort[0].ascending;
                    }
                    this.$q.loading.hide();
                })
                .catch(() => {
                    this.$q.loading.hide();
                });
        },
        toggleAddremarks(remarks) {
            this.propToggleRemarks = !this.propToggleRemarks;
            if (remarks != undefined) {
                this.addBasicInformation.remarks = remarks;
                this.addBasicInformation.action = this.formData.date;
            }
        },
    }
};
</script>
<style>
.customTabActive {
    background: purple;
    color: #fff;
}
.custom-green {
  color: #2e7d32; /* A darker green shade */
}
.custom-negative {
  color: #d32f2f; /* Customize this with your preferred shade */
}
</style>
  
