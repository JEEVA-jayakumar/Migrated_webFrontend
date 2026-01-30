<template>
  <q-page>
    <!-- content -->
    <div>
      <div
        class="
          q-title q-px-lg q-py-md
          text-weight-regular
          bottom-border
          text-grey-9
        "
      >
        Aggregator Service Request
      </div>
      <!--END: table title -->
      <!--START: table Footer -->
      <q-card class="group q-pa-md" v-if="selectedTab == 'unAssigned'">
        <div class="row items-center gutter-y-sm">
          <div
            class="col-md-3 col-sm-6 col-xs-6 text-grey-7 text-weight-medium"
            align="left"
          >
            <span class="q-display-2">{{
              formData.marsDeviceIdsCooked.length
            }}</span
            >/ selected
          </div>
          <!-- <div class="col-md-3 col-sm-6 col-xs-6" style="flex: 1;  max-width: 200px;" align="right">
            <q-select
              filter
              clearable
              v-model="formData.assignTo.id"
              separator
              color="grey-9"
              :disable="formData.marsDeviceIdsCooked.length == 0 ? true : false"
              :options="assignToOptions"
              placeholder="Assign To"
            />
          </div> -->
          &nbsp;&nbsp;
          <div class="col-md-3 col-sm-6 col-xs-6" style="flex: 1;  max-width: 200px;" align="right">
            <q-select
              filter
              clearable
              v-model="formData.assignTo.region"
              separator
              color="grey-9"
              :disable="formData.marsDeviceIdsCooked.length == 0 ? true : false"
              :options="assignToRegionOptions"
              placeholder="Assign To Region"
            />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6" align="right">
            <q-btn
              no-caps
              :disabled="
              (this.formData.assignTo.region == '' || this.formData.assignTo.region == null)
              "
              label="Assign"
              class="common-dark-blue"
              @click="assignImplementationUser"
            />
          </div>
        </div>
      </q-card>
      <q-card class="group q-pa-md" v-if="selectedTab == 'assigned'">
        <div class="row items-center gutter-y-sm">
          <div class="col-md-9 col-sm-12 col-xs-12">
            <div class="row items-center">
              <div class="col-md-4 col-sm-6 col-xs-6 group"></div>
            </div>
          </div>
        </div>
      </q-card>
      <!--END: table Footer -->
      <q-tabs
        v-model="selectedTab"
        class="shadow-1"
        color="grey-1"
        @select="goToUnassignedTab"
      >
        <q-tab
          default
          color="dark"
          name="unAssigned"
          slot="title"
          label="Opened"
        />
        <q-tab
          color="dark"
          name="assigned"
          slot="title"
          label="Resolved Tickets"
        />
        <q-tab color="dark" name="Ticket" slot="title" label="Ticket Bulk Assign/Reassign" />
        <q-tab-pane name="assigned">
          <!--START: table Data -->
          <q-table
            :data="tableData"
            :columns="columnDataAssigned"
            table-class="customTableClass"
            :filter="filterSearch"
            :pagination.sync="paginationControl"
            :selected.sync="formData.marsDeviceIdsCookedUnAssinged"
            row-key="id"
            :loading="tableAjaxLoading"
            :rows-per-page-options="[5, 10, 15, 20]"
            color="dark"
            @request="ajaxLoadAllLeadInfo"
          >
            <template slot="body" slot-scope="props">
              <!--START: table rows -->
              <q-tr :props="props" class="bottom-border">
                <q-td key="merchant_name" :props="props">
                  {{ props.row.meName }}</q-td
                >
                <q-td key="tid" :props="props"> {{ props.row.tid }}</q-td>
                <q-td key="actionContact" :props="props">
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="blue"
                    size="sm"
                    @click="fnContactDetails(props.row)"
                    >Click to View</q-btn
                  >
                </q-td>
                <q-td key="dateCreated" :props="props">
                  {{ props.row.createdDate | moment("Do MMM Y") }}
                </q-td>
                <q-td key="tat" :props="props">
                  <span :style="getHoursAgoColor(props.row.createdDate)">{{
                    getHoursAgo(props.row.createdDate)
                  }}</span>
                </q-td>
                <q-td key="actionLog" :props="props">
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="blue"
                    size="sm"
                    @click="fnCrmLogsView(props.row)"
                    >Click to View</q-btn
                  >
                </q-td>
                <q-td key="actionClosed" :props="props">
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="negative"
                    size="sm"
                    @click="fnReslovedClose(props.row)"
                    >Closed</q-btn
                  >
                </q-td>
              </q-tr>
            </template>
            <template slot="top">
              <div class="col-md-5">
                <q-search
                  clearable
                  color="grey-9"
                  v-model="filterSearch"
                  placeholder="Type.."
                  float-label="Search By TID ..."
                  class="q-mr-lg q-py-sm"
                />
              </div>
            </template>
          </q-table>
          <!--END: table Data -->
        </q-tab-pane>
        <q-tab-pane name="unAssigned">
          <!--START: table Data -->
          <q-table
            :data="tableData1"
            :columns="columnDataUnassigned"
            table-class="customTableClass"
            :filter="filterSearch1"
            :selected.sync="formData.marsDeviceIdsCooked"
            :pagination.sync="paginationControl1"
            row-key="serviceReqTicketId"
            selection="multiple"
            :loading="tableAjaxLoading1"
            :rows-per-page-options="[5, 10, 15, 20]"
            color="dark"
            @request="ajaxLoadAllLeadInfo1"
          >
     
              <!--START: table rows -->
          
                <q-td
                slot="body-cell-serviceReqTicketId"
                slot-scope="props"
                :props="props"
                class="cursor-pointer">
                  {{ props.row.serviceReqTicketId }}</q-td
                >
              <q-td slot="body-cell-merchant_name"
              slot-scope="props"
              :props="props"
              class="cursor-pointer">
                  {{ props.row.meName }}</q-td
                >
                  <q-td
                slot="body-cell-assignedTo"
                slot-scope="props"
                :props="props"
                class="cursor-pointer">
                  {{ props.row.assignedTo == null ? "NA" : props.row.assignedTo.name }}</q-td
                >
                <q-td slot="body-cell-tid"
                slot-scope="props"
                :props="props"
                class="cursor-pointer"> {{ props.row.tid }}</q-td>
                <q-td slot="body-cell-actionContact"
                slot-scope="props"
                :props="props"
                class="cursor-pointer">
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="blue"
                    size="sm"
                    @click="fnContactDetails(props.row)"
                    >Click to View</q-btn
                  >
                </q-td>
                <q-td slot="body-cell-dateCreated"
                slot-scope="props"
                :props="props"
                class="cursor-pointer">
                  {{ props.row.createdDate | moment("Do MMM Y") }}
                </q-td>
                <q-td slot="body-cell-tat"
                slot-scope="props"
                :props="props"
                class="cursor-pointer">
                  <span :style="getHoursAgoColor(props.row.createdDate)">{{
                    getHoursAgo(props.row.createdDate)
                  }}</span>
                </q-td>
                <q-td  slot="body-cell-actionLog"
                slot-scope="props"
                :props="props">
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="blue"
                    size="sm"
                    @click="fnCrmLogsView(props.row)"
                    >Click to View</q-btn
                  >
                </q-td>
                <q-td
               
                  slot="body-cell-actionPickTickets"
                  slot-scope="props"
                  :props="props"
                  v-if="props.row.serviceRequestTicketStatus == 5"
             
                >
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="positive"
                    size="sm"
                    @click="fnPickTicket(props.row)"
                    >Pick Ticket</q-btn
                  >
                </q-td>
                <q-td
                 
                  slot="body-cell-actionReassign"
                  slot-scope="props"
                  :props="props"
                  v-if="props.row.serviceRequestTicketStatus == 2"
            
                >
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="negative"
                    size="sm"
                    @click="fnReassignTicket(props.row)"
                    >Re-Assign</q-btn
                  >
                </q-td> 
           
       
            <template slot="top">
              <div class="col-md-5">
                <q-search
                  clearable
                  color="grey-9"
                  v-model="filterSearch1"
                  placeholder="Type.."
                  float-label="Search By Ticket ID, TID ..."
                  class="q-mr-lg q-py-sm"
                />
              </div>
            </template>
          </q-table>
          <!--END: table Data -->
        </q-tab-pane>
        <q-tab-pane name="Ticket">
          <ticketAssign />
        </q-tab-pane>
      </q-tabs>
      <div class="row items-center gutter-y-sm">
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div class="row items-center"></div>
        </div>
      </div>
      <pickTicketpopup
        v-if="propShowUpdatePickTicket"
        :propShowUpdatePickTicket="propShowUpdatePickTicket"
        :propRowDetails="propRowDetails"
        @emitfnshowUpdateOpenedExternal="fnPickTicket"
      ></pickTicketpopup>
      <reassignTicketPopup
        v-if="propShowUpdateReassignTicket"
        :propShowUpdateReassignTicket="propShowUpdateReassignTicket"
        :propRowDetails="propRowDetails"
        @emitfnshowUpdateOpenedExternal="fnReassignTicket"
      ></reassignTicketPopup>
      <contactDetailsPopup
        v-if="propShowUpdateContactDetails"
        :propShowUpdateContactDetails="propShowUpdateContactDetails"
        :propRowDetails="propRowDetails"
        @emitfnshowUpdateOpenedExternal="fnContactDetails"
      ></contactDetailsPopup>
      <crmLogsView
        v-if="propShowUpdateCrmLogsView"
        :propShowUpdateCrmLogsView="propShowUpdateCrmLogsView"
        :propRowDetails="propRowDetails"
        @emitfnshowUpdateOpenedExternal="fnCrmLogsView"
      ></crmLogsView>
      <!-- </q-card> -->
      <!--END: table Footer -->
      <!-- START >> COMPONENT: Update device address  -->
      <!-- END >> COMPONENT: Update device address -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import pickTicketpopup from "../../components/sat/pickTicketpopup.vue";
