<template>
    <q-page>
        <div>
        <generalLeadInformation
          v-if="propToggleLeadInformation"
          :leadInformation="addtnLeadInformation"
          :propToggleLeadInformationPop="propToggleLeadInformation"
          @closeLeadInformation="toggleLeadInformation"
        />
        <q-card class="group q-pa-md" v-if="selectedTab == 'statusTab'">
        </q-card>

        <q-card class="group q-pa-md" v-if="selectedTab == 'rejectedTab'">
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
          <q-tab default color="dark" name="statusTab" slot="title" label="TID & MID STATUS"/>
          <!-- <q-tab color="dark" name="rejectedTab" slot="title" label="Rejected Leads" /> -->
          <q-tab-pane name="rejectedTab">
              <varaneekRejectedLead/>
            </q-tab-pane>
          <q-tab-pane name="statusTab">
            <q-table
             :data="tableData1"
              :columns="columnData"
              table-class="customTableClass"
              :filter="filterSearch"
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
              <q-td
                slot="body-cell-mid"
                slot-scope="props"
                :props="props"
                class="customTd"
              >
                <div class="text-primary">{{ props.row.mid }}</div>
              </q-td>
              <template slot="top" slot-scope="props">
                <!--START: table filter,search -->
                <div class="col-md-5">
                  <q-search
                    clearable
                    color="grey-9"
                    v-model="filterSearch"
                    placeholder="Type.."
                    float-label="Search By MID, TID"
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
  import varaneekRejectedLead from "../../components/sat/varaneekRejectedLead.vue";
  export default {
    name: "varaneekImplementationQueue",
    components: {
      DeviceAddressModal,
      generalLeadInformation,
      varaneekRejectedLead
    },
    data() {
      return {
        propToggleLeadInformation: false,
        addtnLeadInformation: null,
  
        filterSearch: "",
        filterSearch1: "",
        selectedTab: "rejectedTab",
        assignTo: "",
        assignToOptions: [],
        tableData: [],
        tableData1: [],

        columnData: [
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
          {
            name: "tid",
            required: true,
            label: "TID",
            align: "left",
            field: row => {
              return row.tid;
            },
            sortable: true
          },
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
        tableAjaxLoading: false,
        tableAjaxLoading1: false
      };
    },
  
    computed: {
      ...mapGetters("varaneekImplementationQueue", [
        "getleadStatusList"
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
      ...mapActions("varaneekImplementationQueue", [
        "LEAD_STATUS_LIST"
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
        this.LEAD_STATUS_LIST({ pagination, filter })
          .then((res) => {
            this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
              let assumeArr = [];
              this.getImplementationExecutiveList.map(function(value) {
                assumeArr.push({ label: value.name, value: value.id });
              });
              this.assignToOptions = assumeArr;
            });
            // updating pagination to reflect in the UI
            this.paginationControl1 = pagination;
  
            // we also set (or update) rowsNumber
            this.paginationControl1.rowsNumber = this.getleadStatusList.totalElements;
            this.paginationControl1.page = this.getleadStatusList.number + 1;
  
            // then we update the rows with the fetched ones
            this.tableData1 = this.getleadStatusList.content;
            if (this.getleadStatusList.sort != null) {
              this.paginationControl1.sortBy = this.getleadStatusList.sort[0].property;
              this.paginationControl1.descending = this.getleadStatusList.sort[0].ascending;
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
        if (tab == "statusTab") {      
          this.ajaxLoadAllLeadInfo1({ pagination: this.paginationControl, filter: this.filterSearch });
        }else {
        this.ajaxLoadAllLeadInfo({ pagination: this.paginationControl, filter: this.filterSearch });
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
  