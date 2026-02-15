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
        Service Request
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
            <b><h>Request Mode</h></b>
            <div class="col-md-2 col-sm-6 col-xs-6">
              <q-radio
                v-for="(item, index) in requestOptions"
                :key="index"
                color="grey-9"
                v-model.trim="formData.requestMode"
                :val="item.value"
                :label="item.label"
              />
            </div>
          </div>
          <!-- <div v-if="formData.requestMode == 1"> -->
          <div
            v-if="formData.requestMode == 1"
            class="col-md-2 col-sm-6 col-xs-6"
          >
            <q-input
              v-model.trim="formData.podNumber"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Enter Pod Number*"
              placeholder="Enter Pod Number*"
            />
          </div>
          <!-- </div> -->
          <!-- <div v-if="formData.requestMode == 1">
            <div class="col-md-3 col-sm-6 col-xs-6">
              <q-select
                v-model="formData.assignTo"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                :options="assignToOptions"
                placeholder="Assign To"
              />
            </div>
          </div> -->
          <!-- <div v-if="formData.requestMode == 1"> -->
          <div
            v-if="formData.requestMode == 1"
            class="col-md-3 col-sm-6 col-xs-6"
          >
            <q-select
              v-model="formData.assignTo"
              separator
              color="grey-9"
              :options="assignToOptions"
              filter
              clearable
              placeholder="Assign To"
            />
          </div>
          <!-- </div> -->

          <div v-if="formData.requestMode == 0">
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
          </div>

          <div class="col-md-3 col-sm-6 col-xs-6" align="right">
            <q-btn
              no-caps
              :disabled="
                formData.marsDeviceIdsCooked.length == 0
              "
              label="Submit"
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
      <q-card class="group q-pa-md" v-if="selectedTab == 'closed'">
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
        <q-tab-panel name="unAssigned">
          <!--START: table Data    :rows="tableData1" -->
          <q-table
            :columns="columnDataUnassigned"
            table-class="customTableClass"
            :filter="filterSearch1"
            selection="multiple"
            :selected="formData.marsDeviceIdsCooked"
            v-model:pagination="paginationControl1"
            row-key="id"
            :loading="tableAjaxLoading1"
            :rows-per-page-options="[5, 10, 15, 20]"
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
                ># {{ props.row.leadInformation.leadNumber }}</span
              >
            </q-td>
            <q-td
              v-slot:body-cell-submitToMarsDate="props"
              :props="props"
              >{{
                props.row.leadInformation.submitToMarsDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              v-slot:body-cell-createdAt="props"
              :props="props"
              >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td
            >
            <q-td
              v-slot:body-cell-tid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.tid }}</div>
            </q-td>
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
              <div>
                {{ props.row.deviceAddress }}
              </div>
            </q-td>
            <template slot="top">
              <!--START: table filter,search -->
              <!-- <div class="col-md-5">
                <q-input
                  clearable
                  color="grey-9"
                  v-model="filterSearch1"
                  placeholder="Type.."
                  float-label="Search .."
                  class="q-mr-lg q-py-sm"
                />
              </div> -->
              <!--ENDv-model: table filter,search -->
            </template>
          </q-table>
          <!--END: table Data -->
        </q-tab-panel>
        <q-tab color="dark" name="assigned" slot="title" label="Assigned" />

        <q-tab-panel name="assigned">
          <!--START: table Data    :rows="tableData" -->
          <q-table
            :columns="columnDataAssigned"
            table-class="customTableClass"
            :filter="filterSearch"
            :pagination="paginationControl"
            v-model:selected="formData.marsDeviceIdsCookedUnAssinged"
            row-key="id"
            :loading="tableAjaxLoading"
            :rows-per-page-options="[5, 10, 15, 20]"
            color="dark"
            @request="ajaxLoadAllLeadInfo"
          >
            <!-- selection="multiple" -->
            <!-- <template v-slot:body="props">
                 <q-tr :props="props" class="">

                 </q-tr>
            </template> -->
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
            <q-td
              v-slot:body-cell-submitToMarsDate="props"
              :props="props"
              >{{
                props.row.leadInformation.submitToMarsDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              v-slot:body-cell-createdAt="props"
              :props="props"
              >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td
            >
            <q-td
              v-slot:body-cell-deviceAddress="props"
              :props="props"
              class="customTd customCellLength"
            >
              <div>{{ props.row.deviceAddress }}</div>
            </q-td>

            <q-td
              v-slot:body-cell-tid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.tid }}</div>
            </q-td>
            <q-td
              v-slot:body-cell-mid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.mid }}</div>
            </q-td>
            <q-td v-slot:body-cell-action="props" :props="props">
              <q-btn
                highlight
                push
                outline
                class="q-mx-sm"
                color="purple-9"
                size="sm"
                @click="financeApproveSubmit(props.row.leadId)"
                >Approve</q-btn
              >
              <q-btn
                highlight
                push
                outline
                class="q-mx-sm"
                color="negative"
                @click="openRejectModel(props.row)"
                size="sm"
                >Reject</q-btn
              >
            </q-td>

            <template slot="top">
              <!--START: table filter,search -->
              <!-- <div class="col-md-5">
                <q-input
                  clearable
                  color="grey-9"
                  v-model="filterSearch"
                  placeholder="Type.."
                  float-label="Search .."
                  class="q-mr-lg q-py-sm"
                />
              </div> -->
            </template>
          </q-table>
          <!--ENDv-model: table Data -->
        </q-tab-panel>
        <q-tab color="dark" name="closed" slot="title" label="Closed" />
        <q-tab-panel name="closed">
          <!--START: table Data -->
          <q-table
            :rows="closedDatas"
            :columns="columns"
            table-class="customTableClass"
            :filter="filterSearch2"
            :pagination="paginationControl2"
            v-model:selected="formData.marsDeviceIdsCookedUnAssinged"
            row-key="id"
            :loading="tableAjaxLoading"
            :rows-per-page-options="[5, 10, 15, 20]"
            color="dark"
            @request="ajaxLoadAllLeadInfoClosed"
          >
            <!-- selection="multiple" -->
            <!-- <template v-slot:body="props">
                 <q-tr :props="props" class="">

                 </q-tr>
            </template> -->
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
            <q-td
              v-slot:body-cell-submitToMarsDate="props"
              :props="props"
              >{{
                props.row.leadInformation.submitToMarsDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              v-slot:body-cell-createdAt="props"
              :props="props"
              >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td
            >
            <q-td
              v-slot:body-cell-deviceAddress="props"
              :props="props"
              class="customTd customCellLength"
            >
              <div>{{ props.row.deviceAddress }}</div>
            </q-td>

            <q-td
              v-slot:body-cell-tid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.tid }}</div>
            </q-td>
            <q-td
              v-slot:body-cell-mid="props"
              :props="props"
              class="customTd"
            >
              <div class="text-primary">{{ props.row.mid }}</div>
            </q-td>
            <q-td v-slot:body-cell-action="props" :props="props">
              <q-btn
                highlight
                push
                outline
                class="q-mx-sm"
                color="purple-9"
                size="sm"
                @click="financeApproveSubmit(props.row.leadId)"
                >Approve</q-btn
              >
              <q-btn
                highlight
                push
                outline
                class="q-mx-sm"
                color="negative"
                @click="openRejectModel(props.row)"
                size="sm"
                >Reject</q-btn
              >
            </q-td>

            <template slot="top">
              <!--START: table filter,search -->
              <!-- <div class="col-md-5">
                <q-input
                  clearable
                  color="grey-9"
                  v-model="filterSearch2"
                  placeholder="Type.."
                  float-label="Search .."
                  class="q-mr-lg q-py-sm"
                />
              </div> -->
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
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

