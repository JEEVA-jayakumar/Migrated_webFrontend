<template>
  <q-page>
    <!-- content -->
    <div>
      <div
        class="
          text-h6 q-px-lg q-py-md
          text-weight-regular
          bottom-border
          text-grey-9
        "
      >
        Bijlipay Device Recovery Tracker
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
          <div class="col-md-3 col-sm-6 col-xs-6">
            <q-select
              filter
              clearable
              v-model="formData.assignTo"
              separator
              color="grey-9"
              :options="assignToOptions"
              placeholder="Assign To"
            />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6" align="right">
            <q-btn
              no-caps
              :disabled="
                formData.marsDeviceIdsCooked.length == 0
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
      <q-tab default color="dark" name="unAssigned" slot="title" label="Unassigned" />
        <q-tab color="dark" name="assigned" slot="title" label="Assigned" />
        <q-tab-panel name="assigned">
          <!--START: table Data -->
          <q-table
            :rows="tableData"
            :columns="columnDataAssigned"
            table-class="customTableClass"
            :filter="filterSearch"
            :pagination="paginationControl"
            v-model:selected="formData.marsDeviceIdsCookedUnAssinged"
            row-key="id"
            :loading="tableAjaxLoading"
            :rows-per-page-options="[5,10,15,20]"
            color="dark"
            @request="ajaxLoadAllLeadInfo"
          >
            <!-- selection="multiple" -->
            <q-td
            v-if="props.row.leadInformation != null || props.row.qrLeadInformation != null "
              v-slot:body-cell-leadNumber="props"
              :props="props"
              class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.leadInformation)"
            >
              <span class="label text-primary"
                ># {{ (props.row.leadInformation == null? props.row.qrLeadInformation.qrLeadNumber: props.row.leadInformation.leadNumber) }}</span
              >
            </q-td>
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-submitToMarsDate="props"
              :props="props"
              >{{
               (props.row.leadInformation != null && props.row.leadInformation.submitToMarsDate !=null)?props.row.leadInformation.submitToMarsDate:(props.row.qrLeadInformation != null && props.row.qrLeadInformation.submitMarsDate !=null)?props.row.qrLeadInformation.submitMarsDate:"NA" | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-createdAt="props"
              :props="props"
              >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td
            >
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-deviceAddress="props"
              :props="props"
              class="customTd customCellLength"
            >
              <div>{{ props.row.deviceAddress }}</div>
            </q-td>
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-tid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.tid }}</div>
            </q-td>
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-mid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.mid }}</div>
            </q-td>
            <template slot="top">
              <!--START: table filter,search -->
              <div class="col-md-5">
                <q-input
                  clearable
                  color="grey-9"
                  v-model="filterSearch"
                  placeholder="Type.."
                  float-label="Search By TID, MID, Merchant Name .."
                  class="q-mr-lg q-py-sm"
                />
              </div>
            </template>
          </q-table>
          <!--ENDv-model: table Data -->
        </q-tab-panel>
        <q-tab-panel name="unAssigned">
          <!--START: table Data -->
          <q-table
            :rows="tableData1"
            :columns="columnDataUnassigned"
            table-class="customTableClass"
            :filter="filterSearch1"
            selection="multiple"
            :selected="formData.marsDeviceIdsCooked"
            v-model:pagination="paginationControl1"
            row-key="id"
            :loading="tableAjaxLoading1"
             :rows-per-page-options="[5,10,15,20]"
            color="dark"
            @request="ajaxLoadAllLeadInfo1"
          >
            <q-td
            v-if="props.row.leadInformation != null || props.row.qrLeadInformation != null"
              v-slot:body-cell-leadNumber="props"
              :props="props"
              class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.leadInformation)"
            >
              <span class="label text-primary"
                ># {{ (props.row.leadInformation == null? props.row.qrLeadInformation.qrLeadNumber: props.row.leadInformation.leadNumber) }}</span
              >
            </q-td>
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-submitToMarsDate="props"
              :props="props"
              >{{
                 (props.row.leadInformation != null && props.row.leadInformation.submitToMarsDate !=null)?props.row.leadInformation.submitToMarsDate:(props.row.qrLeadInformation != null && props.row.qrLeadInformation.submitMarsDate !=null)?props.row.qrLeadInformation.submitMarsDate:"NA" | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-createdAt="props"
              :props="props"
              >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td
            >
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-tid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.tid }}</div>
            </q-td>
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-mid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.mid }}</div>
            </q-td>
            <q-td
            v-if="props.row.leadInformation != null|| props.row.qrLeadInformation != null"
              v-slot:body-cell-deviceAddress="props"
              :props="props"
              class="customTd customCellLength"
            >
              <div>
                {{ props.row.deviceAddress }}
              </div>
            </q-td>
            <template slot="top">
              <!--START: table filter,search -->
              <div class="col-md-5">
                <q-input
                  clearable
                  color="grey-9"
                  v-model="filterSearch1"
                  placeholder="Type.."
                  float-label="Search By TID, MID, Merchant Name .."
                  class="q-mr-lg q-py-sm"
                />
              </div>
              <!--END: table filter,search -->
            </template>
          </q-table>
          <!--END: table Data -->
        </q-tab-panel>
      </q-tabs>
      <div class="row items-center gutter-y-sm">
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div class="row items-center"></div>
        </div>
      </div>
      <!-- </q-card> -->
      <!--END: table Footer -->
      <!-- START >> COMPONENT: Update device address  -->
      <!-- END >> COMPONENT: Update device address -->
    </div>
  </q-page>
