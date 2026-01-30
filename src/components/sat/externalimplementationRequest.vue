<template>
  <q-page>
    <!-- content -->
    <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Aggregator Implementation Queue</div>
    <div>
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <changeRegionModal
        v-if="propToggleRegionChange"
        :regionInformation="addRegionInformation"
        :propToggleRegionInfoPop="propToggleRegionChange"
        @closeRegionInformation="changeRegion"
      />
      <!-- <pre>{{getImplementationExecutiveList}}</pre> -->
      <!--START: table title -->
      <!-- <div
        class="q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
      </div> -->
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
            <q-btn
              no-caps
              :disabled="formData.marsDeviceIdsCooked.length == 0 ? true : false || this.formData.assignTo == ''"
              label="Assign"
              class="common-dark-blue"
              @click="assignImplementationUser"
            />
          </div>
          <div v-if="id==3" class="col-md-2 col-sm-6 col-xs-6" align="right">
            <q-btn
              no-caps
              :disabled="
                formData.marsDeviceIdsCooked.length == 0 ? true : false
              "
              label="Re-Assign Region"
              class="common-dark-blue"
              @click="changeRegion(formData.marsDeviceIdsCooked)"
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

            <q-card class="group q-pa-md" v-if="selectedTab == 'cancelledMerchants'">
                <div class="row items-center gutter-y-sm">
                    <div class="col-md-9 col-sm-12 col-xs-12">
                        <div class="row items-center">
                            <div class="col-md-4 col-sm-6 col-xs-6 group"></div>
                        </div>
                    </div>
                </div>
            </q-card>

      <q-tabs v-model="selectedTab" class="shadow-1" color="grey-1" @select="goToUnassignedTab" >

        <q-tab default color="dark" name="unAssigned" slot="title" label="Unassigned" />
        <q-tab color="dark" name="assigned" slot="title" label="Assigned" />
        <q-tab color="dark" name="cancelledMerchants" slot="title" label="Cancelled Merchants" />
        
         <q-tab-pane name="assigned">
              <Phonepeassigned/>
            </q-tab-pane>

            <!-- <q-tab-pane name="cancelledMerchants">
              <CancelledMerchants/>
            </q-tab-pane> -->

              <q-tab-pane name="unAssigned">
          <!--START: table Data   :data="getPhonepeImplementationQueueUnassignedList"  -->
          <q-table
           :data="tableData1"
            :columns="columnDataUnassigned"
            table-class="customTableClass"
            :filter="filterSearch"
            selection="multiple"
            :selected.sync="formData.marsDeviceIdsCooked"
            :pagination.sync="paginationControl1"
            row-key="id"
            :rows-per-page-options="[10,20,50,100,150,200]"
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
              <!--END: table filter,search -->
            </template>
          </q-table>
        </q-tab-pane>

      <q-card class="group q-pa-md" v-if="selectedTab == 'cancelledMerchants'">
        <div class="row items-center gutter-y-sm">
          <div class="col-md-3 col-sm-12 col-xs-12 text-grey-7 text-weight-medium" align="left">
            <span class="q-display-2">{{
              formData.marsDeviceIdsCookedCancelled.length
            }}</span>/ selected
          </div>
          <div class="side1" align="right">
            <q-btn no-caps :disabled="
                    formData.marsDeviceIdsCookedCancelled.length == 0
                      ? true
                      : false
                  " label="Cancel" class="common-dark-blue" @click="cancelImplementationUser" />
                  </div>
                  <div class="side2">
            <q-btn no-caps :disabled="
                    formData.marsDeviceIdsCookedCancelled.length == 0
                      ? true
                      : false
                  " label="Re assign" class="common-dark-blue" @click="reAssignImplementationUser" />
        </div>
        </div>
      </q-card>

      <q-tab-pane name="cancelledMerchants">
      <q-table :data="tableData2"
                      :columns="columnDataMerchants"
                       table-class="customTableClass"
                      :filter="filterSearch2" 
                      :pagination.sync="paginationControl2"
                      selection="multiple"
                      :selected.sync="formData.marsDeviceIdsCookedCancelled" 
                      row-key="id" 
                      :loading="tableAjaxLoading2"
                      :rows-per-page-options="[5, 10, 15, 20]" 
                      color="dark" 
                      @request="ajaxLoadAllLeadInfo2"
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
              <div class="col-md-5">
                <q-search clearable color="grey-9" v-model="filterSearch2" placeholder="Type.." float-label="Search By MID, Merchant Name.."
                  class="q-mr-lg q-py-sm" />
              </div>
            </template>
            
            </q-table>
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
import Phonepeassigned from "../../components/sat/Phonepeassigned.vue";
import changeRegionModal from "../../components/changeRegionModal.vue";
export default {
  name: "implementationQueue",
  components: {
    DeviceAddressModal,
    generalLeadInformation,
    Phonepeassigned,
    changeRegionModal
  },
  data() {
    return {
      propToggleLeadInformation: false,
      propToggleRegionChange: false,
      leadId: null,
      leadIdSat: null,
      addtnLeadInformation: null,
      addRegionInformation: null,
      filterSearch: "",
      filterSearch1: "",
      filterSearch2: "",
      selectedTab: "assigned",
      assignTo: "",
      id:null,
      assignToOptions: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
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
            return row.assignedTo == null ? "NA" : row.assignedTo.name+" | "+row.assignedTo.employeeID;
          },
          sortable: false
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            return row.leadInformation.aggregatorDevice == null ?  "NA" :row.leadInformation.aggregatorDevice.deviceName;
          },
          sortable: false
        },
        {
          name: "serial_number",
          required: true,
          label: "Serial Number",
          align: "left",
          field: (row) => {
              return row.aggregatorRegionalInventory == null
                ? "NA"
                : row.aggregatorRegionalInventory.serialNumber;
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
        },
        {
          name: "lead_source",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            return row.leadInformation.city;
          },
          sortable: false
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
            return row.leadInformation.aggregatorDevice == null ?  "NA" :row.leadInformation.aggregatorDevice.deviceName;
          },
          sortable: false
        },
        {
          name: "serial_number",
          required: true,
          label: "Serial Number",
          align: "left",
          field: (row) => {
              return row.aggregatorRegionalInventory == null
                ? "NA"
                : row.aggregatorRegionalInventory.serialNumber;
            },

          sortable: true
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
          name: "submitToMarsDate",
          required: true,
          label: "Date of Submission",
          align: "left",
          field: row => {
            return row.leadInformation.submitToMarsDate;
          },
          format: val => `${val}|moment("Do MMM Y")`,
          sortable: true
        },
        {
          name: "status",
          required: true,
          label: "Status",
          align: "left",
          field: row => {
            return row.deviceStatus == 3
              ? "CANCELLED"
              :"NA"
          },

          sortable: true
        },
        {
          name: "lead_source",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            return row.leadInformation.leadSource == null ? "NA" :row.leadInformation.leadSource.sourceName;
          },
          sortable: false
        }
      ],
      columnDataMerchants: [
          {
            name: "leadNumber",
            required: true,
            label: "Lead Number",
            align: "left",
            field: row => {
              return row.leadInformation != null ? row.leadInformation.leadNumber : "NA";
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
              return row.mid !=null ? row.mid : "NA";
            },
            sortable: true
          },
          {
            name: "merchant_name",
            required: true,
            label: "Merchant Name",
            align: "left",
            field: row => {
              return row.leadInformation != null ? row.leadInformation.leadName : "NA";
            },
            sortable: false
          },
          {
          name: "cancel_reason",
          required: true,
          label: "Cancel Reason",
          align: "left",
          field: row => {
            return row == null ? "NA" :row.reason;
          },
          sortable: false
        },
        {
          name: "remarks",
          required: true,
          label: "Remarks",
          align: "left",
          field: row => {
            return row.onboardCancelRemarks == null ? "NA" :row.onboardCancelRemarks;
          },
          sortable: false
        },
          {
            name: "mobile_number",
            required: true,
            label: "Mobile Number",
            align: "center",
            field: row => {
              return row.leadInformation != null ? row.leadInformation.contactNumber : "NA";
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
              return row.leadInformation.aggregatorDevice == null ?  "NA" :row.leadInformation.aggregatorDevice.deviceName;
            },
            sortable: false
          },
          {
            name: "serial_number",
            required: true,
            label: "Serial Number",
            align: "left",
            field: (row) => {
              return row.aggregatorRegionalInventory == null
                ? "NA"
                : row.aggregatorRegionalInventory.serialNumber;
            },
  
            sortable: true
          },
          {
          name: "lead_source",
          required: true,
          label: "Lead Source",
          align: "left",
          field: row => {
            return row.leadInformation.leadSource == null ? "NA" :row.leadInformation.leadSource.sourceName;
          },
          sortable: false
        },
        ],

      currentDeviceInfo: {},
      showDeviceAddressModal: false,
      formData: {
        marsDeviceIdsCooked: [],
        marsDeviceIdsCookedUnAssinged: [],
        marsDeviceIdsCookedCancelled: [],
        // triggerWelcomeMail: false,
        courier:false,
        assignTo: ""
      },
      paginationControl: {        
        sortBy: "deviceStatusDate", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      paginationControl1: {        
        sortBy: "deviceStatusDate",  // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      paginationControl2: {
          sortBy: "deviceStatusDate", // String, column "name" property valuecreated_date
          descending: false,
          page: 1,
          rowsPerPage: 10, // current rows per page being displayed
       },
      tableAjaxLoading: false,
      tableAjaxLoading1: false,
      tableAjaxLoading2: false
    };
  },

  computed: {
    ...mapGetters("ImplementationQueue", [
      "getImplementationQueueAssignedList",
      "getImplementationQueueAssignedDataList"
    ]),
    ...mapGetters("ImplementationQueue", [
      "getImplementationQueueAssignedList",
      "getImplementationQueueUnassignedList",
      "getImplementationQueueAssignedDataList"
    ]),
   
    ...mapGetters("phonepeImplementationQueue", [
    "getPhonepeImplementationQueueUnassignedList",
    "getPhonepeCancelledMerchants"
    ]),
    ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList"
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"])
  },

  beforeMount(){
  this.id=localStorage.getItem("selectedTab").split('|')[1]
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
    this.ajaxLoadAllLeadInfo2({
          pagination: this.paginationControl2,
          filter: this.filterSearch2,
      })
    this.getPincodeInformations();
  },
  methods: {
    ...mapActions("phonepeImplementationQueue", [
      "PHONEPE_IMPLEMENTATION_QUEUE_UNASSIGNED_LIST",
      "PHONEPE_IMPLEMENTATION_QUEUE",
      "PHONEPE_CANCELLED_MERCHANTS",
      "PHONEPE_IMPLEMENTATION_QUEUE_SUBMIT", "PHONEPE_CANCELLED_MERCHANT_SUBMIT"
    ]),
    
    ...mapActions("ImplementationQueue", [
      "IMPLEMENTATION_QUEUE_ASSIGNED_LIST"
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
      this.PHONEPE_IMPLEMENTATION_QUEUE_UNASSIGNED_LIST({ pagination, filter })
        .then((res) => {
          this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
            let assumeArr = [];
            this.getImplementationExecutiveList.map(function(value) {
              assumeArr.push({ label: value.name + " | " + value.employeeID+ " | " + value.email,
               value: value.id });
            });
            this.assignToOptions = assumeArr;
          });
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getPhonepeImplementationQueueUnassignedList.totalElements;
          this.paginationControl1.page = this.getPhonepeImplementationQueueUnassignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getPhonepeImplementationQueueUnassignedList.content;
          if (this.getPhonepeImplementationQueueUnassignedList.sort != null) {
            this.paginationControl1.sortBy = this.getPhonepeImplementationQueueUnassignedList.sort[0].property;
            this.paginationControl1.descending = this.getPhonepeImplementationQueueUnassignedList.sort[0].ascending;
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
          this.PHONEPE_CANCELLED_MERCHANTS({ pagination, filter })
              .then((res) => {
                  // updating pagination to reflect in the UI
                  this.paginationControl2 = pagination;

                  // we also set (or update) rowsNumber
                  this.paginationControl2.rowsNumber =
                      this.getPhonepeCancelledMerchants.totalElements;
                  this.paginationControl2.page =
                      this.getPhonepeCancelledMerchants.number + 1;

                  // then we update the rows with the fetched ones
                  this.tableData2 = this.getPhonepeCancelledMerchants.content;

                  if (this.getPhonepeCancelledMerchants.sort != null) {
                      this.paginationControl2.sortBy =
                          this.getPhonepeCancelledMerchants.sort[0].property;
                      this.paginationControl2.descending =
                          this.getPhonepeCancelledMerchants.sort[0].ascending;
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
        this.ajaxLoadAllLeadInfo1({ pagination: this.paginationControl, filter: this.filterSearch });
        this.formData.marsDeviceIdsCooked = [];
        this.formData.assignTo = "";
        this.filterSearch = "";
        // this.formData.courier = "";
      } else if (tab == "assigned") {
        this.ajaxLoadAllLeadInfo({ pagination: this.paginationControl, filter: this.filterSearch });
        this.formData.marsDeviceIdsCooked = [];
        this.formData.assignTo = "";
        this.filterSearch = "";
        // this.formData.courier = "";
      } else {
        this.ajaxLoadAllLeadInfo2({ pagination: this.paginationControl, filter: this.filterSearch2 });
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
        let self = this;
        self.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating ..",
        });
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
        this.PHONEPE_IMPLEMENTATION_QUEUE_SUBMIT(postValues)
          .then((res) => {
            // let size = res.data.data.second.length;
            // let data = {};
            // for(var i=1;i<size;i++){
            //   data = res.data.data.second[i]
            // }
            if(res.status == 200 && res.data.data== null){
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
            this.ajaxLoadAllLeadInfo1({pagination: this.paginationControl, filter: this.filterSearch});
            }
            else if(res.status == 200 && res.data.data.second[0].Success){
              // alert("Success!!!!!!!!!!!")
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
            this.ajaxLoadAllLeadInfo1({pagination: this.paginationControl, filter: this.filterSearch});
            }
            else if(res.status == 200 && res.data.data.second[0].Failed){
              // alert("Failed!!!!!!!!!!!")
               this.$router.push({name: "externalimplementationAddressFetch", params: {data:res}})
            }
            else{
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

    // Function to reAssignImplementationUser in implementation queue
    reAssignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCookedCancelled.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to Re-Assign",
          icon: "thumb_down"
        });
      } else {
        self.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Fetching Data..",
        });
        let marsDeviceIdsCookedCancelled = [];
        self.formData.marsDeviceIdsCookedCancelled.map(function (value) {
          marsDeviceIdsCookedCancelled.push(value.id);
        });

        let postValues = {
          action: this.$MARS_DEVICE_STATUS_TID_GENERATED,
          marsDeviceIds: marsDeviceIdsCookedCancelled,
          userId: this.$SEND_ZERO_FOR_UNASSIGING
        };
        self
          .PHONEPE_IMPLEMENTATION_QUEUE_SUBMIT(postValues)
          .then(() => {
            self.formData.marsDeviceIdsCookedCancelled = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Re-Assigned!",
              icon: "thumb_up"
            });
            this.ajaxLoadAllLeadInfo2({ pagination: this.paginationControl, filter: this.filterSearch2 });
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

    // Function to cancelImplementationUser in implementation queue
    cancelImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCookedCancelled.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to Cancel",
          icon: "thumb_down"
        });
      } else {
        self.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Fetching Data..",
        });
        let marsDeviceIdsCookedCancelled = [];
        self.formData.marsDeviceIdsCookedCancelled.map(function (value) {
          marsDeviceIdsCookedCancelled.push(value.leadInformation.id);
        });

        let postValues = {
          leadIdSat: marsDeviceIdsCookedCancelled
         };
        self
          .PHONEPE_CANCELLED_MERCHANT_SUBMIT(postValues)
          .then(() => {
            self.formData.marsDeviceIdsCookedCancelled = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Cancelled!",
              icon: "thumb_up"
            });
            this.ajaxLoadAllLeadInfo2({ pagination: this.paginationControl, filter: this.filterSearch2 });
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

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    changeRegion(RegionDetails) {
     
      this.propToggleRegionChange = !this.propToggleRegionChange;
     
      if (RegionDetails != undefined) {
        this.addRegionInformation = RegionDetails;
      }
      if (this.propToggleRegionChange == false) {
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filterSearch1
        });
        this.formData.marsDeviceIdsCooked = [];
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

.side1{
  margin-left: 513px;
}
.side2{
  margin-left: 30px;
}

</style>