import reassignTicketPopup from "../../components/sat/reassignTicketPopup.vue";
import contactDetailsPopup from "../../components/sat/contactDetailsPopup.vue";
import crmLogsView from "../../components/sat/crmLogsView.vue";
import ticketAssign from 'src/components/sat/ticketAssign.vue';
export default {
  name: "implementationQueue",
  components: {
    pickTicketpopup,
    reassignTicketPopup,
    contactDetailsPopup,
    crmLogsView,
    ticketAssign
  },
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      filterSearch: "",
      filterSearch1: "",
      propShowUpdatePickTicket: false,
      propShowUpdateReassignTicket: false,
      propShowUpdateContactDetails: false,
      propShowUpdateCrmLogsView: false,
      selectedTab: "assigned",
      assignTo: "",
      assignToOptions: [],
      assignToRegionOptions: [],
      externalClosedTableData: [],
      tableData: [],
      tableData1: [],
      //Defining columns for table
      columnDataAssigned: [
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.meName == null ? "NA" : row.meName;
          },
          sortable: false
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: row => {
            return row.tid == null ? "NA" : row.tid;
          },
          sortable: true
        },
        {
          name: "actionContact",
          required: true,
          label: "Contact Details",
          align: "center",
          field: "actionContact",
          sortable: false
        },
        {
          name: "dateCreated",
          required: true,
          label: "Created Date",
          align: "left",
          field: "createdDate",
          sortable: false
        },
        {
          name: "tat",
          required: true,
          label: "TAT",
          align: "left",
          field: "createdDate",
          sortable: false
        },
        {
          name: "actionLog",
          required: true,
          label: "CRM Logs",
          align: "center",
          field: "actionLog",
          sortable: false
        },
        {
          name: "actionClosed",
          required: true,
          label: "Status  ",
          align: "center",
          field: "action",
          sortable: false
        }
      ],

      columnDataUnassigned: [
          
        {
          name: "serviceReqTicketId",
          required: true,
          label: "Ticket ID",
          align: "left",
          field: row => {
            return row.serviceReqTicketId == null
              ? "NA"
              : row.serviceReqTicketId;
          },
          sortable: false
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.meName == null ? "NA" : row.meName;
          },
          sortable: false
        },
          {
          name: "assignedTo",
          required: true,
          label: "Assigned SO",
          align: "left",
          field: row => {
            return row.assignedTo == null
              ? "NA"
              : row.assignedTo.name;
          },
          sortable: false
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: row => {
            return row.tid == null ? "NA" : row.tid;
          },
          sortable: true
        },
        {
          name: "actionContact",
          required: true,
          label: "Contact Details",
          align: "center",
          field: "actionContact",
          sortable: false
        },
        {
          name: "dateCreated",
          required: true,
          label: "Created Date",
          align: "left",
          field: "createdDate",
          sortable: false
        },
        {
          name: "tat",
          required: true,
          label: "TAT",
          align: "left",
          field: "createdDate",
          sortable: false
        },
        {
          name: "actionLog",
          required: true,
          label: "CRM Logs",
          align: "center",
          field: "actionLog",
          sortable: false
        },
        {
          name: "actionPickTickets",
          required: true,
          label: "Action Bar",
          align: "center",
          field: "action",
          sortable: false
        },
        {
          name: "actionReassign",
          required: true,
          label: "",
          align: "center",
          field: "action",
          sortable: false
        }
      ],

      currentDeviceInfo: {},
      showDeviceAddressModal: false,
      formData: {
        marsDeviceIdsCooked: [],
        marsDeviceIdsCookedUnAssinged: [],
        triggerWelcomeMail: false,
        assignTo: {
          id: "",
          region:"",
        },
      
      },
      paginationControl: {
        sortBy: "createdDate", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      paginationControl1: {
        sortBy: "createdDate", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      tableAjaxLoading: false,
      tableAjaxLoading1: false
    };
  },

  computed: {
    ...mapGetters("DeviceRecovery", [
      "getDeviceRecoveryAssignedList",
      "getDeviceRecoveryUnassignedList"
    ]),
    ...mapGetters("serviceRequestPhonepeSat", [
      "getphonepeOpenedTickets",
      "getphonepeResolvedTickets"
    ]),
    ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList"
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"])
  },
  mounted() {
    this.getPincodeInformations();
    this.fnAjaxGetAllRegionList();
    this.implementationExecutiveList()
  },
  methods: {
    ...mapActions("DeviceRecovery", [
      "DEVICE_RECOVERY_ASSIGNED_LIST",
      "DEVICE_RECOVERY_UNASSIGNED_LIST",
      "DEVICE_RECOVERY_SUBMIT"
    ]),
    ...mapActions("serviceRequestPhonepeSat", [
      "FETCH_PHONEPE_OPENED_TICKETS",
      "FETCH_PHONEPE_RESOLVED_TICKET",
      "PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE",
      "PHONEPE_SERVICE_REQUEST_TO_ASSIGNED_REGION",
      "PHONEPE_PICKUP_TICKET_ASSIGNED",
      "PHONEPE_REASSIGNED_MERCHANT_TICKETS"
    ]),
    ...mapActions('generateQR', ['FETCH_REGION_LIST']),

    ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_STATES_DATA"]),
    getPincodeInformations() {
      this.FETCH_ALL_STATES_DATA();
    },
    
    fnPickTicket(rowDetails) {
      this.propShowUpdatePickTicket = !this.propShowUpdatePickTicket;
      this.ajaxLoadAllLeadInfo1({
        pagination: this.paginationControl1,
        filter: this.filterSearch1
      });
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    fnReassignTicket(rowDetails) {
      this.propShowUpdateReassignTicket = !this.propShowUpdateReassignTicket;
      this.ajaxLoadAllLeadInfo1({
        pagination: this.paginationControl1,
        filter: this.filterSearch1
      });
      // eslint-disable-next-line eqeqeq
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    fnContactDetails(rowDetails) {
      this.propShowUpdateContactDetails = !this.propShowUpdateContactDetails;
      this.ajaxLoadAllLeadInfo1({
        pagination: this.paginationControl1,
        filter: this.filterSearch1
      });
      // eslint-disable-next-line eqeqeq
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    assignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCooked.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to assign",
          icon: "thumb_down"
        });
      } 
      else if (self.formData.assignTo == "") {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Request Mode cannot be empty!",
          icon: "thumb_down"
        });
      } 
      // else if (
      //   self.formData.serviceRequestMode == "Direct Dispatch" &&
      //   self.formData.podNumber == null
      // ) {
      //   self.$q.notify({
      //     color: "negative",
      //     position: "bottom",
      //     message: "Pod Number cannot be empty!",
      //     icon: "thumb_down"
      //   });
      // } 
 
      else if(self.formData.assignTo.region != null && (self.formData.assignTo.id == null || self.formData.assignTo.id == '')){
           this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        let marsDeviceIdsCooked = [];
        self.formData.marsDeviceIdsCooked.map(function(value, index) {
          marsDeviceIdsCooked.push({
            serviceReqTicketId: value.serviceReqTicketId,
            bpRegion: {
              regionAreaName: self.formData.assignTo.region
            }
          })
        });
        self
          .PHONEPE_SERVICE_REQUEST_TO_ASSIGNED_REGION(marsDeviceIdsCooked)
          .then(res => {
            if (res.status == 200) {
              this.formData.marsDeviceIdsCooked = [];
              this.formData.assignTo = "";
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: res.body.data,
                icon: "thumb_up"
              });
              this.$q.loading.hide();
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl,
                filter: this.filterSearch
              });
            } 
            else {
              self.$q.notify({
                color: "negative",
                position: "bottom",
                message: res.body.data,
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            }
          })

          .catch((error) => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.data,
              icon: "thumb_down"
            });
            this.$q.loading.hide();
          });

      }
      else if (self.formData.assignTo.id != null && self.formData.region != null) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select Only One Request mode",
          icon: "thumb_down"
        });
      } 
      else{
         self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select Any One Request mode",
          icon: "thumb_down"
        });
      }
        // else {
        // this.$q.loading.show({
        //   delay: 100, // ms
        //   spinnerColor: "purple-9",
        //   message: "Please wait.."
        // });
        // let marsDeviceIdsCooked = [];
        // self.formData.marsDeviceIdsCooked.map(function(value) {
        //   value.podNumber = self.formData.podNumber;
        //   value.serviceRequestMode = self.formData.serviceRequestMode;
        //   // value.assignedTo = self.formData.assignTo.id;
        //   marsDeviceIdsCooked.push(value);
        // });
        // let postValues = {
        //   // action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
        //   request: marsDeviceIdsCooked,
        //   // triggerWelcomeMail: self.formData.triggerWelcomeMail,
        //   userId: self.formData.assignTo.id
        // };
        // self
        //   .PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE(postValues)
        //   .then(res => {
        //     if (res.status == 200 && res.data.data.serviceRequest != null) {
        //       this.formData.marsDeviceIdsCooked = [];
        //       this.formData.assignTo = "";
        //       this.$q.notify({
        //         color: "positive",
        //         position: "bottom",
        //         message: "Successfully assigned!",
        //         icon: "thumb_up"
        //       });
        //       this.$q.loading.hide();
        //       this.ajaxLoadAllLeadInfo1({
        //         pagination: this.paginationControl,
        //         filter: this.filterSearch
        //       });
        //     } else if (res.status == 200 && res.data.data.Success != null) {
        //       this.formData.marsDeviceIdsCooked = [];
        //       this.formData.assignTo = "";
        //       this.$q.notify({
        //         color: "positive",
        //         position: "bottom",
        //         message: "Successfully assigned!",
        //         icon: "thumb_up"
        //       });
        //       this.$q.loading.hide();
        //       this.ajaxLoadAllLeadInfo1({
        //         pagination: this.paginationControl,
        //         filter: this.filterSearch
        //       });
        //     } else if (res.status == 200 && res.data.data.Failed != null) {
        //       this.$router.push({
        //         name: "externalServiceAddressFetch",
        //         params: { data: res }
        //       });
        //     } else {
        //       self.$q.notify({
        //         color: "negative",
        //         position: "bottom",
        //         message: "INTERNAL SERVER ERROR !!",
        //         icon: "thumb_down"
        //       });
        //       this.$q.loading.hide();
        //     }
        //   })

        //   .catch(() => {
        //     self.$q.notify({
        //       color: "negative",
        //       position: "bottom",
        //       message: "Please try again",
        //       icon: "thumb_down"
        //     });
        //     this.$q.loading.hide();
        //   });
      // }
    },


    fnAjaxGetAllRegionList() {
      this.FETCH_REGION_LIST()
        .then(res => {
          let Region = res.data.data
          let assumeArr = []
          Region.map(function (value) {
            assumeArr.push({
              label: value.regionAreaName,
              value: value.regionAreaName
            })
          })
          this.assignToRegionOptions = assumeArr
        })
        .catch(() => {
          this.assignToRegionOptions = []
        })
    },
    fnCrmLogsView(rowDetails) {
      this.propShowUpdateCrmLogsView = !this.propShowUpdateCrmLogsView;
      this.ajaxLoadAllLeadInfo1({
        pagination: this.paginationControl1,
        filter: this.filterSearch1
      });
      // eslint-disable-next-line eqeqeq
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    implementationExecutiveList() {
      this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
        let assumeArr = [];
        this.getImplementationExecutiveList.map(function(value) {
          assumeArr.push({
            label: value.name + " | " + value.employeeID + " | " + value.email,
            value: value.id
          });
        });
        this.assignToOptions = assumeArr;
      });
    },
    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_PHONEPE_OPENED_TICKETS({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getphonepeOpenedTickets.totalElements;
          this.paginationControl1.page =
            this.getphonepeOpenedTickets.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getphonepeOpenedTickets.content;
          this.externalClosedTableData = this.tableData1.filter(
            service => service.source == true
          );
          if (this.getphonepeOpenedTickets.sort != null) {
            this.paginationControl1.sortBy = this.getphonepeOpenedTickets.sort[0].property;
            this.paginationControl1.descending = this.getphonepeOpenedTickets.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_PHONEPE_RESOLVED_TICKET({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getphonepeResolvedTickets.totalElements;
          this.paginationControl.page =
            this.getphonepeResolvedTickets.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getphonepeResolvedTickets.content;
          this.externalClosedTableData = this.tableData.filter(
            service => service.source == true
          );
          if (this.getphonepeResolvedTickets.sort != null) {
            this.paginationControl.sortBy = this.getphonepeResolvedTickets.sort[0].property;
            this.paginationControl.descending = this.getphonepeResolvedTickets.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    //Load all short lead info while page loading
    goToUnassignedTab(tab) {
      if (tab == "unAssigned") {
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filterSearch1
        });
      } else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch
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
            state: currentDeviceInfo.state
          }
        };
        this.currentDeviceInfo = assumeObj;
      } else {
        let marsDeviceIdsCooked = [];
        this.formData.marsDeviceIdsCooked.map(function(value) {
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
            state: currentDeviceInfo.state
          }
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
    // assignImplementationUser() {
    //   let self = this;
    //   if (self.formData.marsDeviceIdsCooked.length == 0) {
    //     self.$q.notify({
    //       color: "negative",
    //       position: "bottom",
    //       message: "Select atleast one item to assign",
    //       icon: "thumb_down"
    //     });
    //   } else if (self.formData.assignTo == "") {
    //     self.$q.notify({
    //       color: "negative",
    //       position: "bottom",
    //       message: "Implementation officer cannot be empty!",
    //       icon: "thumb_down"
    //     });
    //   } else {
    //     let marsDeviceIdsCooked = [];
    //     self.formData.marsDeviceIdsCooked.map(function(value) {
    //       marsDeviceIdsCooked.push(value.id);
    //     });

    //     let postValues = {
    //       // action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
    //       marsDeviceIds: marsDeviceIdsCooked,
    //       // triggerWelcomeMail: self.formData.triggerWelcomeMail,
    //       userId: self.formData.assignTo
    //     };
    //     self
    //       .DEVICE_RECOVERY_SUBMIT(postValues)
    //       .then(() => {
    //         // self.DEVICE_RECOVERY_UNASSIGNED_LIST();
    //         // self.ajaxLoadAllLeadInfo();
    //         this.ajaxLoadAllLeadInfo({
    //           pagination: this.paginationControl,
    //           filter: this.filterSearch
    //         });
    //         this.ajaxLoadAllLeadInfo1({
    //           pagination: this.paginationControl1,
    //           filter: this.filterSearch1
    //         });
    //         self.formData.marsDeviceIdsCooked = [];
    //         self.formData.assignTo = "";
    //         self.$q.notify({
    //           color: "positive",
    //           position: "bottom",
    //           message: "Successfully assigned!",
    //           icon: "thumb_up"
    //         });
    //       })
    //       .catch(() => {
    //         self.$q.notify({
    //           color: "negative",
    //           position: "bottom",
    //           message: "Please try again",
    //           icon: "thumb_down"
    //         });
    //       });
    //   }
    // },

    // Function to unAssignImplementationUser in implementation queue
    unAssignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCookedUnAssinged.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to Unassign",
          icon: "thumb_down"
        });
      } else {
        let marsDeviceIdsCookedUnAssinged = [];
        self.formData.marsDeviceIdsCookedUnAssinged.map(function(value) {
          marsDeviceIdsCookedUnAssinged.push(value.id);
        });

        let postValues = {
          action: this.$MARS_DEVICE_STATUS_TID_GENERATED,
          marsDeviceIds: marsDeviceIdsCookedUnAssinged,
          userId: this.$SEND_ZERO_FOR_UNASSIGING
        };
        self
          .DEVICE_RECOVERY_SUBMIT(postValues)
          .then(() => {
            // self.DEVICE_RECOVERY_UNASSIGNED_LIST();
            // self.ajaxLoadAllLeadInfo();
            this.ajaxLoadAllLeadInfo({
              pagination: this.paginationControl,
              filter: this.filterSearch
            });
            self.formData.marsDeviceIdsCookedUnAssinged = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Unassigned!",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
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
          icon: "thumb_down"
        });
      } else if (self.formData.assignTo == "") {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Implementation officer cannot be empty!",
          icon: "thumb_down"
        });
      } else {
        let marsDeviceIdsCookedUnAssinged = [];
        self.formData.marsDeviceIdsCookedUnAssinged.map(function(value) {
          marsDeviceIdsCookedUnAssinged.push(value.id);
        });

        let postValues = {
          action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
          marsDeviceIds: marsDeviceIdsCookedUnAssinged,
          triggerWelcomeMail: self.formData.triggerWelcomeMail,
          userId: self.formData.assignTo
        };
        self
          .DEVICE_RECOVERY_SUBMIT(postValues)
          .then(() => {
            self.DEVICE_RECOVERY_UNASSIGNED_LIST();
            self.ajaxLoadAllLeadInfo();
            self.formData.marsDeviceIdsCookedUnAssinged = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully re assigned !",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
          });
      }
    },

    getHoursAgo(dateInMilliseconds) {
      // Get the current date and time in milliseconds
      const currentTime = Date.now();

      // Calculate the difference in milliseconds
      const differenceInMilliseconds = currentTime - dateInMilliseconds;

      // Convert milliseconds to hours
      const hoursAgo = differenceInMilliseconds / (1000 * 60 * 60);

      return 72 - Math.floor(hoursAgo); // Round down to the nearest whole hour

      console.log(72 - getHoursAgo(dateInMilliseconds));
    },

    getHoursAgoColor(dateInMilliseconds) {
      const currentTime = Date.now();

      // Calculate the difference in milliseconds
      const differenceInMilliseconds = currentTime - dateInMilliseconds;

      // Convert milliseconds to hours
      const hoursAgo = differenceInMilliseconds / (1000 * 60 * 60);

      const colorData = 72 - Math.floor(hoursAgo);

      // Round down to the nearest whole hour
      if (colorData > 0) {
        console.log("COOR DATA>>", colorData);
        return "color: green; font-weight: bold;";
      } else if (colorData < 0) {
        console.log("COOR DATA<<<", colorData);
        return "color: red; font-weight: bold;";
      } else {
        return "color: gray; font-weight: normal;";
      }
    },

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    }
  }
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
