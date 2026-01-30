<template>
    <q-page>
      <div>
        <div
          class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >Aggregator Master Tracker-Implemented</div>
        <generalLeadInformation
          v-if="propToggleLeadInformation"
          :leadInformation="addtnLeadInformation"
          :propToggleLeadInformationPop="propToggleLeadInformation"
          @closeLeadInformation="toggleLeadInformation"
        />
        <q-table
          table-class="customTableClass"
          :data="tableData"
          :columns="columns"
          :filter="filter"
          :pagination.sync="paginationControl"
          row-key="name"
          :loading="toggleAjaxLoadFilter"
          :rows-per-page-options="[5,10,15,20,25]"
          @request="ajaxLoadAllLeadInfo"
        >
          <q-td slot="body-cell-tid" slot-scope="props" :props="props">
            <span class="label text-primary"># {{props.row.tid}}</span>
          </q-td>
          <q-td slot="body-cell-mid" slot-scope="props" :props="props">
            <span class="label text-primary"># {{props.row.mid}}</span>
          </q-td>
          <q-td
            slot="body-cell-leadNumber"
            slot-scope="props"
            :props="props"
            class="cursor-pointer"
            @click.native="toggleLeadInformation(props.row.leadInformation)"
          >
            <span class="label text-primary"># {{props.row.leadInformation.leadNumber}}</span>
          </q-td>
          <q-td
            slot="body-cell-mobileNumber"
            slot-scope="props"
            :props="props"
          >{{props.row.leadInformation == null? 'NA':props.row.leadInformation.contactNumber}}</q-td>
          <q-td
            slot="body-cell-leadAddress"
            slot-scope="props"
            :props="props"
          >{{props.row.leadInformation == null? 'NA':props.row.leadInformation.leadAddress}}</q-td>
          <q-td slot="body-cell-deviceStatusDate" slot-scope="props" :props="props">
            <span class="label">{{props.row.deviceStatusDate | moment("Do MMM Y")}}</span>
          </q-td>
          <template slot="top" >
            <div class="col-5">
              <q-search
                clearable
                v-model="filter"
                separator
                color="grey-9"
                placeholder="Type.."
                float-label="Search by MID, TID, Merchant Name"
                class="q-mr-lg q-py-sm"
              />
            </div>
            <div class="col-md-6">
             
              <q-btn 
              square 
              outline 
              color="purple-9" 
              label="Download as Excel" 
              class="q-mr-lg q-py-sm float-right" 
              size="md" 
              @click="downloadAggrmastertrackerlist()" />
             
            </div>
            
          </template>
        </q-table>
        <DownloadAggrMasterTracker
           v-if="propAggrMasterTrackerList" 
          :propAggrMasterTrackerList="propAggrMasterTrackerList" 
          @emitfnshowAggrMasterTrackerList="downloadAggrmastertrackerlist"
       ></DownloadAggrMasterTracker>
        <!--END:  Download Reports-->
        <showMerchantTransactionLevelDetails
          v-if="valueToggleMerchantTransaction"
          :valueToggleMerchantTransaction="valueToggleMerchantTransaction"
          @revertRowClick="rowClick"
        ></showMerchantTransactionLevelDetails>
        <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
          <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import Vuelidate from "vuelidate";
  import Vue from "vue";
  Vue.use(Vuelidate);
  import { date } from "quasar";
  const today = new Date();
  const { startOfDate, addToDate, subtractFromDate } = date;
  import moment from "moment";
  
  // import downloadExcel from "vue-json-excel";
  import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
  import generalLeadInformation from "../../components/generalLeadInformation.vue";
  import DownloadMasterTracker from "../../components/sat/DownloadMasterTracker.vue";
  import DownloadAggrMasterTracker from "../../components/sat/DownloadAggrMasterTracker.vue";
  export default {
    name: "merchantTransactionLevel",
    
  
    components: {
      showMerchantTransactionLevelDetails,
      generalLeadInformation,
      DownloadMasterTracker,
      DownloadAggrMasterTracker,
      
    },
  
    data() {
      return {
        propToggleLeadInformation: false,
        propAggrMasterTrackerList: false,
        addtnLeadInformation: null,
        toggleAjaxLoadFilter: false,
        paginationControl: {
          rowsNumber: 10,
          page: 1,
          sortBy: "tid",
          descending: false,
          rowsPerPage: 10
        },
        tableData: [],
        valueToggleMerchantTransaction: false,
        filter: "",
        //table information
        columns: [
          {
            name: "tid",
            required: true,
            label: "TID",
            align: "left",
            field: "tid",
            sortable: true
          },
          {
            name: "mid",
            required: true,
            label: "MID",
            align: "left",
            field: "mid",
            sortable: true
          },
          {
            name: "leadNumber",
            required: true,
            label: "Lead Id",
            align: "left",
            field: row => {
              row.leadInformation.leadNumber;
            },
            sortable: false
          },
          // {
          //   name: "leadName",
          //   required: true,
          //   label: "Merchant Name",
          //   align: "left",
          //   field: row => {
          //     row.leadInformation.leadName;
          //   },
          //   sortable: false
          // },
          {
            name: "leadInformation",
            required: true,
            label: "Merchant Name",
            align: "left",
            field: row => {
              return row.leadInformation.leadName;
            },
            sortable: false
          },
          {
            name: "leadAddress",
            required: true,
            label: "Merchant Address",
            align: "left",
            field: row => {
              row.leadInformation.leadAddress;
            },
            sortable: false
          },
          // {
          //   name: "serialNumber",
          //   required: true,
          //   label: "Device Serial No",
          //   align: "left",
          //   field: row => {
          //     return row.serialNumber == null ? "NA" : row.serialNumber;
          //   },
  
          //   sortable: false
          // },
          {
            name: "deviceName",
            required: true,
            label: "Device type",
            align: "left",
            field: row => {
              return row.leadInformation.aggregatorDevice.deviceName == null ?  "NA" :row.leadInformation.aggregatorDevice.deviceName;
          },
            sortable: false
          },
          {
            name: "device_serial_number",
            required: true,
            label: "Device Serial Number",
            align: "left",
            field: (row) => {
              return row.aggregatorRegionalInventory.serialNumber == null
                ? "NA"
                : row.aggregatorRegionalInventory.serialNumber;
            },
            sortable: true
          },
          {
            name: "deviceStatusDate",
            required: true,
            label: "Implementation Date",
            align: "left",
            field: "deviceStatusDate",
            sortable: true
          },
          {
            name: "assignedTo",
            required: true,
            label: "Implemented by",
            align: "left",
            field: row => {
              return row.assignedTo == null ? "NA" : row.assignedTo.name+" | "+row.assignedTo.employeeID;
            },
            sortable: true
          },
          {
            name: "deviceAddress",
            required: true,
            label: "Implemented Address",
            align: "left",
            field: row => {
              return row.deviceAddress;
            },
            sortable: true
          },
          {
            name: "mobileNumber",
            required: true,
            label: "Mobile Number",
            align: "center",
            field: row => {
              row.leadInformation.contactNumber;
            },
            sortable: false
          }
        ],
        loading: true,
        filter_values: ""
      };
    },
    computed: {
      ...mapGetters("MasterTracker", ["getAggregatorsMasterTrackerList"])
      // ...mapGetters("AggMasterTracker", ["getAggMasterTrackerList"])
    },
    mounted() {
      this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filter
      });
    },
    // created() {
    //   this.ajaxLoadAllLeadInfo();
    // },
    methods: {
      ...mapActions("MasterTracker", ["AGGREGATORS_MASTER_TRACKER_LIST"]),
      ajaxLoadAllLeadInfo() {
        this.toggleAjaxLoadFilter = true;
        this.AGGREGATORS_MASTER_TRACKER_LIST()
          .then(response => {
            this.toggleAjaxLoadFilter = false;
          })
          .catch(error => {
            this.toggleAjaxLoadFilter = false;
          });
      },
      ajaxLoadAllLeadInfo({ pagination, filter }) {
        this.$q.loading.show({
          delay: 0, 
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.AGGREGATORS_MASTER_TRACKER_LIST({ pagination, filter })
          .then(res => {
            this.paginationControl = pagination;
            this.paginationControl.rowsNumber = this.getAggregatorsMasterTrackerList.totalElements;
            this.paginationControl.page = this.getAggregatorsMasterTrackerList.number + 1;
            this.tableData = this.getAggregatorsMasterTrackerList.content;
            if (this.getAggregatorsMasterTrackerList.sort != null) {
              this.paginationControl.sortBy = this.getAggregatorsMasterTrackerList.sort[0].property;
              this.paginationControl.descending = this.getAggregatorsMasterTrackerList.sort[0].ascending;
            }
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
  
      // Function to toggle lead information pop up screen
      toggleLeadInformation(leadDetails) {
        this.propToggleLeadInformation = !this.propToggleLeadInformation;
        if (leadDetails != undefined) {
          this.addtnLeadInformation = leadDetails;
        }
      },
      downloadAggrmastertrackerlist(){
        this.propAggrMasterTrackerList=!this.propAggrMasterTrackerList;
      },
      
      
    }
  };
  </script>
  
  <style>
  </style>
  
