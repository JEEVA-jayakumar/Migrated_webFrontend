<template>
  <q-page>
    <!-- content -->
    <div>
      <!--STARTv-model: table title -->
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Replacement/Recovery</div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        class="q-py-none"
      
        :columns="columns"
        :rows="tableData"
        :filter="filter"
        :rows-per-page-options="[5,10,15,20,25]"
        :pagination="paginationControl"
        :loading="toggleAjaxLoadFilter"
        @request="ajaxLoadAllLeadInfo"
      >
         <q-td v-slot:body-cell-dateOfRecoveryReplacement="props" :props="props">
          <span class="label">{{props.row.dateOfRecoveryReplacement | moment("Do MMM Y")}}</span>
        </q-td>
     
        <template v-slot:top="props" class="bottom-border">
          <!--START: table  :rows-per-page-options="[5,10,15,20,25]"filter,search -->
          <div class="col">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search by MID, TID"
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
            @click="downloadRecoveryReplacementHist()" />
           
          </div>

          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
       <!--START >>  Download Reports -->
      <DownloadReplacementReport
         v-if="propReplacementReport" 
        :propReplacementReport="propReplacementReport" 
        @emitfnshowReplacement="downloadRecoveryReplacementHist"
     ></DownloadReplacementReport>
      <!--END:  Download Reports-->

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
import DownloadReplacementReport from "../../components/inventory/DownloadReplacementReport.vue";
export default {
  name: "getReplacementRecoveryList",
  components: {
    DownloadReplacementReport,
  },
  data() {
    return {
       propToggleLeadInformation: false,
       propReplacementReport:false,
      addtnLeadInformation: null,
       tomorrow: addToDate(today, { days: -1 }),
      yesterday: subtractFromDate(today, { days: 90 }),
      state: new Date(),
      defaultValue: startOfDate(today, "year"),
      separator: 'horizontal',
      message:"",
      icon:"",
      formData:{
        from:"",
        to:""
      },
      // regionFilter: "",
      model:"",
      model1:"",
      json_fields: {
      dateOfRecoveryReplacement: {
          field: "dateOfRecoveryReplacement",
          callback: value => {
            if (value == null) {
              return "NA";
            } else {
              return moment(value).format("DD/MM/YYYY");
            }
          }
          },
       
      },
      filter: "",
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: "dateOfRecoveryReplacement",
        descending: false,
        rowsPerPage: 10
      },
      columns: [
          {
          name: "MID",
          required: true,
          label: "MID",
          align: "left",
          // field:"mId",
          field: row => {
            return row.mId != null ? row.mId : "NA";
          },
        },
         {
          name: "TID",
          required: true,
          label: "TID",
          align: "left",
          // field: "tId",
          field: row => {
            return row.tId != null ? row.tId : "NA";
          },
        },
        {
          name: "BP Region",
          required: true,
          label: "BP Region",
          align: "left",
          field: row => {
            return row.bpRegions == null ? "NA" : row.bpRegions;
          },
        },
         {
          name: "SO Id",
          required: true,
          label: "SO Id",
          align: "left",
          field: "so",
        },
        {
          name: "ME Name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.meName == null ? "NA" : row.meName;
          },
        },
         {
          name: "Merchant Address",
          required: true,
          label: "Merchant Address",
          align: "left",
          field: row => {
            return row.merchantAddress == null ? "NA" : row.merchantAddress;
          },
        },
         {
          name: "Device Type",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            return row.deviceType == null ? "NA" : row.deviceType;
          },
        },
         {
          name: "replacementStatus",
          required: true,
          label: "Replacement Status",
          align: "left",
          // field: "deviceStatus",
          field: row => {
            // return row.marsDeviceDetails != null ? row.marsDeviceDetails.devicereplacementStatus : "NA";
            return row.marsDeviceDetails.devicereplacementStatus == 0 ? "NA"
             : row.marsDeviceDetails.devicereplacementStatus == 1 ?"Initiated"
             : row.marsDeviceDetails.devicereplacementStatus == 2 ?"Device Scanned"
             :row.marsDeviceDetails.devicereplacementStatus == 3 ?"Submitted":
             row.marsDeviceDetails.devicereplacementStatus;
          },
        },
        {
          name: "recoveryStatus",
          required: true,
          label: "Recovery Status",
          align: "left",
          //  field: "deviceRecoveryStatus",
          field: row => {
            return row.marsDeviceDetails.deviceRecoveryStatus == 0 || row.marsDeviceDetails.deviceRecoveryStatus == null ? "NA" 
            : row.marsDeviceDetails.deviceRecoveryStatus ==1 ? "Initiated"
            : row.marsDeviceDetails.deviceRecoveryStatus == 2 ? "Device Scanned" 
            : row.marsDeviceDetails.deviceRecoveryStatus == 3 ?"Submitted"
            : row.marsDeviceDetails.deviceRecoveryStatus ;
          },
        },
        {
          name: "dateOfRecoveryReplacement",
          required: true,
          label: "Date Of Replacement/Recovery",
          align: "left",
          field: "dateOfRecoveryReplacement",
        },
        {
          name: "Old Device Serial Number",
          required: true,
          label: "Old Device Serial Number",
          align: "left",
          field: "oldDeviceSerialNumber",
        },
         {
          name: "New Device Serial Number",
          required: true,
          label: "New Device Serial Number",
          align: "left",
          field: "newDeviceSerialNumber",
        },


         
      ],
      loading: true,
      tableData: [],
    };
  },
  computed: {
    ...mapGetters("replacement", ["getReplacementRecoveryList"])
   
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
methods: {
    ...mapActions("replacement", ["REPLACEMENT_RECOVERY_LIST"]),
    ...mapActions("InventoryCentral",["REPORT_RECOVERY_REPLACEMENT_HIST"]),

   
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.REPLACEMENT_RECOVERY_LIST({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getReplacementRecoveryList.totalElements;
          this.paginationControl.page =
            this.getReplacementRecoveryList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getReplacementRecoveryList.content;
          if (this.getReplacementRecoveryList.sort != null) {
            this.paginationControl.sortBy = this.getReplacementRecoveryList.sort[0].property;
            this.paginationControl.descending = this.getReplacementRecoveryList.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
     toTimestamp(strDate) {
       console.log("The date string : --- : ", strDate)
      var date = strDate.split("T")[0]
      var curDate = new Date();      
      var mnth = curDate.getMonth()+1;
      var chDate = curDate.getFullYear()+"-"+(mnth < 10 ? "0"+mnth : mnth)+"-"+curDate.getDate();
      var datum = null
      if (chDate == date) 
        datum = Date.now();
      else
        datum = Date.parse(strDate);
      console.log("The Datum: --- : ", datum)
      return datum;
      },
    //     downloadRecoveryReplacementHist(request){
   
    //   let params = {
    //     from: this.toTimestamp(request.from.toString()),
    //     to: this.toTimestamp(request.to.toString())
    //   };
    //   this.$q.loading.show({
    //       delay: 100, // ms
    //       spinnerColor: "purple-9",
    //       message: "Please wait.."
    //   });
    //   this.REPORT_RECOVERY_REPLACEMENT_HIST(params)
    //     .then(response => {
    //       this.$q.loading.hide();
    //       console.log("data information------------------>",response)
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "Successfully Downloaded",
    //         icon: "thumb_up"
    //       });
    //       this.formData.from="",
    //       this.formData.to=""
    
          
    //     })
    //     .catch(error => {
    //         // console.log("data information-------->",error)
    //       console.log("hello",error)
    //       this.$q.loading.hide();
    //       if(error.status==400){
    //         this.$q.notify({
    //         color: "amber",
    //         position: "bottom",
    //         message: error,
    //         icon: "thumb_down"
    //       });
    //       }
    //       else if(error.status == 500){
    //         this.$q.notify({
    //         color: "amber",
    //         position: "bottom",
    //         message: error,
    //         icon: "thumb_down"
    //       });

    //       }
     
    //       this.formData.from="",
    //       this.formData.to=""
    //     });
      
    // },
     downloadRecoveryReplacementHist(){

    this.propReplacementReport=!this.propReplacementReport;
},
    
  }
};
</script>

<style>
</style>
