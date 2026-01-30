<template>
  <q-page>
    <!-- content -->
    <div
      class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
    >
      Bijlipay Implementation Queue
    </div>
    <div>
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!--START: table title -->
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
              :disable="formData.marsDeviceIdsCooked.length == 0 ? true : false"
              :options="assignToOptions"
              placeholder="Assign To"
            />
            <q-checkbox
              v-model="formData.courier"
              color="dark"
              label="Courier Device"
            />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6" align="right">
            <q-checkbox
              v-model="formData.triggerWelcomeMail"
              color="dark"
              label="Trigger welcome email"
            />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6 agnalgin" align="right">
            <q-btn
              no-caps
              :disabled="
                formData.marsDeviceIdsCooked.length == 0 ? true : false
              "
              label="Assign"
              class="common-dark-blue agnalgin1"
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
          label="Unassigned"
        />
        <q-tab color="dark" name="assigned" slot="title" label="Assigned" />
        <!-- <q-tab 
          color="dark"
          name="canceled"
          slot="title"
          label="CANCELED MERCHANTS"
        /> -->
        <q-tab-pane name="assigned">
          <assigned />
        </q-tab-pane>
        <q-tab-pane name="unAssigned">
          <!--START: table Data   :data="getImplementationQueueUnassignedList"  -->
          <q-table
            :data="tableData1"
            :columns="columnDataUnassigned"
            table-class="customTableClass"
            :filter="filterSearch"
            selection="multiple"
            :selected.sync="formData.marsDeviceIdsCooked"
            :pagination.sync="paginationControl1"
            row-key="id"
            :rows-per-page-options="[10, 20, 50, 100, 150, 200]"
            :loading="tableAjaxLoading1"
            color="dark"
            @request="ajaxLoadAllLeadInfo1"
          >
            <q-td
              slot="body-cell-leadNumber"
              slot-scope="props"
              :props="props"
              class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.leadInformation)"
            >
              <span class="label text-primary"
                ># {{ props.row.leadInformation.leadNumber }}</span
              >
            </q-td>
            <q-td slot="body-cell-LeadSource" slot-scope="props" :props="props">
              <span
                :class="{
                  'text-red':
                    props.row.leadInformation.leadSource.sourceName ===
                    'LS_TOHANDS'
                }"
              >
                {{ props.row.leadInformation.leadSource.sourceName }}
              </span>
            </q-td>

            <q-td
              slot="body-cell-submitToMarsDate"
              slot-scope="props"
              :props="props"
              >{{
                props.row.leadInformation.submitToMarsDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              slot="body-cell-createdAt"
              slot-scope="props"
              :props="props"
              >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td
            >
            <!-- <q-td
              slot="body-cell-tid"
              slot-scope="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.tid }}</div>
            </q-td> -->
            <q-td
              slot="body-cell-mid"
              slot-scope="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.mid }}</div>
            </q-td>
            <q-td
              slot="body-cell-deviceAddress"
              slot-scope="props"
              :props="props"
              class="customTd customCellLength"
            >
              <div>
                <q-btn
                  no-caps
                  icon="edit"
                  color="purple-9"
                  size="xs"
                  round
                  @click="UpdateDeviceAddress(props.row)"
                />
                {{ props.row.deviceAddress }}
              </div>
            </q-td>
            <template slot="top" slot-scope="props">
              <!--START: table filter,search -->
              <div class="col-md-5">
                <q-search
                  clearable
                  color="grey-9"
                  v-model="filterSearch"
                  placeholder="Type.."
                  float-label="Search By MID, Merchant Name.."
                  class="q-mr-lg q-py-sm"
                />
              </div>
            </template>
          </q-table>
          <!--END: table Data -->
        </q-tab-pane>
      </q-tabs>

      <!--END: table Footer -->
      <!-- START >> COMPONENT: Update device address  -->
      <DeviceAddressModal
        v-if="showDeviceAddressModal"
        :showDeviceAddressModal="showDeviceAddressModal"
        :currentDeviceInfo.sync="currentDeviceInfo"
        :stateInformation="getAllStatesData"
        :paginationControl="paginationControl"
        :selectedLeadItems="formData.marsDeviceIdsCooked"
        @toggleModal="UpdateDeviceAddressAfterEmit"
      />
      <!-- END >> COMPONENT: Update device address -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DeviceAddressModal from "../../components/sat/DeviceAddressModal.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
import assigned from "../../components/sat/assigned.vue";

export default {
  name: "implementationQueue",
  components: {
    DeviceAddressModal,
    generalLeadInformation,
    assigned
  },
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
          field: row => {
            return row.leadInformation.leadNumber;
          },
          sortable: false
        },

        {
          name: "createdAt",
          required: true,
          label: "Date of TID Generation",
          align: "left",
          field: "createdAt",
          sortable: true
        },
        // {
        //   name: "tid",
        //   required: true,
        //   label: "TID",
        //   align: "left",
        //   field: row => {
        //     return row.tid;
        //   },
        //   sortable: true
        // },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: row => {
            return row.mid;
          },
          sortable: true
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.leadInformation.leadName;
          },
          sortable: false
        },
        {
          name: "mobile_number",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: row => {
            return row.leadInformation.contactNumber;
          },
          sortable: false
        },
        {
          name: "deviceAddress",
          required: true,
          label: "Address",
          align: "left",
          field: row => {
            return row.deviceAddress;
          },
          sortable: false
        },
        // {
        //   name: "source",
        //   required: true,
        //   label: "Source",
        //   align: "left",
        //   field: row => {
        //     return row.leadInformation.leadSource.sourceName;
        //   },
        //   sortable: false
        // },
        {
          name: "assigned_to",
          required: true,
          label: "Assigned To",
          align: "left",
          field: row => {
            return row.assignedTo == null ? "NA" : row.assignedTo.name;
          },
          sortable: false
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            return row.leadInformation.device.deviceName;
          },
          sortable: false
        },
        {
          name: "serial_number",
          required: true,
          label: "Serial Number",
          align: "left",
          field: row => {
            return row.regionalInventory == null
              ? "NA"
              : row.regionalInventory.serialNumber;
          },

          sortable: true
        },
        {
          name: "submitToMarsDate",
          required: true,
          label: "Date of Submission",
          align: "left",
          field: row => {
            return row.leadInformation.submitToMarsDate;
          },
          format: val => `${val}|moment("Do MMM Y")`,
          sortable: true
        }
      ],

      columnDataUnassigned: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: row => {
            return row.leadInformation.leadNumber;
          },
          sortable: false
        },
{
          name: "LeadSource",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            return row.leadInformation.LeadSource.sourceName;
          },
          sortable: false
        },
        {
          name: "createdAt",
          required: true,
          label: "Date of TID Generation",
          align: "left",
          field: "createdAt",
          sortable: true
        },
        // {
        //   name: "tid",
        //   required: true,
        //   label: "TID",
        //   align: "left",
        //   field: row => {
        //     return row.tid;
        //   },
        //   sortable: true
        // },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: row => {
            return row.mid;
          },
          sortable: true
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.leadInformation.leadName;
          },
          sortable: false
        },
        {
          name: "mobile_number",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: row => {
            return row.leadInformation.contactNumber;
          },
          sortable: false
        },
        {
          name: "deviceAddress",
          required: true,
          label: "Address",
          align: "left",
          field: row => {
            return row.deviceAddress;
          },
          sortable: false
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            return row.leadInformation.device.deviceName;
          },
          sortable: false
        },
        {
          name: "serial_number",
          required: true,
          label: "Serial Number",
          align: "left",
          field: row => {
            return row.regionalInventory == null
              ? "NA"
              : row.regionalInventory.serialNumber;
          },

          sortable: true
        },
        {
          name: "submitToMarsDate",
          required: true,
          label: "Date of Submission",
          align: "left",
          field: row => {
            return row.leadInformation.submitToMarsDate;
          },
          format: val => `${val}|moment("Do MMM Y")`,
          sortable: true
        }
      ],

      currentDeviceInfo: {},
      showDeviceAddressModal: false,
      formData: {
        marsDeviceIdsCooked: [],
        marsDeviceIdsCookedUnAssinged: [],
        triggerWelcomeMail: false,
        courier: false,
        assignTo: ""
      },
      paginationControl: {
        sortBy: "deviceStatusDate", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      paginationControl1: {
        sortBy: "deviceStatusDate", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      tableAjaxLoading: false,
      tableAjaxLoading1: false
    };
  },

  computed: {
    ...mapGetters("ImplementationQueue", [
      "getImplementationQueueAssignedList",
      "getImplementationQueueUnassignedList",
      "getImplementationQueueAssignedDataList"
    ]),
    ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList"
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"])
  },
  created() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filterSearch
    });
    this.ajaxLoadAllLeadInfo1({
      pagination: this.paginationControl1,
      filter: this.filterSearch1
    });
    this.getPincodeInformations();
  },
  methods: {
    ...mapActions("ImplementationQueue", [
      "IMPLEMENTATION_QUEUE_ASSIGNED_LIST",
      "IMPLEMENTATION_QUEUE_UNASSIGNED_LIST",
      "IMPLEMENTATION_QUEUE_SUBMIT"
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
        message: "Fetching data .."
      });
      this.IMPLEMENTATION_QUEUE_UNASSIGNED_LIST({ pagination, filter })
        .then(res => {
          this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
            let assumeArr = [];
            this.getImplementationExecutiveList.map(function(value) {
              assumeArr.push({
                label:
                  value.name + " | " + value.employeeID + " | " + value.email,
                value: value.id
              });
            });
            this.assignToOptions = assumeArr;
          });
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getImplementationQueueUnassignedList.totalElements;
          this.paginationControl1.page =
            this.getImplementationQueueUnassignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getImplementationQueueUnassignedList.content;
          if (this.getImplementationQueueUnassignedList.sort != null) {
            this.paginationControl1.sortBy = this.getImplementationQueueUnassignedList.sort[0].property;
            this.paginationControl1.descending = this.getImplementationQueueUnassignedList.sort[0].ascending;
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
      this.IMPLEMENTATION_QUEUE_ASSIGNED_LIST({ pagination, filter })
        .then(response => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getImplementationQueueAssignedList.totalElements;
          this.paginationControl.page =
            this.getImplementationQueueAssignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getImplementationQueueAssignedList.content;
          if (this.getImplementationQueueAssignedList.sort != null) {
            this.paginationControl.sortBy = this.getImplementationQueueAssignedList.sort[0].property;
            this.paginationControl.descending = this.getImplementationQueueAssignedList.sort[0].ascending;
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
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
        this.formData.marsDeviceIdsCooked = [];
        this.formData.assignTo = "";
        this.filterSearch = "";
        // this.formData.courier = "";
      } else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
        this.formData.marsDeviceIdsCooked = [];
        this.formData.assignTo = "";
        this.filterSearch = "";
        // this.formData.courier = "";
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
    assignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCooked.length == 0) {
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
        let marsDeviceIdsCooked = [];
        self.formData.marsDeviceIdsCooked.map(function(value) {
          marsDeviceIdsCooked.push(value.id);
        });
        let postValues = {
          action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
          marsDeviceIds: marsDeviceIdsCooked,
          triggerWelcomeMail: self.formData.triggerWelcomeMail,
          courier: self.formData.courier,
          userId: self.formData.assignTo
        };
        this.IMPLEMENTATION_QUEUE_SUBMIT(postValues)
          .then(res => {
            if (res.status == 200 && res.data.data == null) {
              this.formData.marsDeviceIdsCooked = [];
              this.formData.assignTo = "";
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully assigned!",
                icon: "thumb_up"
              });
              this.filterSearch = "";
              this.formData.courier = "";
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl,
                filter: this.filterSearch
              });
            } else if (res.status == 200 && res.data.data.second[0].Success) {
              //  this.$router.push({name: "internalimplementationAddressFetch", params: {data:res}})
              this.formData.marsDeviceIdsCooked = [];
              this.formData.assignTo = "";
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully assigned!",
                icon: "thumb_up"
              });
              this.filterSearch = "";
              this.formData.courier = "";
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl,
                filter: this.filterSearch
              });
            } else if (res.status == 200 && res.data.data.second[0].Failed) {
              this.$router.push({
                name: "internalimplementationAddressFetch",
                params: { data: res }
              });
            } else {
              self.$q.notify({
                color: "negative",
                position: "bottom",
                message: "INTERNAL SERVER ERROR !!",
                icon: "thumb_down"
              });
            }
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
          .IMPLEMENTATION_QUEUE_SUBMIT(postValues)
          .then(() => {
            // self.DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST();
            // self.ajaxLoadAllLeadInfo()
            self.formData.marsDeviceIdsCookedUnAssinged = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Unassigned!",
              icon: "thumb_up"
            });
            this.ajaxLoadAllLeadInfo({
              pagination: this.paginationControl,
              filter: this.filterSearch
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

    // Function to reAssignImplementationUser in implementation queue
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
          .IMPLEMENTATION_QUEUE_SUBMIT(postValues)
          .then(() => {
            // self.IMPLEMENTATION_QUEUE_UNASSIGNED_LIST();
            self.formData.marsDeviceIdsCookedUnAssinged = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Re-assigned !",
              icon: "thumb_up"
            });
            this.ajaxLoadAllLeadInfo({
              pagination: this.paginationControl,
              filter: this.filterSearch
            });
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again !",
              icon: "thumb_down"
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
.size3 {
  margin-left: 50px;
}
.agnalgin {
  margin-left: -90px;
}
.agnalgin1 {
  width: 90px;
}
</style>