</template>

<script>
import { required, email, not, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

export default {
  name: "implementationQueue",
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      filterSearch: "",
      filterSearch1: "",
      selectedTab: "assigned",
      assignTo: "",
      assignToOptions: [],
      tableData: [],
      tableData1: [],
      //Defining columns for table
      columnDataAssigned: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: (row) => {
            return (row.leadInformation != null && row.leadInformation.leadNumber !=null )?row.leadInformation.leadNumber:(row.qrLeadInformation != null && row.qrLeadInformation.qrLeadNumber !=null)?row.qrLeadInformation.qrLeadNumber:"NA"
          },
          sortable: false,
        },

        {
          name: "createdAt",
          required: true,
          label: "Date of TID Generation",
          align: "left",
          field: "createdAt",
          sortable: true,
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: (row) => {
            return row.tid;
          },
          sortable: true,
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: (row) => {
            return row.mid;
          },
          sortable: true,
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: (row) => {
            return (row.leadInformation != null && row.leadInformation.leadName !=null )?row.leadInformation.leadName:(row.qrLeadInformation != null && row.qrLeadInformation.merchantName !=null)?row.qrLeadInformation.merchantName:"NA"
          },
          sortable: false,
        },
        {
          name: "mobile_number",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: (row) => {
            return  (row.leadInformation != null && row.leadInformation.contactNumber !=null )?row.leadInformation.contactNumber:(row.qrLeadInformation != null && row.qrLeadInformation.contactNumber !=null)?row.qrLeadInformation.contactNumber:"NA"
          },
          sortable: false,
        },
        {
          name: "deviceAddress",
          required: true,
          label: "Address",
          align: "left",
          field: (row) => {
            return row.deviceAddress;
          },
          sortable: false,
        },
        {
          name: "source",
          required: true,
          label: "Source",
          align: "left",
          field: (row) => {
            // return row.leadInformation.leadSource.sourceName;
            return  (row.leadInformation != null && row.leadInformation.leadSource !=null && row.leadInformation.leadSource.sourceName !=null )?row.leadInformation.leadSource.sourceName:(row.qrLeadInformation != null && row.qrLeadInformation.leadSource !=null && row.qrLeadInformation.leadSource.sourceName !=null)?row.qrLeadInformation.leadSource.sourceName:"NA"
          },
          sortable: false,
        },
        {
          name: "assigned_to",
          required: true,
          label: "Assigned To",
          align: "left",
          field: (row) => {
            return row.recoveredBy == null ? "NA" : row.recoveredBy.name+" | "+row.recoveredBy.employeeID;
          },
          sortable: false,
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: (row) => {
            return (row.leadInformation != null && row.leadInformation.device !=null && row.leadInformation.device.deviceName !=null )?row.leadInformation.device.deviceName:(row.qrLeadInformation != null && row.qrLeadInformation.device !=null && row.qrLeadInformation.device.deviceName !=null)?row.qrLeadInformation.device.deviceName:"NA"
          },
          sortable: false,
        },
        {
          name: "serial_number",
          required: true,
          label: "Serial Number",
          align: "left",
          field: (row) => {
            return row.regionalInventory == null
              ? "NA"
              : row.regionalInventory.serialNumber;
          },

          sortable: true,
        },
        {
          name: "submitToMarsDate",
          required: true,
          label: "Date of Submission",
          align: "left",
          field: (row) => {
            // return row.leadInformation.submitToMarsDate;
            return  (row.leadInformation==null||row.leadInformation.submitToMarsDate==null)?"NA":row.leadInformation.submitToMarsDate || (row.qrLeadInformation==null||row.qrLeadInformation.submitMarsDate==null)? "NA" :row.qrLeadInformation.submitMarsDate | moment("Do MMM Y")
          },
          format: (val) => `${val}|moment("Do MMM Y")`,
          sortable: true,
        },
      ],

      columnDataUnassigned: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: (row) => {
            return  (row.leadInformation != null && row.leadInformation.leadNumber !=null )?row.leadInformation.leadNumber:(row.qrLeadInformation != null && row.qrLeadInformation.qrLeadNumber !=null)?row.qrLeadInformation.qrLeadNumber:"NA"
          },
          sortable: false,
        },

        {
          name: "createdAt",
          required: true,
          label: "Date of TID Generation",
          align: "left",
          field: "createdAt",
          sortable: true,
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: (row) => {
            return row.tid;
          },
          sortable: true,
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: (row) => {
            return row.mid;
          },
          sortable: true,
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: (row) => {
            return(row.leadInformation != null && row.leadInformation.leadName !=null )?row.leadInformation.leadName:(row.qrLeadInformation != null && row.qrLeadInformation.merchantName !=null)?row.qrLeadInformation.merchantName:"NA"
          },
          sortable: false,
        },
        {
          name: "mobile_number",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: (row) => {
             return (row.leadInformation != null && row.leadInformation.contactNumber !=null )?row.leadInformation.contactNumber:(row.qrLeadInformation != null && row.qrLeadInformation.contactNumber !=null)?row.qrLeadInformation.contactNumber:"NA"
          },
          sortable: false,
        },
        {
          name: "deviceAddress",
          required: true,
          label: "Address",
          align: "left",
          field: (row) => {
            return row.deviceAddress;
          },
          sortable: false,
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: (row) => {
           return (row.leadInformation != null && row.leadInformation.device !=null && row.leadInformation.device.deviceName !=null )?row.leadInformation.device.deviceName:(row.qrLeadInformation != null && row.qrLeadInformation.device !=null && row.qrLeadInformation.device.deviceName !=null)?row.qrLeadInformation.device.deviceName:"NA"
          },
          sortable: false,
        },
        {
          name: "serial_number",
          required: true,
          label: "Serial Number",
          align: "left",
          field: (row) => {
            return row.regionalInventory == null
              ? "NA"
              : row.regionalInventory.serialNumber;
          },

          sortable: true,
        },
        {
          name: "source",
          required: true,
          label: "Source",
          align: "left",
          field: (row) => {
            // return row.leadInformation.leadSource.sourceName;
            return  (row.leadInformation != null && row.leadInformation.leadSource !=null && row.leadInformation.leadSource.sourceName !=null )?row.leadInformation.leadSource.sourceName:(row.qrLeadInformation != null && row.qrLeadInformation.leadSource !=null && row.qrLeadInformation.leadSource.sourceName !=null)?row.qrLeadInformation.leadSource.sourceName:"NA"
          },
          sortable: false,
        },
        {
          name: "submitToMarsDate",
          required: true,
          label: "Date of Submission",
          align: "left",
          field: (row) => {
            // return row.leadInformation.submitToMarsDate;
            return  (row.leadInformation==null||row.leadInformation.submitToMarsDate==null)?"NA":row.leadInformation.submitToMarsDate || (row.qrLeadInformation==null||row.qrLeadInformation.submitMarsDate==null)? "NA" :row.qrLeadInformation.submitMarsDate | moment("Do MMM Y")
          },
          format: (val) => `${val}|moment("Do MMM Y")`,
          sortable: true,
        },
      ],

      currentDeviceInfo: {},
      showDeviceAddressModal: false,
      formData: {
        marsDeviceIdsCooked: [],
        marsDeviceIdsCookedUnAssinged: [],
        triggerWelcomeMail: false,
        assignTo: "",
      },
      paginationControl: {
        sortBy: "createdAt", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      paginationControl1: {
        sortBy: "createdAt", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      tableAjaxLoading: false,
      tableAjaxLoading1: false,
    };
  },

  computed: {
    ...mapGetters("DeviceRecovery", [
      "getDeviceRecoveryAssignedList",
      "getDeviceRecoveryUnassignedList",
    ]),
    ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList",
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"]),
  },
  mounted() {
    // this.ajaxLoadAllLeadInfo1({
    //   pagination: this.paginationControl1,
    //   filter: this.filterSearch1,
    // });
    this.getPincodeInformations();
  },
  methods: {
    ...mapActions("DeviceRecovery", [
      "DEVICE_RECOVERY_ASSIGNED_LIST",
      "DEVICE_RECOVERY_UNASSIGNED_LIST",
      "DEVICE_RECOVERY_SUBMIT",
    ]),
    ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_STATES_DATA"]),
    getPincodeInformations() {
      this.FETCH_ALL_STATES_DATA();
    },
    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.DEVICE_RECOVERY_UNASSIGNED_LIST({ pagination, filter })
        .then((res) => {
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getDeviceRecoveryUnassignedList.totalElements;
          this.paginationControl1.page = this.getDeviceRecoveryUnassignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getDeviceRecoveryUnassignedList.content;
          if (this.getDeviceRecoveryUnassignedList.sort != null) {
            console.log("Sort is not null : ---------- : " + JSON.stringify(this.getDeviceRecoveryUnassignedList.sort));
            this.paginationControl1.sortBy = this.getDeviceRecoveryUnassignedList.sort[0].property;
            this.paginationControl1.descending = this.getDeviceRecoveryUnassignedList.sort[0].ascending;
            console.log("Pagination Control modified : -------- : " + JSON.stringify(this.paginationControl1));
          } else {
            console.log("Sort is null : ---------- : ");
            this.paginationControl1.sortBy = "createdAt";
            this.paginationControl1.descending = !this.paginationControl1.descending;
          }
           this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
                let assumeArr = [];
                this.getImplementationExecutiveList.map(function(value) {
                  assumeArr.push({ label: value.name + " | " + value.employeeID+ " | " + value.email, value: value.id });
                });
                this.assignToOptions = assumeArr;
            });

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
        message: "Fetching data ..",
      });
      this.DEVICE_RECOVERY_ASSIGNED_LIST({ pagination, filter })
        .then((res) => {
           this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
                let assumeArr = [];
                this.getImplementationExecutiveList.map(function(value) {
                  assumeArr.push({ label: value.name, value: value.id });
                });
                this.assignToOptions = assumeArr;
            });
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber =
            this.getDeviceRecoveryAssignedList.totalElements;
          this.paginationControl.page =
            this.getDeviceRecoveryAssignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getDeviceRecoveryAssignedList.content;
          if (this.getDeviceRecoveryAssignedList.sort != null) {
            this.paginationControl.sortBy =
              this.getDeviceRecoveryAssignedList.sort[0].property;
            this.paginationControl.descending =
              this.getDeviceRecoveryAssignedList.sort[0].ascending;
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
          filter: this.filterSearch1,
        });
      
      } else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch,
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
          message: "Implementation officer cannot be empty!",
          icon: "thumb_down",
        });
      } else {
        let marsDeviceIdsCooked = [];
        self.formData.marsDeviceIdsCooked.map(function (value) {
          marsDeviceIdsCooked.push(value.id);
        });

        let postValues = {
          // action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
          marsDeviceIds: marsDeviceIdsCooked,
          // triggerWelcomeMail: self.formData.triggerWelcomeMail,
          userId: self.formData.assignTo,
        };
        self
          .DEVICE_RECOVERY_SUBMIT(postValues)
          .then(() => {
            // self.DEVICE_RECOVERY_UNASSIGNED_LIST();
            // self.ajaxLoadAllLeadInfo();
            this.ajaxLoadAllLeadInfo({
              pagination: this.paginationControl,
              filter: this.filterSearch,
            });
            this.ajaxLoadAllLeadInfo1({
              pagination: this.paginationControl1,
              filter: this.filterSearch1,
            });
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
          .DEVICE_RECOVERY_SUBMIT(postValues)
          .then(() => {
            // self.DEVICE_RECOVERY_UNASSIGNED_LIST();
            // self.ajaxLoadAllLeadInfo();
            this.ajaxLoadAllLeadInfo({
              pagination: this.paginationControl,
              filter: this.filterSearch,
            });
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
