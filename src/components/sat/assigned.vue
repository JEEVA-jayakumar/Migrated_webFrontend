<template>
  <q-page>
    <!-- content -->
    <div>
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!-- <pre>{{getImplementationExecutiveList}}</pre> -->
      <!--START: table title -->
      <!-- <div
        class="text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
        Implementation Queues
      </div> -->
      <!--END: table title -->
      <!--START: table Footer -->
      <!-- <q-card class="group q-pa-md" v-if="selectedTab == 'unAssigned'">
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
              v-model="formData.assignTo"
              separator
              color="grey-9"
              :options="assignToOptions"
              placeholder="Assign To"
            />
             <q-checkbox
              v-model="formData.courierDevice"
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
      </q-card> -->
      <q-card class="group q-pa-md" v-if="selectedTab == 'assigned'">
        <div class="row items-center gutter-y-sm">
          <div
            class="col-md-3 col-sm-12 col-xs-12 text-grey-7 text-weight-medium q-px-md"
            align="left"
          >
            <span class="q-display-2">{{
              formData.marsDeviceIdsCookedUnAssinged.length
            }}</span
            >/ selected
          </div>
          <div class="col-md-9 col-sm-12 col-xs-12">
            <div class="row items-center">
              <div class="col-md-4 col-sm-6 col-xs-6">
                <q-select
                  filter
                  clearable
                  v-model="formData.assignTo"
                  separator
                  color="grey-9"
                  :disable="formData.marsDeviceIdsCookedUnAssinged.length == 0 "
                  :options="assignToOptions"
                  placeholder="Assign To"
                />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-6">
                <q-checkbox
                  v-model="formData.triggerWelcomeMail"
                  color="dark"
                  label="Trigger welcome email"
                />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-6 group">
                <div>
                  <q-btn
                    no-caps
                    :disable="formData.marsDeviceIdsCookedUnAssinged.length == 0  || this.formData.assignTo == ''"
                    label="Re-Assign"
                    class="common-dark-blue"
                    @click="reAssignImplementationUser"
                  />
                </div>
                <div>
                  <q-btn
                    no-caps
                    :disabled="
                      formData.marsDeviceIdsCookedUnAssinged.length == 0

                    "
                    label="Un-Assign"
                    class="common-dark-blue"
                    @click="unAssignImplementationUser"
                  />
                </div>
              </div>
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
          name="assigned"
          slot="title"
          label="Normal"
        />
        <q-tab color="dark" name="courier" slot="title" label="Courier" />
        <q-tab-panel name="assigned">
          <q-table
            :rows="tableData"
            :columns="columnDataAssigned"
            table-class="customTableClass"
            :filter="filterSearch"
            :pagination="paginationControl"
            selection="multiple"
            v-model:selected="formData.marsDeviceIdsCookedUnAssinged"
            row-key="id"
            :loading="tableAjaxLoading"
            :rows-per-page-options="[10, 20, 50, 100, 150, 200]"
            color="dark"
            @request="ajaxLoadAllLeadInfo"
          >
            <q-td
              v-slot:body-cell-leadNumber="props"
              :props="props"
              class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.leadInformation)"
            >
              <span class="label text-primary"
                ># {{ props.row.leadInformation.leadNumber }}</span
              >
            </q-td>
            <q-td v-slot:body-cell-LeadSource="props" :props="props">
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
              v-slot:body-cell-createdAt="props"
              :props="props"
              >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td
            >
            <q-td
              v-slot:body-cell-mid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.mid }}</div>
            </q-td>

            <q-td
              v-slot:body-cell-deviceAddress="props"
              :props="props"
              class="customTd customCellLength"
            >
              <div>{{ props.row.deviceAddress }}</div>
            </q-td>
            <!-- <q-td
              v-slot:body-cell-tid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.tid }}</div>
            </q-td> -->
            <q-td
              v-slot:body-cell-submitToMarsDate="props"
              :props="props"
              >{{
                props.row.leadInformation.submitToMarsDate | moment("Do MMM Y")
              }}</q-td
            >

            <template v-slot:top="props">
              <div class="col-md-5">
                <q-input
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
        </q-tab-panel>
        <q-tab-panel name="courier">
          <!--STARTv-model: table Data   :rows="getImplementationQueueUnassignedList" selection="multiple"
            :selected="formData.marsDeviceIdsCooked" -->
          <q-table
           :rows="tableData1"
            :columns="columnDataUnassigned"
            table-class="customTableClass"
            :filter="filterSearch"
            :pagination="paginationControl1"
            row-key="id"
            :rows-per-page-options="[10, 20, 50, 100, 150, 200]"
            :loading="tableAjaxLoading1"
            color="dark"
            @request="ajaxLoadAllLeadInfo1"
          >
            <q-td
              v-slot:body-cell-leadNumber="props"
              :props="props"
              class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.leadInformation)"
            >
              <span class="label text-primary"
                >#
                {{
                  props.row.leadInformation != null
                    ? props.row.leadInformation.leadNumber
                    : "NA"
                }}</span
              >
            </q-td>
            <q-td v-slot:body-cell-LeadSource="props" :props="props">
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
            <!-- <q-td
              v-slot:body-cell-submitToMarsDate="props"
              :props="props"
              >{{
                props.row.leadInformation.submitToMarsDate | moment("Do MMM Y")
              }}</q-td
            > -->
            <!--props.row.createdAt | moment("Do MMM Y")-->
            <q-td
              v-slot:body-cell-createdAt="props"
              :props="props"
              >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td
            >
            <!-- <q-td
              v-slot:body-cell-tid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.tid != null ? props.row.tid : "NA" }}</div>
            </q-td> -->
            <q-td
              v-slot:body-cell-mid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">
                {{ props.row.mid != null ? props.row.mid : "NA" }}
              </div>
            </q-td>
            <q-td
              v-slot:body-cell-deviceAddress="props"
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
                {{
                  props.row.deviceAddress != null
                    ? props.row.deviceAddress
                    : "NA"
                }}
              </div>
            </q-td>
            <template v-slot:top="props">
              <!--START: table filter,search -->
              <div class="col-md-5">
                <q-input
                  clearable
                  color="grey-9"
                  v-model="filterSearch"
                  placeholder="Type.."
                  float-label="Search By MID, Merchant Name.."
                  class="q-mr-lg q-py-sm"
                />
              </div>
              <!-- <div class="col-md-3">
                <q-input
                v-model="filter_values" 
                float-label="Select Date"
                type="date"
                class="q-mr-lg q-py-sm"
                color="grey-9" 
                />
              </div>-->
              <!--ENDv-model: table filter,search -->
            </template>
          </q-table>
          <!--END: table Data -->
        </q-tab-panel>
      </q-tabs>

      <!--END: table Footer -->
      <!-- START >> COMPONENT: Update device address  -->
      <DeviceAddressModal
        v-if="showDeviceAddressModal"
        :showDeviceAddressModal="showDeviceAddressModal"
        :currentDeviceInfo="currentDeviceInfo"
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
import { required, email, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import DeviceAddressModal from "../../components/sat/DeviceAddressModal.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";


export default {
  name: "implementationQueue",
  components: {
    DeviceAddressModal,
    generalLeadInformation,

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
          name: "LeadSource",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            return row.leadInformation.leadSource.sourceName;
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
            return row.assignedTo == null
              ? "NA"
              : row.assignedTo.name + " | " + row.assignedTo.employeeID;
          },
          sortable: false
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            return row.leadInformation.device == null
              ? "NA"
              : row.leadInformation.device ||
                row.leadInformation.aggregatorDevice.deviceName == null
              ? "NA"
              : row.leadInformation.aggregatorDevice.deviceName;
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
            return row.leadInformation != null
              ? row.leadInformation.leadNumber
              : "NA";
          },
          sortable: false
        },
        {
          name: "LeadSource",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            return row.leadInformation.leadSource.sourceName;
          },
          sortable: false
        },
        {
          name: "createdAt",
          required: true,
          label: "Date of TID Generation",
          align: "left",
          field: row => {
            return row.createdAt != null ? row.createdAt : "NA";
          },
          sortable: true
        },
        // {
        //   name: "tid",
        //   required: true,
        //   label: "TID",
        //   align: "left",
        //   field: row => {
        //     return row.tid !=null ? row.tid : "NA";
        //   },
        //   sortable: true
        // },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: row => {
            return row.mid != null ? row.mid : "NA";
          },
          sortable: true
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.leadInformation != null
              ? row.leadInformation.leadName
              : "NA";
          },
          sortable: false
        },
        {
          name: "mobile_number",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: row => {
            return row.leadInformation != null
              ? row.leadInformation.contactNumber
              : "NA";
          },
          sortable: false
        },
        {
          name: "deviceAddress",
          required: true,
          label: "Address",
          align: "left",
          field: row => {
            return row.deviceAddress != null ? row.deviceAddress : "NA";
          },
          sortable: false
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            return row.leadInformation.device == null
              ? "NA"
              : row.leadInformation.device ||
                row.leadInformation.aggregatorDevice.deviceName == null
              ? "NA"
              : row.leadInformation.aggregatorDevice.deviceName;
          },
          sortable: false
        },
        {
          name: "serial_number",
          required: true,
          label: "Serial Number",
          align: "left",
          field: row => {
            return row.regionalInventory != null
              ? row.regionalInventory.serialNumber
              : "NA";
          },

          sortable: true
        }
        // {
        //   name: "submitToMarsDate",
        //   required: true,
        //   label: "Date of Submission",
        //   align: "left",
        //   field: row => {
        //     return row.leadInformation.submitToMarsDate;
        //   },
        //   sortable: true
        // }
        // {
        //   name: "submitToMarsDate",
        //   required: true,
        //   label: "Date of Submission",
        //   align: "left",
        //   field: row => {
        //     return row.leadInformation !=null ? row.leadInformation.submitToMarsDate : "NA";
        //   },
        //   format: val => `${val}|moment("Do MMM Y")`,
        //   sortable: true
        // }
      ],

      currentDeviceInfo: {},
      showDeviceAddressModal: false,
      formData: {
        marsDeviceIdsCooked: [],
        marsDeviceIdsCookedUnAssinged: [],
        triggerWelcomeMail: false,
        courierDevice: false,
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
      "getImplementationQueueCourierList",
      "getImplementationQueueUnassignedList"
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
      "IMPLEMENTATION_QUEUE_COURIER_LIST",
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
      this.IMPLEMENTATION_QUEUE_COURIER_LIST({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getImplementationQueueCourierList.totalElements;
          this.paginationControl1.page =
            this.getImplementationQueueCourierList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getImplementationQueueCourierList.content;
          if (this.getImplementationQueueCourierList.sort != null) {
            this.paginationControl1.sortBy = this.getImplementationQueueCourierList.sort[0].property;
            this.paginationControl1.descending = this.getImplementationQueueCourierList.sort[0].ascending;
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
      if (tab == "courier") {
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filterSearch1
        });
        this.formData.marsDeviceIdsCookedUnAssinged = [];
        this.formData.assignTo = "";
        this.filterSearch = "";
      } else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
        this.formData.marsDeviceIdsCookedUnAssinged = [];
        this.formData.assignTo = "";
        this.filterSearch = "";
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
          userId: self.formData.assignTo
        };
        this.IMPLEMENTATION_QUEUE_SUBMIT(postValues)
          .then(() => {
          // self.IMPLEMENTATION_QUEUE_UNASSIGNED_LIST();
            this.formData.marsDeviceIdsCooked = [];
            this.formData.assignTo = "";
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully assigned!",
              icon: "thumb_up"
            });
            this.ajaxLoadAllLeadInfo1({
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
            this.filterSearch = "";
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
            this.filterSearch = "";
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
</style>