export default {
  name: "implementationQueue",
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      // paginationControl: {
      //   rowsPerPage: 10
      // },
      toggleAjaxLoadFilter: false,
      toggleAjaxLoadFilter1: false,

      //   paginationControl: {
      //     rowsNumber: 10,
      //     page: 1,
      //     sortBy: "tid",
      //     descending: false,
      //     rowsPerPage: 10,
      //   },

      closedDatas: [],
      valueToggleMerchantTransaction: false,
      filter: "",

      filterSearch: "",
      filterSearch1: "",
      filterSearch2: "",
      selectedTab: "assigned",
      assignTo: "",
      podNumber: "",
      requestMode: "",
      assignToOptions: [],
      tableData: [],
      tableData1: [],
      loading: true,
      filter_values: "",
      requestOptions: [
        {
          label: "Direct Dispatch",
          value: 1,
        },
        {
          label: "SO",
          value: 0,
        },
      ],
      //Defining columns for table
      columns: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: (row) => {
            return row.leadInformation.leadNumber;
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
            return row.leadInformation.leadName;
          },
          sortable: false,
        },
        {
          name: "mobile_number",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: (row) => {
            return row.leadInformation.contactNumber;
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
            return row.leadInformation.leadSource.sourceName;
          },
          sortable: false,
        },
        {
          name: "assigned_to",
          required: true,
          label: "Assigned To",
          align: "left",
          field: (row) => {
            return row.replacedBy == null ? "NA" : row.replacedBy.name;
          },
          sortable: false,
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: (row) => {
            return row.leadInformation.device.deviceName;
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
            return row.leadInformation.submitToMarsDate;
          },
          format: (val) => `${val}|moment("Do MMM Y")`,
          sortable: true,
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "center",
          field: "action",
          sortable: false,
        },
      ],

      columnDataAssigned: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: (row) => {
            return row.leadInformation.leadNumber;
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
            return row.leadInformation.leadName;
          },
          sortable: false,
        },
        {
          name: "mobile_number",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: (row) => {
            return row.leadInformation.contactNumber;
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
            return row.leadInformation.leadSource.sourceName;
          },
          sortable: false,
        },
        {
          name: "assigned_to",
          required: true,
          label: "Assigned To",
          align: "left",
          field: (row) => {
            return row.replacedBy == null ? "NA" : row.replacedBy.name;
          },
          sortable: false,
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: (row) => {
            return row.leadInformation.device.deviceName;
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
            return row.leadInformation.submitToMarsDate;
          },
          format: (val) => `${val}|moment("Do MMM Y")`,
          sortable: true,
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "center",
          field: "action",
          sortable: false,
        },
      ],

      columnDataUnassigned: [
        {
          name: "leadNumber",
          required: true,
          label: "Ticket No ",
          align: "left",
          field: (row) => {
            return row.leadInformation.leadNumber;
          },
          sortable: false,
        },

        {
          name: "createdAt",
          required: true,
          label: "BP Region ",
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
          label: "Device Type ",
          align: "left",
          field: (row) => {
            return row.mid;
          },
          sortable: true,
        },
        {
          name: "merchant_name",
          required: true,
          label: "Service Type ",
          align: "left",
          field: (row) => {
            return row.leadInformation.leadName;
          },
          sortable: false,
        },
        {
          name: "mobile_number",
          required: true,
          label: "Request Mode ",
          align: "center",
          field: (row) => {
            return row.leadInformation.contactNumber;
          },
          sortable: false,
        },
        {
          name: "deviceAddress",
          required: true,
          label: "SO Name ",
          align: "left",
          field: (row) => {
            return row.deviceAddress;
          },
          sortable: false,
        },
        // {
        //   name: "leadInformation",
        //   required: true,
        //   label: "Device Type",
        //   align: "left",
        //   field: (row) => {
        //     return row.leadInformation.device.deviceName;
        //   },
        //   sortable: false,
        // },
        // {
        //   name: "serial_number",
        //   required: true,
        //   label: "Serial Number",
        //   align: "left",
        //   field: (row) => {
        //     return row.regionalInventory == null
        //       ? "NA"
        //       : row.regionalInventory.serialNumber;
        //   },

        //   sortable: true,
        // },
        // {
        //   name: "source",
        //   required: true,
        //   label: "Source",
        //   align: "left",
        //   field: (row) => {
        //     return row.leadInformation.leadSource.sourceName;
        //   },
        //   sortable: false,
        // },
        // {
        //   name: "submitToMarsDate",
        //   required: true,
        //   label: "Date of Submission",
        //   align: "left",
        //   field: (row) => {
        //     return row.leadInformation.submitToMarsDate;
        //   },
        //   format: (val) => `${val}|moment("Do MMM Y")`,
        //   sortable: true,
        // },
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
        sortBy: null, // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      paginationControl1: {
        sortBy: null, // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      paginationControl2: {
        sortBy: null, // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      tableAjaxLoading: false,
      tableAjaxLoading1: false,
    };
  },

  computed: {
    ...mapGetters("DeviceReplacement", [
      "getDeviceReplacementQueueAssignedList",
      "getDeviceReplacementQueueUnassignedList",
    ]),
    ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList",
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"]),
    ...mapGetters("additionalTid", ["getadditionalTid"]),
  },
  created() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filterSearch,
    });
    this.ajaxLoadAllLeadInfo1({
      pagination: this.paginationControl1,
      filter: this.filterSearch1,
    });
    this.ajaxLoadAllLeadInfoClosed({
      pagination: this.paginationControl2,
      filter: this.filterSearch2,
    });
    this.getPincodeInformations();
  },
  methods: {
    ...mapActions("DeviceReplacement", [
      "DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST",
      "DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST",
      "DEVICE_REPLACEMENT_QUEUE_SUBMIT",
    ]),
    ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_STATES_DATA"]),
    ...mapActions("additionalTid", [
      "FETCH_ADDITIONAL_TID_DATAS",
      "ADDITIONAL_TID_VERIFY_DATA",
    ]),

    ////SERVICE REQUEST CLOSED DATAS STARTED///////
    // ajaxLoadAllLeadInfoClosed() {
    //   this.toggleAjaxLoadFilter = true;
    //   this.FETCH_ADDITIONAL_TID_DATAS()
    //     .then((response) => {
    //       this.toggleAjaxLoadFilter = false;
    //     })
    //     .catch((error) => {
    //       this.toggleAjaxLoadFilter = false;
    //     });
    // },
    // ajaxLoadAllLeadInfoClosed({ pagination, filter }) {
    //   // we set QTable to "loading" state
    //   this.$q.loading.show({
    //     delay: 0, // ms
    //     spinnerColor: "purple-9",
    //     message: "Fetching data ..",
    //   });
    //   this.FETCH_ADDITIONAL_TID_DATAS({ pagination, filter })
    //     .then((res) => {
    //       // updating pagination to reflect in the UI
    //       this.paginationControl = pagination;

    //       // we also set (or update) rowsNumber
    //       this.paginationControl.rowsNumber =
    //         this.getadditionalTid.totalElements;
    //       this.paginationControl.page = this.getadditionalTid.number + 1;

    //       // then we update the rows with the fetched ones
    //       this.tableData = this.getadditionalTid.content;
    //       console.log(
    //         "ADDITIONAL TERMINAL TABLE DATA---------->" +
    //           JSON.stringify(this.tableData)
    //       );
    //       if (this.getadditionalTid.sort != null) {
    //         this.paginationControl.sortBy =
    //           this.getadditionalTid.sort[0].property;
    //         this.paginationControl.descending =
    //           this.getadditionalTid.sort[0].ascending;
    //       }

    //       // finally we tell QTable to exit the "loading" state
    //       this.$q.loading.hide();
    //       // console.log("Table Datas ---------------------->"+JSON.stringify(this.tableData));
    //     })
    //     .catch(() => {
    //       this.$q.loading.hide();
    //     });
    // },
    ////SERVICE REQUEST CLOSED DATAS END///////
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
      this.DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST({ pagination, filter })
        .then((res) => {
          this.IMPLEMENTATION_EXECUTIVE_LIST().then((response) => {
            let assumeArr = [];
            this.getImplementationExecutiveList.map(function (value) {
              assumeArr.push({ label: value.name, value: value.id });
            });
            this.assignToOptions = assumeArr;
          });
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber =
            this.getDeviceReplacementQueueUnassignedList.totalElements;
          this.paginationControl1.page =
            this.getDeviceReplacementQueueUnassignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 =
            this.getDeviceReplacementQueueUnassignedList.content;
          if (this.getDeviceReplacementQueueUnassignedList.sort != null) {
            this.paginationControl1.sortBy =
              this.getDeviceReplacementQueueUnassignedList.sort[0].property;
            this.paginationControl1.descending =
              this.getDeviceReplacementQueueUnassignedList.sort[0].ascending;
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
        message: "Fetching data ..",
      });
      this.DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST({ pagination, filter })
        .then((res) => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber =
            this.getDeviceReplacementQueueAssignedList.totalElements;
          this.paginationControl.page =
            this.getDeviceReplacementQueueAssignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getDeviceReplacementQueueAssignedList.content;
          if (this.getDeviceReplacementQueueAssignedList.sort != null) {
            this.paginationControl.sortBy =
              this.getDeviceReplacementQueueAssignedList.sort[0].property;
            this.paginationControl.descending =
              this.getDeviceReplacementQueueAssignedList.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    ajaxLoadAllLeadInfoClosed({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST({ pagination, filter })
        .then((res) => {
          // updating pagination to reflect in the UI
          this.paginationControl2 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl2.rowsNumber =
            this.getDeviceReplacementQueueAssignedList.totalElements;
          this.paginationControl2.page =
            this.getDeviceReplacementQueueAssignedList.number + 1;

          // then we update the rows with the fetched ones
          this.closedDatas = this.getDeviceReplacementQueueAssignedList.content;
          if (this.getDeviceReplacementQueueAssignedList.sort != null) {
            this.paginationControl2.sortBy =
              this.getDeviceReplacementQueueAssignedList.sort[0].property;
            this.paginationControl2.descending =
              this.getDeviceReplacementQueueAssignedList.sort[0].ascending;
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
        let request = {
          pagination: this.paginationControl1,
          filter: this.filterSearch1,
        };
        this.toggleAjaxLoadFilter = true;
        this.DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST(request)
          .then((response) => {
            this.toggleAjaxLoadFilter = false;
          })
          .catch((error) => {
            this.toggleAjaxLoadFilter = false;
          });
      } else if (tab == "assigned") {
        let request = {
          pagination: this.paginationControl,
          filter: this.filterSearch,
        };
        this.toggleAjaxLoadFilter = true;
        this.DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST(request)
          .then((response) => {
            this.toggleAjaxLoadFilter = false;
          })
          .catch((error) => {
            this.toggleAjaxLoadFilter = false;
          });
      } else {
        this.ajaxLoadAllLeadInfoClosed({
          pagination: this.paginationControl2,
          filter: this.filter2,
        });
      }
    },
    // ajaxLoadAllLeadInfoClosed
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
      } else if (self.formData.podNumber == null) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Pod Number cannot be empty!",
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
          .DEVICE_REPLACEMENT_QUEUE_SUBMIT(postValues)
          .then(() => {
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
          .DEVICE_REPLACEMENT_QUEUE_SUBMIT(postValues)
          .then(() => {
            // self.DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST();
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
          .DEVICE_REPLACEMENT_QUEUE_SUBMIT(postValues)
          .then(() => {
            self.DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST();
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
