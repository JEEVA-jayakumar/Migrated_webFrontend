<template>
  <q-page>
    <div>
      <!--STARTv-model: table title -->
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Bijlipay Master Tracker-Implemented</div>
      <!--END: table title -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!-- content -->
      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="name"
        :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5,10,15,20,25]"
        @request="ajaxLoadAllLeadInfo"
      >
        <q-td v-slot:body-cell-tid="props" :props="props">
          <span class="label text-primary"># {{props.row.tid}}</span>
        </q-td>
        <q-td v-slot:body-cell-mid="props" :props="props">
          <span class="label text-primary"># {{props.row.mid}}</span>
        </q-td>
        <!-- <q-td
          v-slot:body-cell-leadName="props"
          :props="props"
        >{{props.row.leadInformation.leadName}}</q-td>-->
        <q-td
          v-slot:body-cell-leadNumber="props"
          :props="props"
          class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row.leadInformation)"
        >
          <span class="label text-primary"># {{props.row.leadInformation.leadNumber}}</span>
        </q-td>
        <!-- <q-td
          v-slot:body-cell-serialNumber="props"
          :props="props"
        >{{props.row.serialNumber== null? 'NA':props.row.serialNumber}}</q-td>-->
        <q-td
          v-slot:body-cell-mobileNumber="props"
          :props="props"
        >{{props.row.leadInformation == null? 'NA':props.row.leadInformation.contactNumber}}</q-td>
        <q-td
          v-slot:body-cell-leadAddress="props"
          :props="props"
        >{{props.row.leadInformation == null? 'NA':props.row.leadInformation.leadAddress}}</q-td>
        <q-td v-slot:body-cell-deviceStatusDate="props" :props="props">
          <span class="label">{{props.row.deviceStatusDate | moment("Do MMM Y")}}</span>
        </q-td>

        <template slot="top" >
          <!--START: table filter,search,excel download -->
          <div class="col-5">
            <q-input
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
            @click="downloadmastertrackerlist()" />
           
          </div>
          
        </template>
      </q-table>
      <!--END: table lead validation -->
      <!--START >>  Download Reports -->
      <DownloadMasterTracker
         v-if="propMasterTrackerList" 
        :propMasterTrackerList="propMasterTrackerList" 
        @emitfnshowMasterTrackerList="downloadmastertrackerlist"
     ></DownloadMasterTracker>
      <!--END:  Download Reports-->
      <showMerchantTransactionLevelDetails
        v-if="valueToggleMerchantTransaction"
        :valueToggleMerchantTransaction="valueToggleMerchantTransaction"
        @revertRowClick="rowClick"
      ></showMerchantTransactionLevelDetails>

      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >>  Show Ajax Spinner --> 
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";



import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import moment from "moment";

// import downloadExcel from "vue-json-excel";
import showMerchantTransactionLevelDetails from "../../components/sat/showMerchantTransactionLevelDetails.vue";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
import DownloadMasterTracker from "../../components/sat/DownloadMasterTracker.vue";
export default {
  name: "merchantTransactionLevel",
  

  components: {
    showMerchantTransactionLevelDetails,
    generalLeadInformation,
    DownloadMasterTracker,
    
  },

  data() {
    return {
      propToggleLeadInformation: false,
      propMasterTrackerList: false,
      addtnLeadInformation: null,
      
      // paginationControl: {
      //   rowsPerPage: 10
      // },
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
          label: "ME Name",
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
          align: "center",
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
          align: "right",
          field: row => {
            return row.leadInformation.device.deviceName;
          },
          sortable: false
        },
        {
          name: "device_serial_number",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: row => {
            return row.regionalInventory == null
              ? "NA"
              : row.regionalInventory.serialNumber;
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
    ...mapGetters("MasterTracker", ["getMasterTrackerList"])
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
    ...mapActions("MasterTracker", ["MASTER_TRACKER_LIST"]),
   
    //Load all short lead info while page loading
    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.MASTER_TRACKER_LIST()
        .then(response => {
          this.toggleAjaxLoadFilter = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter = false;
        });
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.MASTER_TRACKER_LIST({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getMasterTrackerList.totalElements;
          this.paginationControl.page = this.getMasterTrackerList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getMasterTrackerList.content;
          if (this.getMasterTrackerList.sort != null) {
            this.paginationControl.sortBy = this.getMasterTrackerList.sort[0].property;
            this.paginationControl.descending = this.getMasterTrackerList.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
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
    downloadmastertrackerlist(){
      this.propMasterTrackerList=!this.propMasterTrackerList;
    },
    
    
  }
};
</script>

<style>
</style>
